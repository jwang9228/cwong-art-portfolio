import Intro from '../../components/blitnet/Intro';
import Fade from '../../components/utils/Fade';
import {
  getCloudinaryOriginalImageUrl,
  getCloudinaryVideoUrl,
} from '../../lib/cloudinary-image';
import {
  BLITNET_INTRO_POSTER_SRC,
  BLITNET_INTRO_VIDEO_SRC,
} from '../../lib/constants';

export default function Blitnet() {
  const videoSrc = `${getCloudinaryVideoUrl(BLITNET_INTRO_VIDEO_SRC)}.webm`;
  const posterSrc = `${getCloudinaryOriginalImageUrl(BLITNET_INTRO_POSTER_SRC)}.png`;

  return (
    <Intro videoSrc={videoSrc} posterSrc={posterSrc}>
      <Fade
        as='header'
        speed='ui'
        inView 
        className='flex flex-col text-center text-balance gap-y-2 px-2'
      >
        <h1 className='text-xl tablet:text-2xl laptop:text-3xl font-semibold'>
          SUP x Blit.net
        </h1>
        <p className='font-normal text-base laptop:text-lg'>
          Environment and asset work for Blit's pixel platformer
        </p>
      </Fade>
    </Intro>
  );
}
