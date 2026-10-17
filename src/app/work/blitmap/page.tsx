import { 
  BLITMAP_LANDING_IMAGE_SRC,
  BLITMAP_ISSUE_5_COVERS,
  BLITMAP_THUMBNAILS,
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  BLITMAP_PROCESS_WORK_SKETCHES,
  BLITMAP_PROCESS_WORK_COVERS
} from '../../lib/constants';
import Image from 'next/image';
import { toCloudinarySrc } from '../../lib/cloudinary-image';
import WhiteboardBackground from '../../components/utils/WhiteboardBackground';

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

export default function Blitmap() {
  return (
    <article className='flex flex-col font-mono'>
      <figure className='relative h-[70dvh] w-full'>
        <Image
          src={toCloudinarySrc(BLITMAP_LANDING_IMAGE_SRC, 'best')}
          alt='Blitmap Cover'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      </figure>

      <WhiteboardBackground>
        <header className='flex flex-col gap-y-2 laptop:gap-y-2.5 
          py-4.5 tablet:py-5 laptop:py-6 text-center'>
          <h1 className='flex justify-center gap-x-1.5
            text-lg tablet:text-2xl laptop:text-3xl desktop:text-4xl
            font-semibold tracking-tighter tablet:tracking-normal'>
            <span>Blitmap:</span>
            <span>Fragments of the Machine</span>
          </h1>
          <p className='font-medium tablet:text-lg laptop:text-xl desktop:text-2xl'>
            SUP/BLITMAP x Titan Comics
          </p>
        </header>

        <section className='flex w-full'>
          {BLITMAP_ISSUE_5_COVERS.map(cover => (
            <figure key={cover.src} className='relative w-1/2 aspect-2/3'>
              <Image
                src={toCloudinarySrc(cover.src, 'good')}
                alt={cover.alt}
                fill
                sizes='50vw'
                className='object-contain'
              />
            </figure>
          ))}
        </section>

        <div
          className='flex flex-col items-center w-full py-8
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
                <Image
                  src={toCloudinarySrc(thumbnail.src, 'good')}
                  alt={thumbnail.alt}
                  fill
                  sizes='(max-width: 767px) 72vw, 25vw'
                  className='object-cover'
                />
              </figure>
            );
          })}
        </div>

        <div className='flex flex-col px-1 gap-y-2.5'>
          <figure className='relative w-full aspect-800/486'>
            <Image
              src={toCloudinarySrc(BLITMAP_PROCESS_WORK_CHARACTERS_SRC, 'good')}
              alt='Blitmap Process Work Characters'
              fill
              sizes='100vw'
              className='object-contain'
            />
          </figure>

          <section className='flex gap-x-1'>
            {BLITMAP_PROCESS_WORK_SKETCHES.map(sketch => (
              <figure key={sketch.src} className='relative w-1/2 aspect-2/3'>
                <Image
                  src={toCloudinarySrc(sketch.src, 'good')}
                  alt={sketch.alt}
                  fill
                  sizes='50vw'
                  className='object-contain'
                />
              </figure>
            ))}
          </section>

          <section className='flex flex-col gap-y-2.5 tablet:gap-y-3 laptop:gap-y-4'>
            <div className='flex gap-x-1'>
              {BLITMAP_PROCESS_WORK_COVERS.map(cover => (
                <figure key={cover.src} className='relative w-1/3 aspect-2/3'>
                  <Image
                    src={toCloudinarySrc(cover.src, 'good')}
                    alt={cover.alt}
                    fill
                    sizes='33vw'
                    className='object-contain'
                  />
                </figure>
              ))}
            </div>
            <p className='italic font-medium text-primary/85
              text-sm tablet:text-base laptop:text-xl text-balance text-center'
            >
              Black-and-white variations for rapid cover ideation
            </p>
          </section>
        </div>
      </WhiteboardBackground>
    </article>
  )
}
