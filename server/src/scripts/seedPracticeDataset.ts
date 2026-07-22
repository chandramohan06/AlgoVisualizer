import 'dotenv/config';
import mongoose from 'mongoose';
import { env } from '../config/env';
import { PracticeProblem } from '../models/PracticeProblem.model';
import { Difficulty } from '@algovisualizer/shared';

const canonicalProblems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    leetcodeNumber: 1,
    category: 'Arrays',
    pattern: 'Hashing',
    difficulty: Difficulty.EASY,
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Adobe'],
    tags: ['Array', 'Hash Table'],
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    estimatedTimeMinutes: 15,
    learningOrder: 1,
    prerequisites: ['Array Indexing', 'Hash Map Basics'],
    overview: 'Given an array of integers `nums` and a target integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input would have exactly one solution.',
    hints: [
      'A brute force approach checks all unique pairs using a nested loop in O(N^2) time.',
      'Instead of re-scanning the array for `target - nums[i]`, can we use a hash map to look up complements in O(1) time?',
      'Iterate through the array once: for each element `nums[i]`, compute `complement = target - nums[i]`. If `complement` exists in the hash map, return its index and `i`. Otherwise, insert `nums[i]` with index `i` into the map.',
    ],
    approaches: [
      {
        name: 'Brute Force',
        explanation: 'Check every possible pair (i, j) where i != j and test if nums[i] + nums[j] == target.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1)',
      },
      {
        name: 'Optimal (Hash Map)',
        explanation: 'Use a hash map to store each number and its index. As we iterate, check if `target - current_val` is already in the map.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
      },
    ],
    codeSnippets: {
      java: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[]{ map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (mp.count(complement)) return {mp[complement], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
      pseudo: `function twoSum(nums, target):\n    map = empty HashMap\n    for i from 0 to len(nums)-1:\n        comp = target - nums[i]\n        if comp in map:\n            return [map[comp], i]\n        map[nums[i]] = i\n    return []`,
    },
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      explanation: 'We iterate through the list of length N once. Each hash map lookup/insertion takes O(1) average time.',
    },
    commonMistakes: [
      'Using the same element twice (e.g. returning [0, 0] when target is 2 * nums[0]).',
      'Modifying or sorting the array before returning original indices.',
    ],
    relatedSlugs: ['3sum', 'two-sum-ii-input-array-is-sorted'],
    visualizerSlug: 'linear-search',
    visualizerCategory: 'arrays',
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    leetcodeNumber: 121,
    category: 'Arrays',
    pattern: 'Kadane',
    difficulty: Difficulty.EASY,
    companies: ['Amazon', 'Microsoft', 'Google', 'Uber', 'TCS'],
    tags: ['Array', 'Dynamic Programming'],
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    estimatedTimeMinutes: 15,
    learningOrder: 2,
    prerequisites: ['Array Traversal'],
    overview: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    hints: [
      'Track the minimum price seen so far as you traverse the array.',
      'At each price, calculate potential profit = `currentPrice - minPrice`.',
      'Update the overall maximum profit encountered.',
    ],
    approaches: [
      {
        name: 'Brute Force',
        explanation: 'Check all buy-sell day pairs (i, j) where j > i and compute max profit.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1)',
      },
      {
        name: 'Optimal (Single Pass)',
        explanation: 'Maintain minPrice = infinity and maxProfit = 0. Iterate through prices once, updating minPrice and maxProfit at each step.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
      },
    ],
    codeSnippets: {
      java: `public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int maxProfit = 0;\n    for (int price : prices) {\n        if (price < minPrice) minPrice = price;\n        else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n    }\n    return maxProfit;\n}`,
      cpp: `int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX, maxProfit = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}`,
      python: `def maxProfit(prices: list[int]) -> int:\n    min_price, max_profit = float('inf'), 0\n    for price in prices:\n        min_price = min(min_price, price)\n        max_profit = max(max_profit, price - min_price)\n    return max_profit`,
      pseudo: `function maxProfit(prices):\n    minPrice = infinity, maxProfit = 0\n    for price in prices:\n        minPrice = min(minPrice, price)\n        maxProfit = max(maxProfit, price - minPrice)\n    return maxProfit`,
    },
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      explanation: 'Single pass of length N with O(1) auxiliary variables.',
    },
    commonMistakes: [
      'Trying to sell before buying (e.g. picking a price at index 0 after buying at index 3).',
    ],
    relatedSlugs: ['best-time-to-buy-and-sell-stock-ii', 'maximum-subarray'],
    visualizerSlug: 'kadane-algorithm',
    visualizerCategory: 'dynamic-programming',
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    leetcodeNumber: 11,
    category: 'Arrays',
    pattern: 'Two Pointer',
    difficulty: Difficulty.MEDIUM,
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'],
    tags: ['Array', 'Two Pointers', 'Greedy'],
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    estimatedTimeMinutes: 20,
    learningOrder: 3,
    prerequisites: ['Two Pointers Technique'],
    overview: 'Given n non-negative integers representing vertical lines on a graph, find two lines that together with the x-axis forms a container that holds the most water.',
    hints: [
      'Start with pointers at both ends (left = 0, right = n - 1).',
      'The area is limited by the shorter line: `(right - left) * min(height[left], height[right])`.',
      'To potentially find a larger area, move the pointer pointing to the shorter line inward.',
    ],
    approaches: [
      {
        name: 'Brute Force',
        explanation: 'Evaluate all possible pairs of lines and find the maximum area.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1)',
      },
      {
        name: 'Optimal (Two Pointers)',
        explanation: 'Place left pointer at start, right pointer at end. Shrink the boundary from the shorter wall inward.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
      },
    ],
    codeSnippets: {
      java: `public int maxArea(int[] height) {\n    int l = 0, r = height.length - 1, max = 0;\n    while (l < r) {\n        int area = (r - l) * Math.min(height[l], height[r]);\n        max = Math.max(max, area);\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return max;\n}`,
      cpp: `int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxA = 0;\n    while (l < r) {\n        maxA = max(maxA, (r - l) * min(height[l], height[r]));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}`,
      python: `def maxArea(height: list[int]) -> int:\n    l, r, max_a = 0, len(height) - 1, 0\n    while l < r:\n        max_a = max(max_a, (r - l) * min(height[l], height[r]))\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_a`,
      pseudo: `function maxArea(height):\n    l = 0, r = len(height)-1, maxArea = 0\n    while l < r:\n        area = (r - l) * min(height[l], height[r])\n        maxArea = max(maxArea, area)\n        if height[l] < height[r]: l++ else: r--\n    return maxArea`,
    },
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      explanation: 'Every step moves either left or right pointer, terminating in at most N steps.',
    },
    commonMistakes: ['Moving the taller pointer instead of the shorter pointer.'],
    relatedSlugs: ['trapping-rain-water', 'two-sum-ii-input-array-is-sorted'],
    visualizerSlug: 'two-pointers',
    visualizerCategory: 'arrays',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    leetcodeNumber: 3,
    category: 'Strings',
    pattern: 'Sliding Window',
    difficulty: Difficulty.MEDIUM,
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Atlassian'],
    tags: ['String', 'Sliding Window', 'Hash Table'],
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    estimatedTimeMinutes: 20,
    learningOrder: 4,
    prerequisites: ['Sliding Window Pattern'],
    overview: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    hints: [
      'Use a sliding window `[left, right]` and a hash set / map of character indices.',
      'When character `s[right]` is already in the window, advance `left` to `map[s[right]] + 1`.',
      'Record the maximum window length `right - left + 1` at each iteration.',
    ],
    approaches: [
      {
        name: 'Optimal (Sliding Window)',
        explanation: 'Maintain character index map. Move right pointer; if duplicate found, jump left pointer to after the duplicate.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, M)) where M is alphabet size',
      },
    ],
    codeSnippets: {
      java: `public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> map = new HashMap<>();\n    int maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (map.containsKey(c)) left = Math.max(left, map.get(c) + 1);\n        map.put(c, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      cpp: `int lengthOfLongestSubstring(string s) {\n    vector<int> last(256, -1);\n    int maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        if (last[s[right]] >= left) left = last[s[right]] + 1;\n        last[s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    seen = {}\n    max_len = left = 0\n    for right, char in enumerate(s):\n        if char in seen and seen[char] >= left:\n            left = seen[char] + 1\n        seen[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
      pseudo: `function lengthOfLongestSubstring(s):\n    seen = map, left = 0, maxLen = 0\n    for right = 0 to len(s)-1:\n        if s[right] in seen and seen[s[right]] >= left:\n            left = seen[s[right]] + 1\n        seen[s[right]] = right\n        maxLen = max(maxLen, right - left + 1)\n    return maxLen`,
    },
    complexity: {
      time: 'O(N)',
      space: 'O(1) auxiliary space (character set capped at 128/256)',
      explanation: 'Each character is visited at most twice (by right and left pointers).',
    },
    commonMistakes: ['Moving left pointer backward when encountering an old duplicate outside the current window.'],
    relatedSlugs: ['minimum-window-substring', 'fruit-into-baskets'],
    visualizerSlug: 'sliding-window',
    visualizerCategory: 'strings',
  },
];

async function seedPractice() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas for practice dataset seeding...');

    for (const prob of canonicalProblems) {
      await PracticeProblem.findOneAndUpdate(
        { slug: prob.slug },
        prob,
        { upsert: true, new: true },
      );
      console.log(`Seeded Practice Problem: ${prob.title} (${prob.pattern})`);
    }

    console.log('✅ Practice Problem Dataset Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedPractice();
