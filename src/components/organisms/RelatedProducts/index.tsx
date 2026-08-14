import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ProductCard } from '@/components/molecules/ProductCard';
import { useHorizontalRail } from '@/hooks/useHorizontalRail';
import type { Product } from '@/types/product';
import * as S from './styles';

const RAIL_GAP = 24;

export interface RelatedProduct extends Product {
  sheet: 'screens' | 'sound';
  to: string;
}

export interface RelatedProductsProps {
  products: RelatedProduct[];
  viewSheetTo: string;
}

export function RelatedProducts({ products, viewSheetTo }: RelatedProductsProps) {
  const { t } = useTranslation();
  const { railRef, scrollByCard } = useHorizontalRail<HTMLDivElement>(RAIL_GAP);

  if (products.length === 0) return null;

  return (
    <S.Container>
      <S.Header>
        <div>
          <Eyebrow>{t('productDetail.related.eyebrow')}</Eyebrow>
          <S.Title>{t('productDetail.related.title')}</S.Title>
        </div>

        <S.HeaderActions>
          <S.ViewSheetWrapper>
            <CtaLink to={viewSheetTo}>{t('productDetail.related.viewSheet')}</CtaLink>
          </S.ViewSheetWrapper>
          <S.Arrows>
            <S.Arrow type="button" aria-label={t('common.previous')} onClick={() => scrollByCard(-1)}>
              <Icon name="chevron-left" size={15} />
            </S.Arrow>
            <S.Arrow type="button" aria-label={t('common.next')} onClick={() => scrollByCard(1)}>
              <Icon name="chevron-right" size={15} />
            </S.Arrow>
          </S.Arrows>
        </S.HeaderActions>
      </S.Header>

      <S.Rail ref={railRef}>
        {products.map((product) => (
          <S.RailItem key={product.id}>
            <ProductCard product={product} to={product.to} />
          </S.RailItem>
        ))}
        <S.RailSpacer aria-hidden="true" />
      </S.Rail>
    </S.Container>
  );
}
