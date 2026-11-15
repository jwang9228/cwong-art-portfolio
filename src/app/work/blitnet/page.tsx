import Intro from '../../components/blitnet/Intro';
import Fade from '../../components/utils/Fade';
import RevealImage from '../../components/utils/RevealImage';
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
  BLITNET_CICI_IDLE,
  BLITNET_DOOR_OPEN_CLOSE,
  BLITNET_ENVIRONMENTS,
  BLITNET_INTRO_POSTER_SRC,
  BLITNET_INTRO_VIDEO_SRC,
  BLITNET_PROP_CHECKPOINT,
  BLITNET_PROP_COIN,
  BLITNET_PROP_FIREBALL,
  BLITNET_PROP_LAMPPOSTS,
  BLITNET_RIFFBIT_ANIMS,
  BLITNET_SUP_DOOR_IDLE,
} from '../../lib/constants';
import CloudinaryAnimatedImage from '../../components/cloudinary/CloudinaryAnimatedImage';
import Gallery from '../../components/utils/Gallery';

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
            Environment and asset work for Blit's pixel platformer
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
          <div className='flex flex-col whiteboard-grid gap-y-12 py-6 my-2'>
            <Fade 
              speed='art'
              inView
              className='flex gap-x-2 tablet:max-w-lg laptop:max-w-xl'
            >
              <div className='flex flex-1 justify-evenly items-center'>
                {BLITNET_PROP_LAMPPOSTS.map(({ src, alt }) => 
                  <CloudinaryAnimatedImage
                    key={src}
                    src={src}
                    alt={alt}
                    className='h-48 laptop:h-56'
                  />
                )}
              </div>
              <div className='flex flex-1 flex-col justify-between'>
                <div className='flex justify-evenly items-center'>
                  <CloudinaryAnimatedImage
                    src={BLITNET_PROP_COIN.src}
                    alt={BLITNET_PROP_COIN.alt}
                    className='h-18 laptop:h-24'
                  />
                  <CloudinaryAnimatedImage
                    src={BLITNET_PROP_CHECKPOINT.src}
                    alt={BLITNET_PROP_CHECKPOINT.alt}
                    className='h-24 laptop:h-30'
                  />
                </div>
                <CloudinaryAnimatedImage
                  src={BLITNET_PROP_FIREBALL.src}
                  alt={BLITNET_PROP_FIREBALL.alt}
                  className='h-18 laptop:h-24'
                />
              </div>
            </Fade>
            <div className='flex flex-col tablet:flex-row 
              tablet:justify-around tablet:items-center laptop:gap-x-4 gap-y-12 laptop:max-w-3/5'
            >
              <Fade
                speed='art'
                inView
                className='flex justify-evenly items-center tablet:gap-x-4 laptop:gap-x-8'
              >
                {BLITNET_RIFFBIT_ANIMS.map(({ src, alt }) => 
                  <CloudinaryAnimatedImage 
                    key={src} 
                    src={src} 
                    alt={alt}
                    className='h-32 laptop:h-42'
                  />
                )}
              </Fade>
              <Fade 
                speed='art'
                inView
                className='flex justify-evenly items-center tablet:gap-x-4 laptop:gap-x-8'
              >
                <CloudinaryAnimatedImage
                  src={BLITNET_DOOR_OPEN_CLOSE.src}
                  alt={BLITNET_DOOR_OPEN_CLOSE.alt}
                  className='h-28 tablet:h-30 laptop:h-42'
                />
                <CloudinaryAnimatedImage
                  src={BLITNET_SUP_DOOR_IDLE.src}
                  alt={BLITNET_SUP_DOOR_IDLE.alt}
                  className='h-30 tablet:h-32 laptop:h-44'
                />
                <CloudinaryAnimatedImage
                  src={BLITNET_CICI_IDLE.src}
                  alt={BLITNET_CICI_IDLE.alt}
                  className='h-28 tablet:h-30 laptop:h-42'
                />
              </Fade>
            </div>
          </div>
        </section>
      </article>
    </Intro>
  );
}
