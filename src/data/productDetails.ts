import { screensCatalog, soundCatalog } from '@/data/catalog';
import type { CatalogItem, CatalogSheet, CatalogVariant } from '@/types/product';

interface CatalogEntry {
  item: CatalogItem;
  sheet: CatalogSheet;
}

const catalogById = new Map<string, CatalogEntry>();
screensCatalog.forEach((item) => catalogById.set(item.id, { item, sheet: 'screens' }));
soundCatalog.forEach((item) => catalogById.set(item.id, { item, sheet: 'sound' }));

/* quantas pranchas/artes compõem cada variante do pack */
const PLATE_COUNT: Record<CatalogVariant, number> = {
  mobile7: 7,
  desktop7: 7,
  single: 1,
  albumPack: 3,
};

export interface ProductDetailData {
  item: CatalogItem;
  sheet: CatalogSheet;
  plateCount: number;
  compareAtPrice?: number;
  onSale?: boolean;
  relatedIds: string[];
}

/* precificação e cross-sell autorados manualmente; demais produtos usam fallback abaixo */
const overrides: Record<string, Partial<Pick<ProductDetailData, 'compareAtPrice' | 'onSale' | 'relatedIds'>>> = {
  'scr-001': {
    compareAtPrice: 5.99,
    onSale: true,
    relatedIds: ['scr-002', 'scr-003', 'snd-001', 'scr-005', 'scr-006', 'snd-003'],
  },
};

function defaultRelatedIds(id: string, sheet: CatalogSheet): string[] {
  const entries = Array.from(catalogById.values()).filter(
    (entry) => entry.item.id !== id && !entry.item.sold,
  );
  const sameSheet = entries.filter((entry) => entry.sheet === sheet);
  const otherSheet = entries.filter((entry) => entry.sheet !== sheet);
  return [...sameSheet, ...otherSheet].slice(0, 6).map((entry) => entry.item.id);
}

export function getCatalogEntry(id: string): CatalogEntry | undefined {
  return catalogById.get(id);
}

export function getProductDetail(id: string): ProductDetailData | undefined {
  const entry = catalogById.get(id);
  if (!entry) return undefined;

  const override = overrides[id] ?? {};

  return {
    item: entry.item,
    sheet: entry.sheet,
    plateCount: PLATE_COUNT[entry.item.variant],
    compareAtPrice: override.compareAtPrice,
    onSale: override.onSale,
    relatedIds: override.relatedIds ?? defaultRelatedIds(id, entry.sheet),
  };
}
