import { type VisualizationFrame } from '@store/visualizationStore';
import { getFrameGenerator } from '../array/arrayFrameGenerators';

export type DSAFrameGeneratorFn = (input?: any) => VisualizationFrame[];

function createFrame(
  index: number,
  description: string,
  data: any,
  highlights: any[],
  pointers: Record<string, number | string>,
  codeLineHighlight: number,
  variables: Record<string, any>,
  metaStatusMap?: Record<string | number, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'>,
): VisualizationFrame {
  return {
    index,
    description,
    data,
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

// 1. Dijkstra Shortest Path Frame Generator (Graph Category)
export const generateDijkstraGraphFrames: DSAFrameGeneratorFn = () => {
  const graphData = {
    nodes: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
    ],
    edges: [
      { source: 'A', target: 'B', weight: 4 },
      { source: 'A', target: 'C', weight: 2 },
      { source: 'C', target: 'B', weight: 1 },
      { source: 'B', target: 'D', weight: 5 },
      { source: 'C', target: 'D', weight: 8 },
    ],
  };

  const frames: VisualizationFrame[] = [];
  let step = 0;

  // Initial State: dist[A] = 0, others = Infinity
  frames.push(createFrame(
    step++,
    'Initialize Dijkstra: Set dist[A] = 0, dist[B..D] = ∞. Push (0, A) to Priority Queue.',
    graphData,
    ['A'],
    { curr: 'A' },
    1,
    { source: 'A', distances: { A: 0, B: '∞', C: '∞', D: '∞' }, priorityQueue: ['(0, A)'] },
    { A: 'warning' }
  ));

  // Step 1: Pop (0, A), relax edge A->C (weight 2)
  frames.push(createFrame(
    step++,
    'Pop min-distance node A (dist 0). Relax edge A->C (2 < ∞): dist[C] updated to 2. Push (2, C).',
    graphData,
    ['C'],
    { curr: 'A' },
    3,
    { currentNode: 'A', distances: { A: 0, B: 4, C: 2, D: '∞' }, priorityQueue: ['(2, C)', '(4, B)'] },
    { A: 'visited', C: 'info', B: 'info' }
  ));

  // Step 2: Pop (2, C), relax edge C->B (2+1 = 3 < 4)
  frames.push(createFrame(
    step++,
    'Pop node C (dist 2). Relax edge C->B: new dist 2 + 1 = 3 (< previous 4!). Update dist[B] = 3. Push (3, B).',
    graphData,
    ['B'],
    { curr: 'C' },
    5,
    { currentNode: 'C', distances: { A: 0, B: 3, C: 2, D: 10 }, priorityQueue: ['(3, B)', '(10, D)'] },
    { A: 'visited', C: 'visited', B: 'warning' }
  ));

  // Step 3: Pop (3, B), relax edge B->D (3+5 = 8 < 10)
  frames.push(createFrame(
    step++,
    'Pop node B (dist 3). Relax edge B->D: new dist 3 + 5 = 8 (< 10!). Update dist[D] = 8. Push (8, D).',
    graphData,
    ['D'],
    { curr: 'B' },
    7,
    { currentNode: 'B', distances: { A: 0, B: 3, C: 2, D: 8 }, priorityQueue: ['(8, D)'] },
    { A: 'visited', C: 'visited', B: 'visited', D: 'warning' }
  ));

  // Step 4: Complete Dijkstra
  frames.push(createFrame(
    step++,
    'Pop node D (dist 8). All reachable nodes processed. Dijkstra Shortest Paths complete!',
    graphData,
    [],
    {},
    9,
    { finalDistances: { A: 0, B: 3, C: 2, D: 8 }, complete: true },
    { A: 'success', B: 'success', C: 'success', D: 'success' }
  ));

  return frames;
};

// 2. Dynamic Programming 2D Table Frame Generator
export const generateDpTableFrames: DSAFrameGeneratorFn = () => {
  const dpMatrix = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 2, 3],
  ];

  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Initialize DP Table: dp[rows][cols] with base cases = 0.', dpMatrix, [0], { row: 0, col: 0 }, 1, { dpState: 'Initialized' }));
  frames.push(createFrame(step++, 'Fill Row 1: dp[1][1] = dp[0][1] + dp[1][0] = 1.', dpMatrix, [1], { row: 1, col: 1 }, 3, { i: 1, j: 1, val: 1 }, { 1: 'warning' }));
  frames.push(createFrame(step++, 'Fill Row 2: dp[2][3] = dp[1][3] + dp[2][2] = 3.', dpMatrix, [2], { row: 2, col: 3 }, 5, { i: 2, j: 3, val: 3 }, { 2: 'success' }));
  frames.push(createFrame(step++, 'DP Table state transition completed!', dpMatrix, [], {}, 7, { optimalValue: 3 }));

  return frames;
};

// 3. Reverse Linked List Frame Generator
export const generateReverseLinkedListFrames: DSAFrameGeneratorFn = (input = [1, 2, 3, 4, 5]) => {
  const arr = Array.isArray(input) ? [...input] : [1, 2, 3, 4, 5];
  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Initialize Reverse Linked List: set prev = null, curr = node(1), next = null.', arr, [0], { prev: 'null', curr: 0, next: 'null' }, 1, { prev: 'null', curr: 1, next: 'null' }));

  for (let i = 0; i < arr.length; i++) {
    const nextIdx = i + 1 < arr.length ? i + 1 : 'null';
    const statusMap: Record<number, any> = {};
    for (let k = 0; k < i; k++) statusMap[k] = 'success';
    statusMap[i] = 'warning';

    frames.push(createFrame(step++, `Step ${i + 1}.1: Save next node -> next = curr.next (node ${nextIdx !== 'null' ? arr[i + 1] : 'null'}).`, arr, [i], { prev: i > 0 ? i - 1 : 'null', curr: i, next: nextIdx }, 3, { prev: i > 0 ? arr[i - 1] : 'null', curr: arr[i], next: nextIdx !== 'null' ? arr[i + 1] : 'null' }, statusMap));

    statusMap[i] = 'danger';
    frames.push(createFrame(step++, `Step ${i + 1}.2: Reverse pointer -> curr.next = prev (node ${arr[i]} points backward).`, arr, [i], { prev: i > 0 ? i - 1 : 'null', curr: i, next: nextIdx }, 4, { prev: i > 0 ? arr[i - 1] : 'null', curr: arr[i], next: nextIdx !== 'null' ? arr[i + 1] : 'null', reversedPointer: true }, statusMap));

    statusMap[i] = 'success';
    frames.push(createFrame(step++, `Step ${i + 1}.3: Advance pointers -> prev = curr (node ${arr[i]}), curr = next.`, arr, [i], { prev: i, curr: nextIdx, next: nextIdx }, 5, { prev: arr[i], curr: nextIdx !== 'null' ? arr[i + 1] : 'null', next: nextIdx !== 'null' ? arr[i + 1] : 'null' }, statusMap));
  }

  const finalStatus: Record<number, any> = {};
  for (let k = 0; k < arr.length; k++) finalStatus[k] = 'success';

  frames.push(createFrame(step++, `Reverse Linked List complete! New Head is node ${arr[arr.length - 1]}.`, [...arr].reverse(), [], { head: 0 }, 7, { newHead: arr[arr.length - 1], prev: arr[arr.length - 1], curr: 'null' }, finalStatus));

  return frames;
};

export const generateLinkedListFrames: DSAFrameGeneratorFn = (input = [1, 2, 3, 4, 5]) => {
  return generateReverseLinkedListFrames(input);
};

// 4. Tree & BST Frame Generator
export const generateTreeFrames: DSAFrameGeneratorFn = () => {
  const treeData = {
    nodes: [
      { id: '1', label: '10', value: 10 },
      { id: '2', label: '5', value: 5 },
      { id: '3', label: '15', value: 15 },
      { id: '4', label: '2', value: 2 },
      { id: '5', label: '7', value: 7 },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '2', target: '4' },
      { source: '2', target: '5' },
    ],
  };

  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Start Inorder Traversal (Left -> Root -> Right) at root node 10.', treeData, ['1'], { curr: '1' }, 1, { root: 10, current: 10 }, { 1: 'warning' }));
  frames.push(createFrame(step++, 'Traverse left subtree of 10 -> visit node 5.', treeData, ['2'], { curr: '2' }, 2, { current: 5, parent: 10 }, { 1: 'visited', 2: 'warning' }));
  frames.push(createFrame(step++, 'Traverse left-most node 2. Visit node 2.', treeData, ['4'], { curr: '4' }, 3, { current: 2, visitedVal: 2 }, { 1: 'visited', 2: 'visited', 4: 'success' }));
  frames.push(createFrame(step++, 'Backtrack to node 5. Visit node 5, then right child node 7.', treeData, ['5'], { curr: '5' }, 4, { current: 7, visitedVal: 7 }, { 1: 'visited', 2: 'success', 4: 'success', 5: 'success' }));
  frames.push(createFrame(step++, 'Backtrack to root 10. Visit node 10, then right child node 15.', treeData, ['3'], { curr: '3' }, 5, { current: 15, visitedVal: 15 }, { 1: 'success', 2: 'success', 3: 'success', 4: 'success', 5: 'success' }));

  return frames;
};

// 5. Heap Frame Generator
export const generateHeapFrames: DSAFrameGeneratorFn = () => {
  const heapArray = [3, 8, 10, 15, 20, 25];
  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Initialize Min-Heap: Root element is minimum value (3).', heapArray, [0], { root: 0, heapSize: heapArray.length }, 1, { minVal: 3, heapSize: 6 }, { 0: 'success' }));
  frames.push(createFrame(step++, 'Insert value 2 into Min-Heap at index 6. Sift-up required.', [...heapArray, 2], [6], { active: 6, parent: 2 }, 3, { inserted: 2, heapSize: 7 }, { 6: 'warning' }));
  frames.push(createFrame(step++, 'Sift-up 2: Swap with parent 10. Sift-up continues.', [3, 8, 2, 15, 20, 25, 10], [2], { active: 2 }, 5, { swappedWith: 10 }, { 2: 'warning' }));
  frames.push(createFrame(step++, 'Sift-up 2: Swap with root 3. 2 is now root!', [2, 8, 3, 15, 20, 25, 10], [0], { root: 0 }, 7, { newMinRoot: 2 }, { 0: 'success' }));

  return frames;
};

// 6. Trie Frame Generator
export const generateTrieFrames: DSAFrameGeneratorFn = () => {
  const trieData = {
    nodes: [
      { id: 'root', label: 'root' },
      { id: 'c', label: 'c' },
      { id: 'ca', label: 'a' },
      { id: 'cat', label: 't (end)' },
      { id: 'car', label: 'r (end)' },
    ],
    edges: [
      { source: 'root', target: 'c' },
      { source: 'c', target: 'ca' },
      { source: 'ca', target: 'cat' },
      { source: 'ca', target: 'car' },
    ],
  };

  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Start Trie Search for word "cat". Start at root node.', trieData, ['root'], { currNode: 'root' }, 1, { word: 'cat', char: 'c', pos: 0 }, { root: 'warning' }));
  frames.push(createFrame(step++, 'Match character \'c\': Navigate from root -> \'c\'.', trieData, ['c'], { currNode: 'c' }, 2, { char: 'c', matched: 'c' }, { root: 'visited', c: 'warning' }));
  frames.push(createFrame(step++, 'Match character \'a\': Navigate from \'c\' -> \'a\'.', trieData, ['ca'], { currNode: 'ca' }, 3, { char: 'a', matched: 'ca' }, { root: 'visited', c: 'visited', ca: 'warning' }));
  frames.push(createFrame(step++, 'Match character \'t\': Found node \'t\' marked as Word End! Word "cat" exists in Trie.', trieData, ['cat'], { currNode: 'cat' }, 5, { word: 'cat', isWordEnd: true, found: true }, { root: 'visited', c: 'visited', ca: 'visited', cat: 'success' }));

  return frames;
};

// 7. Graph Frame Generators
export const generateDfsGraphFrames: DSAFrameGeneratorFn = () => {
  const graphData = {
    nodes: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
      { id: 'E', label: 'E' },
    ],
    edges: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'E' },
    ],
  };

  const frames: VisualizationFrame[] = [];
  let step = 0;

  frames.push(createFrame(step++, 'Start Depth First Search (DFS) from source node A.', graphData, ['A'], { curr: 'A' }, 1, { currentNode: 'A', visited: [], stack: ['A'] }, { A: 'warning' }));
  frames.push(createFrame(step++, 'Pop A. Mark A visited. Push neighbor B.', graphData, ['A', 'B'], { curr: 'A' }, 3, { currentNode: 'A', visited: ['A'], stack: ['B'] }, { A: 'visited', B: 'warning' }));
  frames.push(createFrame(step++, 'Pop B. Mark B visited. Deep dive into D.', graphData, ['B', 'D'], { curr: 'B' }, 4, { currentNode: 'B', visited: ['A', 'B'], stack: ['D'] }, { A: 'visited', B: 'visited', D: 'warning' }));
  frames.push(createFrame(step++, 'Pop D. Mark D visited. Backtrack.', graphData, ['D'], { curr: 'D' }, 5, { currentNode: 'D', visited: ['A', 'B', 'D'], stack: ['C'] }, { A: 'visited', B: 'visited', D: 'visited', C: 'warning' }));
  frames.push(createFrame(step++, 'DFS complete! All reachable nodes visited.', graphData, ['E'], { curr: 'E' }, 8, { currentNode: 'E', visited: ['A', 'B', 'D', 'C', 'E'] }, { A: 'success', B: 'success', C: 'success', D: 'success', E: 'success' }));

  return frames;
};

export const generateBfsGraphFrames: DSAFrameGeneratorFn = () => {
  const graphData = {
    nodes: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
    ],
    edges: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' },
    ],
  };
  const frames: VisualizationFrame[] = [];
  frames.push(createFrame(0, 'Start BFS graph traversal from source node A.', graphData, ['A'], { curr: 'A' }, 1, { queue: ['A'] }, { A: 'warning' }));
  frames.push(createFrame(1, 'Visit neighbors B and C. Enqueue [B, C].', graphData, ['B', 'C'], { curr: 'A' }, 2, { queue: ['B', 'C'] }, { A: 'visited', B: 'info', C: 'info' }));
  frames.push(createFrame(2, 'Dequeue B and visit D. Enqueue [C, D].', graphData, ['D'], { curr: 'B' }, 3, { queue: ['C', 'D'] }, { A: 'visited', B: 'visited', C: 'info', D: 'info' }));
  frames.push(createFrame(3, 'BFS graph traversal complete!', graphData, [], {}, 4, { queue: [] }, { A: 'success', B: 'success', C: 'success', D: 'success' }));
  return frames;
};

// Master Frame Generator Selector
export const getDSAFrameGenerator = (slug: string, categorySlug?: string): DSAFrameGeneratorFn => {
  if (slug.includes('dijkstra')) return generateDijkstraGraphFrames;
  if (categorySlug === 'dynamic-programming' || slug.includes('dp')) return generateDpTableFrames;
  if (slug.includes('trie')) return generateTrieFrames;
  if (categorySlug === 'heap' || slug.includes('heap')) return generateHeapFrames;
  if (categorySlug === 'tree' || slug.includes('tree') || slug.includes('bst')) return generateTreeFrames;
  if (slug.includes('reverse') || slug.includes('linked-list-reverse')) return generateReverseLinkedListFrames;
  if (categorySlug === 'linked-list' || slug.includes('linked-list')) return generateLinkedListFrames;
  if (slug.includes('dfs')) return generateDfsGraphFrames;
  if (categorySlug === 'graph' || slug.includes('graph') || slug.includes('bfs')) return generateBfsGraphFrames;

  return getFrameGenerator(slug);
};
