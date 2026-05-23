import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import HeaderMobile from './HeaderMobile';
import HeaderFull from './HeaderFull';
import FadeContent from '../utils/FadeContent';

export default function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname === '/' 
    ? '' : pathname.slice(1).split('/')[0]
  );

  const headerSections = [
    {
      name: 'Illustration',
      href: '/illustration'
    },
    {
      name: 'Concept',
      href: '/concept'
    },
    {
      name: 'Professional Work',
      href: '/work'
    },
    {
      name: 'About',
      href: '/about'
    }
  ];

  useEffect(() => {
    const newTab = pathname === '/' 
      ? '' : pathname.slice(1).split('/')[0];
    setActiveTab(newTab);
  }, [pathname]);

  return (
    <>
      <FadeContent 
        delay={1500} 
        duration={400} 
        className='block tablet:hidden absolute z-50
          top-0 left-0 right-0 px-6 laptop:px-10 py-6 laptop:py-8'
      >
        <HeaderMobile 
          headerSections={headerSections}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isHome={activeTab === ''}
        />
      </FadeContent>
      <FadeContent 
        delay={1500} 
        duration={400} 
        className='hidden tablet:block absolute z-50
          top-0 left-0 right-0 px-18 py-10
          animate-drop-down [animation-delay:1.5s] [animation-duration:1s]'
      >
        <HeaderFull 
          headerSections={headerSections}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </FadeContent>
    </>
  )
}