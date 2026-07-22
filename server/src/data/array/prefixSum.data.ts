import { ArrayAlgorithmData } from '../array.types';

export const PREFIX_SUM_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'prefix-sum',
    title: 'Prefix Sum',
    topicGroup: 'Prefix Sum',
    difficulty: 'easy',
    description: 'Precompute cumulative running sum array to answer range sum queries in O(1) time.',
    theory: 'Prefix sum array P is defined as P[i] = P[i-1] + arr[i]. Sum of subarray from L to R is P[R] - P[L-1].',
    javaCode: `public class PrefixSum {
    public static int[] buildPrefixSum(int[] arr) {
        int n = arr.length;
        int[] prefix = new int[n];
        if (n == 0) return prefix;
        prefix[0] = arr[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + arr[i];
        }
        return prefix;
    }
}`,
    cppCode: `vector<int> buildPrefixSum(const vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return {};
    vector<int> prefix(n);
    prefix[0] = arr[0];
    for (int i = 1; i < n; ++i) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    return prefix;
}`,
    pseudoCode: `FUNCTION buildPrefixSum(arr):
    n = length(arr)
    CREATE prefix of size n
    prefix[0] = arr[0]
    FOR i FROM 1 TO n - 1:
        prefix[i] = prefix[i - 1] + arr[i]
    END FOR
    RETURN prefix
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    applications: ['Constant time range sum queries', '2D image integral images'],
    interviewTips: ['1-indexed prefix sum array P[i] = P[i-1] + arr[i-1] avoids boundary check for L=0'],
    sampleInput: [1, 2, 3, 4, 5],
    sampleOutput: '[1, 3, 6, 10, 15]',
    quizzes: [
      { question: 'Time complexity to construct Prefix Sum array of size N?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Single pass accumulating previous sum takes linear time.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity to query sum of range [L, R] using precomputed Prefix Sum array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(R - L)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Calculated instantly via P[R] - P[L-1].', difficulty: 'easy', points: 10 },
      { question: 'What is formula for sum of range [L, R] (0-indexed) with 1-based prefix array P?', type: 'mcq', options: ['P[R + 1] - P[L]', 'P[R] - P[L]', 'P[R] + P[L]', 'P[R] * P[L]'], correctAnswer: 'P[R + 1] - P[L]', explanation: '1-based prefix sum handles L=0 cleanly without negative indexing.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of storing Prefix Sum array?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Allocates array of size N for cumulative sums.', difficulty: 'medium', points: 15 },
      { question: 'If original array undergoes frequent element updates, is static Prefix Sum optimal?', type: 'mcq', options: ['No, updating prefix array takes O(N); Segment Tree / Fenwick Tree (O(log N)) is better', 'Yes', 'Always', 'Only for positive numbers'], correctAnswer: 'No, updating prefix array takes O(N); Segment Tree / Fenwick Tree (O(log N)) is better', explanation: 'Static prefix sums are costly O(N) to update on point modifications.', difficulty: 'medium', points: 15 },
      { question: 'Prefix Sum value at index i represents sum of elements from index 0 to?', type: 'mcq', options: ['i', 'i - 1', 'N - 1', 'i + 1'], correctAnswer: 'i', explanation: 'P[i] contains cumulative sum of arr[0...i].', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Running Sum of 1d Array (LeetCode 1480)', description: 'Calculate prefix sum array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] runningSum(int[] nums) {\n    return nums;\n  }\n}', cpp: 'vector<int> runningSum(vector<int>& nums) {\n  return nums;\n}' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '[1,3,6,10]' }], solution: 'In-place cumulative sum loop.', externalLink: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
      { title: 'Subarray Sum Equals K (LeetCode 560)', description: 'Count total contiguous subarrays whose sum equals K.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int subarraySum(int[] nums, int k) {\n    return 0;\n  }\n}', cpp: 'int subarraySum(vector<int>& nums, int k) {\n  return 0;\n}' }, testCases: [{ input: '[1,1,1], k=2', expectedOutput: '2' }], solution: 'Prefix sum hash map tracking running counts.', externalLink: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
      { title: 'Continuous Subarray Sum (LeetCode 523)', description: 'Check if array has contiguous subarray of size >= 2 summing to multiple of k.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    return false;\n  }\n}', cpp: 'bool checkSubarraySum(vector<int>& nums, int k) {\n  return false;\n}' }, testCases: [{ input: '[23,2,4,6,7], k=6', expectedOutput: 'true' }], solution: 'Prefix sum remainder modulo k stored in HashMap.', externalLink: 'https://leetcode.com/problems/continuous-subarray-sum/' },
    ],
  },
  {
    slug: 'range-sum-query',
    title: 'Range Sum Query',
    topicGroup: 'Prefix Sum',
    difficulty: 'easy',
    description: 'Answer multiple range sum queries [L, R] on an immutable array efficiently.',
    theory: 'Constructor precomputes 1-indexed prefix sum array P in O(N) time. Each sumRange(left, right) call returns P[right + 1] - P[left] in O(1) time.',
    javaCode: `public class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
    cppCode: `class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (size_t i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
    pseudoCode: `CLASS NumArray:
    FUNCTION constructor(nums):
        prefix = array size length(nums) + 1
        FOR i FROM 0 TO length(nums) - 1:
            prefix[i + 1] = prefix[i] + nums[i]
        END FOR
    
    FUNCTION sumRange(left, right):
        RETURN prefix[right + 1] - prefix[left]
END CLASS`,
    timeComplexity: 'O(1) query time, O(N) precomputation',
    spaceComplexity: 'O(N)',
    applications: ['Financial period sales analysis', 'Game leaderboard score filtering'],
    interviewTips: ['1-indexed prefix array avoids boundary check logic for left == 0'],
    sampleInput: 'nums=[-2, 0, 3, -5, 2, -1], sumRange(0, 2)',
    sampleOutput: '1',
    quizzes: [
      { question: 'Time complexity per query of sumRange(left, right)?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(R - L)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Prefix sum difference lookup executes in constant O(1) time.', difficulty: 'easy', points: 10 },
      { question: 'Constructor precomputation time complexity?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(N log N)'], correctAnswer: 'O(N)', explanation: 'Populating prefix sum array takes single linear pass.', difficulty: 'easy', points: 10 },
      { question: 'Value of sumRange(0, N-1) on array nums?', type: 'mcq', options: ['Total sum of all elements', '0', 'First element', 'Last element'], correctAnswer: 'Total sum of all elements', explanation: 'Querying from index 0 to N-1 sums whole array.', difficulty: 'easy', points: 10 },
      { question: 'Total time to execute Q range sum queries after O(N) setup?', type: 'mcq', options: ['O(N + Q)', 'O(N * Q)', 'O(Q log N)', 'O(N²)'], correctAnswer: 'O(N + Q)', explanation: 'O(N) initial setup + Q * O(1) queries = O(N + Q).', difficulty: 'medium', points: 15 },
      { question: 'If naive summation without precomputation were used for Q queries, total time is?', type: 'mcq', options: ['O(Q * N)', 'O(N + Q)', 'O(N)', 'O(Q)'], correctAnswer: 'O(Q * N)', explanation: 'Naive loop over average N/2 elements per query takes O(Q * N).', difficulty: 'medium', points: 15 },
      { question: 'How to extend range sum queries to 2D matrix?', type: 'mcq', options: ['2D Prefix Sum matrix P[r][c] = P[r-1][c] + P[r][c-1] - P[r-1][c-1] + val', '3D matrix', 'Vector of vectors', 'Not possible'], correctAnswer: '2D Prefix Sum matrix P[r][c] = P[r-1][c] + P[r][c-1] - P[r-1][c-1] + val', explanation: '2D Inclusion-Exclusion principle gives O(1) submatrix sum queries.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Range Sum Query - Immutable (LeetCode 303)', description: 'Design data structure for range sum queries.', difficulty: 'easy', starterCode: { java: 'class NumArray {\n  public NumArray(int[] nums) {}\n  public int sumRange(int left, int right) { return 0; }\n}', cpp: 'class NumArray {\npublic:\n  NumArray(vector<int>& nums) {}\n  int sumRange(int left, int right) { return 0; }\n};' }, testCases: [{ input: 'nums=[-2,0,3,-5,2,-1], sumRange(0,2)', expectedOutput: '1' }], solution: 'Store 1-indexed prefix sum array.', externalLink: 'https://leetcode.com/problems/range-sum-query-immutable/' },
      { title: 'Range Sum Query 2D - Immutable (LeetCode 304)', description: 'Compute sum of submatrix elements.', difficulty: 'medium', starterCode: { java: 'class NumMatrix {\n  public NumMatrix(int[][] matrix) {}\n  public int sumRegion(int r1, int c1, int r2, int c2) { return 0; }\n}', cpp: 'class NumMatrix {\npublic:\n  NumMatrix(vector<vector<int>>& matrix) {}\n  int sumRegion(int r1, int c1, int r2, int c2) { return 0; }\n};' }, testCases: [{ input: 'sumRegion(2,1,4,3)', expectedOutput: '8' }], solution: '2D prefix sum inclusion-exclusion formula.', externalLink: 'https://leetcode.com/problems/range-sum-query-2d-immutable/' },
      { title: 'Range Sum Query - Mutable (LeetCode 307)', description: 'Support point updates and range sum queries in O(log N) time.', difficulty: 'hard', starterCode: { java: 'class NumArray {\n  public NumArray(int[] nums) {}\n  public void update(int index, int val) {}\n  public int sumRange(int left, int right) { return 0; }\n}', cpp: 'class NumArray {\npublic:\n  NumArray(vector<int>& nums) {}\n  void update(int index, int val) {}\n  int sumRange(int left, int right) { return 0; }\n};' }, testCases: [{ input: 'update(1,2), sumRange(0,2)', expectedOutput: '9' }], solution: 'Fenwick Tree (Binary Indexed Tree) or Segment Tree.', externalLink: 'https://leetcode.com/problems/range-sum-query-mutable/' },
    ],
  },
  {
    slug: 'difference-array',
    title: 'Difference Array',
    topicGroup: 'Prefix Sum',
    difficulty: 'medium',
    description: 'Perform range update operations [L, R, val] in O(1) time using difference array.',
    theory: 'Difference array D is defined as D[i] = A[i] - A[i-1]. To add val to range [L, R], increment D[L] += val and decrement D[R+1] -= val. Prefix sum of D yields updated array.',
    javaCode: `public class DifferenceArray {
    public static int[] applyRangeUpdates(int n, int[][] updates) {
        int[] diff = new int[n + 1];
        for (int[] update : updates) {
            int l = update[0], r = update[1], val = update[2];
            diff[l] += val;
            if (r + 1 < n) diff[r + 1] -= val;
        }
        int[] result = new int[n];
        result[0] = diff[0];
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] + diff[i];
        }
        return result;
    }
}`,
    cppCode: `vector<int> applyRangeUpdates(int n, const vector<vector<int>>& updates) {
    vector<int> diff(n + 1, 0);
    for (const auto& u : updates) {
        int l = u[0], r = u[1], val = u[2];
        diff[l] += val;
        if (r + 1 < n) diff[r + 1] -= val;
    }
    vector<int> result(n);
    result[0] = diff[0];
    for (int i = 1; i < n; ++i) {
        result[i] = result[i - 1] + diff[i];
    }
    return result;
}`,
    pseudoCode: `FUNCTION applyRangeUpdates(n, updates):
    CREATE diff of size n + 1 initialized to 0
    FOR EACH [l, r, val] IN updates DO:
        diff[l] = diff[l] + val
        diff[r + 1] = diff[r + 1] - val
    END FOR
    CREATE result of size n
    result[0] = diff[0]
    FOR i FROM 1 TO n - 1:
        result[i] = result[i - 1] + diff[i]
    END FOR
    RETURN result
END FUNCTION`,
    timeComplexity: 'O(N + K) where K is number of range updates',
    spaceComplexity: 'O(N)',
    applications: ['Flight book bookings', 'Car pooling seating capacity', 'Batch range increment operations'],
    interviewTips: ['Updating range [L, R] takes O(1) time per update; final prefix sum takes O(N) time'],
    sampleInput: 'n=5, updates=[[1,3,10], [2,4,5]]',
    sampleOutput: '[0, 10, 15, 15, 5]',
    quizzes: [
      { question: 'Time complexity to apply 1 range update [L, R, val] on Difference Array?', type: 'mcq', options: ['O(1)', 'O(R - L)', 'O(N)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Only modifies two boundary entries: D[L] += val and D[R+1] -= val.', difficulty: 'easy', points: 10 },
      { question: 'How to recover actual array values from Difference Array?', type: 'mcq', options: ['Compute Prefix Sum of Difference Array', 'Sort Difference Array', 'Reverse Difference Array', 'Multiply elements'], correctAnswer: 'Compute Prefix Sum of Difference Array', explanation: 'Cumulative prefix sum reconstructs original array values.', difficulty: 'easy', points: 10 },
      { question: 'Why is D[R+1] decremented by val during range update [L, R, val]?', type: 'mcq', options: ['Cancels out added val for all indices > R when prefix sum is computed', 'Keeps sum 0', 'Prevents overflow', 'Decreases size'], correctAnswer: 'Cancels out added val for all indices > R when prefix sum is computed', explanation: 'Ensures increment only applies to indices within window [L, R].', difficulty: 'easy', points: 10 },
      { question: 'Time complexity to process K updates followed by final array reconstruction?', type: 'mcq', options: ['O(N + K)', 'O(N * K)', 'O(K log N)', 'O(N²)'], correctAnswer: 'O(N + K)', explanation: 'K updates take K * O(1) time; reconstruction takes O(N) time.', difficulty: 'medium', points: 15 },
      { question: 'Naive time complexity for K range updates without difference array?', type: 'mcq', options: ['O(K * N)', 'O(N + K)', 'O(N)', 'O(K)'], correctAnswer: 'O(K * N)', explanation: 'Updating every element in range takes up to O(N) per query, total O(K * N).', difficulty: 'medium', points: 15 },
      { question: 'Can Difference Array handle dynamic interleaved point queries between updates?', type: 'mcq', options: ['No, requires all updates first before prefix scan; Segment/Fenwick Tree is needed for interleaved operations', 'Yes', 'Always', 'Only for positive integers'], correctAnswer: 'No, requires all updates first before prefix scan; Segment/Fenwick Tree is needed for interleaved operations', explanation: 'Prefix sum reconstruction is a batch operation done after all updates.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Range Addition (LeetCode 370)', description: 'Apply K range update operations to array initialized to 0.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\n  return {};\n}' }, testCases: [{ input: 'length=5, updates=[[1,3,2],[2,4,3],[0,2,-2]]', expectedOutput: '[-2,0,3,5,3]' }], solution: 'Use Difference Array updates and prefix sum scan.', externalLink: 'https://leetcode.com/problems/range-addition/' },
      { title: 'Corporate Flight Bookings (LeetCode 1109)', description: 'Calculate total reserved seats for flight bookings.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {\n  return {};\n}' }, testCases: [{ input: 'bookings=[[1,2,10],[2,3,20],[2,5,25]], n=5', expectedOutput: '[10,55,45,25,25]' }], solution: '1-indexed Difference Array algorithm.', externalLink: 'https://leetcode.com/problems/corporate-flight-bookings/' },
      { title: 'Car Pooling (LeetCode 1094)', description: 'Check if vehicle capacity is exceeded at any point.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    return false;\n  }\n}', cpp: 'bool carPooling(vector<vector<int>>& trips, int capacity) {\n  return false;\n}' }, testCases: [{ input: 'trips=[[2,1,5],[3,3,7]], capacity=4', expectedOutput: 'false' }], solution: 'Difference array tracking passenger load at each location.', externalLink: 'https://leetcode.com/problems/car-pooling/' },
    ],
  },
];
