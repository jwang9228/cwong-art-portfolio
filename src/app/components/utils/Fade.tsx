'use client';
import { motion, Variants } from 'motion/react';
import { ReactNode, ElementType, memo } from 'react';

const FADE_UP_PX_TRANSLATION = 20;
const FADE_UP_DURATION = 0.45;
const FADE_UP_EASE = 'easeOut';
const FADE_IN_DURATION = 0.25;
const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: FADE_UP_PX_TRANSLATION },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: FADE_UP_DURATION,
      ease: FADE_UP_EASE
    }
  }
};

export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: FADE_IN_DURATION,
      ease: 'easeOut'
    }
  }
};

type ValidTag = 'div' | 'section' | 'main' | 'span' | 'header' | 'footer' | 'nav';

interface FadeProps {
  children: ReactNode;
  type?: 'up' | 'in';
  as?: ValidTag;
  inView?: boolean;
  className?: string;
}

function Fade({
  children,
  type = 'up',
  as = 'div' as ValidTag,
  inView = false,
  className = '',
}: FadeProps) {
  const Component = motion[as] as ElementType;

  const selectedVariant = type === 'up' ? FADE_UP_VARIANTS : FADE_IN_VARIANTS;

  // If inView true, apply scroll-trigger props - only apply animation when component
  // is in the viewport, only render once and when at least 20% of the component is on screen
  const triggerProps = inView ? {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0 }
  } : {};

  return (
    <Component 
      variants={selectedVariant} 
      className={className}
      {...triggerProps}
    >
      {children}
    </Component>
  )
}

export default memo(Fade);