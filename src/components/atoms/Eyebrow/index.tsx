import type { ReactNode } from 'react';
import * as S from './styles';

export interface EyebrowProps {
  children: ReactNode;
  dot?: boolean;
}

export function Eyebrow({ children, dot = false }: EyebrowProps) {
  return (
    <S.Container>
      {dot && <S.Dot />}
      <span>{children}</span>
    </S.Container>
  );
}
