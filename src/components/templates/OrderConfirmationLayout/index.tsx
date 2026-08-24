import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/atoms/Logo';
import * as S from './styles';

export interface OrderConfirmationLayoutProps {
  orderNumber: string;
  children: ReactNode;
  /* veio do link de "Receipt" na Conta (Orders) — troca o link fixo "Your
     Account" por um "back" de verdade pra onde a pessoa estava. */
  backToOrders?: boolean;
}

export function OrderConfirmationLayout({ orderNumber, children, backToOrders }: OrderConfirmationLayoutProps) {
  const { t } = useTranslation();

  return (
    <>
      <S.Header>
        <S.HeaderInner>
          <Logo width="128px" />
          <S.RightGroup>
            <S.OrderBadge>{t('orderConfirmation.orderBadge', { number: orderNumber })}</S.OrderBadge>
            {backToOrders ? (
              <S.AccountLink to="/account?tab=orders">
                <span aria-hidden="true">←</span> {t('orderConfirmation.backToOrders')}
              </S.AccountLink>
            ) : (
              <S.AccountLink to="/account">{t('orderConfirmation.yourAccount')}</S.AccountLink>
            )}
          </S.RightGroup>
        </S.HeaderInner>
      </S.Header>
      {children}
    </>
  );
}
