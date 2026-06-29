import { LANDING_IMAGE_URL } from '../../lib/constants';
import Image from 'next/image';
import Fade from '../utils/Fade';

export default function Banner() {
  return (
    <Fade type='in' className='relative w-full h-[35dvh] laptop:h-[40dvh]'>
      <Image
        src={LANDING_IMAGE_URL}
        alt='Portfolio Banner'
        fill
        priority
        className='object-cover laptop:object-contain'
      />
    </Fade>
  )
}