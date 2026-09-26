export interface MasonryDimensions {
  width: number;
  height: number;
}

export interface MasonryEntry<T> {
  item: T;
  originalIndex: number;
  columnIndex: number;
  rowIndex: number;
}

/**
 * Greedily distributes items into `columnCount` equal-width columns,
 * always placing the next item into the currently-shortest column.
 *
 * Uses `height / width` as a relative height proxy — since every column
 * shares the same width, the absolute width cancels out and only the
 * aspect ratio matters for balancing. This makes the distribution a
 * pure function of each item's own dimensions, so it's deterministic
 * and identical on the server and client (no DOM measurement, no
 * hydration mismatch).
 */
export function distributeIntoColumns<T extends MasonryDimensions>(
  items: T[],
  columnCount: number
): MasonryEntry<T>[][] {
  const columns: MasonryEntry<T>[][] = Array.from({ length: columnCount }, () => []);
  const columnHeights = new Array(columnCount).fill(0);

  items.forEach((item, originalIndex) => {
    let columnIndex = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnHeights[i] < columnHeights[columnIndex]) {
        columnIndex = i;
      }
    }

    const rowIndex = columns[columnIndex].length;
    columns[columnIndex].push({ item, originalIndex, columnIndex, rowIndex });
    columnHeights[columnIndex] += item.height / item.width;
  });

  return columns;
}

// Cascade timing — tuned so the stagger between adjacent tiles is large
// enough, relative to each tile's own fade duration (see ART_DURATION in
// Fade.tsx), to read as a visible wave rather than a simultaneous fade.
// The row stagger wraps via modulo so the ripple repeats naturally each
// time a new batch of tiles scrolls into view, instead of growing
// unbounded down a long gallery.
const COLUMN_STAGGER_MS = 80;
const ROW_STAGGER_MS = 130;
const ROWS_PER_WAVE = 5;

/** Returns a `transition.delay`-ready value, in seconds. */
export function getCascadeDelay(columnIndex: number, rowIndex: number): number {
  const delayMs =
    columnIndex * COLUMN_STAGGER_MS +
    (rowIndex % ROWS_PER_WAVE) * ROW_STAGGER_MS;

  return delayMs / 1000;
}
