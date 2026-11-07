import Hero from './components/hero/Hero';
import Banner from './components/hero/Banner';
import HeroGallery from './components/hero/HeroGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courtney Wong - Concept Artist',
  description: 'Explore the art portfolio of Courtney Wong.'
}

export default function Page() {
  return (
    <>
      <Banner />
      <Hero>
        <HeroGallery />
      </Hero>
    </>
  )
}
