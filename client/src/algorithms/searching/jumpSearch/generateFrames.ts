import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Jump Search Frame Generator
 *
 * Pure function. Uses a generic metadata structure to handle block jumps,
 * linear scan ranges, and dynamic coloring.
 *
 * @param array  - Sorted search array
 * @param target - Target value
 */
export const generateJumpSearchFrames = (
  array: number[],
  target: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Discarded / Ignored' },
    { color: 'bg-amber-400', label: 'Probed Index (Jump / Scan)' },
    { color: 'bg-sky-600 border-sky-500', label: 'Active Search Block' },
    { color: 'bg-emerald-500', label: 'Target Found' },
  ];

  const pointerStyles = {
    prev: 'sky',
    curr: 'rose',
    jump: 'violet',
    i: 'amber',
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
  const step = Math.floor(Math.sqrt(n));

  // ── Frame 0: Initialization ──
  frames.push({
    index: frameIdx++,
    description: `Jump Search initialized. Array size: ${n}. Jump step size = √${n} ≈ ${step}.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { target, n, step, comparisons: 0 },
    meta: { target, statusMap: {}, legend: baseLegend },
    timestamp: 0,
  });

  let prev = 0;
  let curr = step;
  let comparisons = 0;

  const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'active' | 'default' | 'highlighted'> = {};

  // ── Phase 1: Block Jumps ──
  while (curr < n && arr[Math.min(curr, n - 1)] < target) {
    comparisons++;
    const jumpIdx = Math.min(curr, n - 1);

    // Mark previous blocks as permanently visited/discarded
    for (let k = 0; k < curr; k++) {
      statusMap[k] = 'visited';
    }
    statusMap[jumpIdx] = 'warning'; // target block probe

    frames.push({
      index: frameIdx++,
      description: `Jumping to index ${jumpIdx}. arr[${jumpIdx}] = ${arr[jumpIdx]} < target (${target}). Target must be in a later block.`,
      data: [...arr],
      highlights: [jumpIdx],
      pointers: { jump: jumpIdx },
      codeLineHighlight: 3,
      variables: { prev, curr, target, step, comparisons },
      meta: {
        target,
        statusMap: { ...statusMap },
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    prev = curr;
    curr += step;
  }

  // ── Phase 2: Linear scan within candidate block ──
  const blockLimit = Math.min(curr, n - 1);

  // Setup visual state for candidate block: mark indices inside the block as 'info' (sky/blue)
  const blockStatusMap = { ...statusMap };
  for (let k = prev; k <= blockLimit; k++) {
    blockStatusMap[k] = 'info';
  }

  frames.push({
    index: frameIdx++,
    description: `Candidate block identified between index ${prev} and index ${blockLimit}. Initiating linear search backward/forward inside the block.`,
    data: [...arr],
    highlights: Array.from({ length: blockLimit - prev + 1 }, (_, k) => prev + k),
    pointers: { prev, curr: blockLimit },
    codeLineHighlight: 6,
    variables: { prev, curr: blockLimit, target, step, comparisons },
    meta: {
      target,
      statusMap: blockStatusMap,
      pointerStyles,
      legend: baseLegend,
    },
    timestamp: frameIdx * 600,
  });

  // Perform linear scan
  for (let i = prev; i <= blockLimit; i++) {
    comparisons++;

    // Mark probed index as active probe (warning/amber)
    const scanStatusMap = { ...statusMap };
    for (let k = prev; k <= blockLimit; k++) {
      if (k < i) {
        scanStatusMap[k] = 'visited'; // already scanned
      } else {
        scanStatusMap[k] = 'info'; // candidate block
      }
    }
    scanStatusMap[i] = 'warning';

    frames.push({
      index: frameIdx++,
      description: `Scanning index ${i}: arr[${i}] = ${arr[i]}. ${
        arr[i] === target
          ? `✓ Target found!`
          : arr[i] > target
          ? `✗ arr[${i}] > target. Target cannot exist in this sorted array.`
          : `✗ Not a match. Moving forward.`
      }`,
      data: [...arr],
      highlights: [i],
      pointers: { i },
      codeLineHighlight: 7,
      variables: { i, currentVal: arr[i], target, comparisons },
      meta: {
        target,
        statusMap: scanStatusMap,
        pointerStyles,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    });

    if (arr[i] === target) {
      scanStatusMap[i] = 'success';

      // ── Target Found Frame ──
      frames.push({
        index: frameIdx++,
        description: `🎯 Target ${target} successfully found at index ${i}. Total comparisons: ${comparisons}.`,
        data: [...arr],
        highlights: [i],
        pointers: { found: i },
        codeLineHighlight: 8,
        variables: { i, target, comparisons, result: i },
        meta: {
          target,
          statusMap: scanStatusMap,
          pointerStyles,
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      return frames;
    }

    if (arr[i] > target) {
      // Discard remaining since array is sorted
      for (let k = i; k < n; k++) {
        statusMap[k] = 'visited';
      }
      break;
    }

    statusMap[i] = 'visited';
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
