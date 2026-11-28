import type { CSSProperties } from 'react';
import Fade from '../../components/utils/Fade';
import RevealImage from '../../components/utils/RevealImage';
import { fetchCloudinaryImageMetaMap } from '../../lib/cloudinary';
import { cloudinaryAspectRatioStyle } from '../../lib/cloudinary-image';
import {
  GENSHIN_TAROT_BOX_HERO,
  GENSHIN_TAROT_RAZOR_DESK,
  GENSHIN_TAROT_RAZOR_CARD,
} from '../../lib/constants';

const GENSHIN_TAROT_RAZOR_IMAGES = [
  GENSHIN_TAROT_RAZOR_CARD,
  GENSHIN_TAROT_RAZOR_DESK,
] as const;

const GENSHIN_TAROT_IMAGE_SRCS = [
  GENSHIN_TAROT_BOX_HERO.src,
  ...GENSHIN_TAROT_RAZOR_IMAGES.map((image) => image.src),
] as const;

// 1 col mobile, 2 cols tablet (card + desk share a row), 3 cols laptop.
const RAZOR_IMAGE_SIZES = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';
const HERO_IMAGE_SIZES = '(max-width: 1023px) 100vw, 33vw';

export default async function GenshinTarot() {
  const images = await fetchCloudinaryImageMetaMap(
    GENSHIN_TAROT_IMAGE_SRCS,
    'genshin-tarot-images',
  );
  const hero = images[GENSHIN_TAROT_BOX_HERO.src];

  return (
    <article className='flex flex-col gap-y-6 tablet:gap-y-8 p-2'>
      <Fade
        as='header'
        speed='ui'
        inView
        className='flex flex-col gap-y-2 text-center text-balance'
      >
        <h1 className='text-xl tablet:text-2xl laptop:text-3xl font-semibold'>
          Genshin Tarot
        </h1>
        <p className='font-normal text-base tablet:text-lg'>
          Card illustration for a fan-made Genshin Impact tarot game
        </p>
      </Fade>
      <section className='flex flex-col gap-y-3'>
        <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2'>
          <figure
            className='relative w-full tablet:col-span-2 laptop:col-span-1
              tablet:max-h-[45dvh] laptop:max-h-dvh'
            style={cloudinaryAspectRatioStyle(hero)}
          >
            <RevealImage
              fill
              src={GENSHIN_TAROT_BOX_HERO.src}
              alt={GENSHIN_TAROT_BOX_HERO.alt}
              sizes={HERO_IMAGE_SIZES}
              className='object-cover'
              quality='best'
              priority
              blurDataURL={hero?.blurDataURL}
            />
          </figure>

          {GENSHIN_TAROT_RAZOR_IMAGES.map((image) => (
            <figure
              key={image.src}
              className='relative w-full laptop:min-h-0
                aspect-(--razor-aspect) laptop:aspect-auto'
              style={{
                '--razor-aspect':
                  cloudinaryAspectRatioStyle(images[image.src])?.aspectRatio ?? 'auto',
              } as CSSProperties}
            >
              <RevealImage
                fill
                src={image.src}
                alt={image.alt}
                sizes={RAZOR_IMAGE_SIZES}
                className='object-cover'
                quality='best'
                blurDataURL={images[image.src]?.blurDataURL}
              />
            </figure>
          ))}
        </div>

        <p className='font-normal text-primary/85
          text-base tablet:text-lg text-center text-balance'
        >
          Razor as the Page of Swords, card design and illustration
        </p>
      </section>
    </article>
  )
}
