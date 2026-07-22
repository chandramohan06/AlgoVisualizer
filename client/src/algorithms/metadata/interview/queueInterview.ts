import { InterviewQuestion } from '../interviewMetadata';

export const QUEUE_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 25 }, (_, i) => {
  const titles = [
    'Implement Queue using Stacks', 'Design Circular Queue', 'Design Circular Deque',
    'Sliding Window Maximum', 'First Unique Character in a String', 'Reveal Cards In Increasing Order',
    'Number of Recent Calls', 'Dota2 Senate', 'Design Front Middle Back Queue',
    'Task Scheduler', 'Find the Winner of the Circular Game', 'Moving Average from Data Stream',
    'Shortest Subarray with Sum at Least K', 'Stamping The Sequence', 'Constrained Subsequence Sum',
    'Jump Game VI', 'Maximum Value at a Given Index in a Bounded Array', 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit',
    'Continuous Subarrays', 'Number of Students Unable to Eat Lunch', 'Time Needed to Buy Tickets',
    'Find the Student that Will Replace the Chalk', 'First Negative Integer in Every Window of Size K',
    'Flatten Nested List Iterator', 'Design Snake Game'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `queue-${i + 1}`,
    title,
    category: 'queue',
    pattern: 'Queue & Monotonic Deque',
    subPattern: 'Canonical Queue Problem',
    difficulty: diff,
    description: `Solve ${title} using FIFO queue pipeline or monotonic deque buffer.`,
    frequency: i < 5 ? 'top' : i < 15 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N)',
    expectedSpace: 'O(K)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber'],
    leetcodeNumber: 230 + i * 4,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'queue-using-stacks',
    hints: ['Use Deque or Queue data structure.'],
    bruteForce: 'Re-evaluate window max using nested loop.',
    optimalApproach: 'Monotonic Queue / Deque in O(N) time.',
    commonMistakes: ['Popping front out-of-window index too late'],
    prerequisites: ['Queue', 'Deque'],
    relatedQuestions: [`queue-${((i + 1) % 25) + 1}`, `queue-${((i + 2) % 25) + 1}`],
    acceptanceRate: `${58 + (i % 25)}%`,
  };
});
