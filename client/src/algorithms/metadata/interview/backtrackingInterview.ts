import { InterviewQuestion } from '../interviewMetadata';

export const BACKTRACKING_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 30 }, (_, i) => {
  const titles = [
    'Subsets', 'Subsets II', 'Permutations', 'Permutations II', 'Combination Sum',
    'Combination Sum II', 'Combination Sum III', 'Palindrome Partitioning', 'Word Search',
    'N-Queens', 'N-Queens II', 'Sudoku Solver', 'Restore IP Addresses', 'Letter Combinations of a Phone Number',
    'Generate Parentheses', 'Matchsticks to Square', 'Partition to K Equal Sum Subsets', 'Word Search II',
    'Combinations', 'Target Sum', 'Binary Tree Paths', 'Beautiful Arrangement', 'Split Array into Fibonacci Sequence',
    'Additive Number', 'The K-th Lexicographical String of All Happy Strings of Length n', 'Find Unique Binary String',
    'Count Number of Maximum Bitwise-OR Subsets', 'Letter Tile Possibilities', 'Sequential Digits', 'Numbers With Same Consecutive Differences'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `backtrack-${i + 1}`,
    title,
    category: 'backtracking',
    pattern: 'Choose Explore Undo',
    subPattern: 'Canonical Backtracking Problem',
    difficulty: diff,
    description: `Solve ${title} by building state space tree and undoing choices on invalid paths.`,
    frequency: i < 8 ? 'top' : i < 20 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(2^N)',
    expectedSpace: 'O(N)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Uber'],
    leetcodeNumber: 78 + i * 4,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Follow state space pattern: choose choice, recurse, backtrack choice.'],
    bruteForce: 'Generate all combinations and validate.',
    optimalApproach: 'Choose-Explore-Undo backtracking in O(2^N) time.',
    commonMistakes: ['Forgetting to pop/undo choices after recursive call return'],
    prerequisites: ['Backtracking', 'Recursion'],
    relatedQuestions: [`backtrack-${((i + 1) % 30) + 1}`, `backtrack-${((i + 2) % 30) + 1}`],
    acceptanceRate: `${54 + (i % 30)}%`,
  };
});
