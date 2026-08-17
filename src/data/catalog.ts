import type { CatalogItem } from '@/types/product';

/* catálogo 'screens' (wallpapers) vem do Supabase agora — ver lib/catalogApi.ts.
   'sound' (capas de música) continua mockado até virar produto de verdade
   (backend/docs/roadmap.md, Fase 3 / Fase 10). */
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
