import { ArrayAlgorithmData } from '../array.types';

export const KADANE_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    topicGroup: 'Kadane',
    difficulty: 'medium',
    description: 'Find contiguous subarray with largest sum using Kadane\'s Algorithm.',
    theory: 'Kadane\'s algorithm maintains `currentSum = max(arr[i], currentSum + arr[i])` and `maxSum = max(maxSum, currentSum)`. If currentSum drops below 0, it resets by starting fresh at arr[i].',
    javaCode: `public class MaximumSubarray {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
    cppCode: `int maxSubArray(const vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}`,
    pseudoCode: `FUNCTION maxSubArray(nums):
    maxSum = nums[0]
    currentSum = nums[0]
    FOR i FROM 1 TO length(nums) - 1:
        currentSum = MAX(nums[i], currentSum + nums[i])
        maxSum = MAX(maxSum, currentSum)
    END FOR
    RETURN maxSum
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Stock market profit analysis', 'Genomics DNA sequence alignment'],
    interviewTips: ['Be ready to print start and end indices of maximum subarray'],
    sampleInput: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    sampleOutput: '6 (subarray [4, -1, 2, 1])',
    quizzes: [
      { question: 'Time complexity of Kadane\'s Algorithm?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single pass over array computes maximum subarray sum.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of Kadane\'s Algorithm?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses scalar variables for currentSum and maxSum.', difficulty: 'easy', points: 10 },
      { question: 'What is maximum subarray sum for array [-5, -2, -8, -1]?', type: 'mcq', options: ['-1', '0', '-16', '-5'], correctAnswer: '-1', explanation: 'Max single element when all elements are negative is -1.', difficulty: 'easy', points: 10 },
      { question: 'Dynamic Programming state definition for Kadane\'s Algorithm?', type: 'mcq', options: ['dp[i] = max(nums[i], dp[i-1] + nums[i])', 'dp[i] = dp[i-1]', 'dp[i] = sum(0..i)', 'dp[i] = nums[i] * i'], correctAnswer: 'dp[i] = max(nums[i], dp[i-1] + nums[i])', explanation: 'dp[i] represents max subarray sum ending at index i.', difficulty: 'medium', points: 15 },
      { question: 'Brute force time complexity to check all subarray sums?', type: 'mcq', options: ['O(N²)', 'O(N³)', 'O(N log N)', 'O(2^N)'], correctAnswer: 'O(N²)', explanation: 'Checking all N(N+1)/2 pairs takes O(N²) time.', difficulty: 'medium', points: 15 },
      { question: 'How to track start and end indices of maximum subarray?', type: 'mcq', options: ['Update start index whenever currentSum resets to nums[i], update end index when maxSum increases', 'Sort array', 'Use stack', 'Not possible'], correctAnswer: 'Update start index whenever currentSum resets to nums[i], update end index when maxSum increases', explanation: 'Tracking reset boundaries identifies exact subarray range.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Maximum Subarray (LeetCode 53)', description: 'Find contiguous subarray with largest sum.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int maxSubArray(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int maxSubArray(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' }], solution: 'Kadane\'s algorithm.', externalLink: 'https://leetcode.com/problems/maximum-subarray/' },
      { title: 'Maximum Product Subarray (LeetCode 152)', description: 'Find contiguous subarray with largest product.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int maxProduct(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int maxProduct(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[2,3,-2,4]', expectedOutput: '6' }], solution: 'Track both maxProduct and minProduct due to negative sign flips.', externalLink: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { title: 'K-Concatenation Maximum Sum (LeetCode 1191)', description: 'Find max subarray sum of array concatenated K times.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int kConcatenationMaxSum(int[] arr, int k) {\n    return 0;\n  }\n}', cpp: 'int kConcatenationMaxSum(vector<int>& arr, int k) {\n  return 0;\n}' }, testCases: [{ input: 'arr=[1,2], k=3', expectedOutput: '9' }], solution: 'Kadane on 2 copies combined with total sum * (k - 2).', externalLink: 'https://leetcode.com/problems/k-concatenation-maximum-sum/' },
    ],
  },
  {
    slug: 'maximum-circular-subarray',
    title: 'Maximum Circular Subarray',
    topicGroup: 'Kadane',
    difficulty: 'medium',
    description: 'Find max subarray sum in a circular array where end wraps around to start.',
    theory: 'Max circular subarray sum is max of non-wrapping max (standard Kadane) and wrapping max (TotalSum - MinSubarraySum). If all elements are negative, return standard Kadane max.',
    javaCode: `public class MaxCircularSubarray {
    public static int maxSubarraySumCircular(int[] nums) {
        int totalSum = 0;
        int maxKadane = nums[0], currentMax = 0;
        int minKadane = nums[0], currentMin = 0;
        for (int x : nums) {
            totalSum += x;
            currentMax = Math.max(x, currentMax + x);
            maxKadane = Math.max(maxKadane, currentMax);
            currentMin = Math.min(x, currentMin + x);
            minKadane = Math.min(minKadane, currentMin);
        }
        if (maxKadane < 0) return maxKadane;
        return Math.max(maxKadane, totalSum - minKadane);
    }
}`,
    cppCode: `int maxSubarraySumCircular(vector<int>& nums) {
    int totalSum = 0;
    int maxKadane = nums[0], currentMax = 0;
    int minKadane = nums[0], currentMin = 0;
    for (int x : nums) {
        totalSum += x;
        currentMax = max(x, currentMax + x);
        maxKadane = max(maxKadane, currentMax);
        currentMin = min(x, currentMin + x);
        minKadane = min(minKadane, currentMin);
    }
    if (maxKadane < 0) return maxKadane;
    return max(maxKadane, totalSum - minKadane);
}`,
    pseudoCode: `FUNCTION maxSubarraySumCircular(nums):
    totalSum = 0
    maxKadane = nums[0], currentMax = 0
    minKadane = nums[0], currentMin = 0
    FOR EACH x IN nums DO:
        totalSum = totalSum + x
        currentMax = MAX(x, currentMax + x)
        maxKadane = MAX(maxKadane, currentMax)
        currentMin = MIN(x, currentMin + x)
        minKadane = MIN(minKadane, currentMin)
    END FOR
    IF maxKadane < 0 THEN RETURN maxKadane
    RETURN MAX(maxKadane, totalSum - minKadane)
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Circular buffer load balancing', 'Ring network throughput optimization'],
    interviewTips: ['Corner case: when all numbers are negative, totalSum - minKadane equals 0 (empty subarray), so return maxKadane'],
    sampleInput: [5, -3, 5],
    sampleOutput: '10 (circular subarray [5, 5])',
    quizzes: [
      { question: 'Time complexity of Maximum Circular Subarray using dual Kadane algorithm?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Computes max and min Kadane in single pass of N elements.', difficulty: 'easy', points: 10 },
      { question: 'Formula for wrapping max subarray sum using total sum and min subarray sum?', type: 'mcq', options: ['totalSum - minKadane', 'totalSum + minKadane', 'maxKadane - minKadane', 'totalSum * 2'], correctAnswer: 'totalSum - minKadane', explanation: 'Removing minimum subarray from total array leaves maximum circular subarray.', difficulty: 'easy', points: 10 },
      { question: 'What is returned when all numbers in array are negative?', type: 'mcq', options: ['maxKadane', 'totalSum - minKadane', '0', 'Integer.MIN_VALUE'], correctAnswer: 'maxKadane', explanation: 'When all numbers are negative, maxKadane is largest negative number.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of Maximum Circular Subarray algorithm?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Allocates only constant scalar tracking variables.', difficulty: 'medium', points: 15 },
      { question: 'How many contiguous elements can a circular subarray contain?', type: 'mcq', options: ['Between 1 and N elements', 'Between 1 and 2N elements', 'Exactly N elements', 'Unbounded'], correctAnswer: 'Between 1 and N elements', explanation: 'A valid subarray cannot reuse elements more than once.', difficulty: 'medium', points: 15 },
      { question: 'Sample input [1, -2, 3, -2] max circular subarray sum?', type: 'mcq', options: ['3', '4', '2', '0'], correctAnswer: '3', explanation: 'Max non-wrapping subarray is [3] with sum 3; totalSum - minKadane = 0 - (-2) = 2. Max is 3.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Maximum Sum Circular Subarray (LeetCode 918)', description: 'Find maximum circular subarray sum.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int maxSubarraySumCircular(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int maxSubarraySumCircular(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[5,-3,5]', expectedOutput: '10' }], solution: 'Dual Kadane for max and min subarray sum.', externalLink: 'https://leetcode.com/problems/maximum-sum-circular-subarray/' },
      { title: 'Maximum Subarray Sum with One Deletion (LeetCode 1186)', description: 'Find max subarray sum with at most 1 element deletion.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int maximumSum(int[] arr) {\n    return 0;\n  }\n}', cpp: 'int maximumSum(vector<int>& arr) {\n  return 0;\n}' }, testCases: [{ input: '[1,-2,0,3]', expectedOutput: '4' }], solution: 'Two DP arrays tracking max sum ending at i without and with deletion.', externalLink: 'https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/' },
      { title: 'House Robber II (LeetCode 213)', description: 'Rob houses in circular street arrangement.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int rob(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int rob(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[2,3,2]', expectedOutput: '3' }], solution: 'Run DP on ranges [0, N-2] and [1, N-1].', externalLink: 'https://leetcode.com/problems/house-robber-ii/' },
    ],
  },
];
