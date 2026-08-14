import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductInfo } from '@/components/organisms/ProductInfo';
import { RelatedProducts, type RelatedProduct } from '@/components/organisms/RelatedProducts';
import { getCatalogEntry, getProductDetail } from '@/data/productDetails';
import type { CatalogSheet } from '@/types/product';
import * as S from './styles';

interface FaqItem {
  question: string;
  answer: string;
}

interface IncludedRow {
  label: string;
  value: string;
}

export function ProductDetail() {
  const { sheet, id } = useParams<{ sheet: CatalogSheet; id: string }>();
  const { t, i18n } = useTranslation();

  const detail = id ? getProductDetail(id) : undefined;

  if (!detail || detail.sheet !== sheet) {
    return <Navigate to="/products/screens" replace />;
  }

  const { item, plateCount, relatedIds } = detail;
  const compareAtPrice = item.compareAtPrice;
  const onSale = item.compareAtPrice != null;

  const collectionLabel = t(`productDetail.items.${item.id}.collectionLabel`, {
    defaultValue: t('productDetail.genericCollectionLabel', {
      sku: item.sku,
      variant: t(`catalog.variants.${item.variant}`),
    }),
  });

  const description = t(`productDetail.items.${item.id}.description`, {
    defaultValue: t('productDetail.genericDescription', { name: item.name }),
  });

  const fileInfo = t(`productDetail.items.${item.id}.fileInfo`, {
    defaultValue:
      plateCount === 1
        ? t('productDetail.genericFileInfoSingular')
        : t('productDetail.genericFileInfo', { count: plateCount }),
  });

  const platesKey = `productDetail.items.${item.id}.plates`;
  const plateNames = i18n.exists(platesKey)
    ? (t(platesKey, { returnObjects: true }) as string[])
    : Array.from({ length: plateCount }, (_, index) =>
        t('productDetail.genericPlateName', { number: String(index + 1).padStart(2, '0') }),
      );

  const includedRows = t(`productDetail.included.${item.variant}`, {
    returnObjects: true,
  }) as IncludedRow[];

  const faqKey = `productDetail.items.${item.id}.faq`;
  const faq = i18n.exists(faqKey)
    ? (t(faqKey, { returnObjects: true }) as FaqItem[])
    : (t(`productDetail.faq.${sheet}`, { returnObjects: true }) as FaqItem[]);

  const related: RelatedProduct[] = relatedIds
    .map((relatedId): RelatedProduct | null => {
      const entry = getCatalogEntry(relatedId);
      if (!entry) return null;

      return {
        id: entry.item.id,
        sku: entry.item.sku,
        collection: `${entry.item.sku} / ${t(`catalog.variants.${entry.item.variant}`)}`,
        name: entry.item.name,
        price: entry.item.price,
        tag: t(`productDetail.related.sheetTag.${entry.sheet}`),
        sheet: entry.sheet,
        to: `/products/${entry.sheet}/${entry.item.id}`,
      };
    })
    .filter((product): product is RelatedProduct => product !== null);

  return (
    <MainLayout>
      <S.Breadcrumb>
        <S.BreadcrumbLink to={`/products/${sheet}`}>{t(`productDetail.sheetLabel.${sheet}`)}</S.BreadcrumbLink>
        <span>—</span>
        <S.BreadcrumbCurrent>{item.name}</S.BreadcrumbCurrent>
      </S.Breadcrumb>

      <S.Section>
        <S.Grid>
          <ProductGallery plateNames={plateNames} />
          <ProductInfo
            sku={item.sku}
            collectionLabel={collectionLabel}
            name={item.name}
            price={item.price}
            compareAtPrice={compareAtPrice}
            onSale={onSale}
            description={description}
            fileInfo={fileInfo}
            includedRows={includedRows}
            faq={faq}
          />
        </S.Grid>
      </S.Section>

      <RelatedProducts products={related} viewSheetTo={`/products/${sheet}`} />
    </MainLayout>
  );
}
