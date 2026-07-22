import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Linear Search Frame Generator
 *
 * Pure function. Uses a generic metadata structure to communicate color and pointer states.
 *
 * @param array  - Array to search
 * @param target - Target value
 */
export const generateLinearSearchFrames = (
  array: number[],
  target: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited / Scanned' },
    { color: 'bg-amber-400', label: 'Currently Comparing' },
    { color: 'bg-emerald-500', label: 'Target Found' },
  ];

  // ── Edge Case: Empty Array ──
  if (n === 0) {
    frames.push({
      index: 0,
      description: 'The search array is empty. Returning -1.',
      data: [],
      highlights: [],
      pointers: {},
      codeLineHighlight: 0,
      variables: { target, n: 0, result: -1 },
      meta: { target, statusMap: {}, legend: baseLegend },
      timestamp: 0,
    });
    return frames;
  }

  let frameIdx = 0;

  // ── Frame 0: Initialization ──
  frames.push({
    index: frameIdx++,
    description: `Linear Search initialized. Searching for target ${target} in an array of size ${n}.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { target, n, i: 0, comparisons: 0 },
    meta: { target, statusMap: {}, legend: baseLegend },
    timestamp: 0,
  });

  const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'active' | 'default'> = {};

  for (let i = 0; i < n; i++) {
    const isMatch = arr[i] === target;
    statusMap[i] = 'warning'; // Active comparison color (amber)

    // ── Comparison Frame ──
    frames.push({
      index: frameIdx++,
      description: `Comparing index ${i}: arr[${i}] = ${arr[i]}. ${
        isMatch ? `✓ Target found! ${arr[i]} === ${target}.` : `✗ arr[${i}] ≠ ${target}. Moving to next element.`
      }`,
      data: [...arr],
      highlights: [i],
      pointers: { i },
      codeLineHighlight: 2,
      variables: { target, i, currentVal: arr[i], comparisons: i + 1 },
      meta: {
        target,
        statusMap: { ...statusMap },
        pointerStyles: { i: 'amber' },
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    if (isMatch) {
      statusMap[i] = 'success'; // Target found color (emerald)

      // ── Target Found Frame ──
      frames.push({
        index: frameIdx++,
        description: `🎯 Target ${target} successfully found at index ${i}. Search completed in ${i + 1} comparison(s).`,
        data: [...arr],
        highlights: [i],
        pointers: { found: i },
        codeLineHighlight: 3,
        variables: { target, i, comparisons: i + 1, result: i },
        meta: {
          target,
          statusMap: { ...statusMap },
          pointerStyles: { found: 'emerald' },
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      return frames;
    }

    statusMap[i] = 'visited'; // Mark as visited (dimmed)
  }

  // ── Target Not Found Frame ──
  frames.push({
    index: frameIdx++,
    description: `All elements checked. Target ${target} was not found in the array. Returning -1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 6,
    variables: { target, comparisons: n, result: -1 },
    meta: {
      target,
      statusMap: { ...statusMap },
      legend: baseLegend,
    },
    timestamp: frameIdx * 600,
  });

  return frames;
};
