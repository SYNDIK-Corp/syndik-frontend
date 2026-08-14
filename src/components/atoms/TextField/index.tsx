import type { InputHTMLAttributes } from 'react';
import * as S from './styles';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function TextField(props: TextFieldProps) {
  return <S.Input {...props} />;
}
