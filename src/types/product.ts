export interface Product {
  id: string;
  collection: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  onSale?: boolean;
  coverImage?: string;
  coverAlt?: string;
  hoverImage?: string;
}
