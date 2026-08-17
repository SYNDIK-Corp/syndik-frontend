import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductInfo } from '@/components/organisms/ProductInfo';
import { RelatedProducts, type RelatedProduct } from '@/components/organisms/RelatedProducts';
import { getProductDetail, type ProductDetailData } from '@/data/productDetails';
import { buildRelatedProducts } from '@/lib/relatedProducts';
import type { CatalogSheet } from '@/types/product';
import * as S from './styles';

type LoadState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'ready'; detail: ProductDetailData; related: RelatedProduct[] };

export function ProductDetail() {
  const { sheet, id } = useParams<{ sheet: CatalogSheet; id: string }>();
  const { t } = useTranslation();
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    if (!id) {
      setState({ status: 'not-found' });
      return;
    }

    getProductDetail(id).then(async (detail) => {
      if (cancelled) return;
      if (!detail || detail.sheet !== sheet) {
        setState({ status: 'not-found' });
        return;
      }
      const related = await buildRelatedProducts(detail.relatedIds, t);
      if (!cancelled) setState({ status: 'ready', detail, related });
    });

    return () => {
      cancelled = true;
    };
  }, [id, sheet, t]);

  if (state.status === 'not-found') {
    return <Navigate to="/products/screens" replace />;
  }

  if (state.status === 'loading') {
    return <MainLayout>{null}</MainLayout>;
  }

  const { item, sheet: itemSheet, plateCount, galleryImages, fileBreakdown, includedRows, faq } = state.detail;
  const compareAtPrice = item.compareAtPrice;
  const onSale = item.compareAtPrice != null;

  /* 'screens' é 100% backend: nome/descrição/specs/FAQ vêm do produto real.
     'sound' continua mockado (Fase 10) — usa os templates genéricos por
     variante/sheet só pra esses 2 itens, nunca por id individual. */
  const collectionLabel =
    item.collectionLabel ??
    t('productDetail.genericCollectionLabel', { sku: item.sku, variant: t(`catalog.variants.${item.variant}`) });

  const description = item.description ?? t('productDetail.genericDescription', { name: item.name });

  const fileInfo =
    plateCount === 1
      ? t('productDetail.genericFileInfoSingular')
      : t('productDetail.genericFileInfo', { count: plateCount });

  /* contagem da galeria (imagens de preview reais, se existirem) é
     independente de plateCount (quantos arquivos pagos vêm no pack) — um
     Drop com cluster/ enviado mostra os previews reais; sem cluster ainda,
     cai no placeholder genérico do tamanho de plateCount. */
  const galleryCount = galleryImages.length > 0 ? galleryImages.length : plateCount;
  const plateNames = Array.from({ length: galleryCount }, (_, index) =>
    t('productDetail.genericPlateName', { number: String(index + 1).padStart(2, '0') }),
  );
  const plates = plateNames.map((name, index) => ({ name, image: galleryImages[index] }));

  const deviceLabel: Record<string, string> = {
    mobile: t('productDetail.deviceLabel.mobile'),
    desktop: t('productDetail.deviceLabel.desktop'),
    any: t('productDetail.deviceLabel.any'),
  };
  const derivedIncludedRows = fileBreakdown.map((row) => ({
    label: deviceLabel[row.device_variant] ?? row.device_variant,
    value: String(row.file_count),
  }));

  const resolvedIncludedRows =
    itemSheet === 'screens'
      ? [...derivedIncludedRows, ...includedRows]
      : (t(`productDetail.included.${item.variant}`, { returnObjects: true }) as { label: string; value: string }[]);

  const resolvedFaq =
    itemSheet === 'screens'
      ? faq
      : (t(`productDetail.faq.${sheet}`, { returnObjects: true }) as { question: string; answer: string }[]);

  return (
    <MainLayout>
      <S.Breadcrumb>
        <S.BreadcrumbLink to={`/products/${sheet}`}>{t(`productDetail.sheetLabel.${sheet}`)}</S.BreadcrumbLink>
        <span>—</span>
        <S.BreadcrumbCurrent>{item.name}</S.BreadcrumbCurrent>
      </S.Breadcrumb>

      <S.Section>
        <S.Grid>
          <ProductGallery plates={plates} />
          <ProductInfo
            sku={item.sku}
            collectionLabel={collectionLabel}
            name={item.name}
            price={item.price}
            compareAtPrice={compareAtPrice}
            onSale={onSale}
            description={description}
            fileInfo={fileInfo}
            includedRows={resolvedIncludedRows}
            faq={resolvedFaq}
          />
        </S.Grid>
      </S.Section>

      <RelatedProducts products={state.related} viewAllTo={`/products/${sheet}`} />
    </MainLayout>
  );
}
