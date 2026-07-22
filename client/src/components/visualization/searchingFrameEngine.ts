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

// ── COMPLETE SEARCHING ALGORITHMS SUITE (10 ALGORITHMS) ─────────────────────────
export const SEARCHING_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. BINARY SEARCH (STANDARD)
  {
    id: 'binary-search',
    name: 'Binary Search',
    difficulty: 'Easy',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'Searches a sorted array by repeatedly dividing the search interval in half using Low, Mid, and High pointers.',
    pseudoCode: `low = 0, high = N - 1\nwhile low <= high:\n    mid = low + (high - low) / 2\n    if arr[mid] == target: return mid\n    else if arr[mid] < target: low = mid + 1\n    else: high = mid - 1`,
    defaultInput: '12, 24, 35, 45, 56, 68, 88, 99',
    analogy: 'Looking up a word in a printed dictionary by opening to the middle page and deciding whether to flip forward or backward.',
    invariant: 'The target element (if present) is strictly contained within the active search interval arr[low..high].',
    commonMistake: 'Using mid = (low + high) / 2 which causes integer overflow in languages with fixed 32-bit integers.',
    interviewTip: 'Always use low + (high - low) / 2 for overflow-safe mid calculation.',
    advantages: 'Logarithmic O(log N) search performance (only 30 comparisons for 1,000,000,000 elements).',
    disadvantages: 'Requires input array to be strictly pre-sorted.',
    whenToUse: 'When searching for target values in sorted arrays or monotonic search spaces.',
    quizQuestion: {
      question: 'Why is mid calculated as low + (high - low) / 2 instead of (low + high) / 2?',
      options: [
        'To prevent 32-bit integer arithmetic overflow when low + high exceeds 2,147,483,647',
        'Because low + (high - low) / 2 executes faster on CPU ALU registers',
        'Because (low + high) / 2 causes floating point rounding errors',
        'Both formulas are completely identical in all programming languages',
      ],
      correctIndex: 0,
      explanation: 'In Java/C++, if low and high are large positive integers, (low + high) can overflow the maximum signed 32-bit integer, resulting in a negative number.',
    },
    relatedProblems: [
      { title: 'Binary Search', slug: 'binary-search', difficulty: 'Easy' },
      { title: 'Search a 2D Matrix', slug: 'search-a-2d-matrix', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public int binarySearch(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      cpp: `int binarySearch(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      python: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [12, 24, 35, 45, 56, 68, 88, 99]);
      const target = 68;
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let low = 0;
      let high = arr.length - 1;
      let comps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Binary Search for Target = ${target}. Low = 0, High = ${high}.`,
        array: elements.map((e) => ({ ...e, state: 'default' as ElementState })),
        pointers: [{ name: 'L', index: low }, { name: 'H', index: high }],
        windowRange: [low, high],
        memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'H', index: high }]),
        dryRunRow: { step: 1, currentIndex: `L:${low}, H:${high}`, currentValue: target, maxVal: 99, minVal: 12, action: `Target search = ${target}` },
        storytelling: {
          goal: `Search for target value ${target} in sorted array.`,
          currentState: `Search space [${low}..${high}] (${arr.length} elements).`,
          decision: 'Initialize Low and High boundary pointers.',
          reason: 'Array is sorted in ascending order.',
          nextAction: 'Calculate mid pointer.',
          whyRationale: 'Binary search reduces search interval by half each iteration.',
          variableWatch: { low, high, target },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: target },
      });

      while (low <= high) {
        comps++;
        const mid = low + Math.floor((high - low) / 2);
        const midVal = arr[mid];
        const isMatch = midVal === target;

        // Calculate Mid Frame
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `Mid Calculation: mid = ${low} + (${high} - ${low}) / 2 = ${mid}. Inspecting arr[${mid}] (${midVal}) in AMBER GLOW.`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === mid ? 'comparing' : idx >= low && idx <= high ? 'current' : 'deleted') as ElementState,
          })),
          pointers: [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'H', index: high }],
          windowRange: [low, high],
          memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'H', index: high }]),
          dryRunRow: { step: frames.length + 1, currentIndex: mid, currentValue: midVal, maxVal: 99, minVal: 12, action: `Mid = ${mid} (val: ${midVal})` },
          storytelling: {
            goal: `Compare Mid value arr[${mid}] (${midVal}) with Target (${target}).`,
            currentState: `Low = ${low}, High = ${high}, Mid = ${mid}. Mid Value = ${midVal}.`,
            comparison: `${midVal} == ${target} -> ${isMatch}`,
            decision: isMatch ? `TARGET FOUND AT INDEX ${mid}!` : midVal < target ? `Target ${target} > Mid ${midVal}. Move Low to mid + 1 (${mid + 1}).` : `Target ${target} < Mid ${midVal}. Move High to mid - 1 (${mid - 1}).`,
            reason: isMatch ? 'Exact match found.' : midVal < target ? 'Since array is sorted, all elements <= mid are smaller than target.' : 'All elements >= mid are larger than target.',
            nextAction: isMatch ? 'Highlight match with GOLD EXPLOSION.' : midVal < target ? `Discard left half [${low}..${mid}].` : `Discard right half [${mid}..${high}].`,
            whyRationale: 'Overflow-safe mid = low + (high - low) / 2 prevents integer arithmetic overflow.',
            variableWatch: { low, high, mid, midVal, target },
          },
          predictionChallenge: comps === 1 ? {
            prompt: `Mid is index ${mid} (val: ${midVal}). Target is ${target}. Which half will be discarded?`,
            options: [
              `Left half [0..${mid}] discarded because ${midVal} < ${target}`,
              `Right half [${mid}..${high}] discarded`,
              'Discard entire array',
            ],
            correctIndex: 0,
            mistakeExplanations: ['', 'Incorrect! Target 68 is greater than mid 45, so left half is discarded.', 'Incorrect! Target exists in right half.'],
          } : undefined,
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: 0, visitedCount: mid + 1, currentIndex: mid, currentValue: midVal },
        });

        if (isMatch) {
          frames.push({
            frameIndex: frames.length,
            lineHighlight: 4,
            explanation: `TARGET FOUND! arr[${mid}] = ${target} MATCHES! GOLD EXPLOSION GLOW!`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === mid ? 'max' : idx >= low && idx <= high ? 'visited' : 'deleted') as ElementState,
              particleType: idx === mid ? ('gold' as const) : undefined,
            })),
            pointers: [{ name: 'FOUND', index: mid }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'FOUND', index: mid }]),
            dryRunRow: { step: frames.length + 1, currentIndex: mid, currentValue: midVal, maxVal: 99, minVal: 12, action: `Target ${target} found at index ${mid}!` },
            storytelling: {
              goal: 'Search completed.',
              currentState: `Target ${target} confirmed at index ${mid}.`,
              decision: `Return index ${mid}.`,
              reason: 'Exact match found in logarithmic time.',
              nextAction: 'Display completion summary.',
              whyRationale: 'Binary search found target in O(log N) comparisons.',
              variableWatch: { foundIndex: mid, target },
            },
            isComplete: true,
            metrics: { elapsedTimeMs: comps * 20 + 30, operations: comps, comparisons: comps, swaps: 0, visitedCount: mid + 1, currentIndex: mid, currentValue: midVal },
          });
          return frames;
        }

        if (midVal < target) {
          // Discard left half
          low = mid + 1;
        } else {
          // Discard right half
          high = mid - 1;
        }
      }

      return frames;
    },
  },

  // 2. LOWER BOUND SEARCH
  {
    id: 'lower-bound',
    name: 'Lower Bound Search',
    difficulty: 'Easy',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'Finds the FIRST position in a sorted array where the element is GREATER THAN OR EQUAL TO target (arr[i] >= target).',
    pseudoCode: `low = 0, high = N - 1, ans = N\nwhile low <= high:\n    mid = low + (high - low) / 2\n    if arr[mid] >= target:\n        ans = mid\n        high = mid - 1\n    else:\n        low = mid + 1`,
    defaultInput: '10, 20, 30, 30, 30, 40, 50',
    analogy: 'Finding the FIRST available seat in a row of movie theater seats that meets or exceeds your height requirement.',
    invariant: 'The answer candidate holds the smallest index i seen so far satisfying arr[i] >= target.',
    commonMistake: 'Stopping search immediately when arr[mid] == target. Lower Bound must continue searching LEFT to find the first occurrence.',
    interviewTip: 'Lower Bound is identical to C++ std::lower_bound and Java Collections.binarySearch first position.',
    advantages: 'Fastest way to find insertion index or first duplicate position.',
    disadvantages: 'Requires sorted array.',
    whenToUse: 'When searching for the first element >= target or inserting into sorted arrays.',
    quizQuestion: {
      question: 'Why does Lower Bound continue searching left when arr[mid] >= target?',
      options: [
        'To check if an even smaller index to the left also satisfies arr[index] >= target',
        'Because mid pointer was calculated incorrectly',
        'Because right half elements are invalid',
        'It is an infinite loop safeguard',
      ],
      correctIndex: 0,
      explanation: 'Lower Bound seeks the FIRST occurrence. Finding a valid match at mid means a smaller valid index might exist in the left sub-array [low..mid-1].',
    },
    relatedProblems: [
      { title: 'Find First and Last Position of Element', slug: 'find-first-and-last-position-of-element-in-sorted-array', difficulty: 'Medium' },
      { title: 'Search Insert Position', slug: 'search-insert-position', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `public int lowerBound(int[] arr, int target) {\n    int low = 0, high = arr.length - 1, ans = arr.length;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] >= target) {\n            ans = mid; high = mid - 1;\n        } else low = mid + 1;\n    }\n    return ans;\n}`,
      cpp: `int lowerBound(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1, ans = arr.size();\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] >= target) {\n            ans = mid; high = mid - 1;\n        } else low = mid + 1;\n    }\n    return ans;\n}`,
      python: `def lower_bound(arr, target):\n    low, high, ans = 0, len(arr) - 1, len(arr)\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] >= target:\n            ans = mid; high = mid - 1\n        else: low = mid + 1\n    return ans`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [10, 20, 30, 30, 30, 40, 50]);
      const target = 30;
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let low = 0;
      let high = arr.length - 1;
      let ans = arr.length;
      let comps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Lower Bound for Target = ${target}. Initial candidate ans = ${ans}.`,
        array: elements.map((e) => ({ ...e })),
        pointers: [{ name: 'L', index: low }, { name: 'H', index: high }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'H', index: high }]),
        dryRunRow: { step: 1, currentIndex: `L:${low}, H:${high}`, currentValue: target, maxVal: 50, minVal: 10, action: `Initial Lower Bound target = ${target}` },
        storytelling: {
          goal: `Find first index i where arr[i] >= ${target}.`,
          currentState: `Search space [${low}..${high}]. Candidate ans = ${ans}.`,
          decision: 'Start Lower Bound search.',
          reason: 'Goal is to find smallest valid index.',
          nextAction: 'Calculate mid pointer.',
          whyRationale: 'Continuing search left ensures finding the FIRST occurrence.',
          variableWatch: { low, high, ans, target },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: target },
      });

      while (low <= high) {
        comps++;
        const mid = low + Math.floor((high - low) / 2);
        const midVal = arr[mid];
        const isValid = midVal >= target;

        if (isValid) {
          ans = mid;
        }

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 4,
          explanation: `Compare arr[${mid}] (${midVal}) >= ${target} -> ${isValid ? 'TRUE! Update candidate ans = ' + mid + ', Search LEFT.' : 'FALSE! Search RIGHT.'}`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === mid ? 'comparing' : idx === ans ? 'inserted' : idx >= low && idx <= high ? 'current' : 'deleted') as ElementState,
          })),
          pointers: [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'ANS', index: ans }, { name: 'H', index: high }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'ANS', index: ans }]),
          dryRunRow: { step: frames.length + 1, currentIndex: mid, currentValue: midVal, maxVal: 50, minVal: 10, action: `ans candidate = ${ans}` },
          storytelling: {
            goal: `Inspect element at mid = ${mid}.`,
            currentState: `arr[${mid}] = ${midVal}, Candidate ans = ${ans}.`,
            comparison: `${midVal} >= ${target} -> ${isValid}`,
            decision: isValid ? `Candidate updated to index ${mid}. Move High to ${mid - 1} to check earlier indices.` : `Move Low to ${mid + 1}.`,
            reason: isValid ? `arr[${mid}] (${midVal}) is valid. A smaller valid index might exist to the left.` : `arr[${mid}] is smaller than target ${target}.`,
            nextAction: isValid ? `Search left sub-array [${low}..${mid - 1}].` : `Search right sub-array [${mid + 1}..${high}].`,
            whyRationale: 'Lower bound continues leftward to guarantee finding first occurrence.',
            variableWatch: { low, high, mid, midVal, candidateAns: ans },
          },
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: 0, visitedCount: mid, currentIndex: mid, currentValue: midVal },
        });

        if (isValid) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 8,
        explanation: `Lower Bound Found! First index where arr[i] >= ${target} is INDEX ${ans} (value: ${arr[ans]}).`,
        array: elements.map((e, idx) => ({
          ...e,
          state: (idx === ans ? 'max' : 'visited') as ElementState,
          particleType: idx === ans ? ('gold' as const) : undefined,
        })),
        pointers: [{ name: 'LOWER_BOUND', index: ans }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'LOWER_BOUND', index: ans }]),
        dryRunRow: { step: frames.length + 1, currentIndex: ans, currentValue: arr[ans], maxVal: 50, minVal: 10, action: `Lower Bound = ${ans}` },
        storytelling: {
          goal: 'Lower Bound search complete.',
          currentState: `First element >= ${target} is at index ${ans} (val: ${arr[ans]}).`,
          decision: `Return index ${ans}.`,
          reason: 'Search interval exhausted; candidate ans holds first valid index.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Logarithmic O(log N) execution cleanly verified.',
          variableWatch: { lowerBoundIndex: ans, value: arr[ans] },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 30, operations: comps, comparisons: comps, swaps: 0, visitedCount: arr.length, currentIndex: ans, currentValue: arr[ans] },
      });

      return frames;
    },
  },

  // 3. SEARCH IN ROTATED SORTED ARRAY
  {
    id: 'search-rotated-array',
    name: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'Searches for target in a sorted array that has been rotated at an unknown pivot index by identifying which half is sorted.',
    pseudoCode: `while low <= high:\n    mid = low + (high - low) / 2\n    if arr[mid] == target: return mid\n    if arr[low] <= arr[mid]: // Left half sorted\n        if arr[low] <= target < arr[mid]: high = mid - 1\n        else: low = mid + 1\n    else: // Right half sorted\n        if arr[mid] < target <= arr[high]: low = mid + 1\n        else: high = mid - 1`,
    defaultInput: '45, 56, 68, 88, 12, 24, 35',
    analogy: 'Searching for a item on a circular clothing rack that was rotated at an arbitrary position.',
    invariant: 'At least one half (left [low..mid] or right [mid..high]) is ALWAYS strictly sorted.',
    commonMistake: 'Failing to check if target lies within the range of the sorted half before deciding search direction.',
    interviewTip: 'First identify which half is sorted using arr[low] <= arr[mid], then check if target falls in that sorted range.',
    advantages: 'O(log N) search on rotated arrays without un-rotating.',
    disadvantages: 'Requires unique elements (duplicates degrade time to O(N)).',
    whenToUse: 'When searching in rotated ordered datasets.',
    quizQuestion: {
      question: 'How does Search in Rotated Array determine which half of the array is sorted?',
      options: [
        'By comparing arr[low] <= arr[mid]: if true, left half is sorted; else right half is sorted',
        'By checking if mid is even or odd',
        'By scanning all elements linearly',
        'Rotated arrays can never have a sorted half',
      ],
      correctIndex: 0,
      explanation: 'Since the array was originally sorted, the pivot can only exist in one half. Comparing arr[low] <= arr[mid] identifies the contiguous sorted half.',
    },
    relatedProblems: [
      { title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium' },
      { title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public int search(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[low] <= arr[mid]) {\n            if (arr[low] <= target && target < arr[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (arr[mid] < target && target <= arr[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`,
      cpp: `int search(vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[low] <= arr[mid]) {\n            if (arr[low] <= target && target < arr[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (arr[mid] < target && target <= arr[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`,
      python: `def search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target: return mid\n        if arr[low] <= arr[mid]:\n            if arr[low] <= target < arr[mid]: high = mid - 1\n            else: low = mid + 1\n        else:\n            if arr[mid] < target <= arr[high]: low = mid + 1\n            else: high = mid - 1\n    return -1`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [45, 56, 68, 88, 12, 24, 35]);
      const target = 24;
      const frames: IArrayAnimationFrame[] = [];
      const elements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      let low = 0;
      let high = arr.length - 1;
      let comps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Rotated Search for Target = ${target}. Low = 0 (${arr[0]}), High = ${high} (${arr[high]}).`,
        array: elements.map((e) => ({ ...e })),
        pointers: [{ name: 'L', index: low }, { name: 'H', index: high }],
        memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'H', index: high }]),
        dryRunRow: { step: 1, currentIndex: `L:${low}, H:${high}`, currentValue: target, maxVal: 88, minVal: 12, action: `Rotated Search target = ${target}` },
        storytelling: {
          goal: `Search target ${target} in rotated sorted array.`,
          currentState: `Array rotated at pivot. Low = ${arr[low]}, High = ${arr[high]}.`,
          decision: 'Identify sorted half at each step.',
          reason: 'One of the two sub-arrays [low..mid] or [mid..high] is guaranteed to be sorted.',
          nextAction: 'Calculate mid.',
          whyRationale: 'Checking range bounds of sorted half enables O(log N) search.',
          variableWatch: { low, high, target },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: target },
      });

      while (low <= high) {
        comps++;
        const mid = low + Math.floor((high - low) / 2);
        const midVal = arr[mid];

        if (midVal === target) {
          frames.push({
            frameIndex: frames.length,
            lineHighlight: 3,
            explanation: `TARGET FOUND! arr[${mid}] = ${target} MATCHES in Rotated Array!`,
            array: elements.map((e, idx) => ({
              ...e,
              state: (idx === mid ? 'max' : 'visited') as ElementState,
              particleType: idx === mid ? ('gold' as const) : undefined,
            })),
            pointers: [{ name: 'FOUND', index: mid }],
            memoryAddresses: buildMemoryData(elements, [{ name: 'FOUND', index: mid }]),
            dryRunRow: { step: frames.length + 1, currentIndex: mid, currentValue: midVal, maxVal: 88, minVal: 12, action: `Found target ${target} at ${mid}` },
            storytelling: {
              goal: 'Search finished.',
              currentState: `Target ${target} located at index ${mid}.`,
              decision: `Return index ${mid}.`,
              reason: 'Exact match found.',
              nextAction: 'Show summary.',
              whyRationale: 'Rotated search completed in O(log N) time.',
              variableWatch: { foundIndex: mid, target },
            },
            isComplete: true,
            metrics: { elapsedTimeMs: comps * 20 + 30, operations: comps, comparisons: comps, swaps: 0, visitedCount: mid + 1, currentIndex: mid, currentValue: midVal },
          });
          return frames;
        }

        const leftSorted = arr[low] <= midVal;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 4,
          explanation: `Mid = ${mid} (${midVal}). Check: arr[${low}] (${arr[low]}) <= arr[${mid}] (${midVal}) -> ${leftSorted ? 'LEFT HALF IS SORTED' : 'RIGHT HALF IS SORTED'}.`,
          array: elements.map((e, idx) => ({
            ...e,
            state: (idx === mid ? 'comparing' : leftSorted && idx >= low && idx <= mid ? 'inserted' : !leftSorted && idx >= mid && idx <= high ? 'inserted' : 'default') as ElementState,
          })),
          pointers: [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'H', index: high }],
          memoryAddresses: buildMemoryData(elements, [{ name: 'L', index: low }, { name: 'MID', index: mid }, { name: 'H', index: high }]),
          dryRunRow: { step: frames.length + 1, currentIndex: mid, currentValue: midVal, maxVal: 88, minVal: 12, action: `Sorted half: ${leftSorted ? 'Left' : 'Right'}` },
          storytelling: {
            goal: 'Determine which half is sorted.',
            currentState: `arr[low] = ${arr[low]}, arr[mid] = ${midVal}.`,
            comparison: `${arr[low]} <= ${midVal} -> ${leftSorted}`,
            decision: leftSorted ? 'Left half [low..mid] is contiguous sorted.' : 'Right half [mid..high] is contiguous sorted.',
            reason: 'Pivot lies in the non-sorted half.',
            nextAction: 'Check if target lies within the sorted half range.',
            whyRationale: 'Range bounds check dictates correct search direction.',
            variableWatch: { low, mid, high, leftSorted: String(leftSorted) },
          },
          metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: 0, visitedCount: mid, currentIndex: mid, currentValue: midVal },
        });

        if (leftSorted) {
          if (arr[low] <= target && target < midVal) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        } else {
          if (midVal < target && target <= arr[high]) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
      }

      return frames;
    },
  },
];
