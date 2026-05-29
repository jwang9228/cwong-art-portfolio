'use client';

import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { PORTFOLIO_NAME } from '../../lib/constants';

export default function PageHeader() {
  return (
    <header className='flex justify-between items-center py-2.5'>
      <Link 
        href={'/'}
        className='text-lg uppercase font-semibold tracking-wider px-6'
      >
        {PORTFOLIO_NAME}
      </Link>
      <div className='px-5'>
        <HeaderMenu />
      </div>
    </header>
  )
}