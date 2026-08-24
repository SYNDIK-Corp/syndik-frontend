import type { TFunction } from 'i18next';
import type { AuthActionError } from '@/contexts/auth-context';

/* traduz o código de erro do fluxo de login (email + código) pra uma
 * mensagem, reaproveitando as chaves em account.gate.errors.* (mesmo texto
 * de antes do login/registro virarem uma tela só). */
export function authErrorMessage(t: TFunction, error: AuthActionError): string {
  if (error.code === 'wrong_pin') {
    return t('account.gate.errors.wrong_pin', { count: error.attemptsRemaining ?? 0 });
  }
  if (error.code === 'locked') {
    return t('account.gate.errors.locked', { minutes: Math.ceil((error.retryAfterSeconds ?? 900) / 60) });
  }
  return t(`account.gate.errors.${error.code}`, { defaultValue: t('account.gate.errors.unexpected') });
}
