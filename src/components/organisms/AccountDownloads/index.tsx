import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/atoms/Spinner';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { fetchMyEntitlements, type Entitlement } from '@/lib/entitlementsApi';
import { fetchFileBreakdown, fetchProductCoverImages } from '@/lib/catalogApi';
import { downloadOrShare } from '@/lib/downloadApi';
import { formatDate } from '@/lib/format';
import * as S from './styles';

interface DownloadEntry extends Entitlement {
  mobileCount: number;
  desktopCount: number;
  coverImage?: string;
}

export function AccountDownloads() {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<DownloadEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set());
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchMyEntitlements()
      .then(async (entitlements) => {
        const covers = await fetchProductCoverImages(entitlements.map((entitlement) => entitlement.product_id));
        const withBreakdown = await Promise.all(
          entitlements.map(async (entitlement): Promise<DownloadEntry> => {
            const breakdown = await fetchFileBreakdown(entitlement.product_id);
            const mobileCount = breakdown.find((row) => row.device_variant === 'mobile')?.file_count ?? 0;
            const desktopCount = breakdown.find((row) => row.device_variant === 'desktop')?.file_count ?? 0;
            return { ...entitlement, mobileCount, desktopCount, coverImage: covers.get(entitlement.product_id) };
          }),
        );
        if (!cancelled) setEntries(withBreakdown);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalFiles = entries.reduce((sum, entry) => sum + entry.mobileCount + entry.desktopCount, 0);

  const download = async (entry: DownloadEntry) => {
    setDownloadingId(entry.entitlement_id);
    const ok = await downloadOrShare([entry.product_id]);
    setDownloadingId(null);
    if (ok) setDownloaded((prev) => new Set(prev).add(entry.entitlement_id));
  };

  const downloadAll = async () => {
    setDownloadingAll(true);
    const ok = await downloadOrShare(entries.map((entry) => entry.product_id));
    setDownloadingAll(false);
    if (ok) setDownloaded(new Set(entries.map((entry) => entry.entitlement_id)));
  };

  return (
    <div>
      <S.Header>
        <S.Title>{t('account.downloads.title')}</S.Title>
        <S.NeverExpire>{t('account.downloads.neverExpire')}</S.NeverExpire>
      </S.Header>

      {!loading && entries.length === 0 ? (
        <S.List>{t('account.downloads.empty')}</S.List>
      ) : (
        <>
          <S.List>
            {entries.map((entry) => (
              <DownloadRow
                key={entry.entitlement_id}
                sku={entry.sku}
                name={entry.name}
                kind={t('account.downloads.kind')}
                spec={t('account.downloads.breakdown', { mobile: entry.mobileCount, desktop: entry.desktopCount })}
                meta={formatDate(entry.granted_at, i18n.language)}
                downloaded={downloaded.has(entry.entitlement_id)}
                downloading={downloadingId === entry.entitlement_id}
                onDownload={() => download(entry)}
                coverImage={entry.coverImage}
              />
            ))}
          </S.List>

          <S.Footer>
            <S.DownloadAllButton type="button" onClick={downloadAll} disabled={downloadingAll}>
              {downloadingAll && <Spinner size={11} />}
              {downloadingAll ? t('account.downloads.preparing') : t('account.downloads.downloadAll')}
            </S.DownloadAllButton>
            <S.ZipInfo>{t('account.downloads.filesCount', { count: totalFiles })}</S.ZipInfo>
          </S.Footer>
        </>
      )}
    </div>
  );
}
