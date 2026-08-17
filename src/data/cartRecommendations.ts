import { fetchScreensCatalog } from '@/lib/catalogApi';
import type { CatalogItem, CatalogSheet } from '@/types/product';

export interface CartRecommendation {
  id: string;
  sku: string;
  name: string;
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
    name: item.name,
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
   sugestão de compra real. */
export async function getCartRecommendations(excludeSkus: string[]): Promise<CartRecommendation[]> {
  const screensCatalog = await fetchScreensCatalog();
  const eligible = (item: CatalogItem) => item.compareAtPrice != null && !item.sold;

  const pool = screensCatalog.filter(eligible).map(toRecommendation);

  return pool.filter((entry) => !excludeSkus.includes(entry.sku)).slice(0, MAX_RECOMMENDATIONS);
}
