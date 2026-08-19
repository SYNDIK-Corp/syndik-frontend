import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CtaLink } from '@/components/atoms/CtaLink';
import type { HeroBanner } from '@/lib/heroBanners';
import * as S from './styles';

export interface HeroProps {
  banners?: HeroBanner[];
  /* dispara quando os painéis já terminaram de carregar E de animar (não só
     o load da imagem) — usado pela SplashScreen (Fase 11.9) pra só revelar
     a Home depois que a Hero está visualmente parada, sem deixar o fade
     dela vazar por trás da splash. */
  onReady?: () => void;
}

export function Hero({ banners = [], onReady }: HeroProps) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [settled, setSettled] = useState<Record<string, boolean>>({});
  const firedReady = useRef(false);
  const left = banners.find((banner) => banner.slot === 'left');
  const right = banners.find((banner) => banner.slot === 'right');

  const markLoaded = (slot: string) => setLoaded((prev) => (prev[slot] ? prev : { ...prev, [slot]: true }));
  const markSettled = (slot: string) => setSettled((prev) => (prev[slot] ? prev : { ...prev, [slot]: true }));

  useEffect(() => {
    if (!onReady || firedReady.current || banners.length === 0) return;
    const allSettled = banners.every((banner) => settled[banner.slot]);
    if (allSettled) {
      firedReady.current = true;
      onReady();
    }
  }, [banners, settled, onReady]);

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
        $delayMs={index * 150}
        onLoad={() => markLoaded(banner.slot)}
        // 'transform' é a mais longa das 3 propriedades em transição
        // (styles.ts) — só nela o painel está de fato parado visualmente
        onTransitionEnd={(event) => {
          if (event.propertyName === 'transform') markSettled(banner.slot);
        }}
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
