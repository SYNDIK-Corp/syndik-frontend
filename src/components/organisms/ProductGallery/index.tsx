import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

export interface GalleryPlate {
  name: string;
  image?: string;
}

export interface ProductGalleryProps {
  plates: GalleryPlate[];
}

export function ProductGallery({ plates }: ProductGalleryProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const total = plates.length;
  const multiple = total > 1;
  const plateNames = plates.map((plate) => plate.name);

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
          {plates.map((plate, index) => (
            <S.Layer key={plate.name} $active={index === active}>
              {plate.image && <S.Image src={plate.image} alt={plate.name} />}
            </S.Layer>
          ))}
        </S.ZoomImage>
        <S.ZoomHint>{t('productDetail.hoverToZoom')}</S.ZoomHint>
      </S.Zoomer>

      {multiple && (
        <S.Filmstrip>
          {plates.map((plate, index) => (
            <S.Thumb
              key={plate.name}
              type="button"
              $active={index === active}
              aria-label={plate.name}
              aria-current={index === active}
              onClick={() => setActive(index)}
            >
              {plate.image && <S.Image src={plate.image} alt="" />}
            </S.Thumb>
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
