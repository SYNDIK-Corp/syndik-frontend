import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface DownloadRowProps {
  sku: string;
  name: string;
  kind: string;
  spec: string;
  /* pequeno rótulo antes do botão: data da compra, status "pronto", etc. */
  meta: string;
  downloaded: boolean;
  onDownload: () => void;
}

export function DownloadRow({ sku, name, kind, spec, meta, downloaded, onDownload }: DownloadRowProps) {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Thumb>{sku}</S.Thumb>

      <S.Info>
        <S.Kind>
          {sku} / {kind}
        </S.Kind>
        <S.Name>{name}</S.Name>
        <S.Spec>{spec}</S.Spec>
      </S.Info>

      <S.Actions>
        <S.Meta>{meta}</S.Meta>
        <S.DownloadButton type="button" onClick={onDownload}>
          {downloaded ? t('account.downloads.downloadAgain') : t('account.downloads.download')}
        </S.DownloadButton>
      </S.Actions>
    </S.Container>
  );
}
