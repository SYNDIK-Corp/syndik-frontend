import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/atoms/Spinner';
import * as S from './styles';

export interface DownloadRowProps {
  sku: string;
  name: string;
  kind: string;
  spec: string;
  /* pequeno rótulo antes do botão: data da compra, status "pronto", etc. */
  meta: string;
  downloaded: boolean;
  downloading?: boolean;
  onDownload: () => void;
  /* sem imagem, cai no fallback de sempre (caixa preta com o SKU) */
  coverImage?: string;
}

export function DownloadRow({ sku, name, kind, spec, meta, downloaded, downloading, onDownload, coverImage }: DownloadRowProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Thumb>{coverImage ? <S.ThumbImage src={coverImage} alt="" /> : sku}</S.Thumb>

      <S.Info>
        <S.Kind>
          {sku} / {kind}
        </S.Kind>
        <S.Name>{name}</S.Name>
        <S.Spec>{spec}</S.Spec>
      </S.Info>

      <S.Actions>
        <S.Meta>{meta}</S.Meta>
        <S.DownloadButton type="button" onClick={onDownload} disabled={downloading}>
          {downloading && <Spinner size={11} />}
          {downloading
            ? t('account.downloads.preparing')
            : downloaded
              ? t('account.downloads.downloadAgain')
              : t('account.downloads.download')}
        </S.DownloadButton>
      </S.Actions>
    </S.Container>
  );
}
