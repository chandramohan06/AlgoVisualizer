import { DSAAlgorithmEntry } from './dsa.types';

export const RECURSION_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'recursion-basics',
    title: 'Recursion Fundamentals & Call Stack',
    categorySlug: 'recursion',
    categoryName: 'Recursion',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Understand recursive function self-calls, base cases, and call stack activation frames.',
    theory: 'Recursion breaks a problem into smaller subproblems until hitting a base case. Each call pushes a frame onto execution stack.',
    working: 'Base case returns directly without calling self. Recursive step makes smaller self-call towards base case.',
    javaCode: `public class Solution {
    public int factorial(int n) {
        if (n <= 1) return 1; // Base case
        return n * factorial(n - 1); // Recursive call
    }
}`,
    cppCode: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    pythonCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    pseudoCode: `FUNCTION factorial(n):
    IF n <= 1 THEN RETURN 1
    RETURN n * factorial(n - 1)
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N) call stack depth',
    applications: ['Divide and conquer algorithms', 'Tree/Graph DFS traversals', 'Mathematical sequence evaluation'],
    interviewTips: ['Identify base case first; ensure every recursive step strictly converges toward base case'],
    commonMistakes: ['Missing base case causing infinite recursion stack overflow'],
    leetCodeNumber: 50,
    leetCodeName: 'Pow(x, n)',
    leetCodeDifficulty: 'Medium',
    leetCodePattern: 'Divide & Conquer Recursion',
    leetCodeUrl: 'https://leetcode.com/problems/powx-n/',
    sampleInput: 'n=5',
    sampleOutput: '120',
    quizzes: [
      { question: 'What component is mandatory in every recursive function to prevent infinite loops?', type: 'mcq', options: ['Base Case', 'Loop condition', 'Global variable', 'Try-catch block'], correctAnswer: 'Base Case', explanation: 'Base case defines termination condition returning non-recursive value.', difficulty: 'easy', points: 10 },
      { question: 'What error happens when recursive calls exceed available stack memory?', type: 'mcq', options: ['StackOverflowError', 'OutOfMemoryError', 'NullPointerException', 'IndexOutOfBounds'], correctAnswer: 'StackOverflowError', explanation: 'Exceeding recursion call stack capacity triggers StackOverflowError.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of recursive function with recursion depth D?', type: 'mcq', options: ['O(D)', 'O(1)', 'O(D²)', 'O(2^D)'], correctAnswer: 'O(D)', explanation: 'Call stack allocates D activation frames.', difficulty: 'easy', points: 10 },
      { question: 'What optimization allows compilers to reuse call stack frames in recursion?', type: 'mcq', options: ['Tail Call Optimization (TCO)', 'Memoization', 'Tabulation', 'Loop unrolling'], correctAnswer: 'Tail Call Optimization (TCO)', explanation: 'TCO optimizes tail-recursive calls by reusing active stack frame.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of Binary Search written recursively?', type: 'mcq', options: ['O(log N)', 'O(N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(log N)', explanation: 'Splits search space in half at each step.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of solving Tower of Hanoi for N disks?', type: 'mcq', options: ['O(2^N)', 'O(N²)', 'O(N log N)', 'O(N)'], correctAnswer: 'O(2^N)', explanation: 'T(N) = 2T(N-1) + 1 = 2^N - 1 moves.', difficulty: 'hard', points: 20 },
    ],
  },
];
