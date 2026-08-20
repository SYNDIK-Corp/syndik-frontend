import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Icon } from '@/components/atoms/Icon';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { SpecList } from '@/components/molecules/SpecList';
import { requestDownload, triggerFileDownloads, isDownloadError, type GuestDownloadProof } from '@/lib/downloadApi';
import { formatDateTime } from '@/lib/format';
import * as S from './styles';

export interface OrderFile {
  sku: string;
  productId: number;
  name: string;
  kind: string;
  spec: string;
  fileCount: number;
}

export interface OrderConfirmationDetailsProps {
  paidAt: string;
  memberEmail: string;
  files: OrderFile[];
  /* presente só no fluxo guest (sem sessão) — repassado pro
     request-download como prova de posse do pedido. */
  guestProof?: GuestDownloadProof;
}

export function OrderConfirmationDetails({ paidAt, memberEmail, files, guestProof }: OrderConfirmationDetailsProps) {
  const { t, i18n } = useTranslation();
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());
  const [allDownloaded, setAllDownloaded] = useState(false);
  const [pin, setPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  const totalFiles = files.reduce((sum, file) => sum + file.fileCount, 0);
  const installSteps = t('orderConfirmation.install.steps', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const downloadFile = async (file: OrderFile) => {
    const result = await requestDownload(file.productId, guestProof);
    if (isDownloadError(result)) return;
    triggerFileDownloads(result.files);
    setDownloaded((prev) => new Set(prev).add(file.sku));
  };

  const downloadAll = async () => {
    await Promise.all(files.map((file) => downloadFile(file)));
    setAllDownloaded(true);
  };

  const handleSavePin = () => {
    if (pin.replace(/\D/g, '').length === 4) setPinSaved(true);
  };

  return (
    <S.Container>
      <Eyebrow dot>{t('orderConfirmation.paymentCleared', { datetime: formatDateTime(paidAt, i18n.language) })}</Eyebrow>
      <S.Title>{t('orderConfirmation.title')}</S.Title>
      <S.Description>
        <Trans
          i18nKey="orderConfirmation.description"
          values={{ email: memberEmail }}
          components={[<S.EmailHighlight key="0" />]}
        />
      </S.Description>

      <S.DownloadActions>
        <S.DownloadAllButton type="button" onClick={downloadAll}>
          <Icon name="download" size={16} />
          <span>
            {allDownloaded ? t('orderConfirmation.downloadedLabel') : t('orderConfirmation.downloadEverything')}
          </span>
        </S.DownloadAllButton>
        <S.ZipNote>{t('orderConfirmation.filesCount', { count: totalFiles })}</S.ZipNote>
      </S.DownloadActions>

      <S.FilesSection>
        <S.FilesHeader>
          <S.FilesTitle>{t('orderConfirmation.files.title')}</S.FilesTitle>
          <S.FilesNeverExpire>{t('orderConfirmation.files.neverExpire')}</S.FilesNeverExpire>
        </S.FilesHeader>
        <div>
          {files.map((file) => (
            <DownloadRow
              key={file.sku}
              sku={file.sku}
              name={file.name}
              kind={file.kind}
              spec={file.spec}
              meta={
                downloaded.has(file.sku)
                  ? t('orderConfirmation.files.downloaded')
                  : t('orderConfirmation.files.ready')
              }
              downloaded={downloaded.has(file.sku)}
              onDownload={() => downloadFile(file)}
            />
          ))}
        </div>
      </S.FilesSection>

      <S.PinBox>
        <S.PinText>
          <S.PinLabel>{t('orderConfirmation.setPin.label')}</S.PinLabel>
          <S.PinBody>{t('orderConfirmation.setPin.body')}</S.PinBody>
        </S.PinText>
        <S.PinRow>
          <S.PinInput
            maxLength={4}
            inputMode="numeric"
            placeholder={t('orderConfirmation.setPin.placeholder')}
            value={pin}
            onChange={(event) => {
              setPin(event.target.value);
              setPinSaved(false);
            }}
          />
          <S.PinSaveButton type="button" onClick={handleSavePin}>
            {pinSaved ? t('orderConfirmation.setPin.saved') : t('orderConfirmation.setPin.save')}
          </S.PinSaveButton>
        </S.PinRow>
      </S.PinBox>

      <S.InstallSection>
        <S.InstallLabel>{t('orderConfirmation.install.title')}</S.InstallLabel>
        <SpecList items={installSteps} />
      </S.InstallSection>
    </S.Container>
  );
}
