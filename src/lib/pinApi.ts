import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type SetPinErrorCode = 'invalid_input' | 'unauthenticated' | 'update_failed' | 'unexpected';

export interface SetPinError {
  code: SetPinErrorCode;
}

export interface GuestPinProof {
  orderId: number;
  token: string;
}

async function readSetPinError(error: unknown): Promise<SetPinError> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') {
        return { code: body.error as SetPinErrorCode };
      }
    } catch {
      /* corpo não veio como JSON — cai no genérico abaixo */
    }
  }
  return { code: 'unexpected' };
}

/** troca o PIN de verdade — com sessão, autentica via JWT normal (mesmo
 * mecanismo de sempre); sem sessão (guest, tela de confirmação de pedido),
 * prova posse via order_id + public_token do pedido, mesmo padrão já usado
 * em request-download. */
export async function setPin(newPin: string, guestProof?: GuestPinProof): Promise<SetPinError | null> {
  const { error } = await supabase.functions.invoke('auth-change-pin', {
    body: { newPin, order_id: guestProof?.orderId, token: guestProof?.token },
  });
  if (error) return readSetPinError(error);
  return null;
}
