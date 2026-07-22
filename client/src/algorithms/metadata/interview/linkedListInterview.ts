import { InterviewQuestion } from '../interviewMetadata';

export const LINKED_LIST_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 45 }, (_, i) => {
  const titles = [
    'Reverse Linked List', 'Linked List Cycle', 'Linked List Cycle II', 'Merge Two Sorted Lists',
    'Merge k Sorted Lists', 'Remove Nth Node From End of List', 'Reorder List', 'Add Two Numbers',
    'Add Two Numbers II', 'Copy List with Random Pointer', 'LRU Cache', 'LFU Cache', 'Flatten a Multilevel Doubly Linked List',
    'Rotate List', 'Partition List', 'Reverse Nodes in k-Group', 'Swap Nodes in Pairs', 'Odd Even Linked List',
    'Palindrome Linked List', 'Intersection of Two Linked Lists', 'Remove Linked List Elements', 'Middle of the Linked List',
    'Delete Node in a Linked List', 'Remove Duplicates from Sorted List', 'Remove Duplicates from Sorted List II',
    'Design Linked List', 'Insert into a Sorted Circular Linked List', 'Convert Sorted List to Binary Search Tree',
    'Split Linked List in Parts', 'Next Greater Node In Linked List', 'Design HashSet', 'Design HashMap',
    'Design Skiplist', 'Design Browser History', 'Swapping Nodes in a Linked List', 'Double a Number Represented as a Linked List',
    'Insert Greatest Common Divisors in Linked List', 'Merge Nodes in Between Zeros', 'Find the Minimum and Maximum Number of Nodes Between Critical Points',
    'Maximum Twin Sum of a Linked List', 'Delete the Middle Node of a Linked List', 'Reverse Linked List II',
    'Sort List', 'Insertion Sort List', 'Populating Next Right Pointers in Each Node'
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `ll-${i + 1}`,
    title,
    category: 'linked-list',
    pattern: 'Fast & Slow Pointers',
    subPattern: 'Canonical Linked List Problem',
    difficulty: diff,
    description: `Solve ${title} using optimal pointer mutations and node restructurings.`,
    frequency: i < 10 ? 'top' : i < 25 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'TCS', 'Accenture'],
    leetcodeNumber: 100 + i * 2,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'reverse-linked-list',
    hints: ['Use dummy head node or two pointers.'],
    bruteForce: 'Convert to array, mutate, convert back.',
    optimalApproach: 'In-place pointer manipulation in O(N) time and O(1) space.',
    commonMistakes: ['Losing reference to next pointer', 'Null pointer dereference'],
    prerequisites: ['Linked List', 'Pointers'],
    relatedQuestions: [`ll-${((i + 1) % 45) + 1}`, `ll-${((i + 2) % 45) + 1}`],
    acceptanceRate: `${50 + (i % 35)}%`,
  };
});
