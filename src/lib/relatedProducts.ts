import type { TFunction } from 'i18next';
import { soundCatalog } from '@/data/catalog';
import { fetchScreensEntriesBySlugs } from '@/lib/catalogApi';
import type { CatalogItem, CatalogSheet } from '@/types/product';
import type { RelatedProduct } from '@/components/organisms/RelatedProducts';

interface Entry {
  item: CatalogItem;
  sheet: CatalogSheet;
}

/** resolve os ids relacionados numa query em lote (screens) + lookup local
 * (sound, mockado) — nunca 1 request por id (era N+1 antes). */
export async function buildRelatedProducts(ids: string[], t: TFunction): Promise<RelatedProduct[]> {
  const soundIds = new Set(ids.filter((id) => soundCatalog.some((item) => item.id === id)));
  const screensIds = ids.filter((id) => !soundIds.has(id));

  const screensItems = await fetchScreensEntriesBySlugs(screensIds);

  const byId = new Map<string, Entry>();
  screensItems.forEach((item) => byId.set(item.id, { item, sheet: 'screens' }));
  soundCatalog.forEach((item) => {
    if (soundIds.has(item.id)) byId.set(item.id, { item, sheet: 'sound' });
  });

  return ids
    .map((id): RelatedProduct | null => {
      const entry = byId.get(id);
      if (!entry) return null;

      return {
        id: entry.item.id,
        sku: entry.item.sku,
        name: entry.item.name,
        price: entry.item.price,
        tag: t(`productDetail.related.sheetTag.${entry.sheet}`),
        sheet: entry.sheet,
        to: `/products/${entry.sheet}/${entry.item.id}`,
      };
    })
    .filter((product): product is RelatedProduct => product !== null);
}
