import { createContext } from 'react';
import type { DiscountTier } from '@/lib/couponsApi';

export interface AppliedCoupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
}

export interface BestDiscount {
  amount: number;
  source: 'coupon' | 'tier';
  couponCode?: string;
}

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
  image?: string;
  /* eyebrow do Drop (ex.: "MONEY / POWER") — mesma categoria mostrada no
     card/página de produto, exibida junto do item no carrinho/checkout */
  category?: string;
}

export interface CartContextValue {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  /* segundos restantes da reserva do carrinho (contagem regressiva de urgência) */
  holdSecondsRemaining: number;
  addItem: (item: CartItem, options?: { openCart?: boolean }) => void;
  removeItem: (index: number) => void;
  /* esvazia o carrinho — usado depois de um pedido pago de verdade */
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  /* faixas de desconto reais (discount_tiers), buscadas uma vez no mount */
  discountTiers: DiscountTier[];
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
  clearCoupon: () => void;
  /* cupom e faixa nunca empilham — o maior dos dois, mesma regra do
     servidor (checkout-create-order), usada aqui só pra preview */
  bestDiscount: BestDiscount | null;
}

export const CartContext = createContext<CartContextValue | null>(null);
