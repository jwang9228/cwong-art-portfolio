'use client';

import { useState } from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import GalleryImage from '../utils/GalleryImage';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { RemoveScroll } from 'react-remove-scroll';

const layoutTransition = {
  type: 'spring',
  stiffness: 1000,
  damping: 80,
} as Transition;

export default function IllustrationGallery({ resources } : { resources: any[] }) {
  // Track current image in 'focus' - expand and show in main viewport
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const selectedImage = selectedImageIndex != null ? resources[selectedImageIndex] : null;

  return (
    <> 
      <section className='columns-2 laptop:columns-3 gap-1 [&_>_*:not(:last-child)]:mb-1'>
        {resources.map((image: any, index: number) => (
          <motion.div 
            key={image.asset_id} 
            layoutId={`gallery-image-${image.asset_id}`}
            transition={layoutTransition}
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
          className='fixed top-4.5 right-4.5 z-80 
            size-8 text-primary/80 cursor-pointer' />
      )}

      <AnimatePresence>
        {selectedImage && (
          <RemoveScroll className='fixed inset-0 z-70 flex items-center justify-center'>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className='absolute inset-0 bg-white/90 cursor-pointer'
            />

            <motion.div
              layoutId={`gallery-image-${selectedImage.asset_id}`}
              transition={layoutTransition}
              className='relative w-full max-h-dvh flex items-center justify-center px-5'
            >
              <Image
                src={selectedImage.secure_url}
                alt='Focused Image'
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                sizes='100vw'
                className='w-full max-h-dvh object-contain shadow-2xl'
              />
            </motion.div>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </>
  )
}