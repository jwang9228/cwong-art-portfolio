import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
import FadeContent from '../utils/FadeContent';

export default function HeaderMobile({
  headerSections, activeTab, setActiveTab
}) {
  const [showMenu, setShowMenu] = useState(false);
  
  // 1. Create a key state to force re-renders of the content
  const [menuKey, setMenuKey] = useState(0);

  const handleOpen = () => {
    setMenuKey(prev => prev + 1); // Increment key to restart animations
    setShowMenu(true);
  };

  const handleClose = () => {
    setShowMenu(false);
    // Do NOT change the key here. This ensures the content 
    // stays static (doesn't flicker) while sliding out.
  };

  return (
    <>
      <header className='flex justify-between items-center'>
        <IoIosMenu 
          className='size-10 cursor-pointer' 
          onClick={handleOpen}
        />
        <Link 
          href={'/'} 
          className='text-2xl font-bold'
        >
          Courtney Wong
        </Link>
      </header>
      
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500
          ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleClose}
      />
      <div 
        className={`fixed top-0 left-0 z-50 w-[85%] h-full bg-stone-200 text-zinc-800 shadow-lg 
          transform transition-transform duration-500 ease-in-out
          ${showMenu ? 'translate-x-0' : '-translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <nav key={menuKey} className='flex flex-col pl-10 pr-8 py-8 gap-y-10'>
          <FadeContent delay={400} duration={500}>
            <IoCloseOutline 
              className='ml-auto size-7 cursor-pointer' 
              onClick={handleClose}
            />
          </FadeContent>
          {headerSections.map((headerSection, i) =>
            <FadeContent 
              delay={250 + (150 * i)} 
              duration={450}
              key={headerSection.name}
              className={`animate-lift-up [animation-delay:${0.25 + (0.15 * i)}s] [animation-duration:1s]`}
            >
              <Link 
                key={headerSection.name} 
                href={headerSection.href}
                onClick={() => {
                  setActiveTab(headerSection.name);
                  handleClose();
                }}
                className={`text-xl
                  ${activeTab.toLowerCase() === headerSection.name.toLowerCase() 
                    && 'text-zinc-400'}`}
              >
                {headerSection.name}
              </Link>
            </FadeContent>
          )}
        </nav>
      </div>
    </>
  )
}