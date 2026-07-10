'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import GalleryImage from '../utils/GalleryImage';
import Image from 'next/image';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RemoveScroll } from 'react-remove-scroll';

const fadeVariants = {
  enter: { opacity: 0.15 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]
} as Transition;

export default function IllustrationGallery({ resources } : { resources: any[] }) {
  // Track current image in 'focus' - expand and show in main viewport
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const selectedImage = selectedImageIndex != null ? resources[selectedImageIndex] : null;

  const setNextImage = () => {
    if (selectedImageIndex < resources.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const setPrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  useEffect(() => {
    /*
      Keydown Handler:
      - Close on Esc
      - Next image on Right Arrow (stop at last)
      - Prev image on Left Arrow (stop at first)
    */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex == null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        if (selectedImageIndex < resources.length - 1) {
          setNextImage();
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedImageIndex > 0) {
          setPrevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, resources.length]);

  return (
    <> 
      <section className='columns-2 laptop:columns-3 gap-1 [&_>_*:not(:last-child)]:mb-0.5 mx-0.5'>
        {resources.map((image: any, index: number) => (
          <motion.div 
            key={image.asset_id} 
            onClick={() => setSelectedImageIndex(index)}
            className='break-inside-avoid'
          >
            <GalleryImage
              image={image}
              alt='Gallery Image'
              sizes='(max-width: 1024px) 50vw, 33vw'
              inView   
              priority={index < 8}    
            />
          </motion.div>
        ))}
      </section>

      { /* UI Controls - Close / Prev / Next Buttons */}
      {selectedImage && (
        <div className='fixed inset-0 pointer-events-none text-primary/70 z-80'>
          <IoMdClose 
            onClick={() => setSelectedImageIndex(null)}
            className='fixed top-4.5 tablet:top-5 laptop:top-7 right-4.5 tablet:right-5.5 laptop:right-7
              size-8 tablet:size-9 cursor-pointer pointer-events-auto' />

          <IoIosArrowBack 
            onClick={() => setPrevImage()}
            className={`hidden tablet:block absolute 
              left-6 laptop:left-10 desktop:left-14 top-1/2 -translate-y-1/2 
              size-8 laptop:size-10 cursor-pointer pointer-events-auto transition-colors duration-200 
              ${selectedImageIndex == 0 && 'text-primary/25'}`} />

          <IoIosArrowForward
            onClick={() => setNextImage()}
            className={`hidden tablet:block absolute 
              right-6 laptop:right-10 desktop:right-14 top-1/2 -translate-y-1/2 
              size-8 laptop:size-10 cursor-pointer pointer-events-auto transition-colors duration-200 
              ${selectedImageIndex == resources.length - 1 && 'text-primary/25'}`} />
        </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <RemoveScroll className='fixed inset-0 z-70 flex items-center justify-center'>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-background/90'
            />

            <motion.div
              key={selectedImageIndex}
              variants={fadeVariants}
              transition={transition}
              initial='enter'
              animate='center'
              exit='exit'
              className='relative size-full flex items-center justify-center
                p-6 tablet:p-24 text-primary/70'
              onClick={() => setSelectedImageIndex(null)}
            >
              <Image
                src={selectedImage.secure_url}
                alt='Focused Image'
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                sizes='100vw'
                className='size-auto max-w-full max-h-full object-contain shadow-xl'
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </>
  )
}