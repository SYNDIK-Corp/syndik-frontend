import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { CartContext, type AppliedCoupon, type BestDiscount, type CartContextValue, type CartItem } from './cart-context';
import { fetchDiscountTiers, type DiscountTier } from '@/lib/couponsApi';

const STORAGE_KEY = 'syndik.cart';
const HOLD_DURATION_SECONDS = 300;

function loadStoredItems(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadStoredItems);
  const [isOpen, setIsOpen] = useState(false);
  const [holdSecondsRemaining, setHoldSecondsRemaining] = useState(HOLD_DURATION_SECONDS);
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  useEffect(() => {
    fetchDiscountTiers().then(setDiscountTiers);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível: carrinho vive só em memória */
    }
  }, [items]);

  /* contagem regressiva única por sessão, independente do drawer estar aberto */
  useEffect(() => {
    const interval = setInterval(() => {
      setHoldSecondsRemaining((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    // mesma regra "maior dos dois" que o servidor aplica de verdade em
    // checkout-create-order — aqui é só preview, o servidor revalida tudo.
    const couponAmount = appliedCoupon
      ? appliedCoupon.discountType === 'percent'
        ? total * appliedCoupon.discountValue
        : appliedCoupon.discountValue
      : 0;
    const bestTier = [...discountTiers].filter((tier) => total >= tier.min_subtotal).sort((a, b) => b.min_subtotal - a.min_subtotal)[0];
    const tierAmount = bestTier ? total * bestTier.discount_rate : 0;

    let bestDiscount: BestDiscount | null = null;
    if (couponAmount > 0 && couponAmount >= tierAmount) {
      bestDiscount = { amount: couponAmount, source: 'coupon', couponCode: appliedCoupon!.code };
    } else if (tierAmount > 0) {
      bestDiscount = { amount: tierAmount, source: 'tier' };
    }

    return {
      items,
      total,
      isOpen,
      holdSecondsRemaining,
      discountTiers,
      appliedCoupon,
      setAppliedCoupon,
      clearCoupon: () => setAppliedCoupon(null),
      bestDiscount,
      addItem: (item, options) => {
        setItems((prev) => [...prev, item]);
        if (options?.openCart ?? true) setIsOpen(true);
      },
      removeItem: (index) => setItems((prev) => prev.filter((_, i) => i !== index)),
      clearCart: () => {
        setItems([]);
        setAppliedCoupon(null);
      },
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [items, isOpen, holdSecondsRemaining, discountTiers, appliedCoupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
