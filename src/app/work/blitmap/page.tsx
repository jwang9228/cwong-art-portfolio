import { 
  BLITMAP_LANDING_IMAGE_SRC,
  BLITMAP_ISSUE_5_COVERS,
  BLITMAP_THUMBNAILS,
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  BLITMAP_PROCESS_WORK_SKETCHES,
  BLITMAP_PROCESS_WORK_COVERS
} from '../../lib/constants';
import Image from 'next/image';
import { cacheLife, cacheTag } from 'next/cache';
import { toCloudinarySrc } from '../../lib/cloudinary-image';
import { fetchBlurDataURL, parseVersionedCloudinarySrc } from '../../lib/cloudinary';
import Fade from '../../components/utils/Fade';

// Per-thumbnail scatter: mobile = fanned vertical stack; tablet+ = overlapping row.
const THUMBNAIL_LAYOUT = [
  {
    className:
      '-rotate-2 -translate-x-[5%] z-10 ' +
      'tablet:translate-x-0 tablet:-rotate-3 tablet:translate-y-1',
  },
  {
    className:
      'rotate-2 translate-x-[8%] -mt-8 z-30 ' +
      'tablet:translate-x-0 tablet:mt-0 tablet:rotate-2 tablet:-translate-y-3 tablet:-ml-6',
  },
  {
    className:
      '-rotate-1 -translate-x-[3%] -mt-8 z-20 ' +
      'tablet:translate-x-0 tablet:mt-0 tablet:-rotate-2 tablet:translate-y-2 tablet:-ml-6',
  },
] as const;

const BLITMAP_IMAGE_SRCS = [
  BLITMAP_LANDING_IMAGE_SRC,
  ...BLITMAP_ISSUE_5_COVERS.map((cover) => cover.src),
  ...BLITMAP_THUMBNAILS.map((thumbnail) => thumbnail.src),
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  ...BLITMAP_PROCESS_WORK_SKETCHES.map((sketch) => sketch.src),
  ...BLITMAP_PROCESS_WORK_COVERS.map((cover) => cover.src),
] as const;

async function getBlitmapBlurs(): Promise<Record<string, string | undefined>> {
  'use cache';
  cacheLife('hours');
  cacheTag('blitmap-blurs');

  const entries = await Promise.all(
    BLITMAP_IMAGE_SRCS.map(async (src) => {
      const blurDataURL = await fetchBlurDataURL(parseVersionedCloudinarySrc(src));
      return [src, blurDataURL] as const;
    })
  );

  return Object.fromEntries(entries);
}

export default async function Blitmap() {
  const blurs = await getBlitmapBlurs();

  const fillImage = (
    src: string,
    alt: string,
    sizes: string,
    className: string,
    quality: 'good' | 'best' = 'good',
    priority = false,
  ) => {
    const blurDataURL = blurs[src];
    return (
      <Image
        src={toCloudinarySrc(src, quality)}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        {...(priority ? { priority: true } : {})}
        {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
      />
    );
  };

  return (
    <article className='flex flex-col font-mono'>
      <figure className='relative h-[70dvh] w-full'>
        {fillImage(BLITMAP_LANDING_IMAGE_SRC, 'Blitmap Cover', '100vw', 'object-cover', 'best', true)}
      </figure>

      <Fade
        as='header'
        speed='art'
        inView
        className='flex flex-col gap-y-2 laptop:gap-y-2.5 
          py-4.5 tablet:py-5 laptop:py-6 text-center'
      >
        <h1 className='flex justify-center gap-x-1.5
          text-lg tablet:text-2xl laptop:text-3xl desktop:text-4xl
          font-semibold tracking-tighter tablet:tracking-normal'>
          <span>Blitmap:</span>
          <span>Fragments of the Machine</span>
        </h1>
        <p className='font-medium tablet:text-lg laptop:text-xl desktop:text-2xl'>
          SUP/BLITMAP x Titan Comics
        </p>
      </Fade>

      <Fade as='section' speed='art' inView className='relative flex w-full'>
        <h2 className='sr-only'>Issue 5 covers</h2>
        {BLITMAP_ISSUE_5_COVERS.map(cover => (
          <figure key={cover.src} className='relative w-1/2 aspect-2/3'>
            {fillImage(cover.src, cover.alt, '50vw', 'object-contain')}
          </figure>
        ))}
      </Fade>

      <Fade
        as='section'
        speed='art'
        inView
        className='whiteboard-grid relative flex flex-col items-center w-full py-8 my-4
          tablet:flex-row tablet:justify-center tablet:items-center tablet:py-10'
      >
        <h2 className='sr-only'>Thumbnails</h2>
        {BLITMAP_THUMBNAILS.map((thumbnail, index) => {
          const layout = THUMBNAIL_LAYOUT[index];

          return (
            <figure
              key={thumbnail.src}
              className={`relative w-2/3 aspect-3/4 shrink-0
                tablet:w-[30%] tablet:max-w-none
                rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.4)] border-4 border-white 
                ring-1 ring-primary/25 overflow-hidden
                ${layout.className}`}
            >
              {fillImage(thumbnail.src, thumbnail.alt, '(max-width: 767px) 72vw, 25vw', 'object-cover')}
            </figure>
          );
        })}
      </Fade>

      <Fade as='section' speed='art' inView className='relative flex flex-col px-1 gap-y-2.5'>
        <h2 className='sr-only'>Process work</h2>
        <figure className='relative w-full aspect-800/486'>
          {fillImage(BLITMAP_PROCESS_WORK_CHARACTERS_SRC, 'Blitmap Process Work Characters', '100vw', 'object-contain')}
        </figure>

        <section className='flex gap-x-1'>
          {BLITMAP_PROCESS_WORK_SKETCHES.map(sketch => (
            <figure key={sketch.src} className='relative w-1/2 aspect-2/3'>
              {fillImage(sketch.src, sketch.alt, '50vw', 'object-contain')}
            </figure>
          ))}
        </section>

        <section className='flex flex-col gap-y-2.5 tablet:gap-y-3 laptop:gap-y-4'>
          <div className='flex gap-x-1'>
            {BLITMAP_PROCESS_WORK_COVERS.map(cover => (
              <figure key={cover.src} className='relative w-1/3 aspect-2/3'>
                {fillImage(cover.src, cover.alt, '33vw', 'object-contain')}
              </figure>
            ))}
          </div>
          <p className=' font-medium text-primary/85
            text-sm tablet:text-base laptop:text-xl text-balance text-center'
          >
            Black-and-white variations for rapid cover ideation
          </p>
        </section>
      </Fade>
    </article>
  )
}
