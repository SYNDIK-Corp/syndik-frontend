import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OrderConfirmationLayout } from '@/components/templates/OrderConfirmationLayout';
import { OrderConfirmationDetails, type OrderFile } from '@/components/organisms/OrderConfirmationDetails';
import { OrderReceipt } from '@/components/organisms/OrderReceipt';
import { RelatedProducts, type RelatedProduct } from '@/components/organisms/RelatedProducts';
import { getCatalogEntry } from '@/data/productDetails';
import { accountOrders } from '@/data/accountOrders';
import { accountDownloads } from '@/data/accountDownloads';
import { buildRelatedProducts } from '@/lib/relatedProducts';
import { formatDate } from '@/lib/format';
import { useCart } from '@/hooks/useCart';
import * as S from './styles';

/* mesma seleção "combina com isso" da tela de produto, curada à mão */
const RELATED_IDS = ['static', 'snd-003', 'smoke', 'grid-44'];

export function OrderConfirmation() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const order = accountOrders[0];
  const memberEmail = t('account.mockEmail');

  const [files, setFiles] = useState<OrderFile[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [related, setRelated] = useState<RelatedProduct[]>([]);

  /* chegou de volta do Stripe Embedded Checkout (return_url leva
     ?session_id=...) — a confirmação de verdade é o webhook, não esta
     página; aqui só esvazia o carrinho local pra não mostrar os itens já
     comprados como se ainda estivessem na sacola. */
  useEffect(() => {
    if (searchParams.get('session_id')) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all(order.itemIds.map((id) => getCatalogEntry(id))).then((entries) => {
      if (cancelled) return;

      const nextFiles = order.itemIds
        .map((id, index): OrderFile | null => {
          const entry = entries[index];
          const download = accountDownloads.find((item) => item.id === id);
          if (!entry || !download) return null;

          return {
            sku: entry.item.sku,
            name: entry.item.name,
            kind: t(`account.downloads.items.${id}.kind`),
            spec: t(`account.downloads.items.${id}.specNote`),
            fileSizeMb: download.fileSizeMb,
          };
        })
        .filter((file): file is OrderFile => file !== null);
      setFiles(nextFiles);

      const nextSubtotal = entries.reduce((sum, entry) => sum + (entry?.item.price ?? 0), 0);
      setSubtotal(nextSubtotal);
    });

    buildRelatedProducts(RELATED_IDS, t).then((result) => {
      if (!cancelled) setRelated(result);
    });

    return () => {
      cancelled = true;
    };
  }, [order.itemIds, t]);

  const discountAmount = order.discountRate ? subtotal * order.discountRate : 0;

  return (
    <OrderConfirmationLayout orderNumber={order.number}>
      <S.Grid>
        <OrderConfirmationDetails paidAt={order.date} memberEmail={memberEmail} files={files} />
        <OrderReceipt
          orderNumber={order.number}
          date={formatDate(order.date, i18n.language)}
          paymentMethod={order.paymentMethod}
          email={memberEmail}
          subtotal={subtotal}
          discountAmount={discountAmount}
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
