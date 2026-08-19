import { geolocation, next } from '@vercel/functions';

/* Fase 11.6 — idioma decidido só por geo-IP na entrada, sem seletor manual
 * (decisão explícita do usuário: sem forma de corrigir detecção errada —
 * viajante, VPN, IP corporativo ficam no idioma do país detectado).
 *
 * Mapeamento por país é grosseiro por natureza (geolocation() só expõe o
 * país e a POP da Vercel, não região administrativa): Suíça inteira cai em
 * alemão, Canadá cai no padrão inglês sem diferenciar Québec. Aceito como
 * limitação, não uma bug a corrigir aqui.
 *
 * Sem teste real possível em dev local — geo-IP só existe de verdade em
 * produção/Edge da Vercel. Verificar via curl num preview deploy com
 * header `x-vercel-ip-country` manual. */
const COUNTRY_TO_LOCALE: Record<string, 'es' | 'fr' | 'de'> = {
  FR: 'fr',
  BE: 'fr',
  LU: 'fr',
  MC: 'fr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  GQ: 'es',
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (/^\/(es|fr|de)(\/|$)/.test(url.pathname)) return next();

  const { country } = geolocation(request);
  const locale = country ? COUNTRY_TO_LOCALE[country] : undefined;
  if (!locale) return next();

  url.pathname = `/${locale}${url.pathname}`;
  return Response.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!assets|favicon.png).*)'],
};
