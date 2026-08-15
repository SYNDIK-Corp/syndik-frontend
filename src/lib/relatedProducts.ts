import type { TFunction } from 'i18next';
import { getCatalogEntry } from '@/data/productDetails';
import type { RelatedProduct } from '@/components/organisms/RelatedProducts';

export function buildRelatedProducts(ids: string[], t: TFunction): RelatedProduct[] {
  return ids
    .map((id): RelatedProduct | null => {
      const entry = getCatalogEntry(id);
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
}
