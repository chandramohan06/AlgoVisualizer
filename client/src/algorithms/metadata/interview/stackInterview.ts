import { InterviewQuestion } from '../interviewMetadata';

export const STACK_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 35 }, (_, i) => {
  const titles = [
    'Valid Parentheses', 'Min Stack', 'Evaluate Reverse Polish Notation', 'Generate Parentheses',
    'Daily Temperatures', 'Car Fleet', 'Largest Rectangle in Histogram', 'Monotonic Stack Basics',
    'Next Greater Element I', 'Next Greater Element II', 'Next Greater Element III', 'Online Stock Span',
    'Asteroid Collision', 'Decode String', 'Remove K Digits', 'Basic Calculator', 'Basic Calculator II',
    'Basic Calculator III', 'Simplify Path', 'Trapping Rain Water', 'Sum of Subarray Minimums',
    'Sum of Subarray Ranges', 'Maximum Frequency Stack', 'Remove All Adjacent Duplicates in String II',
    'Score of Parentheses', 'Minimum Remove to Make Valid Parentheses', 'Build an Array With Stack Operations',
    'Make The String Great', 'Crawler Log Folder', 'Maximum Nesting Depth of the Parentheses',
    'Number of Students Unable to Eat Lunch', 'Final Prices With a Special Discount in a Shop',
    'Minimum Add to Make Parentheses Valid', 'Valid Parenthesis String', 'Remove Duplicate Letters'
  ];

  const title = titles[i % titles.length];
  const diff: 'easy' | 'medium' | 'hard' = i % 8 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `stack-${i + 1}`,
    title,
    category: 'stack',
    pattern: 'Monotonic Stack',
    subPattern: 'Canonical Stack Problem',
    difficulty: diff,
    description: `Solve ${title} using LIFO properties or monotonic stack evaluation.`,
    frequency: i < 8 ? 'top' : i < 20 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N)',
    expectedSpace: 'O(N)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'TCS'],
    leetcodeNumber: 200 + i * 3,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'valid-parentheses',
    hints: ['Push items onto stack and pop upon condition check.'],
    bruteForce: 'Nested loop checking all rightward elements.',
    optimalApproach: 'Monotonic Stack in O(N) time.',
    commonMistakes: ['Stack underflow popping empty stack'],
    prerequisites: ['Stack', 'Monotonic Stack'],
    relatedQuestions: [`stack-${((i + 1) % 35) + 1}`, `stack-${((i + 2) % 35) + 1}`],
    acceptanceRate: `${52 + (i % 30)}%`,
  };
});
