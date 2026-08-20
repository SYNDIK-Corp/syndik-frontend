import { Trans, useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import * as S from './styles';

/* renderizado uma vez, perto do CartDrawer (MainLayout) — lê
   pendingDuplicate do CartContext e só aparece quando addItem detecta um
   SKU já presente no carrinho, em vez de duplicar a linha direto. */
export function DuplicateItemModal() {
  const { t } = useTranslation();
  const { pendingDuplicate, confirmAddDuplicate, cancelAddDuplicate } = useCart();

  if (!pendingDuplicate) return null;

  return (
    <S.Backdrop onClick={cancelAddDuplicate}>
      <S.Card onClick={(event) => event.stopPropagation()}>
        <S.Title>{t('cart.duplicate.title')}</S.Title>
        <S.Body>
          <Trans
            i18nKey="cart.duplicate.body"
            values={{ name: pendingDuplicate.name }}
            components={[<S.ProductName key="0" />]}
          />
        </S.Body>
        <S.Actions>
          <S.CancelButton type="button" onClick={cancelAddDuplicate}>
            {t('cart.duplicate.cancel')}
          </S.CancelButton>
          <S.ConfirmButton type="button" onClick={confirmAddDuplicate}>
            {t('cart.duplicate.confirm')}
          </S.ConfirmButton>
        </S.Actions>
      </S.Card>
    </S.Backdrop>
  );
}
