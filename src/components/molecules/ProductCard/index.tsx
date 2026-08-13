import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product';
import * as S from './styles';

export type CardTone = 'light' | 'dark';

export interface ProductCardProps {
  product: Product;
  tone?: CardTone;
  ratio?: '4 / 5' | '1 / 1';
  metaLayout?: 'stack' | 'row';
  /* versão reduzida (ex.: mini-carrossel do menu lateral) */
  compact?: boolean;
  onAddToBag?: (product: Product) => void;
}

export function ProductCard({
  product,
  tone = 'light',
  ratio = '4 / 5',
  metaLayout = 'stack',
  compact = false,
  onAddToBag,
}: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const tag = product.tag ?? (product.onSale ? t('product.sale') : undefined);

  const handleAddToBag = (event: MouseEvent) => {
    event.preventDefault();
    onAddToBag?.(product);
  };

  const prices = (
    <S.Prices>
      <S.Price $layout={metaLayout}>{formatPrice(product.price, i18n.language)}</S.Price>
      {product.compareAtPrice && (
        <S.ComparePrice>{formatPrice(product.compareAtPrice, i18n.language)}</S.ComparePrice>
      )}
    </S.Prices>
  );

  return (
    <S.Container to="/products" $tone={tone} $compact={compact}>
      <S.Frame $ratio={ratio}>
        {product.coverImage && (
          <S.Image src={product.coverImage} alt={product.coverAlt ?? product.name} />
        )}
        {product.hoverImage && (
          <S.AltImage>
            <S.Image src={product.hoverImage} alt="" />
          </S.AltImage>
        )}
        {tag && <S.Tag>{tag}</S.Tag>}
        <S.CartButton type="button" aria-label={t('product.addToBag')} onClick={handleAddToBag}>
          <Icon name="bag" size={16} />
        </S.CartButton>
      </S.Frame>

      <S.Meta $layout={metaLayout}>
        {metaLayout === 'row' ? (
          <>
            <S.MetaInfo>
              <S.Collection>{product.collection}</S.Collection>
              <S.Name $layout={metaLayout}>{product.name}</S.Name>
            </S.MetaInfo>
            {prices}
          </>
        ) : (
          <>
            <S.Collection>{product.collection}</S.Collection>
            <S.Name $layout={metaLayout}>{product.name}</S.Name>
            {prices}
          </>
        )}
      </S.Meta>
    </S.Container>
  );
}
