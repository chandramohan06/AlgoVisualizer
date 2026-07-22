import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Merge Sort Frame Generator
 *
 * Pure function that generates visualization frames for Merge Sort algorithm.
 * Never mutates input array - returns immutable frames.
 * Visualizes recursion depth, partitions, and merge process.
 *
 * @param array - Input array to sort
 * @returns Array of VisualizationFrame objects representing each step
 */
export const generateMergeSortFrames = (array: number[]): VisualizationFrame[] => {
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
  let totalMerges = 0;

  // Initial frame
  frames.push({
    index: frameIndex++,
    description: `Merge Sort initialized. Array: [${arr.join(', ')}]. Using divide-and-conquer strategy.`,
    data: [...arr],
    highlights: [],
    pointers: {},
    codeLineHighlight: 1,
    variables: { n, comparisons: 0, merges: 0 },
    timestamp: 0,
  });

  // Helper function to create frames during merge
  const merge = (leftArr: number[], rightArr: number[], startIdx: number, depth: number): number[] => {
    const merged: number[] = [];
    let leftIdx = 0;
    let rightIdx = 0;

    // Start merge frame
    frames.push({
      index: frameIndex++,
      description: `Merging left partition [${leftArr.join(', ')}] with right partition [${rightArr.join(', ')}] at depth ${depth}.`,
      data: [...arr],
      highlights: Array.from({ length: leftArr.length + rightArr.length }, (_, i) => startIdx + i),
      pointers: { depth, leftIdx, rightIdx },
      codeLineHighlight: 8,
      variables: {
        left: leftArr,
        right: rightArr,
        depth,
        comparisons: totalComparisons,
        merges: totalMerges,
      },
      timestamp: frameIndex * 600,
    });

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
      totalComparisons++;

      // Comparison frame
      frames.push({
        index: frameIndex++,
        description: `Comparing ${leftArr[leftIdx]} (left) with ${rightArr[rightIdx]} (right). ${leftArr[leftIdx] <= rightArr[rightIdx] ? `Selecting ${leftArr[leftIdx]}.` : `Selecting ${rightArr[rightIdx]}.`}`,
        data: [...arr],
        highlights: [startIdx + leftIdx + rightIdx],
        pointers: { depth, leftIdx, rightIdx },
        codeLineHighlight: 9,
        variables: {
          leftVal: leftArr[leftIdx],
          rightVal: rightArr[rightIdx],
          depth,
          comparisons: totalComparisons,
          merges: totalMerges,
        },
        timestamp: frameIndex * 600,
      });

      if (leftArr[leftIdx] <= rightArr[rightIdx]) {
        merged.push(leftArr[leftIdx]);
        leftIdx++;
      } else {
        merged.push(rightArr[rightIdx]);
        rightIdx++;
      }
    }

    // Add remaining elements
    while (leftIdx < leftArr.length) {
      merged.push(leftArr[leftIdx]);
      leftIdx++;
    }

    while (rightIdx < rightArr.length) {
      merged.push(rightArr[rightIdx]);
      rightIdx++;
    }

    // Update original array
    for (let i = 0; i < merged.length; i++) {
      arr[startIdx + i] = merged[i];
    }

    totalMerges++;

    // Merge complete frame
    frames.push({
      index: frameIndex++,
      description: `Merge complete. Merged array: [${merged.join(', ')}].`,
      data: [...arr],
      highlights: Array.from({ length: merged.length }, (_, i) => startIdx + i),
      pointers: { depth },
      codeLineHighlight: 8,
      variables: {
        merged,
        depth,
        comparisons: totalComparisons,
        merges: totalMerges,
      },
      timestamp: frameIndex * 600,
    });

    return merged;
  };

  // Recursive merge sort function
  const mergeSort = (startIdx: number, endIdx: number, depth: number): void => {
    if (startIdx >= endIdx) return;

    const mid = Math.floor((startIdx + endIdx) / 2);

    // Divide frame
    frames.push({
      index: frameIndex++,
      description: `Dividing array [${arr.slice(startIdx, endIdx + 1).join(', ')}] at index ${mid}. Left: [${arr.slice(startIdx, mid + 1).join(', ')}], Right: [${arr.slice(mid + 1, endIdx + 1).join(', ')}]. Depth: ${depth}.`,
      data: [...arr],
      highlights: Array.from({ length: endIdx - startIdx + 1 }, (_, i) => startIdx + i),
      pointers: { depth, mid },
      codeLineHighlight: 3,
      variables: {
        startIdx,
        endIdx,
        mid,
        depth,
        comparisons: totalComparisons,
        merges: totalMerges,
      },
      timestamp: frameIndex * 600,
    });

    // Recursively sort left and right halves
    mergeSort(startIdx, mid, depth + 1);
    mergeSort(mid + 1, endIdx, depth + 1);

    // Merge the sorted halves
    const leftArr = arr.slice(startIdx, mid + 1);
    const rightArr = arr.slice(mid + 1, endIdx + 1);
    merge(leftArr, rightArr, startIdx, depth);
  };

  // Start the sorting process
  mergeSort(0, n - 1, 1);

  // Final frame - all sorted
  frames.push({
    index: frameIndex++,
    description: `Merge Sort complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${totalComparisons}, Total merges: ${totalMerges}.`,
    data: [...arr],
    highlights: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    codeLineHighlight: 12,
    variables: {
      comparisons: totalComparisons,
      merges: totalMerges,
      done: true,
    },
    timestamp: frameIndex * 600,
  });

  return frames;
};
