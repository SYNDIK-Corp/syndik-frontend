import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { TextField } from '@/components/atoms/TextField';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/format';
import { authErrorMessage } from '@/lib/authErrorMessage';
import { createOrder, isCheckoutError, type CheckoutError } from '@/lib/checkoutApi';
import { stripePromise } from '@/lib/stripe';
import type { AuthActionError } from '@/contexts/auth-context';
import * as S from './styles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkoutErrorMessage(t: ReturnType<typeof useTranslation>['t'], error: CheckoutError): string {
  return t(`checkout.errors.${error.code}`, { defaultValue: t('checkout.errors.unexpected') });
}

export function CheckoutForm() {
  const { t, i18n } = useTranslation();
  const { items, total, appliedCoupon } = useCart();
  const { session, profile, loginOrSignUp, requestPinReset, confirmPinReset } = useAuth();

  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState<AuthActionError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetNewPin, setResetNewPin] = useState('');
  const [resetError, setResetError] = useState<AuthActionError | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<CheckoutError | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const displayEmail = session ? (profile?.email ?? '') : email;
  const emailValid = EMAIL_RE.test(displayEmail);
  const canContinue = session != null && emailValid && termsAccepted && items.length > 0;

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

  const handleContinueToPayment = async () => {
    if (!canContinue) return;
    setCreatingOrder(true);
    setOrderError(null);
    const result = await createOrder(
      items.map((item) => ({ sku: item.sku, quantity: 1 })),
      appliedCoupon?.code,
    );
    setCreatingOrder(false);
    if (isCheckoutError(result)) {
      setOrderError(result);
      return;
    }
    setClientSecret(result.clientSecret);
  };

  const ctaLabel = canContinue
    ? t('checkout.cta.continueToPayment', { total: formatPrice(total, i18n.language) })
    : t('checkout.cta.incomplete');

  return (
    <S.Container>
      <S.Pane>
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

        <S.Section>
          <S.SectionTitle>{t('checkout.payment.title')}</S.SectionTitle>
          <S.SectionSubtitle>{t('checkout.payment.subtitle')}</S.SectionSubtitle>
        </S.Section>

        {clientSecret ? (
          stripePromise ? (
            <S.EmbeddedCheckoutWrap>
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </S.EmbeddedCheckoutWrap>
          ) : (
            <S.PaymentError>{t('checkout.payment.notConfigured')}</S.PaymentError>
          )
        ) : (
          <>
            <S.PayButton type="button" $enabled={canContinue} disabled={!canContinue || creatingOrder} onClick={handleContinueToPayment}>
              {ctaLabel}
            </S.PayButton>
            {orderError && <S.PaymentError>{checkoutErrorMessage(t, orderError)}</S.PaymentError>}
            <S.PayNote>{t('checkout.note.secure')}</S.PayNote>
          </>
        )}
      </S.Pane>
    </S.Container>
  );
}
