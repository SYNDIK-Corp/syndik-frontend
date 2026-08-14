export interface CheckoutAddon {
  id: string;
  sku: string;
  name: string;
  price: number;
}

/* upsells do checkout — não fazem parte do catálogo principal */
export const checkoutAddons: CheckoutAddon[] = [
  { id: 'desktop-cut', sku: 'ADD-DSK', name: 'DESKTOP CUT', price: 2.99 },
  { id: 'single-cover', sku: 'SND-000', name: 'SINGLE COVER', price: 5.0 },
  { id: 'exclusive-rights', sku: 'ADD-EXC', name: 'EXCLUSIVE RIGHTS', price: 89.0 },
];
