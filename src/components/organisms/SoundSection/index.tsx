import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Marquee } from '@/components/molecules/Marquee';
import type { Product } from '@/types/product';
import * as S from './styles';

const CARD_SPANS = [4, 3];

export interface SoundSectionProps {
  products: Product[];
}

export function SoundSection({ products }: SoundSectionProps) {
  const { t } = useTranslation();
  const tickerItems = t('sound.ticker', { returnObjects: true }) as string[];

  /* traduz etiqueta e descrição do card; o valor do mock é o fallback */
  const localizedProducts = products.map((product) => ({
    ...product,
    collection: t(`sound.products.${product.id}.collection`, { defaultValue: product.collection }),
    tag: product.tag
      ? t(`sound.products.${product.id}.tag`, { defaultValue: product.tag })
      : undefined,
  }));

  return (
    <S.Container data-navbar-theme="black">
      <S.Grid>
        <S.TextColumn>
          <Eyebrow dot>{t('sound.eyebrow')}</Eyebrow>
          <S.Title>{t('sound.title')}</S.Title>
          <S.Description>{t('sound.description')}</S.Description>
          <S.Actions>
            <S.PrimaryCta to="/products">
              {t('sound.cta')} <span aria-hidden="true">→</span>
            </S.PrimaryCta>
            <CtaLink to="/products" arrow={false}>
              {t('sound.secondaryCta')}
            </CtaLink>
          </S.Actions>
          <S.Perks>{t('sound.perks')}</S.Perks>
        </S.TextColumn>

        {localizedProducts.map((product, index) => (
          <S.CardSlot key={product.id} $span={CARD_SPANS[index] ?? 3}>
            <ProductCard product={product} tone="dark" ratio="1 / 1" metaLayout="row" />
          </S.CardSlot>
        ))}
      </S.Grid>

      <S.Ticker>
        <Marquee items={tickerItems} />
      </S.Ticker>
    </S.Container>
  );
}
