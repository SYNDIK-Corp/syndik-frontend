import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ProductCard } from '@/components/molecules/ProductCard';
import type { Product } from '@/types/product';
import * as S from './styles';

const RAIL_GAP = 24;

export interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + RAIL_GAP : rail.clientWidth * 0.8;
    const max = rail.scrollWidth - rail.clientWidth;
    const target = Math.max(0, Math.min(max, rail.scrollLeft + direction * step));
    rail.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <S.Container id="best-sellers">
      <S.Header>
        <div>
          <Eyebrow>{t('bestSellers.eyebrow')}</Eyebrow>
          <S.Title>{t('bestSellers.title')}</S.Title>
        </div>

        <S.HeaderActions>
          <S.ViewAllWrapper>
            <CtaLink to="/products">{t('bestSellers.viewAll')}</CtaLink>
          </S.ViewAllWrapper>
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
            <ProductCard product={product} />
          </S.RailItem>
        ))}
        <S.RailSpacer aria-hidden="true" />
      </S.Rail>
    </S.Container>
  );
}
