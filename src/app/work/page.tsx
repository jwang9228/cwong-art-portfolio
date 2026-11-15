import Link from 'next/link';
import { PROJECTS } from '../lib/constants';
import { fetchCloudinaryImageMetaMap } from '../lib/cloudinary';
import Fade from '../components/utils/Fade';
import RevealImage from '../components/utils/RevealImage';
import { FiArrowUpRight } from 'react-icons/fi';

const PROJECT_THUMBNAIL_SRCS = PROJECTS.map((project) => project.thumbnail);

export default async function Page() {
  const images = await fetchCloudinaryImageMetaMap(
    PROJECT_THUMBNAIL_SRCS,
    'work-project-thumbs',
  );

  return (
    <div className='grid grid-cols-1 laptop:grid-cols-3 px-2 gap-2'>
      {PROJECTS.map(project => {
        const meta = images[project.thumbnail];

        return (
          <Fade
            key={project.thumbnail}
            type='in'
            className='relative h-[30dvh] laptop:h-[80dvh]
              rounded-lg overflow-hidden cursor-pointer group'
          >
            <Link href={project.href} className='relative block size-full'>
              <RevealImage
                fill
                src={project.thumbnail}
                alt={project.label}
                sizes='(max-width: 1024px) 100vw, 33vw'
                className='object-cover transition-transform
                  duration-600 ease-out group-hover:scale-105'
                priority
                blurDataURL={meta?.blurDataURL}
              />

              <div className='absolute inset-x-0 bottom-0 h-1/4 tablet:h-1/5 laptop:h-1/10
                bg-linear-to-t from-black/60 to-transparent backdrop-blur-sm 
                [-webkit-mask-image:linear-gradient(to_top,black_50%,transparent_100%)]
                mask-[linear-gradient(to_top,black_50%,transparent_100%)]'
              />

              <div className='absolute bottom-3 right-4 laptop:bottom-5 laptop:right-6
                flex items-center gap-x-2 transform transition-transform duration-600 ease-out
                group-hover:-translate-y-2 font-semibold tracking-wide
                text-background/90 text-lg laptop:text-xl'>
                {project.label}
                <FiArrowUpRight className='text-background/70 translate-y-px laptop:size-6.5' />
              </div>
            </Link>
          </Fade>
        );
      })}
    </div>
  )
}
