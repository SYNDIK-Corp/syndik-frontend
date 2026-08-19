import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface SoundComingSoonCardProps {
  name: string;
  collection: string;
}

/* Peça própria pro anúncio "em breve" da seção Sound — de propósito não
 * reaproveita o ProductCard (compra ativa): sem preço, sem link, sem botão
 * de carrinho, arte é um placeholder puramente CSS até o usuário entregar a
 * arte de marketing real (Fase 11.2). */
export function SoundComingSoonCard({ name, collection }: SoundComingSoonCardProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Frame>
        <S.Badge>{t('sound.comingSoon')}</S.Badge>
        <S.Wordmark>{t('sound.comingSoon')}</S.Wordmark>
      </S.Frame>
      <S.Meta>
        <S.Name>{name}</S.Name>
        <S.Collection>{collection}</S.Collection>
      </S.Meta>
    </S.Container>
  );
}
