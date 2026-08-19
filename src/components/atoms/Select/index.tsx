import type { SelectHTMLAttributes } from 'react';
import * as S from './styles';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: SelectProps) {
  return <S.Field {...props} />;
}
