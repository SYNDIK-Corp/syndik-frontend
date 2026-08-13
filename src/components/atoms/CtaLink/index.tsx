import type { ReactNode } from 'react';
import * as S from './styles';

export interface CtaLinkProps {
  to: string;
  children: ReactNode;
}

export function CtaLink({ to, children }: CtaLinkProps) {
  return (
    <S.Container to={to}>
      {children} <span aria-hidden="true">→</span>
    </S.Container>
  );
}
