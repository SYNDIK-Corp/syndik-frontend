import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import type { DeviceVariant } from '@/lib/downloadApi';
import * as S from './styles';

export interface DownloadMenuProps {
  /* botão maior/preto (topo da tela, "baixar tudo") vs botão pequeno
     (linha de um Drop só) */
  primary?: boolean;
  downloading: boolean;
  onDownloadAll: (deviceVariant?: DeviceVariant) => void;
  /* ausente = não mostra a opção (ex.: no botão "Download Everything", não
     faz sentido escolher 1 imagem sem saber de qual Drop) */
  onPickImage?: () => void;
}

/** dropdown plano (sem submenu aninhado — pior no toque em mobile) com as
 * opções de baixar tudo / só mobile / só desktop / escolher 1 imagem. */
export function DownloadMenu({ primary, downloading, onDownloadAll, onPickImage }: DownloadMenuProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const choose = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <S.Container ref={containerRef}>
      <S.Trigger type="button" $primary={primary} disabled={downloading} onClick={() => setOpen((value) => !value)}>
        {downloading && <Spinner size={primary ? 14 : 11} />}
        <span>{downloading ? t('downloadMenu.preparing') : t('downloadMenu.trigger')}</span>
        {!downloading && <Icon name="chevron-down" size={10} />}
      </S.Trigger>

      {open && (
        <S.Panel>
          <S.Option type="button" onClick={() => choose(() => onDownloadAll())}>
            {t('downloadMenu.all')}
          </S.Option>
          <S.Option type="button" onClick={() => choose(() => onDownloadAll('mobile'))}>
            {t('downloadMenu.mobileOnly')}
          </S.Option>
          <S.Option type="button" onClick={() => choose(() => onDownloadAll('desktop'))}>
            {t('downloadMenu.desktopOnly')}
          </S.Option>
          {onPickImage && (
            <>
              <S.Divider />
              <S.Option type="button" onClick={() => choose(onPickImage)}>
                {t('downloadMenu.pickImage')}
              </S.Option>
            </>
          )}
        </S.Panel>
      )}
    </S.Container>
  );
}
