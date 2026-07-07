'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import GalleryImage from '../utils/GalleryImage';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { RemoveScroll } from 'react-remove-scroll';

const fadeVariants = {
  enter: { opacity: 0.2 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1]
} as Transition;

export default function IllustrationGallery({ resources } : { resources: any[] }) {
  // Track current image in 'focus' - expand and show in main viewport
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const selectedImage = selectedImageIndex != null ? resources[selectedImageIndex] : null;

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
          setSelectedImageIndex(selectedImageIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedImageIndex > 0) {
          setSelectedImageIndex(selectedImageIndex - 1);
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
            className='break-inside-avoid cursor-zoom-in'
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

      {selectedImage && (
        <IoMdClose 
          onClick={() => setSelectedImageIndex(null)}
          className='fixed top-4.5 tablet:top-5 right-4.5 tablet:right-5.5 z-80 
            size-8 tablet:size-9 text-primary/70 cursor-pointer' />
      )}

      <AnimatePresence>
        {selectedImage && (
          <RemoveScroll className='fixed inset-0 z-70 flex items-center justify-center'>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
       
              className='absolute inset-0 bg-background/90 cursor-pointer'
            />

            <motion.div
              key={selectedImageIndex}
              variants={fadeVariants}
              transition={transition}
              initial='enter'
              animate='center'
              exit='exit'
              className='relative size-full flex items-center justify-center
                p-6 tablet:p-24'
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