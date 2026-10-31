import { 
  BLITMAP_LANDING_IMAGE_SRC,
  BLITMAP_ISSUE_5_COVERS,
  BLITMAP_THUMBNAILS,
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  BLITMAP_PROCESS_WORK_SKETCHES,
  BLITMAP_PROCESS_WORK_COVERS
} from '../../lib/constants';
import { fetchBlurDataURLMap } from '../../lib/cloudinary';
import Fade from '../../components/utils/Fade';
import FadeFillImage from '../../components/utils/FadeFillImage';

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

export default async function Blitmap() {
  const blurs = await fetchBlurDataURLMap(BLITMAP_IMAGE_SRCS, 'blitmap-blurs');

  return (
    <article className='flex flex-col'>
      <figure className='relative h-[70dvh] w-full'>
        <FadeFillImage
          src={BLITMAP_LANDING_IMAGE_SRC}
          alt='Blitmap Cover'
          sizes='100vw'
          className='object-cover'
          quality='best'
          priority
          blurDataURL={blurs[BLITMAP_LANDING_IMAGE_SRC]}
        />
      </figure>

      <Fade
        as='header'
        speed='ui'
        delay={0.2}
        inView 
        className='flex flex-col gap-y-3 py-4.5 tablet:py-5 laptop:py-6 text-center text-balance'
      >
        <h1 className='text-xl tablet:text-2xl laptop:text-3xl font-semibold font-mono'>
          SUP x Blitmap: Fragments of the Machine
        </h1>
        <p className='font-normal text-base laptop:text-lg'>
          Cover art for Blitmap's sci-fi comic series, in collaboration with Titan Comics
        </p>
      </Fade>

      <section className='relative flex w-full'>
        {BLITMAP_ISSUE_5_COVERS.map(cover => (
          <figure key={cover.src} className='relative w-1/2 aspect-2/3'>
            <FadeFillImage
              src={cover.src}
              alt={cover.alt}
              sizes='50vw'
              className='object-contain'
              blurDataURL={blurs[cover.src]}
            />
          </figure>
        ))}
      </section>

      <section
        className='whiteboard-grid relative flex flex-col items-center w-full py-8 my-4
          tablet:flex-row tablet:justify-center tablet:items-center tablet:py-10'
      >
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
              <FadeFillImage
                src={thumbnail.src}
                alt={thumbnail.alt}
                sizes='(max-width: 767px) 72vw, 25vw'
                className='object-cover'
                blurDataURL={blurs[thumbnail.src]}
              />
            </figure>
          );
        })}
      </section>

      <section className='relative flex flex-col px-1 gap-y-2.5'>
        <figure className='relative w-full aspect-800/486'>
          <FadeFillImage
            src={BLITMAP_PROCESS_WORK_CHARACTERS_SRC}
            alt='Blitmap Process Work Characters'
            sizes='100vw'
            className='object-contain'
            blurDataURL={blurs[BLITMAP_PROCESS_WORK_CHARACTERS_SRC]}
          />
        </figure>

        <div className='flex gap-x-1'>
          {BLITMAP_PROCESS_WORK_SKETCHES.map(sketch => (
            <figure key={sketch.src} className='relative w-1/2 aspect-2/3'>
              <FadeFillImage
                src={sketch.src}
                alt={sketch.alt}
                sizes='50vw'
                className='object-contain'
                blurDataURL={blurs[sketch.src]}
              />
            </figure>
          ))}
        </div>

        <div className='flex flex-col gap-y-2.5 tablet:gap-y-3 laptop:gap-y-4'>
          <div className='flex gap-x-1'>
            {BLITMAP_PROCESS_WORK_COVERS.map(cover => (
              <figure key={cover.src} className='relative w-1/3 aspect-2/3'>
                <FadeFillImage
                  src={cover.src}
                  alt={cover.alt}
                  sizes='33vw'
                  className='object-contain'
                  blurDataURL={blurs[cover.src]}
                />
              </figure>
            ))}
          </div>
          <p className='font-normal text-primary/85
            text-sm tablet:text-base laptop:text-xl text-balance text-center'
          >
            Black-and-white variations for rapid cover ideation
          </p>
        </div>
      </section>
    </article>
  )
}
