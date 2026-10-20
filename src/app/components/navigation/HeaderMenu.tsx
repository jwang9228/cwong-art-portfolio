'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import NavigationDrawer from './NavigationDrawer';

const MENU_SIZE = 'size-12';
const LINE_CLASS = 'absolute rounded-full origin-center bg-primary/85';

const LINE_WIDTH_CLOSED = '24px';
const LINE_WIDTH_OPEN = '28px';
const LINE_HEIGHT_CLOSED = 2;
const LINE_HEIGHT_OPEN = 3;
const Y_OFFSET = 5;

const ROTATION_DEGREES = 45;
const ANIM_DURATION = 0.3;
const ANIM_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeaderMenu() {
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
          className={LINE_CLASS}
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
          className={LINE_CLASS}
        />
      </button>

      <NavigationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}