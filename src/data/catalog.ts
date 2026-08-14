import type { CatalogItem } from '@/types/product';

/* mock local até o catálogo vir do backend */
export const screensCatalog: CatalogItem[] = [
  { id: 'scr-001', sku: 'SCR-001', number: '001', name: 'DARK CITY', price: 3.99, compareAtPrice: 5.99, variant: 'mobile7' },
  { id: 'scr-002', sku: 'SCR-002', number: '002', name: 'STATIC', price: 3.99, compareAtPrice: 8.99, variant: 'desktop7' },
  { id: 'scr-003', sku: 'SCR-003', number: '003', name: 'CONCRETE', price: 3.99, variant: 'mobile7' },
  { id: 'scr-004', sku: 'SCR-004', number: '004', name: 'VOID', price: 3.99, variant: 'desktop7', sold: true },
  { id: 'scr-005', sku: 'SCR-005', number: '005', name: 'SMOKE', price: 3.99, compareAtPrice: 8.99, variant: 'mobile7' },
  { id: 'scr-006', sku: 'SCR-006', number: '006', name: 'GRID 44', price: 4.99, variant: 'desktop7' },
  { id: 'scr-007', sku: 'SCR-007', number: '007', name: 'AFTER HOURS', price: 3.99, variant: 'mobile7' },
  { id: 'scr-008', sku: 'SCR-008', number: '008', name: 'ASHES', price: 3.99, variant: 'desktop7' },
  { id: 'scr-009', sku: 'SCR-009', number: '009', name: 'RAIN LOG', price: 3.99, variant: 'mobile7', sold: true },
  { id: 'scr-010', sku: 'SCR-010', number: '010', name: 'NORTH BLOCK', price: 3.99, variant: 'desktop7' },
  { id: 'scr-011', sku: 'SCR-011', number: '011', name: 'NIGHT SHIFT', price: 3.99, variant: 'mobile7' },
  { id: 'scr-012', sku: 'SCR-012', number: '012', name: 'LAST TRAIN', price: 4.99, variant: 'desktop7' },
];

export const soundCatalog: CatalogItem[] = [
  { id: 'snd-001', sku: 'SND-001', number: '001', name: 'NOCTURNE', price: 5.0, compareAtPrice: 9.0, variant: 'single' },
  { id: 'snd-002', sku: 'SND-002', number: '002', name: 'BLACKOUT', price: 5.0, variant: 'single', sold: true },
  { id: 'snd-003', sku: 'SND-003', number: '003', name: 'CHROME TEETH', price: 19.99, variant: 'albumPack' },
  { id: 'snd-004', sku: 'SND-004', number: '004', name: 'LOW END', price: 5.0, variant: 'single' },
  { id: 'snd-005', sku: 'SND-005', number: '005', name: 'SAINT 9', price: 19.99, variant: 'albumPack', sold: true },
  { id: 'snd-006', sku: 'SND-006', number: '006', name: 'PARANOID BLUE', price: 5.0, variant: 'single' },
  { id: 'snd-007', sku: 'SND-007', number: '007', name: 'TRAP HOUSE 88', price: 5.0, variant: 'single' },
  { id: 'snd-008', sku: 'SND-008', number: '008', name: 'DEAD WEIGHT', price: 19.99, variant: 'albumPack' },
  { id: 'snd-009', sku: 'SND-009', number: '009', name: 'GHOST FLOW', price: 5.0, variant: 'single', sold: true },
  { id: 'snd-010', sku: 'SND-010', number: '010', name: 'LAST PRAYER', price: 5.0, variant: 'single' },
];
