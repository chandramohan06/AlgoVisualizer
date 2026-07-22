import { InterviewQuestion } from '../interviewMetadata';

export const RECURSION_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 20 }, (_, i) => {
  const titles = [
    'Fibonacci Number', 'Climbing Stairs', 'Tower of Hanoi', 'Pow(x, n)',
    'Reverse String Recursive', 'Merge Two Sorted Lists Recursive', 'Swap Nodes in Pairs Recursive',
    'K-th Symbol in Grammar', 'Search in a Binary Search Tree', 'Pascals Triangle II',
    'Flatten a Multilevel Doubly Linked List', 'Regular Expression Matching', 'Wildcard Matching',
    'Elimination Game', 'Predict the Winner', 'Special Binary String', 'Basic Calculator',
    'Parse Lisp Expression', 'Find Kth Bit in Nth Binary String', 'Decode String'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `rec-${i + 1}`,
    title,
    category: 'recursion',
    pattern: 'Recursive Call Stack',
    subPattern: 'Canonical Recursion Problem',
    difficulty: diff,
    description: `Solve ${title} by defining recurrence relation and base cases.`,
    frequency: i < 5 ? 'top' : i < 12 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(2^N)',
    expectedSpace: 'O(N)',
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe'],
    leetcodeNumber: 50 + i * 5,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Define subproblem: solve(N) in terms of solve(N-1).'],
    bruteForce: 'Brute force recursive tree exploration.',
    optimalApproach: 'Identify subproblem relation and base case stop condition.',
    commonMistakes: ['Missing base case leading to StackOverflowError'],
    prerequisites: ['Recursion', 'Call Stack'],
    relatedQuestions: [`rec-${((i + 1) % 20) + 1}`, `rec-${((i + 2) % 20) + 1}`],
    acceptanceRate: `${60 + (i % 25)}%`,
  };
});
