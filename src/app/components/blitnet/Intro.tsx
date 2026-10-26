'use client';

import { useRef, useEffect, useState } from 'react';

const INTRO_HOLD_MS = 250;

interface IntroProps {
  videoSrc: string;
  posterSrc: string;
}

export default function Intro({ videoSrc, posterSrc }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoKey, setVideoKey] = useState(0);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Force video to remount on each component mount so that intro plays on every nav
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

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <video
        key={videoKey}
        ref={videoRef}
        className='px-4 w-auto h-auto 
          object-contain [image-rendering:pixelated]'
        muted
        playsInline
        preload='auto'
        poster={posterSrc}
        src={videoSrc}
      />
    </div>
  );
}
