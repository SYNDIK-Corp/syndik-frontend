import { soundCatalog } from '@/data/catalog';
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
}

function toRecommendation(item: CatalogItem, sheet: CatalogSheet): CartRecommendation {
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    compareAtPrice: item.compareAtPrice as number,
    sheet,
    to: `/products/${sheet}/${item.id}`,
  };
}

const MAX_RECOMMENDATIONS = 3;

/* itens em promoção viram candidatos naturais de sugestão no carrinho */
export async function getCartRecommendations(excludeSkus: string[]): Promise<CartRecommendation[]> {
  const screensCatalog = await fetchScreensCatalog();
  const eligible = (item: CatalogItem) => item.compareAtPrice != null && !item.sold;

  const pool = [
    ...screensCatalog.filter(eligible).map((item) => toRecommendation(item, 'screens' as CatalogSheet)),
    ...soundCatalog.filter(eligible).map((item) => toRecommendation(item, 'sound' as CatalogSheet)),
  ];

  return pool.filter((entry) => !excludeSkus.includes(entry.sku)).slice(0, MAX_RECOMMENDATIONS);
}
