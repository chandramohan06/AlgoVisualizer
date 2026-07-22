import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Insertion Sort Frame Generator
 *
 * Pure function that generates visualization frames for Insertion Sort algorithm.
 * Never mutates input array - returns immutable frames.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateInsertionSortFrames = (array: number[]): VisualizationFrame[] => {
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
  let totalShifts = 0;

  // Initial frame
  frames.push({
    index: frameIndex++,
    description: `Insertion Sort initialized. Array: [${arr.join(', ')}]. Building sorted portion from left to right.`,
    data: [...arr],
    highlights: [0],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, comparisons: 0, shifts: 0 },
    timestamp: 0,
  });

  // Insertion Sort Algorithm
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Start of pass frame
    frames.push({
      index: frameIndex++,
      description: `Processing element ${key} at index ${i}. Will insert it into the sorted portion [0 to ${i - 1}].`,
      data: [...arr],
      highlights: [i],
      pointers: { i, key },
      codeLineHighlight: 2,
      variables: { i, key, comparisons: totalComparisons, shifts: totalShifts },
      timestamp: frameIndex * 600,
    });

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      totalComparisons++;

      // Comparison frame
      frames.push({
        index: frameIndex++,
        description: `Comparing arr[${j}] (${arr[j]}) with key (${key}). ${arr[j] > key ? `${arr[j]} > ${key}, need to shift.` : 'No shift needed.'}`,
        data: [...arr],
        highlights: [j, i],
        pointers: { i, j, key },
        codeLineHighlight: 4,
        variables: {
          i,
          j,
          key,
          comparing: arr[j],
          comparisons: totalComparisons,
          shifts: totalShifts,
        },
        timestamp: frameIndex * 600,
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        totalShifts++;

        // Shift frame
        frames.push({
          index: frameIndex++,
          description: `Shifting ${arr[j]} from index ${j} to index ${j + 1}.`,
          data: [...arr],
          highlights: [j, j + 1],
          pointers: { i, j, key },
          codeLineHighlight: 5,
          variables: {
            i,
            j,
            key,
            shifted: arr[j + 1],
            comparisons: totalComparisons,
            shifts: totalShifts,
          },
          timestamp: frameIndex * 600,
        });

        j--;
      }
    }

    if (j >= 0) {
      totalComparisons++;
    }

    // Insert key at correct position
    arr[j + 1] = key;

    // Insertion frame
    frames.push({
      index: frameIndex++,
      description: `Inserting key (${key}) at index ${j + 1}. Sorted portion now: [${arr.slice(0, i + 1).join(', ')}].`,
      data: [...arr],
      highlights: [j + 1],
      pointers: { i, j, key },
      codeLineHighlight: 7,
      variables: {
        i,
        j,
        key,
        insertedAt: j + 1,
        comparisons: totalComparisons,
        shifts: totalShifts,
      },
      timestamp: frameIndex * 600,
    });

    // Mark sorted portion
    frames.push({
      index: frameIndex++,
      description: `Pass ${i} complete. Elements [0 to ${i}] are now sorted.`,
      data: [...arr],
      highlights: Array.from({ length: i + 1 }, (_, idx) => idx),
      pointers: { i },
      codeLineHighlight: 2,
      variables: {
        i,
        comparisons: totalComparisons,
        shifts: totalShifts,
        sorted: arr.slice(0, i + 1),
      },
      timestamp: frameIndex * 600,
    });
  }

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Insertion Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total shifts: ${totalShifts}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 9,
    variables: {
      comparisons: totalComparisons,
      shifts: totalShifts,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
