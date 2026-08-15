import { ProductCard } from '@/components/molecules/ProductCard';
import type { Product } from '@/types/product';
import * as S from './styles';

export interface SearchResultItem extends Product {
  ratio: '4 / 5' | '1 / 1';
  to: string;
}

export interface SearchResultsProps {
  items: SearchResultItem[];
}

export function SearchResults({ items }: SearchResultsProps) {
  return (
    <S.Grid>
      {items.map((item) => (
        <ProductCard key={item.id} product={item} dense metaLayout="row" ratio={item.ratio} to={item.to} />
      ))}
    </S.Grid>
  );
}
