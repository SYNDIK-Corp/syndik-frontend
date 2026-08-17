import { useTranslation } from 'react-i18next';
import { CtaLink } from '@/components/atoms/CtaLink';
import * as S from './styles';

export interface ComingSoonProps {
  browseTo: string;
}

export function ComingSoon({ browseTo }: ComingSoonProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Ghosts aria-hidden="true">
        <S.Ghost style={{ animationDelay: '0ms' }} />
        <S.Ghost style={{ animationDelay: '160ms' }} />
        <S.Ghost style={{ animationDelay: '320ms' }} />
      </S.Ghosts>

      <S.Content>
        <S.Badge>{t('catalog.sound.comingSoon.badge')}</S.Badge>
        <S.Headline>{t('catalog.sound.comingSoon.title')}</S.Headline>
        <S.Body>{t('catalog.sound.comingSoon.body')}</S.Body>
        <S.CtaWrap>
          <CtaLink to={browseTo}>{t('catalog.sound.comingSoon.cta')}</CtaLink>
        </S.CtaWrap>
      </S.Content>
    </S.Container>
  );
}
