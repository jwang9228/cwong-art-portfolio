import { BLITMAP_LANDING_IMAGE_URL } from '../../lib/constants';
import Image from 'next/image';

export default function Blitmap() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={BLITMAP_LANDING_IMAGE_URL}
        alt='Blitmap Cover'
        fill
        priority
        className='object-cover'
      />
    </div>
  )
}