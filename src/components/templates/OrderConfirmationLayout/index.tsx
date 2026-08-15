import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import * as S from './styles';

export interface OrderConfirmationLayoutProps {
  orderNumber: string;
  children: ReactNode;
}

export function OrderConfirmationLayout({ orderNumber, children }: OrderConfirmationLayoutProps) {
  const { t } = useTranslation();

  return (
    <>
      <S.Header>
        <S.HeaderInner>
          <Logo width="128px" />
          <S.RightGroup>
            <S.OrderBadge>{t('orderConfirmation.orderBadge', { number: orderNumber })}</S.OrderBadge>
            <S.AccountLink to="/account">{t('orderConfirmation.yourAccount')}</S.AccountLink>
          </S.RightGroup>
        </S.HeaderInner>
      </S.Header>
      {children}
    </>
  );
}
