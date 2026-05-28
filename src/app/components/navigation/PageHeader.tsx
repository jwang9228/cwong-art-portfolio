'use client';

import Link from 'next/link';
import HeaderMenu from './HeaderMenu';

export default function PageHeader() {
  return (
    <header className='flex'>
      <Link 
        href={'/'}
      >
        Signature Icon
      </Link>
      <HeaderMenu />
    </header>
  )
}