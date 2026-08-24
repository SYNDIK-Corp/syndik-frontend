import { DownloadMenu } from '@/components/molecules/DownloadMenu';
import type { DeviceVariant } from '@/lib/downloadApi';
import * as S from './styles';

export interface DownloadRowProps {
  sku: string;
  name: string;
  kind: string;
  spec: string;
  /* pequeno rótulo antes do botão: data da compra, status "pronto", etc. */
  meta: string;
  downloading?: boolean;
  onDownloadAll: (deviceVariant?: DeviceVariant) => void;
  onPickImage: () => void;
  /* sem imagem, cai no fallback de sempre (caixa preta com o SKU) */
  coverImage?: string;
}

export function DownloadRow({ sku, name, kind, spec, meta, downloading, onDownloadAll, onPickImage, coverImage }: DownloadRowProps) {
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
        <DownloadMenu downloading={Boolean(downloading)} onDownloadAll={onDownloadAll} onPickImage={onPickImage} />
      </S.Actions>
    </S.Container>
  );
}
