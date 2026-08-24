import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { PageLoader } from '@/components/molecules/PageLoader';
import { OrderConfirmationLayout } from '@/components/templates/OrderConfirmationLayout';
import { OrderConfirmationDetails, type OrderFile } from '@/components/organisms/OrderConfirmationDetails';
import { OrderSuccessMoment } from '@/components/organisms/OrderSuccessMoment';
import { OrderReceipt } from '@/components/organisms/OrderReceipt';
import { RelatedProducts, type RelatedProduct } from '@/components/organisms/RelatedProducts';
import { fetchOrderById, fetchOrderByPublicToken, fetchOrderPaymentMethod, type MyOrder } from '@/lib/ordersApi';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { fetchFileBreakdown, fetchProductCoverImages } from '@/lib/catalogApi';
import { buildRealRelatedProducts } from '@/lib/relatedProducts';
import { formatDate } from '@/lib/format';
import { useCart } from '@/hooks/useCart';
import * as S from './styles';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 10;
/* selo de "venda aprovada" fica visível por SUCCESS_HOLD_MS, depois inicia
   a transição de saída (opacity/scale, ver styles) que dura mais
   SUCCESS_EXIT_MS antes de revelar a tela de pedido de verdade. */
const SUCCESS_HOLD_MS = 1600;
const SUCCESS_EXIT_MS = 350;

type PageStatus = 'loading' | 'missing_order' | 'not_found' | 'confirming' | 'timeout' | 'ready';

export function OrderConfirmation() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const orderId = Number(searchParams.get('order_id')) || null;
  /* presente quando veio do redirect do Stripe ou do link do recibo por
     email — checkout guest não tem sessão no browser, então orders (RLS:
     user_id = auth.uid()) não é legível direto; o token prova posse do
     pedido sem precisar de sessão (order-lookup-public, validado
     server-side). Sem token, cai no caminho de sempre (RLS autenticada) —
     usado quando quem está logado abre um recibo antigo pela Conta. */
  const token = searchParams.get('token');

  const [status, setStatus] = useState<PageStatus>('loading');
  const [order, setOrder] = useState<MyOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [files, setFiles] = useState<OrderFile[]>([]);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [showSuccess, setShowSuccess] = useState(true);
  const [successExiting, setSuccessExiting] = useState(false);

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
      let found: MyOrder | null = null;
      let method: string | null = null;

      try {
        if (token) {
          const result = await fetchOrderByPublicToken(orderId, token);
          found = result?.order ?? null;
          method = result?.paymentMethod ?? null;
        } else {
          found = await fetchOrderById(orderId);
        }
      } catch (error) {
        // nunca deixa a página travada no loading pra sempre por causa de
        // um erro de rede/RLS — sem posse confirmada, trata como não achado
        console.error('OrderConfirmation: falha ao buscar o pedido', error);
        if (!cancelled) setStatus('not_found');
        return;
      }

      if (cancelled) return;

      if (!found) {
        setStatus('not_found');
        return;
      }

      setOrder(found);
      if (token) setPaymentMethod(method);

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
  }, [orderId, token]);

  /* fetchMyEntitlements()/fetchOrderPaymentMethod() dependem de sessão
     (RPC filtra por auth.uid()) — guest nunca tem uma. Com token, monta a
     lista de arquivos direto do order.items (já veio com product_id do
     order-lookup-public) e usa o paymentMethod que a mesma chamada já
     trouxe (setado no polling acima), sem chamada extra nenhuma. */
  useEffect(() => {
    if (status !== 'ready' || !order) return;
    let cancelled = false;

    const buildFiles = async (
      entries: { sku: string; productId: number; name: string }[],
    ): Promise<OrderFile[]> => {
      const covers = await fetchProductCoverImages(entries.map((entry) => entry.productId));
      return Promise.all(
        entries.map(async (entry): Promise<OrderFile> => {
          const breakdown = await fetchFileBreakdown(entry.productId);
          const mobileCount = breakdown.find((row) => row.device_variant === 'mobile')?.file_count ?? 0;
          const desktopCount = breakdown.find((row) => row.device_variant === 'desktop')?.file_count ?? 0;
          return {
            sku: entry.sku,
            productId: entry.productId,
            name: entry.name,
            kind: t('account.downloads.kind'),
            spec: t('account.downloads.breakdown', { mobile: mobileCount, desktop: desktopCount }),
            fileCount: mobileCount + desktopCount,
            coverImage: covers.get(entry.productId),
          };
        }),
      );
    };

    if (token) {
      const entries = order.items
        .filter((item): item is typeof item & { product_id: number } => item.product_id != null)
        .map((item) => ({ sku: item.sku_snapshot, productId: item.product_id, name: item.name_snapshot }));
      buildFiles(entries).then((nextFiles) => {
        if (!cancelled) setFiles(nextFiles);
      });
    } else {
      Promise.all([fetchMyEntitlements(), fetchOrderPaymentMethod(order.id)]).then(async ([entitlements, method]) => {
        if (cancelled) return;
        setPaymentMethod(method);

        const orderEntitlements = entitlements.filter((entitlement) => entitlement.order_id === order.id);
        const nextFiles = await buildFiles(
          orderEntitlements.map((entitlement) => ({
            sku: entitlement.sku,
            productId: entitlement.product_id,
            name: entitlement.name,
          })),
        );
        if (!cancelled) setFiles(nextFiles);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [status, order, token, t]);

  // selo de sucesso é um beat único — só dispara quando o pedido vira
  // 'ready' pela primeira vez, nunca de novo (ex.: reabrir a mesma tela)
  useEffect(() => {
    if (status !== 'ready') return;

    const exitTimer = setTimeout(() => setSuccessExiting(true), SUCCESS_HOLD_MS);
    const hideTimer = setTimeout(() => setShowSuccess(false), SUCCESS_HOLD_MS + SUCCESS_EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status === 'ready']);

  useEffect(() => {
    if (!order) return;
    let cancelled = false;
    const purchasedSkus = order.items.map((item) => item.sku_snapshot);
    buildRealRelatedProducts(purchasedSkus, t).then((result) => {
      if (!cancelled) setRelated(result);
    });
    return () => {
      cancelled = true;
    };
  }, [order, t]);

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

  if (showSuccess) {
    return (
      <OrderConfirmationLayout orderNumber={order.orderNumber}>
        <OrderSuccessMoment orderNumber={order.orderNumber} exiting={successExiting} />
      </OrderConfirmationLayout>
    );
  }

  return (
    <OrderConfirmationLayout orderNumber={order.orderNumber}>
      <S.Grid>
        <OrderConfirmationDetails
          orderId={order.id}
          paidAt={order.paidAt ?? order.createdAt}
          memberEmail={order.email}
          files={files}
          guestProof={token ? { orderId: order.id, token } : undefined}
        />
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
        cardsPerView={5}
      />
    </OrderConfirmationLayout>
  );
}
