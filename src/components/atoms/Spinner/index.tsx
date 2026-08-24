import * as S from './styles';

export interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 14 }: SpinnerProps) {
  return <S.Spin $size={size} aria-hidden="true" />;
}
