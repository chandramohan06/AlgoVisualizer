import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Radix Sort Frame Generator
 *
 * Pure function that generates visualization frames for Radix Sort algorithm.
 * Never mutates input array - returns immutable frames.
 * Visualizes bucket distribution and digit-by-digit sorting.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateRadixSortFrames = (array: number[]): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array];
  const n = arr.length;

  if (n === 0) {
    frames.push({
      index: 0,
      description: 'Empty array provided. Nothing to sort.',
      data: [],
      highlights: [],
      pointers: {},
      codeLineHighlight: 1,
      variables: {},
      timestamp: 0,
    });
    return frames;
  }

  if (n === 1) {
    frames.push({
      index: 0,
      description: 'Array has only one element. Already sorted.',
      data: [...arr],
      highlights: [0],
      pointers: {},
      codeLineHighlight: 1,
      variables: { n: 1 },
      timestamp: 0,
    });
    return frames;
  }

  let frameIndex = 0;

  // Find max value to know number of digits
  const max = Math.max(...arr);

  // Initial frame
  frames.push({
    index: frameIndex++,
    description: `Radix Sort initialized. Array: [${arr.join(', ')}]. Max value: ${max}. Will sort digit by digit from least significant to most significant.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, max },
    timestamp: 0,
  });

  // Counting sort helper for radix sort
  const countingSortByDigit = (exp: number, digitIndex: number): void => {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    frames.push({
      index: frameIndex++,
      description: `Sorting by digit at position ${digitIndex} (10^${digitIndex} = ${exp}). Creating buckets for digits 0-9.`,
      data: [...arr],
      highlights: [],
      pointers: { exp, digitIndex },
      codeLineHighlight: 4,
      variables: { exp, digitIndex, count },
      timestamp: frameIndex * 600,
    });

    // Count occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;

      frames.push({
        index: frameIndex++,
        description: `Element ${arr[i]} has digit ${digit} at current position. Incremented count[${digit}] to ${count[digit]}.`,
        data: [...arr],
        highlights: [i],
        pointers: { i, digit, exp },
        codeLineHighlight: 5,
        variables: { count, i, digit, exp },
        timestamp: frameIndex * 600,
      });
    }

    frames.push({
      index: frameIndex++,
      description: `Count array after counting: [${count.join(', ')}]. Converting to cumulative count.`,
      data: [...arr],
      highlights: [],
      pointers: { exp },
      codeLineHighlight: 4,
      variables: { count, exp },
      timestamp: frameIndex * 600,
    });

    // Convert to cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    frames.push({
      index: frameIndex++,
      description: `Cumulative count: [${count.join(', ')}]. Building output array.`,
      data: [...arr],
      highlights: [],
      pointers: { exp },
      codeLineHighlight: 8,
      variables: { count, exp },
      timestamp: frameIndex * 600,
    });

    // Build output array (iterate from end for stability)
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      const position = count[digit] - 1;
      output[position] = arr[i];
      count[digit]--;

      frames.push({
        index: frameIndex++,
        description: `Placing ${arr[i]} (digit ${digit}) at position ${position}. Decremented count[${digit}] to ${count[digit]}.`,
        data: [...output],
        highlights: [position],
        pointers: { i, digit, position, exp },
        codeLineHighlight: 9,
        variables: { count, output, i, digit, position, exp },
        timestamp: frameIndex * 600,
      });
    }

    // Copy to original array
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    frames.push({
      index: frameIndex++,
      description: `After sorting by digit ${digitIndex}: [${arr.join(', ')}].`,
      data: [...arr],
      highlights: Array.from({ length: n }, (_, idx) => idx),
      pointers: { exp, digitIndex },
      codeLineHighlight: 8,
      variables: { arr: [...arr], exp, digitIndex },
      timestamp: frameIndex * 600,
    });
  };

  // Do counting sort for every digit
  let exp = 1;
  let digitIndex = 0;
  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(exp, digitIndex);
    exp *= 10;
    digitIndex++;
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Radix Sort complete! Final sorted array: [${arr.join(', ')}]. Sorted ${digitIndex} digits.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 14,
    variables: {
      done: true,
      totalDigits: digitIndex,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
