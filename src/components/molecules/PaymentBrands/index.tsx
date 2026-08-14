import { useTranslation } from 'react-i18next';
import * as S from './styles';

export type BrandKey =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'elo'
  | 'applePay'
  | 'paypal'
  | 'gpay'
  | 'pix'
  | 'stripe';

export interface PaymentBrandsProps {
  brands: BrandKey[];
}

export function PaymentBrands({ brands }: PaymentBrandsProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      {brands.map((brand) => (
        <S.Badge key={brand}>{t(`cart.payment.brands.${brand}`)}</S.Badge>
      ))}
    </S.Container>
  );
}
