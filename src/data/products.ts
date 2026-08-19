/* seção de branding 'sound' da home (SoundSection) — sem venda ativa nem
   preço (Fase 11.2, decisão do usuário: catálogo indisponível pra compra
   até ter arte de marketing real e virar produto de verdade, Fase 10). */
export interface SoundComingSoonItem {
  id: string;
  name: string;
}

export const soundProducts: SoundComingSoonItem[] = [
  { id: 'single-cover', name: 'SINGLE COVER' },
  { id: 'album-pack', name: 'ALBUM PACK' },
];
