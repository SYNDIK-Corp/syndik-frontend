import { fetchScreensCatalog } from '@/lib/catalogApi';
import { formatStyleLabel } from '@/lib/format';
import { shortRichTitle } from '@/lib/richProductDisplay';
import type { CatalogItem, CatalogSheet } from '@/types/product';

export interface CartRecommendation {
  id: string;
  sku: string;
  name: string;
  category?: string;
  price: number;
  compareAtPrice: number;
  sheet: CatalogSheet;
  to: string;
  image?: string;
}

function toRecommendation(item: CatalogItem): CartRecommendation {
  return {
    id: item.id,
    sku: item.sku,
    name: shortRichTitle(item),
    category: item.style ? formatStyleLabel(item.style) : undefined,
    price: item.price,
    compareAtPrice: item.compareAtPrice as number,
    sheet: 'screens',
    to: `/products/screens/${item.id}`,
    image: item.coverImage,
  };
}

const MAX_RECOMMENDATIONS = 3;

/* itens em promoção viram candidatos naturais de sugestão no carrinho —
   só produtos reais (screens/Supabase); 'sound' é mock, não entra em
   sugestão de compra real. MVP 2.2.1: prioriza candidatos da(s) mesma(s)
   categoria(s)/estilo do que já está na sacola (ex.: sacola tem "MONEY /
   POWER", sugestão de outro "MONEY / POWER" vem antes de qualquer outra) —
   sort estável, então dentro de cada grupo mantém a ordem natural do
   catálogo (sort_order). Sem categorias na sacola (carrinho vazio de
   category, ou nenhuma correspondência), cai de volta na ordem atual. */
export async function getCartRecommendations(
  excludeSkus: string[],
  cartCategories: string[] = [],
): Promise<CartRecommendation[]> {
  const screensCatalog = await fetchScreensCatalog();
  const eligible = (item: CatalogItem) => item.compareAtPrice != null && !item.sold;

  const pool = screensCatalog
    .filter(eligible)
    .map(toRecommendation)
    .filter((entry) => !excludeSkus.includes(entry.sku));

  const categorySet = new Set(cartCategories.filter(Boolean));
  const sorted = [...pool].sort((a, b) => {
    const aMatch = a.category && categorySet.has(a.category) ? 0 : 1;
    const bMatch = b.category && categorySet.has(b.category) ? 0 : 1;
    return aMatch - bMatch;
  });

  return sorted.slice(0, MAX_RECOMMENDATIONS);
}
