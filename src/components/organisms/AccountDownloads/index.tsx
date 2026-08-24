import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownloadMenu } from '@/components/molecules/DownloadMenu';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { ImagePickerModal } from '@/components/organisms/ImagePickerModal';
import { fetchMyEntitlements, type Entitlement } from '@/lib/entitlementsApi';
import { fetchFileBreakdown, fetchProductCoverImages } from '@/lib/catalogApi';
import { downloadOrShare, type DeviceVariant } from '@/lib/downloadApi';
import { formatDate } from '@/lib/format';
import * as S from './styles';

interface DownloadGroup {
  productId: number;
  sku: string;
  name: string;
  mobileCount: number;
  desktopCount: number;
  coverImage?: string;
  purchaseCount: number;
  firstPurchasedAt: string;
  lastPurchasedAt: string;
}

/* mesmo Drop comprado mais de uma vez vira várias entitlements (uma por
   pedido) — agrupa por product_id em vez de repetir a mesma linha uma vez
   por compra. */
function groupByProduct(entitlements: Entitlement[]): DownloadGroup[] {
  const byProduct = new Map<number, Entitlement[]>();
  for (const entitlement of entitlements) {
    const existing = byProduct.get(entitlement.product_id);
    if (existing) existing.push(entitlement);
    else byProduct.set(entitlement.product_id, [entitlement]);
  }

  return Array.from(byProduct.values()).map((group) => {
    const sorted = [...group].sort((a, b) => a.granted_at.localeCompare(b.granted_at));
    const latest = sorted[sorted.length - 1];
    return {
      productId: latest.product_id,
      sku: latest.sku,
      name: latest.name,
      mobileCount: 0,
      desktopCount: 0,
      purchaseCount: sorted.length,
      firstPurchasedAt: sorted[0].granted_at,
      lastPurchasedAt: latest.granted_at,
    };
  });
}

export function AccountDownloads() {
  const { t, i18n } = useTranslation();
  const [groups, setGroups] = useState<DownloadGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [pickerGroup, setPickerGroup] = useState<DownloadGroup | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMyEntitlements()
      .then(async (entitlements) => {
        const grouped = groupByProduct(entitlements);
        const covers = await fetchProductCoverImages(grouped.map((group) => group.productId));
        const withBreakdown = await Promise.all(
          grouped.map(async (group): Promise<DownloadGroup> => {
            const breakdown = await fetchFileBreakdown(group.productId);
            const mobileCount = breakdown.find((row) => row.device_variant === 'mobile')?.file_count ?? 0;
            const desktopCount = breakdown.find((row) => row.device_variant === 'desktop')?.file_count ?? 0;
            return { ...group, mobileCount, desktopCount, coverImage: covers.get(group.productId) };
          }),
        );
        if (!cancelled) setGroups(withBreakdown);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalFiles = groups.reduce((sum, group) => sum + group.mobileCount + group.desktopCount, 0);

  const download = async (group: DownloadGroup, deviceVariant?: DeviceVariant) => {
    setDownloadingId(group.productId);
    await downloadOrShare([group.productId], { deviceVariant });
    setDownloadingId(null);
  };

  const downloadAll = async (deviceVariant?: DeviceVariant) => {
    setDownloadingAll(true);
    await downloadOrShare(
      groups.map((group) => group.productId),
      { deviceVariant },
    );
    setDownloadingAll(false);
  };

  return (
    <div>
      <S.Header>
        <S.Title>{t('account.downloads.title')}</S.Title>
        <S.NeverExpire>{t('account.downloads.neverExpire')}</S.NeverExpire>
      </S.Header>

      {!loading && groups.length === 0 ? (
        <S.List>{t('account.downloads.empty')}</S.List>
      ) : (
        <>
          <S.List>
            {groups.map((group) => (
              <DownloadRow
                key={group.productId}
                sku={group.sku}
                name={group.name}
                kind={t('account.downloads.kind')}
                spec={t('account.downloads.breakdown', { mobile: group.mobileCount, desktop: group.desktopCount })}
                meta={
                  group.purchaseCount > 1
                    ? t('account.downloads.boughtTwice', {
                        first: formatDate(group.firstPurchasedAt, i18n.language),
                        last: formatDate(group.lastPurchasedAt, i18n.language),
                      })
                    : formatDate(group.lastPurchasedAt, i18n.language)
                }
                downloading={downloadingId === group.productId}
                onDownloadAll={(deviceVariant) => download(group, deviceVariant)}
                onPickImage={() => setPickerGroup(group)}
                coverImage={group.coverImage}
                purchaseCount={group.purchaseCount}
              />
            ))}
          </S.List>

          <S.Footer>
            <DownloadMenu primary downloading={downloadingAll} onDownloadAll={downloadAll} />
            <S.ZipInfo>{t('account.downloads.filesCount', { count: totalFiles })}</S.ZipInfo>
          </S.Footer>
        </>
      )}

      {pickerGroup && (
        <ImagePickerModal
          productId={pickerGroup.productId}
          productName={pickerGroup.name}
          onClose={() => setPickerGroup(null)}
        />
      )}
    </div>
  );
}
