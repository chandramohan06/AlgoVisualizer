import { DSAAlgorithmEntry } from './dsa.types';

export const DYNAMICPROGRAMMING_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs & Fibonacci DP',
    categorySlug: 'dynamic-programming',
    categoryName: 'Dynamic Programming',
    topicGroup: '1D DP',
    difficulty: 'easy',
    description: 'Find number of distinct ways to climb N stairs taking 1 or 2 steps using memoization/tabulation.',
    theory: 'Optimal Substructure: dp[i] = dp[i-1] + dp[i-2]. Overlapping Subproblems allow caching previously computed states in O(N) time & O(1) space.',
    working: 'Initialize prev2=1, prev1=1. Loop i from 2 to N: curr = prev1 + prev2, prev2 = prev1, prev1 = curr. Return prev1.',
    javaCode: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        int prev2 = 1, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
    cppCode: `int climbStairs(int n) {
    if (n <= 1) return 1;
    int prev2 = 1, prev1 = 1;
    for (int i = 2; i <= n; ++i) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    pythonCode: `def climbStairs(n):
    if n <= 1:
        return 1
    prev2, prev1 = 1, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
    pseudoCode: `FUNCTION climbStairs(n):
    IF n <= 1 THEN RETURN 1
    prev2 = 1, prev1 = 1
    FOR i FROM 2 TO n DO:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    END FOR
    RETURN prev1
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) space optimized',
    applications: ['Combinatorial counting', 'Financial step growth', 'Grid path counts'],
    interviewTips: ['Top-down recursion + memoization vs Bottom-up tabulation; space optimize O(N) array down to 2 variables O(1)'],
    commonMistakes: ['Integer overflow for large n; use 64-bit int or modulo if requested'],
    leetCodeNumber: 70,
    leetCodeName: 'Climbing Stairs',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: '1D Dynamic Programming',
    leetCodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    sampleInput: 'n=5',
    sampleOutput: '8 ways',
    quizzes: [
      { question: 'What two properties define problems solvable by Dynamic Programming?', type: 'mcq', options: ['Optimal Substructure and Overlapping Subproblems', 'Greedy Choice and Sorting', 'LIFO and FIFO', 'Divide and conquer only'], correctAnswer: 'Optimal Substructure and Overlapping Subproblems', explanation: 'DP caches overlapping subproblems while building global optimum from optimal sub-solutions.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of memoized Fibonacci / Climbing Stairs?', type: 'mcq', options: ['O(N)', 'O(2^N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Computes each state from 1 to N exactly once.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of naive unmemoized recursive Fibonacci?', type: 'mcq', options: ['O(2^N)', 'O(N)', 'O(N²)', 'O(N log N)'], correctAnswer: 'O(2^N)', explanation: 'Binary recursion tree doubles calls at every level yielding O(2^N).', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of space-optimized Climbing Stairs using 2 variables?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Only tracks previous 2 state values.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of 0/1 Knapsack DP with N items and Capacity W?', type: 'mcq', options: ['O(N * W)', 'O(N + W)', 'O(2^N)', 'O(N log N)'], correctAnswer: 'O(N * W)', explanation: 'Fills DP table of dimensions (N+1) x (W+1).', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of Longest Common Subsequence (LCS) for strings of length M and N?', type: 'mcq', options: ['O(M * N)', 'O(M + N)', 'O(2^(M+N))', 'O(1)'], correctAnswer: 'O(M * N)', explanation: 'Fills DP table of size M x N in O(M*N) operations.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Climbing Stairs (LeetCode 70)', description: 'Find ways to reach top of N stairs taking 1 or 2 steps.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int climbStairs(int n) {\n    return 0;\n  }\n}', cpp: 'int climbStairs(int n) {\n  return 0;\n}', python: 'def climbStairs(n):\n    return 0' }, testCases: [{ input: 'n=3', expectedOutput: '3' }], explanation: 'Fibonacci state transition dp[i] = dp[i-1] + dp[i-2].', externalLink: 'https://leetcode.com/problems/climbing-stairs/' },
      { title: 'Coin Change (LeetCode 322)', description: 'Find fewest coins needed to make up amount.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int coinChange(int[] coins, int amount) {\n    return -1;\n  }\n}', cpp: 'int coinChange(vector<int>& coins, int amount) {\n  return -1;\n}', python: 'def coinChange(coins, amount):\n    return -1' }, testCases: [{ input: 'coins=[1,2,5], amount=11', expectedOutput: '3' }], explanation: 'Unbounded knapsack DP transition dp[amt] = min(dp[amt], 1 + dp[amt - coin]).', externalLink: 'https://leetcode.com/problems/coin-change/' },
      { title: 'Longest Common Subsequence (LeetCode 1143)', description: 'Find length of longest common subsequence of two strings.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    return 0;\n  }\n}', cpp: 'int longestCommonSubsequence(string text1, string text2) {\n  return 0;\n}', python: 'def longestCommonSubsequence(text1, text2):\n    return 0' }, testCases: [{ input: 'text1="abcde", text2="ace"', expectedOutput: '3' }], solution: '2D DP table matching characters or taking max of sub-problems.', externalLink: 'https://leetcode.com/problems/longest-common-subsequence/' },
    ],
  },
];
