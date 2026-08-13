import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import * as S from './styles';

export function Products() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <S.Container>
        <S.Title>{t('products.title')}</S.Title>
        <S.Text>{t('products.description')}</S.Text>
      </S.Container>
    </MainLayout>
  );
}
