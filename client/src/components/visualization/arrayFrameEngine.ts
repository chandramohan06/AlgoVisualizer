export type ElementState =
  | 'default'
  | 'current'
  | 'visited'
  | 'comparing'
  | 'swapping'
  | 'inserted'
  | 'deleted'
  | 'max'
  | 'min';

export interface IArrayElement {
  id: string;
  val: number;
  state: ElementState;
  label?: string;
  address?: string;
  hasCrown?: boolean;
  hasCrystal?: boolean;
  arcOffset?: number;
  shake?: boolean;
  particleType?: 'sparks' | 'purple' | 'gold' | 'confetti';
}

export interface IPointerInfo {
  name: string;
  index: number;
  color?: string;
}

export interface IDryRunRow {
  step: number;
  currentIndex: number | string;
  currentValue: number | string;
  maxVal: number | string;
  minVal: number | string;
  action: string;
}

export interface IStorytellingStep {
  goal: string;
  currentState: string;
  comparison?: string;
  decision: string;
  reason: string;
  nextAction: string;
  whyRationale: string;
  variableWatch: Record<string, number | string>;
}

export interface IPredictionChallenge {
  prompt: string;
  options: string[];
  correctIndex: number;
  mistakeExplanations: string[];
}

export interface IArrayAnimationFrame {
  frameIndex: number;
  lineHighlight: number;
  explanation: string;
  array: IArrayElement[];
  pointers: IPointerInfo[];
  windowRange?: [number, number];
  auxArray?: IArrayElement[];
  memoryAddresses: { index: number; address: string; val: number; state: ElementState; pointer?: string }[];
  treeData?: {
    nodes: { id: string; val: number; x: number; y: number; state: string; label?: string; address: string }[];
    edges: { id: string; fromX: number; fromY: number; toX: number; toY: number; pathD: string; state: string }[];
  };
  graphData?: {
    nodes: { id: string; label: string; x: number; y: number; state: string; dist?: string | number; inDegree?: number }[];
    edges: { id: string; fromId: string; toId: string; fromX: number; fromY: number; toX: number; toY: number; weight?: number; isDirected?: boolean; state: string; pathD: string }[];
    stats?: { vertices: number; edges: number; density: string; components: number; hasCycle: boolean; avgDegree: string };
  };
  dryRunRow: IDryRunRow;
  storytelling: IStorytellingStep;
  predictionChallenge?: IPredictionChallenge;
  isComplete?: boolean;
  cameraZoom?: boolean;
  metrics: {
    elapsedTimeMs: number;
    operations: number;
    comparisons: number;
    swaps: number;
    visitedCount: number;
    currentIndex: number | string;
    currentValue: number | string;
    maximum?: number;
    minimum?: number;
  };
}

export interface IArrayAlgorithmMeta {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  pseudoCode: string;
  defaultInput: string;
  analogy: string;
  invariant: string;
  commonMistake: string;
  interviewTip: string;
  advantages: string;
  disadvantages: string;
  whenToUse: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  relatedProblems: { title: string; slug: string; difficulty: string }[];
  codeSnippets: {
    java: string;
    cpp: string;
    python: string;
  };
  generateFrames: (inputStr: string) => IArrayAnimationFrame[];
}

// Helpers
const parseInputNumbers = (inputStr: string, fallback: number[]): number[] => {
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

// ── STORYTELLING ARRAY ALGORITHMS REGISTRY ───────────────────────────────────────
export const ARRAY_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. TRAVERSAL
  {
    id: 'traversal',
    name: 'Array Traversal',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Sequentially visits each element at MICRO-STEP resolution with rich educational storytelling narration.',
    pseudoCode: `for i = 0 to N-1:\n    movePointer(i)\n    read(arr[i])\n    visitedCount++`,
    defaultInput: '24, 45, 88, 12, 56',
    analogy: 'Imagine walking down a row of lockers, opening each door one by one to inspect its contents.',
    invariant: 'All array elements before index i have been visited and processed.',
    commonMistake: 'Accidentally using <= arr.length in loop condition, causing an IndexOutOfBoundsException.',
    interviewTip: 'Always mention that array traversal is cache-friendly due to spatial locality of contiguous memory.',
    advantages: 'O(1) random access and optimal hardware cache utilization.',
    disadvantages: 'Fixed size allocation in static arrays.',
    whenToUse: 'When every element in an array needs to be inspected or transformed.',
    quizQuestion: {
      question: 'Why does traversing an N-element array take O(N) time complexity?',
      options: [
        'Because each element is visited exactly once in contiguous memory',
        'Because array elements are stored in random non-contiguous memory',
        'Because array traversal requires nested loops',
        'Because memory access takes exponential time',
      ],
      correctIndex: 0,
      explanation: 'Array elements occupy contiguous memory locations. Visiting each of the N elements takes constant O(1) time per element, yielding O(N) total time.',
    },
    relatedProblems: [
      { title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Easy' },
      { title: 'Running Sum of 1d Array', slug: 'running-sum-of-1d-array', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `for (int i = 0; i < arr.length; i++) {\n    System.out.println("Index " + i + ": " + arr[i]);\n}`,
      cpp: `for (int i = 0; i < arr.size(); i++) {\n    cout << "Index " << i << ": " << arr[i] << endl;\n}`,
      python: `for i, val in enumerate(arr):\n    print(f"Index {i}: {val}")`,
    },
    generateFrames: (inputStr) => {
      const arr = parseInputNumbers(inputStr, [24, 45, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      const baseElements: IArrayElement[] = arr.map((val, idx) => ({ id: `el-${idx}`, val, state: 'default', address: getSimulatedAddress(idx) }));

      const maxVal = Math.max(...arr);
      const minVal = Math.min(...arr);

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Array Traversal. Array size N = ${arr.length}.`,
        array: baseElements.map((e) => ({ ...e })),
        pointers: [{ name: 'i', index: 0 }],
        memoryAddresses: buildMemoryData(baseElements, [{ name: 'i', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: arr[0], maxVal, minVal, action: 'Initialize pointer i = 0' },
        storytelling: {
          goal: 'Visit every element in the array sequentially.',
          currentState: `Array length = ${arr.length}. Pointer i = 0.`,
          decision: 'Start traversal at index 0.',
          reason: 'Array indices start at 0 in contiguous memory.',
          nextAction: 'Move pointer i to index 0.',
          whyRationale: 'Sequential traversal ensures no element is skipped.',
          variableWatch: { i: 0, N: arr.length, 'arr[0]': arr[0] },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: arr[0], maximum: maxVal, minimum: minVal },
      });

      for (let i = 0; i < arr.length; i++) {
        const val = arr[i];

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `Reading value arr[${i}] = ${val} at memory address ${getSimulatedAddress(i)}.`,
          array: baseElements.map((e, idx) => ({
            ...e,
            state: (idx === i ? 'current' : idx < i ? 'visited' : 'default') as ElementState,
          })),
          pointers: [{ name: 'i', index: i }],
          memoryAddresses: buildMemoryData(baseElements, [{ name: 'i', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: val, maxVal, minVal, action: `Reading value ${val}` },
          storytelling: {
            goal: `Inspect element at index ${i}.`,
            currentState: `Pointer i = ${i}. Current Value = ${val}. Visited = ${i}.`,
            decision: `Read and process value ${val}.`,
            reason: `The algorithm needs to inspect each contiguous slot in RAM.`,
            nextAction: i < arr.length - 1 ? `Advance pointer i to index ${i + 1}.` : 'Complete traversal.',
            whyRationale: 'Contiguous RAM slots allow direct O(1) memory address calculations (base + i * size).',
            variableWatch: { i, val, visited: i, address: getSimulatedAddress(i) },
          },
          predictionChallenge: i === 1 ? {
            prompt: `What will happen when pointer i advances to index 2?`,
            options: [
              `Read value ${arr[2]} from memory address ${getSimulatedAddress(2)}`,
              'Jump directly to the last element',
              'Terminate loop immediately',
            ],
            correctIndex: 0,
            mistakeExplanations: [
              '',
              'Incorrect! Sequential traversal processes contiguous indices in order without jumping.',
              'Incorrect! The loop continues until i reaches N-1.',
            ],
          } : undefined,
          metrics: { elapsedTimeMs: (i + 1) * 20, operations: i + 1, comparisons: 0, swaps: 0, visitedCount: i + 1, currentIndex: i, currentValue: val, maximum: maxVal, minimum: minVal },
        });
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 3,
        explanation: 'Array Traversal Completed Successfully!',
        array: baseElements.map((e) => ({ ...e, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'done', index: arr.length - 1 }],
        memoryAddresses: buildMemoryData(baseElements, [{ name: 'done', index: arr.length - 1 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Complete', maxVal, minVal, action: 'Completed Successfully' },
        storytelling: {
          goal: 'Traversal complete.',
          currentState: `Visited all ${arr.length} elements.`,
          decision: 'Finish algorithm.',
          reason: 'Loop condition i < N is now false.',
          nextAction: 'Display completion summary.',
          whyRationale: 'All elements have been visited in linear O(N) time.',
          variableWatch: { i: arr.length, status: 'Complete' },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: arr.length * 20 + 30, operations: arr.length, comparisons: 0, swaps: 0, visitedCount: arr.length, currentIndex: 'End', currentValue: 'Complete', maximum: maxVal, minimum: minVal },
      });

      return frames;
    },
  },

  // 2. DYNAMIC ARRAY MEMORY EXPANSION (REALLOCATION DEMO)
  {
    id: 'dynamic-expansion',
    name: 'Dynamic Array Memory Expansion',
    difficulty: 'Medium',
    timeComplexity: 'O(N) Amortized O(1)',
    spaceComplexity: 'O(N)',
    description: 'Demonstrates how dynamic arrays (ArrayList/Vector) allocate 2x capacity in new RAM memory, copy elements 1-by-1, and deallocate old RAM memory when capacity is exceeded.',
    pseudoCode: `if size == capacity:\n    newCapacity = capacity * 2\n    newMemory = allocate(newCapacity)\n    copyElements(oldMemory, newMemory)\n    deallocate(oldMemory)\n    capacity = newCapacity`,
    defaultInput: '10, 20, 30, 40',
    analogy: 'Imagine a auditorium with 4 filled seats. When a 5th guest arrives, everyone must stand up and move to a brand new 8-seat auditorium.',
    invariant: 'The elements in the new memory block maintain exact relative order from the old memory block.',
    commonMistake: 'Thinking dynamic arrays reallocate memory on every insertion. Doubling strategy achieves O(1) amortized insertion.',
    interviewTip: 'When asked why ArrayList resizes by 2x, explain that geometric doubling guarantees O(1) amortized time per insertion.',
    advantages: 'Flexible dynamic resizing without manual fixed size declaration.',
    disadvantages: 'Occasional O(N) reallocation copy overhead during capacity spikes.',
    whenToUse: 'When array size is unknown at compile time.',
    quizQuestion: {
      question: 'What is the amortized time complexity of inserting an element into a dynamic array (ArrayList)?',
      options: [
        'O(1) Amortized Constant Time',
        'O(N) Linear Time always',
        'O(N log N) Logarithmic Time',
        'O(N^2) Quadratic Time',
      ],
      correctIndex: 0,
      explanation: 'Although resizing takes O(N) time occasionally, doubling capacity ensures resizing happens so rarely that average cost per insert is constant O(1).',
    },
    relatedProblems: [
      { title: 'Design Dynamic Array', slug: 'design-dynamic-array', difficulty: 'Easy' },
      { title: 'Reshape the Matrix', slug: 'reshape-the-matrix', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `List<Integer> list = new ArrayList<>(4);\n// When capacity=4 is full, list allocates capacity=8 and copies elements.`,
      cpp: `vector<int> vec;\nvec.reserve(4);\n// When size == capacity, vec doubles capacity to 8.`,
      python: `arr = []\n# Python lists dynamically double internal buffer capacity automatically.`,
    },
    generateFrames: (inputStr) => {
      const arr = parseInputNumbers(inputStr, [10, 20, 30, 40]);
      const newItem = 50;
      const oldCap = 4;
      const newCap = 8;
      const frames: IArrayAnimationFrame[] = [];

      const oldMemBase = 0x7fff00;
      const newMemBase = 0x800000;

      const oldElements: IArrayElement[] = arr.map((val, idx) => ({
        id: `old-${idx}`,
        val,
        state: 'default',
        address: getSimulatedAddress(idx, oldMemBase),
      }));

      // Frame 1: Full Array Notice
      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Attempting to insert ${newItem}. Array is FULL! Size (${arr.length}) == Capacity (${oldCap}) at RAM Base ${getSimulatedAddress(0, oldMemBase)}.`,
        array: [...oldElements],
        pointers: [{ name: 'FULL', index: oldCap - 1 }],
        memoryAddresses: buildMemoryData(oldElements, [{ name: 'FULL', index: oldCap - 1 }], oldMemBase),
        dryRunRow: { step: 1, currentIndex: oldCap, currentValue: newItem, maxVal: 50, minVal: 10, action: 'Capacity Full (4/4)' },
        storytelling: {
          goal: `Insert value ${newItem} into dynamic array.`,
          currentState: `Size = 4, Capacity = 4. Memory at ${getSimulatedAddress(0, oldMemBase)} is FULL.`,
          decision: `Trigger 2x Dynamic Re-allocation!`,
          reason: 'Contiguous memory block cannot expand in-place if adjacent RAM is occupied.',
          nextAction: `Allocate new RAM block of size 2 * 4 = 8.`,
          whyRationale: 'Dynamic arrays double capacity to maintain O(1) amortized insertion performance.',
          variableWatch: { size: 4, capacity: 4, action: 'REALLOCATE' },
        },
        metrics: { elapsedTimeMs: 0, operations: 1, comparisons: 0, swaps: 0, visitedCount: 4, currentIndex: 4, currentValue: newItem },
      });

      // Frame 2: Allocate New Memory Block
      frames.push({
        frameIndex: 1,
        lineHighlight: 2,
        explanation: `Allocated NEW RAM Memory Block of size ${newCap} at Base Address ${getSimulatedAddress(0, newMemBase)}.`,
        array: [...oldElements],
        pointers: [{ name: 'NEW_RAM', index: 0 }],
        cameraZoom: true,
        memoryAddresses: buildMemoryData(oldElements, [{ name: 'OLD_RAM', index: 0 }], oldMemBase),
        dryRunRow: { step: 2, currentIndex: 'New RAM', currentValue: `Cap ${newCap}`, maxVal: 50, minVal: 10, action: `Allocated RAM Base ${getSimulatedAddress(0, newMemBase)}` },
        storytelling: {
          goal: 'Allocate new memory chunk.',
          currentState: `New Capacity = ${newCap} slots reserved at ${getSimulatedAddress(0, newMemBase)}.`,
          decision: 'Reserve 8 contiguous slots.',
          reason: 'Doubling capacity avoids frequent reallocation overhead.',
          nextAction: 'Copy elements 1-by-1 from old RAM to new RAM.',
          whyRationale: 'Doubling capacity strategy ensures average insert cost remains O(1).',
          variableWatch: { oldCap: 4, newCap: 8, newBase: getSimulatedAddress(0, newMemBase) },
        },
        metrics: { elapsedTimeMs: 30, operations: 2, comparisons: 0, swaps: 0, visitedCount: 4, currentIndex: 'Allocated', currentValue: newCap },
      });

      // Copy elements 1-by-1
      const newElements: IArrayElement[] = [];
      for (let i = 0; i < arr.length; i++) {
        newElements.push({
          id: `new-${i}`,
          val: arr[i],
          state: 'inserted',
          address: getSimulatedAddress(i, newMemBase),
          particleType: 'sparks',
        });

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 4,
          explanation: `Copying element ${arr[i]} from Old Address ${getSimulatedAddress(i, oldMemBase)} to New Address ${getSimulatedAddress(i, newMemBase)}.`,
          array: [...newElements],
          pointers: [{ name: 'copy', index: i }],
          memoryAddresses: buildMemoryData(newElements, [{ name: 'copy', index: i }], newMemBase),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: arr[i], maxVal: 50, minVal: 10, action: `Copied ${arr[i]} to ${getSimulatedAddress(i, newMemBase)}` },
          storytelling: {
            goal: `Copy element at index ${i}.`,
            currentState: `Copied ${i + 1} / ${arr.length} elements to new memory block.`,
            decision: `Copy ${arr[i]} to new RAM address ${getSimulatedAddress(i, newMemBase)}.`,
            reason: 'Preserve exact relative order in new memory block.',
            nextAction: i < arr.length - 1 ? `Copy element ${i + 1} next.` : `Deallocate old RAM and insert ${newItem}.`,
            whyRationale: 'Element copying is O(N) during reallocation frames.',
            variableWatch: { copyIdx: i, val: arr[i], oldAddr: getSimulatedAddress(i, oldMemBase), newAddr: getSimulatedAddress(i, newMemBase) },
          },
          metrics: { elapsedTimeMs: frames.length * 25, operations: frames.length, comparisons: 0, swaps: i + 1, visitedCount: i + 1, currentIndex: i, currentValue: arr[i] },
        });
      }

      // Insert new element 50
      newElements.push({
        id: `new-inserted`,
        val: newItem,
        state: 'inserted',
        label: 'NEW',
        address: getSimulatedAddress(4, newMemBase),
        particleType: 'purple',
      });

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: `Old RAM Block ${getSimulatedAddress(0, oldMemBase)} DEALLOCATED! Inserted ${newItem} into new slot index 4 (${getSimulatedAddress(4, newMemBase)}) with PURPLE GLOW!`,
        array: [...newElements],
        pointers: [{ name: 'INSERTED', index: 4 }],
        cameraZoom: true,
        memoryAddresses: buildMemoryData(newElements, [{ name: 'INSERTED', index: 4 }], newMemBase),
        dryRunRow: { step: frames.length + 1, currentIndex: 4, currentValue: newItem, maxVal: 50, minVal: 10, action: `Inserted ${newItem} in new RAM` },
        storytelling: {
          goal: `Write new value ${newItem}.`,
          currentState: `New Size = 5, New Capacity = 8.`,
          decision: `Write ${newItem} into slot 4 of new RAM block.`,
          reason: 'New RAM block has 4 free slots remaining.',
          nextAction: 'Complete expansion process.',
          whyRationale: 'Reallocation successful! Next 3 insertions will execute in instant O(1) time without resizing.',
          variableWatch: { size: 5, capacity: 8, inserted: newItem },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: frames.length * 25 + 30, operations: frames.length, comparisons: 0, swaps: 5, visitedCount: 5, currentIndex: 4, currentValue: newItem },
      });

      return frames;
    },
  },

  // 3. FIND MAXIMUM
  {
    id: 'find-max',
    name: 'Find Maximum Element',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Finds maximum element with GOLD CROWN flight storytelling.',
    pseudoCode: `maxVal = arr[0], maxIndex = 0\nfor i = 1 to N-1:\n    if arr[i] > maxVal:\n        maxVal = arr[i]\n        flyCrown(i)`,
    defaultInput: '24, 45, 88, 12, 56',
    analogy: 'Finding the tallest student in a classroom by comparing each student with the tallest one found so far.',
    invariant: 'Current Max is always the largest element among all inspected elements [0..i-1].',
    commonMistake: 'Initializing maxVal to 0 instead of arr[0], which breaks for negative arrays.',
    interviewTip: 'Always initialize max to arr[0] or Integer.MIN_VALUE.',
    advantages: 'Single pass linear O(N) comparison.',
    disadvantages: 'Requires scanning every element in unsorted arrays.',
    whenToUse: 'When finding peak extreme values.',
    quizQuestion: {
      question: 'Why should maxVal be initialized to arr[0] instead of 0?',
      options: [
        'Because if all array elements are negative, initializing to 0 would yield an incorrect result of 0',
        'Because arr[0] uses less memory than 0',
        'Because index 0 is faster to access',
        'It is just a stylistic convention',
      ],
      correctIndex: 0,
      explanation: 'If an array contains negative numbers (e.g. [-5, -12, -3]), initializing max to 0 returns 0 which is not present in the array.',
    },
    relatedProblems: [
      { title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'Medium' },
      { title: 'Third Maximum Number', slug: 'third-maximum-number', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `int maxVal = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] > maxVal) {\n        maxVal = arr[i];\n    }\n}`,
      cpp: `int maxVal = arr[0];\nfor (int i = 1; i < arr.size(); i++) {\n    if (arr[i] > maxVal) maxVal = arr[i];\n}`,
      python: `max_val = arr[0]\nfor val in arr[1:]:\n    if val > max_val: max_val = val`,
    },
    generateFrames: (inputStr) => {
      const arr = parseInputNumbers(inputStr, [24, 45, 88, 12, 56]);
      const frames: IArrayAnimationFrame[] = [];
      let maxVal = arr[0];
      let maxIdx = 0;

      const getArrState = (currI: number, maxI: number) => {
        return arr.map((val, idx) => ({
          id: `el-${idx}`,
          val,
          state: (idx === maxI ? 'max' : idx === currI ? 'comparing' : idx < currI ? 'visited' : 'default') as ElementState,
          address: getSimulatedAddress(idx),
          hasCrown: idx === maxI,
        }));
      };

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initial Maximum set to arr[0] (${maxVal}) with GOLD CROWN!`,
        array: getArrState(0, 0),
        pointers: [{ name: 'CROWN MAX', index: 0 }],
        memoryAddresses: buildMemoryData(getArrState(0, 0), [{ name: 'CROWN MAX', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: maxVal, maxVal, minVal: Math.min(...arr), action: `Initial Max = ${maxVal}` },
        storytelling: {
          goal: 'Find the largest element in the array.',
          currentState: `Current Max = ${maxVal} at index 0.`,
          decision: 'Initialize max to first element.',
          reason: 'Assume arr[0] is max until a larger value is found.',
          nextAction: 'Inspect index 1.',
          whyRationale: 'Initializing to arr[0] guarantees correctness for negative values.',
          variableWatch: { maxVal, maxIdx: 0, i: 0 },
        },
        metrics: { elapsedTimeMs: 0, operations: 1, comparisons: 0, swaps: 0, visitedCount: 1, currentIndex: 0, currentValue: maxVal, maximum: maxVal, minimum: Math.min(...arr) },
      });

      for (let i = 1; i < arr.length; i++) {
        const val = arr[i];
        const isNewMax = val > maxVal;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `Compare arr[${i}] (${val}) with Crown Max (${maxVal}). ${isNewMax ? 'NEW MAXIMUM FOUND!' : `${val} <= ${maxVal}`}`,
          array: getArrState(i, maxIdx),
          pointers: [{ name: 'CROWN', index: maxIdx }, { name: 'i', index: i }],
          memoryAddresses: buildMemoryData(getArrState(i, maxIdx), [{ name: 'CROWN', index: maxIdx }, { name: 'i', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: val, maxVal, minVal: Math.min(...arr), action: `Compare ${val} vs Max ${maxVal}` },
          storytelling: {
            goal: `Compare element at index ${i} with current maximum.`,
            currentState: `Current Max = ${maxVal}. Current Value = ${val}.`,
            comparison: `${val} > ${maxVal} -> ${isNewMax}`,
            decision: isNewMax ? 'Update Maximum!' : 'Keep current maximum.',
            reason: isNewMax ? `Since ${val} > ${maxVal}, ${val} is the new largest element.` : `Since ${val} <= ${maxVal}, ${maxVal} remains largest.`,
            nextAction: isNewMax ? 'Fly Gold Crown to new max!' : `Move pointer to index ${i + 1}.`,
            whyRationale: 'Single pass scan maintains maximum invariant.',
            variableWatch: { maxVal, currentVal: val, i },
          },
          predictionChallenge: i === 2 ? {
            prompt: `Element at index 2 is ${val}. Current Max is ${maxVal}. Will the Maximum update?`,
            options: [
              isNewMax ? 'Yes! 88 is greater than 45, so Max updates.' : 'No! It is smaller or equal.',
              !isNewMax ? 'Yes! Max updates.' : 'No! 88 is smaller than 45.',
              'Reset algorithm',
            ],
            correctIndex: 0,
            mistakeExplanations: [
              '',
              'Incorrect! 88 is strictly greater than 45.',
              'Incorrect! Reset is not required.',
            ],
          } : undefined,
          metrics: { elapsedTimeMs: i * 25, operations: i, comparisons: i, swaps: 0, visitedCount: i + 1, currentIndex: i, currentValue: val, maximum: maxVal, minimum: Math.min(...arr) },
        });

        if (isNewMax) {
          maxVal = val;
          maxIdx = i;

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 4,
            explanation: `GOLD CROWN FLIGHT! Crown flies to ${maxVal} at index ${maxIdx}!`,
            array: getArrState(i, maxIdx).map((e) => ({ ...e, particleType: e.id === `el-${maxIdx}` ? ('gold' as const) : undefined })),
            pointers: [{ name: 'NEW CROWN MAX', index: maxIdx }],
            memoryAddresses: buildMemoryData(getArrState(i, maxIdx), [{ name: 'NEW CROWN MAX', index: maxIdx }]),
            dryRunRow: { step: frames.length + 1, currentIndex: maxIdx, currentValue: maxVal, maxVal, minVal: Math.min(...arr), action: `Crown flew to Max ${maxVal}` },
            storytelling: {
              goal: 'Fly Crown to new maximum.',
              currentState: `New Max = ${maxVal} at index ${maxIdx}.`,
              decision: 'Update crown position.',
              reason: `Element at index ${maxIdx} is strictly larger.`,
              nextAction: `Continue scanning next index.`,
              whyRationale: 'Crown visualizes peak value state update.',
              variableWatch: { newMaxVal: maxVal, maxIdx },
            },
            metrics: { elapsedTimeMs: i * 25 + 15, operations: i + 1, comparisons: i, swaps: 0, visitedCount: i + 1, currentIndex: maxIdx, currentValue: maxVal, maximum: maxVal, minimum: Math.min(...arr) },
          });
        }
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: `Maximum Search Completed! Global Max = ${maxVal} at index ${maxIdx}.`,
        array: getArrState(arr.length - 1, maxIdx).map((e) => ({ ...e, particleType: 'confetti' as const })),
        pointers: [{ name: 'CROWN MAX', index: maxIdx }],
        memoryAddresses: buildMemoryData(getArrState(arr.length - 1, maxIdx), [{ name: 'CROWN MAX', index: maxIdx }]),
        dryRunRow: { step: frames.length + 1, currentIndex: maxIdx, currentValue: maxVal, maxVal, minVal: Math.min(...arr), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Search finished.',
          currentState: `Scanned all ${arr.length} elements.`,
          decision: `Return maximum ${maxVal}.`,
          reason: 'Invariant proves maxVal is global peak.',
          nextAction: 'Show master summary card.',
          whyRationale: 'Algorithm verified every element in O(N) time.',
          variableWatch: { globalMax: maxVal, maxIdx },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: arr.length * 25 + 30, operations: arr.length, comparisons: arr.length - 1, swaps: 0, visitedCount: arr.length, currentIndex: maxIdx, currentValue: maxVal, maximum: maxVal, minimum: Math.min(...arr) },
      });

      return frames;
    },
  },
];

import { SORTING_ALGORITHMS } from './sortingFrameEngine';
import { SEARCHING_ALGORITHMS } from './searchingFrameEngine';
import { LINKED_LIST_ALGORITHMS } from './linkedListFrameEngine';
import { STACK_QUEUE_ALGORITHMS } from './stackQueueFrameEngine';
import { TREE_ALGORITHMS } from './treeFrameEngine';
import { GRAPH_ALGORITHMS } from './graphFrameEngine';

export const ALL_ALGORITHMS: IArrayAlgorithmMeta[] = [
  ...ARRAY_ALGORITHMS,
  ...SORTING_ALGORITHMS,
  ...SEARCHING_ALGORITHMS,
  ...LINKED_LIST_ALGORITHMS,
  ...STACK_QUEUE_ALGORITHMS,
  ...TREE_ALGORITHMS,
  ...GRAPH_ALGORITHMS,
];

export const getAlgorithmById = (id: string): IArrayAlgorithmMeta => {
  return ALL_ALGORITHMS.find((a) => a.id === id) || ALL_ALGORITHMS[0];
};

