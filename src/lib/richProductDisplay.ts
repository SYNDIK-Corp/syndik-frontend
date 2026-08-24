import type { TFunction } from 'i18next';
import { formatStyleLabel } from '@/lib/format';
import type { CatalogItem, Product } from '@/types/product';

const hasRichTitle = (item: CatalogItem) => item.style != null && item.volume != null;

/* "VOL.N — Nome", sem o parêntese de marketing — usada em lugares
   compactos/transacionais (carrinho, checkout) onde o título comprido do
   card não cabe bem. Cai pro nome puro sem estilo/volume cadastrado. */
export function shortRichTitle(item: CatalogItem): string {
  return hasRichTitle(item) ? `VOL. ${item.volume} — ${item.name}`.toUpperCase() : item.name;
}

/* mesma composição "categoria + VOL.N — Nome (X Original Artworks...)" do
   grid principal do catálogo — reaproveitada em qualquer lugar que precise
   do mesmo tratamento visual (ex.: cluster de mais vendidos da home). Cai
   pro nome puro quando o Drop ainda não tem estilo/volume cadastrado. */
export function toRichProduct(item: CatalogItem, t: TFunction): Product {
  const rich = hasRichTitle(item);

  return {
    id: item.id,
    dbId: item.dbId,
    sku: item.sku,
    name: rich
      ? t('catalog.richTitle', { volume: item.volume, name: item.name, count: item.designCount }).toUpperCase()
      : item.name,
    cartName: shortRichTitle(item),
    category: rich && item.style ? formatStyleLabel(item.style) : undefined,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    onSale: item.compareAtPrice != null,
    sold: item.sold,
    coverImage: item.coverImage,
    coverAlt: item.coverAlt,
    hoverImage: item.hoverImage,
  };
}
