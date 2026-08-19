import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export interface ProductGalleryProps {
  coverImage?: string;
  hoverImage?: string;
  alt: string;
}

/* MVP 2.1 — galeria simplificada pra cover + hover empilhados; sem
 * miniaturas/zoom/pranchas do Drop, decisão do usuário de deixar só essas
 * duas imagens, iguais em todo produto. */
export function ProductGallery({ coverImage, hoverImage, alt }: ProductGalleryProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollHeight - el.clientHeight > 4;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    setShowScrollHint(hasOverflow && !atBottom);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [coverImage, hoverImage]);

  /* scroll da galeria não depende do mouse estar em cima dela — enquanto a
   * galeria estiver visível na viewport, qualquer wheel na página (em
   * qualquer lugar) rola as imagens primeiro; só libera pro scroll normal
   * da página quando a galeria já chegou no topo/fim na direção do gesto. */
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.matchMedia('(max-width: 900px)').matches) return;

      const el = scrollRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (event.deltaY > 0 && atBottom) return;
      if (event.deltaY < 0 && atTop) return;

      event.preventDefault();
      el.scrollTop += event.deltaY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleHintClick = () => {
    scrollRef.current?.scrollBy({ top: scrollRef.current.clientHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <S.Container>
      <S.Scroll ref={scrollRef} onScroll={checkOverflow}>
        {coverImage && (
          <S.Plate>
            <S.Image src={coverImage} alt={alt} onLoad={checkOverflow} />
          </S.Plate>
        )}
        {hoverImage && (
          <S.Plate>
            <S.Image src={hoverImage} alt={alt} onLoad={checkOverflow} />
          </S.Plate>
        )}
      </S.Scroll>
      {showScrollHint && (
        <S.ScrollHint type="button" aria-label={t('productDetail.scrollForMore')} onClick={handleHintClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </S.ScrollHint>
      )}
    </S.Container>
  );
}
