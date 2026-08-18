import { supabase } from '@/lib/supabase';

export interface Entitlement {
  entitlement_id: number;
  order_id: number;
  product_id: number;
  sku: string;
  name: string;
  granted_at: string;
}

/** tudo que o usuário logado já comprou e ainda tem direito a baixar —
 * sku/name vêm do snapshot do pedido (order_items), não de products, então
 * continua valendo mesmo se o produto for renomeado/despublicado depois. */
export async function fetchMyEntitlements(): Promise<Entitlement[]> {
  const { data, error } = await supabase.rpc('get_my_entitlements');
  if (error) throw error;
  return data ?? [];
}
