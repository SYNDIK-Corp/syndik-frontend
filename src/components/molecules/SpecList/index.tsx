import * as S from './styles';

export interface SpecListItem {
  title: string;
  description: string;
}

export interface SpecListProps {
  items: SpecListItem[];
}

export function SpecList({ items }: SpecListProps) {
  return (
    <S.Grid>
      {items.map((item, index) => (
        <S.Item key={item.title}>
          <S.Head>
            <S.Number>{String(index + 1).padStart(2, '0')}</S.Number>
            <S.Name>{item.title}</S.Name>
          </S.Head>
          <S.Description>{item.description}</S.Description>
        </S.Item>
      ))}
    </S.Grid>
  );
}
