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

export type CatalogVariant = 'mobile7' | 'desktop7' | 'single' | 'albumPack';

export interface CatalogItem {
  id: string;
  sku: string;
  number: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  variant: CatalogVariant;
  sold?: boolean;
}
