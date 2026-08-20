import { supabase } from '@/lib/supabase';

interface OrderItemRow {
  id: number;
  /* só a busca por token público (fetchOrderByPublicToken) seleciona isso —
     usada pra montar a lista de arquivos sem depender de entitlements
     (RLS, exige sessão que o guest não tem). */
  product_id?: number;
  sku_snapshot: string;
  name_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
}

interface OrderRow {
  id: number;
  order_number: string;
  status: string;
  email: string;
  subtotal: number;
  discount_amount: number;
  total: number;
  created_at: string;
  paid_at: string | null;
  order_items: OrderItemRow[];
}

export interface MyOrder {
  id: number;
  orderNumber: string;
  status: string;
  email: string;
  subtotal: number;
  discountAmount: number;
  total: number;
  createdAt: string;
  paidAt: string | null;
  items: OrderItemRow[];
}

interface PaymentRow {
  method: string | null;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
}

const ORDER_COLUMNS =
  'id, order_number, status, email, subtotal, discount_amount, total, created_at, paid_at, order_items(id, sku_snapshot, name_snapshot, unit_price_snapshot, quantity)';

function toMyOrder(row: OrderRow): MyOrder {
  return {
    id: row.id,
    orderNumber: row.order_number,
    status: row.status,
    email: row.email,
    subtotal: row.subtotal,
    discountAmount: row.discount_amount,
    total: row.total,
    createdAt: row.created_at,
    paidAt: row.paid_at,
    items: row.order_items ?? [],
  };
}

/** histórico de pedidos do usuário logado — RLS (orders_select_own /
 * order_items_select_own, Fase 5) já garante que só vêm os próprios. */
export async function fetchMyOrders(): Promise<MyOrder[]> {
  const { data, error } = await supabase.from('orders').select(ORDER_COLUMNS).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toMyOrder);
}

/** um pedido específico — usada tanto na tela de confirmação (acabou de
 * pagar) quanto ao abrir um recibo antigo pelo histórico. RLS garante que um
 * order_id de outro usuário simplesmente não retorna nada. */
export async function fetchOrderById(orderId: number): Promise<MyOrder | null> {
  const { data, error } = await supabase.from('orders').select(ORDER_COLUMNS).eq('id', orderId).maybeSingle();
  if (error) throw error;
  return data ? toMyOrder(data) : null;
}

/** label genérico do método de pagamento (ex: "card") — não bandeira/final
 * do cartão, que o Stripe não expõe sem uma chamada extra. */
export async function fetchOrderPaymentMethod(orderId: number): Promise<string | null> {
  const { data, error } = await supabase.rpc('get_order_payments', { p_order_id: orderId });
  if (error) throw error;
  const rows = (data ?? []) as PaymentRow[];
  return rows.find((payment) => payment.status === 'succeeded')?.method ?? rows[0]?.method ?? null;
}

export interface PublicOrderLookup {
  order: MyOrder;
  paymentMethod: string | null;
}

/** confirmação de pedido pra quem comprou como guest (sem sessão no
 * browser) — RLS de `orders` sempre exigiu auth.uid(), o que guest não tem.
 * A "prova de posse" aqui é o token do link (return_url do Stripe e o
 * recibo por email), validado server-side contra orders.public_token —
 * nunca uma leitura direta da tabela. null = token/id não bate (não
 * distingue "não existe" de "token errado", de propósito). */
export async function fetchOrderByPublicToken(orderId: number, token: string): Promise<PublicOrderLookup | null> {
  const { data, error } = await supabase.functions.invoke<{ order: OrderRow; paymentMethod: string | null }>(
    'order-lookup-public',
    { body: { orderId, token } },
  );
  if (error || !data) return null;
  return { order: toMyOrder(data.order), paymentMethod: data.paymentMethod };
}
