import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { TextField } from '@/components/atoms/TextField';
import { useAuth } from '@/hooks/useAuth';
import { authErrorMessage } from '@/lib/authErrorMessage';
import type { AuthActionError } from '@/contexts/auth-context';
import * as S from './styles';

export interface AccountGateProps {
  onSignIn: () => void;
}

export function AccountGate({ onSignIn }: AccountGateProps) {
  const { t } = useTranslation();
  const { login, requestPinReset, confirmPinReset } = useAuth();

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<AuthActionError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetNewPin, setResetNewPin] = useState('');
  const [resetError, setResetError] = useState<AuthActionError | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const handleEnter = async () => {
    const digits = pin.replace(/\D/g, '');
    if (!email.includes('@') || digits.length !== 4) {
      setError({ code: 'invalid_input' });
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await login(email, digits);
    setSubmitting(false);
    if (result) {
      setError(result);
      return;
    }
    onSignIn();
  };

  const handleSendCode = async () => {
    if (!resetEmail.includes('@')) return;
    setResetSubmitting(true);
    setResetError(null);
    const result = await requestPinReset(resetEmail);
    setResetSubmitting(false);
    if (result) {
      setResetError(result);
      return;
    }
    setResetSent(true);
  };

  const handleConfirmReset = async () => {
    const newDigits = resetNewPin.replace(/\D/g, '');
    if (!resetCode || newDigits.length !== 4) {
      setResetError({ code: 'invalid_input' });
      return;
    }
    setResetSubmitting(true);
    setResetError(null);
    const result = await confirmPinReset(resetEmail, resetCode, newDigits);
    setResetSubmitting(false);
    if (result) {
      setResetError(result);
      return;
    }
    onSignIn();
  };

  return (
    <S.Container>
      <div>
        <Eyebrow>{t('account.eyebrow')}</Eyebrow>
        <S.Title>{t('account.gate.title')}</S.Title>
        <S.Description>{t('account.gate.description')}</S.Description>
      </div>

      <S.FormColumn>
        <TextField
          type="email"
          placeholder={t('account.gate.emailPlaceholder')}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <S.PinRow>
          <S.PinInput
            maxLength={4}
            inputMode="numeric"
            placeholder={t('account.gate.pinPlaceholder')}
            value={pin}
            onChange={(event) => setPin(event.target.value)}
          />
          <S.EnterButton type="button" onClick={handleEnter} disabled={submitting}>
            {t('account.gate.enter')}
          </S.EnterButton>
        </S.PinRow>
        <S.PinHint $error={Boolean(error)}>{error ? authErrorMessage(t, error) : t('account.gate.pinHint')}</S.PinHint>

        <S.LostPinBox>
          <S.LostPinLabel type="button" onClick={() => setResetOpen((open) => !open)}>
            {t('account.gate.lostPin')}
          </S.LostPinLabel>

          {resetOpen && (
            <>
              <S.LostPinDescription>{t('account.gate.lostPinDescription')}</S.LostPinDescription>

              {!resetSent ? (
                <>
                  <TextField
                    type="email"
                    placeholder={t('account.gate.emailPlaceholder')}
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                  />
                  <S.SendLinkButton type="button" onClick={handleSendCode} disabled={resetSubmitting}>
                    {t('account.gate.sendCode')}
                  </S.SendLinkButton>
                </>
              ) : (
                <>
                  <S.LostPinDescription>{t('account.gate.codeSentDescription')}</S.LostPinDescription>
                  <TextField
                    inputMode="numeric"
                    placeholder={t('account.gate.codePlaceholder')}
                    value={resetCode}
                    onChange={(event) => setResetCode(event.target.value)}
                  />
                  <TextField
                    maxLength={4}
                    inputMode="numeric"
                    placeholder={t('account.gate.newPinPlaceholder')}
                    value={resetNewPin}
                    onChange={(event) => setResetNewPin(event.target.value)}
                  />
                  <S.SendLinkButton type="button" onClick={handleConfirmReset} disabled={resetSubmitting}>
                    {t('account.gate.confirmReset')}
                  </S.SendLinkButton>
                </>
              )}

              {resetError && <S.PinHint $error>{authErrorMessage(t, resetError)}</S.PinHint>}
            </>
          )}
        </S.LostPinBox>
      </S.FormColumn>
    </S.Container>
  );
}
