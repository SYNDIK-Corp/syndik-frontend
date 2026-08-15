import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface OrderRowProps {
  orderNumber: string;
  date: string;
  itemsSummary: string;
  paymentMethod: string;
  total: string;
  receiptTo: string;
}

export function OrderRow({ orderNumber, date, itemsSummary, paymentMethod, total, receiptTo }: OrderRowProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Info>
        <S.Meta>
          {orderNumber} — {date}
        </S.Meta>
        <S.Items>{itemsSummary}</S.Items>
        <S.PaymentMethod>{paymentMethod}</S.PaymentMethod>
      </S.Info>

      <S.Actions>
        <S.Total>{total}</S.Total>
        <S.ReceiptLink to={receiptTo}>{t('account.orders.receipt')}</S.ReceiptLink>
      </S.Actions>
    </S.Container>
  );
}
