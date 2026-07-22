import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Heap Sort Frame Generator
 *
 * Pure function that generates visualization frames for Heap Sort algorithm.
 * Never mutates input array - returns immutable frames.
 * Visualizes heapify process and heap extraction.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateHeapSortFrames = (array: number[]): VisualizationFrame[] => {
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
    description: `Heap Sort initialized. Array: [${arr.join(', ')}]. Building max-heap first, then extracting elements.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, comparisons: 0, swaps: 0 },
    timestamp: 0,
  });

  // Heapify function
  const heapify = (size: number, rootIdx: number): void => {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    // Compare with left child
    if (left < size) {
      totalComparisons++;
      frames.push({
        index: frameIndex++,
        description: `Comparing parent at index ${rootIdx} (${arr[rootIdx]}) with left child at index ${left} (${arr[left]}).`,
        data: [...arr],
        highlights: [rootIdx, left],
        pointers: { rootIdx, left, right },
        codeLineHighlight: 5,
        variables: {
          size,
          rootIdx,
          left,
          right,
          largest,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < size) {
      totalComparisons++;
      frames.push({
        index: frameIndex++,
        description: `Comparing current largest at index ${largest} (${arr[largest]}) with right child at index ${right} (${arr[right]}).`,
        data: [...arr],
        highlights: [largest, right],
        pointers: { rootIdx, left, right, largest },
        codeLineHighlight: 8,
        variables: {
          size,
          rootIdx,
          left,
          right,
          largest,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // Swap if root is not largest
    if (largest !== rootIdx) {
      const temp = arr[rootIdx];
      arr[rootIdx] = arr[largest];
      arr[largest] = temp;
      totalSwaps++;

      frames.push({
        index: frameIndex++,
        description: `Swapping root (${arr[largest]}) with largest child (${arr[rootIdx]}). Heapifying subtree.`,
        data: [...arr],
        highlights: [rootIdx, largest],
        pointers: { rootIdx, largest },
        codeLineHighlight: 11,
        variables: {
          size,
          rootIdx,
          largest,
          temp,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      // Recursively heapify affected subtree
      heapify(size, largest);
    }
  };

  // Build max-heap
  frames.push({
    index: frameIndex++,
    description: `Building max-heap from array. Starting from last non-leaf node at index ${Math.floor(n / 2) - 1}.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 16,
    variables: { n, comparisons: totalComparisons, swaps: totalSwaps },
    timestamp: frameIndex * 600,
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    frames.push({
      index: frameIndex++,
      description: `Heapifying subtree rooted at index ${i}.`,
      data: [...arr],
      highlights: [i],
      pointers: { i },
      codeLineHighlight: 17,
      variables: { i, comparisons: totalComparisons, swaps: totalSwaps },
      timestamp: frameIndex * 600,
    });
    heapify(n, i);
  }

  frames.push({
    index: frameIndex++,
    description: `Max-heap built. Array: [${arr.join(', ')}]. Now extracting elements one by one.`,
    data: [...arr],
    highlights: [0],
    pointers: {},
    codeLineHighlight: 19,
    variables: { n, comparisons: totalComparisons, swaps: totalSwaps },
    timestamp: frameIndex * 600,
  });

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Swap root with last element
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    totalSwaps++;

    frames.push({
      index: frameIndex++,
      description: `Swapping root (${arr[i]}) with element at index ${i} (${arr[0]}). Largest element ${arr[i]} is now in sorted position.`,
      data: [...arr],
      highlights: [0, i],
      pointers: { i },
      codeLineHighlight: 21,
      variables: {
        i,
        temp,
        comparisons: totalComparisons,
        swaps: totalSwaps,
      },
      timestamp: frameIndex * 600,
    });

    frames.push({
      index: frameIndex++,
      description: `Element ${arr[i]} is now sorted at index ${i}. Heapifying remaining elements [0 to ${i - 1}].`,
      data: [...arr],
      highlights: [i],
      pointers: { i },
      codeLineHighlight: 22,
      variables: {
        i,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        sorted: arr.slice(i),
      },
      timestamp: frameIndex * 600,
    });

    // Heapify reduced heap
    heapify(i, 0);
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Heap Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total swaps: ${totalSwaps}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 24,
    variables: {
      comparisons: totalComparisons,
      swaps: totalSwaps,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
