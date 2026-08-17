import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Icon } from '@/components/atoms/Icon';
import { AccordionItem } from '@/components/molecules/AccordionItem';
import { useCart } from '@/hooks/useCart';
import { formatPriceCompact } from '@/lib/format';
import { parseDescription } from '@/lib/productDescription';
import * as S from './styles';

export interface ProductInfoProps {
  sku: string;
  collectionLabel: string;
  name: string;
  subtitle?: string;
  image?: string;
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
  subtitle,
  image,
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
  const [detailsOpen, setDetailsOpen] = useState(false);

  const blocks = parseDescription(description);
  const [lead, ...rest] = blocks;

  return (
    <S.Container>
      <Eyebrow dot>{collectionLabel}</Eyebrow>
      <S.Title>{name}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}

      <S.PriceRow>
        <S.Price>{formatPriceCompact(price, i18n.language)}</S.Price>
        {compareAtPrice && <S.ComparePrice>{formatPriceCompact(compareAtPrice, i18n.language)}</S.ComparePrice>}
        {onSale && <S.SaleTag>{t('product.sale')}</S.SaleTag>}
      </S.PriceRow>

      <S.Description>
        {lead && <p>{lead.body}</p>}

        {rest.length > 0 && (
          <>
            <S.DetailsToggle type="button" onClick={() => setDetailsOpen((open) => !open)} aria-expanded={detailsOpen}>
              <span>{detailsOpen ? t('productDetail.hideDetails') : t('productDetail.showDetails')}</span>
              <S.ToggleIcon $open={detailsOpen}>
                <Icon name="chevron-down" size={11} />
              </S.ToggleIcon>
            </S.DetailsToggle>

            <S.DetailsPanel $open={detailsOpen}>
              <S.DetailsPanelInner>
                {rest.map((block, index) =>
                  block.label ? (
                    <S.MetaLine key={block.label}>
                      <S.MetaLabel>{block.label}</S.MetaLabel>
                      <span>{block.body}</span>
                    </S.MetaLine>
                  ) : (
                    <p key={index}>{block.body}</p>
                  ),
                )}
              </S.DetailsPanelInner>
            </S.DetailsPanel>
          </>
        )}
      </S.Description>

      {includedRows.length > 0 && (
        <S.IncludedBar>
          <S.IncludedTotal>{fileInfo}</S.IncludedTotal>
          <S.IncludedBadges>
            {includedRows.map((row, index) => (
              <S.IncludedBadge key={row.label} style={{ animationDelay: `${index * 70}ms` }}>
                <S.IncludedValue>{row.value}</S.IncludedValue>
                <S.IncludedLabel>{row.label}</S.IncludedLabel>
              </S.IncludedBadge>
            ))}
          </S.IncludedBadges>
        </S.IncludedBar>
      )}

      <S.AddToCartButton
        type="button"
        onClick={() => addItem({ sku, name, price, compareAtPrice, image, description: includedRows[0]?.label })}
      >
        <Icon name="bag" size={14} />
        <span>{t('productDetail.addToCart')}</span>
      </S.AddToCartButton>

      <S.TrustBar>
        <S.TrustLabel>{t('productDetail.trustLabel')}</S.TrustLabel>
        <S.TrustRow>
          <S.TrustItem>
            <Icon name="bolt" size={13} />
            <span>{t('productDetail.perks.instant')}</span>
          </S.TrustItem>
          <S.TrustDivider />
          <S.TrustItem>
            <Icon name="no-watermark" size={13} />
            <span>{t('productDetail.perks.noWatermark')}</span>
          </S.TrustItem>
          <S.TrustDivider />
          <S.TrustItem>
            <Icon name="shield" size={13} />
            <span>{t('productDetail.perks.neverResold')}</span>
          </S.TrustItem>
        </S.TrustRow>
      </S.TrustBar>

      <S.ExclusivityBox>
        <S.ExclusivityMark aria-hidden="true">✦</S.ExclusivityMark>
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
