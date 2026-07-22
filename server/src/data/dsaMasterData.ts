import { DSAAlgorithmEntry } from './dsa.types';
import { ARRAYS_CATEGORY_DATA } from './arrays.data';
import { LINKEDLIST_CATEGORY_DATA } from './linkedlist.data';
import { STACK_CATEGORY_DATA } from './stack.data';
import { QUEUE_CATEGORY_DATA } from './queue.data';
import { TREE_CATEGORY_DATA } from './tree.data';
import { HEAP_CATEGORY_DATA } from './heap.data';
import { GRAPH_CATEGORY_DATA } from './graph.data';
import { RECURSION_CATEGORY_DATA } from './recursion.data';
import { BACKTRACKING_CATEGORY_DATA } from './backtracking.data';
import { GREEDY_CATEGORY_DATA } from './greedy.data';
import { DYNAMICPROGRAMMING_CATEGORY_DATA } from './dynamicprogramming.data';

export * from './dsa.types';

export interface DSACategoryDefinition {
  name: string;
  slug: string;
  icon: string;
  order: number;
  data: DSAAlgorithmEntry[];
}

export const MASTER_DSA_CATEGORIES: DSACategoryDefinition[] = [
  { name: 'Arrays', slug: 'array', icon: 'Layers', order: 1, data: ARRAYS_CATEGORY_DATA },
  { name: 'Linked List', slug: 'linked-list', icon: 'GitCommit', order: 2, data: LINKEDLIST_CATEGORY_DATA },
  { name: 'Stack', slug: 'stack', icon: 'SquareStack', order: 3, data: STACK_CATEGORY_DATA },
  { name: 'Queue', slug: 'queue', icon: 'AlignJustify', order: 4, data: QUEUE_CATEGORY_DATA },
  { name: 'Trees', slug: 'tree', icon: 'Network', order: 5, data: TREE_CATEGORY_DATA },
  { name: 'Heap', slug: 'heap', icon: 'Binary', order: 6, data: HEAP_CATEGORY_DATA },
  { name: 'Graph', slug: 'graph', icon: 'Share2', order: 7, data: GRAPH_CATEGORY_DATA },
  { name: 'Recursion', slug: 'recursion', icon: 'Repeat', order: 8, data: RECURSION_CATEGORY_DATA },
  { name: 'Backtracking', slug: 'backtracking', icon: 'Undo2', order: 9, data: BACKTRACKING_CATEGORY_DATA },
  { name: 'Greedy', slug: 'greedy', icon: 'Zap', order: 10, data: GREEDY_CATEGORY_DATA },
  { name: 'Dynamic Programming', slug: 'dynamic-programming', icon: 'Cpu', order: 11, data: DYNAMICPROGRAMMING_CATEGORY_DATA },
];

export const MASTER_DSA_ALGORITHMS_DATA: DSAAlgorithmEntry[] = [
  ...ARRAYS_CATEGORY_DATA,
  ...LINKEDLIST_CATEGORY_DATA,
  ...STACK_CATEGORY_DATA,
  ...QUEUE_CATEGORY_DATA,
  ...TREE_CATEGORY_DATA,
  ...HEAP_CATEGORY_DATA,
  ...GRAPH_CATEGORY_DATA,
  ...RECURSION_CATEGORY_DATA,
  ...BACKTRACKING_CATEGORY_DATA,
  ...GREEDY_CATEGORY_DATA,
  ...DYNAMICPROGRAMMING_CATEGORY_DATA,
];
