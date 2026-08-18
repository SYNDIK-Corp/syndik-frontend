import { createContext } from 'react';
import type { Session } from '@supabase/supabase-js';

export interface AuthProfile {
  id: string;
  email: string;
  newsletterOptIn: boolean;
}

export type AuthErrorCode =
  | 'invalid_input'
  | 'account_exists'
  | 'account_not_found'
  | 'wrong_pin'
  | 'locked'
  | 'rate_limited'
  /* não é bem um erro: a conta foi criada, mas a sessão não pôde ser
     emitida na hora (falha rara e passageira) — pede pra pessoa logar */
  | 'session_pending'
  | 'unexpected';

export interface AuthActionError {
  code: AuthErrorCode;
  retryAfterSeconds?: number;
  attemptsRemaining?: number;
}

export interface AuthContextValue {
  session: Session | null;
  profile: AuthProfile | null;
  /* true enquanto a sessão salva (se houver) ainda está sendo restaurada —
     evita mostrar a tela de login por um instante antes de saber se já tem
     sessão válida no localStorage. */
  loading: boolean;
  login: (email: string, pin: string) => Promise<AuthActionError | null>;
  signUp: (email: string, pin: string) => Promise<AuthActionError | null>;
  /* tenta login; se a conta não existir, cria na hora com o mesmo PIN —
     só o checkout usa isso (conta nova nasce no primeiro pedido) */
  loginOrSignUp: (email: string, pin: string) => Promise<AuthActionError | null>;
  changePin: (newPin: string) => Promise<AuthActionError | null>;
  requestPinReset: (email: string) => Promise<AuthActionError | null>;
  confirmPinReset: (email: string, code: string, newPin: string) => Promise<AuthActionError | null>;
  setNewsletterOptIn: (value: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
