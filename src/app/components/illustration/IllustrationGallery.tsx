'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import GalleryImage from '../utils/GalleryImage';

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
    </>
  )
}