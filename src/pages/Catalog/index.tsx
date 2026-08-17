import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ProductCard } from '@/components/molecules/ProductCard';
import { soundCatalog } from '@/data/catalog';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import type { CatalogItem, CatalogSheet, Product } from '@/types/product';
import * as S from './styles';

const RATIO: Record<CatalogSheet, '4 / 5' | '1 / 1'> = { screens: '4 / 5', sound: '1 / 1' };
const OTHER_PATH: Record<CatalogSheet, string> = { screens: '/products/sound', sound: '/products/screens' };

export interface CatalogProps {
  sheet: CatalogSheet;
}

export function Catalog({ sheet }: CatalogProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const ratio = RATIO[sheet];
  const otherPath = OTHER_PATH[sheet];
  const stats = t(`catalog.${sheet}.stats`, { returnObjects: true }) as string[];

  useEffect(() => {
    let cancelled = false;

    const load = sheet === 'screens' ? fetchScreensCatalog() : Promise.resolve(soundCatalog);
    load.then((result) => {
      if (!cancelled) setItems(result);
    });

    return () => {
      cancelled = true;
    };
  }, [sheet]);

  const products: Product[] = items.map((item) => ({
    id: item.id,
    sku: item.sku,
    collection: `${item.sku} / ${t(`catalog.variants.${item.variant}`)}`,
    name: item.name,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    onSale: item.compareAtPrice != null,
    tag: item.sold ? t(`catalog.${sheet}.retiredTag`) : item.number,
    sold: item.sold,
    coverImage: item.coverImage,
    coverAlt: item.coverAlt,
    hoverImage: item.hoverImage,
  }));

  const tabs = (
    <S.Toggle>
      {sheet === 'screens' ? (
        <S.ToggleActive>{t('catalog.tabs.screen')}</S.ToggleActive>
      ) : (
        <S.ToggleLink to="/products/screens">{t('catalog.tabs.screen')}</S.ToggleLink>
      )}
      {sheet === 'sound' ? (
        <S.ToggleActive>{t('catalog.tabs.sound')}</S.ToggleActive>
      ) : (
        <S.ToggleLink to="/products/sound">{t('catalog.tabs.sound')}</S.ToggleLink>
      )}
    </S.Toggle>
  );

  return (
    <MainLayout>
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <div>
              <Eyebrow>{t(`catalog.${sheet}.eyebrow`)}</Eyebrow>
              <S.Title>{t(`catalog.${sheet}.title`)}</S.Title>
            </div>
            {tabs}
          </S.HeaderTop>
          <S.Stats>
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </S.Stats>
        </S.Header>

        <S.GridSection>
          <S.Grid>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                dense
                metaLayout="row"
                ratio={ratio}
                to={`/products/${sheet}/${product.id}`}
              />
            ))}
          </S.Grid>
        </S.GridSection>

        <S.BottomBar>
          <S.BottomBarInner>
            <span>{t(`catalog.${sheet}.endNote`)}</span>
            <CtaLink to={otherPath}>{t(`catalog.${sheet}.nextSheet`)}</CtaLink>
          </S.BottomBarInner>
        </S.BottomBar>
      </S.Container>
    </MainLayout>
  );
}
