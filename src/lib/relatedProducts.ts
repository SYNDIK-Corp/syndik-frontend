import type { TFunction } from 'i18next';
import { soundCatalog } from '@/data/catalog';
import { fetchScreensCatalog, fetchScreensEntriesBySlugs } from '@/lib/catalogApi';
import { toRichProduct } from '@/lib/richProductDisplay';
import type { CatalogItem, CatalogSheet } from '@/types/product';
import type { RelatedProduct } from '@/components/organisms/RelatedProducts';

interface Entry {
  item: CatalogItem;
  sheet: CatalogSheet;
}

/** resolve os ids relacionados numa query em lote (screens) + lookup local
 * (sound, mockado) — nunca 1 request por id (era N+1 antes). Mesmo
 * tratamento rico (imagem, categoria, "Vol. N") do grid principal do
 * catálogo, via lib/richProductDisplay — antes esses cards só tinham
 * nome/preço, sem imagem nenhuma. */
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
        ...toRichProduct(entry.item, t),
        tag: t(`productDetail.related.sheetTag.${entry.sheet}`),
        sheet: entry.sheet,
        to: `/products/${entry.sheet}/${entry.item.id}`,
      };
    })
    .filter((product): product is RelatedProduct => product !== null);
}

/** recomendação sem curadoria prévia (ex.: pós-compra) — catálogo real de
 * 'screens' publicado, excluindo o que já está no pedido, não sold out.
 * Sem depender de ids fixos: um id "curado à mão" que deixa de existir no
 * catálogo silenciosamente vira "nada pra mostrar" (já aconteceu — ids de
 * um mock antigo, de antes do catálogo virar Supabase). */
export async function buildRealRelatedProducts(
  excludeSkus: string[],
  t: TFunction,
  limit = 4,
): Promise<RelatedProduct[]> {
  const catalog = await fetchScreensCatalog();
  const excluded = new Set(excludeSkus);

  return catalog
    .filter((item) => !item.sold && !excluded.has(item.sku))
    .slice(0, limit)
    .map((item) => ({
      ...toRichProduct(item, t),
      tag: t('productDetail.related.sheetTag.screens'),
      sheet: 'screens' as const,
      to: `/products/screens/${item.id}`,
    }));
}
