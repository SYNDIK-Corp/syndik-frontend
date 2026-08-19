import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { SoundComingSoonCard } from '@/components/molecules/SoundComingSoonCard';
import { Marquee } from '@/components/molecules/Marquee';
import type { SoundComingSoonItem } from '@/data/products';
import * as S from './styles';

const CARD_SPANS = [4, 3];

export interface SoundSectionProps {
  products: SoundComingSoonItem[];
}

export function SoundSection({ products }: SoundSectionProps) {
  const { t } = useTranslation();
  const tickerItems = t('sound.ticker', { returnObjects: true }) as string[];

  return (
    <S.Container data-navbar-theme="black">
      <S.Grid>
        <S.TextColumn>
          <Eyebrow dot>{t('sound.eyebrow')}</Eyebrow>
          <S.Title>{t('sound.title')}</S.Title>
          <S.Description>{t('sound.description')}</S.Description>
          <S.Actions>
            <S.ComingSoonPill>{t('sound.comingSoon')}</S.ComingSoonPill>
          </S.Actions>
          <S.Perks>{t('sound.perks')}</S.Perks>
        </S.TextColumn>

        {products.map((product, index) => (
          <S.CardSlot key={product.id} $span={CARD_SPANS[index] ?? 3}>
            <SoundComingSoonCard
              name={product.name}
              collection={t(`sound.products.${product.id}.collection`)}
            />
          </S.CardSlot>
        ))}
      </S.Grid>

      <S.Ticker>
        <Marquee items={tickerItems} />
      </S.Ticker>
    </S.Container>
  );
}
