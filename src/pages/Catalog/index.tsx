import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ComingSoon } from '@/components/organisms/ComingSoon';
import { PageLoader } from '@/components/molecules/PageLoader';
import { ProductCard } from '@/components/molecules/ProductCard';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import { toRichProduct } from '@/lib/richProductDisplay';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { useAuth } from '@/hooks/useAuth';
import type { CatalogSheet, Product } from '@/types/product';
import * as S from './styles';

const RATIO: Record<CatalogSheet, '4 / 5' | '1 / 1'> = { screens: '4 / 5', sound: '1 / 1' };
const OTHER_PATH: Record<CatalogSheet, string> = { screens: '/products/sound', sound: '/products/screens' };

export interface CatalogProps {
  sheet: CatalogSheet;
}

export function Catalog({ sheet }: CatalogProps) {
  const { t } = useTranslation();
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[] | null>(sheet === 'sound' ? [] : null);
  const [ownedIds, setOwnedIds] = useState<Set<number>>(new Set());
  const ratio = RATIO[sheet];
  const otherPath = OTHER_PATH[sheet];

  useEffect(() => {
    /* 'sound' ainda não tem produto real (ver ComingSoon abaixo) — não tem
       o que buscar, então não entra no estado de loading. */
    if (sheet === 'sound') {
      setProducts([]);
      return;
    }

    let cancelled = false;
    setProducts(null);

    fetchScreensCatalog().then((items) => {
      if (cancelled) return;
      setProducts(
        items.map((item) => ({
          ...toRichProduct(item, t),
          tag: item.sold ? t(`catalog.${sheet}.retiredTag`) : undefined,
        })),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [sheet, t]);

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

        <S.GridSection>
          {sheet === 'sound' ? (
            <ComingSoon browseTo={otherPath} />
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
