import { LANDING_IMAGE_SRC } from '../../lib/constants';
import Image from 'next/image';
import Fade from '../utils/Fade';
import { CLOUDINARY_GRID_QUALITY } from '../../lib/cloudinary-image';

export default function Banner() {
  return (
    <Fade type='in' className='relative w-full h-[35dvh] laptop:h-[40dvh]'>
      <Image
        src={LANDING_IMAGE_SRC}
        alt='Portfolio Banner'
        fill
        priority
        sizes='100vw'
        quality={CLOUDINARY_GRID_QUALITY}
        className='object-cover laptop:object-contain'
      />
    </Fade>
  )
}