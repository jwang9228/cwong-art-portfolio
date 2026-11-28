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
  SUP_COLORCHARS,
  SUP_STREAM_FLYERS,
} from '../../lib/constants';

const BLITNET_ENVIRONMENT_GALLERY_PATH = 'cwong-art/Professional Work/Blit.net/environment';
const BLITNET_ENVIRONMENT_GALLERY_MAX_IMAGES = 10;

const BLITNET_FLYER_IMAGE_SIZES =
  '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 30vw';
const BLITNET_COLORCHAR_IMAGE_SIZES =
  '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';

export default async function Blitnet() {
  const videoSrc = getCloudinaryVideoUrl(BLITNET_INTRO_VIDEO_SRC);
  const posterSrc = getCloudinaryImageUrl(BLITNET_INTRO_POSTER_SRC);

  const miscSrcs = [
    ...SUP_STREAM_FLYERS.map((image) => image.src),
    ...SUP_COLORCHARS.map((image) => image.src),
  ];

  const [images, environmentResources, miscImages] = await Promise.all([
    fetchCloudinaryImageMetaMap(BLITNET_ENVIRONMENTS.map((e) => e.src), 'blitnet-images'),
    getGalleryImages(BLITNET_ENVIRONMENT_GALLERY_PATH, BLITNET_ENVIRONMENT_GALLERY_MAX_IMAGES),
    fetchCloudinaryImageMetaMap(miscSrcs, 'blitnet-misc-images'),
  ]);

  const environments = withRowAspect(BLITNET_ENVIRONMENTS, images);
  const flyers = withRowAspect(SUP_STREAM_FLYERS, miscImages);
  const colorChars = withRowAspect(SUP_COLORCHARS, miscImages);

  return (
    <Intro videoSrc={videoSrc} posterSrc={posterSrc}>
      <article className='flex flex-col gap-y-6 tablet:gap-y-8 p-2'>
        <Fade
          as='header'
          speed='ui'
          inView
          className='flex flex-col text-center text-balance gap-y-2'
        >
          <h1 className='text-xl tablet:text-2xl laptop:text-3xl font-semibold'>
            SUP x Blit.net
          </h1>
          <p className='font-normal text-base tablet:text-lg laptop:text-xl'>
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
                className='object-cover'
                quality='best'
                priority
                blurDataURL={blurDataURL}
              />
            </figure>
          ))}
        </section>

        <section className='flex flex-col pt-2'>
          <Fade className='pl-1.5'>
            <p className='italic font-normal tablet:text-lg'>
              Animated Assets
            </p>
          </Fade>
          <AnimatedAssets />
        </section>

        <section className='flex flex-col gap-y-1.5'>
          <Fade className='pl-0.5'>
            <p className='italic font-normal tablet:text-lg'>
              World Exploration
            </p>
          </Fade>
          <Gallery resources={environmentResources} lightbox={false} />
        </section>

        <section className='flex flex-col gap-y-1.5'>
          <Fade className='pl-0.5'>
            <p className='italic font-normal tablet:text-lg'>
              More from Blit
            </p>
          </Fade>
          
          <div className='flex flex-col laptop:flex-row gap-y-8 pt-2 tablet:pt-4
            laptop:gap-x-1.5 laptop:justify-evenly'>
            <div className='grid grid-cols-1 tablet:grid-cols-2
              px-6 laptop:px-0 tablet:gap-x-8 laptop:gap-x-12 gap-y-6 laptop:w-3/5'>
              {flyers.items.map(({ src, alt, blurDataURL }) => (
                <figure
                  key={src}
                  className='relative w-full'
                  style={flyers.aspectStyle}
                >
                  <RevealImage
                    fill
                    src={src}
                    alt={alt}
                    sizes={BLITNET_FLYER_IMAGE_SIZES}
                    className='object-cover'
                    quality='best'
                    blurDataURL={blurDataURL}
                  />
                </figure>
              ))}
            </div>

            <div className='grid grid-cols-1 tablet:grid-cols-2
              laptop:grid-cols-1 laptop:w-1/3 gap-1.5'>
              {colorChars.items.map(({ src, alt, blurDataURL }) => (
                <figure
                  key={src}
                  className='relative w-full'
                  style={colorChars.aspectStyle}
                >
                  <RevealImage
                    fill
                    src={src}
                    alt={alt}
                    sizes={BLITNET_COLORCHAR_IMAGE_SIZES}
                    className='object-cover'
                    quality='best'
                    blurDataURL={blurDataURL}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </article>
    </Intro>
  );
}
