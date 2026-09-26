'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import GalleryImage from './GalleryImage';
import {
  CLOUDINARY_LIGHTBOX_MAX_WIDTH,
  getCloudinaryUrl,
  toCloudinarySrc
} from '../../lib/cloudinary-image';
import { distributeIntoColumns, getCascadeDelay } from '../../lib/masonry';

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

// Match next/image default deviceSizes (capped by our loader max).
const LIGHTBOX_SRC_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 2560];

function getLightboxWidth() {
  const target = Math.min(
    window.innerWidth * (window.devicePixelRatio || 1),
    CLOUDINARY_LIGHTBOX_MAX_WIDTH
  );
  return LIGHTBOX_SRC_WIDTHS.find((size) => size >= target)
    ?? CLOUDINARY_LIGHTBOX_MAX_WIDTH;
}

function preloadLightboxImage(resource: { public_id: string; version?: number | string }) {
  const preload = new window.Image();
  preload.src = getCloudinaryUrl({
    src: toCloudinarySrc(resource, 'best'),
    width: getLightboxWidth(),
  });
}

// Ordered from smallest to largest — matches the custom breakpoints
// defined in globals.css (`--breakpoint-tablet/laptop/desktop`).
const BREAKPOINT_ORDER = ['base', 'tablet', 'laptop', 'desktop'] as const;
type BreakpointKey = typeof BREAKPOINT_ORDER[number];

export interface ColumnConfig {
  base: number;
  tablet?: number;
  laptop?: number;
  desktop?: number;
}

interface ColumnTier {
  key: BreakpointKey;
  count: number;
}

const DEFAULT_COLUMNS: ColumnConfig = { base: 2, laptop: 3 };

function getColumnTiers(columns: ColumnConfig): ColumnTier[] {
  return BREAKPOINT_ORDER
    .filter((key) => columns[key] != null)
    .map((key) => ({ key, count: columns[key]! }));
}

// Each tier is visible only from its own breakpoint up to (but not
// including) the next tier's breakpoint, so exactly one tier is ever
// `display:block` at a time. Browsers never fetch images inside
// `display:none` subtrees, so the inactive tiers never trigger network
// requests — this keeps responsive column counts hydration-safe without
// any client-only viewport measurement.
//
// These must be fully static, literal strings — Tailwind's build-time
// class scanner only detects class names that appear verbatim in source
// files. Constructing them via template-literal interpolation (e.g.
// `${tier.key}:flex`) means the literal substring "laptop:flex" never
// appears in the source, so Tailwind never generates that CSS rule and
// the tier silently stays hidden at every viewport width.
const TIER_ACTIVE_CLASS: Record<BreakpointKey, string> = {
  base: 'flex',
  tablet: 'tablet:flex',
  laptop: 'laptop:flex',
  desktop: 'desktop:flex',
};

const TIER_HIDDEN_FROM_CLASS: Record<BreakpointKey, string> = {
  base: 'hidden',
  tablet: 'tablet:hidden',
  laptop: 'laptop:hidden',
  desktop: 'desktop:hidden',
};

function getTierVisibilityClass(tiers: ColumnTier[], tierIndex: number): string {
  const tier = tiers[tierIndex];
  const nextTier = tiers[tierIndex + 1];

  const classes = tier.key === 'base'
    ? ['flex']
    : ['hidden', TIER_ACTIVE_CLASS[tier.key]];
  if (nextTier) classes.push(TIER_HIDDEN_FROM_CLASS[nextTier.key]);

  return classes.join(' ');
}

function getTierSizes(columnCount: number): string {
  return `${Math.round(100 / columnCount)}vw`;
}

// How many rows (of the widest tier) get eager/priority loading —
// enough to cover the first fold on the widest layout, regardless of
// how many columns that layout actually has.
const PRIORITY_ROWS = 2;

export default function Gallery({ 
  resources, 
  columns = DEFAULT_COLUMNS,
} : { 
  resources: any[], 
  columns?: ColumnConfig,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxReady, setLightboxReady] = useState(false);
  const selectedImage = selectedImageIndex != null ? resources[selectedImageIndex] : null;

  const setNextImage = () => {
    if (selectedImageIndex != null && selectedImageIndex < resources.length - 1) {
      setLightboxReady(false);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const setPrevImage = () => {
    if (selectedImageIndex != null && selectedImageIndex > 0) {
      setLightboxReady(false);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const openLightbox = useCallback((index: number) => {
    preloadLightboxImage(resources[index]);
    setLightboxReady(false);
    setSelectedImageIndex(index);
  }, [resources]);

  useEffect(() => {
    setLightboxReady(false);
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex == null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        if (selectedImageIndex < resources.length - 1) {
          setNextImage();
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedImageIndex > 0) {
          setPrevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, resources.length]);

  useEffect(() => {
    if (selectedImageIndex == null) return;

    [selectedImageIndex - 1, selectedImageIndex + 1]
      .filter((index) => index >= 0 && index < resources.length)
      .forEach((index) => preloadLightboxImage(resources[index]));
  }, [selectedImageIndex, resources]);

  const tiers = useMemo(
    () => getColumnTiers(columns),
    [columns.base, columns.tablet, columns.laptop, columns.desktop]
  );

  const tierColumns = useMemo(
    () => tiers.map((tier) => distributeIntoColumns(resources, tier.count)),
    [resources, tiers]
  );

  // Flat `index < 4` under-covers the fold on wider layouts (e.g. a
  // 3-column tier only gets ~1.3 rows of priority loading). Scale the
  // cutoff to the widest tier so every layout gets full priority rows.
  const priorityCutoff = useMemo(
    () => Math.max(...tiers.map((tier) => tier.count)) * PRIORITY_ROWS,
    [tiers]
  );

  return (
    <> 
      <section className='mx-0.5'>
        {tiers.map((tier, tierIndex) => (
          <div
            key={tier.key}
            className={`${getTierVisibilityClass(tiers, tierIndex)} gap-1`}
          >
            {tierColumns[tierIndex].map((column, columnIndex) => (
              <div key={columnIndex} className='flex flex-1 min-w-0 flex-col gap-0.5'>
                {column.map(({ item: image, originalIndex, rowIndex }) => (
                  <motion.div
                    key={image.asset_id}
                    onClick={() => openLightbox(originalIndex)}
                    onPointerEnter={() => preloadLightboxImage(image)}
                    className='cursor-zoom-in'
                  >
                    <GalleryImage
                      image={image}
                      alt='Gallery Image'
                      sizes={getTierSizes(tier.count)}
                      inView
                      priority={originalIndex < priorityCutoff}
                      loadDelay={getCascadeDelay(columnIndex, rowIndex)}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            selectedImage={selectedImage}
            selectedImageIndex={selectedImageIndex as number}
            resourcesLength={resources.length}
            lightboxReady={lightboxReady}
            onClose={() => setSelectedImageIndex(null)}
            onNext={setNextImage}
            onPrev={setPrevImage}
            onLoaded={() => setLightboxReady(true)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
