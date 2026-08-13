import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { CtaLink } from '@/components/atoms/CtaLink';
import { AccordionItem } from '@/components/molecules/AccordionItem';
import * as S from './styles';

export function FaqSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = t('faq.items', { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  return (
    <S.Container id="faq">
      <S.Grid>
        <div>
          <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
          <S.Title>{t('faq.title')}</S.Title>
          <S.Description>{t('faq.description')}</S.Description>
          <S.Note>{t('faq.note')}</S.Note>
          <S.CtaWrapper>
            <CtaLink to="/contact">{t('faq.cta')}</CtaLink>
          </S.CtaWrapper>
        </div>

        <S.List>
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </S.List>
      </S.Grid>
    </S.Container>
  );
}
