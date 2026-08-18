import type { TFunction } from 'i18next';
import { fetchScreensCatalogByIds } from '@/lib/catalogApi';
import { searchProductIds } from '@/lib/searchApi';
import type { CatalogSheet, CatalogVariant } from '@/types/product';

export type SearchFormat = 'mobile' | 'desktop' | 'cover' | 'combo';

const FORMAT_BY_VARIANT: Record<CatalogVariant, SearchFormat> = {
  comboPack: 'combo',
  mobile7: 'mobile',
  desktop7: 'desktop',
  single: 'cover',
  albumPack: 'cover',
};

export interface SearchableItem {
  id: string;
  sku: string;
  name: string;
  sheet: CatalogSheet;
  format: SearchFormat;
  kind: string;
  price: number;
  sold: boolean;
}

export type SearchFilter = 'all' | 'screen' | 'sound' | 'mobile' | 'desktop';

/* Busca real (Fase 8): search_products (Postgres full-text + trigram,
   tolera erro de digitação) devolve só os ids em ordem de relevância; busca
   os dados completos (imagem, preço) via fetchScreensCatalogByIds,
   reaproveitando o mesmo mapeamento CatalogItem do resto do catálogo.
   'sound' ainda não tem produto real (Fase 10) — a RPC só busca
   wallpaper_pack publicado, nunca aparece aqui. */
export async function searchCatalog(query: string, filter: SearchFilter, t: TFunction): Promise<SearchableItem[]> {
  const ids = await searchProductIds(query);
  if (ids.length === 0) return [];

  const items = await fetchScreensCatalogByIds(ids);
  const byId = new Map(items.map((item) => [item.dbId, item]));
  // .in() não garante ordem — preserva a ordem de relevância da RPC
  const ordered = ids.map((id) => byId.get(id)).filter((item): item is (typeof items)[number] => Boolean(item));

  const results: SearchableItem[] = ordered.map((item) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    sheet: 'screens',
    format: FORMAT_BY_VARIANT[item.variant],
    kind: t(`catalog.variants.${item.variant}`),
    price: item.price,
    sold: item.sold ?? false,
  }));

  return results.filter((item) => {
    if (filter === 'screen' && item.sheet !== 'screens') return false;
    if (filter === 'sound' && item.sheet !== 'sound') return false;
    if (filter === 'mobile' && item.format !== 'mobile' && item.format !== 'combo') return false;
    if (filter === 'desktop' && item.format !== 'desktop' && item.format !== 'combo') return false;
    return true;
  });
}
