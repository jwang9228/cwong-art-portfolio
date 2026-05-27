import { useState } from 'react';
import { motion } from 'framer-motion';
import Fade from '../utils/Fade';

const MENU_SIZE = 'size-10'; // Clickable hitbox size

// Dimensions
const LINE_WIDTH_CLOSED = '20px';
const LINE_WIDTH_OPEN = '24px';
const LINE_HEIGHT_CLOSED = 2; // in px
const LINE_HEIGHT_OPEN = 3;   // in px

// Spacing Calculations
const Y_OFFSET = 4;

// Animation Properties
const ROTATION_DEGREES = 45;
const ANIM_DURATION = 0.3;
const ANIM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fade type='in' as='header' className='absolute top-0 right-0 z-50 p-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex justify-center items-center 
          ${MENU_SIZE} focus:outline-none opacity-85`}
      >
        <motion.span
          initial={false}
          animate={{
            y: isOpen ? 0 : -Y_OFFSET,
            rotate: isOpen ? ROTATION_DEGREES : 0,
            width: isOpen ? LINE_WIDTH_OPEN : LINE_WIDTH_CLOSED,
            height: isOpen ? `${LINE_HEIGHT_OPEN}px` : `${LINE_HEIGHT_CLOSED}px`,
          }}
          transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
          className='absolute bg-primary rounded-full origin-center'
        />

        <motion.span
          initial={false}
          animate={{
            y: isOpen ? 0 : Y_OFFSET,
            rotate: isOpen ? -ROTATION_DEGREES : 0,
            width: isOpen ? LINE_WIDTH_OPEN : LINE_WIDTH_CLOSED,
            height: isOpen ? `${LINE_HEIGHT_OPEN}px` : `${LINE_HEIGHT_CLOSED}px`,
          }}
          transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
          className='absolute bg-primary rounded-full origin-center'
        />
      </button>
    </Fade>
  );
}