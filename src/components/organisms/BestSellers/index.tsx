import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ProductCard } from '@/components/molecules/ProductCard';
import { useHorizontalRail } from '@/hooks/useHorizontalRail';
import { toRichProduct } from '@/lib/richProductDisplay';
import type { CatalogItem } from '@/types/product';
import * as S from './styles';

const RAIL_GAP = 24;

export interface BestSellersProps {
  products: CatalogItem[];
}

export function BestSellers({ products: items }: BestSellersProps) {
  const { t } = useTranslation();
  const { railRef, scrollByCard } = useHorizontalRail<HTMLDivElement>(RAIL_GAP);
  /* mesma categoria + "Vol. N" do grid principal do catálogo (Products >
     Screens) — pedido do usuário pra manter design/formato idênticos aqui. */
  const products = items.map((item) => toRichProduct(item, t));

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
            <ProductCard product={product} dense to={`/products/screens/${product.id}`} />
          </S.RailItem>
        ))}
        <S.RailSpacer aria-hidden="true" />
      </S.Rail>
    </S.Container>
  );
}
