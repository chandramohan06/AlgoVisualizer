import { type VisualizationFrame } from '@store/visualizationStore';

export type FrameGeneratorFn = (input?: number[]) => VisualizationFrame[];

// Helper to construct a frame easily
function createFrame(
  index: number,
  description: string,
  data: number[],
  highlights: number[],
  pointers: Record<string, number>,
  codeLineHighlight: number,
  variables: Record<string, any>,
  metaStatusMap?: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'>,
): VisualizationFrame {
  return {
    index,
    description,
    data: [...data],
    highlights,
    pointers,
    codeLineHighlight,
    variables,
    meta: {
      statusMap: metaStatusMap || {},
      activeIndices: highlights,
    },
    timestamp: Date.now(),
  };
}

// Default fallback generator
export const generateDefaultArrayFrames: FrameGeneratorFn = (input = [10, 20, 30, 40, 50]) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  frames.push(createFrame(0, 'Initialize array visualization.', arr, [], {}, 1, { length: arr.length }));
  for (let i = 0; i < arr.length; i++) {
    frames.push(createFrame(i + 1, `Visiting index ${i} with value ${arr[i]}`, arr, [i], { i }, 2, { i, val: arr[i] }));
  }
  frames.push(createFrame(arr.length + 1, 'Array operation completed successfully.', arr, [], {}, 3, { length: arr.length }));
  return frames;
};

// 1. Array Traversal
export const generateArrayTraversalFrames: FrameGeneratorFn = (input = [10, 20, 30, 40, 50]) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  frames.push(createFrame(0, 'Start array traversal from index 0.', arr, [], {}, 1, { i: 0, n: arr.length }));
  for (let i = 0; i < arr.length; i++) {
    const statusMap: Record<number, any> = {};
    for (let k = 0; k < i; k++) statusMap[k] = 'visited';
    statusMap[i] = 'warning';
    frames.push(createFrame(i + 1, `Visiting element arr[${i}] = ${arr[i]}`, arr, [i], { i }, 3, { i, currentVal: arr[i] }, statusMap));
  }
  const finalStatus: Record<number, any> = {};
  for (let k = 0; k < arr.length; k++) finalStatus[k] = 'success';
  frames.push(createFrame(arr.length + 1, 'Traversal complete! Visited all elements.', arr, [], {}, 5, { n: arr.length }, finalStatus));
  return frames;
};

// 2. Insert at Beginning
export const generateInsertBeginningFrames: FrameGeneratorFn = (input = [1, 2, 3, 4], val = 99) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  frames.push(createFrame(0, `Insert value ${val} at beginning (index 0).`, arr, [], {}, 1, { val }));
  const newArr = [val, ...arr];
  frames.push(createFrame(1, `Shifting all ${arr.length} elements right by 1 index to make room at index 0.`, newArr, [0], { val }, 2, { val, newSize: newArr.length }));
  frames.push(createFrame(2, `Inserted ${val} at index 0 successfully.`, newArr, [0], { index: 0 }, 3, { newSize: newArr.length }, { 0: 'success' }));
  return frames;
};

// 3. Reverse Array
export const generateReverseArrayFrames: FrameGeneratorFn = (input = [1, 2, 3, 4, 5]) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  let left = 0, right = arr.length - 1;
  let step = 0;
  frames.push(createFrame(step++, 'Start array reversal with two pointers left = 0, right = N-1.', arr, [left, right], { left, right }, 2, { left, right }));
  while (left < right) {
    frames.push(createFrame(step++, `Comparing arr[${left}] (${arr[left]}) and arr[${right}] (${arr[right]}). Preparing to swap.`, arr, [left, right], { left, right }, 4, { left, right }, { [left]: 'danger', [right]: 'danger' }));
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    frames.push(createFrame(step++, `Swapped arr[${left}] and arr[${right}]. Moving pointers inward.`, arr, [left, right], { left, right }, 6, { left, right }, { [left]: 'success', [right]: 'success' }));
    left++;
    right--;
  }
  const status: Record<number, any> = {};
  for (let k = 0; k < arr.length; k++) status[k] = 'success';
  frames.push(createFrame(step++, 'Array reversal complete!', arr, [], {}, 8, { length: arr.length }, status));
  return frames;
};

// 4. Linear Search
export const generateLinearSearchFrames: FrameGeneratorFn = (input = [4, 2, 7, 1, 9, 3], target = 7) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  frames.push(createFrame(0, `Start Linear Search for target = ${target}.`, arr, [], {}, 2, { target }));
  let foundIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    const status: Record<number, any> = {};
    for (let k = 0; k < i; k++) status[k] = 'visited';
    if (arr[i] === target) {
      status[i] = 'success';
      frames.push(createFrame(i + 1, `Found target ${target} at index ${i}!`, arr, [i], { i, target }, 3, { i, target }, status));
      foundIndex = i;
      break;
    } else {
      status[i] = 'warning';
      frames.push(createFrame(i + 1, `Checking arr[${i}] = ${arr[i]}. Not equal to ${target}.`, arr, [i], { i }, 3, { i, val: arr[i], target }, status));
    }
  }
  if (foundIndex === -1) {
    const status: Record<number, any> = {};
    for (let k = 0; k < arr.length; k++) status[k] = 'visited';
    frames.push(createFrame(arr.length + 1, `Target ${target} not found in array.`, arr, [], {}, 5, { target, result: -1 }, status));
  }
  return frames;
};

// 5. Binary Search (Searching Category)
export const generateBinarySearchFrames: FrameGeneratorFn = (input = [1, 3, 5, 7, 9, 11, 13], target = 7) => {
  const arr = [...input].sort((a, b) => a - b);
  const frames: VisualizationFrame[] = [];
  let low = 0, high = arr.length - 1;
  let step = 0;
  
  frames.push(createFrame(step++, `Initialize Binary Search for target = ${target}. Search range [${low}, ${high}].`, arr, [], { low, high }, 2, { low, mid: '-', high, target }));

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const status: Record<number, any> = {};
    for (let k = 0; k < arr.length; k++) {
      if (k < low || k > high) status[k] = 'visited';
    }
    status[mid] = 'warning';

    frames.push(createFrame(
      step++,
      `Calculate mid = ${mid} (arr[mid] = ${arr[mid]}). Compare arr[mid] with target ${target}.`,
      arr,
      [mid],
      { low, mid, high },
      4,
      { low, mid, high, target, midVal: arr[mid] },
      status
    ));

    if (arr[mid] === target) {
      status[mid] = 'success';
      frames.push(createFrame(
        step++,
        `Target ${target} found at index ${mid}! Return index ${mid}.`,
        arr,
        [mid],
        { low, mid, high },
        5,
        { low, mid, high, target, midVal: arr[mid], status: 'FOUND' },
        status
      ));
      return frames;
    } else if (arr[mid] < target) {
      frames.push(createFrame(
        step++,
        `arr[mid] (${arr[mid]}) < ${target}. Target lies in right half. Eliminate range [${low}, ${mid}]. Set low = ${mid + 1}.`,
        arr,
        [mid],
        { low: mid + 1, mid, high },
        6,
        { low: mid + 1, mid, high, target, eliminated: `[${low}..${mid}]` },
        status
      ));
      low = mid + 1;
    } else {
      frames.push(createFrame(
        step++,
        `arr[mid] (${arr[mid]}) > ${target}. Target lies in left half. Eliminate range [${mid}, ${high}]. Set high = ${mid - 1}.`,
        arr,
        [mid],
        { low, mid, high: mid - 1 },
        7,
        { low, mid, high: mid - 1, target, eliminated: `[${mid}..${high}]` },
        status
      ));
      high = mid - 1;
    }
  }

  frames.push(createFrame(step++, `Target ${target} not present in array. Search exhausted.`, arr, [], {}, 9, { result: -1, status: 'NOT_FOUND' }));
  return frames;
};

// 6. Bubble Sort (Sorting Category)
export const generateBubbleSortFrames: FrameGeneratorFn = (input = [5, 1, 4, 2, 8]) => {
  const arr = [...input];
  const frames: VisualizationFrame[] = [];
  let step = 0;
  const n = arr.length;
  let totalComparisons = 0;
  let totalSwaps = 0;

  frames.push(createFrame(step++, 'Start Bubble Sort. Outer pass i = 0.', arr, [], {}, 1, { i: 0, j: 0, comparisons: 0, swaps: 0 }));

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      totalComparisons++;
      const status: Record<number, any> = {};
      for (let k = n - i; k < n; k++) status[k] = 'success';
      status[j] = 'warning';
      status[j + 1] = 'warning';

      frames.push(createFrame(
        step++,
        `Pass ${i + 1}: Compare arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        arr,
        [j, j + 1],
        { i, j, next: j + 1 },
        5,
        { i, j, comparisons: totalComparisons, swaps: totalSwaps, val1: arr[j], val2: arr[j + 1] },
        status
      ));

      if (arr[j] > arr[j + 1]) {
        totalSwaps++;
        status[j] = 'danger';
        status[j + 1] = 'danger';
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        frames.push(createFrame(
          step++,
          `Swap required (${arr[j + 1]} > ${arr[j]}). Swapped arr[${j}] and arr[${j + 1}].`,
          arr,
          [j, j + 1],
          { i, j, next: j + 1 },
          7,
          { i, j, comparisons: totalComparisons, swaps: totalSwaps, val1: arr[j], val2: arr[j + 1], swapped: true },
          status
        ));
      }
    }

    const passStatus: Record<number, any> = {};
    for (let k = n - i - 1; k < n; k++) passStatus[k] = 'success';
    frames.push(createFrame(
      step++,
      `Pass ${i + 1} complete. Largest unsorted element placed at index ${n - i - 1}.`,
      arr,
      [n - i - 1],
      { i: i + 1 },
      10,
      { passCompleted: i + 1, comparisons: totalComparisons, swaps: totalSwaps },
      passStatus
    ));

    if (!swapped) break;
  }

  const finalStatus: Record<number, any> = {};
  for (let k = 0; k < n; k++) finalStatus[k] = 'success';
  frames.push(createFrame(step++, 'Bubble Sort complete! Array fully sorted.', arr, [], {}, 12, { sorted: true, totalComparisons, totalSwaps }, finalStatus));
  return frames;
};

// 7. Two Sum (Sorted Array Two Pointer)
export const generateTwoSumFrames: FrameGeneratorFn = (input = [2, 7, 11, 15], target = 9) => {
  const arr = [...input].sort((a, b) => a - b);
  const frames: VisualizationFrame[] = [];
  let left = 0, right = arr.length - 1;
  let step = 0;
  frames.push(createFrame(step++, `Start Two Sum for target = ${target}. Left = 0, Right = ${right}.`, arr, [left, right], { left, right }, 2, { left, right, target }));
  while (left < right) {
    const sum = arr[left] + arr[right];
    const status: Record<number, any> = { [left]: 'warning', [right]: 'warning' };
    if (sum === target) {
      status[left] = 'success';
      status[right] = 'success';
      frames.push(createFrame(step++, `Found pair! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}`, arr, [left, right], { left, right }, 4, { left, right, sum }, status));
      return frames;
    } else if (sum < target) {
      frames.push(createFrame(step++, `Sum ${sum} < target ${target}. Increment left pointer to increase sum.`, arr, [left, right], { left: left + 1, right }, 5, { sum, target }, status));
      left++;
    } else {
      frames.push(createFrame(step++, `Sum ${sum} > target ${target}. Decrement right pointer to decrease sum.`, arr, [left, right], { left, right: right - 1 }, 6, { sum, target }, status));
      right--;
    }
  }
  frames.push(createFrame(step++, `No pair found that sums to target ${target}.`, arr, [], {}, 8, { result: 'Not found' }));
  return frames;
};

// Main Frame Generator Lookup Engine
export const getFrameGenerator = (slug: string): FrameGeneratorFn => {
  switch (slug) {
    case 'array-traversal':
      return generateArrayTraversalFrames;
    case 'insert-at-beginning':
      return generateInsertBeginningFrames;
    case 'reverse-array':
      return generateReverseArrayFrames;
    case 'linear-search':
      return generateLinearSearchFrames;
    case 'binary-search':
      return generateBinarySearchFrames;
    case 'bubble-sort':
      return generateBubbleSortFrames;
    case 'two-sum':
      return generateTwoSumFrames;
    default:
      return generateDefaultArrayFrames;
  }
};
