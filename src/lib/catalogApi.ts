import { supabase } from '@/lib/supabase';
import type { CatalogItem } from '@/types/product';

/* catálogo de wallpapers ('screens') vem do Supabase; 'sound' continua mockado
   até virar produto de verdade (ver backend/docs/roadmap.md, Fase 3).
   Cada produto wallpaper já inclui mobile + desktop juntos numa compra só
   (comboPack) — não são dois produtos separados por dispositivo. */

interface ProductImageRow {
  role: 'cover' | 'hover' | 'gallery';
  storage_bucket: string;
  storage_path: string;
}

interface ProductRow {
  id: number;
  slug: string;
  sku: string;
  name: string;
  description: string | null;
  price_current: number;
  price_compare_at: number | null;
  is_sold_out: boolean;
  collection_label: string | null;
  drop_style: string | null;
  drop_volume: number | null;
  product_images: ProductImageRow[];
}

/* consulta a view product_catalog (products + drops, com o Volume por
   categoria já calculado — ver backend, migration
   20260817215923_product_catalog_view_with_volume.sql), não a tabela
   products direto. */
const PRODUCT_COLUMNS =
  'id, slug, sku, name, description, price_current, price_compare_at, is_sold_out, collection_label, drop_style, drop_volume, product_images(role, storage_bucket, storage_path)';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

function publicImageUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

function numberFromSku(sku: string): string {
  return sku.split('-').at(-1) ?? sku;
}

function imagesFromRow(row: ProductRow) {
  const cover = row.product_images?.find((img) => img.role === 'cover');
  const hover = row.product_images?.find((img) => img.role === 'hover');
  return {
    coverImage: cover ? publicImageUrl(cover.storage_bucket, cover.storage_path) : undefined,
    hoverImage: hover ? publicImageUrl(hover.storage_bucket, hover.storage_path) : undefined,
  };
}

function toCatalogItem(row: ProductRow): CatalogItem {
  return {
    id: row.slug,
    dbId: row.id,
    sku: row.sku,
    number: numberFromSku(row.sku),
    name: row.name,
    price: row.price_current,
    compareAtPrice: row.price_compare_at ?? undefined,
    variant: 'comboPack',
    sold: row.is_sold_out,
    description: row.description ?? undefined,
    collectionLabel: row.collection_label ?? undefined,
    style: row.drop_style ?? undefined,
    volume: row.drop_volume ?? undefined,
    designCount: row.product_images?.filter((img) => img.role === 'gallery').length ?? 0,
    ...imagesFromRow(row),
  };
}

export async function fetchScreensCatalog(): Promise<CatalogItem[]> {
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    // category_rank vem da view (ordem fixa de categoria: Hip Hop/Rap
    // Legends, Pop Culture Icons, Movie Icons, Money/Power, Automotive/
    // Street) — sort_order só desempata dentro da mesma categoria. Upload
    // novo em qualquer categoria já cai no bloco certo sozinho, sem
    // precisar renumerar nada.
    .order('category_rank')
    .order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toCatalogItem);
}

export async function fetchScreensEntry(slug: string): Promise<CatalogItem | undefined> {
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? toCatalogItem(data) : undefined;
}

/** vários slugs numa query só — evita N+1 quando o caller precisa resolver
 * uma lista (ex: produtos relacionados). */
export async function fetchScreensEntriesBySlugs(slugs: string[]): Promise<CatalogItem[]> {
  if (slugs.length === 0) return [];
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    .in('slug', slugs);
  if (error) throw error;
  return (data ?? []).map(toCatalogItem);
}

/** vários ids numa query só — usada pela busca (Fase 8), que já resolveu
 * *quais* ids batem via RPC e só precisa dos dados completos (imagem,
 * preço) pra montar o card. Não preserva a ordem de relevância da RPC —
 * quem chama reordena pelo array de ids original. */
export async function fetchScreensCatalogByIds(ids: number[]): Promise<CatalogItem[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    .in('id', ids);
  if (error) throw error;
  return (data ?? []).map(toCatalogItem);
}

/** fallback de relacionados sem curadoria manual — limitado no banco
 * (`limit`), nunca traz o catálogo inteiro pro client. */
export async function fetchScreensCatalogExcluding(excludeSlug: string, limit: number): Promise<CatalogItem[]> {
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    .eq('is_sold_out', false)
    .neq('slug', excludeSlug)
    .order('sort_order')
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toCatalogItem);
}

/** carrossel de mais vendidos da home (e mini-lista do menu mobile) — só
 * produtos reais (screens/Supabase). 'sound' é mock, não entra em sugestão
 * até virar produto de verdade (Fase 10). Retorna CatalogItem (não Product)
 * pra quem renderiza poder aplicar o mesmo tratamento rico de categoria +
 * "Vol. N" do grid principal do catálogo, via lib/richProductDisplay. */
export async function fetchHomeBestSellers(): Promise<CatalogItem[]> {
  const { data, error } = await supabase
    .from('product_catalog')
    .select(PRODUCT_COLUMNS)
    .eq('product_type_code', 'wallpaper_pack')
    .eq('attributes->>featured', 'true')
    // featured_order é a curadoria da home, independente de sort_order
    // (que ordena o grid geral do catálogo) — são duas ordenações
    // diferentes por natureza, não dá pra reusar a mesma coluna.
    .order('featured_order');
  if (error) throw error;
  return (data ?? []).map(toCatalogItem);
}

export interface FileBreakdownRow {
  device_variant: string;
  file_count: number;
}

/** detalhamento de arquivos por device_variant, de UM produto (parametrizado
 * — nunca traz dado de outros produtos). product_files não pode ter policy
 * de leitura direta (Fase 1), então essa função (SECURITY DEFINER, ver
 * schema.md) é o único jeito público de saber "quantos vêm no pack" sem
 * vazar o arquivo em si. */
export async function fetchFileBreakdown(productId: number): Promise<FileBreakdownRow[]> {
  const { data, error } = await supabase.rpc('get_product_file_breakdown', { p_product_id: productId });
  if (error) throw error;
  return data ?? [];
}

export interface IncludedRow {
  label: string;
  value: string;
}

/** linhas extras de especificação (product_included_rows) — conteúdo real
 * cadastrado por produto, sem fallback fixo no frontend. Vazio até o
 * vendedor cadastrar. */
export async function fetchIncludedRows(productId: number): Promise<IncludedRow[]> {
  const { data, error } = await supabase
    .from('product_included_rows')
    .select('label, value')
    .eq('product_id', productId)
    .order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export interface FaqRow {
  question: string;
  answer: string;
}

/** FAQ real do produto (product_faqs) — sem fallback genérico fixo.
 * Vazio até o vendedor cadastrar; a UI esconde a seção nesse caso. */
export async function fetchProductFaq(productId: number): Promise<FaqRow[]> {
  const { data, error } = await supabase
    .from('product_faqs')
    .select('question, answer')
    .eq('product_id', productId)
    .order('sort_order');
  if (error) throw error;
  return data ?? [];
}

/** previews de cada design (product_images.role='gallery'), na ordem de
 * exibição — mostrados na página interna do produto. Não tem relação 1:1
 * com o total de arquivos: são material de marketing (um por design), o
 * total de arquivos pagos vem de fetchFileBreakdown (pode ser o dobro,
 * mobile+desktop). */
export async function fetchGalleryImages(productId: number): Promise<string[]> {
  const { data, error } = await supabase
    .from('product_images')
    .select('storage_bucket, storage_path')
    .eq('product_id', productId)
    .eq('role', 'gallery')
    .order('sort_order');
  if (error) throw error;
  return (data ?? []).map((row) => publicImageUrl(row.storage_bucket, row.storage_path));
}

/** capa de cada produto num lote só (ex.: itens de um pedido na tela de
 * confirmação) — bucket público, sem relação com entitlement/compra. */
export async function fetchProductCoverImages(productIds: number[]): Promise<Map<number, string>> {
  if (productIds.length === 0) return new Map();
  const { data, error } = await supabase
    .from('product_images')
    .select('product_id, storage_bucket, storage_path')
    .in('product_id', productIds)
    .eq('role', 'cover');
  if (error) throw error;
  return new Map((data ?? []).map((row) => [row.product_id, publicImageUrl(row.storage_bucket, row.storage_path)]));
}

/** ids na ordem de exibição (sort_order) — curadoria manual em
 * product_related_overrides; sem override, fica pro caller aplicar o
 * fallback (mesmo catálogo, excluindo vendidos). */
export async function fetchRelatedOverrides(productId: number): Promise<string[]> {
  const { data, error } = await supabase
    .from('product_related_overrides')
    .select('related_product_id, sort_order')
    .eq('product_id', productId)
    .order('sort_order');
  if (error) throw error;
  if (!data || data.length === 0) return [];

  const ids = data.map((row) => row.related_product_id);
  const { data: related, error: relatedError } = await supabase.from('products').select('id, slug').in('id', ids);
  if (relatedError) throw relatedError;

  const slugById = new Map((related ?? []).map((row) => [row.id, row.slug]));
  return ids.map((id) => slugById.get(id)).filter((slug): slug is string => Boolean(slug));
}
