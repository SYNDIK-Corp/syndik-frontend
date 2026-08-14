import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TextField } from '@/components/atoms/TextField';
import { PaymentMethodOption } from '@/components/molecules/PaymentMethodOption';
import { PaymentBrands } from '@/components/molecules/PaymentBrands';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

type PaymentMethod = 'card' | 'paypal' | 'pix';

const EMAIL_OR_PHONE = /.+@.+\..+/;
const PHONE_ONLY = /^\+?[\d\s()-]{8,}$/;

export function CheckoutForm() {
  const { t, i18n } = useTranslation();
  const { items, total } = useCart();

  const [method, setMethod] = useState<PaymentMethod>('card');
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [pinRetry, setPinRetry] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paid, setPaid] = useState(false);

  const emailValid = EMAIL_OR_PHONE.test(email) || PHONE_ONLY.test(email);
  const canPay = emailValid && termsAccepted && items.length > 0;

  const handleSignIn = () => {
    const digits = pin.replace(/\D/g, '');
    if (digits.length === 4) {
      setShowPin(false);
      setSignedIn(true);
      setPinRetry(false);
      if (!email) setEmail(t('checkout.contact.mockEmail'));
    } else {
      setPinRetry(true);
    }
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
            {signedIn ? t('checkout.contact.member', { id: '0417' }) : t('checkout.contact.signIn')}
          </S.SignInButton>
        </S.SectionHeader>

        <S.PinBox $open={showPin}>
          <S.PinLabel>{t('checkout.contact.pinLabel')}</S.PinLabel>
          <S.PinRow>
            <S.PinInput
              maxLength={4}
              inputMode="numeric"
              placeholder={t('checkout.contact.pinPlaceholder')}
              value={pin}
              onChange={(event) => setPin(event.target.value)}
            />
            <S.PinEnterButton type="button" onClick={handleSignIn}>
              {t('checkout.contact.pinEnter')}
            </S.PinEnterButton>
          </S.PinRow>
          <S.PinHint>
            {pinRetry ? t('checkout.contact.pinHintRetry') : t('checkout.contact.pinHintDefault')}
          </S.PinHint>
        </S.PinBox>

        <S.FieldGroup>
          <TextField
            type="email"
            placeholder={t('checkout.contact.emailPlaceholder')}
            value={email}
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
