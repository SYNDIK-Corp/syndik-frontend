import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/translation.json';
import es from '@/locales/es/translation.json';
import fr from '@/locales/fr/translation.json';
import de from '@/locales/de/translation.json';
import { activeLocale } from '@/lib/locale';

export const supportedLanguages = ['en', 'es', 'fr', 'de'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

/* Fase 11.6: sem detector de idioma (localStorage/navigator) — o idioma já
 * vem resolvido de `lib/locale` (prefixo da URL, decidido por geo-IP no
 * middleware da Vercel). Duas fontes de verdade brigando (detector +
 * basename) só criaria divergência; a URL manda. */
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: activeLocale,
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
