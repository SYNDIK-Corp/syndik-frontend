import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchLayout } from '@/components/templates/SearchLayout';
import { SearchBar } from '@/components/organisms/SearchBar';
import { SearchControls } from '@/components/organisms/SearchControls';
import { SearchIdle, type CollectionRow } from '@/components/organisms/SearchIdle';
import { SearchResults, type SearchResultItem } from '@/components/organisms/SearchResults';
import { SearchEmpty } from '@/components/organisms/SearchEmpty';
import { searchCatalog, type SearchableItem, type SearchFilter } from '@/lib/search';
import { fetchScreensCatalog } from '@/lib/catalogApi';
import { DROP_STYLES, formatStyleLabel } from '@/lib/format';
import type { CatalogItem, Product } from '@/types/product';
import * as S from './styles';

const DEBOUNCE_MS = 300;

export function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const [hits, setHits] = useState<SearchableItem[]>([]);
  const [screensCatalog, setScreensCatalog] = useState<CatalogItem[]>([]);

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

  const plateCountLabel = (count: number) =>
    count === 1 ? t('search.plateSingular', { count }) : t('search.platePlural', { count });

  const countLabel = active ? plateCountLabel(hits.length) : t('search.countIdle', { count: screensCatalog.length });

  // Collections = as categorias reais de Drop (drops.style), na mesma
  // ordem fixa usada no catálogo (DROP_STYLES) — só entra categoria que já
  // tem produto publicado. Link direto pro filtro de categoria do catálogo
  // (Catalog/index.tsx lê o mesmo ?category=).
  const collections: CollectionRow[] = DROP_STYLES.filter((style) =>
    screensCatalog.some((item) => item.style === style),
  ).map((style) => ({
    label: formatStyleLabel(style),
    count: screensCatalog.filter((item) => item.style === style).length,
    to: `/products/screens?category=${style}`,
  }));

  // drop mais recente de verdade (published_at), não o último item na ordem
  // de exibição do catálogo (essa é por categoria, não por data). Drops
  // lançados em lote compartilham o mesmo published_at exato — desempata
  // por dbId desc (mesmo critério do drop_volume calculado no banco).
  const lastDropEntry = [...screensCatalog].sort((a, b) => {
    const byDate = new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
    return byDate !== 0 ? byDate : (b.dbId ?? 0) - (a.dbId ?? 0);
  })[0];
  const lastDropProduct: Product | undefined = lastDropEntry && {
    id: lastDropEntry.id,
    sku: lastDropEntry.sku,
    name: lastDropEntry.name,
    price: lastDropEntry.price,
    coverImage: lastDropEntry.coverImage,
    hoverImage: lastDropEntry.hoverImage,
  };

  const results: SearchResultItem[] = hits.map((item) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    coverImage: item.coverImage,
    hoverImage: item.hoverImage,
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
