import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { CartLineItem } from '@/components/molecules/CartLineItem';
import { CartRecommendationCard } from '@/components/molecules/CartRecommendationCard';
import { PaymentBrands, type BrandKey } from '@/components/molecules/PaymentBrands';
import { useCart } from '@/hooks/useCart';
import { formatCountdown, formatPrice } from '@/lib/format';
import { getCartRecommendations, type CartRecommendation } from '@/data/cartRecommendations';
import * as S from './styles';

const DISCOUNT_TIERS = [
  { threshold: 15, percent: 10, position: 33 },
  { threshold: 25, percent: 15, position: 66 },
  { threshold: 40, percent: 20, position: 100 },
];

const BRANDS: BrandKey[] = ['visa', 'mastercard', 'amex', 'elo', 'gpay', 'pix', 'stripe'];

export function CartDrawer() {
  const { t, i18n } = useTranslation();
  const { items, total, isOpen, holdSecondsRemaining, removeItem, closeCart, addItem } = useCart();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const discountTotal = items.reduce(
    (sum, item) => sum + (item.compareAtPrice ? item.compareAtPrice - item.price : 0),
    0,
  );

  const lastTier = DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
  const nextTier = DISCOUNT_TIERS.find((tier) => total < tier.threshold);
  const progressPercent = Math.min(100, (total / lastTier.threshold) * 100);

  const excludeSkus = items.map((item) => item.sku).join(',');
  const [recommendations, setRecommendations] = useState<CartRecommendation[]>([]);

  useEffect(() => {
    let cancelled = false;
    getCartRecommendations(excludeSkus ? excludeSkus.split(',') : []).then((result) => {
      if (!cancelled) setRecommendations(result);
    });
    return () => {
      cancelled = true;
    };
  }, [excludeSkus]);

  const canCheckout = termsAccepted && items.length > 0;

  const ctaLabel = !items.length
    ? t('cart.cta.empty')
    : !termsAccepted
      ? t('cart.cta.acceptTerms')
      : t('cart.cta.checkout', { total: formatPrice(total, i18n.language) });

  return (
    <>
      <S.Backdrop $open={isOpen} onClick={closeCart} />
      <S.OverlayContent>
        <S.RecommendationsRail $open={isOpen}>
          {recommendations.map((product) => (
            <CartRecommendationCard
              key={product.id}
              product={product}
              onAdd={() =>
                addItem({
                  sku: product.sku,
                  name: product.name,
                  price: product.price,
                  compareAtPrice: product.compareAtPrice,
                  image: product.image,
                })
              }
            />
          ))}
        </S.RecommendationsRail>

        <S.Drawer $open={isOpen} aria-hidden={!isOpen}>
          <S.Header>
            <span />
            <S.Title>
              {t('cart.title')} • {items.length}
            </S.Title>
            <S.CloseButton type="button" aria-label={t('cart.closeAria')} onClick={closeCart}>
              <Icon name="close" size={18} />
            </S.CloseButton>
          </S.Header>

          <S.HoldBanner>
            <span>{t('cart.held.label')}</span>
            <S.HoldClock>{formatCountdown(holdSecondsRemaining)}</S.HoldClock>
          </S.HoldBanner>

          <S.UnlockSection>
            <S.UnlockMessage>
              {nextTier
                ? t('cart.unlock.progress', {
                    amount: formatPrice(nextTier.threshold - total, i18n.language),
                    percent: nextTier.percent,
                  })
                : t('cart.unlock.complete', { percent: lastTier.percent })}
            </S.UnlockMessage>

            <S.ProgressTrack>
              <S.ProgressFill $percent={progressPercent} />
              {DISCOUNT_TIERS.map((tier) => (
                <S.ProgressTick key={tier.threshold} $position={tier.position} $hit={total >= tier.threshold} />
              ))}
            </S.ProgressTrack>

            <S.TierLabels>
              {DISCOUNT_TIERS.map((tier) => (
                <S.TierLabel key={tier.threshold} $hit={total >= tier.threshold}>
                  {t('cart.unlock.tierLabel', { percent: tier.percent })}
                </S.TierLabel>
              ))}
            </S.TierLabels>
          </S.UnlockSection>

          <S.Lines>
            {items.length === 0 ? (
              <S.EmptyMessage>{t('cart.empty')}</S.EmptyMessage>
            ) : (
              items.map((item, index) => (
                <CartLineItem key={`${item.sku}-${index}`} item={item} onRemove={() => removeItem(index)} />
              ))
            )}
          </S.Lines>

          <S.Footer>
            <S.SummaryRow>
              <span>{t('cart.discounts')}</span>
              <span>{discountTotal > 0 ? `− ${formatPrice(discountTotal, i18n.language)}` : '—'}</span>
            </S.SummaryRow>
            <S.SubtotalRow>
              <S.SubtotalLabel>{t('cart.subtotal')}</S.SubtotalLabel>
              <S.SubtotalValue>{formatPrice(total, i18n.language)}</S.SubtotalValue>
            </S.SubtotalRow>

            <S.TermsLabel>
              <S.TermsCheckbox
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              <S.TermsText>
                <Trans
                  i18nKey="cart.terms.text"
                  components={[
                    <S.TermLink key="0" href="#" onClick={(event) => event.preventDefault()} />,
                    <S.TermLink key="1" href="#" onClick={(event) => event.preventDefault()} />,
                    <S.TermLink key="2" href="#" onClick={(event) => event.preventDefault()} />,
                  ]}
                />
              </S.TermsText>
            </S.TermsLabel>

            <S.CheckoutButton
              type="button"
              $enabled={canCheckout}
              disabled={!canCheckout}
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
            >
              {ctaLabel}
            </S.CheckoutButton>

            <S.PaymentRow>
              <S.PaymentButton type="button">{t('cart.payment.applePay')}</S.PaymentButton>
              <S.PaymentButton type="button">{t('cart.payment.payPal')}</S.PaymentButton>
            </S.PaymentRow>

            <PaymentBrands brands={BRANDS} />

            <S.ContinueShopping to="/products/screens" onClick={closeCart}>
              {t('cart.continueShopping')}
            </S.ContinueShopping>
          </S.Footer>
        </S.Drawer>
      </S.OverlayContent>
    </>
  );
}
