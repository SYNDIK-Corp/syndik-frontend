import type { Product } from '@/types/product';

/* subset 'sound' dos bestsellers da home — mockado até virar produto de
   verdade (Fase 10). O subset 'screens' vem do Supabase via
   lib/catalogApi.ts (fetchWallpaperFeatured); os dois são combinados em
   fetchHomeBestSellers(). */
export const soundBestSellers: Product[] = [
  {
    id: 'blackout',
    collection: 'SYNDIK / Sound 002',
    name: 'BLACKOUT',
    price: 5.0,
    compareAtPrice: 7.5,
    onSale: true,
  },
  {
    id: 'nocturne',
    collection: 'SYNDIK / Sound 004',
    name: 'NOCTURNE',
    price: 19.99,
    compareAtPrice: 27.99,
    onSale: true,
  },
];

export const soundProducts: Product[] = [
  {
    id: 'single-cover',
    collection: 'Single',
    name: 'SINGLE COVER',
    price: 5.0,
    tag: 'One release',
  },
  {
    id: 'album-pack',
    collection: 'Cover + single + closer',
    name: 'ALBUM PACK',
    price: 19.99,
    tag: '3 pieces',
  },
];
