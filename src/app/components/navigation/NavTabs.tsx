'use client';

import Link from 'next/link';
import { NAV_TABS } from '../../lib/constants';
import { usePathname } from 'next/navigation';

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <div className='flex gap-x-8'>
      {NAV_TABS.map(nav => (
        <Link
          key={nav.href}
          href={nav.href}
          className={`text-lg font-normal text-primary/85
            ${(pathname.startsWith(nav.href) || pathname === '/')
              ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }
            hover:text-accent transition-all duration-300`}
        >
          {nav.label}
        </Link>
      ))}
    </div>
  )
}