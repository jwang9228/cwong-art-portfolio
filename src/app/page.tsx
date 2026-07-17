import Hero from './components/hero/Hero';
import HeroGallery from './components/hero/HeroGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courtney Wong - Concept Artist',
  description: 'Explore the art portfolio of Courtney Wong.'
}

export default function Page() {
  return (
    <Hero>
      <HeroGallery />
    </Hero>
  )
}