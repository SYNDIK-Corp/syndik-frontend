import { createContext } from 'react';

export interface CartItem {
  sku: string;
  name: string;
  price: number;
}

export interface CartContextValue {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
