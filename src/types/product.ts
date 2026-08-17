export interface Product {
  id: string;
  collection: string;
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
}
