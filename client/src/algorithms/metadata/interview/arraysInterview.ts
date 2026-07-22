import { InterviewQuestion } from '../interviewMetadata';

export const ARRAYS_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 70 }, (_, i) => {
  const titles = [
    'Two Sum', 'Best Time to Buy and Sell Stock', 'Contains Duplicate', 'Product of Array Except Self',
    'Maximum Subarray (Kadane)', 'Maximum Product Subarray', 'Find Minimum in Rotated Sorted Array',
    'Search in Rotated Sorted Array', '3Sum', 'Container With Most Water', 'Trapping Rain Water',
    'Insert Interval', 'Merge Intervals', 'Non-overlapping Intervals', 'Meeting Rooms', 'Meeting Rooms II',
    'Rotate Image', 'Spiral Matrix', 'Set Matrix Zeroes', 'Game of Life', 'Pascal Triangle', 'Reshape Matrix',
    'Squares of a Sorted Array', 'Sort Colors (Dutch National Flag)', 'Majority Element', 'Majority Element II',
    'Find All Numbers Disappeared in Array', 'Find the Duplicate Number', 'First Missing Positive',
    'Subarray Sum Equals K', 'Continuous Subarray Sum', 'Subarray Sums Divisible by K',
    'Shortest Unsorted Continuous Subarray', '3Sum Closest', '4Sum', 'Remove Duplicates from Sorted Array',
    'Remove Duplicates from Sorted Array II', 'Remove Element', 'Move Zeroes', 'Plus One',
    'Third Maximum Number', 'Missing Number', 'Find All Duplicates in an Array', 'Array Nesting',
    'Maximum Difference Between Increasing Elements', 'Partition Array Into Three Parts With Equal Sum',
    'Relative Sort Array', 'Sort Array By Parity', 'Sort Array By Parity II', 'Height Checker',
    'Rank Transform of an Array', 'Maximum Average Subarray I', 'Find Pivot Index', 'Largest Number At Least Twice of Others',
    'Monotonic Array', 'Sort Integers by The Number of 1 Bits', 'Decompress Run-Length Encoded List',
    'Create Target Array in the Given Order', 'Count Items Matching a Rule', 'Check if Sentence Is Pangram',
    'Truncate Sentence', 'Determine Color of a Chessboard Square', 'Count Good Triplets', 'Maximum Population Year',
    'Check if All Characters Have Equal Number of Occurrences', 'Maximum Number of Words Found in Sentences',
    'Build Array from Permutation', 'Concatenation of Array', 'Final Value of Variable After Performing Operations',
    'Shuffle the Array'
  ];

  const patterns = [
    'Two Pointer & Hashing', 'Kadane & Subarray', 'Basic Traversal & Searching', 'Prefix & Suffix Product',
    'Kadane & Subarray', 'Dynamic Programming Subarray', 'Binary Search', 'Binary Search',
    'Two Pointer Technique', 'Two Pointer Technique', 'Two Pointer Technique', 'Intervals', 'Intervals',
    'Intervals', 'Intervals', 'Intervals', 'Matrix Operations', 'Matrix Operations', 'Matrix Operations',
    'Matrix Operations', 'Basic Traversal & Searching', 'Matrix Operations', 'Two Pointer Technique',
    'Dutch National Flag', 'Boyer-Moore Voting', 'Boyer-Moore Voting', 'Index Hash Mapping',
    'Floyd Cycle Finding', 'Index Hash Mapping', 'Prefix Sum & Hashing', 'Prefix Sum & Hashing',
    'Prefix Sum & Hashing', 'Two Pointer Technique', 'Two Pointer Technique', 'Two Pointer Technique',
    'Two Pointer Technique', 'Two Pointer Technique', 'Two Pointer Technique', 'Two Pointer Technique',
    'Basic Traversal & Searching', 'Basic Traversal & Searching', 'Math & Bitwise', 'Index Hash Mapping',
    'Cycle Finding', 'Basic Traversal & Searching', 'Prefix Sum', 'Counting Sort', 'Two Pointer Technique',
    'Two Pointer Technique', 'Counting Sort', 'Sorting & Hashing', 'Sliding Window', 'Prefix Sum',
    'Basic Traversal & Searching', 'Two Pointer Technique', 'Bit Manipulation', 'Basic Traversal & Searching',
    'Basic Traversal & Searching', 'Basic Traversal & Searching', 'Basic Traversal & Searching',
    'Basic Traversal & Searching', 'Basic Traversal & Searching', 'Basic Traversal & Searching',
    'Prefix Sum', 'Frequency Count', 'Basic Traversal & Searching', 'Basic Traversal & Searching',
    'Basic Traversal & Searching', 'Basic Traversal & Searching', 'Basic Traversal & Searching'
  ];

  const companiesList = [
    ['Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys'],
    ['Amazon', 'Microsoft', 'Adobe', 'Capgemini'],
    ['Amazon', 'Adobe', 'Cognizant'],
    ['Google', 'Microsoft', 'Uber'],
    ['Google', 'Amazon', 'Microsoft', 'TCS', 'Goldman Sachs'],
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `arr-${i + 1}`,
    title,
    category: 'array',
    pattern: patterns[i % patterns.length],
    subPattern: 'Canonical Array Problem',
    difficulty: diff,
    description: `Efficiently solve ${title} using optimal array pattern and complexity bounds.`,
    frequency: i < 15 ? 'top' : i < 40 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: diff === 'easy' ? 'O(N)' : diff === 'medium' ? 'O(N log N)' : 'O(N^2)',
    expectedSpace: diff === 'easy' ? 'O(1)' : 'O(N)',
    companies: companiesList[i % companiesList.length],
    leetcodeNumber: 1 + i * 3,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Identify if array is sorted.', 'Consider two pointer or sliding window approach.'],
    bruteForce: 'Check all pairs or subarrays using nested loops.',
    optimalApproach: 'Use two pointers or hashing to reduce time complexity to linear time.',
    commonMistakes: ['Off-by-one boundary checks', 'Out of bounds array access'],
    prerequisites: ['Arrays', 'Two Pointers'],
    relatedQuestions: [`arr-${((i + 1) % 70) + 1}`, `arr-${((i + 2) % 70) + 1}`],
    acceptanceRate: `${50 + (i % 35)}%`,
  };
});
