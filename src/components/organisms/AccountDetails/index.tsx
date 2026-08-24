import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/atoms/TextField';
import { StatusModal, type StatusModalState } from '@/components/molecules/StatusModal';
import { useAuth } from '@/hooks/useAuth';
import type { AuthProfile } from '@/contexts/auth-context';
import * as S from './styles';

export interface AccountDetailsProps {
  profile: AuthProfile;
}

export function AccountDetails({ profile }: AccountDetailsProps) {
  const { t } = useTranslation();
  const { changePin, setNewsletterOptIn } = useAuth();

  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState(false);
  const [modal, setModal] = useState<StatusModalState | null>(null);

  const handleSavePin = async () => {
    const digits = newPin.replace(/\D/g, '');
    if (digits.length !== 4) {
      setError(true);
      return;
    }
    setError(false);
    setModal('loading');
    const result = await changePin(digits);
    if (result) {
      setModal('error');
      return;
    }
    setModal('success');
    setNewPin('');
  };

  return (
    <S.Container>
      <S.Title>{t('account.details.title')}</S.Title>

      <S.Fields>
        <S.Field>
          <S.FieldLabel>{t('account.details.email')}</S.FieldLabel>
          <TextField type="email" value={profile.email} disabled />
        </S.Field>

        <S.Field>
          <S.FieldLabel>{t('account.details.changePin')}</S.FieldLabel>
          <S.PinRow>
            <TextField
              maxLength={4}
              inputMode="numeric"
              placeholder={t('account.details.newPinPlaceholder')}
              value={newPin}
              onChange={(event) => {
                setNewPin(event.target.value);
                setError(false);
              }}
            />
            <S.SaveButton type="button" onClick={handleSavePin} disabled={modal === 'loading'}>
              {t('account.details.save')}
            </S.SaveButton>
          </S.PinRow>
          {error && <S.FieldLabel>{t('account.details.pinError')}</S.FieldLabel>}
        </S.Field>

        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            checked={profile.newsletterOptIn}
            onChange={(event) => setNewsletterOptIn(event.target.checked)}
          />
          <S.CheckboxText>{t('account.details.newsletter')}</S.CheckboxText>
        </S.CheckboxLabel>

        <S.DangerZone>
          <S.DangerLabel>{t('account.details.dangerZone')}</S.DangerLabel>
          <S.DangerBody>{t('account.details.dangerZoneBody')}</S.DangerBody>
          <S.DeleteButton type="button" disabled>
            {t('account.details.deleteAccount')}
          </S.DeleteButton>
        </S.DangerZone>
      </S.Fields>

      {modal && (
        <StatusModal
          status={modal}
          message={
            modal === 'success'
              ? t('account.details.pinSavedMessage')
              : modal === 'error'
                ? t('account.details.pinError')
                : undefined
          }
          closeLabel={t('account.details.close')}
          onClose={() => setModal(null)}
        />
      )}
    </S.Container>
  );
}
