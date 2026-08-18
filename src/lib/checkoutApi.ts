import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type CheckoutErrorCode =
  | 'unauthenticated'
  | 'empty_cart'
  | 'invalid_items'
  | 'payment_setup_failed'
  | 'unexpected';

export interface CheckoutError {
  code: CheckoutErrorCode;
  skus?: string[];
}

export interface CreateOrderResult {
  clientSecret: string;
  orderId: number;
}

async function readCheckoutError(error: unknown): Promise<CheckoutError> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') {
        return { code: body.error as CheckoutErrorCode, skus: body.skus };
      }
    } catch {
      /* corpo não veio como JSON — cai no genérico abaixo */
    }
  }
  return { code: 'unexpected' };
}

/** cria o pedido real (revalidado server-side) + a Stripe Checkout Session
 * (embedded) em cima dele. Preço/nome nunca vêm do client — só o sku e a
 * quantidade, o resto a Edge Function busca direto de products. */
export async function createOrder(
  items: { sku: string; quantity: number }[],
): Promise<CreateOrderResult | CheckoutError> {
  const { data, error } = await supabase.functions.invoke<CreateOrderResult>('checkout-create-order', {
    body: { items },
  });
  if (error) return readCheckoutError(error);
  if (!data) return { code: 'unexpected' };
  return data;
}

export function isCheckoutError(result: CreateOrderResult | CheckoutError): result is CheckoutError {
  return 'code' in result;
}
