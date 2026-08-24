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
  | 'invalid_code'
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
  changePin: (newPin: string) => Promise<AuthActionError | null>;
  /* entrada do checkout/conta: email + token, sem PIN nenhum.
     shouldCreateUser:true — funciona pra cliente novo também, não só pra
     quem já tem conta. */
  requestAccessCode: (email: string) => Promise<AuthActionError | null>;
  confirmAccessCode: (email: string, code: string) => Promise<AuthActionError | null>;
  setNewsletterOptIn: (value: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
