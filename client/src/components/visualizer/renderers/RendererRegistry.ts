export type CategoryRendererType =
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'tree'
  | 'heap'
  | 'graph'
  | 'recursion'
  | 'backtracking'
  | 'greedy'
  | 'dynamic-programming'
  | 'bars';

export const CATEGORY_TO_RENDERER_MAP: Record<string, CategoryRendererType> = {
  array: 'array',
  arrays: 'array',
  'linked-list': 'linked-list',
  linkedlist: 'linked-list',
  stack: 'stack',
  queue: 'queue',
  tree: 'tree',
  trees: 'tree',
  heap: 'heap',
  graph: 'graph',
  recursion: 'recursion',
  backtracking: 'backtracking',
  greedy: 'greedy',
  'dynamic-programming': 'dynamic-programming',
  dp: 'dynamic-programming',
};

export function resolveRendererType(categorySlug?: string, algoSlug?: string): CategoryRendererType {
  const normCat = (categorySlug || '').toLowerCase();
  const normAlgo = (algoSlug || '').toLowerCase();

  // 1. Specific algorithm overrides
  if (normAlgo.includes('sort') && !normAlgo.includes('topological')) return 'bars';

  // 2. Direct category lookup
  if (CATEGORY_TO_RENDERER_MAP[normCat]) {
    return CATEGORY_TO_RENDERER_MAP[normCat];
  }

  // 3. Keyword matching fallback
  if (normAlgo.includes('linked')) return 'linked-list';
  if (normAlgo.includes('stack')) return 'stack';
  if (normAlgo.includes('queue')) return 'queue';
  if (normAlgo.includes('tree') || normAlgo.includes('bst')) return 'tree';
  if (normAlgo.includes('heap')) return 'heap';
  if (normAlgo.includes('graph') || normAlgo.includes('bfs') || normAlgo.includes('dfs') || normAlgo.includes('dijkstra')) return 'graph';
  if (normAlgo.includes('recursion') || normAlgo.includes('hanoi')) return 'recursion';
  if (normAlgo.includes('queen') || normAlgo.includes('sudoku') || normAlgo.includes('backtrack')) return 'backtracking';
  if (normAlgo.includes('greedy') || normAlgo.includes('activity')) return 'greedy';
  if (normAlgo.includes('dp') || normAlgo.includes('climb') || normAlgo.includes('knapsack') || normAlgo.includes('lcs')) return 'dynamic-programming';

  return 'array';
}
