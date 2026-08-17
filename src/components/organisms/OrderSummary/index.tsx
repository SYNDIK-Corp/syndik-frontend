import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderSummaryLine } from '@/components/molecules/OrderSummaryLine';
import { AddonRow } from '@/components/molecules/AddonRow';
import { PaymentBrands } from '@/components/molecules/PaymentBrands';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import { getCartRecommendations, type CartRecommendation } from '@/data/cartRecommendations';
import { getDiscountRate } from '@/data/discountCodes';
import * as S from './styles';

const SUMMARY_BRANDS = ['visa', 'mastercard', 'amex', 'elo', 'applePay', 'gpay', 'pix', 'stripe'] as const;

export function OrderSummary() {
  const { t, i18n } = useTranslation();
  const { items, total, removeItem, addItem } = useCart();

  const [code, setCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; rate: number } | null>(null);
  const [codeStatus, setCodeStatus] = useState<'idle' | 'applied' | 'invalid'>('idle');

  const handleApplyCode = () => {
    const normalized = code.trim().toUpperCase();
    const rate = getDiscountRate(normalized);
    if (rate) {
      setAppliedDiscount({ code: normalized, rate });
      setCodeStatus('applied');
    } else {
      setAppliedDiscount(null);
      setCodeStatus('invalid');
    }
  };

  const discountAmount = appliedDiscount ? total * appliedDiscount.rate : 0;
  const grandTotal = Math.max(0, total - discountAmount);

  /* upsell do checkout — mesma fonte de recomendação real (Drops em
     promoção, excluindo o que já está na sacola) usada no drawer do
     carrinho; antes disso era uma lista fixa com item mockado do catálogo
     'sound' (SND-000) misturado. */
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

  return (
    <S.Container>
      <S.Pane>
        <div>
          {items.length === 0 ? (
            <S.EmptyMessage>{t('checkout.summary.empty')}</S.EmptyMessage>
          ) : (
            items.map((item, index) => (
              <OrderSummaryLine key={`${item.sku}-${index}`} item={item} onRemove={() => removeItem(index)} />
            ))
          )}
        </div>

        <S.CodeBox>
          <S.CodeInput
            placeholder={t('checkout.summary.codePlaceholder')}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <S.ApplyButton type="button" onClick={handleApplyCode}>
            {t('checkout.summary.apply')}
          </S.ApplyButton>
        </S.CodeBox>
        <S.CodeNote>
          {codeStatus === 'applied' &&
            appliedDiscount &&
            t('checkout.summary.codeApplied', {
              code: appliedDiscount.code,
              percent: Math.round(appliedDiscount.rate * 100),
            })}
          {codeStatus === 'invalid' && t('checkout.summary.codeInvalid')}
          {codeStatus === 'idle' && t('checkout.summary.codeHint')}
        </S.CodeNote>

        <S.Totals>
          <S.TotalRow>
            <S.TotalRowLabel>{t('checkout.summary.subtotal')}</S.TotalRowLabel>
            <span>{formatPrice(total, i18n.language)}</span>
          </S.TotalRow>
          <S.TotalRow>
            <S.TotalRowLabel>{t('checkout.summary.discount')}</S.TotalRowLabel>
            <span>{discountAmount > 0 ? `− ${formatPrice(discountAmount, i18n.language)}` : '—'}</span>
          </S.TotalRow>
          <S.TotalRow>
            <S.TotalRowLabel>{t('checkout.summary.delivery')}</S.TotalRowLabel>
            <span>{t('checkout.summary.deliveryValue')}</span>
          </S.TotalRow>
        </S.Totals>

        <S.GrandTotal>
          <S.GrandTotalLabel>{t('checkout.summary.total')}</S.GrandTotalLabel>
          <S.GrandTotalValue>
            <S.Currency>{t('checkout.summary.currency')}</S.Currency>
            <S.Amount>{formatPrice(grandTotal, i18n.language)}</S.Amount>
          </S.GrandTotalValue>
        </S.GrandTotal>

        {recommendations.length > 0 && (
          <S.AddonsSection>
            <S.AddonsLabel>{t('checkout.summary.addToDrop')}</S.AddonsLabel>
            <S.AddonsList>
              {recommendations.map((addon) => (
                <AddonRow
                  key={addon.id}
                  name={addon.name}
                  description={t('checkout.summary.addonHint')}
                  price={addon.price}
                  image={addon.image}
                  onAdd={() =>
                    addItem(
                      {
                        sku: addon.sku,
                        name: addon.name,
                        category: addon.category,
                        price: addon.price,
                        compareAtPrice: addon.compareAtPrice,
                        image: addon.image,
                      },
                      { openCart: false },
                    )
                  }
                />
              ))}
            </S.AddonsList>
          </S.AddonsSection>
        )}

        <S.BrandsRow>
          <PaymentBrands brands={[...SUMMARY_BRANDS]} />
        </S.BrandsRow>
      </S.Pane>
    </S.Container>
  );
}
