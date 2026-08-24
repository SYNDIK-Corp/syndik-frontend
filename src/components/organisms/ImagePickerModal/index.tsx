import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { fetchGalleryImages } from '@/lib/catalogApi';
import { downloadSingleImage, type GuestDownloadProof } from '@/lib/downloadApi';
import * as S from './styles';

export interface ImagePickerModalProps {
  productId: number;
  productName: string;
  guestProof?: GuestDownloadProof;
  onClose: () => void;
}

/** grade com as miniaturas reais do Drop (galeria pública, mesma numeração
 * dos arquivos de entrega — 01.jpg da galeria = 01.jpg do mobile/desktop)
 * pra baixar 1 imagem específica em vez do Drop inteiro. */
export function ImagePickerModal({ productId, productName, guestProof, onClose }: ImagePickerModalProps) {
  const { t } = useTranslation();
  const [images, setImages] = useState<string[] | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryImages(productId).then((result) => {
      if (!cancelled) setImages(result);
    });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const handleDownload = async (index: number, variant: 'mobile' | 'desktop') => {
    const key = `${index}-${variant}`;
    setDownloadingKey(key);
    await downloadSingleImage(productId, index, variant, guestProof);
    setDownloadingKey(null);
  };

  return (
    <S.Backdrop onClick={onClose}>
      <S.Card onClick={(event) => event.stopPropagation()}>
        <S.Header>
          <S.Title>{t('imagePicker.title', { name: productName })}</S.Title>
          <S.CloseButton type="button" aria-label={t('imagePicker.close')} onClick={onClose}>
            <Icon name="close" size={16} />
          </S.CloseButton>
        </S.Header>

        {images === null ? (
          <S.EmptyMessage>{t('imagePicker.loading')}</S.EmptyMessage>
        ) : images.length === 0 ? (
          <S.EmptyMessage>{t('imagePicker.empty')}</S.EmptyMessage>
        ) : (
          <S.Grid>
            {images.map((image, arrayIndex) => {
              const index = arrayIndex + 1;
              const mobileKey = `${index}-mobile`;
              const desktopKey = `${index}-desktop`;
              return (
                <S.Cell key={index}>
                  <S.Thumb>
                    <S.ThumbImage src={image} alt="" />
                  </S.Thumb>
                  <S.CellActions>
                    <S.CellButton
                      type="button"
                      disabled={downloadingKey === mobileKey}
                      onClick={() => handleDownload(index, 'mobile')}
                    >
                      {downloadingKey === mobileKey ? <Spinner size={10} /> : t('imagePicker.mobile')}
                    </S.CellButton>
                    <S.CellButton
                      type="button"
                      disabled={downloadingKey === desktopKey}
                      onClick={() => handleDownload(index, 'desktop')}
                    >
                      {downloadingKey === desktopKey ? <Spinner size={10} /> : t('imagePicker.desktop')}
                    </S.CellButton>
                  </S.CellActions>
                </S.Cell>
              );
            })}
          </S.Grid>
        )}
      </S.Card>
    </S.Backdrop>
  );
}
