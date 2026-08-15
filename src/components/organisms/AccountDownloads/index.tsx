import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { getCatalogEntry } from '@/data/productDetails';
import { accountDownloads } from '@/data/accountDownloads';
import { formatDate, formatFileSize } from '@/lib/format';
import * as S from './styles';

export function AccountDownloads() {
  const { t, i18n } = useTranslation();
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const totalMb = accountDownloads.reduce((sum, download) => sum + download.fileSizeMb, 0);

  const markDownloaded = (id: string) => setDownloaded((prev) => new Set(prev).add(id));
  const downloadAll = () => setDownloaded(new Set(accountDownloads.map((download) => download.id)));

  return (
    <div>
      <S.Header>
        <S.Title>{t('account.downloads.title')}</S.Title>
        <S.NeverExpire>{t('account.downloads.neverExpire')}</S.NeverExpire>
      </S.Header>

      <S.List>
        {accountDownloads.map((download) => {
          const entry = getCatalogEntry(download.id);
          if (!entry) return null;

          return (
            <DownloadRow
              key={download.id}
              sku={entry.item.sku}
              name={entry.item.name}
              kind={t(`account.downloads.items.${download.id}.kind`)}
              spec={`${t(`account.downloads.items.${download.id}.specNote`)} · ${formatFileSize(download.fileSizeMb)}`}
              meta={formatDate(download.boughtDate, i18n.language)}
              downloaded={downloaded.has(download.id)}
              onDownload={() => markDownloaded(download.id)}
            />
          );
        })}
      </S.List>

      <S.Footer>
        <S.DownloadAllButton type="button" onClick={downloadAll}>
          {t('account.downloads.downloadAll')}
        </S.DownloadAllButton>
        <S.ZipInfo>{t('account.downloads.zipInfo', { size: formatFileSize(totalMb) })}</S.ZipInfo>
      </S.Footer>
    </div>
  );
}
