'use client';

import { motion, Variants } from 'motion/react';
import { ReactNode, ElementType, memo } from 'react';

// Configurations
const FADE_UP_UI_PX_TRANSLATION = 10;
const FADE_UP_ART_PX_TRANSLATION = 30;
const FADE_IN_DURATION = 0.3;

// UI Timing
const UI_DURATION = 0.4;
const UI_EASE = [0.2, 0.65, 0.3, 0.9] as const;

// Art Timing
const ART_DURATION = 1.0;
const ART_EASE = [0.25, 0.4, 0.25, 1] as const;

const FADE_UP_UI_VARIANTS: Variants = {
  hidden: { opacity: 0, y: FADE_UP_UI_PX_TRANSLATION },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: UI_DURATION, ease: UI_EASE }
  }
};

const FADE_UP_ART_VARIANTS: Variants = {
  hidden: { opacity: 0, y: FADE_UP_ART_PX_TRANSLATION },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ART_DURATION, ease: ART_EASE }
  }
};

export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: FADE_IN_DURATION, ease: 'easeOut' }
  }
};

type ValidTag = 'div' | 'section' | 'main' | 'span' | 'header' | 'footer' | 'nav';

interface FadeProps {
  children: ReactNode;
  type?: 'up' | 'in';
  speed?: 'ui' | 'art';
  delay?: number;
  as?: ValidTag;
  inView?: boolean;
  className?: string;
}

function Fade({
  children,
  type = 'up',
  speed ='ui',
  delay = 0,
  as = 'div' as ValidTag,
  inView = false,
  className = '',
}: FadeProps) {
  const Component = motion[as] as ElementType;

  let selectedVariant = FADE_UP_UI_VARIANTS;
  if (type === 'in') {
    selectedVariant = FADE_IN_VARIANTS;
  } else if (speed === 'art') {
    selectedVariant = FADE_UP_ART_VARIANTS;
  }

  // inView - apply scroll-trigger props
  const triggerProps = inView ? {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin: '0px 0px -40px 0px' },
    transition: { delay: delay }
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