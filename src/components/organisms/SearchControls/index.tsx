import { useTranslation } from 'react-i18next';
import type { SearchFilter } from '@/lib/search';
import * as S from './styles';

const FILTER_KEYS: SearchFilter[] = ['all', 'screen', 'sound', 'mobile', 'desktop'];

export interface SearchControlsProps {
  filter: SearchFilter;
  onFilterChange: (filter: SearchFilter) => void;
  countLabel: string;
}

export function SearchControls({ filter, onFilterChange, countLabel }: SearchControlsProps) {
  const { t } = useTranslation();

  return (
    <S.Row>
      <S.Chips>
        {FILTER_KEYS.map((key) => (
          <S.Chip key={key} type="button" $active={filter === key} onClick={() => onFilterChange(key)}>
            {t(`search.filters.${key}`)}
          </S.Chip>
        ))}
      </S.Chips>
      <S.Count>{countLabel}</S.Count>
    </S.Row>
  );
}
