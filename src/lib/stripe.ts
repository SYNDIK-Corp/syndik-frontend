import { loadStripe, type Stripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

/* diferente de lib/supabase.ts (que falha o app inteiro sem a env var,
   porque o catálogo inteiro depende dele) — sem a chave do Stripe só a
   etapa de pagamento fica indisponível, o resto do site continua de pé.
   `stripePromise` fica `null` até a chave existir. */
export const stripePromise: Promise<Stripe | null> | null = publishableKey ? loadStripe(publishableKey) : null;
