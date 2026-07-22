import { MASTER_500_INTERVIEW_DATASET } from './interview/masterInterviewDataset';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type RevisionLevel = 'unmarked' | 'revision-1' | 'revision-2' | 'revision-3' | 'mastered';

export interface InterviewQuestion {
  id: string;
  title: string;
  category: string;
  pattern: string;
  subPattern?: string;
  difficulty: DifficultyLevel;
  description: string;
  frequency: 'high' | 'medium' | 'top';
  starRating?: 1 | 2 | 3 | 4 | 5;
  expectedTime: string;
  expectedSpace: string;
  companies: string[];
  leetcodeNumber?: number;
  leetcodeLink?: string;
  visualizerSlug?: string;
  hints: string[];
  approach?: string;
  optimalApproach: string;
  bruteForce?: string;
  commonMistakes?: string[];
  prerequisites?: string[];
  relatedQuestions?: string[];
  acceptanceRate?: string;
  estimatedTime?: string;
  platform?: string;
  platformLink?: string;
  status?: string;
  notes?: string;
  bookmarked?: boolean;
  completed?: boolean;
  tags?: string[];
  topic?: string;
}

export interface CategoryRoadmap {
  category: string;
  title: string;
  description: string;
  order: { level: 'Beginner' | 'Intermediate' | 'Advanced'; pattern: string }[];
}

export const CATEGORY_ROADMAPS: Record<string, CategoryRoadmap> = {
  array: {
    category: 'array',
    title: 'Array & Matrix Roadmap',
    description: 'Master linear data structures, sliding window, two pointers, and sub-array optimizations.',
    order: [
      { level: 'Beginner', pattern: 'Basic Traversal & Searching' },
      { level: 'Beginner', pattern: 'Two Pointer Technique' },
      { level: 'Intermediate', pattern: 'Sliding Window' },
      { level: 'Intermediate', pattern: 'Prefix Sum & Difference Array' },
      { level: 'Advanced', pattern: 'Kadane & Subarray Problems' },
      { level: 'Advanced', pattern: 'Interval Operations' },
    ],
  },
  string: {
    category: 'string',
    title: 'String Algorithms Roadmap',
    description: 'Master string hashing, palindromes, sliding window, and pattern matching.',
    order: [
      { level: 'Beginner', pattern: 'String Manipulation' },
      { level: 'Intermediate', pattern: 'Sliding Window Substring' },
      { level: 'Advanced', pattern: 'Pattern Matching & Hashing' },
    ],
  },
  'linked-list': {
    category: 'linked-list',
    title: 'Linked List Roadmap',
    description: 'Master pointer manipulation, Floyd tortoise & hare, and memory restructuring.',
    order: [
      { level: 'Beginner', pattern: 'Traversal & Modification' },
      { level: 'Beginner', pattern: 'Reverse Linked List' },
      { level: 'Intermediate', pattern: 'Fast & Slow Pointers' },
      { level: 'Intermediate', pattern: 'Merge & Intersection' },
      { level: 'Advanced', pattern: 'LRU Cache & Complex Restructuring' },
    ],
  },
  stack: {
    category: 'stack',
    title: 'Stack Roadmap',
    description: 'Master LIFO operations, monotonic stack, and expression evaluation.',
    order: [
      { level: 'Beginner', pattern: 'Basic Stack & Parentheses' },
      { level: 'Intermediate', pattern: 'Monotonic Stack' },
      { level: 'Advanced', pattern: 'Expression Parsing & Histograms' },
    ],
  },
  queue: {
    category: 'queue',
    title: 'Queue Roadmap',
    description: 'Master FIFO pipelines, circular buffers, and sliding window maximums.',
    order: [
      { level: 'Beginner', pattern: 'Queue Basics & Circular Queue' },
      { level: 'Intermediate', pattern: 'Monotonic Queue & Deque' },
      { level: 'Advanced', pattern: 'Sliding Window Maximum' },
    ],
  },
  tree: {
    category: 'tree',
    title: 'Trees & BST Roadmap',
    description: 'Master tree traversals, BST properties, LCA, and Binary Tree DP.',
    order: [
      { level: 'Beginner', pattern: 'Tree Traversals (DFS / BFS)' },
      { level: 'Intermediate', pattern: 'BST Operations' },
      { level: 'Intermediate', pattern: 'LCA & Path Problems' },
      { level: 'Advanced', pattern: 'Tree Views & Binary Tree DP' },
    ],
  },
  heap: {
    category: 'heap',
    title: 'Heap & Priority Queue Roadmap',
    description: 'Master Heapify, Kth elements, and Priority Queue scheduling.',
    order: [
      { level: 'Beginner', pattern: 'Min/Max Heap Basics' },
      { level: 'Intermediate', pattern: 'Top K Frequent Elements' },
      { level: 'Advanced', pattern: 'K-Way Merge & Scheduling' },
    ],
  },
  graph: {
    category: 'graph',
    title: 'Graph Algorithms Roadmap',
    description: 'Master BFS/DFS, Shortest Paths, Topological Sort, and Disjoint Set Union.',
    order: [
      { level: 'Beginner', pattern: 'BFS & DFS Traversals' },
      { level: 'Intermediate', pattern: 'Cycle Detection & Bipartite Graphs' },
      { level: 'Intermediate', pattern: 'Topological Sort' },
      { level: 'Advanced', pattern: 'Shortest Path (Dijkstra) & MST' },
    ],
  },
};

export const COMPANY_LIST = [
  'Google',
  'Microsoft',
  'Amazon',
  'Adobe',
  'Atlassian',
  'TCS',
  'Infosys',
  'Accenture',
  'Capgemini',
  'Cognizant',
  'Uber',
  'Swiggy',
  'Paytm',
  'Goldman Sachs',
  'Morgan Stanley',
  'Deloitte',
];

export const INTERVIEW_QUESTIONS_DATASET: InterviewQuestion[] = MASTER_500_INTERVIEW_DATASET;
