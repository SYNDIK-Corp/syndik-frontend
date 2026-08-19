import type { TextareaHTMLAttributes } from 'react';
import * as S from './styles';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TextareaProps) {
  return <S.Field {...props} />;
}
