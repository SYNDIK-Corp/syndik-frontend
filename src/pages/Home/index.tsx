import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/organisms/Hero';
import { BestSellers } from '@/components/organisms/BestSellers';
import { SoundSection } from '@/components/organisms/SoundSection';
import { ArchiveSection } from '@/components/organisms/ArchiveSection';
import { FaqSection } from '@/components/organisms/FaqSection';
import { soundProducts } from '@/data/products';
import { fetchHomeBestSellers } from '@/lib/catalogApi';
import type { Product } from '@/types/product';

export function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchHomeBestSellers().then((result) => {
      if (!cancelled) setBestSellers(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MainLayout navbarVariant="overlay">
      <Hero />
      <BestSellers products={bestSellers} />
      <SoundSection products={soundProducts} />
      <ArchiveSection />
      <FaqSection />
    </MainLayout>
  );
}
