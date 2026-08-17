import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { getCatalogEntry } from '@/data/productDetails';
import { accountDownloads } from '@/data/accountDownloads';
import { formatDate, formatFileSize } from '@/lib/format';
import * as S from './styles';

interface DownloadEntry {
  id: string;
  sku: string;
  name: string;
}

export function AccountDownloads() {
  const { t, i18n } = useTranslation();
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<DownloadEntry[]>([]);

  const totalMb = accountDownloads.reduce((sum, download) => sum + download.fileSizeMb, 0);

  const markDownloaded = (id: string) => setDownloaded((prev) => new Set(prev).add(id));
  const downloadAll = () => setDownloaded(new Set(accountDownloads.map((download) => download.id)));

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      accountDownloads.map(async (download) => {
        const entry = await getCatalogEntry(download.id);
        return entry ? { id: download.id, sku: entry.item.sku, name: entry.item.name } : null;
      }),
    ).then((results) => {
      if (!cancelled) setEntries(results.filter((entry): entry is DownloadEntry => entry !== null));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <S.Header>
        <S.Title>{t('account.downloads.title')}</S.Title>
        <S.NeverExpire>{t('account.downloads.neverExpire')}</S.NeverExpire>
      </S.Header>

      <S.List>
        {entries.map((entry) => {
          const download = accountDownloads.find((item) => item.id === entry.id);
          if (!download) return null;

          return (
            <DownloadRow
              key={download.id}
              sku={entry.sku}
              name={entry.name}
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
