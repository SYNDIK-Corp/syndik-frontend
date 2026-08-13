import type { ReactNode } from 'react';
import { Navbar, type NavbarVariant } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { CartDrawer } from '@/components/organisms/CartDrawer';
import * as S from './styles';

export interface MainLayoutProps {
  children: ReactNode;
  navbarVariant?: NavbarVariant;
}

export function MainLayout({ children, navbarVariant = 'solid' }: MainLayoutProps) {
  return (
    <>
      <Navbar variant={navbarVariant} />
      <S.Main $offsetNavbar={navbarVariant === 'solid'}>{children}</S.Main>
      <Footer />
      <CartDrawer />
    </>
  );
}
