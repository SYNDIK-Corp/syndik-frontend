import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { TextField } from '@/components/atoms/TextField';
import * as S from './styles';

export interface AccountGateProps {
  onSignIn: () => void;
}

export function AccountGate({ onSignIn }: AccountGateProps) {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [retry, setRetry] = useState(false);

  const handleEnter = () => {
    const digits = pin.replace(/\D/g, '');
    if (digits.length === 4) {
      onSignIn();
    } else {
      setRetry(true);
    }
  };

  return (
    <S.Container>
      <div>
        <Eyebrow>{t('account.eyebrow')}</Eyebrow>
        <S.Title>{t('account.gate.title')}</S.Title>
        <S.Description>{t('account.gate.description')}</S.Description>
      </div>

      <S.FormColumn>
        <S.PinRow>
          <S.PinInput
            maxLength={4}
            inputMode="numeric"
            placeholder={t('account.gate.pinPlaceholder')}
            value={pin}
            onChange={(event) => setPin(event.target.value)}
          />
          <S.EnterButton type="button" onClick={handleEnter}>
            {t('account.gate.enter')}
          </S.EnterButton>
        </S.PinRow>
        <S.PinHint>{retry ? t('account.gate.pinHintRetry') : t('account.gate.pinHintDefault')}</S.PinHint>

        <S.LostPinBox>
          <S.LostPinLabel>{t('account.gate.lostPin')}</S.LostPinLabel>
          <S.LostPinDescription>{t('account.gate.lostPinDescription')}</S.LostPinDescription>
          <TextField type="email" placeholder={t('account.gate.emailPlaceholder')} />
          <S.SendLinkButton type="button">{t('account.gate.sendLink')}</S.SendLinkButton>
        </S.LostPinBox>
      </S.FormColumn>
    </S.Container>
  );
}
