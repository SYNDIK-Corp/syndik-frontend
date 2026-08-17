import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderRow } from '@/components/molecules/OrderRow';
import { getCatalogEntry } from '@/data/productDetails';
import { accountOrders } from '@/data/accountOrders';
import { formatDate, formatList, formatPrice } from '@/lib/format';
import * as S from './styles';

export function AccountOrders() {
  const { t, i18n } = useTranslation();
  const [itemNamesByOrder, setItemNamesByOrder] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      accountOrders.map(async (order) => {
        const entries = await Promise.all(order.itemIds.map((id) => getCatalogEntry(id)));
        const names = entries.map((entry) => entry?.item.name).filter((name): name is string => Boolean(name));
        return [order.number, names] as const;
      }),
    ).then((results) => {
      if (!cancelled) setItemNamesByOrder(Object.fromEntries(results));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <S.Title>{t('account.orders.title')}</S.Title>

      <S.List>
        {accountOrders.map((order) => (
          <OrderRow
            key={order.number}
            orderNumber={order.number}
            date={formatDate(order.date, i18n.language)}
            itemsSummary={formatList(itemNamesByOrder[order.number] ?? [], i18n.language)}
            paymentMethod={order.paymentMethod}
            total={formatPrice(order.total, i18n.language)}
            receiptTo="/order-confirmation"
          />
        ))}
      </S.List>
    </div>
  );
}
