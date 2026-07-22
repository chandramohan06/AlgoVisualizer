import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Bubble Sort Frame Generator
 *
 * Pure function that generates visualization frames for Bubble Sort algorithm.
 * Never mutates input array - returns immutable frames.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateBubbleSortFrames = (array: number[]): VisualizationFrame[] => {
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
    description: `Bubble Sort initialized. Array: [${arr.join(', ')}]. Starting pass 1.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, pass: 1, comparisons: 0, swaps: 0 },
    timestamp: 0,
  });

  // Bubble Sort Algorithm
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Start of pass frame
    frames.push({
      index: frameIndex++,
      description: `Starting pass ${i + 1}. Will compare adjacent elements and bubble the largest to position ${n - 1 - i}.`,
      data: [...arr],
      highlights: [],
      pointers: { i },
      codeLineHighlight: 2,
      variables: { i, pass: i + 1, comparisons: totalComparisons, swaps: totalSwaps },
      timestamp: frameIndex * 600,
    });

    for (let j = 0; j < n - i - 1; j++) {
      totalComparisons++;

      // Comparison frame
      frames.push({
        index: frameIndex++,
        description: `Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}). ${arr[j] > arr[j + 1] ? 'Need to swap.' : 'No swap needed.'}`,
        data: [...arr],
        highlights: [j, j + 1],
        pointers: { i, j },
        codeLineHighlight: 4,
        variables: {
          i,
          j,
          a: arr[j],
          b: arr[j + 1],
          comparisons: totalComparisons,
          swaps: totalSwaps,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        totalSwaps++;

        // Swap frame
        frames.push({
          index: frameIndex++,
          description: `Swapping arr[${j}] and arr[${j + 1}]. Array after swap: [${arr.join(', ')}].`,
          data: [...arr],
          highlights: [j, j + 1],
          pointers: { i, j },
          codeLineHighlight: 5,
          variables: {
            i,
            j,
            temp,
            comparisons: totalComparisons,
            swaps: totalSwaps,
          },
          timestamp: frameIndex * 600,
        });
      }
    }

    // Mark the last element of this pass as sorted
    frames.push({
      index: frameIndex++,
      description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is now in its final sorted position.`,
      data: [...arr],
      highlights: [n - 1 - i],
      pointers: { i },
      codeLineHighlight: 2,
      variables: {
        i,
        pass: i + 1,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        sorted: arr.slice(n - 1 - i),
      },
      timestamp: frameIndex * 600,
    });

    // Early termination if no swaps occurred
    if (!swapped) {
      frames.push({
        index: frameIndex++,
        description: `No swaps occurred in pass ${i + 1}. Array is already sorted. Early termination.`,
        data: [...arr],
        highlights: Array.from({ length: n }, (_, idx) => idx),
        pointers: {},
        codeLineHighlight: 8,
        variables: {
          i,
          pass: i + 1,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          earlyTermination: true,
        },
        timestamp: frameIndex * 600,
      });
      break;
    }
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Bubble Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total swaps: ${totalSwaps}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 9,
    variables: {
      comparisons: totalComparisons,
      swaps: totalSwaps,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
