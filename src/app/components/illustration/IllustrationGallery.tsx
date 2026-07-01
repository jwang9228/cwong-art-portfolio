'use client';

import { useState } from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import GalleryImage from '../utils/GalleryImage';
import Image from 'next/image';

const layoutTransition = {
  type: 'spring',
  stiffness: 1000,
  damping: 80,
} as Transition;

export default function IllustrationGallery({ resources } : { resources: any[] }) {
  // Track current image in 'focus' - expand and show in main viewport
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  return (
    <> 
      <section className='columns-2 laptop:columns-3 gap-1 [&_>_*:not(:last-child)]:mb-1'>
        {resources.map((image: any, index: number) => (
          <motion.div 
            key={image.asset_id} 
            layoutId={`gallery-image-${image.asset_id}`}
            transition={layoutTransition}
            onClick={() => setSelectedImage(image)}
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

      <AnimatePresence>
        {selectedImage && (
          <div className='fixed inset-0 z-70 flex items-center justify-center'>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className='absolute inset-0 bg-white/85 cursor-pointer'
            />

            <motion.div
              layoutId={`gallery-image-${selectedImage.asset_id}`}
              transition={layoutTransition}
              className='relative w-full max-h-[90vh] flex items-center justify-center p-5'
            >
              <Image
                src={selectedImage.secure_url}
                alt='Focused Image'
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                sizes='100vw'
                className='w-full max-h-[90vh] object-contain shadow-xl'
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}