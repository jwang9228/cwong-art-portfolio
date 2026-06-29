import { getGalleryImages } from '../../lib/cloudinary';
import GalleryImage from '../utils/GalleryImage';

const ILLUSTRATION_GALLERY_PATH = 'cwong-art/illustration';
const ILLUSTRATION_GALLERY_MAX_IMAGES = 50;

export default async function Illustration() {
  const resources = await getGalleryImages(ILLUSTRATION_GALLERY_PATH, ILLUSTRATION_GALLERY_MAX_IMAGES);

  return (
    <section className='grid grid-cols-2 max-w-6xl mx-auto gap-1'>
      {resources.map((art: any, index: number) => (
        <GalleryImage
          key={art.asset_id}
          image={art}
          alt='Gallery Artwork'
          sizes='100vw'
          loadDelay={index % 2 !== 0 ? 0.15 : 0}
        />
      ))}
    </section>
  )
}