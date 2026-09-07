import { BLITMAP_LANDING_IMAGE_SRC } from '../../lib/constants';
import Image from 'next/image';
import { toCloudinarySrc } from '../../lib/cloudinary-image';

export default function Blitmap() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={toCloudinarySrc(BLITMAP_LANDING_IMAGE_SRC, 'best')}
        alt='Blitmap Cover'
        fill
        priority
        sizes='100vw'
        className='object-cover'
      />
    </div>
  )
}
