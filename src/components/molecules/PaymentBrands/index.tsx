import * as S from './styles';

export type BrandKey = 'visa' | 'mastercard' | 'amex' | 'elo' | 'applePay' | 'paypal' | 'gpay' | 'stripe';

export interface PaymentBrandsProps {
  brands: BrandKey[];
}

/* marcas reais das bandeiras/carteiras — antes era um texto genérico
   (label traduzido em maiúsculo) dentro de um badge uniforme, igual pra
   todo mundo. Cada marca ganha o tratamento tipográfico/gráfico mais
   próximo da identidade real dela (mesmo em mono, pra bater com o resto
   do site), não é mais um placeholder de texto só. */
const marks: Record<BrandKey, React.ReactNode> = {
  mastercard: (
    <S.MastercardMark aria-label="Mastercard">
      <span />
      <span />
    </S.MastercardMark>
  ),
  visa: <S.Wordmark $style="visa">VISA</S.Wordmark>,
  amex: <S.BoxMark aria-label="American Express">AMEX</S.BoxMark>,
  elo: <S.Wordmark $style="elo">elo</S.Wordmark>,
  stripe: <S.Wordmark $style="stripe">stripe</S.Wordmark>,
  paypal: <S.Wordmark $style="paypal">PayPal</S.Wordmark>,
  applePay: (
    <S.IconWordmark aria-label="Apple Pay">
      <S.AppleGlyph viewBox="0 0 170 170" aria-hidden="true">
        <path d="M150.4 55.3c-1.1.9-20.9 12-20.9 36.8 0 28.7 25.2 38.8 26 39.1-.1.6-4 13.9-13.3 27.5-8.3 12-16.9 24-30.5 24-13.4 0-17.8-8-33.2-8-15 0-20.3 8.3-32.6 8.3-12.3 0-20.9-11.1-30.6-24.7C4.2 141.6-3.7 116.9-3.7 93.5c0-37.4 24.3-57.3 48.2-57.3 13 0 23.8 8.6 32 8.6 7.8 0 19.9-9.1 34.7-9.1 5.6 0 25.4.5 38.2 19.6zM106 20.8c6.2-7.4 10.6-17.6 10.6-27.8 0-1.4-.1-2.9-.4-4-10.1.4-22.1 6.8-29.3 15.2-5.7 6.5-11 16.7-11 27.1 0 1.6.3 3.1.4 3.6.6.1 1.6.3 2.6.3 9.1 0 20.6-6.1 27.1-14.4z" />
      </S.AppleGlyph>
      <span>Pay</span>
    </S.IconWordmark>
  ),
  gpay: (
    <S.IconWordmark aria-label="Google Pay">
      <S.GCircle aria-hidden="true">G</S.GCircle>
      <span>Pay</span>
    </S.IconWordmark>
  ),
};

export function PaymentBrands({ brands }: PaymentBrandsProps) {
  return (
    <S.Container>
      {brands.map((brand) => (
        <S.Badge key={brand}>{marks[brand]}</S.Badge>
      ))}
    </S.Container>
  );
}
