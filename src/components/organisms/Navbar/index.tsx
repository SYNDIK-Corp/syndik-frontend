import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import { Icon } from '@/components/atoms/Icon';
import { useScrolled } from '@/hooks/useScrolled';
import * as S from './styles';

export type NavbarVariant = 'overlay' | 'solid';

export interface NavbarProps {
  variant?: NavbarVariant;
}

export function Navbar({ variant = 'overlay' }: NavbarProps) {
  const { t } = useTranslation();
  const scrolled = useScrolled();
  const solid = variant === 'solid' || scrolled;

  return (
    <S.Container $solid={solid}>
      <S.NavLinks aria-label={t('nav.mainNavigation')}>
        <S.NavItem to="/" end>
          {t('nav.home')}
        </S.NavItem>
        <S.NavItem to="/products">{t('nav.products')}</S.NavItem>
        <S.NavItem to="/contact">{t('nav.contact')}</S.NavItem>
      </S.NavLinks>

      <Logo />

      <S.Actions>
        <S.IconButton type="button" aria-label={t('nav.search')}>
          <Icon name="search" />
        </S.IconButton>
        <S.IconButton type="button" aria-label={t('nav.account')}>
          <Icon name="user" />
        </S.IconButton>
        <S.IconButton type="button" aria-label={t('nav.bag')}>
          <Icon name="bag" />
        </S.IconButton>
      </S.Actions>
    </S.Container>
  );
}
