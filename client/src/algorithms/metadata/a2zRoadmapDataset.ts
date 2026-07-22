import { MASTER_500_INTERVIEW_DATASET } from './interview/masterInterviewDataset';
import { InterviewQuestion } from './interviewMetadata';

export interface A2ZModuleDefinition {
  moduleNumber: number;
  title: string;
  shortName: string;
  description: string;
  estimatedHours: number;
  questionCount: number;
  patterns: string[];
  categoryKeys: string[];
}

export const A2Z_ROADMAP_MODULES: A2ZModuleDefinition[] = [
  {
    moduleNumber: 1,
    title: 'Learn Important Sorting Techniques',
    shortName: 'Sorting',
    description: 'Master foundational swap mechanics, logarithmic sorting algorithms, and recursive divide-and-conquer trees.',
    estimatedHours: 10,
    questionCount: 0,
    patterns: ['Selection & Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Recursive Sorting'],
    categoryKeys: ['sorting', 'array'],
  },
  {
    moduleNumber: 2,
    title: 'Arrays',
    shortName: 'Arrays',
    description: 'Master array traversals, two-pointer techniques, sliding window patterns, prefix sums, Kadane algorithm, intervals, and matrix operations.',
    estimatedHours: 35,
    questionCount: 0,
    patterns: ['Traversal & Basic Mechanics', 'Two Pointer Technique', 'Sliding Window', 'Prefix Sum', 'Kadane & Subarray', 'Interval Operations', 'Matrix Manipulations'],
    categoryKeys: ['array', 'arrays'],
  },
  {
    moduleNumber: 3,
    title: 'Binary Search',
    shortName: 'Binary Search',
    description: 'Master logarithmic search techniques across 1D sorted arrays, search spaces/answers, and 2D matrices.',
    estimatedHours: 25,
    questionCount: 0,
    patterns: ['1D Array BS', 'BS on Answers & Range', '2D Matrix BS', 'Rotated Sorted Array BS'],
    categoryKeys: ['binary-search', 'array', 'searching'],
  },
  {
    moduleNumber: 4,
    title: 'Strings',
    shortName: 'Strings',
    description: 'Master character manipulations, palindromes, anagrams, substring sliding windows, and string reversal patterns.',
    estimatedHours: 14,
    questionCount: 0,
    patterns: ['Basic Character Manipulation', 'Anagrams & Hashing', 'Palindromic Substrings', 'String Sliding Window'],
    categoryKeys: ['string', 'strings'],
  },
  {
    moduleNumber: 5,
    title: 'Linked List',
    shortName: 'Linked List',
    description: 'Master singly/doubly linked lists, pointer reversal, fast & slow pointers (Floyd cycle), merging, and LRU cache design.',
    estimatedHours: 22,
    questionCount: 0,
    patterns: ['Single & Double LL', 'Pointer Reversal', 'Fast & Slow Pointers', 'Merge & Sort LL', 'LRU & Complex Restructuring'],
    categoryKeys: ['linked-list', 'linkedlist'],
  },
  {
    moduleNumber: 6,
    title: 'Recursion & Backtracking',
    shortName: 'Backtracking',
    description: 'Master state-space exploration, subsets, combination sums, N-Queens, Sudoku solving, and combinatorial permutations.',
    estimatedHours: 20,
    questionCount: 0,
    patterns: ['Subsequences', 'Combination Sum', 'Subset Sum', 'N-Queens', 'Sudoku Solver', 'Rat in a Maze', 'Permutations'],
    categoryKeys: ['recursion', 'backtracking'],
  },
  {
    moduleNumber: 7,
    title: 'Bit Manipulation',
    shortName: 'Bit Manipulation',
    description: 'Master bitwise AND/OR/XOR operations, checking/setting/clearing bits, single number problems, and power set bitmasking.',
    estimatedHours: 12,
    questionCount: 0,
    patterns: ['Bitwise Operators', 'Set/Clear/Toggle Bits', 'Single Number Variations', 'Bitmask Subsets'],
    categoryKeys: ['bit-manipulation', 'math', 'array'],
  },
  {
    moduleNumber: 8,
    title: 'Stack & Queue',
    shortName: 'Stack & Queue',
    description: 'Master LIFO/FIFO operations, expression parsing (Infix/Postfix), monotonic stack bounds, and circular queue buffers.',
    estimatedHours: 22,
    questionCount: 0,
    patterns: ['Stack & Parentheses', 'Monotonic Stack', 'Infix & Postfix Parsing', 'Monotonic Queue & Deque'],
    categoryKeys: ['stack', 'queue'],
  },
  {
    moduleNumber: 9,
    title: 'Sliding Window & Two Pointer',
    shortName: 'Sliding Window',
    description: 'Master fixed & variable length windows, shrinkable window invariants, and 2-pointer subarray counting.',
    estimatedHours: 15,
    questionCount: 0,
    patterns: ['Fixed Size Window', 'Variable Size Window', 'At Most K Distinct', 'Subarray Counting'],
    categoryKeys: ['array', 'string', 'sliding-window'],
  },
  {
    moduleNumber: 10,
    title: 'Heaps',
    shortName: 'Heaps',
    description: 'Master Min-Heap and Max-Heap structures, top K elements, priority scheduling, and K-way merging.',
    estimatedHours: 16,
    questionCount: 0,
    patterns: ['Min/Max Heap Basics', 'Top K Frequent', 'Kth Largest/Smallest', 'K-Way Merge', 'Task Scheduler'],
    categoryKeys: ['heap', 'priority-queue'],
  },
  {
    moduleNumber: 11,
    title: 'Greedy Algorithms',
    shortName: 'Greedy',
    description: 'Master local optimum choices, interval scheduling, fractional knapsack, minimum platforms, and job sequencing.',
    estimatedHours: 14,
    questionCount: 0,
    patterns: ['Activity Selection', 'Fractional Knapsack', 'Job Sequencing', 'N Meetings in One Room', 'Minimum Platforms'],
    categoryKeys: ['greedy'],
  },
  {
    moduleNumber: 12,
    title: 'Binary Trees',
    shortName: 'Binary Trees',
    description: 'Master tree traversals (Pre/In/Post/Level), tree height/diameter, LCA, tree views, maximum path sums, and tree reconstruction.',
    estimatedHours: 28,
    questionCount: 0,
    patterns: ['Pre/In/Post/Level Traversals', 'Height & Diameter', 'LCA & Path Problems', 'Tree Views & Boundary', 'Binary Tree DP'],
    categoryKeys: ['tree', 'trees', 'binary-tree'],
  },
  {
    moduleNumber: 13,
    title: 'Binary Search Trees',
    shortName: 'BST',
    description: 'Master BST invariants, insertion/deletion, Kth smallest in BST, LCA in BST, and BST iterator design.',
    estimatedHours: 14,
    questionCount: 0,
    patterns: ['BST Operations', 'BST Validation', 'LCA in BST', 'BST Iterator', 'Floor & Ceil in BST', 'Convert & Balance BST', 'Range & Sum Queries'],
    categoryKeys: ['bst', 'tree', 'trees'],
  },
  {
    moduleNumber: 14,
    title: 'Graphs',
    shortName: 'Graphs',
    description: 'Master BFS/DFS graph traversals, cycle detection, topological sorting (Kahn\'s algorithm), shortest paths (Dijkstra/Bellman-Ford/Floyd-Warshall), and Disjoint Set Union (DSU).',
    estimatedHours: 40,
    questionCount: 0,
    patterns: ['BFS & DFS Traversals', 'Cycle Detection', 'Topological Sort', 'Shortest Path (Dijkstra/Bellman)', 'DSU & Spanning Trees'],
    categoryKeys: ['graph', 'graphs'],
  },
  {
    moduleNumber: 15,
    title: 'Dynamic Programming',
    shortName: 'Dynamic Programming',
    description: 'Master Memoization and Tabulation across 1D DP, 2D Grid DP, Subset/Knapsack DP, String DP, Stock Trading DP, LIS, and Matrix Chain Multiplication.',
    estimatedHours: 45,
    questionCount: 0,
    patterns: ['1D DP', '2D & Grid DP', 'Subset & Knapsack DP', 'DP on Strings', 'DP on Stocks', 'LIS & Variations', 'MCM & Partition DP'],
    categoryKeys: ['dp', 'dynamic-programming'],
  },
  {
    moduleNumber: 16,
    title: 'Tries',
    shortName: 'Tries',
    description: 'Master prefix tree data structures, word insertion & search, complete string prefixes, and Bitwise XOR maximum queries.',
    estimatedHours: 10,
    questionCount: 0,
    patterns: ['Implement Trie', 'Prefix Searching', 'Word Dictionary & Search', 'Maximum XOR Queries', 'Advanced Trie Applications'],
    categoryKeys: ['trie', 'string', 'advanced'],
  },
  {
    moduleNumber: 17,
    title: 'Advanced Strings',
    shortName: 'Advanced Strings',
    description: 'Master advanced string matching algorithms: KMP prefix function, Z-algorithm, Rabin-Karp rolling hash, and shortest palindrome construction.',
    estimatedHours: 12,
    questionCount: 0,
    patterns: ['KMP Algorithm', 'Z-Algorithm', 'Rabin-Karp & Rolling Hash', 'Suffix Structures & Automata', 'Pattern & Wildcard Matching'],
    categoryKeys: ['string', 'strings', 'advanced-strings'],
  },
];

export interface RoadmapQuestionItem extends InterviewQuestion {
  moduleNumber: number;
  moduleTitle: string;
  pattern: string;
  isSolved?: boolean;
  isBookmarked?: boolean;
  status?: 'Not Started' | 'Attempted' | 'Completed' | 'Revision 1' | 'Revision 2' | 'Mastered';
  visualizerCategorySlug?: string;
}

// Helper to map questions from master dataset into the 17 modules precisely
export const getMappedRoadmapQuestions = (): RoadmapQuestionItem[] => {
  const questions: RoadmapQuestionItem[] = [];
  const dataset = MASTER_500_INTERVIEW_DATASET;

  dataset.forEach((q: InterviewQuestion, index: number) => {
    let modNum = 2; // Default to Arrays module
    const cat = (q.category || '').toLowerCase();
    const pat = (q.pattern || '').toLowerCase();
    const title = (q.title || '').toLowerCase();

    if (cat.includes('sorting') || (title.includes('sort') && !cat.includes('tree') && !cat.includes('graph') && !cat.includes('bst'))) modNum = 1;
    else if (cat.includes('array') && (pat.includes('binary search') || pat.includes('search') || title.includes('binary search'))) modNum = 3;
    else if (cat.includes('array')) modNum = 2;
    else if (cat.includes('advanced-string') || (cat.includes('string') && (pat.includes('kmp') || pat.includes('z-algo') || pat.includes('rabin') || pat.includes('suffix') || pat.includes('manacher') || pat.includes('rolling hash') || pat.includes('pattern matching') || title.includes('kmp')))) modNum = 17;
    else if (cat.includes('trie')) modNum = 16;
    else if (cat.includes('string')) modNum = 4;
    else if (cat.includes('linked')) modNum = 5;
    else if (cat.includes('recursion') || cat.includes('backtracking')) modNum = 6;
    else if (cat.includes('bit')) modNum = 7;
    else if (cat.includes('stack') || cat.includes('queue')) modNum = 8;
    else if (pat.includes('sliding window') || pat.includes('two pointer')) modNum = 9;
    else if (cat.includes('heap') || cat.includes('priority')) modNum = 10;
    else if (cat.includes('greedy')) modNum = 11;
    else if (cat.includes('bst')) modNum = 13;
    else if (cat.includes('tree')) modNum = 12;
    else if (cat.includes('graph')) modNum = 14;
    else if (cat.includes('dp') || cat.includes('dynamic')) modNum = 15;
    else if (index < 7) modNum = 1;

    const modDef = A2Z_ROADMAP_MODULES.find(m => m.moduleNumber === modNum) || A2Z_ROADMAP_MODULES[1];

    // Match or assign a valid pattern from module pattern list
    let assignedPattern = modDef.patterns.find(p => p.toLowerCase() === pat || p.toLowerCase().includes(pat) || pat.includes(p.toLowerCase()));
    if (!assignedPattern) {
      // Assign pattern deterministically based on index to ensure balance across pattern cards
      assignedPattern = modDef.patterns[index % modDef.patterns.length];
    }

    let visualizerCategorySlug = q.category.toLowerCase().replace(/\s+/g, '-');
    if (visualizerCategorySlug === 'arrays') visualizerCategorySlug = 'array';
    if (visualizerCategorySlug === 'trees') visualizerCategorySlug = 'tree';
    if (visualizerCategorySlug === 'graphs') visualizerCategorySlug = 'graph';

    questions.push({
      ...q,
      moduleNumber: modDef.moduleNumber,
      moduleTitle: modDef.title,
      pattern: assignedPattern,
      status: 'Not Started',
      visualizerCategorySlug,
    });
  });

  // Calculate dynamic question counts per module
  A2Z_ROADMAP_MODULES.forEach(m => {
    m.questionCount = questions.filter(q => q.moduleNumber === m.moduleNumber).length;
  });

  return questions;
};
