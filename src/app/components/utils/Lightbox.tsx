'use client';

import { motion, Transition } from 'motion/react';
import Image from 'next/image';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RemoveScroll } from 'react-remove-scroll';
import { toCloudinarySrc } from '../../lib/cloudinary-image';

const lightboxTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1]
} as Transition;

export default function Lightbox({
  selectedImage,
  selectedImageIndex,
  resourcesLength,
  lightboxReady,
  onClose,
  onNext,
  onPrev,
  onLoaded,
}: {
  selectedImage: any;
  selectedImageIndex: number;
  resourcesLength: number;
  lightboxReady: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onLoaded: () => void;
}) {
  return (
    <>
      <div className='fixed inset-0 pointer-events-none text-primary/70 z-80'>
        <IoMdClose
          onClick={onClose}
          className='fixed top-4.5 tablet:top-5 laptop:top-7 right-4.5 tablet:right-5.5 laptop:right-7
            size-8 tablet:size-9 cursor-pointer pointer-events-auto' />

        <IoIosArrowBack
          onClick={onPrev}
          className={`hidden tablet:block absolute 
            left-6 laptop:left-10 desktop:left-14 top-1/2 -translate-y-1/2 
            size-8 laptop:size-10 cursor-pointer pointer-events-auto transition-colors duration-200 
            ${selectedImageIndex == 0 && 'text-primary/25'}`} />

        <IoIosArrowForward
          onClick={onNext}
          className={`hidden tablet:block absolute 
            right-6 laptop:right-10 desktop:right-14 top-1/2 -translate-y-1/2 
            size-8 laptop:size-10 cursor-pointer pointer-events-auto transition-colors duration-200 
            ${selectedImageIndex == resourcesLength - 1 && 'text-primary/25'}`} />
      </div>

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
              onNext();
            } else if (offset.x > swipeThreshold) {
              onPrev();
            } else if (offset.y < -swipeThreshold) {
              onClose();
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
                onLoaded();
              }
            }}
          />
        </motion.div>
      </RemoveScroll>
    </>
  );
}
