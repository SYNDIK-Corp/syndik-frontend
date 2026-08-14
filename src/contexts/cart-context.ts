import { createContext } from 'react';

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
}

export interface CartContextValue {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  /* segundos restantes da reserva do carrinho (contagem regressiva de urgência) */
  holdSecondsRemaining: number;
  addItem: (item: CartItem, options?: { openCart?: boolean }) => void;
  removeItem: (index: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
