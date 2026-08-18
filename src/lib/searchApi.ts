import { supabase } from '@/lib/supabase';

/** ids de produtos publicados que combinam com o termo, em ordem de
 * relevância (full-text + trigram pra erro de digitação, ver
 * search_products em schema.md) — RPC pública, funciona sem sessão. */
export async function searchProductIds(query: string): Promise<number[]> {
  const { data, error } = await supabase.rpc('search_products', { p_query: query });
  if (error) throw error;
  return (data ?? []).map((row: { id: number }) => row.id);
}
