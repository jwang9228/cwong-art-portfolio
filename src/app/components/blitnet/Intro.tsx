'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

const INTRO_HOLD_MS = 500;
const ZOOM_START_TIME_SEC = 1.7;

interface IntroProps {
  videoSrc: string;
  posterSrc: string;
  children?: ReactNode;
}

// playing: the intro video is on screen
// exiting: the video zooms and fades out
// done: the intro is removed and children (if any) are shown
type IntroState = 'playing' | 'exiting' | 'done';

export default function Intro({ videoSrc, posterSrc, children }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introState, setIntroState] = useState<IntroState>('playing');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let timeoutId = 0;
    const holdStarted = performance.now();

    const playAfterHold = () => {
      if (cancelled) return;

      const remaining = INTRO_HOLD_MS - (performance.now() - holdStarted);
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        video.play().catch(() => {
          // Throws if autoplay blocked, just ignore silently
        });
      }, Math.max(0, remaining));
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playAfterHold();
    } else {
      video.addEventListener('loadeddata', playAfterHold, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      video.removeEventListener('loadeddata', playAfterHold);
    };
  }, []);

  // Start zoom after ZOOM_START_TIME_SEC; first transitionend marks done.
  // Not gated on introState so the listener survives 'playing' -> 'exiting'.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== video) return;
      video.removeEventListener('transitionend', handleTransitionEnd);
      setIntroState('done');
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= ZOOM_START_TIME_SEC) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('transitionend', handleTransitionEnd);
        setIntroState('exiting');
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);

  if (introState === 'done') return <>{children}</>;

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <video
        ref={videoRef}
        className={`px-4 w-auto h-auto 
          object-contain [image-rendering:pixelated]
          ${introState === 'exiting'
            ? 'scale-[2.5] opacity-0 transition-all duration-1000 ease-in-out'
            : 'scale-100 opacity-100'}`}
        muted
        playsInline
        preload='auto'
        poster={posterSrc}
        src={videoSrc}
      />
    </div>
  );
}
