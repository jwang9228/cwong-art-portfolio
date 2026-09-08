'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import GalleryImage from './GalleryImage';
import Image from 'next/image';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RemoveScroll } from 'react-remove-scroll';
import {
  CLOUDINARY_LIGHTBOX_MAX_WIDTH,
  getCloudinaryUrl,
  toCloudinarySrc
} from '../../lib/cloudinary-image';

const lightboxTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1]
} as Transition;

// Match next/image default deviceSizes (capped by our loader max).
const LIGHTBOX_SRC_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 2560];

function getLightboxWidth() {
  const target = Math.min(
    window.innerWidth * (window.devicePixelRatio || 1),
    CLOUDINARY_LIGHTBOX_MAX_WIDTH
  );
  return LIGHTBOX_SRC_WIDTHS.find((size) => size >= target)
    ?? CLOUDINARY_LIGHTBOX_MAX_WIDTH;
}

function preloadLightboxImage(resource: { public_id: string; version?: number | string }) {
  const preload = new window.Image();
  preload.src = getCloudinaryUrl({
    src: toCloudinarySrc(resource, 'best'),
    width: getLightboxWidth(),
  });
}

export default function Gallery({ 
  resources, 
  columnClass = 'columns-2 laptop:columns-3',
  sizes = '(max-width: 1024px) 50vw, 33vw',
} : { 
  resources: any[], 
  columnClass?: string,
  sizes?: string,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxReady, setLightboxReady] = useState(false);
  const selectedImage = selectedImageIndex != null ? resources[selectedImageIndex] : null;

  const setNextImage = () => {
    if (selectedImageIndex != null && selectedImageIndex < resources.length - 1) {
      setLightboxReady(false);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const setPrevImage = () => {
    if (selectedImageIndex != null && selectedImageIndex > 0) {
      setLightboxReady(false);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const openLightbox = useCallback((index: number) => {
    preloadLightboxImage(resources[index]);
    setLightboxReady(false);
    setSelectedImageIndex(index);
  }, [resources]);

  useEffect(() => {
    setLightboxReady(false);
  }, [selectedImageIndex]);

  useEffect(() => {
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

  useEffect(() => {
    if (selectedImageIndex == null) return;

    [selectedImageIndex - 1, selectedImageIndex + 1]
      .filter((index) => index >= 0 && index < resources.length)
      .forEach((index) => preloadLightboxImage(resources[index]));
  }, [selectedImageIndex, resources]);

  return (
    <> 
      <section className={`${columnClass} gap-1 [&_>_*:not(:last-child)]:mb-0.5 mx-0.5`}>
        {resources.map((image: any, index: number) => (
          <motion.div 
            key={image.asset_id} 
            onClick={() => openLightbox(index)}
            onPointerEnter={() => preloadLightboxImage(image)}
            className='break-inside-avoid cursor-zoom-in'
          >
            <GalleryImage
              image={image}
              alt='Gallery Image'
              sizes={sizes}
              inView   
              priority={index < 4}    
            />
          </motion.div>
        ))}
      </section>

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
              transition={lightboxTransition}
              className='absolute inset-0 bg-background/90'
            />

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: lightboxReady ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={lightboxTransition}
              className='relative size-full flex items-center justify-center
                p-6 tablet:p-24 text-primary/70'
              onPanEnd={(_, { offset }) => {
                const swipeThreshold = 50;
                
                if (offset.x < -swipeThreshold) {
                  setNextImage();
                } else if (offset.x > swipeThreshold) {
                  setPrevImage();
                } else if (offset.y < -swipeThreshold) {
                  setSelectedImageIndex(null)
                }
              }}
            >
              <Image
                key={selectedImageIndex}
                src={toCloudinarySrc(selectedImage, 'best')}
                alt='Focused Image'
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                sizes='100vw'
                className='size-auto max-w-full max-h-full object-contain shadow-xl'
                onClick={(e) => e.stopPropagation()}
                onLoad={(e) => {
                  if (e.currentTarget.naturalWidth > 0) {
                    setLightboxReady(true);
                  }
                }}
              />
            </motion.div>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </>
  )
}
