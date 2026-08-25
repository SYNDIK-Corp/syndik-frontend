import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/templates/MainLayout';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ComingSoon } from '@/components/organisms/ComingSoon';
import { PageLoader } from '@/components/molecules/PageLoader';
import { ProductCard } from '@/components/molecules/ProductCard';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import { toRichProduct } from '@/lib/richProductDisplay';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { DROP_STYLES, formatStyleLabel } from '@/lib/format';
import { useAuth } from '@/hooks/useAuth';
import type { CatalogItem, CatalogSheet } from '@/types/product';
import * as S from './styles';

const RATIO: Record<CatalogSheet, '4 / 5' | '1 / 1'> = { screens: '4 / 5', sound: '1 / 1' };
const OTHER_PATH: Record<CatalogSheet, string> = { screens: '/products/sound', sound: '/products/screens' };

export interface CatalogProps {
  sheet: CatalogSheet;
}

export function Catalog({ sheet }: CatalogProps) {
  const { t } = useTranslation();
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<CatalogItem[] | null>(sheet === 'sound' ? [] : null);
  const [ownedIds, setOwnedIds] = useState<Set<number>>(new Set());
  const ratio = RATIO[sheet];
  const otherPath = OTHER_PATH[sheet];

  const activeCategory = searchParams.get('category');

  useEffect(() => {
    /* 'sound' ainda não tem produto real (ver ComingSoon abaixo) — não tem
       o que buscar, então não entra no estado de loading. */
    if (sheet === 'sound') {
      setItems([]);
      return;
    }

    let cancelled = false;
    setItems(null);

    fetchScreensCatalog().then((data) => {
      if (!cancelled) setItems(data);
    });

    return () => {
      cancelled = true;
    };
  }, [sheet]);

  // opções do filtro derivadas das categorias que de fato existem no
  // catálogo agora (nunca mostra uma categoria vazia) — sempre na ordem
  // fixa de DROP_STYLES, não na ordem em que os Drops foram cadastrados.
  const categoryOptions = useMemo(() => {
    if (!items) return [];
    const present = new Set(items.map((item) => item.style).filter((style): style is string => Boolean(style)));
    return DROP_STYLES.filter((style) => present.has(style)).map((style) => ({
      value: style,
      label: formatStyleLabel(style),
    }));
  }, [items]);

  const products = useMemo(() => {
    if (!items) return null;
    const filtered = activeCategory ? items.filter((item) => item.style === activeCategory) : items;
    return filtered.map((item) => ({
      ...toRichProduct(item, t),
      tag: item.sold ? t(`catalog.${sheet}.retiredTag`) : undefined,
    }));
  }, [items, activeCategory, sheet, t]);

  const handleCategoryChange = (value: string | null) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set('category', value);
        else next.delete('category');
        return next;
      },
      { replace: true },
    );
  };

  // "você já tem esse Drop" — só busca entitlements se tiver sessão, não
  // bloqueia o carregamento do catálogo em si (cruza depois que a lista de
  // produtos já está na tela)
  useEffect(() => {
    if (!session) {
      setOwnedIds(new Set());
      return;
    }
    let cancelled = false;
    fetchMyEntitlements().then((entitlements) => {
      if (!cancelled) setOwnedIds(new Set(entitlements.map((entitlement) => entitlement.product_id)));
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

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

  if (products === null) {
    return (
      <MainLayout hideFooter={sheet === 'screens'}>
        <PageLoader />
      </MainLayout>
    );
  }

  return (
    <MainLayout hideFooter={sheet === 'screens'}>
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <div>
              <Eyebrow>{t(`catalog.${sheet}.eyebrow`)}</Eyebrow>
              <S.Title>{t(`catalog.${sheet}.title`)}</S.Title>
            </div>
            {tabs}
          </S.HeaderTop>
        </S.Header>

        {sheet === 'screens' && categoryOptions.length > 1 && (
          <S.FilterSection>
            <CategoryFilter options={categoryOptions} active={activeCategory} onChange={handleCategoryChange} />
          </S.FilterSection>
        )}

        <S.GridSection>
          {sheet === 'sound' ? (
            <ComingSoon browseTo={otherPath} />
          ) : products.length === 0 ? (
            <S.EmptyState>{t('catalog.filters.empty')}</S.EmptyState>
          ) : (
            <S.Grid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  dense
                  shortNameOnMobile
                  metaLayout="row"
                  ratio={ratio}
                  to={`/products/${sheet}/${product.id}`}
                  owned={product.dbId !== undefined && ownedIds.has(product.dbId)}
                />
              ))}
            </S.Grid>
          )}
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
