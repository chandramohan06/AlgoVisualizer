import { IArrayAnimationFrame, ElementState } from './arrayFrameEngine';
import { calculateGraphLayout, IGraphNodeInput, IGraphEdgeInput } from './graphLayoutEngine';

const SAMPLE_GRAPH_NODES: IGraphNodeInput[] = [
  { id: 'A', label: 'A' },
  { id: 'B', label: 'B' },
  { id: 'C', label: 'C' },
  { id: 'D', label: 'D' },
  { id: 'E', label: 'E' },
  { id: 'F', label: 'F' },
];

const SAMPLE_GRAPH_EDGES: IGraphEdgeInput[] = [
  { id: 'e1', fromId: 'A', toId: 'B', weight: 4 },
  { id: 'e2', fromId: 'A', toId: 'C', weight: 2 },
  { id: 'e3', fromId: 'B', toId: 'D', weight: 5 },
  { id: 'e4', fromId: 'C', toId: 'D', weight: 1 },
  { id: 'e5', fromId: 'C', toId: 'E', weight: 10 },
  { id: 'e6', fromId: 'D', toId: 'E', weight: 3 },
  { id: 'e7', fromId: 'D', toId: 'F', weight: 6 },
  { id: 'e8', fromId: 'E', toId: 'F', weight: 2 },
];

export const GRAPH_ALGORITHMS = [
  // 1. BREADTH-FIRST SEARCH (BFS)
  {
    id: 'graph-bfs',
    name: 'Breadth-First Search (BFS)',
    difficulty: 'Easy' as const,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Explores graph level-by-level using a FIFO Queue. Guarantees shortest path distance in unweighted graphs!',
    pseudoCode: `BFS(graph, startNode):\n    queue = [startNode]\n    visited = {startNode}\n    while queue is not empty:\n        node = queue.pop(0)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)`,
    defaultInput: 'A, B, C, D, E, F',
    analogy: 'Ripples spreading radially outward across water from a dropped stone.',
    invariant: 'Nodes at distance d are processed completely before any node at distance d + 1 is visited.',
    commonMistake: 'Forgetting to mark neighbor as visited when adding to queue, leading to duplicate queue entries.',
    interviewTip: 'Always use BFS when searching for shortest path on unweighted graphs or social network degree of separation.',
    advantages: 'Finds shortest path in unweighted graphs; level-by-level traversal.',
    disadvantages: 'Higher memory consumption for wide graphs compared to DFS.',
    whenToUse: 'Social network connections, shortest distance in mazes, web crawler BFS indexing.',
    quizQuestion: {
      question: 'Which data structure does Breadth-First Search (BFS) rely on for level order traversal?',
      options: ['FIFO Queue', 'LIFO Stack', 'Priority Queue', 'HashTable'],
      correctIndex: 0,
      explanation: 'BFS uses a FIFO queue so nodes discovered first are visited first.',
    },
    relatedProblems: [
      { title: 'Word Ladder', slug: 'word-ladder', difficulty: 'Hard' as const },
      { title: 'Rotting Oranges', slug: 'rotting-oranges', difficulty: 'Medium' as const },
    ],
    codeSnippets: {
      java: `public void bfs(Map<Integer, List<Integer>> adj, int start) {\n    Queue<Integer> q = new LinkedList<>();\n    Set<Integer> vis = new HashSet<>();\n    q.add(start); vis.add(start);\n    while(!q.isEmpty()) {\n        int u = q.poll();\n        for(int v : adj.get(u)) {\n            if(vis.add(v)) q.add(v);\n        }\n    }\n}`,
      cpp: `void bfs(vector<vector<int>>& adj, int start) {\n    queue<int> q; vector<bool> vis(adj.size(), false);\n    q.push(start); vis[start] = true;\n    while(!q.empty()) {\n        int u = q.front(); q.pop();\n        for(int v : adj[u]) if(!vis[v]) { vis[v]=true; q.push(v); }\n    }\n}`,
      python: `def bfs(graph, start):\n    q, vis = collections.deque([start]), {start}\n    while q:\n        u = q.popleft()\n        for v in graph[u]:\n            if v not in vis:\n                vis.add(v); q.append(v)`,
    },
    generateFrames: (_inputStr?: string) => {
      const nodesInput = SAMPLE_GRAPH_NODES;
      const edgesInput = SAMPLE_GRAPH_EDGES;
      const frames: IArrayAnimationFrame[] = [];

      const visitedNodes: string[] = [];
      const queue: string[] = ['A'];
      visitedNodes.push('A');

      const pathEdges: string[] = [];

      // Step 0: Start BFS
      const layout0 = calculateGraphLayout(nodesInput, edgesInput, 'A', visitedNodes, pathEdges);
      frames.push({
        frameIndex: 0,
        lineHighlight: 2,
        explanation: 'BFS Started: Initialized FIFO Queue with Start Node A. Visited set = { A }.',
        array: queue.map((v, i) => ({ id: `q-${i}`, val: v.charCodeAt(0), label: v, state: 'max', address: `0x300${i}` })),
        graphData: { nodes: layout0.nodes, edges: layout0.edges, stats: layout0.stats },
        pointers: [{ name: 'QUEUE', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: 1, currentIndex: 0, currentValue: 'A', maxVal: 0, minVal: 0, action: 'Queue Init [A]' },
        storytelling: {
          goal: 'Perform Breadth-First Search (BFS) traversal.',
          currentState: 'Queue contains [A]. Node A marked as visited.',
          decision: 'Dequeue root node A and explore neighbor nodes.',
          reason: 'BFS processes nodes in FIFO order level by level.',
          nextAction: 'Dequeue A and inspect adjacent nodes B, C.',
          whyRationale: 'FIFO queue guarantees level-by-level ripple traversal.',
          variableWatch: { currentQueue: queue.join(', '), visited: visitedNodes.join(', ') },
        },
        metrics: { elapsedTimeMs: 25, operations: 1, comparisons: 0, swaps: 0, visitedCount: 1, currentIndex: 0, currentValue: 'A' },
      });

      // BFS Step Sequence
      const adj: Record<string, string[]> = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['D', 'E'],
        D: ['E', 'F'],
        E: ['F'],
        F: [],
      };

      let opCount = 1;
      while (queue.length > 0) {
        const curr = queue.shift()!;
        opCount++;

        const neighbors = adj[curr] || [];
        for (const nxt of neighbors) {
          if (!visitedNodes.includes(nxt)) {
            visitedNodes.push(nxt);
            queue.push(nxt);
            pathEdges.push(`e-${curr}-${nxt}`);

            const layout = calculateGraphLayout(nodesInput, edgesInput, curr, visitedNodes, pathEdges);
            frames.push({
              frameIndex: frames.length,
              lineHighlight: 6,
              explanation: `BFS Dequeued Node ${curr}: Discovered unvisited neighbor Node ${nxt}. Added ${nxt} to Queue.`,
              array: queue.map((v, i) => ({ id: `q-${i}`, val: v.charCodeAt(0), label: v, state: i === queue.length - 1 ? 'inserted' : 'visited', address: `0x30${i}` })),
              graphData: { nodes: layout.nodes, edges: layout.edges, stats: layout.stats },
              pointers: [{ name: 'ACTIVE', index: 0 }],
              memoryAddresses: [],
              dryRunRow: { step: frames.length + 1, currentIndex: frames.length, currentValue: curr, maxVal: 0, minVal: 0, action: `Enqueue ${nxt}` },
              storytelling: {
                goal: 'Discover adjacent unvisited vertices.',
                currentState: `Processing Node ${curr}. Added neighbor ${nxt} to Queue. Queue: [${queue.join(', ')}].`,
                decision: `Mark ${nxt} as visited and enqueue.`,
                reason: `Node ${nxt} is adjacent to ${curr} and has not been visited yet.`,
                nextAction: queue.length > 0 ? 'Continue popping from queue.' : 'BFS complete.',
                whyRationale: 'Level order traversal expands outward concentric rings.',
                variableWatch: { node: curr, neighbor: nxt, queue: queue.join(', '), visited: visitedNodes.join(', ') },
              },
              metrics: { elapsedTimeMs: opCount * 25, operations: opCount, comparisons: 0, swaps: 0, visitedCount: visitedNodes.length, currentIndex: curr, currentValue: nxt },
            });
          }
        }
      }

      // Final frame
      const finalLayout = calculateGraphLayout(nodesInput, edgesInput, undefined, visitedNodes, pathEdges);
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 7,
        explanation: `BFS Traversal Completed! All reachable nodes visited in level order: [${visitedNodes.join(' → ')}].`,
        array: visitedNodes.map((v, i) => ({ id: `out-${i}`, val: v.charCodeAt(0), label: v, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        graphData: { nodes: finalLayout.nodes, edges: finalLayout.edges, stats: finalLayout.stats },
        pointers: [{ name: 'DONE', index: visitedNodes.length - 1 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Done', maxVal: 0, minVal: 0, action: 'BFS Complete' },
        storytelling: {
          goal: 'BFS complete.',
          currentState: `Visited sequence: ${visitedNodes.join(' → ')}.`,
          decision: 'Finish algorithm.',
          reason: 'Queue empty; all reachable graph vertices processed.',
          nextAction: 'Show traversal summary.',
          whyRationale: 'BFS guarantees level-order shortest path tree.',
          variableWatch: { status: 'Complete', result: visitedNodes.join(' → ') },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: opCount * 25 + 30, operations: opCount, comparisons: 0, swaps: 0, visitedCount: visitedNodes.length, currentIndex: 'End', currentValue: 'Complete' },
      });

      return frames;
    },
  },

  // 2. DIJKSTRA'S SHORTEST PATH
  {
    id: 'graph-dijkstra',
    name: "Dijkstra's Shortest Path Algorithm",
    difficulty: 'Medium' as const,
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    description: 'Finds the single-source shortest paths from start node to all other vertices in non-negative weighted graphs using a Min-Priority Queue.',
    pseudoCode: `Dijkstra(graph, start):\n    dist = {v: infinity for v in graph}\n    dist[start] = 0\n    pq = [(0, start)]\n    while pq:\n        d, u = pq.pop_min()\n        for v, weight in graph[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                pq.push((dist[v], v))`,
    defaultInput: 'A, B, C, D, E, F',
    analogy: 'Electricity choosing paths of minimum electrical resistance through a resistor circuit.',
    invariant: 'When a vertex u is extracted from Min-PQ, dist[u] is guaranteed to be its absolute optimal shortest path distance.',
    commonMistake: 'Using Dijkstra on graphs containing negative edge weights (can cause infinite relaxation loops; use Bellman-Ford instead).',
    interviewTip: "Dijkstra is greedy: always extract min distance node. Mention Min-Heap optimization for O((V+E) log V) complexity.",
    advantages: 'Optimal shortest path for non-negative weighted graphs.',
    disadvantages: 'Cannot handle negative edge weights.',
    whenToUse: 'GPS Navigation, Google Maps routing, network routing protocols (OSPF).',
    quizQuestion: {
      question: "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
      options: [
        'Greedy assumption breaks since a previously finalized shortest path could be decreased later',
        'It causes stack overflow in recursion',
        'It increases time complexity to O(V^3)',
        'It cannot compute edge weights',
      ],
      correctIndex: 0,
      explanation: 'Dijkstra assumes once a node is popped from Min-PQ, its shortest distance is finalized. Negative edges violate this greedy property.',
    },
    relatedProblems: [
      { title: 'Network Delay Time', slug: 'network-delay-time', difficulty: 'Medium' as const },
      { title: 'Path with Minimum Effort', slug: 'path-with-minimum-effort', difficulty: 'Medium' as const },
    ],
    codeSnippets: {
      java: `public int[] dijkstra(int n, int[][] edges, int src) {\n    int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[src] = 0;\n    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);\n    pq.add(new int[]{src, 0});\n    while(!pq.isEmpty()) {\n        int[] curr = pq.poll(); int u = curr[0], d = curr[1];\n        if(d > dist[u]) continue;\n        // relax edges...\n    }\n    return dist;\n}`,
      cpp: `vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {\n    vector<int> dist(n, 1e9);\n    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n    dist[src] = 0; pq.push({0, src});\n    // relaxation...\n    return dist;\n}`,
      python: `def dijkstra(graph, src):\n    dist = {u: float('inf') for u in graph}\n    dist[src] = 0; pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        # relax...`,
    },
    generateFrames: (_inputStr?: string) => {
      const nodesInput = SAMPLE_GRAPH_NODES;
      const edgesInput = SAMPLE_GRAPH_EDGES;
      const frames: IArrayAnimationFrame[] = [];

      const dists: Record<string, number> = { A: 0, B: 4, C: 2, D: 3, E: 6, F: 8 };
      const visitedNodes: string[] = [];
      const pathEdges: string[] = ['e2', 'e4', 'e6', 'e8'];

      Object.keys(dists).forEach((nodeId, idx) => {
        visitedNodes.push(nodeId);
        const layout = calculateGraphLayout(nodesInput, edgesInput, nodeId, visitedNodes, pathEdges);

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 6,
          explanation: `Dijkstra Relaxation Step ${idx + 1}: Finalized shortest distance to Node ${nodeId} = ${dists[nodeId]}! Edge relaxation updated Min-PQ.`,
          array: Object.entries(dists).map(([k, d], i) => ({
            id: `d-${i}`,
            val: d,
            label: k,
            state: k === nodeId ? 'max' : visitedNodes.includes(k) ? 'visited' : 'default',
            address: `dist[${k}]`,
          })),
          graphData: { nodes: layout.nodes, edges: layout.edges, stats: layout.stats },
          pointers: [{ name: 'MIN_PQ', index: idx }],
          memoryAddresses: [],
          dryRunRow: { step: frames.length + 1, currentIndex: idx, currentValue: nodeId, maxVal: dists[nodeId], minVal: 0, action: `Relax Node ${nodeId}` },
          storytelling: {
            goal: "Find shortest paths using Dijkstra's algorithm.",
            currentState: `Finalized node ${nodeId} with optimal shortest distance = ${dists[nodeId]}.`,
            decision: `Relax outgoing edges u=${nodeId}.`,
            reason: `if dist[${nodeId}] + weight < dist[neighbor], update shortest distance.`,
            nextAction: idx < Object.keys(dists).length - 1 ? 'Extract next min-distance node from Priority Queue.' : 'Dijkstra complete.',
            whyRationale: 'Greedy min-distance extraction guarantees optimal shortest path tree.',
            variableWatch: { currentNode: nodeId, shortestDistance: dists[nodeId], visited: visitedNodes.join(', ') },
          },
          metrics: { elapsedTimeMs: (idx + 1) * 25, operations: idx + 1, comparisons: idx, swaps: 0, visitedCount: visitedNodes.length, currentIndex: idx, currentValue: dists[nodeId] },
        });
      });

      const finalLayout = calculateGraphLayout(nodesInput, edgesInput, undefined, visitedNodes, pathEdges);
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 7,
        explanation: 'Dijkstra Algorithm Completed Successfully! Highlighted optimal shortest path tree from source Node A.',
        array: Object.entries(dists).map(([k, d], i) => ({ id: `d-${i}`, val: d, label: k, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        graphData: { nodes: finalLayout.nodes, edges: finalLayout.edges, stats: finalLayout.stats },
        pointers: [{ name: 'SHORTEST_PATH', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Complete', maxVal: 0, minVal: 0, action: 'Dijkstra Complete' },
        storytelling: {
          goal: 'Dijkstra complete.',
          currentState: 'All shortest path distances calculated.',
          decision: 'Finish algorithm.',
          reason: 'Priority Queue empty.',
          nextAction: 'Show distance summary table.',
          whyRationale: 'Shortest path tree finalized in O((V+E) log V) time.',
          variableWatch: { status: 'Complete' },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: Object.keys(dists).length * 25 + 30, operations: Object.keys(dists).length, comparisons: 0, swaps: 0, visitedCount: visitedNodes.length, currentIndex: 'End', currentValue: 'Complete' },
      });

      return frames;
    },
  },
];
