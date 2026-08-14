import { CheckoutLayout } from '@/components/templates/CheckoutLayout';
import { CheckoutForm } from '@/components/organisms/CheckoutForm';
import { OrderSummary } from '@/components/organisms/OrderSummary';
import * as S from './styles';

export function Checkout() {
  return (
    <CheckoutLayout>
      <S.Grid>
        <CheckoutForm />
        <OrderSummary />
      </S.Grid>
    </CheckoutLayout>
  );
}
