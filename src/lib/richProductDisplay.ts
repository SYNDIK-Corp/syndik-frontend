import type { TFunction } from 'i18next';
import { formatStyleLabel } from '@/lib/format';
import type { CatalogItem, Product } from '@/types/product';

/* mesma composição "categoria + VOL.N — Nome (X Original Artworks...)" do
   grid principal do catálogo — reaproveitada em qualquer lugar que precise
   do mesmo tratamento visual (ex.: cluster de mais vendidos da home). Cai
   pro nome puro quando o Drop ainda não tem estilo/volume cadastrado. */
export function toRichProduct(item: CatalogItem, t: TFunction): Product {
  const hasRichTitle = item.style != null && item.volume != null;

  return {
    id: item.id,
    sku: item.sku,
    name: hasRichTitle
      ? t('catalog.richTitle', { volume: item.volume, name: item.name, count: item.designCount }).toUpperCase()
      : item.name,
    category: hasRichTitle && item.style ? formatStyleLabel(item.style) : undefined,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    onSale: item.compareAtPrice != null,
    sold: item.sold,
    coverImage: item.coverImage,
    coverAlt: item.coverAlt,
    hoverImage: item.hoverImage,
  };
}
