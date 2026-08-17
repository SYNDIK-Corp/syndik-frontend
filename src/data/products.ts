import type { Product } from '@/types/product';

/* seção de branding 'sound' da home (SoundSection) — mockado até virar
   produto de verdade (Fase 10). Não entra em sugestão/carrinho/relacionados
   (esses são só produtos reais agora); isso aqui é só a vitrine da seção. */
export const soundProducts: Product[] = [
  {
    id: 'single-cover',
    name: 'SINGLE COVER',
    price: 5.0,
    tag: 'One release',
  },
  {
    id: 'album-pack',
    name: 'ALBUM PACK',
    price: 19.99,
    tag: '3 pieces',
  },
];
