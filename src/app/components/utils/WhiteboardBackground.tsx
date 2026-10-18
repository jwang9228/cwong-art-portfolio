import { ReactNode, CSSProperties } from 'react';

interface WhiteboardBackgroundProps {
  children: ReactNode;
  /** Overrides `--whiteboard-dot-gap` from the whiteboard-grid utility. */
  dotGap?: number;
  className?: string;
}

export default function WhiteboardBackground({
  children,
  dotGap,
  className = '',
}: WhiteboardBackgroundProps) {
  return (
    <div
      className={`whiteboard-grid rounded-lg ${className}`}
      style={
        dotGap != null
          ? ({ '--whiteboard-dot-gap': `${dotGap}px` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
