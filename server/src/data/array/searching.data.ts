import { ArrayAlgorithmData } from '../array.types';

export const SEARCHING_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'linear-search',
    title: 'Linear Search',
    topicGroup: 'Searching',
    difficulty: 'easy',
    description: 'Sequentially check each element until target is found or array ends.',
    theory: 'Linear Search iterates through array elements from index 0 to N-1, comparing each element with the target key.',
    javaCode: `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`,
    cppCode: `int linearSearch(const vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
    pseudoCode: `FUNCTION linearSearch(arr, target):
    FOR i FROM 0 TO length(arr) - 1:
        IF arr[i] == target THEN RETURN i
    END FOR
    RETURN -1
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Unsorted array search', 'Small dataset lookup'],
    interviewTips: ['Works on unsorted arrays; O(N) worst case when element is at end or absent'],
    sampleInput: [4, 2, 7, 1, 9, 3],
    sampleOutput: 'Index 2',
    quizzes: [
      { question: 'What is the worst-case time complexity of Linear Search?', type: 'mcq', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'In worst case, target is at index N-1 or absent.', difficulty: 'easy', points: 10 },
      { question: 'What is the best-case time complexity of Linear Search?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(0)'], correctAnswer: 'O(1)', explanation: 'Target found at index 0 on first comparison.', difficulty: 'easy', points: 10 },
      { question: 'Does Linear Search require array to be sorted?', type: 'mcq', options: ['Yes', 'No', 'Only for positive numbers', 'Only for strings'], correctAnswer: 'No', explanation: 'Linear search works on both sorted and unsorted arrays.', difficulty: 'easy', points: 10 },
      { question: 'Average number of comparisons in successful Linear Search?', type: 'mcq', options: ['(N + 1) / 2', 'N', 'log N', 'N / 4'], correctAnswer: '(N + 1) / 2', explanation: 'Average position is middle of array.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of Linear Search?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'No extra memory is allocated.', difficulty: 'medium', points: 15 },
      { question: 'When is Linear Search preferred over Binary Search?', type: 'mcq', options: ['Large sorted data', 'Unsorted small data or linked list', 'Binary trees', 'Always'], correctAnswer: 'Unsorted small data or linked list', explanation: 'Avoids sorting overhead on small or unsorted lists.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Linear Search Target', description: 'Find target in unsorted array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int search(int[] nums, int target) {\n    return -1;\n  }\n}', cpp: 'int search(vector<int>& nums, int target) {\n  return -1;\n}' }, testCases: [{ input: '[4,2,7,1], target=7', expectedOutput: '2' }], solution: 'Loop through array and return index.', externalLink: 'https://leetcode.com/' },
      { title: 'Count Occurrences', description: 'Count how many times target appears.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int count(int[] nums, int target) {\n    return 0;\n  }\n}', cpp: 'int count(vector<int>& nums, int target) {\n  return 0;\n}' }, testCases: [{ input: '[1,2,2,3,2], target=2', expectedOutput: '3' }], solution: 'Increment counter on match.', externalLink: 'https://leetcode.com/' },
      { title: 'Find First Duplicate', description: 'Find index of first repeated element.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int firstDuplicate(int[] nums) {\n    return -1;\n  }\n}', cpp: 'int firstDuplicate(vector<int>& nums) {\n  return -1;\n}' }, testCases: [{ input: '[2,1,3,5,3,2]', expectedOutput: '3' }], solution: 'Use HashSet with linear scan.', externalLink: 'https://leetcode.com/problems/contains-duplicate/' },
    ],
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    topicGroup: 'Searching',
    difficulty: 'easy',
    description: 'Logarithmic search on sorted array by repeatedly halving search range.',
    theory: 'Binary Search compares target with middle element mid = low + (high - low) / 2. If equal, target found; if smaller, search left half; if larger, search right half.',
    javaCode: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    cppCode: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    pseudoCode: `FUNCTION binarySearch(arr, target):
    low = 0, high = length(arr) - 1
    WHILE low <= high DO:
        mid = low + (high - low) / 2
        IF arr[mid] == target THEN RETURN mid
        IF arr[mid] < target THEN low = mid + 1
        ELSE high = mid - 1
    END WHILE
    RETURN -1
END FUNCTION`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    applications: ['Sorted array search', 'Binary search on answer space'],
    interviewTips: ['Use low + (high - low) / 2 to avoid integer overflow'],
    sampleInput: [1, 3, 5, 7, 9, 11, 13],
    sampleOutput: 'Index 3',
    quizzes: [
      { question: 'What is the time complexity of Binary Search?', type: 'mcq', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correctAnswer: 'O(log N)', explanation: 'Search range is halved in each step.', difficulty: 'easy', points: 10 },
      { question: 'Why use mid = low + (high - low) / 2 instead of (low + high) / 2?', type: 'mcq', options: ['Faster execution', 'Prevents integer overflow for large indices', 'Required by compiler', 'Uses less space'], correctAnswer: 'Prevents integer overflow for large indices', explanation: '(low + high) can overflow 32-bit signed integer max value.', difficulty: 'easy', points: 10 },
      { question: 'Prerequisite for applying Binary Search?', type: 'mcq', options: ['Array must be sorted', 'Array size must be even', 'Array contains no zeroes', 'Array size > 100'], correctAnswer: 'Array must be sorted', explanation: 'Monotonic sorted order property is required.', difficulty: 'easy', points: 10 },
      { question: 'Max comparisons to search array of size 1000?', type: 'mcq', options: ['10', '500', '1000', '100'], correctAnswer: '10', explanation: '2^10 = 1024 > 1000, so ceil(log2(1000)) = 10.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of iterative Binary Search?', type: 'mcq', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Iterative version uses constant auxiliary space.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of recursive Binary Search?', type: 'mcq', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'], correctAnswer: 'O(log N)', explanation: 'Call stack depth reaches O(log N).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Binary Search (LeetCode 704)', description: 'Search target in sorted array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int search(int[] nums, int target) {\n    return -1;\n  }\n}', cpp: 'int search(vector<int>& nums, int target) {\n  return -1;\n}' }, testCases: [{ input: '[-1,0,3,5,9,12], target=9', expectedOutput: '4' }], solution: 'Use standard binary search loop.', externalLink: 'https://leetcode.com/problems/binary-search/' },
      { title: 'Search Insert Position', description: 'Find index where target should be inserted.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int searchInsert(int[] nums, int target) {\n    return 0;\n  }\n}', cpp: 'int searchInsert(vector<int>& nums, int target) {\n  return 0;\n}' }, testCases: [{ input: '[1,3,5,6], target=5', expectedOutput: '2' }], solution: 'Return low pointer when loop ends.', externalLink: 'https://leetcode.com/problems/search-insert-position/' },
      { title: 'First and Last Position', description: 'Find starting and ending position of target element.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    return new int[]{-1,-1};\n  }\n}', cpp: 'vector<int> searchRange(vector<int>& nums, int target) {\n  return {-1,-1};\n}' }, testCases: [{ input: '[5,7,7,8,8,10], target=8', expectedOutput: '[3,4]' }], solution: 'Run lower bound and upper bound binary searches.', externalLink: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
    ],
  },
  {
    slug: 'lower-bound',
    title: 'Lower Bound',
    topicGroup: 'Searching',
    difficulty: 'easy',
    description: 'Find first index where element is >= target in a sorted array.',
    theory: 'Lower bound returns index of first element that does not compare less than val. If arr[mid] >= target, right = mid; else left = mid + 1.',
    javaCode: `public class LowerBound {
    public static int lowerBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) high = mid;
            else low = mid + 1;
        }
        return low;
    }
}`,
    cppCode: `#include <algorithm>
#include <vector>
using namespace std;

int lowerBound(const vector<int>& arr, int target) {
    auto it = lower_bound(arr.begin(), arr.end(), target);
    return distance(arr.begin(), it);
}`,
    pseudoCode: `FUNCTION lowerBound(arr, target):
    low = 0, high = length(arr)
    WHILE low < high DO:
        mid = low + (high - low) / 2
        IF arr[mid] >= target THEN high = mid
        ELSE low = mid + 1
    END WHILE
    RETURN low
END FUNCTION`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    applications: ['Insertion index lookup', 'Range frequency queries'],
    interviewTips: ['Returns N if all elements are strictly less than target'],
    sampleInput: [1, 2, 4, 4, 5, 6, 8],
    sampleOutput: 'Index 2 (for target 4)',
    quizzes: [
      { question: 'Lower Bound of target 4 in array [1, 2, 4, 4, 5] is index?', type: 'mcq', options: ['0', '1', '2', '3'], correctAnswer: '2', explanation: 'First index where arr[i] >= 4 is index 2.', difficulty: 'easy', points: 10 },
      { question: 'What does lower_bound return if all elements are less than target?', type: 'mcq', options: ['0', 'N - 1', 'N', '-1'], correctAnswer: 'N', explanation: 'Returns end iterator / index N.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of std::lower_bound on std::vector?', type: 'mcq', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], correctAnswer: 'O(log N)', explanation: 'Random access iterators enable O(log N) binary search.', difficulty: 'easy', points: 10 },
      { question: 'Condition to move high pointer in lower bound?', type: 'mcq', options: ['arr[mid] >= target', 'arr[mid] > target', 'arr[mid] == target', 'arr[mid] < target'], correctAnswer: 'arr[mid] >= target', explanation: 'High moves to mid to preserve candidate first valid index.', difficulty: 'medium', points: 15 },
      { question: 'Difference between lower_bound and upper_bound?', type: 'mcq', options: ['lower_bound is >= target; upper_bound is > target', 'lower_bound is <= target', 'Both are same', 'upper_bound works on unsorted'], correctAnswer: 'lower_bound is >= target; upper_bound is > target', explanation: 'lower_bound uses >= while upper_bound uses >.', difficulty: 'medium', points: 15 },
      { question: 'Count of occurrences of target in sorted array is equal to?', type: 'mcq', options: ['upper_bound - lower_bound', 'lower_bound + upper_bound', 'N / 2', 'upper_bound / 2'], correctAnswer: 'upper_bound - lower_bound', explanation: 'The distance between upper and lower bound iterators gives frequency count.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Implement Lower Bound', description: 'Return lower bound index for target.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int lowerBound(int[] nums, int target) {\n    return 0;\n  }\n}', cpp: 'int lowerBound(vector<int>& nums, int target) {\n  return 0;\n}' }, testCases: [{ input: '[1,2,4,4,5], target=4', expectedOutput: '2' }], solution: 'Binary search with high = mid on >= condition.', externalLink: 'https://leetcode.com/' },
      { title: 'First Occurrence Index', description: 'Find first index of target in sorted array with duplicates.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int firstOccurrence(int[] nums, int target) {\n    return -1;\n  }\n}', cpp: 'int firstOccurrence(vector<int>& nums, int target) {\n  return -1;\n}' }, testCases: [{ input: '[1,2,2,2,3], target=2', expectedOutput: '1' }], solution: 'Use lower bound and check if arr[idx] == target.', externalLink: 'https://leetcode.com/' },
      { title: 'Ceil of Element', description: 'Find ceiling of target (smallest element >= target).', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int getCeil(int[] nums, int target) {\n    return -1;\n  }\n}', cpp: 'int getCeil(vector<int>& nums, int target) {\n  return -1;\n}' }, testCases: [{ input: '[1,2,8,10,11,12,19], target=5', expectedOutput: '8' }], solution: 'Use lower bound index.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'upper-bound',
    title: 'Upper Bound',
    topicGroup: 'Searching',
    difficulty: 'easy',
    description: 'Find first index where element is strictly greater than target in a sorted array.',
    theory: 'Upper bound returns index of first element strictly greater than target. If arr[mid] > target, high = mid; else low = mid + 1.',
    javaCode: `public class UpperBound {
    public static int upperBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > target) high = mid;
            else low = mid + 1;
        }
        return low;
    }
}`,
    cppCode: `#include <algorithm>
#include <vector>
using namespace std;

int upperBound(const vector<int>& arr, int target) {
    auto it = upper_bound(arr.begin(), arr.end(), target);
    return distance(arr.begin(), it);
}`,
    pseudoCode: `FUNCTION upperBound(arr, target):
    low = 0, high = length(arr)
    WHILE low < high DO:
        mid = low + (high - low) / 2
        IF arr[mid] > target THEN high = mid
        ELSE low = mid + 1
    END WHILE
    RETURN low
END FUNCTION`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    applications: ['Frequency count calculation', 'Strict inequality searches'],
    interviewTips: ['Upper bound - Lower bound gives exact count of target in sorted array'],
    sampleInput: [1, 2, 4, 4, 5, 6],
    sampleOutput: 'Index 4 (for target 4)',
    quizzes: [
      { question: 'Upper bound of target 4 in array [1, 2, 4, 4, 5] is index?', type: 'mcq', options: ['2', '3', '4', '5'], correctAnswer: '4', explanation: 'Index 4 contains 5, which is first element strictly > 4.', difficulty: 'easy', points: 10 },
      { question: 'Condition to move high pointer in upper bound?', type: 'mcq', options: ['arr[mid] >= target', 'arr[mid] > target', 'arr[mid] < target', 'arr[mid] == target'], correctAnswer: 'arr[mid] > target', explanation: 'High moves to mid when element is strictly greater than target.', difficulty: 'easy', points: 10 },
      { question: 'What is returned if target is greater than all array elements?', type: 'mcq', options: ['0', 'N - 1', 'N', '-1'], correctAnswer: 'N', explanation: 'Returns index N when no element is strictly greater.', difficulty: 'easy', points: 10 },
      { question: 'How to calculate count of element X in sorted array?', type: 'mcq', options: ['upper_bound(X) - lower_bound(X)', 'upper_bound(X) + lower_bound(X)', 'lower_bound(X)', 'upper_bound(X)'], correctAnswer: 'upper_bound(X) - lower_bound(X)', explanation: 'Difference between upper and lower bound indices gives element count.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of finding frequency using upper and lower bounds?', type: 'mcq', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], correctAnswer: 'O(log N)', explanation: 'Two binary searches each take O(log N) time.', difficulty: 'medium', points: 15 },
      { question: 'What is upper_bound(target) - 1 in sorted array with duplicates?', type: 'mcq', options: ['First occurrence of target', 'Last occurrence of target', 'Middle occurrence', 'Array size'], correctAnswer: 'Last occurrence of target', explanation: 'Index right before first element > target is last occurrence index.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Implement Upper Bound', description: 'Find upper bound index for target in sorted array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int upperBound(int[] nums, int target) {\n    return 0;\n  }\n}', cpp: 'int upperBound(vector<int>& nums, int target) {\n  return 0;\n}' }, testCases: [{ input: '[1,2,4,4,5], target=4', expectedOutput: '4' }], solution: 'Binary search with condition arr[mid] > target.', externalLink: 'https://leetcode.com/' },
      { title: 'Frequency of Target', description: 'Count total occurrences of target using lower and upper bound.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int countFreq(int[] nums, int target) {\n    return 0;\n  }\n}', cpp: 'int countFreq(vector<int>& nums, int target) {\n  return 0;\n}' }, testCases: [{ input: '[1,1,2,2,2,3], target=2', expectedOutput: '3' }], solution: 'upper_bound - lower_bound.', externalLink: 'https://leetcode.com/' },
      { title: 'Floor of Element', description: 'Find floor of target (largest element <= target).', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int getFloor(int[] nums, int target) {\n    return -1;\n  }\n}', cpp: 'int getFloor(vector<int>& nums, int target) {\n  return -1;\n}' }, testCases: [{ input: '[1,2,8,10,11,12,19], target=5', expectedOutput: '2' }], solution: 'upper_bound(target) - 1.', externalLink: 'https://leetcode.com/' },
    ],
  },
];
