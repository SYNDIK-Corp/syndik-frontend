import { Logo } from '@/components/atoms/Logo';
import * as S from './styles';

export function PageLoader() {
  return (
    <S.Container>
      <S.Glow />
      <S.LogoWrap>
        <Logo width="120px" />
      </S.LogoWrap>
    </S.Container>
  );
}
