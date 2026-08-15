import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

export interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <S.Row>
      <S.IconWrapper>
        <Icon name="search" size={26} />
      </S.IconWrapper>
      <S.Input
        autoFocus
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t('search.placeholder')}
      />
      {query && (
        <S.ClearButton type="button" onClick={() => onQueryChange('')}>
          {t('search.clear')}
        </S.ClearButton>
      )}
    </S.Row>
  );
}
