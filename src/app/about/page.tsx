import RevealImage from '../components/utils/RevealImage';
import { EMAIL, SELF_PORTRAIT_SRC } from '../lib/constants';
import { fetchCloudinaryImageMetaMap } from '../lib/cloudinary';
import Link from 'next/link';

export default async function Page() {
  const images = await fetchCloudinaryImageMetaMap(
    [SELF_PORTRAIT_SRC.src],
    'about-portrait',
  );
  const meta = images[SELF_PORTRAIT_SRC.src];

  return (
    <div className='flex flex-col gap-y-8 px-6 py-6'>
      <header className='flex flex-col items-center gap-y-5'>
        <h1 className='text-xl'>Hello!</h1>
        <figure
          className='relative size-72 ring-1 ring-primary/40
            rounded-full overflow-hidden'
        >
          <RevealImage
            fill
            src={SELF_PORTRAIT_SRC.src}
            alt={SELF_PORTRAIT_SRC.alt}
            sizes='288px'
            className='object-cover object-[center_25%]'
            blurDataURL={meta?.blurDataURL}
          />
        </figure>
      </header>

      <section className='flex flex-col gap-y-3'>
        <p>
          My name is Courtney Wong and I am an illustrator and character designer. 
        </p>
        <p>
          I love telling stories with my art and characters, and I hope people who see my work feel some of what I felt making it.
          When I'm not at my desk drawing, you'll probably find me baking, cooking, or playing video games.
        </p>
      </section>

      <p>
        I'd love to connect! Please reach out at{' '}
        <Link 
          href={`mailto:${EMAIL}`}
          className='font-medium'
        >
          {EMAIL}
        </Link>
      </p>
    </div>
  )
}
