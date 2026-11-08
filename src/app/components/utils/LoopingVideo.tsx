interface LoopingVideoProps {
  src: string;
  posterSrc?: string;
  className?: string;
}

export default function LoopingVideo({ src, posterSrc, className }: LoopingVideoProps) {
  return (
    <video 
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload='auto'
      poster={posterSrc}
      src={src}
    />
  )
}