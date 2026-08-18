import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TextField } from '@/components/atoms/TextField';
import { PaymentMethodOption } from '@/components/molecules/PaymentMethodOption';
import { PaymentBrands } from '@/components/molecules/PaymentBrands';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/format';
import { authErrorMessage } from '@/lib/authErrorMessage';
import type { AuthActionError } from '@/contexts/auth-context';
import * as S from './styles';

type PaymentMethod = 'card' | 'paypal' | 'pix';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutForm() {
  const { t, i18n } = useTranslation();
  const { items, total } = useCart();
  const { session, profile, loginOrSignUp, requestPinReset, confirmPinReset } = useAuth();

  const [method, setMethod] = useState<PaymentMethod>('card');
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState<AuthActionError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paid, setPaid] = useState(false);

  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetNewPin, setResetNewPin] = useState('');
  const [resetError, setResetError] = useState<AuthActionError | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const displayEmail = session ? (profile?.email ?? '') : email;
  const emailValid = EMAIL_RE.test(displayEmail);
  const canPay = session != null && emailValid && termsAccepted && items.length > 0;

  /* PIN certo cria conta na hora se o email for novo (conta nasce no
     primeiro pedido) — mesmo botão serve pra entrar e pra criar. */
  const handlePinSubmit = async () => {
    const digits = pin.replace(/\D/g, '');
    if (!emailValid || digits.length !== 4) {
      setAuthError({ code: 'invalid_input' });
      return;
    }
    setSubmitting(true);
    setAuthError(null);
    const result = await loginOrSignUp(email, digits);
    setSubmitting(false);
    if (result) {
      setAuthError(result);
      return;
    }
    setShowPin(false);
    setPin('');
  };

  const handleSendResetCode = async () => {
    if (!emailValid) return;
    setResetSubmitting(true);
    setResetError(null);
    const result = await requestPinReset(email);
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
    const result = await confirmPinReset(email, resetCode, newDigits);
    setResetSubmitting(false);
    if (result) {
      setResetError(result);
      return;
    }
    setShowPin(false);
    setResetMode(false);
  };

  const handlePay = () => {
    if (!canPay) return;
    setPaid(true);
  };

  const ctaLabel = paid
    ? t('checkout.cta.paid')
    : canPay
      ? t('checkout.cta.pay', { total: formatPrice(total, i18n.language) })
      : t('checkout.cta.incomplete');

  return (
    <S.Container>
      <S.Pane>
        <S.ExpressLabel>{t('checkout.express.title')}</S.ExpressLabel>
        <S.ExpressGrid>
          <S.ExpressPrimaryButton type="button">{t('cart.payment.applePay')}</S.ExpressPrimaryButton>
          <S.ExpressOutlineButton type="button">{t('cart.payment.payPal')}</S.ExpressOutlineButton>
          <S.ExpressOutlineButton type="button">{t('cart.payment.brands.gpay')}</S.ExpressOutlineButton>
        </S.ExpressGrid>

        <S.Divider>
          <S.DividerLine />
          <S.DividerLabel>{t('checkout.express.or')}</S.DividerLabel>
          <S.DividerLine />
        </S.Divider>

        <S.SectionHeader>
          <S.SectionTitle>{t('checkout.contact.title')}</S.SectionTitle>
          <S.SignInButton type="button" onClick={() => setShowPin((v) => !v)}>
            {session
              ? t('checkout.contact.member', { id: session.user.id.slice(0, 4).toUpperCase() })
              : t('checkout.contact.signIn')}
          </S.SignInButton>
        </S.SectionHeader>

        <S.PinBox $open={showPin}>
          {!resetMode ? (
            <>
              <S.PinLabel>{t('checkout.contact.pinLabel')}</S.PinLabel>
              <S.PinRow>
                <S.PinInput
                  maxLength={4}
                  inputMode="numeric"
                  placeholder={t('checkout.contact.pinPlaceholder')}
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                />
                <S.PinEnterButton type="button" onClick={handlePinSubmit} disabled={submitting}>
                  {t('checkout.contact.pinEnter')}
                </S.PinEnterButton>
              </S.PinRow>
              <S.PinHint $error={Boolean(authError)}>
                {authError ? authErrorMessage(t, authError) : t('checkout.contact.pinHint')}
              </S.PinHint>
              <S.ForgotPinLink type="button" onClick={() => setResetMode(true)}>
                {t('checkout.contact.forgotPin')}
              </S.ForgotPinLink>
            </>
          ) : (
            <>
              {!resetSent ? (
                <>
                  <S.PinLabel>{t('checkout.contact.resetLabel')}</S.PinLabel>
                  <S.PinEnterButton type="button" onClick={handleSendResetCode} disabled={resetSubmitting}>
                    {t('account.gate.sendCode')}
                  </S.PinEnterButton>
                </>
              ) : (
                <>
                  <S.PinLabel>{t('account.gate.codeSentDescription')}</S.PinLabel>
                  <S.PinRow>
                    <S.PinInput
                      inputMode="numeric"
                      placeholder={t('account.gate.codePlaceholder')}
                      value={resetCode}
                      onChange={(event) => setResetCode(event.target.value)}
                    />
                  </S.PinRow>
                  <S.PinRow>
                    <S.PinInput
                      maxLength={4}
                      inputMode="numeric"
                      placeholder={t('account.gate.newPinPlaceholder')}
                      value={resetNewPin}
                      onChange={(event) => setResetNewPin(event.target.value)}
                    />
                    <S.PinEnterButton type="button" onClick={handleConfirmReset} disabled={resetSubmitting}>
                      {t('account.gate.confirmReset')}
                    </S.PinEnterButton>
                  </S.PinRow>
                </>
              )}
              {resetError && <S.PinHint $error>{authErrorMessage(t, resetError)}</S.PinHint>}
              <S.ForgotPinLink type="button" onClick={() => setResetMode(false)}>
                {t('checkout.contact.backToPin')}
              </S.ForgotPinLink>
            </>
          )}
        </S.PinBox>

        <S.FieldGroup>
          <TextField
            type="email"
            placeholder={t('checkout.contact.emailPlaceholder')}
            value={displayEmail}
            disabled={Boolean(session)}
            onChange={(event) => setEmail(event.target.value)}
          />
        </S.FieldGroup>

        <S.CheckboxLabel>
          <S.Checkbox type="checkbox" />
          <S.CheckboxText>{t('checkout.contact.newsletter')}</S.CheckboxText>
        </S.CheckboxLabel>

        <S.Section>
          <S.SectionTitle>{t('checkout.payment.title')}</S.SectionTitle>
          <S.SectionSubtitle>{t('checkout.payment.subtitle')}</S.SectionSubtitle>
        </S.Section>

        <S.PaymentBox>
          <PaymentMethodOption
            label={t('checkout.payment.methods.card')}
            active={method === 'card'}
            onSelect={() => setMethod('card')}
            trailing={
              <>
                <S.Brand>{t('checkout.payment.cardBrands.visa')}</S.Brand>
                <S.Brand>{t('checkout.payment.cardBrands.mc')}</S.Brand>
                <S.Brand>{t('checkout.payment.cardBrands.amex')}</S.Brand>
                <S.MoreBrands>{t('checkout.payment.moreCount', { count: 2 })}</S.MoreBrands>
              </>
            }
          />
          {method === 'card' && (
            <S.CardPanel>
              <TextField placeholder={t('checkout.payment.cardNumber')} inputMode="numeric" />
              <S.FieldRow>
                <TextField placeholder={t('checkout.payment.expiration')} inputMode="numeric" />
                <TextField placeholder={t('checkout.payment.securityCode')} inputMode="numeric" />
              </S.FieldRow>
              <TextField placeholder={t('checkout.payment.nameOnCard')} />
            </S.CardPanel>
          )}

          <PaymentMethodOption
            label={t('checkout.payment.methods.paypal')}
            active={method === 'paypal'}
            onSelect={() => setMethod('paypal')}
            trailing={<PaymentBrands brands={['paypal']} />}
          />

          <PaymentMethodOption
            label={t('checkout.payment.methods.pix')}
            active={method === 'pix'}
            onSelect={() => setMethod('pix')}
            trailing={<S.Brand>{t('checkout.payment.methods.pixBadge')}</S.Brand>}
          />
          {method === 'pix' && <S.PixNote>{t('checkout.payment.pixNote')}</S.PixNote>}
        </S.PaymentBox>

        <S.Section>
          <S.SectionTitle>{t('checkout.billing.title')}</S.SectionTitle>
          <S.SectionSubtitle>{t('checkout.billing.subtitle')}</S.SectionSubtitle>
        </S.Section>

        <S.FieldGroup>
          <TextField placeholder={t('checkout.billing.fullName')} />
          <S.FieldRow>
            <TextField placeholder={t('checkout.billing.country')} />
            <TextField placeholder={t('checkout.billing.postalCode')} />
          </S.FieldRow>
        </S.FieldGroup>

        <S.TermsLabel>
          <S.Checkbox
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          <S.TermsText>
            <Trans
              i18nKey="checkout.terms.text"
              components={[
                <S.TermLink key="0" href="#" onClick={(event) => event.preventDefault()} />,
                <S.TermLink key="1" href="#" onClick={(event) => event.preventDefault()} />,
              ]}
            />
          </S.TermsText>
        </S.TermsLabel>

        <S.PayButton type="button" $enabled={canPay} disabled={!canPay} onClick={handlePay}>
          {ctaLabel}
        </S.PayButton>
        <S.PayNote>{paid ? t('checkout.note.paid') : t('checkout.note.secure')}</S.PayNote>
      </S.Pane>
    </S.Container>
  );
}
