import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import { ProductCard } from '@/components/molecules/ProductCard';
import { bestSellers } from '@/data/products';
import * as S from './styles';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <S.Backdrop $open={open} onClick={onClose} />
      <S.Drawer $open={open} aria-hidden={!open}>
        <S.Header>
          <S.HeaderLabel>{t('nav.menu')}</S.HeaderLabel>
          <S.CloseButton type="button" aria-label={t('nav.closeMenu')} onClick={onClose}>
            <Icon name="close" size={18} />
          </S.CloseButton>
        </S.Header>

        <S.Nav aria-label={t('nav.mainNavigation')}>
          <S.NavItem to="/" end onClick={onClose}>
            {t('nav.home')}
          </S.NavItem>
          <S.NavItem to="/products" onClick={onClose}>
            {t('nav.products')}
          </S.NavItem>
          <S.NavItem to="/contact" onClick={onClose}>
            {t('nav.contact')}
          </S.NavItem>
        </S.Nav>

        <S.MiniSection>
          <S.MiniTitle>{t('bestSellers.title')}</S.MiniTitle>
          <S.MiniRail>
            {bestSellers.map((product) => (
              <S.MiniItem key={product.id} onClick={onClose}>
                <ProductCard product={product} compact />
              </S.MiniItem>
            ))}
          </S.MiniRail>
        </S.MiniSection>
      </S.Drawer>
    </>
  );
}
