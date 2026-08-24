import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderRow } from '@/components/molecules/OrderRow';
import { fetchMyOrders, fetchOrderPaymentMethod, type MyOrder } from '@/lib/ordersApi';
import { formatDate, formatList, formatPrice } from '@/lib/format';
import * as S from './styles';

interface OrderWithMethod extends MyOrder {
  paymentMethod: string | null;
}

export function AccountOrders() {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<OrderWithMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMyOrders()
      .then(async (myOrders) => {
        const withMethod = await Promise.all(
          myOrders.map(async (order): Promise<OrderWithMethod> => {
            const method = order.status === 'paid' ? await fetchOrderPaymentMethod(order.id) : null;
            return { ...order, paymentMethod: method };
          }),
        );
        if (!cancelled) setOrders(withMethod);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <S.Title>{t('account.orders.title')}</S.Title>

      {!loading && orders.length === 0 ? (
        <S.List>{t('account.orders.empty')}</S.List>
      ) : (
        <S.List>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              orderNumber={order.orderNumber}
              date={formatDate(order.createdAt, i18n.language)}
              itemsSummary={formatList(
                order.items.map((item) => item.name_snapshot),
                i18n.language,
              )}
              paymentMethod={
                order.paymentMethod ? t(`account.orders.method.${order.paymentMethod}`) : t('account.orders.method.unknown')
              }
              total={formatPrice(order.total, i18n.language)}
              receiptTo={`/order-confirmation?order_id=${order.id}&from=account`}
            />
          ))}
        </S.List>
      )}
    </div>
  );
}
