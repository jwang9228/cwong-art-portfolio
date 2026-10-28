'use client';

import { useRef, useEffect, useState } from 'react';

const INTRO_HOLD_MS = 500;
const ZOOM_START_TIME_SEC = 1.8;

interface IntroProps {
  videoSrc: string;
  posterSrc: string;
  onComplete?: () => void;
}

// playing: the intro video is on screen
// exiting: the video zooms and fades out
// done: the intro is removed
type IntroState = 'playing' | 'exiting' | 'done';

export default function Intro({ videoSrc, posterSrc, onComplete }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoKey, setVideoKey] = useState(0);
  const [introState, setIntroState] = useState<IntroState>('playing');

  useEffect(() => {
    // Force a new video key on refresh/nav to play intro anim from start
    setVideoKey(Date.now());
  }, []);

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
  }, [videoKey]);

  // Start zoom transition at specific time, then unmount once it finishes.
  // Not gated on introState so the transitionend listener survives the
  // 'playing' -> 'exiting' update instead of being torn down by cleanup.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === video && event.propertyName === 'transform') {
        setIntroState('done');
      }
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
  }, [videoKey]);

  // Notify the parent exactly once, when the exit finishes.
  useEffect(() => {
    if (introState === 'done') {
      onComplete?.();
    }
  }, [introState, onComplete]);

  if (introState === 'done') return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <video
        key={videoKey}
        ref={videoRef}
        className={`px-4 w-auto h-auto 
          object-contain [image-rendering:pixelated] 
          transition-all duration-1000 ease-in-out
          ${introState === 'exiting' ? 'scale-[2.5] opacity-0' : 'scale-100 opacity-100'}`}
        muted
        playsInline
        preload='auto'
        poster={posterSrc}
        src={videoSrc}
      />
    </div>
  );
}
