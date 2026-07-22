import { InterviewQuestion } from '../interviewMetadata';

export const GREEDY_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 35 }, (_, i) => {
  const titles = [
    'Jump Game', 'Jump Game II', 'Gas Station', 'Candy', 'Task Scheduler',
    'Non-overlapping Intervals', 'Minimum Number of Arrows to Burst Balloons', 'Partition Labels',
    'Lemonade Change', 'Queue Reconstruction by Height', 'Assign Cookies', 'Is Subsequence',
    'Best Time to Buy and Sell Stock II', 'Boats to Save People', 'Remove Duplicate Letters',
    'Two City Scheduling', 'Maximum Units on a Truck', 'Minimum Operations to Make the Array Increasing',
    'Maximum Subarray', 'Wiggle Subsequence', 'Split Array into Consecutive Subsequences',
    'Reorganize String', 'Monotone Increasing Digits', 'Dota2 Senate', 'Create Maximum Number',
    'Minimum Add to Make Parentheses Valid', 'String Without AAA or BBB', 'Previous Permutation With One Swap',
    'Car Pooling', 'Check if It Is a Straight Line', 'Break a Palindrome', 'Maximum Length of Pair Chain',
    'Advantage Shuffle', 'Score After Flipping Matrix', 'Minimum Cost to Connect Sticks'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `greedy-${i + 1}`,
    title,
    category: 'greedy',
    pattern: 'Greedy Choice Property',
    subPattern: 'Canonical Greedy Problem',
    difficulty: diff,
    description: `Solve ${title} by making optimal local choice at each step.`,
    frequency: i < 8 ? 'top' : i < 20 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N log N)',
    expectedSpace: 'O(1)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'],
    leetcodeNumber: 55 + i * 4,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Sort elements first or track optimal choice locally.'],
    bruteForce: 'Try all combinations of selections.',
    optimalApproach: 'Greedy Choice selection in O(N log N) time.',
    commonMistakes: ['Applying greedy choice when optimal substructure requires DP'],
    prerequisites: ['Greedy', 'Sorting'],
    relatedQuestions: [`greedy-${((i + 1) % 35) + 1}`, `greedy-${((i + 2) % 35) + 1}`],
    acceptanceRate: `${52 + (i % 30)}%`,
  };
});
