import type { ReactNode } from 'react';
import * as S from './styles';

export interface AccordionItemProps {
  question: string;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, children, open, onToggle }: AccordionItemProps) {
  return (
    <S.Container>
      <S.Header type="button" aria-expanded={open} onClick={onToggle}>
        <span>{question}</span>
        <S.Plus $open={open} aria-hidden="true">
          +
        </S.Plus>
      </S.Header>
      <S.AnswerWrapper $open={open}>
        <S.AnswerInner>
          <S.Answer>{children}</S.Answer>
        </S.AnswerInner>
      </S.AnswerWrapper>
    </S.Container>
  );
}
