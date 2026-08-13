import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

/* mock local até os serviços virem do backend */
const SERVICE_ROWS = [
  { key: 'wallpapers', to: '/products', price: 3.99, from: true },
  { key: 'singleCover', to: '/products', price: 5.0 },
  { key: 'albumPack', to: '/products', price: 19.99 },
  { key: 'custom', to: '/contact' },
] as const;

export interface ArchiveSectionProps {
  desktopImage?: string;
  mobileImage?: string;
  coverImage?: string;
  trackName?: string;
}

export function ArchiveSection({
  desktopImage,
  mobileImage,
  coverImage,
  trackName = 'NOCTURNE',
}: ArchiveSectionProps) {
  const { t, i18n } = useTranslation();
  const captions = t('archive.captions', { returnObjects: true }) as string[];
  const specs = t('archive.specs', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const rowPrice = (row: (typeof SERVICE_ROWS)[number]) => {
    if (!('price' in row)) return t('archive.rows.custom.price');
    const price = formatPrice(row.price, i18n.language);
    return 'from' in row && row.from ? t('archive.priceFrom', { price }) : price;
  };

  return (
    <S.Container>
      <S.Grid>
        <S.Showcase>
          <S.Laptop>
            <S.LaptopBody>
              <S.LaptopScreen>
                {desktopImage && <S.SlotImage src={desktopImage} alt="" />}
              </S.LaptopScreen>
            </S.LaptopBody>
            <S.LaptopBase>
              <S.LaptopNotch />
            </S.LaptopBase>
          </S.Laptop>

          <S.Phone>
            <S.PhoneScreen>
              {mobileImage && <S.SlotImage src={mobileImage} alt="" />}
              <S.PhoneNotch />
            </S.PhoneScreen>
          </S.Phone>

          <S.CoverBlock>
            <S.CoverArt>
              {coverImage && <S.SlotImage src={coverImage} alt="" />}
              <S.CoverTag>{t('archive.coverTag')}</S.CoverTag>
            </S.CoverArt>
            <S.NowPlaying>
              <S.NowPlayingThumb>
                {coverImage && <S.ThumbImage src={coverImage} alt="" />}
              </S.NowPlayingThumb>
              <S.NowPlayingInfo>
                <S.TrackName>{trackName}</S.TrackName>
                <S.NowPlayingLabel>{t('archive.nowPlaying')}</S.NowPlayingLabel>
              </S.NowPlayingInfo>
            </S.NowPlaying>
            <S.CoverCaption>{captions[1]}</S.CoverCaption>
          </S.CoverBlock>

          <S.Caption>{captions[0]}</S.Caption>
        </S.Showcase>

        <S.Content>
          <Eyebrow>{t('archive.eyebrow')}</Eyebrow>
          <S.Title>{t('archive.title')}</S.Title>
          <S.Description>{t('archive.description')}</S.Description>

          <S.Rows>
            {SERVICE_ROWS.map((row) => (
              <S.Row key={row.key} to={row.to}>
                <S.RowName>{t(`archive.rows.${row.key}.name`)}</S.RowName>
                <S.RowPrice>{rowPrice(row)}</S.RowPrice>
              </S.Row>
            ))}
          </S.Rows>

          <S.Cta to="/products">
            {t('archive.cta')} <span aria-hidden="true">→</span>
          </S.Cta>
        </S.Content>

        <S.SpecSheet>
          <Eyebrow dot>{t('archive.specTitle')}</Eyebrow>
          <S.SpecGrid>
            {specs.map((spec, index) => (
              <S.SpecItem key={spec.title}>
                <S.SpecHead>
                  <S.SpecNumber>{String(index + 1).padStart(2, '0')}</S.SpecNumber>
                  <S.SpecName>{spec.title}</S.SpecName>
                </S.SpecHead>
                <S.SpecDescription>{spec.description}</S.SpecDescription>
              </S.SpecItem>
            ))}
          </S.SpecGrid>
        </S.SpecSheet>
      </S.Grid>
    </S.Container>
  );
}
