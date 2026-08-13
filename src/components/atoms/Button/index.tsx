import type { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './styles';

export type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <S.Container $variant={variant} {...rest}>
      {children}
    </S.Container>
  );
}
