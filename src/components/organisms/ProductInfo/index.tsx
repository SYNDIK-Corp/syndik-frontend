import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Icon } from '@/components/atoms/Icon';
import { AccordionItem } from '@/components/molecules/AccordionItem';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import * as S from './styles';

export interface ProductInfoProps {
  sku: string;
  collectionLabel: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  onSale?: boolean;
  description: string;
  fileInfo: string;
  includedRows: { label: string; value: string }[];
  faq: { question: string; answer: string }[];
}

export function ProductInfo({
  sku,
  collectionLabel,
  name,
  price,
  compareAtPrice,
  onSale,
  description,
  fileInfo,
  includedRows,
  faq,
}: ProductInfoProps) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <S.Container>
      <Eyebrow dot>{collectionLabel}</Eyebrow>
      <S.Title>{name}</S.Title>

      <S.PriceRow>
        <S.Price>{formatPrice(price, i18n.language)}</S.Price>
        {compareAtPrice && <S.ComparePrice>{formatPrice(compareAtPrice, i18n.language)}</S.ComparePrice>}
        {onSale && <S.SaleTag>{t('product.sale')}</S.SaleTag>}
      </S.PriceRow>

      <S.Description>{description}</S.Description>

      {includedRows.length > 0 && (
        <S.IncludedList>
          <S.IncludedHeader>
            <span>{t('productDetail.whatsIncluded')}</span>
            <span>{fileInfo}</span>
          </S.IncludedHeader>
          {includedRows.map((row) => (
            <S.IncludedRow key={row.label}>
              <S.IncludedLabel>{row.label}</S.IncludedLabel>
              <S.IncludedValue>{row.value}</S.IncludedValue>
            </S.IncludedRow>
          ))}
        </S.IncludedList>
      )}

      <S.AddToCartButton
        type="button"
        onClick={() =>
          addItem({ sku, name, price, compareAtPrice, description: includedRows[0]?.label })
        }
      >
        <Icon name="bag" size={16} />
        <span>{t('productDetail.addToCart', { price: formatPrice(price, i18n.language) })}</span>
      </S.AddToCartButton>

      <S.Perks>
        <span>{t('productDetail.perks.instant')}</span>
        <span>{t('productDetail.perks.noWatermark')}</span>
        <span>{t('productDetail.perks.neverResold')}</span>
      </S.Perks>

      <S.ExclusivityBox>
        <S.ExclusivityText>
          <S.ExclusivityLabel>{t('productDetail.exclusivity.label')}</S.ExclusivityLabel>
          <S.ExclusivityBody>{t('productDetail.exclusivity.body')}</S.ExclusivityBody>
        </S.ExclusivityText>
        <S.ExclusivityCta to="/contact">
          {t('productDetail.exclusivity.cta')} <span aria-hidden="true">→</span>
        </S.ExclusivityCta>
      </S.ExclusivityBox>

      {faq.length > 0 && (
        <S.FaqList>
          {faq.map((item, index) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              open={openFaqIndex === index}
              onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </S.FaqList>
      )}
    </S.Container>
  );
}
