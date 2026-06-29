import Link from 'next/link';
import { COPYRIGHT, SOCIALS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className='flex flex-col items-center layout-px layout-py 
      gap-y-6 tablet:gap-y-8'
    >
      <div className='flex justify-start items-center gap-x-10 tablet:gap-x-12'>
        {SOCIALS.map(social => {
          const Icon = social.icon

          return (
            <Link
              key={social.href}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon className='text-primary hover:text-accent
                transition-colors duration-300 size-7 tablet:size-9' />
            </Link>
          )
        })}
      </div>
      <span className='text-xs text-primary/90 font-normal'>
        {COPYRIGHT}
      </span>
    </footer>
  )
}