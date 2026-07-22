import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Binary Search Frame Generator
 *
 * Pure function. Uses a generic metadata structure to communicate range highlights,
 * pointer style coloring, and visited states.
 *
 * @param array  - Sorted search array
 * @param target - Target value
 */
export const generateBinarySearchFrames = (
  array: number[],
  target: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Discarded / Ignored' },
    { color: 'bg-amber-400', label: 'Midpoint (Probed)' },
    { color: 'bg-indigo-600 border-indigo-500', label: 'Current Search Range' },
    { color: 'bg-emerald-500', label: 'Target Found' },
  ];

  const pointerStyles = {
    low: 'sky',
    high: 'rose',
    mid: 'amber',
    found: 'emerald',
  };

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
  let low = 0;
  let high = n - 1;
  let comparisons = 0;

  const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'active' | 'default' | 'highlighted'> = {};

  // ── Frame 0: Initialization ──
  frames.push({
    index: frameIdx++,
    description: `Binary Search initialized. Target: ${target}. Setting boundaries: low = 0, high = ${high}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: { low, high },
    codeLineHighlight: 1,
    variables: { target, low, high, comparisons: 0 },
    meta: {
      target,
      statusMap: { ...statusMap },
      pointerStyles,
      legend: baseLegend,
    },
    timestamp: 0,
  });

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    comparisons++;

    // Highlight the active search range as highlighted (indigo), other portions as visited (dimmed)
    const currentStatusMap = { ...statusMap };
    for (let k = 0; k < n; k++) {
      if (k < low || k > high) {
        currentStatusMap[k] = 'visited';
      } else {
        currentStatusMap[k] = 'highlighted';
      }
    }
    currentStatusMap[mid] = 'warning'; // midpoint highlight

    // ── Midpoint Probing Frame ──
    frames.push({
      index: frameIdx++,
      description: `Probing midpoint: mid = ${mid} (value: ${arr[mid]}). Current range: [${low}, ${high}].`,
      data: [...arr],
      highlights: [mid],
      pointers: { low, mid, high },
      codeLineHighlight: 3,
      variables: { target, low, mid, high, midVal: arr[mid], comparisons },
      meta: {
        target,
        statusMap: currentStatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    if (arr[mid] === target) {
      currentStatusMap[mid] = 'success'; // found target

      // ── Target Found Frame ──
      frames.push({
        index: frameIdx++,
        description: `🎯 target ${target} found at midpoint index ${mid}! Search completed in ${comparisons} iterations.`,
        data: [...arr],
        highlights: [mid],
        pointers: { found: mid },
        codeLineHighlight: 4,
        variables: { target, low, mid, high, comparisons, result: mid },
        meta: {
          target,
          statusMap: currentStatusMap,
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      return frames;
    }

    if (arr[mid] < target) {
      // Target is in the right sub-array. Mark the left portion as permanently visited/discarded
      for (let k = low; k <= mid; k++) {
        statusMap[k] = 'visited';
      }

      // ── Adjust Boundaries Frame (Move Right) ──
      frames.push({
        index: frameIdx++,
        description: `arr[mid] (${arr[mid]}) < target (${target}). Target must be in the right half. Adjusting low = mid + 1 = ${mid + 1}.`,
        data: [...arr],
        highlights: [],
        pointers: { low: mid + 1, high },
        codeLineHighlight: 5,
        variables: { target, low: mid + 1, high, comparisons },
        meta: {
          target,
          statusMap: { ...statusMap },
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      low = mid + 1;
    } else {
      // Target is in the left sub-array. Mark the right portion as permanently visited/discarded
      for (let k = mid; k <= high; k++) {
        statusMap[k] = 'visited';
      }

      // ── Adjust Boundaries Frame (Move Left) ──
      frames.push({
        index: frameIdx++,
        description: `arr[mid] (${arr[mid]}) > target (${target}). Target must be in the left half. Adjusting high = mid - 1 = ${mid - 1}.`,
        data: [...arr],
        highlights: [],
        pointers: { low, high: mid - 1 },
        codeLineHighlight: 6,
        variables: { target, low, high: mid - 1, comparisons },
        meta: {
          target,
          statusMap: { ...statusMap },
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      high = mid - 1;
    }
  }

  // Mark all elements as discarded since search failed
  for (let k = 0; k < n; k++) {
    statusMap[k] = 'visited';
  }

  // ── Target Not Found Frame ──
  frames.push({
    index: frameIdx++,
    description: `low (${low}) > high (${high}). Search space exhausted. Target ${target} is not in the array. Returning -1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 8,
    variables: { target, comparisons, result: -1 },
    meta: {
      target,
      statusMap: { ...statusMap },
      legend: baseLegend,
    },
    timestamp: frameIdx * 600,
  });

  return frames;
};
