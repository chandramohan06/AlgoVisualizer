import { ArrayAlgorithmData } from '../array.types';

export const TWO_POINTER_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    topicGroup: 'Two Pointer',
    difficulty: 'easy',
    description: 'Find two indices in array such that their values sum up to a target number.',
    theory: 'In a sorted array, Two Pointers (left at start 0, right at end N-1) move inward based on comparison of arr[left] + arr[right] with target.',
    javaCode: `public class TwoSum {
    public static int[] twoSumSorted(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
    cppCode: `vector<int> twoSumSorted(const vector<int>& numbers, int target) {
    int left = 0, right = (int)numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        if (sum < target) left++;
        else right--;
    }
    return {-1, -1};
}`,
    pseudoCode: `FUNCTION twoSum(arr, target):
    left = 0, right = length(arr) - 1
    WHILE left < right DO:
        sum = arr[left] + arr[right]
        IF sum == target THEN RETURN [left, right]
        IF sum < target THEN left = left + 1
        ELSE right = right - 1
    END WHILE
    RETURN [-1, -1]
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Pair sum problems', 'Target matching in financial ledgers'],
    interviewTips: ['HashMap approach takes O(N) time & O(N) space for unsorted arrays; Two Pointer takes O(N) time & O(1) space on sorted arrays'],
    sampleInput: '[2, 7, 11, 15], target=9',
    sampleOutput: '[1, 2]',
    quizzes: [
      { question: 'What is time complexity of Two Pointer technique on sorted array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Each iteration increments left or decrements right, taking at most N steps.', difficulty: 'easy', points: 10 },
      { question: 'What step is taken if arr[left] + arr[right] < target?', type: 'mcq', options: ['left++', 'right--', 'left--', 'right++'], correctAnswer: 'left++', explanation: 'To increase sum, left pointer moves right to a larger value.', difficulty: 'easy', points: 10 },
      { question: 'What step is taken if arr[left] + arr[right] > target?', type: 'mcq', options: ['left++', 'right--', 'Both stop', 'Reset left'], correctAnswer: 'right--', explanation: 'To decrease sum, right pointer moves left to a smaller value.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of Two Pointer algorithm on sorted array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Only two index pointer variables are allocated.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity to solve Two Sum on unsorted array using sorting + two pointers?', type: 'mcq', options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N log N)', explanation: 'Sorting takes O(N log N) followed by O(N) two-pointer pass.', difficulty: 'medium', points: 15 },
      { question: 'HashMap approach vs Two Pointer approach tradeoff?', type: 'mcq', options: ['HashMap works unsorted (O(N) space); Two Pointer requires sorted array (O(1) space)', 'HashMap is O(N²)', 'Two Pointer is O(2^N)', 'No difference'], correctAnswer: 'HashMap works unsorted (O(N) space); Two Pointer requires sorted array (O(1) space)', explanation: 'HashMap trades space for lack of sorting requirement.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Two Sum II - Input Array Is Sorted', description: 'Find 1-indexed 2 sum indices.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> twoSum(vector<int>& numbers, int target) {\n  return {};\n}' }, testCases: [{ input: '[2,7,11,15], target=9', expectedOutput: '[1,2]' }], solution: 'Use two pointers from edges.', externalLink: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
      { title: '3Sum (LeetCode 15)', description: 'Find all unique triplets summing to zero.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<vector<int>> threeSum(vector<int>& nums) {\n  return {};\n}' }, testCases: [{ input: '[-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' }], solution: 'Sort array and apply 2Sum for each element.', externalLink: 'https://leetcode.com/problems/3sum/' },
      { title: '4Sum (LeetCode 18)', description: 'Find all unique quadruplets summing to target.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<vector<int>> fourSum(vector<int>& nums, int target) {\n  return {};\n}' }, testCases: [{ input: '[1,0,-1,0,-2,2], target=0', expectedOutput: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' }], solution: 'Nested loops with two pointer inner search.', externalLink: 'https://leetcode.com/problems/4sum/' },
    ],
  },
  {
    slug: 'remove-duplicates',
    title: 'Remove Duplicates',
    topicGroup: 'Two Pointer',
    difficulty: 'easy',
    description: 'Remove duplicates in-place from sorted array so each unique element appears once.',
    theory: 'Slow pointer `i` tracks last unique element. Fast pointer `j` scans array. When arr[j] != arr[i], increment `i` and set arr[i] = arr[j].',
    javaCode: `public class RemoveDuplicates {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int i = 0;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }
}`,
    cppCode: `int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int i = 0;
    for (int j = 1; j < nums.size(); ++j) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}`,
    pseudoCode: `FUNCTION removeDuplicates(nums):
    IF length(nums) == 0 THEN RETURN 0
    i = 0
    FOR j FROM 1 TO length(nums) - 1:
        IF nums[j] != nums[i] THEN
            i = i + 1
            nums[i] = nums[j]
        END IF
    END FOR
    RETURN i + 1
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Data deduplication', 'Unique record filtering'],
    interviewTips: ['Array must be sorted; return length k of unique subarray prefix'],
    sampleInput: [1, 1, 2, 2, 3],
    sampleOutput: 'k=3, array prefix [1, 2, 3]',
    quizzes: [
      { question: 'What is time complexity of removing duplicates in-place from sorted array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Single pass of fast pointer scans array in O(N) time.', difficulty: 'easy', points: 10 },
      { question: 'What is space complexity of this two pointer approach?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Modifies array in-place using O(1) auxiliary variables.', difficulty: 'easy', points: 10 },
      { question: 'What condition triggers moving slow pointer `i` forward?', type: 'mcq', options: ['nums[j] != nums[i]', 'nums[j] == nums[i]', 'j == N', 'nums[j] < 0'], correctAnswer: 'nums[j] != nums[i]', explanation: 'A new unique element is detected when nums[j] != nums[i].', difficulty: 'easy', points: 10 },
      { question: 'What value is returned by function?', type: 'mcq', options: ['Number of unique elements k', 'Total array length N', 'Number of duplicates', '0'], correctAnswer: 'Number of unique elements k', explanation: 'Returns index i + 1 representing unique prefix count.', difficulty: 'medium', points: 15 },
      { question: 'If input array has no duplicates, how many overwrites occur?', type: 'mcq', options: ['0 (or N-1 self-assignments)', 'N²', 'N/2', 'N'], correctAnswer: '0 (or N-1 self-assignments)', explanation: 'Every element is unique so nums[i] = nums[j] executes for each j.', difficulty: 'medium', points: 15 },
      { question: 'Can this algorithm work on unsorted array in O(N) time and O(1) space?', type: 'mcq', options: ['No, requires sorting O(N log N) or HashSet O(N) space', 'Yes', 'Always', 'Only for positive integers'], correctAnswer: 'No, requires sorting O(N log N) or HashSet O(N) space', explanation: 'Unsorted unique detection requires extra memory or prior sorting.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Remove Duplicates from Sorted Array (LeetCode 26)', description: 'Remove duplicates in-place.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int removeDuplicates(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int removeDuplicates(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[1,1,2]', expectedOutput: '2' }], solution: 'Use slow and fast pointer.', externalLink: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
      { title: 'Remove Duplicates II (LeetCode 80)', description: 'Allow duplicates to appear at most twice.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int removeDuplicates(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int removeDuplicates(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[1,1,1,2,2,3]', expectedOutput: '5' }], solution: 'Compare nums[j] with nums[i - 2].', externalLink: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
      { title: 'Remove Element (LeetCode 27)', description: 'Remove all occurrences of target value in-place.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int removeElement(int[] nums, int val) {\n    return 0;\n  }\n}', cpp: 'int removeElement(vector<int>& nums, int val) {\n  return 0;\n}' }, testCases: [{ input: '[3,2,2,3], val=3', expectedOutput: '2' }], solution: 'Two pointers overwriting non-val items.', externalLink: 'https://leetcode.com/problems/remove-element/' },
    ],
  },
  {
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    topicGroup: 'Two Pointer',
    difficulty: 'easy',
    description: 'Move all 0s to the end of array while maintaining relative order of non-zero elements.',
    theory: 'Maintain non-zero writer pointer `i`. Iterate with reader pointer `j`. When arr[j] != 0, swap arr[i] and arr[j] and increment `i`.',
    javaCode: `public class MoveZeroes {
    public static void moveZeroes(int[] nums) {
        int i = 0;
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != 0) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                i++;
            }
        }
    }
}`,
    cppCode: `void moveZeroes(vector<int>& nums) {
    int i = 0;
    for (int j = 0; j < nums.size(); ++j) {
        if (nums[j] != 0) {
            swap(nums[i++], nums[j]);
        }
    }
}`,
    pseudoCode: `FUNCTION moveZeroes(nums):
    i = 0
    FOR j FROM 0 TO length(nums) - 1:
        IF nums[j] != 0 THEN
            SWAP nums[i] AND nums[j]
            i = i + 1
        END IF
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Memory defragmentation', 'Filtering invalid entries'],
    interviewTips: ['Do it in-place without copying to extra array; minimize write operations'],
    sampleInput: [0, 1, 0, 3, 12],
    sampleOutput: '[1, 3, 12, 0, 0]',
    quizzes: [
      { question: 'What is time complexity of Move Zeroes in-place?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Single pass of reader pointer takes O(N) operations.', difficulty: 'easy', points: 10 },
      { question: 'What is space complexity?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Operates in-place using two index pointers.', difficulty: 'easy', points: 10 },
      { question: 'Does Move Zeroes maintain relative order of non-zero numbers?', type: 'mcq', options: ['Yes', 'No', 'Only if sorted', 'Only if even length'], correctAnswer: 'Yes', explanation: 'Sequential reader scan preserves original relative order.', difficulty: 'easy', points: 10 },
      { question: 'If array contains no zeroes, how many swaps occur?', type: 'mcq', options: ['N swaps (self-swaps)', '0', 'N²', 'N/2'], correctAnswer: 'N swaps (self-swaps)', explanation: 'Pointer i and j move together, swapping element with itself.', difficulty: 'medium', points: 15 },
      { question: 'How can you optimize to avoid self-swapping when i == j?', type: 'mcq', options: ['Add condition `if (i != j) swap(nums[i], nums[j])`', 'Use extra array', 'Sort array', 'Skip zeroes'], correctAnswer: 'Add condition `if (i != j) swap(nums[i], nums[j])`', explanation: 'Guards against redundant self-assignment operations.', difficulty: 'medium', points: 15 },
      { question: 'Alternative approach without swapping?', type: 'mcq', options: ['Write non-zeroes to front, then fill remaining slots with 0', 'Reverse array', 'Binary search', 'Bitwise shift'], correctAnswer: 'Write non-zeroes to front, then fill remaining slots with 0', explanation: 'Overwrites non-zeroes first, then fills trailing indices with 0.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Move Zeroes (LeetCode 283)', description: 'Move all 0s to end in-place.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void moveZeroes(int[] nums) {\n  }\n}', cpp: 'void moveZeroes(vector<int>& nums) {\n}' }, testCases: [{ input: '[0,1,0,3,12]', expectedOutput: '[1,3,12,0,0]' }], solution: 'Use two pointers to swap non-zero elements forward.', externalLink: 'https://leetcode.com/problems/move-zeroes/' },
      { title: 'Move Element to End', description: 'Move all occurrences of target val to end of array.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void moveTarget(int[] nums, int val) {\n  }\n}', cpp: 'void moveTarget(vector<int>& nums, int val) {\n}' }, testCases: [{ input: '[2,1,2,2,2,3,4,2], val=2', expectedOutput: '[4,1,3,2,2,2,2,2]' }], solution: 'Two pointers from both ends swapping matching elements.', externalLink: 'https://leetcode.com/' },
      { title: 'Apply Operations to Array (LeetCode 2460)', description: 'Apply multiplication operations then move zeroes.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] applyOperations(int[] nums) {\n    return nums;\n  }\n}', cpp: 'vector<int> applyOperations(vector<int>& nums) {\n  return nums;\n}' }, testCases: [{ input: '[1,2,2,1,1,0]', expectedOutput: '[1,4,2,0,0,0]' }], solution: 'Sequential pass for multiplication followed by Move Zeroes.', externalLink: 'https://leetcode.com/problems/apply-operations-to-an-array/' },
    ],
  },
  {
    slug: 'merge-sorted-arrays',
    title: 'Merge Sorted Arrays',
    topicGroup: 'Two Pointer',
    difficulty: 'easy',
    description: 'Merge two sorted arrays into a single sorted array.',
    theory: 'Maintain two pointers `i` and `j` pointing to current elements of array A and B. Compare and copy smaller item to result array.',
    javaCode: `public class MergeSortedArrays {
    public static int[] merge(int[] a, int[] b) {
        int n = a.length, m = b.length;
        int[] res = new int[n + m];
        int i = 0, j = 0, k = 0;
        while (i < n && j < m) {
            if (a[i] <= b[j]) res[k++] = a[i++];
            else res[k++] = b[j++];
        }
        while (i < n) res[k++] = a[i++];
        while (j < m) res[k++] = b[j++];
        return res;
    }
}`,
    cppCode: `vector<int> merge(const vector<int>& a, const vector<int>& b) {
    int n = a.size(), m = b.size();
    vector<int> res(n + m);
    int i = 0, j = 0, k = 0;
    while (i < n && j < m) {
        if (a[i] <= b[j]) res[k++] = a[i++];
        else res[k++] = b[j++];
    }
    while (i < n) res[k++] = a[i++];
    while (j < m) res[k++] = b[j++];
    return res;
}`,
    pseudoCode: `FUNCTION merge(a, b):
    i = 0, j = 0, k = 0
    CREATE res of size length(a) + length(b)
    WHILE i < length(a) AND j < length(b) DO:
        IF a[i] <= b[j] THEN
            res[k] = a[i]; i = i + 1
        ELSE
            res[k] = b[j]; j = j + 1
        END IF
        k = k + 1
    END WHILE
    WHILE i < length(a) DO res[k++] = a[i++]
    WHILE j < length(b) DO res[k++] = b[j++]
    RETURN res
END FUNCTION`,
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N + M)',
    applications: ['Merge step of Merge Sort', 'Database join & stream merging'],
    interviewTips: ['If target array has buffer space at end, fill from back to front in O(1) extra space'],
    sampleInput: 'a=[1, 3, 5], b=[2, 4, 6]',
    sampleOutput: '[1, 2, 3, 4, 5, 6]',
    quizzes: [
      { question: 'What is time complexity of merging two sorted arrays of size N and M?', type: 'mcq', options: ['O(N + M)', 'O(N * M)', 'O(log(N+M))', 'O((N+M) log(N+M))'], correctAnswer: 'O(N + M)', explanation: 'Each element from both arrays is processed exactly once.', difficulty: 'easy', points: 10 },
      { question: 'What is space complexity when creating a new output merged array?', type: 'mcq', options: ['O(N + M)', 'O(1)', 'O(N)', 'O(M)'], correctAnswer: 'O(N + M)', explanation: 'New combined array requires storage for total N+M elements.', difficulty: 'easy', points: 10 },
      { question: 'How can you merge two sorted arrays in-place in O(1) space if array A has size N+M?', type: 'mcq', options: ['Compare and fill from back (index N+M-1 down to 0)', 'Sort array A', 'Fill from front', 'Use stack'], correctAnswer: 'Compare and fill from back (index N+M-1 down to 0)', explanation: 'Filling from back prevents overwriting unread elements of array A.', difficulty: 'easy', points: 10 },
      { question: 'Total comparisons in worst case to merge size N and M?', type: 'mcq', options: ['N + M - 1', 'N * M', 'N', 'M'], correctAnswer: 'N + M - 1', explanation: 'At most N+M-1 comparisons take place before one array depletes.', difficulty: 'medium', points: 15 },
      { question: 'Is the two-pointer merge algorithm stable?', type: 'mcq', options: ['Yes, if <= comparison favors first array', 'No', 'Only for integers', 'Depends on array size'], correctAnswer: 'Yes, if <= comparison favors first array', explanation: 'Choosing a[i] when a[i] == b[j] preserves original relative order.', difficulty: 'medium', points: 15 },
      { question: 'What if merging K sorted arrays of total N elements?', type: 'mcq', options: ['O(N log K) using Min-Heap', 'O(N*K)', 'O(N²)', 'O(K log N)'], correctAnswer: 'O(N log K) using Min-Heap', explanation: 'K-way merge uses priority queue size K taking O(N log K) time.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Merge Sorted Array (LeetCode 88)', description: 'Merge arr2 into arr1 in-place.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n  }\n}', cpp: 'void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n}' }, testCases: [{ input: 'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3', expectedOutput: '[1,2,2,3,5,6]' }], solution: 'Three pointers filling from back.', externalLink: 'https://leetcode.com/problems/merge-sorted-array/' },
      { title: 'Intersection of Two Sorted Arrays', description: 'Find common elements in two sorted arrays.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\n  return {};\n}' }, testCases: [{ input: 'nums1=[1,2,2,1], nums2=[2,2]', expectedOutput: '[2]' }], solution: 'Two pointers matching equal elements.', externalLink: 'https://leetcode.com/problems/intersection-of-two-arrays/' },
      { title: 'Median of Two Sorted Arrays (LeetCode 4)', description: 'Find median of two sorted arrays in O(log(N+M)) time.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    return 0.0;\n  }\n}', cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n  return 0.0;\n}' }, testCases: [{ input: 'nums1=[1,3], nums2=[2]', expectedOutput: '2.0' }], solution: 'Binary search on smaller array partition boundary.', externalLink: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
    ],
  },
  {
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    topicGroup: 'Two Pointer',
    difficulty: 'medium',
    description: 'Find two lines that together with x-axis form a container containing most water.',
    theory: 'Two pointers at left=0 and right=N-1 calculate area = min(height[left], height[right]) * (right - left). Move pointer with smaller height inward.',
    javaCode: `public class ContainerMostWater {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            int w = right - left;
            maxWater = Math.max(maxWater, h * w);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
}`,
    cppCode: `int maxArea(const vector<int>& height) {
    int left = 0, right = (int)height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
    pseudoCode: `FUNCTION maxArea(height):
    left = 0, right = length(height) - 1
    maxWater = 0
    WHILE left < right DO:
        h = MIN(height[left], height[right])
        w = right - left
        maxWater = MAX(maxWater, h * w)
        IF height[left] < height[right] THEN left = left + 1
        ELSE right = right - 1
    END WHILE
    RETURN maxWater
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Histogram area calculation', 'Resource utilization optimization'],
    interviewTips: ['Explain greedy pointer contraction proof: moving taller side can never increase area'],
    sampleInput: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    sampleOutput: '49',
    quizzes: [
      { question: 'What is time complexity of Container With Most Water using Two Pointers?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single pass moving pointers inward takes linear time.', difficulty: 'easy', points: 10 },
      { question: 'Why move pointer with smaller height?', type: 'mcq', options: ['Moving taller line can only decrease width without increasing height bottleneck', 'Random choice', 'Always move left', 'Always move right'], correctAnswer: 'Moving taller line can only decrease width without increasing height bottleneck', explanation: 'Height is constrained by min(left, right), so moving taller line cannot improve area.', difficulty: 'easy', points: 10 },
      { question: 'Formula for water capacity stored between left and right boundary?', type: 'mcq', options: ['min(h[l], h[r]) * (r - l)', 'max(h[l], h[r]) * (r - l)', '(h[l] + h[r]) * (r - l)', 'h[l] * h[r]'], correctAnswer: 'min(h[l], h[r]) * (r - l)', explanation: 'Water level cannot exceed shorter wall height multiplied by width.', difficulty: 'easy', points: 10 },
      { question: 'Brute force time complexity for all pairs?', type: 'mcq', options: ['O(N²)', 'O(N)', 'O(N log N)', 'O(2^N)'], correctAnswer: 'O(N²)', explanation: 'Checking all pairs (i, j) takes N(N-1)/2 = O(N²).', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of Two Pointer solution?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Requires only constant variables for pointers and maxArea.', difficulty: 'medium', points: 15 },
      { question: 'If all heights are equal H, what is maximum area index pair?', type: 'mcq', options: ['First and last index (0 and N-1)', 'Middle indices', 'Any adjacent pair', '0 and 1'], correctAnswer: 'First and last index (0 and N-1)', explanation: 'Max width N-1 multiplied by constant height H yields maximum area.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Container With Most Water (LeetCode 11)', description: 'Find maximum area of water container.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int maxArea(int[] height) {\n    return 0;\n  }\n}', cpp: 'int maxArea(vector<int>& height) {\n  return 0;\n}' }, testCases: [{ input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' }], solution: 'Two pointers moving inward.', externalLink: 'https://leetcode.com/problems/container-with-most-water/' },
      { title: 'Trapping Rain Water (LeetCode 42)', description: 'Calculate total rain water trapped between bars.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int trap(int[] height) {\n    return 0;\n  }\n}', cpp: 'int trap(vector<int>& height) {\n  return 0;\n}' }, testCases: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' }], solution: 'Two pointers tracking leftMax and rightMax.', externalLink: 'https://leetcode.com/problems/trapping-rain-water/' },
      { title: 'Largest Rectangle in Histogram (LeetCode 84)', description: 'Find largest rectangle area in histogram.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int largestRectangleArea(int[] heights) {\n    return 0;\n  }\n}', cpp: 'int largestRectangleArea(vector<int>& heights) {\n  return 0;\n}' }, testCases: [{ input: '[2,1,5,6,2,3]', expectedOutput: '10' }], solution: 'Monotonic stack maintaining increasing heights.', externalLink: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
    ],
  },
];
