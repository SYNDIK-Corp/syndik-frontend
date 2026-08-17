import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/format';
import type { CartItem } from '@/contexts/cart-context';
import * as S from './styles';

export interface OrderSummaryLineProps {
  item: CartItem;
  onRemove: () => void;
}

export function OrderSummaryLine({ item, onRemove }: OrderSummaryLineProps) {
  const { t, i18n } = useTranslation();

  return (
    <S.Container>
      <S.ThumbWrapper>
        <S.Thumb>{item.image ? <S.ThumbImage src={item.image} alt="" /> : item.sku}</S.Thumb>
        <S.QtyBadge>1</S.QtyBadge>
      </S.ThumbWrapper>

      <S.Info>
        <S.Sku>{item.category ?? item.sku}</S.Sku>
        <S.Name>{item.name}</S.Name>
        <S.RemoveButton type="button" onClick={onRemove}>
          {t('checkout.summary.remove')}
        </S.RemoveButton>
      </S.Info>

      <S.Price>{formatPrice(item.price, i18n.language)}</S.Price>
    </S.Container>
  );
}
