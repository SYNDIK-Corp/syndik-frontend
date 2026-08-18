import { useTranslation } from 'react-i18next';
import { CtaLink } from '@/components/atoms/CtaLink';
import type { HeroBanner } from '@/lib/heroBanners';
import * as S from './styles';

export interface HeroProps {
  banners?: HeroBanner[];
}

export function Hero({ banners = [] }: HeroProps) {
  const { t } = useTranslation();
  const left = banners.find((banner) => banner.slot === 'left');
  const right = banners.find((banner) => banner.slot === 'right');

  const panes = [left, right].map((banner, index) => {
    if (!banner) return <S.Pane key={index} />;

    // fetchPriority="high": é a maior imagem da primeira tela (LCP) —
    // carrega antes de qualquer outra coisa não crítica na página
    const image = <S.Image src={banner.image} alt={banner.alt} fetchPriority="high" loading="eager" />;
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
