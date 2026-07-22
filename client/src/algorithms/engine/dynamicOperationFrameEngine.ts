import { type VisualizationFrame } from '@store/visualizationStore';

export interface DynamicOperationParams {
  operationId: string;
  categorySlug: string;
  algoSlug: string;
  currentState: any;
  inputParams: Record<string, any>;
}

function createDetailedFrame(
  index: number,
  description: string,
  data: any,
  highlights: any[],
  pointers: Record<string, any>,
  codeLineHighlight: number,
  variables: Record<string, any>,
  insights: {
    reason: string;
    whatChanged: string;
    whyItChanged: string;
    whatHappensNext: string;
    algorithmInsight: string;
    commonMistake: string;
    comparisons?: number;
    swaps?: number;
    statusMap?: Record<string | number, string>;
  }
): VisualizationFrame {
  return {
    index,
    description,
    data: Array.isArray(data) ? [...data] : data,
    highlights,
    pointers,
    codeLineHighlight,
    variables,
    meta: {
      statusMap: insights.statusMap || {},
      reason: insights.reason,
      whatChanged: insights.whatChanged,
      whyItChanged: insights.whyItChanged,
      nextStepReason: insights.whatHappensNext,
      algorithmInsight: insights.algorithmInsight,
      commonMistake: insights.commonMistake,
      comparisons: insights.comparisons ?? index,
      swaps: insights.swaps ?? 0,
      activeIndices: highlights,
    },
    timestamp: Date.now(),
  };
}

export function generateDynamicOperationFrames(params: DynamicOperationParams): VisualizationFrame[] {
  const { operationId, categorySlug, currentState, inputParams } = params;
  const frames: VisualizationFrame[] = [];

  // ── 1. ARRAY & SORTING OPERATIONS ─────────────────────────────────────────
  if (categorySlug === 'array' || categorySlug === 'arrays' || categorySlug === 'sorting') {
    const arr = Array.isArray(currentState) ? [...currentState] : [10, 20, 30, 40, 50];

    switch (operationId) {
      case 'find_max': {
        frames.push(createDetailedFrame(0, 'Initialize Max search at index 0.', arr, [0], { maxIdx: 0 }, 1, { maxVal: arr[0], i: 0 }, {
          reason: 'Set initial max to first element arr[0].',
          whatChanged: `Max initialized to ${arr[0]}.`,
          whyItChanged: 'Baseline for comparison.',
          whatHappensNext: 'Scan remaining elements from index 1.',
          algorithmInsight: 'Single pass finding max takes O(N) time.',
          commonMistake: 'Initializing max to 0 instead of arr[0] when negative numbers exist.',
          statusMap: { 0: 'warning' }
        }));

        let maxVal = arr[0];
        let maxIdx = 0;
        for (let i = 1; i < arr.length; i++) {
          const isNewMax = arr[i] > maxVal;
          if (isNewMax) {
            maxVal = arr[i];
            maxIdx = i;
          }
          const statusMap: Record<number, string> = { [maxIdx]: 'success', [i]: isNewMax ? 'danger' : 'warning' };
          frames.push(createDetailedFrame(i, `Compare arr[${i}] (${arr[i]}) with current max (${maxVal}).`, arr, [i], { i, maxIdx }, 3, { i, currentVal: arr[i], maxVal, maxIdx }, {
            reason: `Evaluating if arr[${i}] (${arr[i]}) > maxVal (${maxVal}).`,
            whatChanged: isNewMax ? `New max found: ${maxVal} at index ${i}!` : `Max remains ${maxVal}.`,
            whyItChanged: isNewMax ? `${arr[i]} > previous max.` : `${arr[i]} <= current max.`,
            whatHappensNext: i < arr.length - 1 ? `Advance to index ${i + 1}.` : 'Search complete.',
            algorithmInsight: 'Requires N-1 comparisons.',
            commonMistake: 'Updating max without updating maxIndex when index is needed.',
            statusMap
          }));
        }
        return frames;
      }

      case 'find_min': {
        frames.push(createDetailedFrame(0, 'Initialize Min search at index 0.', arr, [0], { minIdx: 0 }, 1, { minVal: arr[0], i: 0 }, {
          reason: 'Set initial min to first element arr[0].',
          whatChanged: `Min initialized to ${arr[0]}.`,
          whyItChanged: 'Baseline for comparison.',
          whatHappensNext: 'Scan remaining elements from index 1.',
          algorithmInsight: 'Single pass finding min takes O(N) time.',
          commonMistake: 'Initializing min to 0 when positive numbers exist.',
          statusMap: { 0: 'warning' }
        }));

        let minVal = arr[0];
        let minIdx = 0;
        for (let i = 1; i < arr.length; i++) {
          const isNewMin = arr[i] < minVal;
          if (isNewMin) {
            minVal = arr[i];
            minIdx = i;
          }
          const statusMap: Record<number, string> = { [minIdx]: 'success', [i]: isNewMin ? 'danger' : 'warning' };
          frames.push(createDetailedFrame(i, `Compare arr[${i}] (${arr[i]}) with current min (${minVal}).`, arr, [i], { i, minIdx }, 3, { i, currentVal: arr[i], minVal, minIdx }, {
            reason: `Evaluating if arr[${i}] (${arr[i]}) < minVal (${minVal}).`,
            whatChanged: isNewMin ? `New min found: ${minVal} at index ${i}!` : `Min remains ${minVal}.`,
            whyItChanged: isNewMin ? `${arr[i]} < previous min.` : `${arr[i]} >= current min.`,
            whatHappensNext: i < arr.length - 1 ? `Advance to index ${i + 1}.` : 'Search complete.',
            algorithmInsight: 'Requires N-1 comparisons.',
            commonMistake: 'Comparing against uninitialized variable.',
            statusMap
          }));
        }
        return frames;
      }

      default:
        break;
    }
  }

  // ── 2. STRING OPERATIONS ──────────────────────────────────────────────────
  if (categorySlug === 'string' || categorySlug === 'strings') {
    const str = typeof currentState === 'string' ? currentState : 'racecar';

    switch (operationId) {
      case 'palindrome': {
        const arr = str.split('');
        let left = 0, right = arr.length - 1;
        let isPal = true;
        let step = 0;

        frames.push(createDetailedFrame(step++, `Start Palindrome check on "${str}". Left = 0, Right = ${right}.`, arr, [left, right], { left, right }, 1, { left, right, str, isPal: true }, {
          reason: 'Set pointers left at start and right at end of string.',
          whatChanged: 'Initialized pointers.',
          whyItChanged: 'Palindrome requires characters at symmetrical positions to be equal.',
          whatHappensNext: 'Compare str[left] and str[right].',
          algorithmInsight: 'Two pointer palindrome check takes O(N) time and O(1) space.',
          commonMistake: 'Forgetting to ignore spaces or case sensitivity when required.',
          statusMap: { [left]: 'warning', [right]: 'warning' }
        }));

        while (left < right) {
          const match = arr[left] === arr[right];
          const statusMap: Record<number, string> = { [left]: match ? 'success' : 'danger', [right]: match ? 'success' : 'danger' };
          frames.push(createDetailedFrame(step++, `Compare str[${left}] ('${arr[left]}') and str[${right}] ('${arr[right]}').`, arr, [left, right], { left, right }, 3, { left, right, char1: arr[left], char2: arr[right], match }, {
            reason: `Compare characters at positions ${left} and ${right}.`,
            whatChanged: match ? `Characters match ('${arr[left]}')!` : `Mismatch: '${arr[left]}' != '${arr[right]}'!`,
            whyItChanged: match ? 'Symmetrical characters match.' : 'Not a palindrome.',
            whatHappensNext: match ? 'Advance left pointer right and right pointer left.' : 'Return false.',
            algorithmInsight: 'If any pair mismatches, string is not a palindrome.',
            commonMistake: 'Looping past center (left > right).',
            statusMap
          }));

          if (!match) {
            isPal = false;
            break;
          }
          left++;
          right--;
        }

        frames.push(createDetailedFrame(step++, isPal ? `Result: "${str}" IS a valid Palindrome!` : `Result: "${str}" is NOT a Palindrome.`, arr, [], {}, 5, { str, isPalindrome: isPal }, {
          reason: 'Palindrome check finished.',
          whatChanged: `Final verdict: ${isPal}`,
          whyItChanged: 'Pointer traversal completed.',
          whatHappensNext: 'Done.',
          algorithmInsight: 'O(N) time efficiency.',
          commonMistake: 'None.',
        }));
        return frames;
      }
    }
  }

  // ── 3. RECURSION & BACKTRACKING ───────────────────────────────────────────
  if (categorySlug === 'recursion' || categorySlug === 'backtracking') {
    const n = inputParams.val !== undefined ? Number(inputParams.val) : 4;
    const callStack: string[] = [];
    let step = 0;

    callStack.push(`factorial(${n})`);
    frames.push(createDetailedFrame(step++, `Call factorial(${n}). Push frame onto call stack.`, [...callStack], [callStack.length - 1], { stackTop: callStack.length - 1 }, 1, { depth: 1, callStack: [...callStack], n }, {
      reason: `Push recursive activation frame factorial(${n}) onto execution stack.`,
      whatChanged: `Call stack depth = 1. Top = factorial(${n}).`,
      whyItChanged: `Recursive function invoked with parameter ${n}.`,
      whatHappensNext: `Check base case n <= 1.`,
      algorithmInsight: 'Recursion uses call stack memory proportional to recursion depth.',
      commonMistake: 'Missing base case causing stack overflow crash.',
      statusMap: { 0: 'warning' }
    }));

    for (let depth = n - 1; depth >= 1; depth--) {
      callStack.push(`factorial(${depth})`);
      frames.push(createDetailedFrame(step++, `Recurse: Call factorial(${depth}). Push frame to call stack.`, [...callStack], [callStack.length - 1], { stackTop: callStack.length - 1 }, 3, { depth: callStack.length, callStack: [...callStack], n: depth }, {
        reason: `Subproblem reduction: call factorial(${depth}).`,
        whatChanged: `Call stack depth = ${callStack.length}.`,
        whyItChanged: `Evaluating n * factorial(n - 1).`,
        whatHappensNext: depth === 1 ? 'Base case reached!' : `Recurse for factorial(${depth - 1}).`,
        algorithmInsight: 'Call stack grows linearly O(N) for linear recursion.',
        commonMistake: 'Incorrect parameter reduction leading to infinite loops.',
        statusMap: { [callStack.length - 1]: 'warning' }
      }));
    }

    // Base case return
    frames.push(createDetailedFrame(step++, 'Base case reached: factorial(1) returns 1. Start unwinding stack.', [...callStack], [callStack.length - 1], { stackTop: callStack.length - 1 }, 5, { depth: callStack.length, returnVal: 1 }, {
      reason: 'n == 1 base case condition satisfied.',
      whatChanged: 'Base case returns value 1.',
      whyItChanged: 'Stack unwinding phase begins.',
      whatHappensNext: 'Pop frame and return value to parent caller.',
      algorithmInsight: 'Base cases stop recursion and begin return phase.',
      commonMistake: 'Returning wrong base case value.',
      statusMap: { [callStack.length - 1]: 'success' }
    }));

    return frames;
  }

  // ── 4. BIT MANIPULATION ───────────────────────────────────────────────────
  if (categorySlug === 'bit-manipulation') {
    const num = inputParams.val !== undefined ? Number(inputParams.val) : 12; // 1100 in binary
    const pos = inputParams.pos !== undefined ? Number(inputParams.pos) : 2;

    switch (operationId) {
      case 'set_bit': {
        const mask = 1 << pos;
        const result = num | mask;
        const numBinary = num.toString(2).padStart(8, '0');
        const resBinary = result.toString(2).padStart(8, '0');

        frames.push(createDetailedFrame(0, `Set ${pos}-th Bit of N = ${num} (${numBinary}). Mask = (1 << ${pos}) = ${mask}.`, [numBinary, resBinary], [7 - pos], { bitPos: pos }, 1, { num, pos, mask, result, binaryBefore: numBinary, binaryAfter: resBinary }, {
          reason: `Bitwise OR (num | (1 << ${pos})) sets ${pos}-th bit to 1.`,
          whatChanged: `Bit at index ${pos} set to 1. Result = ${result} (${resBinary}).`,
          whyItChanged: 'Bitwise OR with 1 forces bit to 1.',
          whatHappensNext: 'Operation complete in O(1) time.',
          algorithmInsight: 'Bitwise operations operate directly at hardware CPU register level.',
          commonMistake: 'Confusing 0-based bit position indexing.',
          statusMap: { 1: 'success' }
        }));
        return frames;
      }
    }
  }

  // Fallback default frame
  const fallbackArr = Array.isArray(currentState) ? [...currentState] : [10, 20, 30, 40];
  frames.push(createDetailedFrame(0, `Executed operation ${operationId} on ${categorySlug}.`, fallbackArr, [0], { active: 0 }, 1, { op: operationId }, {
    reason: 'Executed requested operation.',
    whatChanged: 'State updated.',
    whyItChanged: 'Operation handler triggered.',
    whatHappensNext: 'Ready for next action.',
    algorithmInsight: 'Operation completed in O(1) setup time.',
    commonMistake: 'Inspect input parameter bounds.',
  }));
  return frames;
}
