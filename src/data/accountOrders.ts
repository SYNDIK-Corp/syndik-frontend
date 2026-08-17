export interface AccountOrder {
  number: string;
  /* data e hora completas (ISO) — usadas no recibo e, truncadas, na lista de pedidos */
  date: string;
  itemIds: string[];
  paymentMethod: string;
  total: number;
  /* taxa de desconto aplicada no pedido, se houve cupom */
  discountRate?: number;
}

/* histórico mock do membro logado até existir conta real */
export const accountOrders: AccountOrder[] = [
  {
    number: 'SYN-0417-2261',
    date: '2026-08-14T19:42:00',
    itemIds: ['dark-city', 'snd-001'],
    paymentMethod: 'Visa •••• 4417',
    total: 8.09,
    discountRate: 0.1,
  },
  {
    number: 'SYN-0417-1884',
    date: '2026-07-02T11:05:00',
    itemIds: ['concrete'],
    paymentMethod: 'Pix',
    total: 3.99,
  },
];
