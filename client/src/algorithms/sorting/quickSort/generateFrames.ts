import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Quick Sort Frame Generator
 *
 * Pure function that generates visualization frames for Quick Sort algorithm.
 * Never mutates input array - returns immutable frames.
 * Visualizes pivot selection, partition, and recursion depth.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateQuickSortFrames = (array: number[]): VisualizationFrame[] => {
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
  let totalComparisons = 0;
  let totalSwaps = 0;

  // Initial frame
  frames.push({
    index: frameIndex++,
    description: `Quick Sort initialized. Array: [${arr.join(', ')}]. Using divide-and-conquer with pivot partitioning.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, comparisons: 0, swaps: 0 },
    timestamp: 0,
  });

  // Partition function
  const partition = (low: number, high: number, depth: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    // Pivot selection frame
    frames.push({
      index: frameIndex++,
      description: `Selected pivot: ${pivot} at index ${high}. Partitioning range [${low}, ${high}]. Depth: ${depth}.`,
      data: [...arr],
      highlights: [high],
      pointers: { depth, pivot, low, high },
      codeLineHighlight: 4,
      variables: {
        low,
        high,
        pivot,
        depth,
        comparisons: totalComparisons,
        swaps: totalSwaps,
      },
      timestamp: frameIndex * 600,
    });

    for (let j = low; j < high; j++) {
      totalComparisons++;

      // Comparison frame
      frames.push({
        index: frameIndex++,
        description: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}). ${arr[j] < pivot ? `Less than pivot, will swap to left partition.` : 'Greater than pivot, stays in right partition.'}`,
        data: [...arr],
        highlights: [j, high],
        pointers: { depth, pivot, j, i },
        codeLineHighlight: 6,
        variables: {
          low,
          high,
          pivot,
          j,
          i,
          comparing: arr[j],
          depth,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          totalSwaps++;

          // Swap frame
          frames.push({
            index: frameIndex++,
            description: `Swapping arr[${i}] with arr[${j}]. Moving smaller element to left partition.`,
            data: [...arr],
            highlights: [i, j],
            pointers: { depth, pivot, i, j },
            codeLineHighlight: 7,
            variables: {
              low,
              high,
              pivot,
              i,
              j,
              temp,
              depth,
              comparisons: totalComparisons,
              swaps: totalSwaps,
            },
            timestamp: frameIndex * 600,
          });
        }
      }
    }

    // Place pivot in correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    totalSwaps++;

    // Pivot placement frame
    frames.push({
      index: frameIndex++,
      description: `Placing pivot ${pivot} at its correct position ${i + 1}. Elements to left are smaller, elements to right are larger.`,
      data: [...arr],
      highlights: [i + 1, high],
      pointers: { depth, pivot, i },
      codeLineHighlight: 9,
      variables: {
        low,
        high,
        pivot,
        pivotIndex: i + 1,
        depth,
        comparisons: totalComparisons,
        swaps: totalSwaps,
      },
      timestamp: frameIndex * 600,
    });

    return i + 1;
  };

  // Recursive quick sort function
  const quickSort = (low: number, high: number, depth: number): void => {
    if (low < high) {
      // Partition frame
      frames.push({
        index: frameIndex++,
        description: `Partitioning subarray [${low}, ${high}]. Current array: [${arr.slice(low, high + 1).join(', ')}]. Depth: ${depth}.`,
        data: [...arr],
        highlights: Array.from({ length: high - low + 1 }, (_, i) => low + i),
        pointers: { depth, low, high },
        codeLineHighlight: 2,
        variables: {
          low,
          high,
          depth,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      const pi = partition(low, high, depth);

      // Pivot sorted frame
      frames.push({
        index: frameIndex++,
        description: `Pivot ${arr[pi]} is now in its final sorted position at index ${pi}.`,
        data: [...arr],
        highlights: [pi],
        pointers: { depth, pi },
        codeLineHighlight: 2,
        variables: {
          low,
          high,
          pi,
          pivot: arr[pi],
          depth,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      // Recursively sort left and right partitions
      quickSort(low, pi - 1, depth + 1);
      quickSort(pi + 1, high, depth + 1);
    }
  };

  // Start the sorting process
  quickSort(0, n - 1, 1);

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Quick Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total swaps: ${totalSwaps}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 12,
    variables: {
      comparisons: totalComparisons,
      swaps: totalSwaps,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
