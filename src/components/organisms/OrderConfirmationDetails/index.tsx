import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { DownloadMenu } from '@/components/molecules/DownloadMenu';
import { DownloadRow } from '@/components/molecules/DownloadRow';
import { ImagePickerModal } from '@/components/organisms/ImagePickerModal';
import { SpecList } from '@/components/molecules/SpecList';
import { downloadOrShare, type DeviceVariant, type GuestDownloadProof } from '@/lib/downloadApi';
import { setPin as submitPin } from '@/lib/pinApi';
import { formatDateTime } from '@/lib/format';
import * as S from './styles';

export interface OrderFile {
  sku: string;
  productId: number;
  name: string;
  kind: string;
  spec: string;
  fileCount: number;
  coverImage?: string;
}

export interface OrderConfirmationDetailsProps {
  orderId: number;
  paidAt: string;
  memberEmail: string;
  files: OrderFile[];
  /* presente só no fluxo guest (sem sessão) — repassado pro
     request-download como prova de posse do pedido. */
  guestProof?: GuestDownloadProof;
  /* recibo antigo aberto pela Conta > Orders — "Set your PIN" só faz
     sentido no momento da compra, não toda vez que a pessoa revisita um
     pedido já pago há tempos. */
  hidePinBox?: boolean;
}

export function OrderConfirmationDetails({
  orderId,
  paidAt,
  memberEmail,
  files,
  guestProof,
  hidePinBox,
}: OrderConfirmationDetailsProps) {
  const { t, i18n } = useTranslation();
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());
  const [downloadingSku, setDownloadingSku] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [pickerProduct, setPickerProduct] = useState<OrderFile | null>(null);
  const [pin, setPin] = useState('');
  const [pinStatus, setPinStatus] = useState<'idle' | 'saving' | 'saved' | 'invalid' | 'already_set' | 'error'>('idle');

  const totalFiles = files.reduce((sum, file) => sum + file.fileCount, 0);
  const installSteps = t('orderConfirmation.install.steps', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const downloadFile = async (file: OrderFile, deviceVariant?: DeviceVariant) => {
    setDownloadingSku(file.sku);
    const ok = await downloadOrShare([file.productId], { guestProof, orderId, deviceVariant });
    setDownloadingSku(null);
    if (ok) setDownloaded((prev) => new Set(prev).add(file.sku));
  };

  const downloadAll = async (deviceVariant?: DeviceVariant) => {
    setDownloadingAll(true);
    const ok = await downloadOrShare(
      files.map((file) => file.productId),
      { guestProof, orderId, deviceVariant },
    );
    setDownloadingAll(false);
    if (ok) setDownloaded(new Set(files.map((file) => file.sku)));
  };

  const handleSavePin = async () => {
    const digits = pin.replace(/\D/g, '');
    if (digits.length !== 4) {
      setPinStatus('invalid');
      return;
    }
    setPinStatus('saving');
    const error = await submitPin(digits, guestProof);
    if (!error) {
      setPinStatus('saved');
      return;
    }
    setPinStatus(error.code === 'invalid_input' ? 'invalid' : error.code === 'already_set' ? 'already_set' : 'error');
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
        <DownloadMenu primary downloading={downloadingAll} onDownloadAll={downloadAll} />
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
              downloading={downloadingSku === file.sku}
              onDownloadAll={(deviceVariant) => downloadFile(file, deviceVariant)}
              onPickImage={() => setPickerProduct(file)}
              coverImage={file.coverImage}
            />
          ))}
        </div>
      </S.FilesSection>

      {!hidePinBox && (
        <S.PinBox>
          <S.PinText>
            <S.PinLabel>{t('orderConfirmation.setPin.label')}</S.PinLabel>
            <S.PinBody>{t('orderConfirmation.setPin.body')}</S.PinBody>
            {pinStatus === 'saved' && (
              <S.PinFeedback $tone="success">
                {t('orderConfirmation.setPin.successTitle')} — {t('orderConfirmation.setPin.successBody')}
              </S.PinFeedback>
            )}
            {pinStatus === 'invalid' && (
              <S.PinFeedback $tone="error">{t('orderConfirmation.setPin.errorInvalid')}</S.PinFeedback>
            )}
            {pinStatus === 'error' && (
              <S.PinFeedback $tone="error">{t('orderConfirmation.setPin.errorGeneric')}</S.PinFeedback>
            )}
            {pinStatus === 'already_set' && (
              <S.PinFeedback $tone="error">
                <Trans
                  i18nKey="orderConfirmation.setPin.errorAlreadySet"
                  components={[<S.PinLoginLink key="0" href="/login" />]}
                />
              </S.PinFeedback>
            )}
          </S.PinText>
          <S.PinRow>
            <S.PinInput
              maxLength={4}
              inputMode="numeric"
              placeholder={t('orderConfirmation.setPin.placeholder')}
              value={pin}
              disabled={pinStatus === 'saved' || pinStatus === 'already_set'}
              onChange={(event) => {
                setPin(event.target.value);
                setPinStatus('idle');
              }}
            />
            <S.PinSaveButton
              type="button"
              onClick={handleSavePin}
              disabled={pinStatus === 'saving' || pinStatus === 'saved' || pinStatus === 'already_set'}
            >
              {pinStatus === 'saving'
                ? t('orderConfirmation.setPin.saving')
                : pinStatus === 'saved'
                  ? t('orderConfirmation.setPin.saved')
                  : t('orderConfirmation.setPin.save')}
            </S.PinSaveButton>
          </S.PinRow>
        </S.PinBox>
      )}

      <S.InstallSection>
        <S.InstallLabel>{t('orderConfirmation.install.title')}</S.InstallLabel>
        <SpecList items={installSteps} />
      </S.InstallSection>

      {pickerProduct && (
        <ImagePickerModal
          productId={pickerProduct.productId}
          productName={pickerProduct.name}
          guestProof={guestProof}
          onClose={() => setPickerProduct(null)}
        />
      )}
    </S.Container>
  );
}
