import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import { Icon } from '@/components/atoms/Icon';
import { useCart } from '@/hooks/useCart';
import * as S from './styles';

export interface CheckoutLayoutProps {
  children: ReactNode;
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const { t } = useTranslation();
  const { items, openCart } = useCart();
  const navigate = useNavigate();

  const goToCart = () => {
    openCart();
    navigate('/products/screens');
  };

  return (
    <>
      <S.Header>
        <S.HeaderInner>
          <Logo width="128px" />
          <S.CartButton type="button" aria-label={t('nav.bag')} onClick={goToCart}>
            <Icon name="bag" size={18} />
            <span>{items.length}</span>
          </S.CartButton>
        </S.HeaderInner>
      </S.Header>
      {children}
    </>
  );
}
