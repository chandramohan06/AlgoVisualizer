import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Selection Sort Frame Generator
 *
 * Pure function that generates visualization frames for Selection Sort algorithm.
 * Never mutates input array - returns immutable frames.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateSelectionSortFrames = (array: number[]): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const arr = [...array]; // Create a copy to avoid mutation
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
    description: `Selection Sort initialized. Array: [${arr.join(', ')}]. Will find minimum element and place it at the beginning.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, comparisons: 0, swaps: 0 },
    timestamp: 0,
  });

  // Selection Sort Algorithm
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Start of pass frame
    frames.push({
      index: frameIndex++,
      description: `Pass ${i + 1}: Looking for minimum element in unsorted portion (index ${i} to ${n - 1}). Current minimum at index ${minIdx} (value: ${arr[minIdx]}).`,
      data: [...arr],
      highlights: [i],
      pointers: { i, minIdx },
      codeLineHighlight: 2,
      variables: { i, minIdx, comparisons: totalComparisons, swaps: totalSwaps },
      timestamp: frameIndex * 600,
    });

    for (let j = i + 1; j < n; j++) {
      totalComparisons++;

      // Comparison frame
      frames.push({
        index: frameIndex++,
        description: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}). ${arr[j] < arr[minIdx] ? `Found new minimum at index ${j}.` : 'Current minimum remains.'}`,
        data: [...arr],
        highlights: [minIdx, j],
        pointers: { i, j, minIdx },
        codeLineHighlight: 4,
        variables: {
          i,
          j,
          minIdx,
          currentMin: arr[minIdx],
          comparing: arr[j],
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;

        // New minimum found frame
        frames.push({
          index: frameIndex++,
          description: `New minimum found at index ${minIdx} (value: ${arr[minIdx]}). Updating minimum index.`,
          data: [...arr],
          highlights: [minIdx],
          pointers: { i, j, minIdx },
          codeLineHighlight: 5,
          variables: {
            i,
            j,
            minIdx,
            comparisons: totalComparisons,
            swaps: totalSwaps,
          },
          timestamp: frameIndex * 600,
        });
      }
    }

    // Swap if minimum is not at position i
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      totalSwaps++;

      // Swap frame
      frames.push({
        index: frameIndex++,
        description: `Swapping arr[${i}] with arr[${minIdx}]. Minimum element ${arr[i]} is now in its correct position.`,
        data: [...arr],
        highlights: [i, minIdx],
        pointers: { i, minIdx },
        codeLineHighlight: 8,
        variables: {
          i,
          minIdx,
          temp,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });
    } else {
      // No swap needed frame
      frames.push({
        index: frameIndex++,
        description: `Element at index ${i} is already the minimum. No swap needed.`,
        data: [...arr],
        highlights: [i],
        pointers: { i, minIdx },
        codeLineHighlight: 8,
        variables: {
          i,
          minIdx,
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });
    }

    // Mark element as sorted
    frames.push({
      index: frameIndex++,
      description: `Pass ${i + 1} complete. Element ${arr[i]} is now in its final sorted position.`,
      data: [...arr],
      highlights: [i],
      pointers: { i },
      codeLineHighlight: 2,
      variables: {
        i,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        sorted: arr.slice(0, i + 1),
      },
      timestamp: frameIndex * 600,
    });
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Selection Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total swaps: ${totalSwaps}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 10,
    variables: {
      comparisons: totalComparisons,
      swaps: totalSwaps,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
