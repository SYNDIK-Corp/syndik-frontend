import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchLayout } from '@/components/templates/SearchLayout';
import { SearchBar } from '@/components/organisms/SearchBar';
import { SearchControls } from '@/components/organisms/SearchControls';
import { SearchIdle, type CollectionRow } from '@/components/organisms/SearchIdle';
import { SearchResults, type SearchResultItem } from '@/components/organisms/SearchResults';
import { SearchEmpty } from '@/components/organisms/SearchEmpty';
import { buildSearchIndex, searchCatalog, type SearchableItem, type SearchFilter } from '@/lib/search';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import type { CatalogItem, Product } from '@/types/product';
import * as S from './styles';

export function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const [index, setIndex] = useState<SearchableItem[]>([]);
  const [screensCatalog, setScreensCatalog] = useState<CatalogItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    buildSearchIndex(t).then((result) => {
      if (!cancelled) setIndex(result);
    });
    return () => {
      cancelled = true;
    };
  }, [t]);

  useEffect(() => {
    let cancelled = false;
    fetchScreensCatalog().then((result) => {
      if (!cancelled) setScreensCatalog(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const hits = useMemo(() => searchCatalog(index, query, filter), [index, query, filter]);
  const active = query.trim() !== '' || filter !== 'all';

  const plateCountLabel = (count: number) =>
    count === 1 ? t('search.plateSingular', { count }) : t('search.platePlural', { count });

  const countLabel = active ? plateCountLabel(hits.length) : t('search.countIdle', { count: index.length });

  const suggestionDefs = t('search.suggestions', { returnObjects: true }) as {
    label: string;
    query: string;
  }[];
  const suggestions = suggestionDefs.map((suggestion) => ({
    ...suggestion,
    hits: searchCatalog(index, suggestion.query, 'all').length,
  }));

  const collections: CollectionRow[] = [
    {
      label: t('search.collectionRows.sheetScreens'),
      count: index.filter((item) => item.sheet === 'screens').length,
      to: '/products/screens',
    },
    {
      label: t('search.collectionRows.sheetSound'),
      count: index.filter((item) => item.sheet === 'sound').length,
      to: '/products/sound',
    },
    { label: t('search.collectionRows.newThisWeek'), count: 3, to: '/products/screens' },
    {
      label: t('search.collectionRows.retired'),
      count: index.filter((item) => item.sold).length,
      to: '/products/sound',
    },
  ];

  const lastDropEntry = screensCatalog.at(-1);
  const lastDropProduct: Product | undefined = lastDropEntry && {
    id: lastDropEntry.id,
    sku: lastDropEntry.sku,
    collection: `${lastDropEntry.sku} / ${t(`catalog.variants.${lastDropEntry.variant}`)}`,
    name: lastDropEntry.name,
    price: lastDropEntry.price,
  };

  const results: SearchResultItem[] = hits.map((item) => ({
    id: item.id,
    sku: item.sku,
    collection: `${item.sku} / ${item.kind}`,
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
