import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/atoms/TextField';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { submitContact, type ContactErrorCode } from '@/lib/contactApi';
import * as S from './styles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOCIAL_PLATFORMS = ['instagram', 'tiktok', 'twitter', 'other'] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [errorCode, setErrorCode] = useState<ContactErrorCode | null>(null);

  const canSubmit =
    name.trim() !== '' && EMAIL_RE.test(email) && subject.trim() !== '' && message.trim() !== '' && status !== 'submitting';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus('submitting');
    setErrorCode(null);

    const result = await submitContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      socialPlatform: socialPlatform || undefined,
      socialHandle: socialHandle.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
    });

    if (result) {
      setStatus('error');
      setErrorCode(result);
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setPhone('');
    setSocialPlatform('');
    setSocialHandle('');
    setSubject('');
    setMessage('');
  };

  return (
    <S.Container>
      <S.Title>{t('contact.title')}</S.Title>
      <S.Description>{t('contact.description')}</S.Description>

      <S.Form onSubmit={handleSubmit}>
        <S.Row>
          <S.Field>
            <S.FieldLabel htmlFor="contact-name">{t('contact.form.name')}</S.FieldLabel>
            <TextField
              id="contact-name"
              placeholder={t('contact.form.namePlaceholder')}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </S.Field>
          <S.Field>
            <S.FieldLabel htmlFor="contact-email">{t('contact.form.email')}</S.FieldLabel>
            <TextField
              id="contact-email"
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </S.Field>
        </S.Row>

        <S.Row>
          <S.Field>
            <S.FieldLabel htmlFor="contact-phone">{t('contact.form.phone')}</S.FieldLabel>
            <TextField
              id="contact-phone"
              type="tel"
              placeholder={t('contact.form.phonePlaceholder')}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </S.Field>
          <S.Field>
            <S.FieldLabel htmlFor="contact-social-platform">{t('contact.form.social')}</S.FieldLabel>
            <S.SocialRow>
              <Select
                id="contact-social-platform"
                value={socialPlatform}
                onChange={(event) => setSocialPlatform(event.target.value)}
              >
                <option value="">{t('contact.form.socialOptions.none')}</option>
                {SOCIAL_PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {t(`contact.form.socialOptions.${platform}`)}
                  </option>
                ))}
              </Select>
              <TextField
                placeholder={t('contact.form.socialHandlePlaceholder')}
                value={socialHandle}
                onChange={(event) => setSocialHandle(event.target.value)}
                disabled={!socialPlatform}
              />
            </S.SocialRow>
          </S.Field>
        </S.Row>

        <S.Field>
          <S.FieldLabel htmlFor="contact-subject">{t('contact.form.subject')}</S.FieldLabel>
          <TextField
            id="contact-subject"
            placeholder={t('contact.form.subjectPlaceholder')}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </S.Field>

        <S.Field>
          <S.FieldLabel htmlFor="contact-message">{t('contact.form.comment')}</S.FieldLabel>
          <Textarea
            id="contact-message"
            placeholder={t('contact.form.commentPlaceholder')}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </S.Field>

        <S.SubmitButton type="submit" disabled={!canSubmit}>
          {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
        </S.SubmitButton>

        {status === 'success' && <S.StatusMessage>{t('contact.form.success')}</S.StatusMessage>}
        {status === 'error' && (
          <S.StatusMessage $error>
            {t(`contact.form.errors.${errorCode}`, { defaultValue: t('contact.form.errors.unexpected') })}
          </S.StatusMessage>
        )}
      </S.Form>
    </S.Container>
  );
}
