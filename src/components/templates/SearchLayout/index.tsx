import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

export interface SearchLayoutProps {
  /* linha de busca (input + limpar), renderizada dentro do bloco com borda */
  children: ReactNode;
}

export function SearchLayout({ children }: SearchLayoutProps) {
  const { t } = useTranslation();

  return (
    <S.Bordered>
      <S.HeaderTop>
        <Logo width="120px" />
        <S.CloseLink to="/">
          <span>{t('search.close')}</span>
          <Icon name="close" size={16} />
        </S.CloseLink>
      </S.HeaderTop>
      <S.SearchBarWrapper>{children}</S.SearchBarWrapper>
    </S.Bordered>
  );
}
