import { useTranslation } from 'react-i18next';
import { OrderConfirmationLayout } from '@/components/templates/OrderConfirmationLayout';
import { OrderConfirmationDetails, type OrderFile } from '@/components/organisms/OrderConfirmationDetails';
import { OrderReceipt } from '@/components/organisms/OrderReceipt';
import { RelatedProducts } from '@/components/organisms/RelatedProducts';
import { getCatalogEntry } from '@/data/productDetails';
import { accountOrders } from '@/data/accountOrders';
import { accountDownloads } from '@/data/accountDownloads';
import { buildRelatedProducts } from '@/lib/relatedProducts';
import { formatDate } from '@/lib/format';
import * as S from './styles';

/* mesma seleção "combina com isso" da tela de produto, curada à mão */
const RELATED_IDS = ['scr-002', 'snd-003', 'scr-005', 'scr-006'];

export function OrderConfirmation() {
  const { t, i18n } = useTranslation();

  const order = accountOrders[0];
  const memberEmail = t('account.mockEmail');

  const files: OrderFile[] = order.itemIds
    .map((id): OrderFile | null => {
      const entry = getCatalogEntry(id);
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

  const subtotal = order.itemIds.reduce((sum, id) => sum + (getCatalogEntry(id)?.item.price ?? 0), 0);
  const discountAmount = order.discountRate ? subtotal * order.discountRate : 0;

  const related = buildRelatedProducts(RELATED_IDS, t);

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
