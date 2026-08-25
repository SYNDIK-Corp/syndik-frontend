export interface Product {
  id: string;
  /* PK numérica real do produto (Supabase) — mesma origem de CatalogItem.dbId,
     usada pra cruzar com entitlements (ex.: "você já tem esse Drop" no
     catálogo). undefined nos itens que não vêm do banco. */
  dbId?: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  onSale?: boolean;
  /* etiqueta customizada sobre a arte (ex.: "One release"); sem ela, usa "Promoção" quando onSale */
  tag?: string;
  sku?: string;
  /* vendido/aposentado: arte esmaecida, sem compra, preço vira "Vendido" */
  sold?: boolean;
  coverImage?: string;
  coverAlt?: string;
  hoverImage?: string;
  /* eyebrow pequeno acima do nome (ex.: "MONEY / POWER") — só o grid
     principal do catálogo usa isso; demais cards ficam sem */
  category?: string;
  /* versão curta do nome ("VOL.N — Nome", sem o parêntese de marketing) —
     usada quando o produto vai pro carrinho; o card continua mostrando
     `name` (a versão rica/comprida). Sem style/volume, é igual a `name`. */
  cartName?: string;
}

export type CatalogSheet = 'screens' | 'sound';

export type CatalogVariant = 'comboPack' | 'mobile7' | 'desktop7' | 'single' | 'albumPack';

export interface CatalogItem {
  id: string;
  /* PK numérica real do produto (Supabase) — evita uma segunda query só pra
     recuperar o id depois de já ter buscado a linha inteira. undefined nos
     itens 'sound' mockados (ainda não vêm do banco). */
  dbId?: number;
  sku: string;
  number: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  variant: CatalogVariant;
  sold?: boolean;
  coverImage?: string;
  coverAlt?: string;
  hoverImage?: string;
  /* conteúdo real do produto (products.description/collection_label) —
     undefined pra itens que ainda não têm (ex: catálogo 'sound' mockado) */
  description?: string;
  collectionLabel?: string;
  /* categoria/estilo do Drop (drops.style) e a posição dele dentro dessa
     categoria (Vol. N, calculado por row_number no banco) — undefined até
     o Drop ser categorizado */
  style?: string;
  volume?: number;
  /* data de publicação do produto (products.published_at) — usada pra achar
     o Drop mais recente ("Last drop") e contagens por janela de tempo
     ("New this week"), sem depender da ordem de exibição do catálogo */
  publishedAt?: string;
  /* quantidade de designs únicos (product_images com role='gallery') —
     "7 Original Artworks", não é o total de arquivos pagos (esse é o dobro,
     mobile+desktop) */
  designCount?: number;
}
