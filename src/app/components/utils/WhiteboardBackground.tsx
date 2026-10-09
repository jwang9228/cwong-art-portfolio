import { ReactNode, CSSProperties } from 'react';

interface WhiteboardBackgroundProps {
  children: ReactNode;
  /** Spacing between dots, in pixels. Defaults to 22px. */
  dotGap?: number;
  className?: string;
}

export default function WhiteboardBackground({
  children,
  dotGap = 16,
  className = '',
}: WhiteboardBackgroundProps) {
  return (
    <div
      className={`whiteboard-grid rounded-lg ${className}`}
      style={{ '--whiteboard-dot-gap': `${dotGap}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
