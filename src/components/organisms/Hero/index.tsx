import { useTranslation } from 'react-i18next';
import { CtaLink } from '@/components/atoms/CtaLink';
import * as S from './styles';

export interface HeroProps {
  leftImage?: string;
  leftImageAlt?: string;
  rightImage?: string;
  rightImageAlt?: string;
}

export function Hero({ leftImage, leftImageAlt, rightImage, rightImageAlt }: HeroProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Pane>
        {leftImage && <S.Image src={leftImage} alt={leftImageAlt ?? ''} />}
      </S.Pane>
      <S.Pane>
        {rightImage && <S.Image src={rightImage} alt={rightImageAlt ?? ''} />}
      </S.Pane>

      <S.Content>
        <S.Title>{t('hero.title')}</S.Title>
        <S.CtaWrapper>
          <CtaLink to="/products">{t('hero.cta')}</CtaLink>
        </S.CtaWrapper>
      </S.Content>
    </S.Container>
  );
}
