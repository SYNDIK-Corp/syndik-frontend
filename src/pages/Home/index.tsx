import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/organisms/Hero';
import { BestSellers } from '@/components/organisms/BestSellers';
import { SoundSection } from '@/components/organisms/SoundSection';
import { FaqSection } from '@/components/organisms/FaqSection';
import { soundProducts } from '@/data/products';
import { fetchHomeBestSellers } from '@/lib/catalogApi';
import { fetchHeroBanners, type HeroBanner } from '@/lib/heroBanners';
import type { CatalogItem } from '@/types/product';

export function Home() {
  const [bestSellers, setBestSellers] = useState<CatalogItem[]>([]);
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchHomeBestSellers().then((result) => {
      if (!cancelled) setBestSellers(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchHeroBanners().then((result) => {
      if (!cancelled) setHeroBanners(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MainLayout navbarVariant="overlay">
      <Hero banners={heroBanners} />
      <BestSellers products={bestSellers} />
      <SoundSection products={soundProducts} />
      {/* ArchiveSection ("SYNDIK / Tudo o que fazemos") desativada a pedido do
          usuário (Fase 11.3) — componente mantido no código, sem rota/uso
          nenhum por enquanto, pronto pra reativar depois. */}
      <FaqSection />
    </MainLayout>
  );
}
