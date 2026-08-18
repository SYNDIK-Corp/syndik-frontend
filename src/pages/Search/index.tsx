import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchLayout } from '@/components/templates/SearchLayout';
import { SearchBar } from '@/components/organisms/SearchBar';
import { SearchControls } from '@/components/organisms/SearchControls';
import { SearchIdle, type CollectionRow } from '@/components/organisms/SearchIdle';
import { SearchResults, type SearchResultItem } from '@/components/organisms/SearchResults';
import { SearchEmpty } from '@/components/organisms/SearchEmpty';
import { searchCatalog, type SearchableItem, type SearchFilter } from '@/lib/search';
import { searchProductIds } from '@/lib/searchApi';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import type { CatalogItem, Product } from '@/types/product';
import * as S from './styles';

const DEBOUNCE_MS = 300;

export function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const [hits, setHits] = useState<SearchableItem[]>([]);
  const [screensCatalog, setScreensCatalog] = useState<CatalogItem[]>([]);
  const [suggestionCounts, setSuggestionCounts] = useState<number[]>([]);

  const active = query.trim() !== '' || filter !== 'all';

  useEffect(() => {
    let cancelled = false;
    fetchScreensCatalog().then((result) => {
      if (!cancelled) setScreensCatalog(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // debounced — busca real via RPC (Fase 8), não dispara uma requisição por tecla
  useEffect(() => {
    if (!active) {
      setHits([]);
      return;
    }
    let cancelled = false;
    const timeout = setTimeout(() => {
      searchCatalog(query, filter, t).then((result) => {
        if (!cancelled) setHits(result);
      });
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query, filter, t, active]);

  const suggestionDefs = t('search.suggestions', { returnObjects: true }) as {
    label: string;
    query: string;
  }[];

  useEffect(() => {
    let cancelled = false;
    Promise.all(suggestionDefs.map((suggestion) => searchProductIds(suggestion.query).then((ids) => ids.length))).then(
      (counts) => {
        if (!cancelled) setSuggestionCounts(counts);
      },
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const suggestions = suggestionDefs.map((suggestion, index) => ({
    ...suggestion,
    hits: suggestionCounts[index] ?? 0,
  }));

  const plateCountLabel = (count: number) =>
    count === 1 ? t('search.plateSingular', { count }) : t('search.platePlural', { count });

  const countLabel = active ? plateCountLabel(hits.length) : t('search.countIdle', { count: screensCatalog.length });

  const collections: CollectionRow[] = [
    { label: t('search.collectionRows.sheetScreens'), count: screensCatalog.length, to: '/products/screens' },
    // 'sound' ainda não tem produto real (Fase 10) — sempre 0
    { label: t('search.collectionRows.sheetSound'), count: 0, to: '/products/sound' },
    { label: t('search.collectionRows.newThisWeek'), count: 3, to: '/products/screens' },
    {
      label: t('search.collectionRows.retired'),
      count: screensCatalog.filter((item) => item.sold).length,
      to: '/products/sound',
    },
  ];

  const lastDropEntry = screensCatalog.at(-1);
  const lastDropProduct: Product | undefined = lastDropEntry && {
    id: lastDropEntry.id,
    sku: lastDropEntry.sku,
    name: lastDropEntry.name,
    price: lastDropEntry.price,
  };

  const results: SearchResultItem[] = hits.map((item) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    tag: item.sold ? t('search.soldBadge') : t(`productDetail.related.sheetTag.${item.sheet}`),
    sold: item.sold,
    ratio: item.sheet === 'sound' ? '1 / 1' : '4 / 5',
    to: `/products/${item.sheet}/${item.id}`,
  }));

  return (
    <>
      <SearchLayout>
        <SearchBar query={query} onQueryChange={setQuery} />
      </SearchLayout>

      <S.Section>
        <SearchControls filter={filter} onFilterChange={setFilter} countLabel={countLabel} />

        {!active && lastDropProduct && lastDropEntry && (
          <SearchIdle
            suggestions={suggestions}
            onPickSuggestion={setQuery}
            collections={collections}
            lastDrop={lastDropProduct}
            lastDropTo={`/products/screens/${lastDropEntry.id}`}
          />
        )}
        {active && hits.length > 0 && <SearchResults items={results} />}
        {active && hits.length === 0 && <SearchEmpty />}
      </S.Section>
    </>
  );
}
