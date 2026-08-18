import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { PageLoader } from '@/components/molecules/PageLoader';
import { OrderConfirmationLayout } from '@/components/templates/OrderConfirmationLayout';
import { OrderConfirmationDetails, type OrderFile } from '@/components/organisms/OrderConfirmationDetails';
import { OrderReceipt } from '@/components/organisms/OrderReceipt';
import { RelatedProducts, type RelatedProduct } from '@/components/organisms/RelatedProducts';
import { fetchOrderById, fetchOrderPaymentMethod, type MyOrder } from '@/lib/ordersApi';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { fetchFileBreakdown } from '@/lib/catalogApi';
import { buildRelatedProducts } from '@/lib/relatedProducts';
import { formatDate } from '@/lib/format';
import { useCart } from '@/hooks/useCart';
import * as S from './styles';

/* mesma seleção "combina com isso" da tela de produto, curada à mão */
const RELATED_IDS = ['static', 'snd-003', 'smoke', 'grid-44'];

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 10;

type PageStatus = 'loading' | 'missing_order' | 'not_found' | 'confirming' | 'timeout' | 'ready';

export function OrderConfirmation() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const orderId = Number(searchParams.get('order_id')) || null;

  const [status, setStatus] = useState<PageStatus>('loading');
  const [order, setOrder] = useState<MyOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [files, setFiles] = useState<OrderFile[]>([]);
  const [related, setRelated] = useState<RelatedProduct[]>([]);

  /* chegou de volta do Stripe Embedded Checkout (return_url leva
     ?session_id=...) — a confirmação de verdade é o webhook, não esta
     página; aqui só esvazia o carrinho local pra não mostrar os itens já
     comprados como se ainda estivessem na sacola. */
  useEffect(() => {
    if (searchParams.get('session_id')) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // busca o pedido; se ainda não estiver 'paid' (webhook assíncrono pode
  // chegar depois do redirect do Stripe), faz polling curto até confirmar
  // ou desistir — nunca trava a página pra sempre.
  useEffect(() => {
    if (!orderId) {
      setStatus('missing_order');
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      const found = await fetchOrderById(orderId);
      if (cancelled) return;

      if (!found) {
        setStatus('not_found');
        return;
      }

      setOrder(found);

      if (found.status === 'paid') {
        setStatus('ready');
        return;
      }

      attempts += 1;
      if (attempts >= POLL_MAX_ATTEMPTS) {
        setStatus('timeout');
        return;
      }

      setStatus('confirming');
      setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  useEffect(() => {
    if (status !== 'ready' || !order) return;
    let cancelled = false;

    Promise.all([fetchMyEntitlements(), fetchOrderPaymentMethod(order.id)]).then(async ([entitlements, method]) => {
      if (cancelled) return;
      setPaymentMethod(method);

      const orderEntitlements = entitlements.filter((entitlement) => entitlement.order_id === order.id);
      const nextFiles = await Promise.all(
        orderEntitlements.map(async (entitlement): Promise<OrderFile> => {
          const breakdown = await fetchFileBreakdown(entitlement.product_id);
          const mobileCount = breakdown.find((row) => row.device_variant === 'mobile')?.file_count ?? 0;
          const desktopCount = breakdown.find((row) => row.device_variant === 'desktop')?.file_count ?? 0;
          return {
            sku: entitlement.sku,
            productId: entitlement.product_id,
            name: entitlement.name,
            kind: t('account.downloads.kind'),
            spec: t('account.downloads.breakdown', { mobile: mobileCount, desktop: desktopCount }),
            fileCount: mobileCount + desktopCount,
          };
        }),
      );
      if (!cancelled) setFiles(nextFiles);
    });

    return () => {
      cancelled = true;
    };
  }, [status, order, t]);

  useEffect(() => {
    let cancelled = false;
    buildRelatedProducts(RELATED_IDS, t).then((result) => {
      if (!cancelled) setRelated(result);
    });
    return () => {
      cancelled = true;
    };
  }, [t]);

  if (status === 'loading') {
    return (
      <MainLayout>
        <PageLoader />
      </MainLayout>
    );
  }

  if (status === 'missing_order' || status === 'not_found') {
    return (
      <MainLayout>
        <S.StatusMessage>
          <S.StatusTitle>{t('orderConfirmation.notFound.title')}</S.StatusTitle>
          <S.StatusBody>{t('orderConfirmation.notFound.body')}</S.StatusBody>
        </S.StatusMessage>
      </MainLayout>
    );
  }

  if (status === 'confirming' || status === 'timeout') {
    return (
      <OrderConfirmationLayout orderNumber={order?.orderNumber ?? ''}>
        <S.StatusMessage>
          <S.StatusTitle>
            {status === 'confirming' ? t('orderConfirmation.confirming.title') : t('orderConfirmation.pending.title')}
          </S.StatusTitle>
          <S.StatusBody>
            {status === 'confirming' ? t('orderConfirmation.confirming.body') : t('orderConfirmation.pending.body')}
          </S.StatusBody>
        </S.StatusMessage>
      </OrderConfirmationLayout>
    );
  }

  if (!order) return null;

  return (
    <OrderConfirmationLayout orderNumber={order.orderNumber}>
      <S.Grid>
        <OrderConfirmationDetails paidAt={order.paidAt ?? order.createdAt} memberEmail={order.email} files={files} />
        <OrderReceipt
          orderNumber={order.orderNumber}
          date={formatDate(order.createdAt, i18n.language)}
          paymentMethod={paymentMethod ? t(`account.orders.method.${paymentMethod}`) : t('account.orders.method.unknown')}
          email={order.email}
          subtotal={order.subtotal}
          discountAmount={order.discountAmount}
          total={order.total}
        />
      </S.Grid>

      <RelatedProducts
        products={related}
        viewAllTo="/products/screens"
        title={t('orderConfirmation.related.title')}
        viewAllLabel={t('orderConfirmation.related.viewAll')}
        showArrows={false}
        cardsPerView={3.5}
      />
    </OrderConfirmationLayout>
  );
}
