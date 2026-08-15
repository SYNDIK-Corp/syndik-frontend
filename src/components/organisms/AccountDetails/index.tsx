import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/atoms/TextField';
import * as S from './styles';

export interface AccountDetailsProps {
  email: string;
}

export function AccountDetails({ email }: AccountDetailsProps) {
  const { t } = useTranslation();
  const [newPin, setNewPin] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSavePin = () => {
    if (newPin.replace(/\D/g, '').length === 4) {
      setSaved(true);
      setNewPin('');
    }
  };

  return (
    <S.Container>
      <S.Title>{t('account.details.title')}</S.Title>

      <S.Fields>
        <S.Field>
          <S.FieldLabel>{t('account.details.email')}</S.FieldLabel>
          <TextField type="email" defaultValue={email} />
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
                setSaved(false);
              }}
            />
            <S.SaveButton type="button" onClick={handleSavePin}>
              {saved ? t('account.details.saved') : t('account.details.save')}
            </S.SaveButton>
          </S.PinRow>
        </S.Field>

        <S.CheckboxLabel>
          <S.Checkbox type="checkbox" defaultChecked />
          <S.CheckboxText>{t('account.details.newsletter')}</S.CheckboxText>
        </S.CheckboxLabel>

        <S.DangerZone>
          <S.DangerLabel>{t('account.details.dangerZone')}</S.DangerLabel>
          <S.DangerBody>{t('account.details.dangerZoneBody')}</S.DangerBody>
          <S.DeleteButton type="button">{t('account.details.deleteAccount')}</S.DeleteButton>
        </S.DangerZone>
      </S.Fields>
    </S.Container>
  );
}
