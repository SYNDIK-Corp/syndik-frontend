import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import * as S from './styles';

export function Contact() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <S.Container>
        <S.Title>{t('contact.title')}</S.Title>
        <S.Text>{t('contact.description')}</S.Text>
      </S.Container>
    </MainLayout>
  );
}
