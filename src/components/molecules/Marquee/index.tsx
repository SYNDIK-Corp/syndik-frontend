import * as S from './styles';

export interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  return (
    <S.Container>
      <S.Track>
        {[0, 1].map((copy) =>
          items.map((item, index) => (
            <S.Item key={`${copy}-${index}`} aria-hidden={copy === 1}>
              {item}
            </S.Item>
          )),
        )}
      </S.Track>
    </S.Container>
  );
}
