import { supabase } from '@/lib/supabase';

export interface HeroBanner {
  slot: 'left' | 'right';
  image: string;
  alt: string;
  linkTo?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

function publicImageUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

/** banner da home (2 painéis) — gerenciável só com UPDATE na tabela
 * hero_banners, sem precisar mexer em código pra trocar a imagem. */
export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  const { data, error } = await supabase
    .from('hero_banners')
    .select('slot, storage_bucket, storage_path, alt_text, link_to')
    .order('slot');
  if (error) throw error;

  return (data ?? []).map((row) => ({
    slot: row.slot as 'left' | 'right',
    image: publicImageUrl(row.storage_bucket, row.storage_path),
    alt: row.alt_text,
    linkTo: row.link_to ?? undefined,
  }));
}
