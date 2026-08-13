import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product';
import * as S from './styles';

export interface ProductCardProps {
  product: Product;
  onAddToBag?: (product: Product) => void;
}

export function ProductCard({ product, onAddToBag }: ProductCardProps) {
  const { t, i18n } = useTranslation();

  const handleAddToBag = (event: MouseEvent) => {
    event.preventDefault();
    onAddToBag?.(product);
  };

  return (
    <S.Container to="/products">
      <S.Frame>
        {product.coverImage && (
          <S.Image src={product.coverImage} alt={product.coverAlt ?? product.name} />
        )}
        {product.hoverImage && (
          <S.AltImage>
            <S.Image src={product.hoverImage} alt="" />
          </S.AltImage>
        )}
        {product.onSale && <S.SaleTag>{t('product.sale')}</S.SaleTag>}
        <S.CartButton type="button" aria-label={t('product.addToBag')} onClick={handleAddToBag}>
          <Icon name="bag" size={16} />
        </S.CartButton>
      </S.Frame>

      <S.Meta>
        <S.Collection>{product.collection}</S.Collection>
        <S.Name>{product.name}</S.Name>
        <S.Prices>
          <S.Price>{formatPrice(product.price, i18n.language)}</S.Price>
          {product.compareAtPrice && (
            <S.ComparePrice>{formatPrice(product.compareAtPrice, i18n.language)}</S.ComparePrice>
          )}
        </S.Prices>
      </S.Meta>
    </S.Container>
  );
}
