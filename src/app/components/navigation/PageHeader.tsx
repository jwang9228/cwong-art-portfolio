import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { NAV_TABS, PORTFOLIO_NAME } from '../../lib/constants';
import NavTabs from './NavTabs';

export default function PageHeader() {
  return (
    <header className='flex justify-between items-center 
      py-2.5 tablet:py-3 laptop:py-base'>
      <Link 
        href={'/'}
        className='text-lg tablet:text-xl uppercase font-bold font-accent 
          tracking-widest px-6 tablet:px-8'
      >
        {PORTFOLIO_NAME}
      </Link>

      <div className='px-5 tablet:px-base laptop:hidden'>
        <HeaderMenu />
      </div>

      <div className='hidden laptop:block px-8'>
        <NavTabs />
      </div>
    </header>
  )
}