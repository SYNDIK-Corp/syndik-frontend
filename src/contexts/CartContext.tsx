import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CartContext, type AppliedCoupon, type BestDiscount, type CartContextValue, type CartItem } from './cart-context';
import { fetchDiscountTiers, type DiscountTier } from '@/lib/couponsApi';
import { track } from '@/lib/trackEvent';

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
  const [pendingDuplicate, setPendingDuplicate] = useState<{ item: CartItem; openCart: boolean } | null>(null);

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

  /* MVP 2.2.2: a reserva expira de verdade — produto digital, sem estoque
     físico limitado, então "esgotar" aqui é soltar a sacola (não tem o que
     "vender pra outro cliente" de fato, mas mantém a urgência que o banner
     promete honesta em vez de decorativa). */
  useEffect(() => {
    if (holdSecondsRemaining > 0 || items.length === 0) return;
    setItems([]);
    setAppliedCoupon(null);
    setHoldSecondsRemaining(HOLD_DURATION_SECONDS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdSecondsRemaining]);

  /* contagem reinicia quando a sacola sai de vazia pra ter o primeiro item
     (nova "sessão" de hold) — não reinicia a cada item novo adicionado
     depois disso, senão nunca esgotaria de verdade pra quem continua
     navegando/comprando */
  const previousItemCount = useRef(items.length);
  useEffect(() => {
    if (previousItemCount.current === 0 && items.length > 0) {
      setHoldSecondsRemaining(HOLD_DURATION_SECONDS);
    }
    previousItemCount.current = items.length;
  }, [items.length]);

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
      bestDiscount = {
        amount: couponAmount,
        source: 'coupon',
        couponCode: appliedCoupon!.code,
        percent: appliedCoupon!.discountType === 'percent' ? Math.round(appliedCoupon!.discountValue * 100) : undefined,
      };
    } else if (tierAmount > 0) {
      bestDiscount = { amount: tierAmount, source: 'tier', percent: Math.round(bestTier.discount_rate * 100) };
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
        const openCart = options?.openCart ?? true;
        const isDuplicate = items.some((existing) => existing.sku === item.sku);
        if (isDuplicate) {
          setPendingDuplicate({ item, openCart });
          return;
        }
        setItems((prev) => [...prev, item]);
        if (openCart) setIsOpen(true);
        track('add_to_cart', { sku: item.sku, product_name: item.name, price: item.price });
      },
      pendingDuplicate: pendingDuplicate?.item ?? null,
      confirmAddDuplicate: () => {
        if (!pendingDuplicate) return;
        setItems((prev) => [...prev, pendingDuplicate.item]);
        if (pendingDuplicate.openCart) setIsOpen(true);
        track('add_to_cart', {
          sku: pendingDuplicate.item.sku,
          product_name: pendingDuplicate.item.name,
          price: pendingDuplicate.item.price,
        });
        setPendingDuplicate(null);
      },
      cancelAddDuplicate: () => setPendingDuplicate(null),
      removeItem: (index) => setItems((prev) => prev.filter((_, i) => i !== index)),
      clearCart: () => {
        setItems([]);
        setAppliedCoupon(null);
      },
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [items, isOpen, holdSecondsRemaining, discountTiers, appliedCoupon, pendingDuplicate]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
