import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

export interface ProductGalleryProps {
  plateNames: string[];
}

export function ProductGallery({ plateNames }: ProductGalleryProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const total = plateNames.length;
  const multiple = total > 1;

  const step = (direction: -1 | 1) => {
    setActive((current) => (current + direction + total) % total);
  };

  return (
    <S.Container>
      {multiple && (
        <S.Header>
          <S.Counter>
            {t('productDetail.plateCounter', {
              current: String(active + 1).padStart(2, '0'),
              total: String(total).padStart(2, '0'),
              name: plateNames[active],
            })}
          </S.Counter>
          <S.Arrows>
            <S.Arrow type="button" aria-label={t('productDetail.previousPlate')} onClick={() => step(-1)}>
              <Icon name="chevron-left" size={15} />
            </S.Arrow>
            <S.Arrow type="button" aria-label={t('productDetail.nextPlate')} onClick={() => step(1)}>
              <Icon name="chevron-right" size={15} />
            </S.Arrow>
          </S.Arrows>
        </S.Header>
      )}

      <S.Zoomer>
        <S.ZoomImage>
          {plateNames.map((name, index) => (
            <S.Layer key={name} $active={index === active} />
          ))}
        </S.ZoomImage>
        <S.ZoomHint>{t('productDetail.hoverToZoom')}</S.ZoomHint>
      </S.Zoomer>

      {multiple && (
        <S.Filmstrip>
          {plateNames.map((name, index) => (
            <S.Thumb
              key={name}
              type="button"
              $active={index === active}
              aria-label={name}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </S.Filmstrip>
      )}

      <S.Footer>
        <span>
          {multiple
            ? t('productDetail.allPlatesIncluded', { count: total })
            : t('productDetail.singleFileIncluded')}
        </span>
        {multiple && <S.FooterHighlight>{t('productDetail.useStripHint')}</S.FooterHighlight>}
      </S.Footer>
    </S.Container>
  );
}
