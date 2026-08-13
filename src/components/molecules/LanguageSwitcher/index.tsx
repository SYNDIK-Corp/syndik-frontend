import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/hooks/useLanguage';
import * as S from './styles';

export function LanguageSwitcher() {
  const { currentLanguage, supportedLanguages, changeLanguage } = useLanguage();

  return (
    <S.Container>
      {supportedLanguages.map((language) => (
        <Button
          key={language}
          variant={language === currentLanguage ? 'primary' : 'outline'}
          onClick={() => changeLanguage(language)}
        >
          {language}
        </Button>
      ))}
    </S.Container>
  );
}
