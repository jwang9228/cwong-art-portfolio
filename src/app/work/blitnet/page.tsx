import Intro from '../../components/blitnet/Intro';
import Fade from '../../components/utils/Fade';
import FadeFillImage from '../../components/utils/FadeFillImage';
import {
  getCloudinaryOriginalImageUrl,
  getCloudinaryVideoUrl,
} from '../../lib/cloudinary-image';
import { fetchBlurDataURLMap } from '../../lib/cloudinary';
import {
  BLITNET_ENVIRONMENTS,
  BLITNET_INTRO_POSTER_SRC,
  BLITNET_INTRO_VIDEO_SRC,
} from '../../lib/constants';

export default async function Blitnet() {
  const videoSrc = `${getCloudinaryVideoUrl(BLITNET_INTRO_VIDEO_SRC)}.webm`;
  const posterSrc = `${getCloudinaryOriginalImageUrl(BLITNET_INTRO_POSTER_SRC)}.png`;
  const blurs = await fetchBlurDataURLMap(
    BLITNET_ENVIRONMENTS.map((environment) => environment.src),
    'blitnet-blurs',
  );

  return (
    <Intro videoSrc={videoSrc} posterSrc={posterSrc}>
      <article className='flex flex-col gap-y-8 py-2'>
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

        <section className='flex flex-col laptop:flex-row w-full px-2 gap-2'>
          {BLITNET_ENVIRONMENTS.map(({ src, alt }) => (
            <figure key={src} className='relative w-full laptop:w-1/2 aspect-video'>
              <FadeFillImage
                src={src}
                alt={alt}
                sizes='(max-width: 1023px) 100vw, 50vw'
                className='object-cover [image-rendering:pixelated]'
                quality='best'
                blurDataURL={blurs[src]}
              />
            </figure>
          ))}
        </section>

        <Fade>
          <p className='text-sm'>World Exploration</p>
        </Fade>
      </article>
    </Intro>
  );
}
