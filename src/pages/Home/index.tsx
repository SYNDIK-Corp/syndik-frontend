import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import * as S from './styles';

export function Home() {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Title>{t('home.title')}</S.Title>
      <S.Subtitle>{t('home.subtitle')}</S.Subtitle>
      <Button>{t('home.cta')}</Button>
      <LanguageSwitcher />
    </S.Container>
  );
}
