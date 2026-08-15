import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

export interface OrderReceiptProps {
  orderNumber: string;
  date: string;
  paymentMethod: string;
  email: string;
  subtotal: number;
  discountAmount: number;
  total: number;
}

export function OrderReceipt({
  orderNumber,
  date,
  paymentMethod,
  email,
  subtotal,
  discountAmount,
  total,
}: OrderReceiptProps) {
  const { t, i18n } = useTranslation();

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('orderConfirmation.receipt.title')}</S.Title>
        <S.PrintButton type="button" onClick={() => window.print()}>
          {t('orderConfirmation.receipt.print')}
        </S.PrintButton>
      </S.Header>

      <S.InfoList>
        <S.InfoRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.order')}</S.InfoLabel>
          <S.InfoValue>{orderNumber}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.date')}</S.InfoLabel>
          <S.InfoValue>{date}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.method')}</S.InfoLabel>
          <S.InfoValue>{paymentMethod}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.email')}</S.InfoLabel>
          <S.InfoValue>{email}</S.InfoValue>
        </S.InfoRow>
      </S.InfoList>

      <S.Totals>
        <S.TotalRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.subtotal')}</S.InfoLabel>
          <span>{formatPrice(subtotal, i18n.language)}</span>
        </S.TotalRow>
        <S.TotalRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.discount')}</S.InfoLabel>
          <span>{discountAmount > 0 ? `− ${formatPrice(discountAmount, i18n.language)}` : '—'}</span>
        </S.TotalRow>
        <S.TotalRow>
          <S.InfoLabel>{t('orderConfirmation.receipt.delivery')}</S.InfoLabel>
          <span>{t('orderConfirmation.receipt.deliveryValue')}</span>
        </S.TotalRow>
        <S.PaidRow>
          <S.PaidLabel>{t('orderConfirmation.receipt.paid')}</S.PaidLabel>
          <S.PaidValue>{formatPrice(total, i18n.language)}</S.PaidValue>
        </S.PaidRow>
      </S.Totals>

      <S.Note>
        <S.NoteLabel>{t('orderConfirmation.licence.label')}</S.NoteLabel>
        <S.NoteBody>{t('orderConfirmation.licence.body')}</S.NoteBody>
        <S.NoteCtaAnchor href="#" onClick={(event) => event.preventDefault()}>
          {t('orderConfirmation.licence.cta')} <span aria-hidden="true">→</span>
        </S.NoteCtaAnchor>
      </S.Note>

      <S.Note>
        <S.NoteLabel>{t('orderConfirmation.support.label')}</S.NoteLabel>
        <S.NoteBody>{t('orderConfirmation.support.body')}</S.NoteBody>
        <S.NoteCtaLink to="/contact">
          {t('orderConfirmation.support.cta')} <span aria-hidden="true">→</span>
        </S.NoteCtaLink>
      </S.Note>
    </S.Container>
  );
}
