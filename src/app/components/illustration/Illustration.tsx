import { getGalleryImages } from '../../lib/cloudinary';
import GalleryImage from '../utils/GalleryImage';

const ILLUSTRATION_GALLERY_PATH = 'cwong-art/illustration';
const ILLUSTRATION_GALLERY_MAX_IMAGES = 50;

export default async function Illustration() {
  const resources = await getGalleryImages(ILLUSTRATION_GALLERY_PATH, ILLUSTRATION_GALLERY_MAX_IMAGES);

  return (
    <section className='columns-2 laptop:columns-3 gap-1 [&_>_*:not(:last-child)]:mb-1'>
      {resources.map((art: any, index: number) => (
        <div key={art.asset_id} className='break-inside-avoid'>
          <GalleryImage
            image={art}
            alt='Gallery Artwork'
            sizes='(max-width: 1024px) 50vw, 33vw'
            inView   
            priority={index < 8}    
          />
        </div>
      ))}
    </section>
  )
}