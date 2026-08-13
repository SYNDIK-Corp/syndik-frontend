import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/organisms/Hero';
import { BestSellers } from '@/components/organisms/BestSellers';
import { bestSellers } from '@/data/products';

export function Home() {
  return (
    <MainLayout navbarVariant="overlay">
      <Hero />
      <BestSellers products={bestSellers} />
    </MainLayout>
  );
}
