import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

export interface AddonRowProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  onAdd: () => void;
}

export function AddonRow({ name, description, price, image, onAdd }: AddonRowProps) {
  const { t, i18n } = useTranslation();

  return (
    <S.Container>
      <S.Thumb>{image && <S.ThumbImage src={image} alt="" />}</S.Thumb>
      <S.Info>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Info>
      <S.Actions>
        <S.Price>{formatPrice(price, i18n.language)}</S.Price>
        <S.AddButton type="button" onClick={onAdd}>
          {t('checkout.summary.add')}
        </S.AddButton>
      </S.Actions>
    </S.Container>
  );
}
