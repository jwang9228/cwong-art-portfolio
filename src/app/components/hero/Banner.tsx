import { LANDING_IMAGE_SRC } from '../../lib/constants';
import { fetchCloudinaryImageMetaMap } from '../../lib/cloudinary';
import Fade from '../utils/Fade';
import RevealImage from '../utils/RevealImage';

export default async function Banner() {
  const images = await fetchCloudinaryImageMetaMap(
    [LANDING_IMAGE_SRC],
    'landing-banner',
  );
  const meta = images[LANDING_IMAGE_SRC];

  return (
    <Fade type='in' className='relative w-full h-[35dvh] laptop:h-[40dvh]'>
      <RevealImage
        fill
        src={LANDING_IMAGE_SRC}
        alt='Portfolio Banner'
        sizes='100vw'
        className='object-cover laptop:object-contain'
        priority
        blurDataURL={meta?.blurDataURL}
      />
    </Fade>
  )
}
