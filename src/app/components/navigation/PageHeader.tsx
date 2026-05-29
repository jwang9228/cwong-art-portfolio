'use client';

import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import Fade from '../utils/Fade';

export default function PageHeader() {
  return (
    // TODO: this is not triggering?
    <Fade 
      type='in' 
      as='header' 
      className=''
    >
      <Link 
        href={'/'}
        className=''
      >
        Signature Icon
      </Link>
      <HeaderMenu />
    </Fade>
  )
}