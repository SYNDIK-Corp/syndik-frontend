import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/format';
import type { CartRecommendation } from '@/data/cartRecommendations';
import * as S from './styles';

export interface CartRecommendationCardProps {
  product: CartRecommendation;
  onAdd: () => void;
}

export function CartRecommendationCard({ product, onAdd }: CartRecommendationCardProps) {
  const { t, i18n } = useTranslation();
  const savings = product.compareAtPrice - product.price;

  return (
    <S.Container>
      <S.Thumb>{product.sku}</S.Thumb>

      <S.Meta>
        <S.Sku>{product.sku}</S.Sku>
        <S.Name>{product.name}</S.Name>
        <S.Prices>
          <S.Price>{formatPrice(product.price, i18n.language)}</S.Price>
          <S.ComparePrice>{formatPrice(product.compareAtPrice, i18n.language)}</S.ComparePrice>
        </S.Prices>
        <S.SaveTag>{t('cart.line.save', { amount: formatPrice(savings, i18n.language) })}</S.SaveTag>
        <S.AddButton type="button" onClick={onAdd}>
          {t('product.addToBag')}
        </S.AddButton>
      </S.Meta>
    </S.Container>
  );
}
