import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import { Icon } from '@/components/atoms/Icon';
import { MobileMenu } from '@/components/organisms/MobileMenu';
import { useNavbarSectionTheme } from '@/hooks/useNavbarSectionTheme';
import * as S from './styles';

export type NavbarVariant = 'overlay' | 'solid';

export interface NavbarProps {
  variant?: NavbarVariant;
}

export function Navbar({ variant = 'overlay' }: NavbarProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionTheme = useNavbarSectionTheme();
  /* sempre transparente, cor conforme o fundo; "black" vira fundo preto (Sound) */
  const mode = variant === 'solid' ? 'solid' : sectionTheme;

  return (
    <S.Container $mode={mode}>
      <S.LeftCell>
        <S.NavLinks aria-label={t('nav.mainNavigation')}>
          <S.NavItem to="/" end>
            {t('nav.home')}
          </S.NavItem>
          <S.NavItem to="/products">{t('nav.products')}</S.NavItem>
          <S.NavItem to="/contact">{t('nav.contact')}</S.NavItem>
        </S.NavLinks>

        <S.MobileLeft>
          <S.IconButton type="button" aria-label={t('nav.openMenu')} onClick={() => setMenuOpen(true)}>
            <Icon name="dots" />
          </S.IconButton>
          <S.IconButton type="button" aria-label={t('nav.search')}>
            <Icon name="search" />
          </S.IconButton>
        </S.MobileLeft>
      </S.LeftCell>

      <Logo />

      <S.Actions>
        <S.DesktopSearchButton type="button" aria-label={t('nav.search')}>
          <Icon name="search" />
        </S.DesktopSearchButton>
        <S.IconButton type="button" aria-label={t('nav.account')}>
          <Icon name="user" />
        </S.IconButton>
        <S.IconButton type="button" aria-label={t('nav.bag')}>
          <Icon name="bag" />
        </S.IconButton>
      </S.Actions>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </S.Container>
  );
}
