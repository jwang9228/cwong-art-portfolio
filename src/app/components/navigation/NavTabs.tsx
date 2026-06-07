import Link from 'next/link';
import { NAV_TABS } from '../../lib/constants';

export default function NavTabs() {
  return (
    <div className='flex gap-x-8'>
      {NAV_TABS.map(nav => (
        <Link
          key={nav.href}
          href={nav.href}
          className='text-lg font-normal'
        >
          {nav.label}
        </Link>
      ))}
    </div>
  )
}