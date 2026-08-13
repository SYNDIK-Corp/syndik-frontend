import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/lib/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
  };

  return {
    currentLanguage: i18n.resolvedLanguage as SupportedLanguage,
    supportedLanguages,
    changeLanguage,
  };
}
