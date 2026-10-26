'use client';

import { useRef, useEffect, useState } from 'react';

interface IntroProps {
  videoSrc: string;
  posterSrc: string;
}

export default function Intro({ videoSrc, posterSrc }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    // Force video to remount on each component mount so that intro plays on every nav
    setVideoKey(Date.now());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Throws if autoplay blocked, just ignore silently
      });
    }
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
        autoPlay
        poster={posterSrc}
        src={videoSrc}
      />
    </div>
  );
}
