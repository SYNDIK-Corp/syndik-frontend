import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import * as S from './styles';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <S.Container>
      <S.LogoWrapper>
        <Logo width="168px" />
      </S.LogoWrapper>

      <S.Divider />

      <S.Bottom>
        <S.Rights>{t('footer.rights', { year })}</S.Rights>
        <S.Terms>{t('footer.terms')}</S.Terms>
        <span aria-hidden="true" />
      </S.Bottom>
    </S.Container>
  );
}
