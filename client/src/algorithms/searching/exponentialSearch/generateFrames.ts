import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Exponential Search Frame Generator
 *
 * Pure function. Uses a generic metadata structure to represent
 * exponential bound probing followed by range binary search.
 *
 * @param array  - Sorted search array
 * @param target - Target value
 */
export const generateExponentialSearchFrames = (
  array: number[],
  target: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Discarded / Ignored' },
    { color: 'bg-amber-400', label: 'Probed Midpoint / Bound' },
    { color: 'bg-indigo-600 border-indigo-500', label: 'Active Search Range' },
    { color: 'bg-emerald-500', label: 'Target Found' },
  ];

  const pointerStyles = {
    bound: 'violet',
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
  let comparisons = 0;

  const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'active' | 'default' | 'highlighted'> = {};

  // ── Frame 0: Initialization ──
  frames.push({
    index: frameIdx++,
    description: `Exponential Search initialized. Target: ${target}. Will double search bound exponentially starting from index 1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: { target, n, comparisons: 0 },
    meta: { target, statusMap: {}, legend: baseLegend },
    timestamp: 0,
  });

  // ── Step 1: Check Index 0 ──
  comparisons++;
  const step1StatusMap = { ...statusMap };
  step1StatusMap[0] = 'warning';

  frames.push({
    index: frameIdx++,
    description: `Checking boundary base element arr[0] = ${arr[0]}.`,
    data: [...arr],
    highlights: [0],
    pointers: { bound: 0 },
    codeLineHighlight: 1,
    variables: { target, currentVal: arr[0], comparisons },
    meta: {
      target,
      statusMap: step1StatusMap,
      pointerStyles,
      legend: baseLegend,
    },
    timestamp: frameIdx * 600,
  });

  if (arr[0] === target) {
    step1StatusMap[0] = 'success';
    frames.push({
      index: frameIdx++,
      description: `🎯 target ${target} found immediately at index 0!`,
      data: [...arr],
      highlights: [0],
      pointers: { found: 0 },
      codeLineHighlight: 2,
      variables: { target, comparisons, result: 0 },
      meta: {
        target,
        statusMap: step1StatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });
    return frames;
  }

  statusMap[0] = 'visited'; // index 0 is not the target

  // ── Phase 1: Bound Doubling ──
  let bound = 1;
  while (bound < n && arr[bound] < target) {
    comparisons++;
    const currentStatusMap = { ...statusMap };
    currentStatusMap[bound] = 'warning';

    frames.push({
      index: frameIdx++,
      description: `Probing exponential bound: arr[${bound}] = ${arr[bound]} < target (${target}). Doubling bound to ${bound * 2}.`,
      data: [...arr],
      highlights: [bound],
      pointers: { bound },
      codeLineHighlight: 4,
      variables: { bound, boundVal: arr[bound], target, comparisons },
      meta: {
        target,
        statusMap: currentStatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    // Mark probed sub-portion as visited since we're doubling beyond it
    for (let k = 0; k < bound; k++) {
      statusMap[k] = 'visited';
    }
    bound *= 2;
  }

  // ── Phase 2: Binary Search in block [bound / 2, min(bound, n-1)] ──
  const lowLimit = Math.floor(bound / 2);
  const highLimit = Math.min(bound, n - 1);

  // Setup visual search boundary classes (indigo range, visited for discarded parts)
  const rangeStatusMap = { ...statusMap };
  for (let k = 0; k < n; k++) {
    if (k < lowLimit || k > highLimit) {
      rangeStatusMap[k] = 'visited';
    } else {
      rangeStatusMap[k] = 'highlighted';
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Target bound identified at ${bound}. Target must exist in sub-range [${lowLimit}, ${highLimit}]. Switching to binary search.`,
    data: [...arr],
    highlights: Array.from({ length: highLimit - lowLimit + 1 }, (_, k) => lowLimit + k),
    pointers: { low: lowLimit, high: highLimit },
    codeLineHighlight: 6,
    variables: { low: lowLimit, high: highLimit, target, comparisons },
    meta: {
      target,
      statusMap: rangeStatusMap,
      pointerStyles,
      legend: baseLegend,
    },
    timestamp: frameIdx * 600,
  });

  let low = lowLimit;
  let high = highLimit;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    comparisons++;

    const bsStatusMap = { ...statusMap };
    for (let k = 0; k < n; k++) {
      if (k < low || k > high) {
        bsStatusMap[k] = 'visited';
      } else {
        bsStatusMap[k] = 'highlighted';
      }
    }
    bsStatusMap[mid] = 'warning';

    // ── Midpoint Probing Frame ──
    frames.push({
      index: frameIdx++,
      description: `Binary search: probing mid = ${mid} (value: ${arr[mid]}). Range: [${low}, ${high}].`,
      data: [...arr],
      highlights: [mid],
      pointers: { low, mid, high },
      codeLineHighlight: 7,
      variables: { low, mid, high, midVal: arr[mid], target, comparisons },
      meta: {
        target,
        statusMap: bsStatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    if (arr[mid] === target) {
      bsStatusMap[mid] = 'success';

      // ── Target Found Frame ──
      frames.push({
        index: frameIdx++,
        description: `🎯 Target ${target} successfully found at index ${mid}! Total comparisons: ${comparisons}.`,
        data: [...arr],
        highlights: [mid],
        pointers: { found: mid },
        codeLineHighlight: 8,
        variables: { target, mid, comparisons, result: mid },
        meta: {
          target,
          statusMap: bsStatusMap,
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      return frames;
    }

    if (arr[mid] < target) {
      for (let k = low; k <= mid; k++) {
        statusMap[k] = 'visited';
      }
      low = mid + 1;
    } else {
      for (let k = mid; k <= high; k++) {
        statusMap[k] = 'visited';
      }
      high = mid - 1;
    }
  }

  // Mark all elements as visited since search failed
  for (let k = 0; k < n; k++) {
    statusMap[k] = 'visited';
  }

  // ── Target Not Found Frame ──
  frames.push({
    index: frameIdx++,
    description: `Search space exhausted. Target ${target} was not found in the array. Returning -1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 11,
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
