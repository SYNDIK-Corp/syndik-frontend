import type { ReactNode } from 'react';
import * as S from './styles';

export interface CtaLinkProps {
  to: string;
  children: ReactNode;
  arrow?: boolean;
}

export function CtaLink({ to, children, arrow = true }: CtaLinkProps) {
  return (
    <S.Container to={to}>
      {children}
      {arrow && <span aria-hidden="true"> →</span>}
    </S.Container>
  );
}
