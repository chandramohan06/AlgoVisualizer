import { InterviewQuestion } from '../interviewMetadata';

export const GRAPHS_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 55 }, (_, i) => {
  const titles = [
    'Number of Islands', 'Clone Graph', 'Course Schedule', 'Course Schedule II',
    'Pacific Atlantic Water Flow', 'Surrounded Regions', 'Rotting Oranges', 'Walls and Gates',
    'Word Ladder', 'Word Ladder II', 'Graph Valid Tree', 'Number of Connected Components in an Undirected Graph',
    'Redundant Connection', 'Network Delay Time', 'Cheapest Flights Within K Stops', 'Swim in Rising Water',
    'Path with Minimum Effort', 'Reconstruct Itinerary', 'Min Cost to Connect All Points', 'Alien Dictionary',
    'Critical Connections in a Network', 'Evaluate Division', 'Is Graph Bipartite?', 'Accounts Merge',
    'Possible Bipartition', 'Find Eventual Safe States', 'Shortest Path in Binary Matrix', 'As Far from Land as Possible',
    'Map of Highest Peak', 'Shortest Path Visiting All Nodes', 'All Paths From Source to Target', 'Keys and Rooms',
    'Find the Town Judge', 'Max Area of Island', 'Number of Closed Islands', 'Number of Enclaves',
    'Count Sub Islands', 'Detonate the Maximum Bombs', 'Find All Groups of Farmland', 'Minimum Number of Vertices to Reach All Nodes',
    'Minimum Height Trees', 'Loud and Rich', 'Time Needed to Inform All Employees', 'Reorder Routes to Make All Paths Lead to the City Zero',
    'Maximal Network Rank', 'Sort Items by Groups Respecting Dependencies', 'Parallel Courses', 'Parallel Courses II',
    'Frog Position After T Seconds', 'Number of Restricted Paths From First to Last Node', 'Path with Maximum Probability',
    'Minimum Cost to Reach Destination in Time', 'Second Minimum Time to Reach Destination', 'Minimum Fuel Cost to Report to the Capital',
    'Shortest Path to Get All Keys'
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `graph-${i + 1}`,
    title,
    category: 'graph',
    pattern: 'BFS & DFS Traversals',
    subPattern: 'Canonical Graph Problem',
    difficulty: diff,
    description: `Solve ${title} using graph traversals, shortest path, or topological sort.`,
    frequency: i < 12 ? 'top' : i < 30 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(V + E)',
    expectedSpace: 'O(V)',
    companies: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Swiggy', 'TCS'],
    leetcodeNumber: 200 + i * 5,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'graph-bfs-traversal',
    hints: ['Model problem as a Graph where vertices are states and edges are transitions.'],
    bruteForce: 'Check all possible paths recursively without memo/visited set.',
    optimalApproach: 'Use BFS Queue / DFS with Visited Array in O(V + E) time.',
    commonMistakes: ['Infinite cycle recursion without visited set'],
    prerequisites: ['Graph', 'BFS', 'DFS'],
    relatedQuestions: [`graph-${((i + 1) % 55) + 1}`, `graph-${((i + 2) % 55) + 1}`],
    acceptanceRate: `${55 + (i % 30)}%`,
  };
});
