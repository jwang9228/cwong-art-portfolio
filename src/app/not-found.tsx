import Link from 'next/link';
import Fade from './components/utils/Fade';

export default function NotFound() {
  return (
    <Fade
      as='main'
      className='flex flex-col h-[70dvh] items-center justify-center gap-y-4
        px-6'
    >
      <h1 className='font-accent text-4xl tablet:text-5xl laptop:text-6xl'>
        404
      </h1>
      <p className='text-primary/85 laptop:text-lg font-normal max-w-md'>
        This page doesn’t exist.
      </p>
      <Link
        href='/'
        className='w-fit px-4 py-2.5 my-2.5 tablet:my-3 laptop:my-4 
            text-sm tablet:text-base text-background bg-primary 
            font-medium tracking-widest'
      >
        Back home
      </Link>
    </Fade>
  );
}