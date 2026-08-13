import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface LogoProps {
  /* largura CSS opcional; padrão é a largura da nav (ex.: rodapé usa "168px") */
  width?: string;
}

export function Logo({ width }: LogoProps) {
  const { t } = useTranslation();

  return <S.Container to="/" aria-label={t('common.appName')} $width={width} />;
}
