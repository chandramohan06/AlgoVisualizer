import { ArrayAlgorithmData } from '../array.types';

export const MISCELLANEOUS_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'majority-element',
    title: 'Majority Element',
    topicGroup: 'Miscellaneous',
    difficulty: 'easy',
    description: 'Find element that appears more than ⌊n / 2⌋ times using Boyer-Moore Voting Algorithm.',
    theory: 'Boyer-Moore Voting Algorithm maintains `candidate` and `count`. If count == 0, candidate = num. If num == candidate, count++; else count--.',
    javaCode: `public class MajorityElement {
    public static int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
    cppCode: `int majorityElement(const vector<int>& nums) {
    int candidate = nums[0], count = 0;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
    pseudoCode: `FUNCTION majorityElement(nums):
    candidate = nums[0], count = 0
    FOR EACH num IN nums DO:
        IF count == 0 THEN candidate = num
        IF num == candidate THEN count = count + 1
        ELSE count = count - 1
    END FOR
    RETURN candidate
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Stream voting analysis', 'Fault tolerant consensus'],
    interviewTips: ['Boyer-Moore requires majority element (> N/2) to exist; otherwise a 2nd verification pass is required'],
    sampleInput: [2, 2, 1, 1, 1, 2, 2],
    sampleOutput: '2',
    quizzes: [
      { question: 'Time complexity of Boyer-Moore Voting Algorithm?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single pass over input array takes O(N) time.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of Boyer-Moore Voting Algorithm?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses only candidate and count variables.', difficulty: 'easy', points: 10 },
      { question: 'Majority element definition frequency threshold?', type: 'mcq', options: ['> N / 2', '>= N / 2', '> N / 3', 'N - 1'], correctAnswer: '> N / 2', explanation: 'Appears strictly more than floor(N/2) times.', difficulty: 'easy', points: 10 },
      { question: 'Why does Boyer-Moore work?', type: 'mcq', options: ['Majority element instances cancel out all non-majority elements combined', 'Sorts array', 'Uses hash table', 'Bitwise XOR'], correctAnswer: 'Majority element instances cancel out all non-majority elements combined', explanation: 'Count of majority items exceeds total sum of all other items.', difficulty: 'medium', points: 15 },
      { question: 'HashMap approach time and space complexity?', type: 'mcq', options: ['O(N) time, O(N) space', 'O(N²) time, O(1) space', 'O(N log N) time, O(1) space', 'O(1) time, O(N) space'], correctAnswer: 'O(N) time, O(N) space', explanation: 'HashMap counts frequencies in O(N) time using O(N) extra space.', difficulty: 'medium', points: 15 },
      { question: 'How many majority elements (> N/3) can exist in array of size N?', type: 'mcq', options: ['At most 2', 'At most 3', 'At most 1', 'N'], correctAnswer: 'At most 2', explanation: '3 * (N/3 + 1) = N + 3 > N, so at most 2 elements can appear > N/3 times.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Majority Element (LeetCode 169)', description: 'Find majority element (> N/2 times).', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int majorityElement(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int majorityElement(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[2,2,1,1,1,2,2]', expectedOutput: '2' }], solution: 'Boyer-Moore Voting Algorithm.', externalLink: 'https://leetcode.com/problems/majority-element/' },
      { title: 'Majority Element II (LeetCode 229)', description: 'Find all elements appearing > N/3 times.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public List<Integer> majorityElement(int[] nums) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<int> majorityElement(vector<int>& nums) {\n  return {};\n}' }, testCases: [{ input: '[3,2,3]', expectedOutput: '[3]' }], solution: 'Boyer-Moore with 2 candidates and 2 counters.', externalLink: 'https://leetcode.com/problems/majority-element-ii/' },
      { title: 'Check If a Number Is Majority Element in Sorted Array', description: 'Check if target is majority element in sorted array in O(log N) time.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean isMajorityElement(int[] nums, int target) {\n    return false;\n  }\n}', cpp: 'bool isMajorityElement(vector<int>& nums, int target) {\n  return false;\n}' }, testCases: [{ input: 'nums=[2,4,5,5,5,5,5,66,66], target=5', expectedOutput: 'true' }], solution: 'Use lower_bound to find first index and check nums[idx + N/2] == target.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'product-except-self',
    title: 'Product Except Self',
    topicGroup: 'Miscellaneous',
    difficulty: 'medium',
    description: 'Construct output array where res[i] is product of all elements except nums[i] without division.',
    theory: 'Compute left prefix products in first pass. Then iterate right to left accumulating right suffix product into result.',
    javaCode: `public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] = res[i] * right;
            right *= nums[i];
        }
        return res;
    }
}`,
    cppCode: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    for (int i = 1; i < n; ++i) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    int right = 1;
    for (int i = n - 1; i >= 0; --i) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`,
    pseudoCode: `FUNCTION productExceptSelf(nums):
    n = length(nums)
    res[0] = 1
    FOR i FROM 1 TO n - 1:
        res[i] = res[i - 1] * nums[i - 1]
    END FOR
    right = 1
    FOR i FROM n - 1 DOWN TO 0:
        res[i] = res[i] * right
        right = right * nums[i]
    END FOR
    RETURN res
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) auxiliary space (excluding result array)',
    applications: ['Cumulative product metrics', 'Probability calculations without division'],
    interviewTips: ['Problem forbids division operator `/`; prefix-suffix products technique runs in O(N) time and O(1) extra space'],
    sampleInput: [1, 2, 3, 4],
    sampleOutput: '[24, 12, 8, 6]',
    quizzes: [
      { question: 'Why is division operator `/` forbidden in standard Product Except Self question?', type: 'mcq', options: ['Handling zeroes requires special cases and problem tests prefix-suffix array concepts', 'Division is illegal', 'Saves CPU', 'Division is non-deterministic'], correctAnswer: 'Handling zeroes requires special cases and problem tests prefix-suffix array concepts', explanation: 'Division by zero fails and division hides prefix product algorithm design.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of two pass prefix-suffix product algorithm?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Two linear passes take O(N) operations.', difficulty: 'easy', points: 10 },
      { question: 'Auxiliary space complexity excluding output array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Uses scalar variable `right` for suffix product accumulation.', difficulty: 'easy', points: 10 },
      { question: 'If input array contains two or more zeroes, what is output array?', type: 'mcq', options: ['All zeroes [0, 0, ..., 0]', 'Original array', 'All ones', 'Throws exception'], correctAnswer: 'All zeroes [0, 0, ..., 0]', explanation: 'Every element product will include at least one 0.', difficulty: 'medium', points: 15 },
      { question: 'If input array contains exactly one zero at index k, what is res[k]?', type: 'mcq', options: ['Product of all non-zero elements', '0', '1', '-1'], correctAnswer: 'Product of all non-zero elements', explanation: 'res[k] excludes nums[k] (the zero), yielding non-zero product.', difficulty: 'medium', points: 15 },
      { question: 'What is res[i] for i != k when exactly one zero exists at index k?', type: 'mcq', options: ['0', 'Product of non-zeroes', '1', 'nums[i]'], correctAnswer: '0', explanation: 'res[i] includes zero from nums[k], making product 0.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Product of Array Except Self (LeetCode 238)', description: 'Return array of products except self without division.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> productExceptSelf(vector<int>& nums) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]' }], solution: 'Prefix product forward pass, suffix product backward pass.', externalLink: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { title: 'Construct Target Array With Multiple Sums', description: 'Reverse engineer sum operations.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public boolean isPossible(int[] target) {\n    return false;\n  }\n}', cpp: 'bool isPossible(vector<int>& target) {\n  return false;\n}' }, testCases: [{ input: '[9,3,5]', expectedOutput: 'true' }], solution: 'Max heap working backwards subtracting sum of rest.', externalLink: 'https://leetcode.com/problems/construct-target-array-with-multiple-sums/' },
      { title: 'Maximum Product of Three Numbers (LeetCode 628)', description: 'Find maximum product of 3 numbers in array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int maximumProduct(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int maximumProduct(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '24' }], solution: 'Max of product of 3 largest vs 2 smallest negative * 1 largest.', externalLink: 'https://leetcode.com/problems/maximum-product-of-three-numbers/' },
    ],
  },
  {
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time To Buy And Sell Stock',
    topicGroup: 'Miscellaneous',
    difficulty: 'easy',
    description: 'Find max profit from 1 transaction (buy one day, sell on a future day).',
    theory: 'Maintain `minPrice` seen so far. For each price, compute `profit = price - minPrice` and update `maxProfit = max(maxProfit, profit)`.',
    javaCode: `public class StockBuySell {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        return maxProfit;
    }
}`,
    cppCode: `int maxProfit(const vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
    pseudoCode: `FUNCTION maxProfit(prices):
    minPrice = INF, maxProfit = 0
    FOR EACH price IN prices DO:
        minPrice = MIN(minPrice, price)
        maxProfit = MAX(maxProfit, price - minPrice)
    END FOR
    RETURN maxProfit
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Financial trading simulation', 'Max gain tracking'],
    interviewTips: ['Single pass O(N) time & O(1) space by tracking minimum price so far'],
    sampleInput: [7, 1, 5, 3, 6, 4],
    sampleOutput: '5 (buy at 1, sell at 6)',
    quizzes: [
      { question: 'Time complexity of Best Time to Buy and Sell Stock single pass?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single loop iterating over prices array.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Tracks minPrice and maxProfit using constant space.', difficulty: 'easy', points: 10 },
      { question: 'What is max profit for monotonically decreasing prices [7, 6, 4, 3, 1]?', type: 'mcq', options: ['0', '-6', '7', '1'], correctAnswer: '0', explanation: 'No profitable transaction can be made; max profit is 0.', difficulty: 'easy', points: 10 },
      { question: 'Brute force time complexity checking all (buy, sell) pairs?', type: 'mcq', options: ['O(N²)', 'O(N)', 'O(N log N)', 'O(2^N)'], correctAnswer: 'O(N²)', explanation: 'Checking all pairs (i, j) with i < j takes N(N-1)/2 = O(N²).', difficulty: 'medium', points: 15 },
      { question: 'Can you sell before buying stock?', type: 'mcq', options: ['No, buy day i must precede sell day j (i < j)', 'Yes', 'Always', 'Only short selling'], correctAnswer: 'No, buy day i must precede sell day j (i < j)', explanation: 'Standard rules mandate buying before selling.', difficulty: 'medium', points: 15 },
      { question: 'Best Time to Buy and Sell Stock II allows unlimited transactions. How to solve?', type: 'mcq', options: ['Sum all positive price differences prices[i] - prices[i-1]', 'Kadane', 'Binary search', 'Matrix multiplication'], correctAnswer: 'Sum all positive price differences prices[i] - prices[i-1]', explanation: 'Greedy strategy accumulates every upward price slope.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Best Time to Buy and Sell Stock (LeetCode 121)', description: 'Find max profit from 1 transaction.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int maxProfit(int[] prices) {\n    return 0;\n  }\n}', cpp: 'int maxProfit(vector<int>& prices) {\n  return 0;\n}' }, testCases: [{ input: '[7,1,5,3,6,4]', expectedOutput: '5' }], solution: 'Single pass minPrice tracking.', externalLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { title: 'Best Time to Buy and Sell Stock II (LeetCode 122)', description: 'Find max profit from unlimited transactions.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int maxProfit(int[] prices) {\n    return 0;\n  }\n}', cpp: 'int maxProfit(vector<int>& prices) {\n  return 0;\n}' }, testCases: [{ input: '[7,1,5,3,6,4]', expectedOutput: '7' }], solution: 'Greedy sum of positive price differences.', externalLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/' },
      { title: 'Best Time to Buy and Sell Stock III (LeetCode 123)', description: 'Find max profit from at most 2 transactions.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int maxProfit(int[] prices) {\n    return 0;\n  }\n}', cpp: 'int maxProfit(vector<int>& prices) {\n  return 0;\n}' }, testCases: [{ input: '[3,3,5,0,0,3,1,4]', expectedOutput: '6' }], solution: 'Dynamic programming tracking buy1, sell1, buy2, sell2.', externalLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/' },
    ],
  },
  {
    slug: 'missing-number',
    title: 'Missing Number',
    topicGroup: 'Miscellaneous',
    difficulty: 'easy',
    description: 'Find the one number missing from range [0, n] in an array of n distinct numbers.',
    theory: 'Optimal method uses XOR bitwise property (x ^ x = 0). XOR all indices 0..n and array elements. Unmatched number is the missing one. Alternatively use Gauss sum formula `n*(n+1)/2 - sum(nums)`.',
    javaCode: `public class MissingNumber {
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int xor = n;
        for (int i = 0; i < n; i++) {
            xor ^= i ^ nums[i];
        }
        return xor;
    }
}`,
    cppCode: `int missingNumber(const vector<int>& nums) {
    int n = nums.size();
    int xorVal = n;
    for (int i = 0; i < n; ++i) {
        xorVal ^= i ^ nums[i];
    }
    return xorVal;
}`,
    pseudoCode: `FUNCTION missingNumber(nums):
    n = length(nums)
    xorVal = n
    FOR i FROM 0 TO n - 1:
        xorVal = xorVal XOR i XOR nums[i]
    END FOR
    RETURN xorVal
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Sequence gap detection', 'Checksum validation'],
    interviewTips: ['XOR method prevents integer overflow inherent in Gauss sum formula `n*(n+1)/2` for large n'],
    sampleInput: [3, 0, 1],
    sampleOutput: '2',
    quizzes: [
      { question: 'What is time complexity of XOR Missing Number algorithm?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single pass XORing indices and elements takes O(N) time.', difficulty: 'easy', points: 10 },
      { question: 'What is space complexity of XOR Missing Number algorithm?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses constant space for xor variable.', difficulty: 'easy', points: 10 },
      { question: 'Gauss sum formula for sum of first n integers 0..n?', type: 'mcq', options: ['n * (n + 1) / 2', 'n * n', 'n * (n - 1) / 2', '2^n'], correctAnswer: 'n * (n + 1) / 2', explanation: 'Standard arithmetic progression sum formula.', difficulty: 'easy', points: 10 },
      { question: 'Why is XOR approach preferred over Gauss sum for large n in 32-bit systems?', type: 'mcq', options: ['XOR never causes integer overflow; n*(n+1) can overflow 32-bit int', 'XOR is O(1)', 'Gauss sum is wrong', 'XOR uses less memory'], correctAnswer: 'XOR never causes integer overflow; n*(n+1) can overflow 32-bit int', explanation: 'n * (n + 1) exceeds INT_MAX when n > 65535.', difficulty: 'medium', points: 15 },
      { question: 'Property of XOR used to find missing number?', type: 'mcq', options: ['x ^ x = 0 and x ^ 0 = x', 'x ^ x = x', 'x ^ 1 = 0', 'x ^ y = x + y'], correctAnswer: 'x ^ x = 0 and x ^ 0 = x', explanation: 'Identical numbers cancel out to 0, leaving only missing number.', difficulty: 'medium', points: 15 },
      { question: 'If array is sorted, how to find missing number in O(log N) time?', type: 'mcq', options: ['Binary Search checking if nums[mid] == mid', 'Linear Search', 'QuickSort', 'Two Pointers'], correctAnswer: 'Binary Search checking if nums[mid] == mid', explanation: 'If nums[mid] == mid, missing number is in right half; else left half.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Missing Number (LeetCode 268)', description: 'Find missing number in range [0, n].', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int missingNumber(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int missingNumber(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[3,0,1]', expectedOutput: '2' }], solution: 'XOR bitwise scan or Gauss sum.', externalLink: 'https://leetcode.com/problems/missing-number/' },
      { title: 'Find All Numbers Disappeared in an Array (LeetCode 448)', description: 'Find all numbers in [1, n] missing from array in O(N) time & O(1) space.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<int> findDisappearedNumbers(vector<int>& nums) {\n  return {};\n}' }, testCases: [{ input: '[4,3,2,7,8,2,3,1]', expectedOutput: '[5,6]' }], solution: 'In-place element negation index mapping.', externalLink: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
      { title: 'First Missing Positive (LeetCode 41)', description: 'Find smallest missing positive integer in O(N) time and O(1) space.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int firstMissingPositive(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int firstMissingPositive(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[3,4,-1,1]', expectedOutput: '2' }], solution: 'Cyclic sort placing nums[i] at index nums[i] - 1.', externalLink: 'https://leetcode.com/problems/first-missing-positive/' },
    ],
  },
  {
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    topicGroup: 'Miscellaneous',
    difficulty: 'hard',
    description: 'Compute total water trapped after raining given elevation map height.',
    theory: 'Maintain two pointers `left` at 0 and `right` at N-1. Track `leftMax` and `rightMax`. If height[left] < height[right], water trapped at left is max(0, leftMax - height[left]), then advance left; else process right.',
    javaCode: `public class TrappingRainWater {
    public static int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
    cppCode: `int trap(const vector<int>& height) {
    int left = 0, right = (int)height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
    pseudoCode: `FUNCTION trap(height):
    left = 0, right = length(height) - 1
    leftMax = 0, rightMax = 0, water = 0
    WHILE left < right DO:
        IF height[left] < height[right] THEN
            IF height[left] >= leftMax THEN leftMax = height[left]
            ELSE water = water + (leftMax - height[left])
            left = left + 1
        ELSE
            IF height[right] >= rightMax THEN rightMax = height[right]
            ELSE water = water + (rightMax - height[right])
            right = right - 1
        END IF
    END WHILE
    RETURN water
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Terrain water retention simulation', '3D topography drainage'],
    interviewTips: ['Optimal Two Pointer approach reduces space from O(N) prefix arrays to O(1) extra space'],
    sampleInput: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    sampleOutput: '6',
    quizzes: [
      { question: 'What is time complexity of Two Pointer Trapping Rain Water?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Single pass with left and right pointers traversing array.', difficulty: 'easy', points: 10 },
      { question: 'What is space complexity of Two Pointer solution?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses scalar variables for left, right, leftMax, rightMax, water.', difficulty: 'easy', points: 10 },
      { question: 'Water trapped at position i is determined by?', type: 'mcq', options: ['min(leftMax, rightMax) - height[i]', 'max(leftMax, rightMax) - height[i]', 'leftMax + rightMax', 'height[i]'], correctAnswer: 'min(leftMax, rightMax) - height[i]', explanation: 'Water level is bounded by the shorter surrounding peak minus bar height.', difficulty: 'easy', points: 10 },
      { question: 'Dynamic Programming approach space complexity for prefix max arrays?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'DP approach uses leftMax[N] and rightMax[N] arrays requiring O(N) space.', difficulty: 'medium', points: 15 },
      { question: 'Can water be trapped on boundary bars at index 0 or N-1?', type: 'mcq', options: ['No, because boundary bars have no outer wall to retain water', 'Yes', 'Always', 'Only if N > 10'], correctAnswer: 'No, because boundary bars have no outer wall to retain water', explanation: 'Boundary bars cannot hold water because there is no outer boundary wall.', difficulty: 'medium', points: 15 },
      { question: 'Monotonic stack approach for Trapping Rain Water time & space complexity?', type: 'mcq', options: ['O(N) time, O(N) space', 'O(N²) time, O(1) space', 'O(N log N) time, O(N) space', 'O(1) time, O(N) space'], correctAnswer: 'O(N) time, O(N) space', explanation: 'Monotonic decreasing stack processes bars in O(N) time and O(N) space.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Trapping Rain Water (LeetCode 42)', description: 'Calculate total trapped rain water.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int trap(int[] height) {\n    return 0;\n  }\n}', cpp: 'int trap(vector<int>& height) {\n  return 0;\n}' }, testCases: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' }], solution: 'Two pointer approach tracking leftMax and rightMax.', externalLink: 'https://leetcode.com/problems/trapping-rain-water/' },
      { title: 'Trapping Rain Water II (LeetCode 407)', description: 'Calculate trapped rain water on 2D 3D elevation map.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int trapRainWater(int[][] heightMap) {\n    return 0;\n  }\n}', cpp: 'int trapRainWater(vector<vector<int>>& heightMap) {\n  return 0;\n}' }, testCases: [{ input: '[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]', expectedOutput: '4' }], solution: 'Min-Heap priority queue processing boundary grid cells inward.', externalLink: 'https://leetcode.com/problems/trapping-rain-water-ii/' },
      { title: 'Container With Most Water (LeetCode 11)', description: 'Find maximum area of water container between two lines.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int maxArea(int[] height) {\n    return 0;\n  }\n}', cpp: 'int maxArea(vector<int>& height) {\n  return 0;\n}' }, testCases: [{ input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' }], solution: 'Two pointers at boundaries moving shorter line inward.', externalLink: 'https://leetcode.com/problems/container-with-most-water/' },
    ],
  },
];
