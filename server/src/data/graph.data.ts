import { DSAAlgorithmEntry } from './dsa.types';

export const GRAPH_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'bfs-graph-traversal',
    title: 'Breadth-First Search (BFS)',
    categorySlug: 'graph',
    categoryName: 'Graph',
    topicGroup: 'Traversals',
    difficulty: 'easy',
    description: 'Explore graph level by level outward from starting node using Queue.',
    theory: 'BFS traverses unweighted graph nodes level by level. It guarantees finding shortest path in unweighted graphs.',
    working: 'Enqueue start node and mark visited. While queue not empty: pop u, for each unvisited neighbor v of u: mark visited and enqueue v.',
    javaCode: `import java.util.*;
public class Solution {
    public void bfs(int start, List<List<Integer>> adj, int V) {
        boolean[] visited = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        visited[start] = true;
        q.offer(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.offer(v);
                }
            }
        }
    }
}`,
    cppCode: `void bfs(int start, vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    pythonCode: `from collections import deque
def bfs(start, adj, V):
    visited = [False] * V
    q = deque([start])
    visited[start] = True
    while q:
        u = q.popleft()
        print(u, end=" ")
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                q.append(v)`,
    pseudoCode: `FUNCTION bfs(start, adj, V):
    visited = ARRAY of false size V
    q = CREATE QUEUE
    visited[start] = true, ENQUEUE start
    WHILE q IS NOT EMPTY DO:
        u = DEQUEUE(q)
        PRINT u
        FOR EACH v IN adj[u] DO:
            IF NOT visited[v] THEN
                visited[v] = true
                ENQUEUE v
            END IF
        END FOR
    END WHILE
END FUNCTION`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: ['Shortest path in unweighted graphs', 'Social network connectivity (degree of separation)', 'Web crawlers'],
    interviewTips: ['BFS finds shortest path in terms of edge count; for weighted graphs use Dijkstra'],
    commonMistakes: ['Marking node as visited when popping instead of when enqueuing (causes duplicate entries)'],
    leetCodeNumber: 200,
    leetCodeName: 'Number of Islands',
    leetCodeDifficulty: 'Medium',
    leetCodePattern: 'Graph BFS/DFS',
    leetCodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    sampleInput: 'V=4, edges=[[0,1],[0,2],[1,2],[2,3]]',
    sampleOutput: '0 1 2 3',
    quizzes: [
      { question: 'Time complexity of BFS on graph with V vertices and E edges?', type: 'mcq', options: ['O(V + E)', 'O(V * E)', 'O(V²)', 'O(E²)'], correctAnswer: 'O(V + E)', explanation: 'Visits every vertex and traverses every edge once.', difficulty: 'easy', points: 10 },
      { question: 'Which data structure does BFS use?', type: 'mcq', options: ['Queue', 'Stack', 'Heap', 'Tree'], correctAnswer: 'Queue', explanation: 'BFS uses FIFO queue for level-by-level traversal.', difficulty: 'easy', points: 10 },
      { question: 'Does BFS find shortest path in unweighted graphs?', type: 'mcq', options: ['Yes', 'No', 'Only for trees', 'Only if sorted'], correctAnswer: 'Yes', explanation: 'Level-by-level exploration guarantees reaching target with minimum edge count.', difficulty: 'easy', points: 10 },
      { question: 'Algorithm for shortest path on non-negative weighted graph?', type: 'mcq', options: ['Dijkstra\'s Algorithm', 'BFS', 'DFS', 'Kruskal'], correctAnswer: 'Dijkstra\'s Algorithm', explanation: 'Dijkstra uses Priority Queue for non-negative weighted graphs.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of BFS visited array and queue?', type: 'mcq', options: ['O(V)', 'O(E)', 'O(V * E)', 'O(1)'], correctAnswer: 'O(V)', explanation: 'Stores at most V vertices in visited array and queue.', difficulty: 'medium', points: 15 },
      { question: 'Algorithm to detect negative weight cycles in directed graph?', type: 'mcq', options: ['Bellman-Ford Algorithm', 'Dijkstra', 'BFS', 'Prim'], correctAnswer: 'Bellman-Ford Algorithm', explanation: 'Bellman-Ford relaxes all edges V-1 times and detects negative cycles on 6th pass.', difficulty: 'hard', points: 20 },
    ],
  },
];
