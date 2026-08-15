import { useTranslation } from 'react-i18next';
import { OrderRow } from '@/components/molecules/OrderRow';
import { getCatalogEntry } from '@/data/productDetails';
import { accountOrders } from '@/data/accountOrders';
import { formatDate, formatList, formatPrice } from '@/lib/format';
import * as S from './styles';

export function AccountOrders() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <S.Title>{t('account.orders.title')}</S.Title>

      <S.List>
        {accountOrders.map((order) => {
          const itemNames = order.itemIds
            .map((id) => getCatalogEntry(id)?.item.name)
            .filter((name): name is string => Boolean(name));

          return (
            <OrderRow
              key={order.number}
              orderNumber={order.number}
              date={formatDate(order.date, i18n.language)}
              itemsSummary={formatList(itemNames, i18n.language)}
              paymentMethod={order.paymentMethod}
              total={formatPrice(order.total, i18n.language)}
              receiptTo="/order-confirmation"
            />
          );
        })}
      </S.List>
    </div>
  );
}
