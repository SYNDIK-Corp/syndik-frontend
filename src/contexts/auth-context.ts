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
  /* entrada por PIN — tenta login; se a conta não existir ainda, cria na
     hora com esse mesmo PIN (mesmo email+PIN vira a credencial de quem tá
     comprando pela primeira vez). Duas formas de entrar coexistem sem uma
     ser "padrão" — a pessoa escolhe PIN ou código por email, nenhuma logo
     depois da outra automaticamente. */
  loginOrSignUp: (email: string, pin: string) => Promise<AuthActionError | null>;
  /* entrada por código de email — shouldCreateUser:true, funciona pra
     cliente novo também. Só dispara o email quando a pessoa escolhe esse
     caminho de propósito (não é o padrão automático). */
  requestAccessCode: (email: string) => Promise<AuthActionError | null>;
  confirmAccessCode: (email: string, code: string) => Promise<AuthActionError | null>;
  setNewsletterOptIn: (value: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
