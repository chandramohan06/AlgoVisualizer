import { InterviewQuestion } from '../interviewMetadata';

export const DP_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 60 }, (_, i) => {
  const titles = [
    'Climbing Stairs', 'House Robber', 'House Robber II', 'Longest Palindromic Substring',
    'Palindromic Substrings', 'Decode Ways', 'Coin Change', 'Maximum Product Subarray',
    'Word Break', 'Longest Increasing Subsequence', 'Partition Equal Subset Sum', 'Unique Paths',
    'Longest Common Subsequence', 'Best Time to Buy and Sell Stock with Cooldown', 'Coin Change II',
    'Target Sum', 'Interleaving String', 'Edit Distance', 'Distinct Subsequences', 'Minimum Path Sum',
    'Maximal Square', 'Dungeon Game', 'Burst Balloons', 'Regular Expression Matching', 'Wildcard Matching',
    'N-th Tribonacci Number', 'Min Cost Climbing Stairs', 'Fibonacci Number', 'Divisor Game',
    'Counting Bits', 'Pascals Triangle', 'Pascals Triangle II', 'Is Subsequence', 'Get Maximum in Generated Array',
    'Triangle', 'Minimum Falling Path Sum', 'Matrix Block Sum', 'Champagne Tower', 'Knight Dialer',
    'Out of Boundary Paths', 'Ones and Zeroes', 'Combination Sum IV', 'Integer Break', 'Count Sorted Vowel Strings',
    'Count Vowels Permutation', 'Longest String Chain', 'Maximum Length of Pair Chain', 'Number of Longest Increasing Subsequence',
    'Longest Arithmetic Subsequence', 'Longest Arithmetic Subsequence of Given Difference', 'Partition Array for Maximum Sum',
    'Solving Questions With Brainpower', 'Maximum Subarray Sum with One Deletion', 'Delete and Earn', 'Domino and Tromino Tiling',
    'Stone Game', 'Stone Game II', 'Stone Game III', 'Predict the Winner', 'Egg Dropping Puzzle'
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `dp-${i + 1}`,
    title,
    category: 'dynamic-programming',
    pattern: '1D / 2D DP Tabulation',
    subPattern: 'Canonical DP Problem',
    difficulty: diff,
    description: `Solve ${title} by defining state recurrence and memoization / tabulation table.`,
    frequency: i < 15 ? 'top' : i < 35 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N^2)',
    expectedSpace: 'O(N)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Atlassian', 'Uber'],
    leetcodeNumber: 70 + i * 3,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Define dp[i] as solution for subproblem of size i.'],
    bruteForce: 'Recursive tree trying all choices in exponential O(2^N) time.',
    optimalApproach: 'DP Memoization or Tabulation table in polynomial O(N) or O(N^2) time.',
    commonMistakes: ['Incorrect base case table initialization', 'Incorrect loop iteration direction'],
    prerequisites: ['Dynamic Programming', 'Recursion'],
    relatedQuestions: [`dp-${((i + 1) % 60) + 1}`, `dp-${((i + 2) % 60) + 1}`],
    acceptanceRate: `${48 + (i % 30)}%`,
  };
});
