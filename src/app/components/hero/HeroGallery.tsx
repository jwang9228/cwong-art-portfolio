import { getGalleryImages } from '../../lib/cloudinary';
import GalleryImage from '../utils/GalleryImage';

const HERO_GALLERY_PATH = 'cwong-art/landing/gallery';
const HERO_GALLERY_MAX_IMAGES = 30;

export default async function HeroGallery() {
  const resources = await getGalleryImages(HERO_GALLERY_PATH, HERO_GALLERY_MAX_IMAGES);

  return (
    <section className='grid grid-cols-1 tablet:grid-cols-2
      gap-4 tablet:gap-5 laptop:gap-6 pt-6'>
      {resources.map((art: any, index: number) => (
        <GalleryImage
          key={art.asset_id}
          image={art}
          alt='Gallery Artwork'
          sizes='(max-width: 767px) 100vw, 50vw'
          inView
          priority={index < 2}
        />
      ))}
    </section>
  )
}