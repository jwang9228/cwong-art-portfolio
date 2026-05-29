import { useState } from 'react';
import { motion } from 'motion/react';
import NavigationDrawer from './NavigationDrawer';

const MENU_SIZE = 'size-12'; // Clickable hitbox size

// Dimensions
const LINE_WIDTH_CLOSED = '24px';
const LINE_WIDTH_OPEN = '28px';
const LINE_HEIGHT_CLOSED = 2; // in px
const LINE_HEIGHT_OPEN = 3;   // in px

// Spacing Calculations
const Y_OFFSET = 5;

// Animation Properties
const ROTATION_DEGREES = 45;
const ANIM_DURATION = 0.3;
const ANIM_EASE = [0.22, 1, 0.36, 1] as const;

interface HeaderMenuProps {
  transitionColors?: boolean;
}

export default function HeaderMenu({ transitionColors = false } : HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-60 flex justify-center items-center 
          ${MENU_SIZE} focus:outline-none opacity-90`}
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
          className={`absolute rounded-full origin-center transition-colors duration-300
            ${transitionColors && !isOpen ? 'bg-background/80' : 'bg-primary/85'}`}
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
          className={`absolute rounded-full origin-center transition-colors duration-300
            ${transitionColors && !isOpen ? 'bg-background/80' : 'bg-primary/85'}`}
        />
      </button>

      <NavigationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}