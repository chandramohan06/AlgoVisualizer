import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Counting Sort Frame Generator
 *
 * Pure function that generates visualization frames for Counting Sort algorithm.
 * Never mutates input array - returns immutable frames.
 * Visualizes counting array and output array construction.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateCountingSortFrames = (array: number[]): VisualizationFrame[] => {
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

  // Find max value
  const max = Math.max(...arr);

  // Initial frame
  frames.push({
    index: frameIndex++,
    description: `Counting Sort initialized. Array: [${arr.join(', ')}]. Max value: ${max}. Creating counting array of size ${max + 1}.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, max },
    timestamp: 0,
  });

  // Initialize counting array
  const count = new Array(max + 1).fill(0);

  frames.push({
    index: frameIndex++,
    description: `Initialized counting array with zeros. Size: ${count.length}.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 3,
    variables: { count, max },
    timestamp: frameIndex * 600,
  });

  // Count occurrences
  frames.push({
    index: frameIndex++,
    description: `Counting occurrences of each element in the array.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 5,
    variables: { count },
    timestamp: frameIndex * 600,
  });

  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
    
    frames.push({
      index: frameIndex++,
      description: `Incremented count for value ${arr[i]}. Count[${arr[i]}] = ${count[arr[i]]}.`,
      data: [...arr],
      highlights: [i],
      pointers: { i, value: arr[i] },
      codeLineHighlight: 6,
      variables: { count, i, value: arr[i] },
      timestamp: frameIndex * 600,
    });
  }

  frames.push({
    index: frameIndex++,
    description: `Counting complete. Count array: [${count.join(', ')}].`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 5,
    variables: { count },
    timestamp: frameIndex * 600,
  });

  // Convert to cumulative count
  frames.push({
    index: frameIndex++,
    description: `Converting counting array to cumulative count (prefix sum).`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 9,
    variables: { count },
    timestamp: frameIndex * 600,
  });

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
    
    frames.push({
      index: frameIndex++,
      description: `Updated count[${i}] = count[${i}] + count[${i - 1}] = ${count[i]}.`,
      data: [...arr],
      highlights: [],
      pointers: { i },
      codeLineHighlight: 10,
      variables: { count, i },
      timestamp: frameIndex * 600,
    });
  }

  frames.push({
    index: frameIndex++,
    description: `Cumulative count complete. Count array: [${count.join(', ')}].`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 9,
    variables: { count },
    timestamp: frameIndex * 600,
  });

  // Build output array
  const output = new Array(n).fill(0);

  frames.push({
    index: frameIndex++,
    description: `Building output array by placing elements in their correct positions.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 13,
    variables: { count, output },
    timestamp: frameIndex * 600,
  });

  // Iterate from end to maintain stability
  for (let i = n - 1; i >= 0; i--) {
    const value = arr[i];
    const position = count[value] - 1;
    output[position] = value;
    count[value]--;

    frames.push({
      index: frameIndex++,
      description: `Placing value ${value} at position ${position} in output array. Decremented count[${value}] to ${count[value]}.`,
      data: [...output],
      highlights: [position],
      pointers: { i, value, position },
      codeLineHighlight: 14,
      variables: { count, output, i, value, position },
      timestamp: frameIndex * 600,
    });
  }

  frames.push({
    index: frameIndex++,
    description: `Output array built: [${output.join(', ')}]. Copying to original array.`,
    data: [...output],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 13,
    variables: { output },
    timestamp: frameIndex * 600,
  });

  // Copy to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Counting Sort complete! Final sorted array: [${arr.join(', ')}].`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 18,
    variables: {
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
