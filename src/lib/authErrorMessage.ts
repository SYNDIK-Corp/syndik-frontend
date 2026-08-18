import type { TFunction } from 'i18next';
import type { AuthActionError } from '@/contexts/auth-context';

/* traduz o código de erro das Edge Functions de auth pra uma mensagem —
 * reaproveitado pelo AccountGate e pelo CheckoutForm (mesmos códigos,
 * mesmas 6 chaves em account.gate.errors.*, sem duplicar copy). */
export function authErrorMessage(t: TFunction, error: AuthActionError): string {
  if (error.code === 'wrong_pin') {
    return t('account.gate.errors.wrong_pin', { count: error.attemptsRemaining ?? 0 });
  }
  if (error.code === 'locked') {
    return t('account.gate.errors.locked', { minutes: Math.ceil((error.retryAfterSeconds ?? 900) / 60) });
  }
  return t(`account.gate.errors.${error.code}`, { defaultValue: t('account.gate.errors.unexpected') });
}
