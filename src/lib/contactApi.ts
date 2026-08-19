import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type ContactErrorCode = 'invalid_input' | 'rate_limited' | 'unexpected';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  socialPlatform?: string;
  socialHandle?: string;
  subject: string;
  message: string;
}

async function readContactError(error: unknown): Promise<ContactErrorCode> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') {
        return body.error as ContactErrorCode;
      }
    } catch {
      /* corpo não veio como JSON — cai no genérico abaixo */
    }
  }
  return 'unexpected';
}

/** grava a mensagem em contact_messages e dispara notificação por email
 * (best-effort, Resend) via Edge Function pública submit-contact. */
export async function submitContact(payload: ContactPayload): Promise<ContactErrorCode | null> {
  const { error } = await supabase.functions.invoke('submit-contact', { body: payload });
  if (error) return readContactError(error);
  return null;
}
