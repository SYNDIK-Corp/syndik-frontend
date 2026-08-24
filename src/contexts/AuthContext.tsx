import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContext, type AuthActionError, type AuthContextValue, type AuthErrorCode, type AuthProfile } from './auth-context';

async function readFunctionError(error: unknown): Promise<AuthActionError> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') {
        return {
          code: body.error as AuthErrorCode,
          retryAfterSeconds: body.retryAfterSeconds,
          attemptsRemaining: body.attemptsRemaining,
        };
      }
    } catch {
      /* corpo não veio como JSON — cai no genérico abaixo */
    }
  }
  return { code: 'unexpected' };
}

async function fetchProfile(userId: string): Promise<AuthProfile | null> {
  const { data } = await supabase.from('profiles').select('id, email, newsletter_opt_in').eq('id', userId).maybeSingle();
  if (!data) return null;
  return { id: data.id, email: data.email, newsletterOptIn: data.newsletter_opt_in };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthContextValue['session']>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!session?.user.id) {
      setProfile(null);
      return;
    }
    fetchProfile(session.user.id).then((result) => {
      if (!cancelled) setProfile(result);
    });
    return () => {
      cancelled = true;
    };
  }, [session?.user.id]);

  const changePin: AuthContextValue['changePin'] = async (newPin) => {
    const { error } = await supabase.functions.invoke('auth-change-pin', { body: { newPin } });
    if (error) return readFunctionError(error);
    return null;
  };

  const requestAccessCode: AuthContextValue['requestAccessCode'] = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) return { code: 'unexpected' };
    return null;
  };

  const confirmAccessCode: AuthContextValue['confirmAccessCode'] = async (email, code) => {
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) return { code: 'invalid_code' };
    // best-effort — a sessão já é válida de qualquer forma; isso só garante
    // que account_credentials existe (Conta/FAQ/emails continuam
    // funcionando pra quem chegou aqui sem nunca ter definido um PIN)
    supabase.functions.invoke('auth-ensure-credentials').catch(() => {});
    return null;
  };

  const setNewsletterOptIn: AuthContextValue['setNewsletterOptIn'] = async (value) => {
    if (!session?.user.id) return;
    await supabase.from('profiles').update({ newsletter_opt_in: value }).eq('id', session.user.id);
    setProfile((prev) => (prev ? { ...prev, newsletterOptIn: value } : prev));
  };

  const signOut: AuthContextValue['signOut'] = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      loading,
      changePin,
      requestAccessCode,
      confirmAccessCode,
      setNewsletterOptIn,
      signOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
