import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/organisms/Hero';
import * as S from './styles';

export function Home() {
  const { t } = useTranslation();

  return (
    <MainLayout navbarVariant="overlay">
      <Hero />

      <S.Featured>
        <S.FeaturedTitle>{t('home.featuredTitle')}</S.FeaturedTitle>
        <S.FeaturedText>{t('home.featuredDescription')}</S.FeaturedText>
      </S.Featured>
    </MainLayout>
  );
}
