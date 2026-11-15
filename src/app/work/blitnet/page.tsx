import Intro from '../../components/blitnet/Intro';
import AnimatedAssets from '../../components/blitnet/AnimatedAssets';
import Fade from '../../components/utils/Fade';
import RevealImage from '../../components/utils/RevealImage';
import Gallery from '../../components/utils/Gallery';
import {
  getCloudinaryImageUrl,
  getCloudinaryVideoUrl,
  withRowAspect,
} from '../../lib/cloudinary-image';
import {
  fetchCloudinaryImageMetaMap,
  getGalleryImages,
} from '../../lib/cloudinary';
import {
  BLITNET_ENVIRONMENTS,
  BLITNET_INTRO_POSTER_SRC,
  BLITNET_INTRO_VIDEO_SRC,
} from '../../lib/constants';

const BLITNET_ENVIRONMENT_GALLERY_PATH = 'cwong-art/Professional Work/Blit.net/environment';
const BLITNET_ENVIRONMENT_GALLERY_MAX_IMAGES = 10;

export default async function Blitnet() {
  const videoSrc = getCloudinaryVideoUrl(BLITNET_INTRO_VIDEO_SRC);
  const posterSrc = getCloudinaryImageUrl(BLITNET_INTRO_POSTER_SRC);

  const [images, resources] = await Promise.all([
    fetchCloudinaryImageMetaMap(BLITNET_ENVIRONMENTS.map((e) => e.src), 'blitnet-images'),
    getGalleryImages(BLITNET_ENVIRONMENT_GALLERY_PATH, BLITNET_ENVIRONMENT_GALLERY_MAX_IMAGES),
  ]);

  const environments = withRowAspect(BLITNET_ENVIRONMENTS, images);

  return (
    <Intro videoSrc={videoSrc} posterSrc={posterSrc}>
      <article className='flex flex-col gap-y-8 p-2'>
        <Fade
          as='header'
          speed='ui'
          inView
          className='flex flex-col text-center text-balance gap-y-2'
        >
          <h1 className='text-xl tablet:text-2xl laptop:text-3xl font-semibold'>
            SUP x Blit.net
          </h1>
          <p className='font-normal text-base laptop:text-lg'>
            Environment and asset work for Blit&apos;s pixel platformer
          </p>
        </Fade>

        <section className='flex flex-col laptop:flex-row w-full gap-1.5'>
          {environments.items.map(({ src, alt, blurDataURL }) => (
            <figure
              key={src}
              className='relative w-full laptop:w-1/2'
              style={environments.aspectStyle}
            >
              <RevealImage
                fill
                src={src}
                alt={alt}
                sizes='(max-width: 1023px) 100vw, 50vw'
                className='object-cover [image-rendering:pixelated]'
                quality='best'
                priority
                blurDataURL={blurDataURL}
              />
            </figure>
          ))}
        </section>

        <section className='flex flex-col gap-y-1.5 pt-2'>
          <Fade className='pl-0.5'>
            <p className='italic font-normal laptop:text-lg'>
              World Exploration
            </p>
          </Fade>
          <Gallery resources={resources} lightbox={false} />
        </section>

        <section className='flex flex-col'>
          <Fade className='pl-1.5'>
            <p className='italic font-normal laptop:text-lg'>
              Animated Assets
            </p>
          </Fade>
          <AnimatedAssets />
        </section>
      </article>
    </Intro>
  );
}
