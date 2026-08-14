import { screensCatalog, soundCatalog } from '@/data/catalog';
import type { CatalogSheet } from '@/types/product';

export interface CartRecommendation {
  id: string;
  sku: string;
  name: string;
  price: number;
  compareAtPrice: number;
  sheet: CatalogSheet;
  to: string;
}

/* itens em promoção viram candidatos naturais de sugestão no carrinho */
const pool: CartRecommendation[] = [...screensCatalog, ...soundCatalog]
  .filter((item) => item.compareAtPrice != null && !item.sold)
  .map((item) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    compareAtPrice: item.compareAtPrice as number,
    sheet: screensCatalog.includes(item) ? 'screens' : 'sound',
    to: `/products/${screensCatalog.includes(item) ? 'screens' : 'sound'}/${item.id}`,
  }));

const MAX_RECOMMENDATIONS = 3;

export function getCartRecommendations(excludeSkus: string[]): CartRecommendation[] {
  return pool.filter((entry) => !excludeSkus.includes(entry.sku)).slice(0, MAX_RECOMMENDATIONS);
}
