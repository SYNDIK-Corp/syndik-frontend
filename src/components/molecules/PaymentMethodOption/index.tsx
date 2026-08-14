import type { ReactNode } from 'react';
import * as S from './styles';

export interface PaymentMethodOptionProps {
  label: string;
  active: boolean;
  trailing?: ReactNode;
  onSelect: () => void;
}

export function PaymentMethodOption({ label, active, trailing, onSelect }: PaymentMethodOptionProps) {
  return (
    <S.Header type="button" $active={active} aria-pressed={active} onClick={onSelect}>
      <S.Left>
        <S.Dot $active={active} aria-hidden="true" />
        <S.Label>{label}</S.Label>
      </S.Left>
      {trailing && <S.Trailing>{trailing}</S.Trailing>}
    </S.Header>
  );
}
