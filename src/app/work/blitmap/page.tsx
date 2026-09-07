import { BLITMAP_LANDING_IMAGE_SRC } from '../../lib/constants';
import Image from 'next/image';
import { CLOUDINARY_LIGHTBOX_QUALITY } from '../../lib/cloudinary-image';

export default function Blitmap() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={BLITMAP_LANDING_IMAGE_SRC}
        alt='Blitmap Cover'
        fill
        priority
        sizes='100vw'
        quality={CLOUDINARY_LIGHTBOX_QUALITY}
        className='object-cover'
      />
    </div>
  )
}