/* Fonte única de verdade pro locale/basename ativos — calculada uma vez no
 * boot (module-eval, não hook/componente) a partir da URL. `lib/i18n` (lng
 * inicial) e `routes/index.tsx` (basename do BrowserRouter) importam este
 * mesmo módulo cacheado, então nunca divergem entre si (Fase 11.6: idioma
 * decidido só por geo-IP na entrada, sem seletor manual — a URL é a única
 * fonte de verdade, não localStorage/navigator). */
export const SUPPORTED_LOCALES = ['es', 'fr', 'de'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE = 'en';

const firstSegment = window.location.pathname.split('/')[1];
const matched = SUPPORTED_LOCALES.find((locale) => locale === firstSegment);

export const activeLocale: SupportedLocale | typeof DEFAULT_LOCALE = matched ?? DEFAULT_LOCALE;
export const basename = matched ? `/${matched}` : '';

document.documentElement.lang = activeLocale;
