import { ArrayAlgorithmData } from '../array.types';

export const SLIDING_WINDOW_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'maximum-sum-subarray',
    title: 'Maximum Sum Subarray',
    topicGroup: 'Sliding Window',
    difficulty: 'easy',
    description: 'Find max sum of any contiguous subarray of fixed size k.',
    theory: 'Compute sum of first window of size k. Then slide window one position right by adding arr[i] and subtracting arr[i-k].',
    javaCode: `public class MaximumSumSubarray {
    public static int maxSum(int[] arr, int k) {
        if (arr.length < k) return -1;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += arr[i];
        int maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
}`,
    cppCode: `int maxSum(const vector<int>& arr, int k) {
    if (arr.size() < k) return -1;
    int windowSum = 0;
    for (int i = 0; i < k; ++i) windowSum += arr[i];
    int maxSum = windowSum;
    for (size_t i = k; i < arr.size(); ++i) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
    pseudoCode: `FUNCTION maxSum(arr, k):
    windowSum = sum of first k elements
    maxSum = windowSum
    FOR i FROM k TO length(arr) - 1:
        windowSum = windowSum + arr[i] - arr[i - k]
        maxSum = MAX(maxSum, windowSum)
    END FOR
    RETURN maxSum
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Fixed-size moving average', 'Signal processing windowing'],
    interviewTips: ['Sliding window reduces O(N*k) naive re-summing to linear O(N) time'],
    sampleInput: '[2, 1, 5, 1, 3, 2], k=3',
    sampleOutput: '9 (subarray [5, 1, 3])',
    quizzes: [
      { question: 'What is time complexity of Sliding Window max sum for fixed window k?', type: 'mcq', options: ['O(N)', 'O(N * k)', 'O(N²)', 'O(k)'], correctAnswer: 'O(N)', explanation: 'Each element enters and leaves window sum once in O(1) time.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of fixed sliding window?', type: 'mcq', options: ['O(1)', 'O(k)', 'O(N)', 'O(log k)'], correctAnswer: 'O(1)', explanation: 'Uses constant extra space for sum and max variables.', difficulty: 'easy', points: 10 },
      { question: 'How is new window sum updated when sliding from i-1 to i?', type: 'mcq', options: ['sum + arr[i] - arr[i-k]', 'sum + arr[i]', 'sum - arr[i-k]', 'sum * arr[i]'], correctAnswer: 'sum + arr[i] - arr[i-k]', explanation: 'Adds incoming element arr[i] and subtracts outgoing element arr[i-k].', difficulty: 'easy', points: 10 },
      { question: 'Naive solution time complexity without sliding window?', type: 'mcq', options: ['O(N * k)', 'O(N)', 'O(N log N)', 'O(2^N)'], correctAnswer: 'O(N * k)', explanation: 'Recomputing sum of k elements for N-k+1 windows takes O(N*k).', difficulty: 'medium', points: 15 },
      { question: 'What if array size N < k?', type: 'mcq', options: ['Return error / invalid', 'Window size equals N', 'Return 0', 'Infinite loop'], correctAnswer: 'Return error / invalid', explanation: 'Window of size k cannot fit inside array smaller than k.', difficulty: 'medium', points: 15 },
      { question: 'Number of fixed windows of size k in array of size N?', type: 'mcq', options: ['N - k + 1', 'N - k', 'N / k', 'k'], correctAnswer: 'N - k + 1', explanation: 'Window starts range from index 0 to N-k (total N-k+1 windows).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Maximum Sum Subarray of Size K', description: 'Find maximum sum of subarray of size k.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int maxSum(int[] arr, int k) {\n    return 0;\n  }\n}', cpp: 'int maxSum(vector<int>& arr, int k) {\n  return 0;\n}' }, testCases: [{ input: '[2,1,5,1,3,2], k=3', expectedOutput: '9' }], solution: 'Use fixed sliding window sum.', externalLink: 'https://leetcode.com/' },
      { title: 'Maximum Average Subarray I (LeetCode 643)', description: 'Find maximum average value of subarray size k.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    return 0.0;\n  }\n}', cpp: 'double findMaxAverage(vector<int>& nums, int k) {\n  return 0.0;\n}' }, testCases: [{ input: '[1,12,-5,-6,50,3], k=4', expectedOutput: '12.75' }], solution: 'Sliding window max sum divided by k.', externalLink: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
      { title: 'Smallest Subarray With Given Sum', description: 'Find minimum length subarray with sum >= S.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    return 0;\n  }\n}', cpp: 'int minSubArrayLen(int target, vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: 'target=7, nums=[2,3,1,2,4,3]', expectedOutput: '2' }], solution: 'Dynamic sliding window expanding right and contracting left.', externalLink: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
    ],
  },
  {
    slug: 'maximum-average-subarray',
    title: 'Maximum Average Subarray',
    topicGroup: 'Sliding Window',
    difficulty: 'easy',
    description: 'Find contiguous subarray of length k that has maximum average value.',
    theory: 'Compute sum of initial window of size k. Slide window across array maintaining sum, then divide max sum by k.',
    javaCode: `public class MaxAvgSubarray {
    public static double findMaxAverage(int[] nums, int k) {
        long sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        long maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return (double) maxSum / k;
    }
}`,
    cppCode: `double findMaxAverage(vector<int>& nums, int k) {
    long long sum = 0;
    for (int i = 0; i < k; ++i) sum += nums[i];
    long long maxSum = sum;
    for (size_t i = k; i < nums.size(); ++i) {
        sum += nums[i] - nums[i - k];
        maxSum = max(maxSum, sum);
    }
    return (double)maxSum / k;
}`,
    pseudoCode: `FUNCTION findMaxAverage(nums, k):
    sum = 0
    FOR i FROM 0 TO k - 1: sum = sum + nums[i]
    maxSum = sum
    FOR i FROM k TO length(nums) - 1:
        sum = sum + nums[i] - nums[i - k]
        maxSum = MAX(maxSum, sum)
    END FOR
    RETURN maxSum / k
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Stock moving average calculation', 'Rate limiting metrics'],
    interviewTips: ['Use long long sum to prevent integer overflow before floating point division'],
    sampleInput: '[1, 12, -5, -6, 50, 3], k=4',
    sampleOutput: '12.75',
    quizzes: [
      { question: 'Why perform division by k at the very end instead of every step?', type: 'mcq', options: ['Avoids floating point rounding cumulative errors and extra divisions', 'Division is illegal in loop', 'Saves space', 'Makes array sorted'], correctAnswer: 'Avoids floating point rounding cumulative errors and extra divisions', explanation: 'Dividing max sum once at the end is accurate and faster.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of Maximum Average Subarray using sliding window?', type: 'mcq', options: ['O(N)', 'O(N * k)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Linear time scan over array.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity?', type: 'mcq', options: ['O(1)', 'O(k)', 'O(N)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Uses scalar variables for sum tracking.', difficulty: 'easy', points: 10 },
      { question: 'If k = N, what is maximum average?', type: 'mcq', options: ['Sum of all elements divided by N', 'Max element', '0', 'N'], correctAnswer: 'Sum of all elements divided by N', explanation: 'Only one window exists of size N.', difficulty: 'medium', points: 15 },
      { question: 'If k = 1, what is maximum average?', type: 'mcq', options: ['Maximum element in array', 'Average of all elements', '0', 'Min element'], correctAnswer: 'Maximum element in array', explanation: 'Window size 1 average equals individual element value.', difficulty: 'medium', points: 15 },
      { question: 'How to handle potential integer overflow during window summation?', type: 'mcq', options: ['Use 64-bit integer (long / long long)', 'Use float', 'Ignore overflow', 'Mod 10^9+7'], correctAnswer: 'Use 64-bit integer (long / long long)', explanation: '64-bit integers prevent overflow when summing up to 10^5 integers.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Maximum Average Subarray I (LeetCode 643)', description: 'Find max average of subarray of length k.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    return 0.0;\n  }\n}', cpp: 'double findMaxAverage(vector<int>& nums, int k) {\n  return 0.0;\n}' }, testCases: [{ input: '[1,12,-5,-6,50,3], k=4', expectedOutput: '12.75' }], solution: 'Sliding window max sum divided by k.', externalLink: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
      { title: 'Maximum Average Subarray II', description: 'Find max average contiguous subarray of length >= k.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    return 0.0;\n  }\n}', cpp: 'double findMaxAverage(vector<int>& nums, int k) {\n  return 0.0;\n}' }, testCases: [{ input: '[1,12,-5,-6,50,3], k=4', expectedOutput: '12.75' }], solution: 'Binary search on answer space combined with prefix sum.', externalLink: 'https://leetcode.com/' },
      { title: 'K-Radius Subarray Averages (LeetCode 2090)', description: 'Calculate k-radius average for each index in array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] getAverages(int[] nums, int k) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> getAverages(vector<int>& nums, int k) {\n  return {};\n}' }, testCases: [{ input: '[7,4,3,9,1,8,5,2,6], k=3', expectedOutput: '[-1,-1,-1,5,4,4,-1,-1,-1]' }], solution: 'Sliding window of width 2k+1.', externalLink: 'https://leetcode.com/problems/k-radius-subarray-averages/' },
    ],
  },
  {
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    topicGroup: 'Sliding Window',
    difficulty: 'medium',
    description: 'Find length of longest substring without repeating characters.',
    theory: 'Dynamic sliding window with two pointers `left` and `right`. Maintain char frequency map/set. If char at `right` is duplicate, advance `left` until duplicate is removed.',
    javaCode: `public class LongestSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int n = s.length(), maxLen = 0, left = 0;
        int[] lastSeen = new int[128];
        java.util.Arrays.fill(lastSeen, -1);
        for (int right = 0; right < n; right++) {
            char c = s.charAt(right);
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
    cppCode: `int lengthOfLongestSubstring(string s) {
    vector<int> lastSeen(128, -1);
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); ++right) {
        char c = s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    pseudoCode: `FUNCTION lengthOfLongestSubstring(s):
    left = 0, maxLen = 0
    lastSeen = map of char to last index
    FOR right FROM 0 TO length(s) - 1:
        IF s[right] in lastSeen AND lastSeen[s[right]] >= left THEN
            left = lastSeen[s[right]] + 1
        END IF
        lastSeen[s[right]] = right
        maxLen = MAX(maxLen, right - left + 1)
    END FOR
    RETURN maxLen
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M)) where M is character set size',
    applications: ['Text analysis', 'Data compression windowing'],
    interviewTips: ['Direct index map `lastSeen[char]` avoids shrinking `left` pointer step-by-step'],
    sampleInput: '"abcabcbb"',
    sampleOutput: '3 (substring "abc")',
    quizzes: [
      { question: 'Time complexity of optimized sliding window using lastSeen map for string of size N?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(2^N)', 'O(N log N)'], correctAnswer: 'O(N)', explanation: 'Right pointer moves 0..N-1 once and left jumps forward in O(1).', difficulty: 'easy', points: 10 },
      { question: 'Space complexity when character set is ASCII (128 chars)?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Fixed-size array of 128 elements takes constant O(1) space.', difficulty: 'easy', points: 10 },
      { question: 'What is length of longest non-repeating substring in "bbbbb"?', type: 'mcq', options: ['1', '5', '0', '2'], correctAnswer: '1', explanation: 'Substring "b" has length 1.', difficulty: 'easy', points: 10 },
      { question: 'When character c is repeated, to what index does left pointer jump?', type: 'mcq', options: ['lastSeen[c] + 1', 'lastSeen[c]', 'right', '0'], correctAnswer: 'lastSeen[c] + 1', explanation: 'Left moves just past previous occurrence of character c.', difficulty: 'medium', points: 15 },
      { question: 'Output for "pwwkew"?', type: 'mcq', options: ['3 ("wke")', '4', '2', '6'], correctAnswer: '3 ("wke")', explanation: 'Longest non-repeating substring is "wke" with length 3.', difficulty: 'medium', points: 15 },
      { question: 'Why check `if (lastSeen[c] >= left)` before jumping left pointer?', type: 'mcq', options: ['Prevents left pointer from moving backward for characters outside current window', 'Sorts map', 'Prevents null error', 'Doubles speed'], correctAnswer: 'Prevents left pointer from moving backward for characters outside current window', explanation: 'Without check, old character occurrences before left would pull left backward.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Longest Substring Without Repeating Characters (LeetCode 3)', description: 'Find max length substring with unique chars.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int lengthOfLongestSubstring(String s) {\n    return 0;\n  }\n}', cpp: 'int lengthOfLongestSubstring(string s) {\n  return 0;\n}' }, testCases: [{ input: '"abcabcbb"', expectedOutput: '3' }], solution: 'Sliding window with character index map.', externalLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { title: 'Longest Substring with At Most K Distinct Characters', description: 'Find longest substring with <= k unique chars.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int lengthOfLongestSubstringKDistinct(String s, int k) {\n    return 0;\n  }\n}', cpp: 'int lengthOfLongestSubstringKDistinct(string s, int k) {\n  return 0;\n}' }, testCases: [{ input: '"eceba", k=2', expectedOutput: '3' }], solution: 'Sliding window with frequency map maintaining size <= k.', externalLink: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/' },
      { title: 'Subarrays with K Different Integers (LeetCode 992)', description: 'Count subarrays with exactly K distinct integers.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int subarraysWithKDistinct(int[] nums, int k) {\n    return 0;\n  }\n}', cpp: 'int subarraysWithKDistinct(vector<int>& nums, int k) {\n  return 0;\n}' }, testCases: [{ input: '[1,2,1,2,3], k=2', expectedOutput: '7' }], solution: 'atMost(K) - atMost(K - 1) sliding window technique.', externalLink: 'https://leetcode.com/problems/subarrays-with-k-different-integers/' },
    ],
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    topicGroup: 'Sliding Window',
    difficulty: 'hard',
    description: 'Find minimum window in string S that contains all characters of string T.',
    theory: 'Expand `right` pointer to include characters until window contains all chars of T. Then contract `left` pointer to minimize window length while retaining valid char count.',
    javaCode: `public class MinWindowSubstring {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        int[] tCount = new int[128];
        for (char c : t.toCharArray()) tCount[c]++;
        int required = 0;
        for (int count : tCount) if (count > 0) required++;
        int left = 0, right = 0, formed = 0;
        int[] windowCount = new int[128];
        int minLen = Integer.MAX_VALUE, minLeft = 0;
        while (right < s.length()) {
            char c = s.charAt(right);
            windowCount[c]++;
            if (tCount[c] > 0 && windowCount[c] == tCount[c]) formed++;
            while (left <= right && formed == required) {
                c = s.charAt(left);
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }
                windowCount[c]--;
                if (tCount[c] > 0 && windowCount[c] < tCount[c]) formed--;
                left++;
            }
            right++;
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
    }
}`,
    cppCode: `string minWindow(string s, string t) {
    if (s.length() < t.length()) return "";
    vector<int> tCount(128, 0), windowCount(128, 0);
    for (char c : t) tCount[c]++;
    int required = 0;
    for (int count : tCount) if (count > 0) required++;
    int left = 0, right = 0, formed = 0;
    int minLen = INT_MAX, minLeft = 0;
    while (right < s.length()) {
        char c = s[right];
        windowCount[c]++;
        if (tCount[c] > 0 && windowCount[c] == tCount[c]) formed++;
        while (left <= right && formed == required) {
            c = s[left];
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            windowCount[c]--;
            if (tCount[c] > 0 && windowCount[c] < tCount[c]) formed--;
            left++;
        }
        right++;
    }
    return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
}`,
    pseudoCode: `FUNCTION minWindow(s, t):
    tCount = frequency map of t
    left = 0, right = 0, formed = 0, minLen = INF
    WHILE right < length(s) DO:
        add s[right] to window
        IF window satisfies char count THEN increment formed
        WHILE formed == required DO:
            update minLen and answer
            remove s[left] from window
            IF char count breaks THEN decrement formed
            increment left
        END WHILE
        increment right
    END WHILE
    RETURN answer
END FUNCTION`,
    timeComplexity: 'O(|S| + |T|)',
    spaceComplexity: 'O(1) for ASCII frequency map',
    applications: ['DNA sequence alignment', 'Search keyword highlighting'],
    interviewTips: ['Highlight two phase sliding window: expand right to become valid, shrink left to become optimal'],
    sampleInput: 's="ADOBECODEBANC", t="ABC"',
    sampleOutput: '"BANC"',
    quizzes: [
      { question: 'Time complexity of Minimum Window Substring using sliding window?', type: 'mcq', options: ['O(|S| + |T|)', 'O(|S| * |T|)', 'O(|S|²)', 'O(2^|S|)'], correctAnswer: 'O(|S| + |T|)', explanation: 'Both left and right pointers traverse string S at most once.', difficulty: 'easy', points: 10 },
      { question: 'What triggers contraction of left pointer?', type: 'mcq', options: ['Current window contains all required characters of T', 'right reaches end', 'Window size > T', 'Character mismatch'], correctAnswer: 'Current window contains all required characters of T', explanation: 'When valid, left pointer contracts window to find minimal valid length.', difficulty: 'easy', points: 10 },
      { question: 'What is returned if no valid window exists?', type: 'mcq', options: ['Empty string ""', 'String S', 'String T', 'NullPointerException'], correctAnswer: 'Empty string ""', explanation: 'Returns empty string when no window satisfies conditions.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of frequency map for ASCII characters?', type: 'mcq', options: ['O(1)', 'O(|S|)', 'O(|T|)', 'O(|S| * |T|)'], correctAnswer: 'O(1)', explanation: 'Array size 128 is constant space.', difficulty: 'medium', points: 15 },
      { question: 'Why keep `formed` counter variable?', type: 'mcq', options: ['Enables O(1) check whether window is valid instead of scanning map size 128', 'Tracks window size', 'Counts total characters', 'Stores answer'], correctAnswer: 'Enables O(1) check whether window is valid instead of scanning map size 128', explanation: 'formed variable avoids O(128) loop per step.', difficulty: 'medium', points: 15 },
      { question: 'Output for s="a", t="aa"?', type: 'mcq', options: ['""', '"a"', '"aa"', 'Error'], correctAnswer: '""', explanation: 'S has insufficient count of character "a" (1 < 2).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Minimum Window Substring (LeetCode 76)', description: 'Find minimum window in S containing all chars of T.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public String minWindow(String s, String t) {\n    return "";\n  }\n}', cpp: 'string minWindow(string s, string t) {\n  return "";\n}' }, testCases: [{ input: 's="ADOBECODEBANC", t="ABC"', expectedOutput: '"BANC"' }], solution: 'Expand right, shrink left when valid.', externalLink: 'https://leetcode.com/problems/minimum-window-substring/' },
      { title: 'Find All Anagrams in a String (LeetCode 438)', description: 'Find start indices of p\'s anagrams in s.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<int> findAnagrams(string s, string p) {\n  return {};\n}' }, testCases: [{ input: 's="cbaebabacd", p="abc"', expectedOutput: '[0,6]' }], solution: 'Fixed sliding window of size p.length().', externalLink: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
      { title: 'Permutation in String (LeetCode 567)', description: 'Check if s2 contains permutation of s1.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    return false;\n  }\n}', cpp: 'bool checkInclusion(string s1, string s2) {\n  return false;\n}' }, testCases: [{ input: 's1="ab", s2="eidbaooo"', expectedOutput: 'true' }], solution: 'Sliding window of length s1.length() matching character counts.', externalLink: 'https://leetcode.com/problems/permutation-in-string/' },
    ],
  },
  {
    slug: 'fixed-window-maximum',
    title: 'Fixed Window Maximum',
    topicGroup: 'Sliding Window',
    difficulty: 'medium',
    description: 'Find maximum element in every sliding window of size k.',
    theory: 'Use a monotonic double-ended queue (Deque) storing indices in decreasing order of values. For each element, remove smaller elements from back of deque, add current index, and remove out-of-window indices from front.',
    javaCode: `public class FixedWindowMaximum {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0 || k == 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        java.util.Deque<Integer> deque = new java.util.ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (i >= k - 1) {
                res[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return res;
    }
}`,
    cppCode: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    if (nums.empty() || k == 0) return {};
    int n = nums.size();
    vector<int> res;
    deque<int> dq;
    for (int i = 0; i < n; ++i) {
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            res.push_back(nums[dq.front()]);
        }
    }
    return res;
}`,
    pseudoCode: `FUNCTION maxSlidingWindow(nums, k):
    CREATE deque dq storing indices
    FOR i FROM 0 TO length(nums) - 1:
        IF dq is not empty AND dq.front < i - k + 1 THEN
            remove front of dq
        END IF
        WHILE dq is not empty AND nums[dq.back] <= nums[i] DO:
            remove back of dq
        END WHILE
        push i to back of dq
        IF i >= k - 1 THEN
            result[i - k + 1] = nums[dq.front]
        END IF
    END FOR
    RETURN result
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(k)',
    applications: ['Stream max tracking', 'Image processing max filter'],
    interviewTips: ['Each index enters and leaves deque at most once, yielding O(N) total time complexity'],
    sampleInput: '[1, 3, -1, -3, 5, 3, 6, 7], k=3',
    sampleOutput: '[3, 3, 5, 5, 6, 7]',
    quizzes: [
      { question: 'What is time complexity of Monotonic Deque Sliding Window Maximum?', type: 'mcq', options: ['O(N)', 'O(N * k)', 'O(N log k)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Each index is pushed and popped from deque at most once.', difficulty: 'easy', points: 10 },
      { question: 'Where is maximum element of current window located in monotonic deque?', type: 'mcq', options: ['Front of deque (deque.peekFirst())', 'Back of deque', 'Middle of deque', 'Random position'], correctAnswer: 'Front of deque (deque.peekFirst())', explanation: 'Deque maintains indices in decreasing order of element values.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of sliding window maximum?', type: 'mcq', options: ['O(k)', 'O(N)', 'O(1)', 'O(N²)', 'O(k)'], correctAnswer: 'O(k)', explanation: 'Deque contains at most k indices of current window.', difficulty: 'easy', points: 10 },
      { question: 'Why are elements smaller than nums[i] popped from back of deque?', type: 'mcq', options: ['Smaller older elements can never be maximum for future windows containing nums[i]', 'Frees RAM', 'Sorts array', 'Prevents overflow'], correctAnswer: 'Smaller older elements can never be maximum for future windows containing nums[i]', explanation: 'Current larger element nums[i] dominates older smaller elements.', difficulty: 'medium', points: 15 },
      { question: 'Naive Max Heap / PriorityQueue approach time complexity?', type: 'mcq', options: ['O(N log k)', 'O(N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N log k)', explanation: 'PriorityQueue push/pop operations take O(log k) per element.', difficulty: 'medium', points: 15 },
      { question: 'Output size of maxSlidingWindow for array size N and window k?', type: 'mcq', options: ['N - k + 1', 'N', 'k', 'N / k'], correctAnswer: 'N - k + 1', explanation: 'Total windows equals N - k + 1.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Sliding Window Maximum (LeetCode 239)', description: 'Find maximum in each sliding window of size k.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n  return {};\n}' }, testCases: [{ input: '[1,3,-1,-3,5,3,6,7], k=3', expectedOutput: '[3,3,5,5,6,7]' }], solution: 'Use monotonic decreasing deque.', externalLink: 'https://leetcode.com/problems/sliding-window-maximum/' },
      { title: 'Sliding Window Minimum', description: 'Find minimum element in each sliding window of size k.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] minSlidingWindow(int[] nums, int k) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> minSlidingWindow(vector<int>& nums, int k) {\n  return {};\n}' }, testCases: [{ input: '[1,3,-1,-3,5,3,6,7], k=3', expectedOutput: '[-1,-3,-3,-3,3,3]' }], solution: 'Use monotonic increasing deque.', externalLink: 'https://leetcode.com/' },
      { title: 'Constrained Subsequence Sum (LeetCode 1425)', description: 'Find max sum of subsequence where index difference is <= k.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    return 0;\n  }\n}', cpp: 'int constrainedSubsetSum(vector<int>& nums, int k) {\n  return 0;\n}' }, testCases: [{ input: '[10,2,-10,5,20], k=2', expectedOutput: '37' }], solution: 'Dynamic programming with monotonic deque max tracking.', externalLink: 'https://leetcode.com/problems/constrained-subsequence-sum/' },
    ],
  },
];
