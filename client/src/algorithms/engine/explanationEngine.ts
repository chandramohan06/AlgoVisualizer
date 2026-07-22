import { type VisualizationFrame } from '@store/visualizationStore';

export interface GeneratedExplanation {
  what: string;
  why: string;
  next: string;
  algorithmInsight: string;
  commonMistake: string;
}

export function generateUniversalExplanation(
  frame: VisualizationFrame | null,
  totalFrames: number,
  categorySlug = 'array',
  algoTitle = 'Algorithm'
): GeneratedExplanation {
  if (!frame) {
    return {
      what: 'Visualization idle.',
      why: 'Press Play or Step Forward to start execution.',
      next: 'Frame 1 will initialize memory structures.',
      algorithmInsight: 'Interactive visualizations help build mental models of memory allocation.',
      commonMistake: 'Not accounting for empty inputs before calling main algorithm loop.',
    };
  }

  const desc = frame.description || '';
  const descUpper = desc.toUpperCase();
  const pointers = frame.pointers || {};
  const vars = frame.variables || {};
  const isFirst = frame.index === 0;
  const isLast = frame.index >= totalFrames - 1;

  let actionType = 'TRAVERSE';
  if (descUpper.includes('COMPARE') || descUpper.includes('CHECK')) actionType = 'COMPARE';
  else if (descUpper.includes('SWAP')) actionType = 'SWAP';
  else if (descUpper.includes('PUSH')) actionType = 'PUSH';
  else if (descUpper.includes('POP')) actionType = 'POP';
  else if (descUpper.includes('ENQUEUE')) actionType = 'ENQUEUE';
  else if (descUpper.includes('DEQUEUE')) actionType = 'DEQUEUE';
  else if (descUpper.includes('VISIT') || descUpper.includes('TRAVERSE')) actionType = 'VISIT';
  else if (descUpper.includes('SPLIT') || descUpper.includes('MERGE')) actionType = 'MERGE';
  else if (descUpper.includes('BACKTRACK')) actionType = 'BACKTRACK';
  else if (descUpper.includes('PIVOT')) actionType = 'PIVOT';

  // 1. WHAT IS HAPPENING
  let what = frame.description;
  if (isFirst) {
    what = `Initializing ${algoTitle} with target data structures and setting starting pointers.`;
  } else if (isLast) {
    what = `Execution finished! ${algoTitle} successfully completed all state transitions.`;
  }

  // 2. WHY THIS HAPPENED
  let why = frame.meta?.reason || frame.meta?.whyItChanged || '';
  if (!why) {
    switch (actionType) {
      case 'COMPARE':
        const ptrEntries = Object.entries(pointers);
        const pInfo = ptrEntries.map(([k, v]) => `${k}=${v}`).join(', ');
        why = `We compare values at active pointers (${pInfo || 'current positions'}) to check ordering invariant or target match conditions.`;
        break;
      case 'SWAP':
        why = `Elements were out of relative sorted order. Swapping places them closer to their final target position.`;
        break;
      case 'PUSH':
        why = `New element added to top of LIFO stack memory context. Stack size grows to ${vars.size || vars.top + 1 || 'N'}.`;
        break;
      case 'POP':
        why = `Most recent element retrieved from top of stack for evaluation. Stack restores prior frame scope.`;
        break;
      case 'ENQUEUE':
        why = `Element appended to rear of FIFO queue pipeline for level-order processing.`;
        break;
      case 'DEQUEUE':
        why = `Front element removed from queue to explore its adjacent structural neighbors.`;
        break;
      case 'VISIT':
        why = `Node/Cell marked as visited to prevent duplicate infinite loops and process state properties.`;
        break;
      case 'MERGE':
        why = `Combining two previously sorted sub-problems in sorted order to satisfy Divide & Conquer paradigm.`;
        break;
      case 'BACKTRACK':
        why = `Current search path reached a dead end or constraint violation. Reverting state to try alternative branch.`;
        break;
      case 'PIVOT':
        why = `Partitioning array around pivot element so all smaller elements land left and larger land right.`;
        break;
      default:
        why = `Advancing execution control flow according to loop conditional bounds.`;
    }
  }

  // 3. WHAT HAPPENS NEXT
  let next = frame.meta?.nextStepReason || '';
  if (!next) {
    if (isLast) {
      next = 'Algorithm result ready. You can Reset [R] or supply custom parameters.';
    } else if (actionType === 'COMPARE') {
      next = 'Depending on comparison result, pointers will advance or a swap/update operation will trigger.';
    } else if (actionType === 'SWAP') {
      next = 'Pointers increment to evaluate the next pair of elements.';
    } else {
      next = `Step ${frame.index + 2} will process the next memory state transition.`;
    }
  }

  // 4. ALGORITHM INSIGHT
  let algorithmInsight = frame.meta?.algorithmInsight || '';
  if (!algorithmInsight) {
    if (categorySlug === 'array' || categorySlug === 'sorting' || categorySlug === 'searching') {
      algorithmInsight = `Pointers maintain structural boundaries (e.g. sorted vs unsorted segments). Minimizing swaps reduces total array write ops.`;
    } else if (categorySlug === 'graph' || categorySlug === 'tree') {
      algorithmInsight = `Queue (BFS) explores shortest path by distance layers, while Stack (DFS) explores branch depth first.`;
    } else if (categorySlug === 'dp') {
      algorithmInsight = `Overlapping subproblems reuse memoized values, trading O(N) space for exponential time reduction.`;
    } else {
      algorithmInsight = `Invariant checks ensure correctness at every iteration step.`;
    }
  }

  // 5. COMMON MISTAKE
  let commonMistake = frame.meta?.commonMistake || '';
  if (!commonMistake) {
    if (actionType === 'COMPARE') {
      commonMistake = 'Off-by-one errors when defining array loop bounds (e.g., `< n` vs `<= n - 1`).';
    } else if (actionType === 'BACKTRACK') {
      commonMistake = 'Forgetting to undo local state mutation when returning from recursive recursive calls.';
    } else {
      commonMistake = 'Failing to handle empty data structures or null pointer dereferences before element access.';
    }
  }

  return { what, why, next, algorithmInsight, commonMistake };
}
