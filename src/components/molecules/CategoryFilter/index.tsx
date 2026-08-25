import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface CategoryFilterOption {
  value: string;
  label: string;
}

export interface CategoryFilterProps {
  options: CategoryFilterOption[];
  active: string | null;
  onChange: (value: string | null) => void;
}

/* uma categoria por vez (não multi-select) — "Todos" + as categorias reais
   do catálogo, mesmo estilo de pill do menu da Conta. Rola horizontalmente
   no mobile em vez de quebrar linha, com uma setinha animada (só aparece
   se sobrar categoria fora da tela) avisando que dá pra arrastar — mesmo
   padrão de affordance do ScrollHint em ProductGallery. */
export function CategoryFilter({ options, active, onChange }: CategoryFilterProps) {
  const { t } = useTranslation();
  const rowRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const checkOverflow = () => {
    const el = rowRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth - el.clientWidth > 4;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setShowScrollHint(hasOverflow && !atEnd);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [options]);

  return (
    <S.Wrap>
      <S.Row ref={rowRef} role="tablist" aria-label={t('catalog.filters.label')} onScroll={checkOverflow}>
        <S.Pill type="button" role="tab" $active={active === null} aria-selected={active === null} onClick={() => onChange(null)}>
          {t('catalog.filters.all')}
        </S.Pill>
        {options.map((option) => (
          <S.Pill
            key={option.value}
            type="button"
            role="tab"
            $active={active === option.value}
            aria-selected={active === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </S.Pill>
        ))}
      </S.Row>

      {showScrollHint && (
        <S.ScrollHint aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </S.ScrollHint>
      )}
    </S.Wrap>
  );
}
