import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { CartContext, type CartContextValue, type CartItem } from './cart-context';

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

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      total: items.reduce((sum, item) => sum + item.price, 0),
      isOpen,
      holdSecondsRemaining,
      addItem: (item) => {
        setItems((prev) => [...prev, item]);
        setIsOpen(true);
      },
      removeItem: (index) => setItems((prev) => prev.filter((_, i) => i !== index)),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, isOpen, holdSecondsRemaining],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
