import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/organisms/Hero';
import { BestSellers } from '@/components/organisms/BestSellers';
import { SoundSection } from '@/components/organisms/SoundSection';
import { ArchiveSection } from '@/components/organisms/ArchiveSection';
import { bestSellers, soundProducts } from '@/data/products';

export function Home() {
  return (
    <MainLayout navbarVariant="overlay">
      <Hero />
      <BestSellers products={bestSellers} />
      <SoundSection products={soundProducts} />
      <ArchiveSection />
    </MainLayout>
  );
}
