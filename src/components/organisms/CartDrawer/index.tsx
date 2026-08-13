import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

export function CartDrawer() {
  const { t, i18n } = useTranslation();
  const { items, total, isOpen, removeItem, closeCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <S.Backdrop $open={isOpen} onClick={closeCart} />
      <S.Drawer $open={isOpen} aria-hidden={!isOpen}>
        <S.Header>
          <S.HeaderLabel>
            {t('cart.bag')} — {items.length}
          </S.HeaderLabel>
          <S.CloseButton type="button" onClick={closeCart}>
            {t('cart.close')} ×
          </S.CloseButton>
        </S.Header>

        <S.Lines>
          {items.length === 0 ? (
            <S.EmptyMessage>{t('cart.empty')}</S.EmptyMessage>
          ) : (
            items.map((item, index) => (
              <S.Line key={`${item.sku}-${index}`}>
                <S.LineInfo>
                  <S.LineSku>{item.sku}</S.LineSku>
                  <S.LineName>{item.name}</S.LineName>
                </S.LineInfo>
                <S.LineActions>
                  <S.LinePrice>{formatPrice(item.price, i18n.language)}</S.LinePrice>
                  <S.RemoveButton
                    type="button"
                    aria-label={t('cart.remove', { name: item.name })}
                    onClick={() => removeItem(index)}
                  >
                    ×
                  </S.RemoveButton>
                </S.LineActions>
              </S.Line>
            ))
          )}
        </S.Lines>

        <S.Footer>
          <S.TotalRow>
            <S.TotalLabel>{t('cart.total')}</S.TotalLabel>
            <S.TotalValue>{formatPrice(total, i18n.language)}</S.TotalValue>
          </S.TotalRow>
          <S.CheckoutButton type="button">
            {t('cart.checkout')} <span aria-hidden="true">&nbsp;→</span>
          </S.CheckoutButton>
          <S.Perks>{t('cart.perks')}</S.Perks>
        </S.Footer>
      </S.Drawer>
    </>
  );
}
