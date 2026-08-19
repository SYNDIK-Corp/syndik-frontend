import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { TextField } from '@/components/atoms/TextField';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/format';
import { createOrder, isCheckoutError, type CheckoutError } from '@/lib/checkoutApi';
import { stripePromise } from '@/lib/stripe';
import * as S from './styles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkoutErrorMessage(t: ReturnType<typeof useTranslation>['t'], error: CheckoutError): string {
  return t(`checkout.errors.${error.code}`, { defaultValue: t('checkout.errors.unexpected') });
}

export function CheckoutForm() {
  const { t, i18n } = useTranslation();
  const { items, total, appliedCoupon } = useCart();
  const { session, profile } = useAuth();

  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<CheckoutError | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const displayEmail = session ? (profile?.email ?? '') : email;
  const emailValid = EMAIL_RE.test(displayEmail);
  const canContinue = session != null && emailValid && termsAccepted && items.length > 0;

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
          {session ? (
            <S.SignInButton as="span">
              {t('checkout.contact.member', { id: session.user.id.slice(0, 4).toUpperCase() })}
            </S.SignInButton>
          ) : (
            <S.SignInButton as={Link} to="/login?redirect=/checkout">
              {t('checkout.contact.signIn')}
            </S.SignInButton>
          )}
        </S.SectionHeader>

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
