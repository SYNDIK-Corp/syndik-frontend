export interface Product {
  id: string;
  collection: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  onSale?: boolean;
  /* etiqueta customizada sobre a arte (ex.: "One release"); sem ela, usa "Promoção" quando onSale */
  tag?: string;
  coverImage?: string;
  coverAlt?: string;
  hoverImage?: string;
}
