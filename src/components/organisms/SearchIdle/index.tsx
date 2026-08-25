import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/molecules/ProductCard';
import type { Product } from '@/types/product';
import * as S from './styles';

export interface CollectionRow {
  label: string;
  count: number;
  to: string;
}

export interface SearchIdleProps {
  collections: CollectionRow[];
  lastDrop: Product;
  lastDropTo: string;
}

export function SearchIdle({ collections, lastDrop, lastDropTo }: SearchIdleProps) {
  const { t } = useTranslation();

  return (
    <S.Grid>
      <div>
        <S.ColumnLabel>{t('search.collections')}</S.ColumnLabel>
        <S.List>
          {collections.map((collection) => (
            <S.TermRow key={collection.label} to={collection.to}>
              <S.TermLabel>{collection.label}</S.TermLabel>
              <S.TermHits>{t('search.platePlural', { count: collection.count })}</S.TermHits>
            </S.TermRow>
          ))}
        </S.List>
      </div>

      <div>
        <S.ColumnLabel>{t('search.lastDrop')}</S.ColumnLabel>
        <S.LastDropCard>
          <ProductCard product={lastDrop} to={lastDropTo} />
        </S.LastDropCard>
      </div>
    </S.Grid>
  );
}
