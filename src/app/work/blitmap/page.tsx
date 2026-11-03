import { 
  BLITMAP_LANDING_IMAGE_SRC,
  BLITMAP_ISSUE_5_COVERS,
  BLITMAP_THUMBNAILS,
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  BLITMAP_PROCESS_WORK_SKETCHES,
  BLITMAP_PROCESS_WORK_COVERS
} from '../../lib/constants';
import {
  CloudinaryImageMeta,
  fetchCloudinaryImageMetaMap,
} from '../../lib/cloudinary';
import { cloudinaryAspectRatioStyle } from '../../lib/cloudinary-image';
import Fade from '../../components/utils/Fade';
import RevealImage from '../../components/utils/RevealImage';

/**
 * Pairs each item with its blur placeholder and derives one shared
 * `aspect-ratio` for the row, so equal-width cells end up the same size
 * regardless of each source asset's own ratio.
 */
const withRowAspect = <T extends { src: string }>(
  items: readonly T[],
  images: Record<string, CloudinaryImageMeta>,
) => ({
  items: items.map((item) => ({ ...item, blurDataURL: images[item.src]?.blurDataURL })),
  aspectStyle: cloudinaryAspectRatioStyle(items.map((item) => images[item.src])),
});

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
  const images = await fetchCloudinaryImageMetaMap(BLITMAP_IMAGE_SRCS, 'blitmap-images');
  const landing = images[BLITMAP_LANDING_IMAGE_SRC];
  const processCharacters = images[BLITMAP_PROCESS_WORK_CHARACTERS_SRC];
  const issue5 = withRowAspect(BLITMAP_ISSUE_5_COVERS, images);
  const thumbnails = withRowAspect(BLITMAP_THUMBNAILS, images);
  const sketches = withRowAspect(BLITMAP_PROCESS_WORK_SKETCHES, images);
  const processCovers = withRowAspect(BLITMAP_PROCESS_WORK_COVERS, images);

  return (
    <article className='flex flex-col'>
      <figure className='relative h-[70dvh] w-full'>
        <RevealImage
          fill
          src={BLITMAP_LANDING_IMAGE_SRC}
          alt='Blitmap Cover'
          sizes='100vw'
          className='object-cover'
          quality='best'
          priority
          blurDataURL={landing?.blurDataURL}
        />
      </figure>

      <Fade
        as='header'
        speed='ui'
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

      <section className='relative flex w-full px-1 gap-x-1'>
        {issue5.items.map(cover => (
          <figure
            key={cover.src}
            className='relative w-1/2'
            style={issue5.aspectStyle}
          >
            <RevealImage
              fill
              src={cover.src}
              alt={cover.alt}
              sizes='50vw'
              className='object-cover'
              blurDataURL={cover.blurDataURL}
            />
          </figure>
        ))}
      </section>

      <section
        className='whiteboard-grid relative flex flex-col items-center w-full py-8 my-4
          tablet:flex-row tablet:justify-center tablet:items-center tablet:py-10'
      >
        {thumbnails.items.map((thumbnail, index) => {
          const layout = THUMBNAIL_LAYOUT[index];

          return (
            <figure
              key={thumbnail.src}
              className={`relative w-2/3 shrink-0
                tablet:w-[30%] tablet:max-w-none
                rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.4)] border-4 border-white 
                ring-1 ring-primary/25 overflow-hidden
                ${layout.className}`}
              style={thumbnails.aspectStyle}
            >
              <RevealImage
                fill
                src={thumbnail.src}
                alt={thumbnail.alt}
                sizes='(max-width: 767px) 72vw, 25vw'
                className='object-cover'
                blurDataURL={thumbnail.blurDataURL}
              />
            </figure>
          );
        })}
      </section>

      <section className='relative flex flex-col px-1 gap-y-2.5'>
        <figure
          className='relative w-full'
          style={cloudinaryAspectRatioStyle(processCharacters)}
        >
          <RevealImage
            fill
            src={BLITMAP_PROCESS_WORK_CHARACTERS_SRC}
            alt='Blitmap Process Work Characters'
            sizes='100vw'
            className='object-contain'
            blurDataURL={processCharacters?.blurDataURL}
          />
        </figure>

        <div className='flex gap-x-1'>
          {sketches.items.map(sketch => (
            <figure
              key={sketch.src}
              className='relative w-1/2'
              style={sketches.aspectStyle}
            >
              <RevealImage
                fill
                src={sketch.src}
                alt={sketch.alt}
                sizes='50vw'
                className='object-contain'
                blurDataURL={sketch.blurDataURL}
              />
            </figure>
          ))}
        </div>

        <div className='flex flex-col gap-y-2.5 tablet:gap-y-3 laptop:gap-y-4'>
          <div className='flex gap-x-1'>
            {processCovers.items.map(cover => (
              <figure
                key={cover.src}
                className='relative w-1/3'
                style={processCovers.aspectStyle}
              >
                <RevealImage
                  fill
                  src={cover.src}
                  alt={cover.alt}
                  sizes='33vw'
                  className='object-contain'
                  blurDataURL={cover.blurDataURL}
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
