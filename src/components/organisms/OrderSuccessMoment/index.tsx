import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface OrderSuccessMomentProps {
  orderNumber: string;
  /* controla a transição de saída — o pai desmonta este componente depois
     da transição terminar (ver OrderConfirmation). */
  exiting: boolean;
}

/* Beat rápido de "venda aprovada" antes de revelar a tela de pedido de
 * verdade — selo desenha o círculo, depois o check, texto sobe em seguida.
 * Puramente decorativo: o pai controla timing/saída, este componente só
 * anima a entrada uma vez. */
export function OrderSuccessMoment({ orderNumber, exiting }: OrderSuccessMomentProps) {
  const { t } = useTranslation();

  return (
    <S.Container $exiting={exiting}>
      <S.Seal>
        <S.SealSvg viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="54" />
          <path d="M36 62 L52 78 L86 42" />
        </S.SealSvg>
      </S.Seal>
      <S.Eyebrow>{t('orderConfirmation.success.eyebrow')}</S.Eyebrow>
      <S.Headline>{t('orderConfirmation.success.headline')}</S.Headline>
      <S.OrderNumber>{t('orderConfirmation.orderBadge', { number: orderNumber })}</S.OrderNumber>
    </S.Container>
  );
}
