import type { TFunction } from 'i18next';
import { soundCatalog } from '@/data/catalog';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import { searchTags } from '@/data/searchTags';
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
  tags: string[];
}

export async function buildSearchIndex(t: TFunction): Promise<SearchableItem[]> {
  const screensCatalog = await fetchScreensCatalog();
  const entries = [
    ...screensCatalog.map((item) => ({ item, sheet: 'screens' as CatalogSheet })),
    ...soundCatalog.map((item) => ({ item, sheet: 'sound' as CatalogSheet })),
  ];

  return entries.map(({ item, sheet }) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    sheet,
    format: FORMAT_BY_VARIANT[item.variant],
    kind: t(`catalog.variants.${item.variant}`),
    price: item.price,
    sold: item.sold ?? false,
    tags: searchTags[item.sku] ?? [],
  }));
}

export type SearchFilter = 'all' | 'screen' | 'sound' | 'mobile' | 'desktop';

export function searchCatalog(index: SearchableItem[], query: string, filter: SearchFilter): SearchableItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return index.filter((item) => {
    if (filter === 'screen' && item.sheet !== 'screens') return false;
    if (filter === 'sound' && item.sheet !== 'sound') return false;
    if (filter === 'mobile' && item.format !== 'mobile' && item.format !== 'combo') return false;
    if (filter === 'desktop' && item.format !== 'desktop' && item.format !== 'combo') return false;
    if (!normalizedQuery) return true;

    const haystack = `${item.name} ${item.sku} ${item.kind} ${item.tags.join(' ')} ${item.price}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
