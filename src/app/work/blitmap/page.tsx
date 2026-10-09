import { 
  BLITMAP_LANDING_IMAGE_SRC,
  BLITMAP_ISSUE_5_COVERS,
  BLITMAP_PROCESS_WORK_CHARACTERS_SRC,
  BLITMAP_PROCESS_WORK_SKETCHES,
  BLITMAP_PROCESS_WORK_COVERS
} from '../../lib/constants';
import Image from 'next/image';
import { toCloudinarySrc } from '../../lib/cloudinary-image';
import WhiteboardBackground from '../../components/utils/WhiteboardBackground';

export default function Blitmap() {
  return (
    <article className='flex flex-col font-mono'>
      <figure className='relative h-[70vh] tablet-[80vh] laptop:h-screen w-full'>
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
        <header className='flex flex-col gap-y-2 pt-4 text-center'>
          <h1 className='flex justify-center gap-x-1.5 text-lg font-semibold tracking-tighter'>
            <span>Blitmap:</span>
            <span>Fragments of the Machine</span>
          </h1>
          <p className='font-medium'>SUP/BLITMAP x Titan Comics</p>
        </header>

        <section className='flex w-full py-4'>
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

        <div className='flex justify-center items-center w-full'>
          <div className='w-1/2 h-20 bg-primary/20 rounded-md' />
        </div>

        <div className='flex flex-col px-1'>
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

          <section className='flex gap-x-1'>
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
          </section>
        </div>
        <p className='text-balance text-center font-medium p-2'>
            Black-and-white variations for rapid cover ideation
        </p>
      </WhiteboardBackground>
    </article>
  )
}
