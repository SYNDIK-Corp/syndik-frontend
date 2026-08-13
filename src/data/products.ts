import type { Product } from '@/types/product';

/* mock local até o catálogo vir do backend */
export const bestSellers: Product[] = [
  {
    id: 'dark-city',
    collection: 'SYNDIK / Collection 001',
    name: 'DARK CITY',
    price: 3.99,
    compareAtPrice: 5.99,
    onSale: true,
  },
  {
    id: 'blackout',
    collection: 'SYNDIK / Sound 002',
    name: 'BLACKOUT',
    price: 5.0,
    compareAtPrice: 7.5,
    onSale: true,
  },
  {
    id: 'static',
    collection: 'SYNDIK / Collection 003',
    name: 'STATIC',
    price: 3.99,
    compareAtPrice: 5.99,
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
  {
    id: 'concrete',
    collection: 'SYNDIK / Collection 005',
    name: 'CONCRETE',
    price: 3.99,
    compareAtPrice: 5.99,
    onSale: true,
  },
  {
    id: 'void',
    collection: 'SYNDIK / Collection 006',
    name: 'VOID',
    price: 3.99,
    compareAtPrice: 5.99,
    onSale: true,
  },
];
