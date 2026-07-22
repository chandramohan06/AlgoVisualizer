import {
  IArrayElement,
  IPointerInfo,
  IArrayAnimationFrame,
  IArrayAlgorithmMeta,
  ElementState,
} from './arrayFrameEngine';

// Helpers
const parseNumbers = (inputStr: string, fallback: number[]): number[] => {
  if (!inputStr || !inputStr.trim()) return fallback;
  const parsed = inputStr
    .split(/[,;\s]+/)
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => !isNaN(n));
  return parsed.length > 0 ? parsed.slice(0, 10) : fallback;
};

const getSimulatedAddress = (index: number, baseHex: number = 0x7fff00) => {
  const addr = (baseHex + index * 4).toString(16).toUpperCase();
  return `0x${addr}`;
};

const buildMemoryData = (arr: IArrayElement[], pointers: IPointerInfo[], baseHex: number = 0x7fff00) => {
  return arr.map((el, idx) => {
    const ptr = pointers.find((p) => p.index === idx)?.name;
    return {
      index: idx,
      address: el.address || getSimulatedAddress(idx, baseHex),
      val: el.val,
      state: el.state,
      pointer: ptr,
    };
  });
};

// ── COMPLETE SORTING ALGORITHMS SUITE (10 ALGORITHMS) ───────────────────────────
export const SORTING_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. BUBBLE SORT
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    difficulty: 'Easy',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements bubble up to the right end.',
    pseudoCode: `for i = 0 to N-2:\n    for j = 0 to N-i-2:\n        if arr[j] > arr[j+1]:\n            swap(arr[j], arr[j+1])\n    lock(N-i-1)`,
    defaultInput: '45, 24, 88, 12, 56',
    analogy: 'Imagine bubbles rising in water: larger, heavier bubbles bubble up step-by-step to the top of the glass.',
    invariant: 'After pass i, the last i elements are guaranteed to be in their final sorted positions.',
    commonMistake: 'Not reducing inner loop boundary (N-i-1), causing redundant comparisons on already locked sorted elements.',
    interviewTip: 'Bubble sort can be optimized with a swapped flag to terminate early in O(N) time for nearly sorted inputs.',
    advantages: 'Simple in-place stable sorting algorithm.',
    disadvantages: 'Quadratic O(N²) average and worst-case performance.',
    whenToUse: 'When teaching sorting concepts or for nearly sorted small datasets.',
    quizQuestion: {
      question: 'What is the worst-case time complexity of Bubble Sort?',
      options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
      correctIndex: 0,
      explanation: 'In the worst case (reverse sorted input), Bubble Sort requires N*(N-1)/2 comparisons and swaps, yielding O(N²).',
    },
    relatedProblems: [
      { title: 'Sort Colors', slug: 'sort-colors', difficulty: 'Medium' },
      { title: 'Height Checker', slug: 'height-checker', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `public void bubbleSort(int[] arr) {\n    for (int i = 0; i < arr.length - 1; i++) {\n        for (int j = 0; j < arr.length - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;\n            }\n        }\n    }\n}`,
      cpp: `void bubbleSort(vector<int>& arr) {\n    for (size_t i = 0; i < arr.size() - 1; i++) {\n        for (size_t j = 0; j < arr.size() - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);\n        }\n    }\n}`,
      python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
    },
    generateFrames: (inputStr) => {
      const nums = parseNumbers(inputStr, [45, 24, 88, 12, 56]);
      const arr = [...nums];
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let comps = 0;
      let swaps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Bubble Sort. Input size N = ${arr.length}.`,
        array: elements.map((e) => ({ ...e })),
        pointers: [{ name: 'i', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'i', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: arr[0], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Initialize Bubble Sort' },
        storytelling: {
          goal: 'Sort array elements in ascending order.',
          currentState: `Array length N = ${arr.length}.`,
          decision: 'Start Pass 1 at index 0.',
          reason: 'Pass 1 will bubble the largest element to index N-1.',
          nextAction: 'Compare adjacent elements at index 0 and 1.',
          whyRationale: 'Comparing adjacent elements propagates out-of-order maximums rightward.',
          variableWatch: { i: 0, j: 0, N: arr.length },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: arr[0] },
      });

      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          comps++;
          const isSwap = arr[j] > arr[j + 1];

          // Compare Frame
          frames.push({
            frameIndex: frames.length,
            lineHighlight: 3,
            explanation: `Pass ${i + 1}: Compare arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}). ${isSwap ? `${arr[j]} > ${arr[j + 1]} -> SWAP!` : `${arr[j]} <= ${arr[j + 1]} -> KEEP ORDER`}`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === j || idx === j + 1 ? 'comparing' : idx >= arr.length - i ? 'visited' : 'default') as ElementState,
            })),
            pointers: [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }]),
            dryRunRow: { step: frames.length + 1, currentIndex: `j:${j}`, currentValue: arr[j], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Compare ${arr[j]} vs ${arr[j + 1]}` },
            storytelling: {
              goal: `Compare adjacent elements at index ${j} and ${j + 1}.`,
              currentState: `arr[${j}] = ${arr[j]}, arr[${j + 1}] = ${arr[j + 1]}.`,
              comparison: `${arr[j]} > ${arr[j + 1]} -> ${isSwap}`,
              decision: isSwap ? 'SWAP adjacent elements using Bezier curve trajectory!' : 'No swap required.',
              reason: isSwap ? `${arr[j]} is larger than ${arr[j + 1]}, breaking ascending order.` : 'Adjacent pair is already in ascending order.',
              nextAction: isSwap ? 'Execute Bezier crossover swap.' : 'Advance j pointer.',
              whyRationale: 'Bubble Sort relies on local adjacent comparisons to move maximums rightward.',
              variableWatch: { pass: i + 1, j, val1: arr[j], val2: arr[j + 1] },
            },
            predictionChallenge: (i === 0 && j === 0) ? {
              prompt: `Comparing 45 and 24. Since 45 > 24, will they swap?`,
              options: ['Yes! 45 is greater than 24, so swap', 'No! Order is already correct'],
              correctIndex: 0,
              mistakeExplanations: ['', 'Incorrect! 45 > 24 violates ascending order, requiring a swap.'],
            } : undefined,
            metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps, visitedCount: arr.length - i, currentIndex: j, currentValue: arr[j] },
          });

          if (isSwap) {
            swaps++;
            const tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;

            const tmpE = elements[j].val;
            elements[j].val = elements[j + 1].val;
            elements[j + 1].val = tmpE;

            // Swap Bezier Frame
            frames.push({
              frameIndex: frames.length,
              lineHighlight: 4,
              explanation: `Bezier Crossover Swap! Swapped ${arr[j + 1]} and ${arr[j]}.`,
              array: elements.map((e, idx) => ({
                ...e,
                state: (idx === j || idx === j + 1 ? 'swapping' : idx >= arr.length - i ? 'visited' : 'default') as ElementState,
                arcOffset: idx === j ? -25 : idx === j + 1 ? 25 : 0,
                particleType: idx === j || idx === j + 1 ? ('sparks' as const) : undefined,
              })),
              pointers: [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }],
              memoryAddresses: buildMemoryData(elements, [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }]),
              dryRunRow: { step: frames.length + 1, currentIndex: `j:${j}`, currentValue: arr[j], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Swapped arr[${j}] and arr[${j + 1}]` },
              storytelling: {
                goal: 'Complete element swap.',
                currentState: `Swapped! arr[${j}] is now ${arr[j]}, arr[${j + 1}] is now ${arr[j + 1]}.`,
                decision: 'Move j pointer to next pair.',
                reason: 'Elements successfully re-ordered.',
                nextAction: 'Compare next adjacent pair.',
                whyRationale: 'Bezier trajectory visually demonstrates in-place memory exchange.',
                variableWatch: { swaps, j },
              },
              metrics: { elapsedTimeMs: comps * 20 + 10, operations: comps + swaps, comparisons: comps, swaps, visitedCount: arr.length - i, currentIndex: j, currentValue: arr[j] },
            });
          }
        }

        // Lock pass element
        elements[arr.length - i - 1].state = 'visited';
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 5,
          explanation: `Pass ${i + 1} Complete! Element ${arr[arr.length - i - 1]} at index ${arr.length - i - 1} LOCKED IN SORTED POSITION (GREEN).`,
          array: elements.map((e) => ({ ...e })),
          pointers: [{ name: 'LOCKED', index: arr.length - i - 1 }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'LOCKED', index: arr.length - i - 1 }]),
          dryRunRow: { step: frames.length + 1, currentIndex: arr.length - i - 1, currentValue: arr[arr.length - i - 1], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Pass ${i + 1} locked index ${arr.length - i - 1}` },
          storytelling: {
            goal: `Lock pass ${i + 1} maximum.`,
            currentState: `Index ${arr.length - i - 1} is now in final sorted order.`,
            decision: `Lock index ${arr.length - i - 1} with GREEN GLOW.`,
            reason: 'Invariant proves element at N-i-1 is larger than all elements to its left.',
            nextAction: `Start Pass ${i + 2}.`,
            whyRationale: 'Bubble Sort reduces scan range by 1 each pass.',
            variableWatch: { lockedIdx: arr.length - i - 1, pass: i + 1 },
          },
          metrics: { elapsedTimeMs: comps * 20 + 20, operations: comps + swaps, comparisons: comps, swaps, visitedCount: i + 1, currentIndex: arr.length - i - 1, currentValue: arr[arr.length - i - 1] },
        });
      }

      elements[0].state = 'visited';
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: `Bubble Sort Completed Successfully! All ${arr.length} elements fully sorted in ascending order.`,
        array: elements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'SORTED', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'SORTED', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Sorted', maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Sorting complete.',
          currentState: `Array fully sorted: [${arr.join(', ')}].`,
          decision: 'Finish algorithm.',
          reason: 'All N passes completed.',
          nextAction: 'Show mastery summary.',
          whyRationale: 'Bubble sort verified all elements in O(N²) time.',
          variableWatch: { status: 'Complete', totalComps: comps, totalSwaps: swaps },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 40, operations: comps + swaps, comparisons: comps, swaps, visitedCount: arr.length, currentIndex: 'Done', currentValue: 'Sorted' },
      });

      return frames;
    },
  },

  // 2. SELECTION SORT (WITH GOLD CROWN FOR MINIMUM)
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    difficulty: 'Easy',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element from the unsorted region and swaps it with the first unsorted element. GOLD CROWN flies to new minimum elements!',
    pseudoCode: `for i = 0 to N-2:\n    minIdx = i\n    for j = i+1 to N-1:\n        if arr[j] < arr[minIdx]:\n            minIdx = j\n            flyCrown(j)\n    swap(arr[i], arr[minIdx])`,
    defaultInput: '45, 24, 88, 12, 56',
    analogy: 'Imagine selecting the shortest student in a row of unorganized students and swapping them to the front position.',
    invariant: 'The sub-array [0..i-1] contains the smallest i elements in sorted order.',
    commonMistake: 'Selection sort is NOT stable in its standard swap form because swapping can move non-adjacent equal elements past each other.',
    interviewTip: 'Selection sort minimizes the total number of swaps (exactly O(N) swaps), making it useful when write ops are expensive.',
    advantages: 'Requires exactly O(N) swaps in all cases.',
    disadvantages: 'Always performs O(N²) comparisons even if input is already sorted.',
    whenToUse: 'When flash memory write cycles are limited.',
    quizQuestion: {
      question: 'How many element swaps does Selection Sort perform in the worst case?',
      options: ['O(N) Swaps', 'O(N²) Swaps', 'O(N log N) Swaps', 'O(1) Swaps'],
      correctIndex: 0,
      explanation: 'Selection Sort performs at most N-1 swaps (1 swap per outer loop pass), which is O(N) linear swaps total.',
    },
    relatedProblems: [
      { title: 'Sort List', slug: 'sort-list', difficulty: 'Medium' },
      { title: 'Kth Largest Element', slug: 'kth-largest-element-in-an-array', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public void selectionSort(int[] arr) {\n    for (int i = 0; i < arr.length - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < arr.length; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int tmp = arr[minIdx]; arr[minIdx] = arr[i]; arr[i] = tmp;\n    }\n}`,
      cpp: `void selectionSort(vector<int>& arr) {\n    for (size_t i = 0; i < arr.size() - 1; i++) {\n        size_t minIdx = i;\n        for (size_t j = i + 1; j < arr.size(); j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[minIdx], arr[i]);\n    }\n}`,
      python: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]: min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [45, 24, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let comps = 0;
      let swaps = 0;

      for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `Pass ${i + 1}: Initial Minimum set to index ${i} (${arr[i]}) with GOLD CROWN!`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === i ? 'min' : idx < i ? 'visited' : 'default') as ElementState,
            hasCrown: idx === i,
          })),
          pointers: [{ name: 'MIN_CROWN', index: i }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'MIN_CROWN', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: arr[i], maxVal: Math.max(...arr), minVal: arr[i], action: `Set initial min = ${arr[i]}` },
          storytelling: {
            goal: `Find minimum element in unsorted region [${i}..${arr.length - 1}].`,
            currentState: `Initial minimum = ${arr[i]} at index ${i}.`,
            decision: 'Place GOLD CROWN at index ' + i + '.',
            reason: 'Assume index i is minimum until a smaller element is found.',
            nextAction: `Scan index ${i + 1} to N-1.`,
            whyRationale: 'Scanning unsorted elements guarantees finding true minimum.',
            variableWatch: { pass: i + 1, minIdx: i, minVal: arr[i] },
          },
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps, visitedCount: i, currentIndex: i, currentValue: arr[i] },
        });

        for (let j = i + 1; j < arr.length; j++) {
          comps++;
          const isNewMin = arr[j] < arr[minIdx];

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 4,
            explanation: `Compare arr[${j}] (${arr[j]}) with Crown Min (${arr[minIdx]}). ${isNewMin ? 'NEW MINIMUM FOUND!' : `${arr[j]} >= ${arr[minIdx]}`}`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === minIdx ? 'min' : idx === j ? 'comparing' : idx < i ? 'visited' : 'default') as ElementState,
              hasCrown: idx === minIdx,
            })),
            pointers: [{ name: 'CROWN', index: minIdx }, { name: 'j', index: j }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'CROWN', index: minIdx }, { name: 'j', index: j }]),
            dryRunRow: { step: frames.length + 1, currentIndex: j, currentValue: arr[j], maxVal: Math.max(...arr), minVal: arr[minIdx], action: `Compare ${arr[j]} vs Min ${arr[minIdx]}` },
            storytelling: {
              goal: `Compare element at index ${j} with current minimum.`,
              currentState: `Current Min = ${arr[minIdx]}. Current Value = ${arr[j]}.`,
              comparison: `${arr[j]} < ${arr[minIdx]} -> ${isNewMin}`,
              decision: isNewMin ? 'Update Minimum index & Fly Crown!' : 'Keep current minimum.',
              reason: isNewMin ? `${arr[j]} is strictly smaller than ${arr[minIdx]}.` : `${arr[j]} is not smaller than current min.`,
              nextAction: isNewMin ? 'Fly Crown to new minimum.' : 'Advance j pointer.',
              whyRationale: 'Tracking minimum index allows a single linear swap per pass.',
              variableWatch: { j, val: arr[j], currentMin: arr[minIdx] },
            },
            metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps, visitedCount: i, currentIndex: j, currentValue: arr[j] },
          });

          if (isNewMin) {
            minIdx = j;

            frames.push({
              frameIndex: frames.length,
              lineHighlight: 5,
              explanation: `GOLD CROWN FLIGHT! Crown flies to new minimum ${arr[minIdx]} at index ${minIdx}!`,
              array: elements.map((e, idx) => ({
                ...e,
                state: (idx === minIdx ? 'min' : idx < i ? 'visited' : 'default') as ElementState,
                hasCrown: idx === minIdx,
                particleType: idx === minIdx ? ('gold' as const) : undefined,
              })),
              pointers: [{ name: 'NEW MIN CROWN', index: minIdx }],
              memoryAddresses: buildMemoryData(elements, [{ name: 'NEW MIN CROWN', index: minIdx }]),
              dryRunRow: { step: frames.length + 1, currentIndex: minIdx, currentValue: arr[minIdx], maxVal: Math.max(...arr), minVal: arr[minIdx], action: `Crown flew to Min ${arr[minIdx]}` },
              storytelling: {
                goal: 'Fly Crown to new minimum.',
                currentState: `New Minimum = ${arr[minIdx]} at index ${minIdx}.`,
                decision: 'Update crown position.',
                reason: `Found smaller value ${arr[minIdx]}.`,
                nextAction: 'Continue scan.',
                whyRationale: 'Crown visualizes minimum element updates.',
                variableWatch: { newMinIdx: minIdx, newMinVal: arr[minIdx] },
              },
              metrics: { elapsedTimeMs: comps * 20 + 10, operations: comps, comparisons: comps, swaps, visitedCount: i, currentIndex: minIdx, currentValue: arr[minIdx] },
            });
          }
        }

        if (minIdx !== i) {
          swaps++;
          const tmp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = tmp;

          const tmpE = elements[i].val;
          elements[i].val = elements[minIdx].val;
          elements[minIdx].val = tmpE;

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 7,
            explanation: `Swap minimum element ${arr[i]} at index ${minIdx} with index ${i}.`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === i ? 'visited' : idx === minIdx ? 'swapping' : idx < i ? 'visited' : 'default') as ElementState,
              arcOffset: idx === i ? -25 : idx === minIdx ? 25 : 0,
            })),
            pointers: [{ name: 'SWAP', index: i }, { name: 'MIN', index: minIdx }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'SWAP', index: i }, { name: 'MIN', index: minIdx }]),
            dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: arr[i], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Swapped arr[${i}] and arr[${minIdx}]` },
            storytelling: {
              goal: `Place minimum element ${arr[i]} into sorted position at index ${i}.`,
              currentState: `Swapped arr[${i}] and arr[${minIdx}].`,
              decision: 'Lock index ' + i + ' into sorted sub-array.',
              reason: 'Minimum element for unsorted region is now placed.',
              nextAction: 'Advance outer loop i.',
              whyRationale: 'Selection sort places 1 element into final position per pass.',
              variableWatch: { swaps, i, minIdx },
            },
            metrics: { elapsedTimeMs: comps * 20 + 20, operations: comps + swaps, comparisons: comps, swaps, visitedCount: i + 1, currentIndex: i, currentValue: arr[i] },
          });
        }
      }

      elements.forEach((e) => (e.state = 'visited'));
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 7,
        explanation: 'Selection Sort Completed Successfully! All elements sorted.',
        array: elements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'SORTED', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'SORTED', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Sorted', maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Sorting complete.',
          currentState: `Array fully sorted: [${arr.join(', ')}].`,
          decision: 'Finish algorithm.',
          reason: 'All minimum elements selected and placed.',
          nextAction: 'Display completion summary.',
          whyRationale: 'Selection sort completed in O(N²) comparisons and O(N) swaps.',
          variableWatch: { status: 'Complete', swaps },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 40, operations: comps + swaps, comparisons: comps, swaps, visitedCount: arr.length, currentIndex: 'Done', currentValue: 'Sorted' },
      });

      return frames;
    },
  },

  // 3. INSERTION SORT (PURPLE KEY GLOW)
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    difficulty: 'Easy',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time by picking the key element (PURPLE GLOW) and shifting larger elements rightward to insert the key into its correct position.',
    pseudoCode: `for i = 1 to N-1:\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j+1] = arr[j]\n        j--\n    arr[j+1] = key`,
    defaultInput: '45, 24, 88, 12, 56',
    analogy: 'Imagine arranging playing cards in your hand: pick one card at a time and insert it into its proper position among sorted cards.',
    invariant: 'Sub-array arr[0..i-1] is always sorted at the start of iteration i.',
    commonMistake: 'Forgetting to save key value in a temporary variable before shifting right.',
    interviewTip: 'Insertion sort is extremely fast O(N) for nearly sorted inputs and is used as the base algorithm in Timsort (Python/Java Arrays.sort).',
    advantages: 'O(N) linear time for nearly sorted arrays, stable and in-place.',
    disadvantages: 'O(N²) worst-case time for reverse-sorted arrays.',
    whenToUse: 'For small datasets (N < 20) or nearly sorted input arrays.',
    quizQuestion: {
      question: 'What is the best-case time complexity of Insertion Sort on an already sorted array?',
      options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'],
      correctIndex: 0,
      explanation: 'If the array is already sorted, the inner while loop condition arr[j] > key fails immediately on first comparison, resulting in exactly N-1 comparisons (O(N)).',
    },
    relatedProblems: [
      { title: 'Insertion Sort List', slug: 'insertion-sort-list', difficulty: 'Medium' },
      { title: 'Sort an Array', slug: 'sort-an-array', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public void insertionSort(int[] arr) {\n    for (int i = 1; i < arr.length; i++) {\n        int key = arr[i]; int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]; j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      cpp: `void insertionSort(vector<int>& arr) {\n    for (size_t i = 1; i < arr.size(); i++) {\n        int key = arr[i]; int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]; j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [45, 24, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let comps = 0;
      let shifts = 0;

      elements[0].state = 'visited';
      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Insertion Sort. Index 0 (${arr[0]}) is trivially sorted.`,
        array: elements.map((e) => ({ ...e })),
        pointers: [{ name: 'sorted', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'sorted', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: arr[0], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Init Insertion Sort' },
        storytelling: {
          goal: 'Build sorted array left to right.',
          currentState: `Sub-array [0..0] (${arr[0]}) is sorted.`,
          decision: 'Pick key at index 1.',
          reason: 'Single element array is always sorted.',
          nextAction: 'Insert arr[1] into sorted sub-array.',
          whyRationale: 'Incremental insertion maintains sorted invariant.',
          variableWatch: { i: 1, key: arr[1] },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 1, currentIndex: 0, currentValue: arr[0] },
      });

      for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        // Key selection frame with PURPLE GLOW
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `Iteration ${i}: Pick Key = ${key} at index ${i} with PURPLE GLOW!`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === i ? 'inserted' : idx < i ? 'visited' : 'default') as ElementState,
            label: idx === i ? 'KEY' : undefined,
          })),
          pointers: [{ name: 'KEY', index: i }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'KEY', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: key, maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Picked Key = ${key}` },
          storytelling: {
            goal: `Insert Key ${key} into sorted sub-array [0..${i - 1}].`,
            currentState: `Key = ${key} at index ${i}.`,
            decision: 'Highlight Key in PURPLE.',
            reason: 'Key will be compared against sorted sub-array elements right to left.',
            nextAction: `Compare Key ${key} with arr[${j}] (${arr[j]}).`,
            whyRationale: 'Reverse linear scan finds target insertion position.',
            variableWatch: { i, key, j },
          },
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: shifts, visitedCount: i, currentIndex: i, currentValue: key },
        });

        while (j >= 0 && arr[j] > key) {
          comps++;
          shifts++;

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 4,
            explanation: `Compare arr[${j}] (${arr[j]}) > Key (${key}) -> TRUE! Shift ${arr[j]} right to index ${j + 1}.`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === j ? 'swapping' : idx === i ? 'inserted' : idx < i ? 'visited' : 'default') as ElementState,
            })),
            pointers: [{ name: 'shift', index: j }, { name: 'KEY', index: i }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'shift', index: j }, { name: 'KEY', index: i }]),
            dryRunRow: { step: frames.length + 1, currentIndex: j, currentValue: arr[j], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Shift ${arr[j]} right` },
            storytelling: {
              goal: `Shift larger element ${arr[j]} rightward.`,
              currentState: `arr[${j}] = ${arr[j]} > Key = ${key}.`,
              comparison: `${arr[j]} > ${key} -> TRUE`,
              decision: `Shift ${arr[j]} from index ${j} to index ${j + 1}.`,
              reason: 'Make room for key in sorted sub-array.',
              nextAction: 'Decrement j pointer.',
              whyRationale: 'Rightward element shift opens up target key slot.',
              variableWatch: { j, shiftedVal: arr[j], key },
            },
            metrics: { elapsedTimeMs: comps * 20, operations: comps + shifts, comparisons: comps, swaps: shifts, visitedCount: i, currentIndex: j, currentValue: arr[j] },
          });

          arr[j + 1] = arr[j];
          elements[j + 1].val = elements[j].val;
          j--;
        }

        if (j >= 0) comps++;
        arr[j + 1] = key;
        elements[j + 1].val = key;
        elements[j + 1].state = 'visited';

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 6,
          explanation: `Inserted Key ${key} into correct sorted position at index ${j + 1}.`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx <= i ? 'visited' : 'default') as ElementState,
            particleType: idx === j + 1 ? ('purple' as const) : undefined,
          })),
          pointers: [{ name: 'INSERTED', index: j + 1 }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'INSERTED', index: j + 1 }]),
          dryRunRow: { step: frames.length + 1, currentIndex: j + 1, currentValue: key, maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Inserted Key ${key} at index ${j + 1}` },
          storytelling: {
            goal: `Complete key insertion.`,
            currentState: `Key ${key} placed at index ${j + 1}.`,
            decision: 'Lock sorted sub-array [0..' + i + '].',
            reason: 'Found exact insertion slot where left element <= key.',
            nextAction: `Advance to next iteration i = ${i + 1}.`,
            whyRationale: 'Insertion sort maintains sorted sub-array invariant.',
            variableWatch: { insertedIdx: j + 1, key },
          },
          metrics: { elapsedTimeMs: comps * 20 + 20, operations: comps + shifts, comparisons: comps, swaps: shifts, visitedCount: i + 1, currentIndex: j + 1, currentValue: key },
        });
      }

      elements.forEach((e) => (e.state = 'visited'));
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 6,
        explanation: 'Insertion Sort Completed Successfully!',
        array: elements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'SORTED', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'SORTED', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Sorted', maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Sorting complete.',
          currentState: `Array fully sorted: [${arr.join(', ')}].`,
          decision: 'Finish algorithm.',
          reason: 'All keys inserted cleanly.',
          nextAction: 'Show summary.',
          whyRationale: 'Insertion sort completed in O(N²) worst-case time.',
          variableWatch: { status: 'Complete', totalShifts: shifts },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 40, operations: comps + shifts, comparisons: comps, swaps: shifts, visitedCount: arr.length, currentIndex: 'Done', currentValue: 'Sorted' },
      });

      return frames;
    },
  },

  // 4. QUICK SORT (PIVOT & PARTITION)
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(log N)',
    description: 'Picks a pivot element and partitions the array into elements smaller than pivot (left) and larger than pivot (right), then recursively sorts partitions.',
    pseudoCode: `quickSort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quickSort(arr, low, pi - 1)\n        quickSort(arr, pi + 1, high)`,
    defaultInput: '45, 24, 88, 12, 56',
    analogy: 'Choosing a team captain (pivot): everyone shorter than captain stands on left, everyone taller stands on right.',
    invariant: 'After partitioning around pivot, pivot is in its final sorted position, with all left elements <= pivot and right elements >= pivot.',
    commonMistake: 'Choosing poor pivot (e.g. first element on sorted array) degenerates time complexity to O(N²).',
    interviewTip: 'Randomized pivot selection guarantees O(N log N) expected time complexity on any input array.',
    advantages: 'Fastest general in-place sorting algorithm in practice.',
    disadvantages: 'Unstable and O(N²) worst-case without randomized pivot selection.',
    whenToUse: 'When fast general in-place sorting is required.',
    quizQuestion: {
      question: 'What is the worst-case time complexity of Quick Sort?',
      options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
      correctIndex: 0,
      explanation: 'If the pivot is constantly chosen as the minimum or maximum element (e.g. sorted array with first element pivot), recursion depth becomes N, resulting in O(N²).',
    },
    relatedProblems: [
      { title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array', difficulty: 'Medium' },
      { title: 'Sort Colors', slug: 'sort-colors', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
      cpp: `void quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
      python: `def quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [45, 24, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let comps = 0;
      let swaps = 0;

      const runQuickSort = (low: number, high: number) => {
        if (low >= high) {
          if (low === high) elements[low].state = 'visited';
          return;
        }

        const pivotVal = arr[high];
        elements[high].state = 'comparing';
        elements[high].label = 'PIVOT';

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `Partition range [${low}..${high}]: Selected Pivot = ${pivotVal} at index ${high} (AMBER GLOW).`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === high ? 'comparing' : idx >= low && idx < high ? 'current' : e.state) as ElementState,
          })),
          pointers: [{ name: 'PIVOT', index: high }, { name: 'low', index: low }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'PIVOT', index: high }, { name: 'low', index: low }]),
          dryRunRow: { step: frames.length + 1, currentIndex: high, currentValue: pivotVal, maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Selected Pivot = ${pivotVal}` },
          storytelling: {
            goal: `Partition sub-array [${low}..${high}] around Pivot ${pivotVal}.`,
            currentState: `Pivot = ${pivotVal} at index ${high}.`,
            decision: 'Lock pivot element.',
            reason: 'All elements < pivot will move left; elements > pivot will move right.',
            nextAction: 'Scan elements from low to high-1.',
            whyRationale: 'Lomuto partition scheme reorganizes elements in single linear pass.',
            variableWatch: { low, high, pivot: pivotVal },
          },
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps, visitedCount: low, currentIndex: high, currentValue: pivotVal },
        });

        let i = low - 1;
        for (let j = low; j < high; j++) {
          comps++;
          const isLess = arr[j] <= pivotVal;

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 4,
            explanation: `Compare arr[${j}] (${arr[j]}) <= Pivot (${pivotVal}). ${isLess ? 'TRUE! Swap into left partition.' : 'FALSE! Stays in right partition.'}`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === high ? 'comparing' : idx === j ? 'swapping' : e.state) as ElementState,
            })),
            pointers: [{ name: 'j', index: j }, { name: 'PIVOT', index: high }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'j', index: j }, { name: 'PIVOT', index: high }]),
            dryRunRow: { step: frames.length + 1, currentIndex: j, currentValue: arr[j], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Compare ${arr[j]} vs Pivot ${pivotVal}` },
            storytelling: {
              goal: `Partition comparison at index ${j}.`,
              currentState: `arr[${j}] = ${arr[j]}, Pivot = ${pivotVal}.`,
              comparison: `${arr[j]} <= ${pivotVal} -> ${isLess}`,
              decision: isLess ? 'Increment partition pointer i & swap arr[i] and arr[j].' : 'Skip swap.',
              reason: isLess ? `${arr[j]} belongs in left partition.` : `${arr[j]} belongs in right partition.`,
              nextAction: isLess ? 'Execute partition swap.' : 'Advance j pointer.',
              whyRationale: 'Pointer i tracks boundary of smaller partition elements.',
              variableWatch: { i, j, pivot: pivotVal },
            },
            metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps, visitedCount: low, currentIndex: j, currentValue: arr[j] },
          });

          if (isLess) {
            i++;
            if (i !== j) {
              swaps++;
              const tmp = arr[i];
              arr[i] = arr[j];
              arr[j] = tmp;

              const tmpE = elements[i].val;
              elements[i].val = elements[j].val;
              elements[j].val = tmpE;

              frames.push({
                frameIndex: frames.length,
                lineHighlight: 5,
                explanation: `Partition Swap! Swapped arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}).`,
                array: elements.map((e, idx) => ({
                  ...e,
                  state: (idx === i || idx === j ? 'swapping' : idx === high ? 'comparing' : e.state) as ElementState,
                  arcOffset: idx === i ? -25 : idx === j ? 25 : 0,
                })),
                pointers: [{ name: 'i', index: i }, { name: 'j', index: j }],
                memoryAddresses: buildMemoryData(elements, [{ name: 'i', index: i }, { name: 'j', index: j }]),
                dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: arr[i], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Swapped arr[${i}] and arr[${j}]` },
                storytelling: {
                  goal: 'Execute partition swap.',
                  currentState: `Swapped arr[${i}] and arr[${j}].`,
                  decision: 'Expand left partition boundary.',
                  reason: 'Element is <= pivot.',
                  nextAction: 'Continue partition scan.',
                  whyRationale: 'Moves smaller elements into left section.',
                  variableWatch: { i, j, swaps },
                },
                metrics: { elapsedTimeMs: comps * 20 + 10, operations: comps + swaps, comparisons: comps, swaps, visitedCount: low, currentIndex: i, currentValue: arr[i] },
              });
            }
          }
        }

        // Swap pivot into correct position (i + 1)
        swaps++;
        const pi = i + 1;
        const tmp = arr[pi];
        arr[pi] = arr[high];
        arr[high] = tmp;

        const tmpE = elements[pi].val;
        elements[pi].val = elements[high].val;
        elements[high].val = tmpE;

        elements[pi].state = 'visited';
        elements[pi].label = undefined;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 6,
          explanation: `Placed Pivot ${arr[pi]} into its FINAL SORTED POSITION at index ${pi} (GREEN GLOW)!`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === pi ? 'visited' : e.state) as ElementState,
            particleType: idx === pi ? ('confetti' as const) : undefined,
          })),
          pointers: [{ name: 'PIVOT_LOCKED', index: pi }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'PIVOT_LOCKED', index: pi }]),
          dryRunRow: { step: frames.length + 1, currentIndex: pi, currentValue: arr[pi], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Pivot ${arr[pi]} locked at index ${pi}` },
          storytelling: {
            goal: `Lock Pivot ${arr[pi]} at index ${pi}.`,
            currentState: `Pivot ${arr[pi]} is in its final sorted position.`,
            decision: 'Recursively sort left and right partitions.',
            reason: 'All left elements <= pivot and right elements >= pivot.',
            nextAction: `Recurse on left [${low}..${pi - 1}] and right [${pi + 1}..${high}].`,
            whyRationale: 'Divide-and-conquer achieves O(N log N) time.',
            variableWatch: { pivotFinalIdx: pi, pivotVal: arr[pi] },
          },
          metrics: { elapsedTimeMs: comps * 20 + 20, operations: comps + swaps, comparisons: comps, swaps, visitedCount: pi, currentIndex: pi, currentValue: arr[pi] },
        });

        runQuickSort(low, pi - 1);
        runQuickSort(pi + 1, high);
      };

      runQuickSort(0, arr.length - 1);

      elements.forEach((e) => (e.state = 'visited'));
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 7,
        explanation: 'Quick Sort Completed Successfully!',
        array: elements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'SORTED', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'SORTED', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Sorted', maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Sorting complete.',
          currentState: `Array fully sorted: [${arr.join(', ')}].`,
          decision: 'Finish algorithm.',
          reason: 'All recursive partitions resolved.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Quick sort completed in O(N log N) time.',
          variableWatch: { status: 'Complete', comps, swaps },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 40, operations: comps + swaps, comparisons: comps, swaps, visitedCount: arr.length, currentIndex: 'Done', currentValue: 'Sorted' },
      });

      return frames;
    },
  },

  // 5. MERGE SORT (RECURSIVE DIVIDE & CONQUER)
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    description: 'Divides the array recursively into halves, sorts each half, and merges the two sorted halves back together seamlessly.',
    pseudoCode: `mergeSort(arr, l, r):\n    if l < r:\n        m = l + (r - l) / 2\n        mergeSort(arr, l, m)\n        mergeSort(arr, m + 1, r)\n        merge(arr, l, m, r)`,
    defaultInput: '45, 24, 88, 12, 56',
    analogy: 'Divide a stack of unsorted exam papers into two equal piles, recursively sort each pile, then zip-merge them into one sorted pile.',
    invariant: 'The sub-arrays [l..m] and [m+1..r] are individually sorted before the merge step combines them.',
    commonMistake: 'Forgetting that Merge Sort requires O(N) auxiliary space for temporary array storage during merging.',
    interviewTip: 'Merge Sort guarantees O(N log N) worst-case time and is STABLE, making it ideal for linked list sorting.',
    advantages: 'Guaranteed O(N log N) worst-case time complexity and stable.',
    disadvantages: 'Requires O(N) extra auxiliary memory space.',
    whenToUse: 'When stable sorting is strictly required or for external sorting.',
    quizQuestion: {
      question: 'What is the auxiliary space complexity of standard Merge Sort on arrays?',
      options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'],
      correctIndex: 0,
      explanation: 'Standard Merge Sort creates temporary sub-arrays during the merge phase, requiring O(N) auxiliary memory.',
    },
    relatedProblems: [
      { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium' },
      { title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self', difficulty: 'Hard' },
    ],
    codeSnippets: {
      java: `public void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m); mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}`,
      cpp: `void mergeSort(vector<int>& arr, int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m); mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}`,
      python: `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L, R = arr[:mid], arr[mid:]\n        merge_sort(L); merge_sort(R)\n        # merge logic...`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [45, 24, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let comps = 0;
      let ops = 0;

      const runMergeSort = (l: number, r: number) => {
        if (l >= r) return;

        const m = Math.floor(l + (r - l) / 2);

        ops++;
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `Divide Range [${l}..${r}] at Mid Index ${m}. Left Half: [${l}..${m}], Right Half: [${m + 1}..${r}].`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx >= l && idx <= m ? 'comparing' : idx > m && idx <= r ? 'swapping' : e.state) as ElementState,
          })),
          pointers: [{ name: 'left', index: l }, { name: 'mid', index: m }, { name: 'right', index: r }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'left', index: l }, { name: 'mid', index: m }, { name: 'right', index: r }]),
          dryRunRow: { step: frames.length + 1, currentIndex: `m:${m}`, currentValue: arr[m], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Divided at mid ${m}` },
          storytelling: {
            goal: `Divide array range [${l}..${r}] into two halves.`,
            currentState: `Range [${l}..${r}] split at mid = ${m}.`,
            decision: 'Recursively sort left and right halves.',
            reason: 'Divide step splits problem size in half (O(log N) depth).',
            nextAction: `Sort left half [${l}..${m}].`,
            whyRationale: 'Divide-and-conquer reduces complex sort to simple 1-element merges.',
            variableWatch: { l, m, r, depth: ops },
          },
          metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: comps, swaps: 0, visitedCount: r - l + 1, currentIndex: m, currentValue: arr[m] },
        });

        runMergeSort(l, m);
        runMergeSort(m + 1, r);

        // Merge logic
        const leftArr = arr.slice(l, m + 1);
        const rightArr = arr.slice(m + 1, r + 1);

        let i = 0, j = 0, k = l;

        while (i < leftArr.length && j < rightArr.length) {
          comps++;
          ops++;

          const takeLeft = leftArr[i] <= rightArr[j];

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 5,
            explanation: `Merge Step: Compare Left [${i}] (${leftArr[i]}) and Right [${j}] (${rightArr[j]}). Take ${takeLeft ? leftArr[i] : rightArr[j]}.`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === k ? 'inserted' : idx >= l && idx <= r ? 'comparing' : e.state) as ElementState,
            })),
            pointers: [{ name: 'k', index: k }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'k', index: k }]),
            dryRunRow: { step: frames.length + 1, currentIndex: k, currentValue: takeLeft ? leftArr[i] : rightArr[j], maxVal: Math.max(...arr), minVal: Math.min(...arr), action: `Merged ${takeLeft ? leftArr[i] : rightArr[j]}` },
            storytelling: {
              goal: `Merge sorted halves into main array position ${k}.`,
              currentState: `Left[${i}] = ${leftArr[i]}, Right[${j}] = ${rightArr[j]}.`,
              comparison: `${leftArr[i]} <= ${rightArr[j]} -> ${takeLeft}`,
              decision: takeLeft ? `Take ${leftArr[i]} from left half.` : `Take ${rightArr[j]} from right half.`,
              reason: 'Pick smaller element to preserve ascending order.',
              nextAction: 'Advance merge pointer k.',
              whyRationale: 'Two-pointer merge combines sorted sub-lists in O(N) linear time.',
              variableWatch: { k, leftVal: leftArr[i], rightVal: rightArr[j] },
            },
            metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: comps, swaps: 0, visitedCount: k, currentIndex: k, currentValue: takeLeft ? leftArr[i] : rightArr[j] },
          });

          if (takeLeft) {
            arr[k] = leftArr[i];
            elements[k].val = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            elements[k].val = rightArr[j];
            j++;
          }
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          elements[k].val = leftArr[i];
          i++; k++;
        }
        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          elements[k].val = rightArr[j];
          j++; k++;
        }

        for (let idx = l; idx <= r; idx++) {
          elements[idx].state = 'visited';
        }
      };

      runMergeSort(0, arr.length - 1);

      elements.forEach((e) => (e.state = 'visited'));
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: 'Merge Sort Completed Successfully!',
        array: elements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'SORTED', index: 0 }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'SORTED', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Sorted', maxVal: Math.max(...arr), minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Sorting complete.',
          currentState: `Array fully sorted: [${arr.join(', ')}].`,
          decision: 'Finish algorithm.',
          reason: 'All recursive merges completed.',
          nextAction: 'Show summary.',
          whyRationale: 'Merge sort completed in guaranteed O(N log N) time.',
          variableWatch: { status: 'Complete', totalComps: comps },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: ops * 20 + 40, operations: ops, comparisons: comps, swaps: 0, visitedCount: arr.length, currentIndex: 'Done', currentValue: 'Sorted' },
      });

      return frames;
    },
  },
];
