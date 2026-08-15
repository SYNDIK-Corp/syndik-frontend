import { useTranslation } from 'react-i18next';
import * as S from './styles';

export function SearchEmpty() {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Title>{t('search.empty.title')}</S.Title>
      <S.Description>{t('search.empty.description')}</S.Description>
      <S.Actions>
        <S.CommissionButton to="/contact">{t('search.empty.commission')}</S.CommissionButton>
        <S.BrowseLink to="/products/screens">
          {t('search.empty.browse')} <span aria-hidden="true">→</span>
        </S.BrowseLink>
      </S.Actions>
    </S.Container>
  );
}
