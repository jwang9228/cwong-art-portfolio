import { PROJECTS } from '../../lib/constants';
import Fade from '../utils/Fade';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Work() {
  return (
    <div className='grid grid-cols-1 laptop:grid-cols-3 px-3 gap-2'>
      {PROJECTS.map(project => (
        <Fade 
          key={project.thumbnail} 
          type='in' 
          className='relative h-[30dvh] laptop:h-[80dvh]
            rounded-xl overflow-hidden'
        >
          <Image
            src={project.thumbnail}
            alt={project.label}
            fill
            priority
            className='object-cover'
          />

          <div className='absolute inset-x-0 bottom-0 h-1/4
            bg-linear-to-t from-black/60 to-transparent backdrop-blur-sm 
            [-webkit-mask-image:linear-gradient(to_top,black_50%,transparent_100%)]
            mask-[linear-gradient(to_top,black_50%,transparent_100%)]'
          />

          <div className='absolute bottom-3 right-4 laptop:bottom-5 laptop:right-6
            flex items-center gap-x-2
            text-background/90 text-lg laptop:text-xl font-semibold tracking-wide'>
            {project.label}
            <FiArrowUpRight className='text-background/70 translate-y-px laptop:size-6.5' />
          </div>
        </Fade>
      ))}
    </div>
  )
}