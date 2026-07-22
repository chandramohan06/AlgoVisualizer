import { InterviewQuestion } from '../interviewMetadata';

export const HEAP_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 25 }, (_, i) => {
  const titles = [
    'Kth Largest Element in an Array', 'Top K Frequent Elements', 'Find Median from Data Stream',
    'Merge k Sorted Lists', 'Kth Smallest Element in a Sorted Matrix', 'Task Scheduler',
    'K Closest Points to Origin', 'Reorganize String', 'Sort Characters By Frequency',
    'Ugly Number II', 'Super Ugly Number', 'Find K Pairs with Smallest Sums',
    'Smallest Range Covering Elements from K Lists', 'Sliding Window Median', 'IPo',
    'Single-Threaded CPU', 'Minimum Cost to Connect Sticks', 'Seat Reservation Manager',
    'Process Tasks Using Servers', 'Find the Kth Smallest Sum of a Matrix With Sorted Rows',
    'Maximum Performance of a Team', 'Construct Target Array With Multiple Sums', 'Kth Largest Element in a Stream',
    'Last Stone Weight', 'Relative Ranks'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `heap-${i + 1}`,
    title,
    category: 'heap',
    pattern: 'Min/Max Heap Basics',
    subPattern: 'Priority Queue Scheduling',
    difficulty: diff,
    description: `Solve ${title} using Min/Max Heap priority queue ordering.`,
    frequency: i < 5 ? 'top' : i < 15 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N log K)',
    expectedSpace: 'O(K)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber', 'Atlassian'],
    leetcodeNumber: 215 + i * 5,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Use Min-Heap of size K for Kth largest element.'],
    bruteForce: 'Sort full array in O(N log N).',
    optimalApproach: 'Priority Queue / Min-Heap in O(N log K) time.',
    commonMistakes: ['Inverting min vs max heap comparator logic'],
    prerequisites: ['Heap', 'Priority Queue'],
    relatedQuestions: [`heap-${((i + 1) % 25) + 1}`, `heap-${((i + 2) % 25) + 1}`],
    acceptanceRate: `${56 + (i % 30)}%`,
  };
});
