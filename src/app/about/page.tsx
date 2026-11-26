import Link from 'next/link';
import HelloSignature from '../components/about/HelloSignature';
import Fade from '../components/utils/Fade';
import RevealImage from '../components/utils/RevealImage';
import { EMAIL, SELF_PORTRAIT_SRC } from '../lib/constants';
import { fetchCloudinaryImageMetaMap } from '../lib/cloudinary';

export default async function Page() {
  const images = await fetchCloudinaryImageMetaMap(
    [SELF_PORTRAIT_SRC.src],
    'about-portrait',
  );
  const meta = images[SELF_PORTRAIT_SRC.src];

  return (
    <div className='flex flex-col px-6 py-6 tablet:py-8 laptop:py-10 
      gap-y-10 tablet:gap-y-12 laptop:gap-y-14'>
      <Fade
        as='header'
        className='flex flex-col items-center gap-y-8 tablet:gap-y-10'
      >
        <HelloSignature />
        <figure
          className='relative size-72 tablet:size-80 ring-1 ring-primary/50
            rounded-full overflow-hidden'
        >
          <RevealImage
            fill
            src={SELF_PORTRAIT_SRC.src}
            alt={SELF_PORTRAIT_SRC.alt}
            sizes='(min-width: 767px) 320px, 288px'
            className='object-cover object-[center_25%]'
            blurDataURL={meta?.blurDataURL}
          />
        </figure>
      </Fade>

      <Fade as='section' className='flex flex-col gap-y-3 tablet:gap-y-4
        tablet:max-w-xl tablet:mx-auto tablet:text-lg font-normal'>
        <p>
          My name is Courtney Wong and I am an illustrator and character designer. 
        </p>
        <p>
          I love telling stories with my art and characters, and I hope people who see my work feel some of what I felt making it.
          When I'm not at my desk drawing, you'll probably find me baking, cooking, or playing video games.
        </p>

        <p className='pt-4 tablet:pt-5'>
          I'd love to connect! Please reach out at{' '}
          <Link 
            href={`mailto:${EMAIL}`}
            className='font-medium'
          >
            {EMAIL}
          </Link>
        </p>
      </Fade>
    </div>
  )
}
