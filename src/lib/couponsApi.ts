import { supabase } from '@/lib/supabase';

export interface CouponValidation {
  id: number;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
}

/** valida um código de cupom contra o subtotal atual — RPC pública
 * (SECURITY DEFINER, sem sessão exigida), mesma regra que o servidor usa
 * de verdade em checkout-create-order. Devolve null se inválido/expirado. */
export async function validateCoupon(code: string, subtotal: number): Promise<CouponValidation | null> {
  const { data, error } = await supabase.rpc('validate_coupon', { p_code: code, p_subtotal: subtotal });
  if (error) throw error;
  return data?.[0] ?? null;
}

export interface DiscountTier {
  id: number;
  min_subtotal: number;
  discount_rate: number;
}

/** faixas de desconto ativas, menor pro maior subtotal — leitura pública
 * (discount_tiers_public_read). */
export async function fetchDiscountTiers(): Promise<DiscountTier[]> {
  const { data, error } = await supabase
    .from('discount_tiers')
    .select('id, min_subtotal, discount_rate')
    .eq('is_active', true)
    .order('min_subtotal', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
