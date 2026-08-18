import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CtaLink } from '@/components/atoms/CtaLink';
import type { HeroBanner } from '@/lib/heroBanners';
import * as S from './styles';

export interface HeroProps {
  banners?: HeroBanner[];
}

export function Hero({ banners = [] }: HeroProps) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const left = banners.find((banner) => banner.slot === 'left');
  const right = banners.find((banner) => banner.slot === 'right');

  const markLoaded = (slot: string) => setLoaded((prev) => (prev[slot] ? prev : { ...prev, [slot]: true }));

  const panes = [left, right].map((banner, index) => {
    if (!banner) return <S.Pane key={index} />;

    // $loaded controla o fade saindo do preto (styles.ts) — checa
    // `img.complete` no ref porque com preload (index.html) a imagem às
    // vezes já chega pronta antes do React montar o listener, e um <img>
    // já completo nunca dispara onLoad de novo (perderia o fade pra sempre).
    const image = (
      <S.Image
        src={banner.image}
        alt={banner.alt}
        fetchPriority="high"
        loading="eager"
        $loaded={Boolean(loaded[banner.slot])}
        onLoad={() => markLoaded(banner.slot)}
        ref={(el) => {
          if (el?.complete) markLoaded(banner.slot);
        }}
      />
    );
    return (
      <S.Pane key={banner.slot}>
        {banner.linkTo ? <S.PaneLink to={banner.linkTo}>{image}</S.PaneLink> : image}
      </S.Pane>
    );
  });

  return (
    <S.Container data-navbar-theme="dark">
      {panes}

      <S.Content>
        <S.Title>{t('hero.title')}</S.Title>
        <S.CtaWrapper>
          <CtaLink to="/products">{t('hero.cta')}</CtaLink>
        </S.CtaWrapper>
      </S.Content>
    </S.Container>
  );
}
