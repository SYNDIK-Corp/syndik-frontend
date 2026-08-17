import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { formatPrice } from '@/lib/format';
import type { CartItem } from '@/contexts/cart-context';
import * as S from './styles';

export interface CartLineItemProps {
  item: CartItem;
  onRemove: () => void;
}

export function CartLineItem({ item, onRemove }: CartLineItemProps) {
  const { t, i18n } = useTranslation();
  const savings = item.compareAtPrice ? item.compareAtPrice - item.price : 0;

  return (
    <S.Container>
      <S.Thumb>{item.image ? <S.ThumbImage src={item.image} alt={item.name} /> : item.sku}</S.Thumb>

      <S.Info>
        <S.Top>
          <S.Meta>
            <S.Sku>{item.sku}</S.Sku>
            <S.Name>{item.name}</S.Name>
            {item.description && <S.Description>{item.description}</S.Description>}
          </S.Meta>

          <S.Prices>
            {item.compareAtPrice && (
              <S.ComparePrice>{formatPrice(item.compareAtPrice, i18n.language)}</S.ComparePrice>
            )}
            <S.Price>{formatPrice(item.price, i18n.language)}</S.Price>
          </S.Prices>
        </S.Top>

        <S.Bottom>
          {savings > 0 ? (
            <S.SaveTag>{t('cart.line.youSave', { amount: formatPrice(savings, i18n.language) })}</S.SaveTag>
          ) : (
            <span />
          )}
          <S.RemoveButton type="button" aria-label={t('cart.remove', { name: item.name })} onClick={onRemove}>
            <Icon name="trash" size={16} />
          </S.RemoveButton>
        </S.Bottom>
      </S.Info>
    </S.Container>
  );
}
