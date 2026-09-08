'use client';

import { motion, useInView, Variants } from 'motion/react';
import { ReactNode, ElementType, memo, useEffect, useRef, useState } from 'react';

// Configurations
const FADE_UP_UI_PX_TRANSLATION = 10;
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

// Opacity-only — gallery tiles reveal in place (no translation) so
// independently-loading tiles don't visibly shift at different times.
const FADE_ART_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
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

// Viewport margin — how far below the fold an element is still considered 
// "approaching" the viewport.
const IN_VIEW_MARGIN = '0px 0px -40px 0px';

interface FadeProps {
  children: ReactNode;
  type?: 'up' | 'in';
  speed?: 'ui' | 'art';
  delay?: number;
  as?: ValidTag;
  inView?: boolean;
  /**
   * Only relevant when `inView` is true. Gates the reveal alongside
   * viewport intersection so the fade doesn't complete before the
   * wrapped content (e.g. an image) has actually finished loading.
   * Defaults to true (reveal as soon as the element is in view).
   */
  ready?: boolean;
  className?: string;
}

function Fade({
  children,
  type = 'up',
  speed ='ui',
  delay = 0,
  as = 'div' as ValidTag,
  inView = false,
  ready = true,
  className = '',
}: FadeProps) {
  const Component = motion[as] as ElementType;
  const ref = useRef(null);

  // Only observe the viewport when `inView` mode is actually used —
  // other Fade usages rely purely on ancestor variant propagation.
  const isIntersecting = useInView(ref, {
    once: true,
    margin: IN_VIEW_MARGIN,
  });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView && isIntersecting && ready) {
      setRevealed(true);
    }
  }, [inView, isIntersecting, ready]);

  let selectedVariant = FADE_UP_UI_VARIANTS;
  if (type === 'in') {
    selectedVariant = FADE_IN_VARIANTS;
  } else if (speed === 'art') {
    selectedVariant = FADE_ART_VARIANTS;
  }

  // inView - reveal only once both in viewport and ready, instead of
  // Framer's own whileInView (which fires on intersection alone).
  const triggerProps = inView ? {
    ref,
    initial: 'hidden',
    animate: revealed ? 'show' : 'hidden',
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