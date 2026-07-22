import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Interpolation Search Frame Generator
 *
 * Pure function. Uses a generic metadata structure to communicate probe formulas,
 * dynamic boundary indices, and visited states.
 *
 * @param array  - Sorted search array (works best if uniformly distributed)
 * @param target - Target value
 */
export const generateInterpolationSearchFrames = (
  array: number[],
  target: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Discarded / Ignored' },
    { color: 'bg-amber-400', label: 'Calculated Probe Position' },
    { color: 'bg-indigo-600 border-indigo-500', label: 'Current Probe Range' },
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
    description: `Interpolation Search initialized. Target: ${target}. Setting boundaries: low = 0, high = ${high}.`,
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

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      comparisons++;
      const currentStatusMap = { ...statusMap };
      currentStatusMap[low] = 'warning';

      if (arr[low] === target) {
        currentStatusMap[low] = 'success';
        frames.push({
          index: frameIdx++,
          description: `🎯 Single element matching: arr[${low}] = ${arr[low]} === target. Found!`,
          data: [...arr],
          highlights: [low],
          pointers: { found: low },
          codeLineHighlight: 4,
          variables: { target, low, high, comparisons, result: low },
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
      break;
    }

    // Probing formula calculation
    const range = arr[high] - arr[low];
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / range);

    // Guard against calculation index bounds issues (just in case of non-sorted or custom inputs)
    if (pos < low || pos > high) {
      break;
    }

    comparisons++;

    // Style search state
    const currentStatusMap = { ...statusMap };
    for (let k = 0; k < n; k++) {
      if (k < low || k > high) {
        currentStatusMap[k] = 'visited';
      } else {
        currentStatusMap[k] = 'highlighted';
      }
    }
    currentStatusMap[pos] = 'warning'; // highlight estimated position

    // ── Midpoint Probing Frame ──
    frames.push({
      index: frameIdx++,
      description: `Probing estimated position index ${pos} using formula: arr[${pos}] = ${arr[pos]}.`,
      data: [...arr],
      highlights: [pos],
      pointers: { low, mid: pos, high },
      codeLineHighlight: 3,
      variables: { target, low, pos, high, probeVal: arr[pos], comparisons },
      meta: {
        target,
        statusMap: currentStatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    if (arr[pos] === target) {
      currentStatusMap[pos] = 'success';

      // ── Target Found Frame ──
      frames.push({
        index: frameIdx++,
        description: `🎯 Target ${target} successfully found at position ${pos}! Total comparisons: ${comparisons}.`,
        data: [...arr],
        highlights: [pos],
        pointers: { found: pos },
        codeLineHighlight: 4,
        variables: { target, pos, comparisons, result: pos },
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

    if (arr[pos] < target) {
      // Target is higher. Discard left sub-portion
      for (let k = low; k <= pos; k++) {
        statusMap[k] = 'visited';
      }

      frames.push({
        index: frameIdx++,
        description: `arr[pos] (${arr[pos]}) < target (${target}). Adjusting low boundary to pos + 1 = ${pos + 1}.`,
        data: [...arr],
        highlights: [],
        pointers: { low: pos + 1, high },
        codeLineHighlight: 5,
        variables: { target, low: pos + 1, high, comparisons },
        meta: {
          target,
          statusMap: { ...statusMap },
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      low = pos + 1;
    } else {
      // Target is lower. Discard right sub-portion
      for (let k = pos; k <= high; k++) {
        statusMap[k] = 'visited';
      }

      frames.push({
        index: frameIdx++,
        description: `arr[pos] (${arr[pos]}) > target (${target}). Adjusting high boundary to pos - 1 = ${pos - 1}.`,
        data: [...arr],
        highlights: [],
        pointers: { low, high: pos - 1 },
        codeLineHighlight: 6,
        variables: { target, low, high: pos - 1, comparisons },
        meta: {
          target,
          statusMap: { ...statusMap },
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      high = pos - 1;
    }
  }

  // Mark all elements as visited since search failed
  for (let k = 0; k < n; k++) {
    statusMap[k] = 'visited';
  }

  // ── Target Not Found Frame ──
  frames.push({
    index: frameIdx++,
    description: `Target ${target} was not found in the array. Returning -1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 9,
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
