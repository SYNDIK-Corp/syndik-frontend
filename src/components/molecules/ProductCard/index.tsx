import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { useCart } from '@/hooks/useCart';
import { formatPriceCompact } from '@/lib/format';
import type { Product } from '@/types/product';
import * as S from './styles';

export type CardTone = 'light' | 'dark';

export interface ProductCardProps {
  product: Product;
  tone?: CardTone;
  ratio?: '4 / 5' | '1 / 1';
  metaLayout?: 'stack' | 'row';
  compact?: boolean;
  /* tipografia e controles reduzidos (grade do catálogo) */
  dense?: boolean;
  to?: string;
  onAddToBag?: (product: Product) => void;
}

export function ProductCard({
  product,
  tone = 'light',
  ratio = '4 / 5',
  metaLayout = 'stack',
  compact = false,
  dense = false,
  to = '/products',
  onAddToBag,
}: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const tag = product.tag ?? (product.onSale ? t('product.sale') : undefined);
  const sold = product.sold ?? false;

  const handleAddToBag = (event: MouseEvent) => {
    event.preventDefault();
    if (onAddToBag) {
      onAddToBag(product);
      return;
    }
    addItem({
      sku: product.sku ?? product.id.toUpperCase(),
      name: product.cartName ?? product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.coverImage,
      category: product.category,
    });
  };

  const prices = sold ? (
    <S.SoldLabel $layout={metaLayout}>{t('product.sold')}</S.SoldLabel>
  ) : (
    <S.Prices>
      <S.Price $layout={metaLayout}>{formatPriceCompact(product.price, i18n.language)}</S.Price>
      {product.compareAtPrice && (
        <S.ComparePrice>{formatPriceCompact(product.compareAtPrice, i18n.language)}</S.ComparePrice>
      )}
    </S.Prices>
  );

  return (
    <S.Container to={to} $tone={tone} $compact={compact} $dense={dense}>
      <S.Frame $ratio={ratio} $sold={sold}>
        {product.coverImage && (
          <S.Image src={product.coverImage} alt={product.coverAlt ?? product.name} />
        )}
        {!sold && product.hoverImage && (
          <S.AltImage>
            <S.Image src={product.hoverImage} alt="" />
          </S.AltImage>
        )}
        {tag && <S.Tag $sold={sold}>{tag}</S.Tag>}
        {!sold && (
          <S.CartButton type="button" aria-label={t('product.addToBag')} onClick={handleAddToBag}>
            <Icon name="bag" size={dense ? 15 : 16} />
          </S.CartButton>
        )}
      </S.Frame>

      <S.Meta $layout={metaLayout}>
        <S.TitleGroup>
          {product.category && <S.Category>{product.category}</S.Category>}
          <S.Name $layout={metaLayout}>{product.name}</S.Name>
        </S.TitleGroup>
        {prices}
      </S.Meta>
    </S.Container>
  );
}
