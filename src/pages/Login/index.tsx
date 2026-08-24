import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import { Spinner } from '@/components/atoms/Spinner';
import { TextField } from '@/components/atoms/TextField';
import { useAuth } from '@/hooks/useAuth';
import { authErrorMessage } from '@/lib/authErrorMessage';
import type { AuthActionError } from '@/contexts/auth-context';
import * as S from './styles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// mesma arte já otimizada da Hero (Fase 11.1) — escolha de marca fixa, não
// precisa de fetch novo nem de gestão via banco pra uma tela só. Duas fotos
// diferentes do mesmo Drop — "arte diferente pra cada lado" sem precisar
// produzir asset novo nenhum.
type Mode = 'signin' | 'register';

const ART_BY_MODE: Record<Mode, string> = {
  signin: `${SUPABASE_URL}/storage/v1/object/public/product-images/legends-never-die/hero/02.webp`,
  register: `${SUPABASE_URL}/storage/v1/object/public/product-images/legends-never-die/hero/04.webp`,
};

type Step = 'email' | 'pin' | 'code';

/* Login e registro são a MESMA tela e o MESMO mecanismo por baixo — duas
 * formas de entrar coexistem depois do email, nenhuma "padrão" escolhida
 * pra pessoa: PIN (rápido, sem depender de email chegar) ou código por
 * email (dispara só quando a pessoa escolhe esse caminho de propósito,
 * não como próximo passo automático). loginOrSignUp já cria a conta na
 * hora se o email for novo, com esse mesmo PIN — sem fluxo separado de
 * "cadastro". As abas só trocam o enquadramento (título, descrição, texto
 * do botão e a arte) — não existe lógica de auth diferente entre os dois
 * lados. */
export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, loading: authLoading, loginOrSignUp, requestAccessCode, confirmAccessCode } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<AuthActionError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const emailValid = EMAIL_RE.test(email);

  // só valida o email localmente e avança — nenhuma chamada de rede aqui,
  // a pessoa é quem decide (no próximo passo) se quer PIN ou código por
  // email, e só a escolha do código de fato dispara algo
  const handleContinueWithEmail = (event: FormEvent) => {
    event.preventDefault();
    if (!emailValid) return;
    setError(null);
    setStep('pin');
  };

  const handleSignInWithPin = async (event: FormEvent) => {
    event.preventDefault();
    if (pin.trim().length !== 4 || submitting) return;
    setSubmitting(true);
    setError(null);
    const result = await loginOrSignUp(email, pin.trim());
    setSubmitting(false);
    if (result) {
      setError(result);
      return;
    }
    navigate(searchParams.get('redirect') || '/account');
  };

  const handleRequestCode = async () => {
    if (sendingCode) return;
    setSendingCode(true);
    setError(null);
    const result = await requestAccessCode(email);
    setSendingCode(false);
    if (result) {
      setError(result);
      return;
    }
    setStep('code');
  };

  const handleConfirmCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    const result = await confirmAccessCode(email, code.trim());
    setSubmitting(false);
    if (result) {
      setError(result);
      return;
    }
    navigate(searchParams.get('redirect') || '/account');
  };

  // já tem sessão (voltou pra /login pelo histórico, favoritos, etc.) — vai
  // direto pro destino em vez de mostrar a tela de login à toa
  if (!authLoading && session) {
    return <Navigate to={searchParams.get('redirect') || '/account'} replace />;
  }

  return (
    <S.Container>
      <S.ArtPane>
        <S.ArtImage key={mode} src={ART_BY_MODE[mode]} alt="" />
      </S.ArtPane>

      <S.FormPane>
        <S.FormColumn>
          <S.LogoWrapper>
            <Logo width="132px" />
          </S.LogoWrapper>

          {step === 'email' && (
            <S.Tabs role="tablist">
              <S.Tab
                type="button"
                role="tab"
                aria-selected={mode === 'signin'}
                $active={mode === 'signin'}
                onClick={() => setMode('signin')}
              >
                {t('login.tabSignIn')}
              </S.Tab>
              <S.Tab
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                $active={mode === 'register'}
                onClick={() => setMode('register')}
              >
                {t('login.tabRegister')}
              </S.Tab>
            </S.Tabs>
          )}

          {step === 'email' && (
            <form onSubmit={handleContinueWithEmail}>
              <S.Title>{mode === 'signin' ? t('login.title') : t('login.registerTitle')}</S.Title>
              <S.Description>
                {mode === 'signin' ? t('login.description') : t('login.registerDescription')}
              </S.Description>

              <S.Field>
                <TextField
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <S.SubmitButton type="submit" disabled={!emailValid}>
                  {mode === 'signin' ? t('login.continueCta') : t('login.registerCta')}
                </S.SubmitButton>
              </S.Field>

              <S.Terms>
                <Trans
                  i18nKey="login.terms"
                  components={[
                    <S.TermLink key="0" href="#" onClick={(event) => event.preventDefault()} />,
                    <S.TermLink key="1" href="#" onClick={(event) => event.preventDefault()} />,
                  ]}
                />
              </S.Terms>
            </form>
          )}

          {step === 'pin' && (
            <form onSubmit={handleSignInWithPin}>
              <S.Title>{t('login.pinTitle')}</S.Title>
              <S.Description>{t('login.pinDescription', { email })}</S.Description>

              <S.Field>
                <S.CodeInput
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={t('account.gate.pinPlaceholder')}
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                  autoFocus
                />
                <S.SubmitButton type="submit" disabled={pin.trim().length !== 4 || submitting}>
                  {submitting && <Spinner />}
                  {submitting ? t('login.verifying') : t('login.pinCta')}
                </S.SubmitButton>
              </S.Field>

              {error && <S.Hint $error>{authErrorMessage(t, error)}</S.Hint>}

              <S.Divider>{t('login.or')}</S.Divider>

              <S.SecondaryButton type="button" onClick={handleRequestCode} disabled={sendingCode}>
                {sendingCode && <Spinner />}
                {sendingCode ? t('login.sending') : t('login.useCodeInstead')}
              </S.SecondaryButton>

              <S.ChangeEmailLink
                type="button"
                onClick={() => {
                  setStep('email');
                  setPin('');
                  setError(null);
                }}
              >
                {t('login.changeEmail')}
              </S.ChangeEmailLink>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleConfirmCode}>
              <S.Title>{t('login.codeTitle')}</S.Title>
              <S.Description>{t('login.codeSentDescription', { email })}</S.Description>

              <S.Field>
                <S.CodeInput
                  inputMode="numeric"
                  placeholder={t('login.codePlaceholder')}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  autoFocus
                />
                <S.SubmitButton type="submit" disabled={!code.trim() || submitting}>
                  {submitting && <Spinner />}
                  {submitting ? t('login.verifying') : t('login.confirmCta')}
                </S.SubmitButton>
              </S.Field>

              {error && <S.Hint $error>{authErrorMessage(t, error)}</S.Hint>}

              <S.ChangeEmailLink
                type="button"
                onClick={() => {
                  setStep('pin');
                  setCode('');
                  setError(null);
                }}
              >
                {t('login.backToPin')}
              </S.ChangeEmailLink>
            </form>
          )}
        </S.FormColumn>
      </S.FormPane>
    </S.Container>
  );
}
