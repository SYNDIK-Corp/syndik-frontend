import { soundCatalog } from '@/data/catalog';
import {
  fetchFileBreakdown,
  fetchGalleryImages,
  fetchIncludedRows,
  fetchProductFaq,
  fetchRelatedOverrides,
  fetchScreensCatalogExcluding,
  fetchScreensEntry,
  type FaqRow,
  type FileBreakdownRow,
  type IncludedRow,
} from '@/lib/catalogApi';
import type { CatalogItem, CatalogSheet, CatalogVariant } from '@/types/product';

/* 'screens' (wallpapers) vem do Supabase via lib/catalogApi.ts, 100%
   backend-driven (nome, descrição, preço, imagens, specs, FAQ). 'sound'
   continua mockado até virar produto de verdade (Fase 10) — mantém os
   templates genéricos por variante/sheet só pra esses 2 itens mock. */

const RELATED_CAP = 6;

interface CatalogEntry {
  item: CatalogItem;
  sheet: CatalogSheet;
}

const soundById = new Map<string, CatalogEntry>();
soundCatalog.forEach((item) => soundById.set(item.id, { item, sheet: 'sound' }));

/* quantas pranchas/artes compõem cada variante do pack 'sound' (mock) —
   para 'screens' isso vem do banco (soma real de fetchFileBreakdown);
   comboPack/mobile7/desktop7 nunca são lidos daqui (só existem no
   Record por exaustividade de tipo) */
const SOUND_PLATE_COUNT: Record<CatalogVariant, number> = {
  comboPack: 14,
  mobile7: 7,
  desktop7: 7,
  single: 1,
  albumPack: 3,
};

export interface ProductDetailData {
  item: CatalogItem;
  sheet: CatalogSheet;
  plateCount: number;
  relatedIds: string[];
  /* previews reais da galeria (product_images.role='gallery'), um por
     design. Vazio até o Drop ter cluster/ enviado; a UI cai pro
     placeholder genérico nesse caso. */
  galleryImages: string[];
  /* contagem real de arquivos por formato (product_files, RPC
     parametrizada) — só 'screens'; vazio em 'sound'. */
  fileBreakdown: FileBreakdownRow[];
  /* linhas extras de especificação cadastradas no produto
     (product_included_rows) — só 'screens'; vazio em 'sound'. */
  includedRows: IncludedRow[];
  /* FAQ real do produto (product_faqs) — só 'screens'; vazio em 'sound'. */
  faq: FaqRow[];
}

export async function getCatalogEntry(id: string): Promise<CatalogEntry | undefined> {
  const soundEntry = soundById.get(id);
  if (soundEntry) return soundEntry;

  const item = await fetchScreensEntry(id);
  return item ? { item, sheet: 'screens' } : undefined;
}

/* fallback quando não há curadoria manual: mesmo catálogo primeiro, depois
   o outro, excluindo vendidos — limitado a RELATED_CAP direto na query
   (nunca busca o catálogo inteiro pro client, escala com o total de
   produtos). sound é local (pequeno, já em memória) então filtra em JS;
   screens sempre via fetchScreensCatalogExcluding (bounded no banco). */
async function defaultRelatedIds(id: string, sheet: CatalogSheet): Promise<string[]> {
  if (sheet === 'screens') {
    const sameSheet = await fetchScreensCatalogExcluding(id, RELATED_CAP);
    const ids = sameSheet.map((item) => item.id);
    if (ids.length >= RELATED_CAP) return ids;

    const soundFill = soundCatalog
      .filter((item) => !item.sold)
      .slice(0, RELATED_CAP - ids.length)
      .map((item) => item.id);
    return [...ids, ...soundFill];
  }

  const sameSheet = soundCatalog.filter((item) => item.id !== id && !item.sold).map((item) => item.id);
  if (sameSheet.length >= RELATED_CAP) return sameSheet.slice(0, RELATED_CAP);

  const otherSheet = await fetchScreensCatalogExcluding(id, RELATED_CAP - sameSheet.length);
  return [...sameSheet, ...otherSheet.map((item) => item.id)];
}

export async function getProductDetail(id: string): Promise<ProductDetailData | undefined> {
  const entry = await getCatalogEntry(id);
  if (!entry) return undefined;

  if (entry.sheet === 'sound') {
    return {
      item: entry.item,
      sheet: 'sound',
      plateCount: SOUND_PLATE_COUNT[entry.item.variant],
      relatedIds: await defaultRelatedIds(id, 'sound'),
      galleryImages: [],
      fileBreakdown: [],
      includedRows: [],
      faq: [],
    };
  }

  const { dbId } = entry.item;
  if (!dbId) return undefined;

  const [breakdown, overrides, galleryImages, includedRows, faq] = await Promise.all([
    fetchFileBreakdown(dbId),
    fetchRelatedOverrides(dbId),
    fetchGalleryImages(dbId),
    fetchIncludedRows(dbId),
    fetchProductFaq(dbId),
  ]);

  const plateCount = breakdown.reduce((sum, row) => sum + row.file_count, 0);

  return {
    item: entry.item,
    sheet: 'screens',
    plateCount,
    relatedIds: overrides.length > 0 ? overrides : await defaultRelatedIds(id, 'screens'),
    galleryImages,
    fileBreakdown: breakdown,
    includedRows,
    faq,
  };
}
