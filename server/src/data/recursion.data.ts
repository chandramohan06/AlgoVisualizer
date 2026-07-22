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
    practiceProblems: [
      { title: 'Pow(x, n) (LeetCode 50)', description: 'Calculate x raised to power n recursively in O(log n) time.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public double myPow(double x, int n) {\n    return 0.0;\n  }\n}', cpp: 'double myPow(double x, int n) {\n  return 0.0;\n}', python: 'def myPow(x, n):\n    return 0.0' }, testCases: [{ input: 'x=2.0, n=10', expectedOutput: '1024.0' }], explanation: 'Divide and conquer fast exponentiation x^(n/2) * x^(n/2).', externalLink: 'https://leetcode.com/problems/powx-n/' },
      { title: 'Subsets (LeetCode 78)', description: 'Generate all power set subsets recursively.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<vector<int>> subsets(vector<int>& nums) {\n  return {};\n}', python: 'def subsets(nums):\n    return []' }, testCases: [{ input: '[1,2,3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }], explanation: 'Include/exclude recursive decisions.', externalLink: 'https://leetcode.com/problems/subsets/' },
      { title: 'Tower of Hanoi', description: 'Print move steps to transfer N disks from peg A to C using auxiliary B.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public void hanoi(int n, char from, char to, char aux) {}\n}', cpp: 'void hanoi(int n, char from, char to, char aux) {}', python: 'def hanoi(n, from_peg, to_peg, aux_peg):\n    pass' }, testCases: [{ input: 'n=3', expectedOutput: '7 moves' }], solution: 'Recursive hanoi(n-1, A, B, C), move disk n, hanoi(n-1, B, C, A).', externalLink: 'https://leetcode.com/' },
    ],
  },
];
