'use client';

import { motion, useInView } from 'motion/react';
import { ReactNode, ElementType, memo, useRef } from 'react';

// Configurations
const FADE_UP_UI_PX_TRANSLATION = 10;
const FADE_IN_DURATION = 0.3;

// UI Timing
const UI_DURATION = 0.4;
const UI_EASE = [0.2, 0.65, 0.3, 0.9] as const;

// Art Timing
const ART_DURATION = 0.65;
const ART_EASE = [0.16, 1, 0.3, 1] as const;

type FadeEase = readonly [number, number, number, number] | string;

type FadeVariant = {
  hidden: { opacity: number; y?: number };
  show: {
    opacity: number;
    y?: number;
    transition: { duration: number; ease: FadeEase; delay?: number };
  };
};

const FADE_UP_UI_VARIANTS: FadeVariant = {
  hidden: { opacity: 0, y: FADE_UP_UI_PX_TRANSLATION },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: UI_DURATION, ease: UI_EASE }
  }
};

// Opacity-only — gallery tiles reveal in place (no translation) so
// independently-loading tiles don't visibly shift at different times.
const FADE_ART_VARIANTS: FadeVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: ART_DURATION, ease: ART_EASE }
  }
};

const FADE_IN_VARIANTS: FadeVariant = {
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
  speed = 'ui',
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
  const revealed = isIntersecting && ready;

  const selectedVariant = type === 'in'
    ? FADE_IN_VARIANTS
    : speed === 'art'
      ? FADE_ART_VARIANTS
      : FADE_UP_UI_VARIANTS;

  // Delay stays on the variant. A transition prop on the element would
  // replace this and drop the duration and ease.
  const variants: FadeVariant = inView
    ? {
        ...selectedVariant,
        show: {
          ...selectedVariant.show,
          transition: { ...selectedVariant.show.transition, delay },
        },
      }
    : selectedVariant;

  const triggerProps = inView ? {
    ref,
    initial: 'hidden' as const,
    animate: revealed ? 'show' as const : 'hidden' as const,
  } : {};

  return (
    <Component 
      variants={variants} 
      className={className}
      {...triggerProps}
    >
      {children}
    </Component>
  )
}

export default memo(Fade);
