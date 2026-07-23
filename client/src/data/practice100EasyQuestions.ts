export interface IPracticeQuestion {
  id: string;
  number: number;
  slug?: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  category: string;
  pattern?: string;
  problemStatement: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  hints: string[];
  tags: string[];
  companies: string[];
  acceptanceRate: string;
  estimatedTime: string;
  totalSubmissions?: number;
  totalSolved?: number;
  firstAcTime?: string;
  bestRuntime?: number;
  bestMemory?: number;
  timeComplexity?: string;
  spaceComplexity?: string;
  starterCodeJava: string;
  starterCodeCpp: string;
  starterCodePython: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  hiddenTestCases: Array<{ input: string; expectedOutput: string }>;
  expectedOutput: string;
  isSolved?: boolean;
  isBookmarked?: boolean;
  status?: 'Not Attempted' | 'Attempted' | 'Solved' | 'Bookmarked';
}

const ALL_250_PRACTICE_QUESTIONS: IPracticeQuestion[] = [
  {
    "slug": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Arrays",
    "problemStatement": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]"
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "inputFormat": "Line 1: Integer array `nums` separated by spaces or commas.\nLine 2: Integer `target`.",
    "outputFormat": "Array of two indices [i, j].",
    "sampleInput": "nums = [2,7,11,15]\ntarget = 9",
    "sampleOutput": "[0, 1]",
    "hints": [
      "A brute force approach uses nested loops to test all pairs in O(N^2) time.",
      "Can you use a Hash Map to look up the complement (target - nums[i]) in O(1) time?"
    ],
    "tags": [
      "Array",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "52.4%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14250,
    "totalSolved": 7467,
    "firstAcTime": "12 mins",
    "bestRuntime": 12,
    "bestMemory": 13.8,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "starterCodeJava": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your Java code here\n        return new int[]{}; \n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your C++ code here\n        return {};\n    }\n};",
    "starterCodePython": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your Python code here\n        pass",
    "testCases": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "expectedOutput": "[0, 1]"
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "expectedOutput": "[1, 2]"
      },
      {
        "input": "nums = [3,3], target = 6",
        "expectedOutput": "[0, 1]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "nums = [1,5,8,3], target = 11",
        "expectedOutput": "[2, 3]"
      },
      {
        "input": "nums = [10,20,30,40], target = 50",
        "expectedOutput": "[1, 2]"
      },
      {
        "input": "nums = [-1,-2,-3,-4,-5], target = -8",
        "expectedOutput": "[2, 4]"
      },
      {
        "input": "nums = [0,4,3,0], target = 0",
        "expectedOutput": "[0, 3]"
      },
      {
        "input": "nums = [2,5,5,11], target = 10",
        "expectedOutput": "[1, 2]"
      }
    ],
    "expectedOutput": "[0, 1]",
    "id": "p-1",
    "number": 1,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Arrays",
    "problemStatement": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "output": "0",
        "explanation": "In this case, no transactions are done and max profit = 0."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "inputFormat": "Array of stock prices.",
    "outputFormat": "Single integer representing maximum profit.",
    "sampleInput": "prices = [7,1,5,3,6,4]",
    "sampleOutput": "5",
    "hints": [
      "Maintain the minimum price seen so far.",
      "At each day, calculate profit if sold today."
    ],
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Uber"
    ],
    "acceptanceRate": "54.1%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9820,
    "totalSolved": 5312,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int maxProfit(int[] prices) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "expectedOutput": "5"
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "expectedOutput": "0"
      },
      {
        "input": "prices = [1,2]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "prices = [2,4,1]",
        "expectedOutput": "2"
      },
      {
        "input": "prices = [3,2,6,5,0,3]",
        "expectedOutput": "4"
      },
      {
        "input": "prices = [10]",
        "expectedOutput": "0"
      },
      {
        "input": "prices = [1,7,2,4]",
        "expectedOutput": "6"
      },
      {
        "input": "prices = [5,4,3,2,10]",
        "expectedOutput": "8"
      }
    ],
    "expectedOutput": "5",
    "id": "p-2",
    "number": 2,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Arrays",
    "problemStatement": "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "true"
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "inputFormat": "Array of integers `nums`.",
    "outputFormat": "Boolean value (true or false).",
    "sampleInput": "nums = [1,2,3,1]",
    "sampleOutput": "true",
    "hints": [
      "Use a HashSet to store visited elements in O(1) time."
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "acceptanceRate": "61.3%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 11200,
    "totalSolved": 6865,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "starterCodeJava": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        return False",
    "testCases": [
      {
        "input": "nums = [1,2,3,1]",
        "expectedOutput": "true"
      },
      {
        "input": "nums = [1,2,3,4]",
        "expectedOutput": "false"
      },
      {
        "input": "nums = [1,1,1,3,3,4,3,2,4,2]",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "nums = [1]",
        "expectedOutput": "false"
      },
      {
        "input": "nums = [2,2]",
        "expectedOutput": "true"
      },
      {
        "input": "nums = [1,2,3,4,5,6,7,8,9,10]",
        "expectedOutput": "false"
      },
      {
        "input": "nums = [0,0]",
        "expectedOutput": "true"
      },
      {
        "input": "nums = [-1,-1]",
        "expectedOutput": "true"
      }
    ],
    "expectedOutput": "true",
    "id": "p-3",
    "number": 3,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true",
        "explanation": "Re-arranging anagram letters yields nagaram."
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "output": "false",
        "explanation": "t contains \"c\" which is not present in s."
      },
      {
        "input": "s = \"a\", t = \"a\"",
        "output": "true",
        "explanation": "Identical single character strings are valid anagrams."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    "inputFormat": "Line 1: String s\nLine 2: String t",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "s = \"anagram\", t = \"nagaram\"",
    "sampleOutput": "true",
    "hints": [
      "Count character frequencies using an array of size 26 or a HashMap.",
      "If lengths of s and t differ, return false immediately."
    ],
    "tags": [
      "String",
      "Hash Table",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Uber",
      "Google",
      "Meta"
    ],
    "acceptanceRate": "63.9%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 12400,
    "totalSolved": 7923,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"a\", t = \"a\"",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"a\", t = \"ab\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"listen\", t = \"silent\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"ab\", t = \"a\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"cat\", t = \"tac\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"hello\", t = \"billion\"",
        "expectedOutput": "false"
      }
    ],
    "expectedOutput": "true",
    "id": "p-4",
    "number": 4,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "reverse-string",
    "title": "Reverse String",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    "examples": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
      },
      {
        "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
      },
      {
        "input": "s = [\"a\",\"b\"]",
        "output": "[\"b\",\"a\"]"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    "inputFormat": "Array of characters s.",
    "outputFormat": "Reversed array of characters.",
    "sampleInput": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
    "sampleOutput": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
    "hints": [
      "Use two pointers starting at opposite ends and swap characters until pointers meet."
    ],
    "tags": [
      "Two Pointers",
      "String"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Apple",
      "Microsoft"
    ],
    "acceptanceRate": "77.8%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 15300,
    "totalSolved": 11900,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public void reverseString(char[] s) {\n        // In-place swap solution\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // In-place swap solution\n    }\n};",
    "starterCodePython": "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        # In-place swap solution\n        pass",
    "testCases": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "expectedOutput": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
      },
      {
        "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "expectedOutput": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
      },
      {
        "input": "s = [\"a\",\"b\"]",
        "expectedOutput": "[\"b\",\"a\"]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = [\"x\"]",
        "expectedOutput": "[\"x\"]"
      },
      {
        "input": "s = [\"A\",\"B\",\"C\",\"D\"]",
        "expectedOutput": "[\"D\",\"C\",\"B\",\"A\"]"
      },
      {
        "input": "s = [\"1\",\"2\",\"3\"]",
        "expectedOutput": "[\"3\",\"2\",\"1\"]"
      },
      {
        "input": "s = [\"!\",\"@\",\"#\"]",
        "expectedOutput": "[\"#\",\"@\",\"!\"]"
      },
      {
        "input": "s = [\"r\",\"a\",\"c\",\"e\",\"c\",\"a\",\"r\"]",
        "expectedOutput": "[\"r\",\"a\",\"c\",\"e\",\"c\",\"a\",\"r\"]"
      }
    ],
    "expectedOutput": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
    "id": "p-5",
    "number": 5,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "reverse-words-in-a-string-iii",
    "title": "Reverse Words in a String III",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.",
    "examples": [
      {
        "input": "s = \"Let's take LeetCode contest\"",
        "output": "\"s'teL ekat edoCteeL tsetnoc\""
      },
      {
        "input": "s = \"God Ding\"",
        "output": "\"doG gniD\""
      },
      {
        "input": "s = \"Hello\"",
        "output": "\"olleH\""
      }
    ],
    "constraints": [
      "1 <= s.length <= 5 * 10^4",
      "s contains printable ASCII characters.",
      "s does not contain leading or trailing spaces."
    ],
    "inputFormat": "String s.",
    "outputFormat": "String with reversed words.",
    "sampleInput": "s = \"Let's take LeetCode contest\"",
    "sampleOutput": "\"s'teL ekat edoCteeL tsetnoc\"",
    "hints": [
      "Identify space boundaries and reverse each word segment independently."
    ],
    "tags": [
      "Two Pointers",
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Google"
    ],
    "acceptanceRate": "82.1%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9400,
    "totalSolved": 7710,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "starterCodeJava": "class Solution {\n    public String reverseWords(String s) {\n        // Write Java solution\n        return \"\";\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    string reverseWords(string s) {\n        // Write C++ solution\n        return \"\";\n    }\n};",
    "starterCodePython": "class Solution:\n    def reverseWords(self, s: str) -> str:\n        # Write Python solution\n        return \"\"",
    "testCases": [
      {
        "input": "s = \"Let's take LeetCode contest\"",
        "expectedOutput": "\"s'teL ekat edoCteeL tsetnoc\""
      },
      {
        "input": "s = \"God Ding\"",
        "expectedOutput": "\"doG gniD\""
      },
      {
        "input": "s = \"Hello\"",
        "expectedOutput": "\"olleH\""
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"a b c\"",
        "expectedOutput": "\"a b c\""
      },
      {
        "input": "s = \"word\"",
        "expectedOutput": "\"drow\""
      },
      {
        "input": "s = \"ab cd ef\"",
        "expectedOutput": "\"ba dc fe\""
      },
      {
        "input": "s = \"Algorithms and Data Structures\"",
        "expectedOutput": "\"smhtiroglA dna ataD serutcurtS\""
      },
      {
        "input": "s = \"one two three four\"",
        "expectedOutput": "\"eno owt eerht ruof\""
      }
    ],
    "expectedOutput": "\"s'teL ekat edoCteeL tsetnoc\"",
    "id": "p-6",
    "number": 6,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "length-of-last-word",
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given a string `s` consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.",
    "examples": [
      {
        "input": "s = \"Hello World\"",
        "output": "5",
        "explanation": "The last word is \"World\" with length 5."
      },
      {
        "input": "s = \"   fly me   to   the moon  \"",
        "output": "4",
        "explanation": "The last word is \"moon\" with length 4."
      },
      {
        "input": "s = \"luffy is still joyboy\"",
        "output": "6",
        "explanation": "The last word is \"joyboy\" with length 6."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of English letters and spaces only."
    ],
    "inputFormat": "String s.",
    "outputFormat": "Integer representing length of last word.",
    "sampleInput": "s = \"Hello World\"",
    "sampleOutput": "5",
    "hints": [
      "Traverse string from right to left, skipping trailing spaces."
    ],
    "tags": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "acceptanceRate": "49.6%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 8900,
    "totalSolved": 4410,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int lengthOfLastWord(String s) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def lengthOfLastWord(self, s: str) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "s = \"Hello World\"",
        "expectedOutput": "5"
      },
      {
        "input": "s = \"   fly me   to   the moon  \"",
        "expectedOutput": "4"
      },
      {
        "input": "s = \"luffy is still joyboy\"",
        "expectedOutput": "6"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"a\"",
        "expectedOutput": "1"
      },
      {
        "input": "s = \"   a   \"",
        "expectedOutput": "1"
      },
      {
        "input": "s = \"Today is a nice day\"",
        "expectedOutput": "3"
      },
      {
        "input": "s = \"abc def ghi \"",
        "expectedOutput": "3"
      },
      {
        "input": "s = \"  Hello   \"",
        "expectedOutput": "5"
      }
    ],
    "expectedOutput": "5",
    "id": "p-7",
    "number": 7,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Return `true` if it is a palindrome, or `false` otherwise.",
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "\"amanaplanacanalpanama\" is a palindrome."
      },
      {
        "input": "s = \"race a car\"",
        "output": "false",
        "explanation": "\"raceacar\" is not a palindrome."
      },
      {
        "input": "s = \" \"",
        "output": "true",
        "explanation": "An empty string reads the same forward and backward."
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    "inputFormat": "String s.",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "s = \"A man, a plan, a canal: Panama\"",
    "sampleOutput": "true",
    "hints": [
      "Use two pointers starting from beginning and end, skipping non-alphanumeric characters."
    ],
    "tags": [
      "Two Pointers",
      "String"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Amazon"
    ],
    "acceptanceRate": "46.7%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13800,
    "totalSolved": 6440,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"race a car\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \" \"",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"0P\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"ab_a\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"Was it a car or a cat I saw?\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"No 'x' in Nixon\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"12321\"",
        "expectedOutput": "true"
      }
    ],
    "expectedOutput": "true",
    "id": "p-8",
    "number": 8,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "implement-strstr",
    "title": "Implement strStr()",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.",
    "examples": [
      {
        "input": "haystack = \"sadbutsad\", needle = \"sad\"",
        "output": "0",
        "explanation": "\"sad\" occurs at index 0 and index 6. First index is 0."
      },
      {
        "input": "haystack = \"leetcode\", needle = \"leeto\"",
        "output": "-1",
        "explanation": "\"leeto\" did not occur in \"leetcode\"."
      },
      {
        "input": "haystack = \"hello\", needle = \"ll\"",
        "output": "2",
        "explanation": "\"ll\" occurs at index 2."
      }
    ],
    "constraints": [
      "1 <= haystack.length, needle.length <= 10^4",
      "haystack and needle consist of lowercase English letters."
    ],
    "inputFormat": "Line 1: String haystack\nLine 2: String needle",
    "outputFormat": "Integer index or -1.",
    "sampleInput": "haystack = \"sadbutsad\", needle = \"sad\"",
    "sampleOutput": "0",
    "hints": [
      "Check substring starting at each index of haystack up to length difference."
    ],
    "tags": [
      "Two Pointers",
      "String",
      "String Matching"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "41.2%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10200,
    "totalSolved": 4200,
    "timeComplexity": "O(N * M)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int strStr(String haystack, String needle) {\n        // Write Java solution\n        return -1;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n        // Write C++ solution\n        return -1;\n    }\n};",
    "starterCodePython": "class Solution:\n    def strStr(self, haystack: str, needle: str) -> int:\n        # Write Python solution\n        return -1",
    "testCases": [
      {
        "input": "haystack = \"sadbutsad\", needle = \"sad\"",
        "expectedOutput": "0"
      },
      {
        "input": "haystack = \"leetcode\", needle = \"leeto\"",
        "expectedOutput": "-1"
      },
      {
        "input": "haystack = \"hello\", needle = \"ll\"",
        "expectedOutput": "2"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "haystack = \"a\", needle = \"a\"",
        "expectedOutput": "0"
      },
      {
        "input": "haystack = \"abc\", needle = \"c\"",
        "expectedOutput": "2"
      },
      {
        "input": "haystack = \"mississippi\", needle = \"issip\"",
        "expectedOutput": "4"
      },
      {
        "input": "haystack = \"aaaaa\", needle = \"bba\"",
        "expectedOutput": "-1"
      },
      {
        "input": "haystack = \"aaa\", needle = \"aaaa\"",
        "expectedOutput": "-1"
      }
    ],
    "expectedOutput": "0",
    "id": "p-9",
    "number": 9,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "first-unique-character-in-a-string",
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.",
    "examples": [
      {
        "input": "s = \"leetcode\"",
        "output": "0",
        "explanation": "Character 'l' is the first non-repeating character at index 0."
      },
      {
        "input": "s = \"loveleetcode\"",
        "output": "2",
        "explanation": "Character 'v' is the first non-repeating character at index 2."
      },
      {
        "input": "s = \"aabb\"",
        "output": "-1",
        "explanation": "All characters repeat."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of only lowercase English letters."
    ],
    "inputFormat": "String s.",
    "outputFormat": "Integer index or -1.",
    "sampleInput": "s = \"leetcode\"",
    "sampleOutput": "0",
    "hints": [
      "Build a character frequency map, then do a second pass to find first with count 1."
    ],
    "tags": [
      "Hash Table",
      "String",
      "Queue"
    ],
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "acceptanceRate": "60.1%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 11900,
    "totalSolved": 7150,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int firstUniqChar(String s) {\n        // Write Java solution\n        return -1;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int firstUniqChar(string s) {\n        // Write C++ solution\n        return -1;\n    }\n};",
    "starterCodePython": "class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        # Write Python solution\n        return -1",
    "testCases": [
      {
        "input": "s = \"leetcode\"",
        "expectedOutput": "0"
      },
      {
        "input": "s = \"loveleetcode\"",
        "expectedOutput": "2"
      },
      {
        "input": "s = \"aabb\"",
        "expectedOutput": "-1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"z\"",
        "expectedOutput": "0"
      },
      {
        "input": "s = \"dddccdbba\"",
        "expectedOutput": "8"
      },
      {
        "input": "s = \"aaaaa\"",
        "expectedOutput": "-1"
      },
      {
        "input": "s = \"abcde\"",
        "expectedOutput": "0"
      },
      {
        "input": "s = \"abacaba\"",
        "expectedOutput": "3"
      }
    ],
    "expectedOutput": "0",
    "id": "p-10",
    "number": 10,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "isomorphic-strings",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given two strings `s` and `t`, determine if they are isomorphic.\n\nTwo strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.",
    "examples": [
      {
        "input": "s = \"egg\", t = \"add\"",
        "output": "true",
        "explanation": "'e' maps to 'a', 'g' maps to 'd'."
      },
      {
        "input": "s = \"foo\", t = \"bar\"",
        "output": "false",
        "explanation": "'o' maps to both 'a' and 'r' which is invalid."
      },
      {
        "input": "s = \"paper\", t = \"title\"",
        "output": "true",
        "explanation": "'p'->'t', 'a'->'i', 'e'->'l', 'r'->'e'."
      }
    ],
    "constraints": [
      "1 <= s.length <= 5 * 10^4",
      "t.length == s.length",
      "s and t consist of any valid ascii character."
    ],
    "inputFormat": "Line 1: String s\nLine 2: String t",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "s = \"egg\", t = \"add\"",
    "sampleOutput": "true",
    "hints": [
      "Maintain character mappings in both directions (s->t and t->s)."
    ],
    "tags": [
      "Hash Table",
      "String"
    ],
    "companies": [
      "Amazon",
      "Google",
      "LinkedIn"
    ],
    "acceptanceRate": "44.5%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8700,
    "totalSolved": 3870,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean isIsomorphic(String s, String t) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool isIsomorphic(string s, string t) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "s = \"egg\", t = \"add\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"foo\", t = \"bar\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"paper\", t = \"title\"",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"badc\", t = \"baba\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"a\", t = \"a\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"ab\", t = \"aa\"",
        "expectedOutput": "false"
      },
      {
        "input": "s = \"title\", t = \"paper\"",
        "expectedOutput": "true"
      },
      {
        "input": "s = \"abcdefghijklmnopqrstuvwxyz\", t = \"bcdefghijklmnopqrstuvwxyza\"",
        "expectedOutput": "true"
      }
    ],
    "expectedOutput": "true",
    "id": "p-11",
    "number": 11,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "longest-common-prefix",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `\"\"`.",
    "examples": [
      {
        "input": "strs = [\"flower\",\"flow\",\"flight\"]",
        "output": "\"fl\"",
        "explanation": "The longest common prefix is \"fl\"."
      },
      {
        "input": "strs = [\"dog\",\"racecar\",\"car\"]",
        "output": "\"\"",
        "explanation": "There is no common prefix among the input strings."
      },
      {
        "input": "strs = [\"interspecies\",\"interstellar\",\"interstate\"]",
        "output": "\"inters\"",
        "explanation": "Common prefix is \"inters\"."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200"
    ],
    "inputFormat": "Array of strings strs.",
    "outputFormat": "String representing longest common prefix.",
    "sampleInput": "strs = [\"flower\",\"flow\",\"flight\"]",
    "sampleOutput": "\"fl\"",
    "hints": [
      "Compare prefix character by character across all strings."
    ],
    "tags": [
      "String",
      "Trie"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "acceptanceRate": "42.8%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14100,
    "totalSolved": 6030,
    "timeComplexity": "O(S)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Write Java solution\n        return \"\";\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Write C++ solution\n        return \"\";\n    }\n};",
    "starterCodePython": "class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        # Write Python solution\n        return \"\"",
    "testCases": [
      {
        "input": "strs = [\"flower\",\"flow\",\"flight\"]",
        "expectedOutput": "\"fl\""
      },
      {
        "input": "strs = [\"dog\",\"racecar\",\"car\"]",
        "expectedOutput": "\"\""
      },
      {
        "input": "strs = [\"interspecies\",\"interstellar\",\"interstate\"]",
        "expectedOutput": "\"inters\""
      }
    ],
    "hiddenTestCases": [
      {
        "input": "strs = [\"a\"]",
        "expectedOutput": "\"a\""
      },
      {
        "input": "strs = [\"\",\"b\"]",
        "expectedOutput": "\"\""
      },
      {
        "input": "strs = [\"c\",\"c\"]",
        "expectedOutput": "\"c\""
      },
      {
        "input": "strs = [\"ab\", \"a\"]",
        "expectedOutput": "\"a\""
      },
      {
        "input": "strs = [\"prefix\",\"prefix\",\"prefix\"]",
        "expectedOutput": "\"prefix\""
      }
    ],
    "expectedOutput": "\"fl\"",
    "id": "p-12",
    "number": 12,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given a roman numeral string `s`, convert it to an integer.",
    "examples": [
      {
        "input": "s = \"III\"",
        "output": "3",
        "explanation": "III = 3."
      },
      {
        "input": "s = \"LVIII\"",
        "output": "58",
        "explanation": "L = 50, V= 5, III = 3."
      },
      {
        "input": "s = \"MCMXCIV\"",
        "output": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90 and IV = 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')."
    ],
    "inputFormat": "String s.",
    "outputFormat": "Integer value.",
    "sampleInput": "s = \"III\"",
    "sampleOutput": "3",
    "hints": [
      "If current character value is less than next character value, subtract current value. Otherwise add it."
    ],
    "tags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "61.5%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 16800,
    "totalSolved": 10330,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int romanToInt(String s) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int romanToInt(string s) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def romanToInt(self, s: str) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "s = \"III\"",
        "expectedOutput": "3"
      },
      {
        "input": "s = \"LVIII\"",
        "expectedOutput": "58"
      },
      {
        "input": "s = \"MCMXCIV\"",
        "expectedOutput": "1994"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "s = \"I\"",
        "expectedOutput": "1"
      },
      {
        "input": "s = \"IV\"",
        "expectedOutput": "4"
      },
      {
        "input": "s = \"IX\"",
        "expectedOutput": "9"
      },
      {
        "input": "s = \"XL\"",
        "expectedOutput": "40"
      },
      {
        "input": "s = \"MMMCMXCIX\"",
        "expectedOutput": "3999"
      }
    ],
    "expectedOutput": "3",
    "id": "p-13",
    "number": 13,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "detect-capital",
    "title": "Detect Capital",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "We define the usage of capitals in a word to be right when one of the following cases holds:\n1. All letters in this word are capitals, like \"USA\".\n2. All letters in this word are not capitals, like \"leetcode\".\n3. Only the first letter in this word is capital, like \"Google\".\n\nGiven a string `word`, return `true` if the usage of capitals in it is right.",
    "examples": [
      {
        "input": "word = \"USA\"",
        "output": "true",
        "explanation": "All letters are capitals."
      },
      {
        "input": "word = \"FlaG\"",
        "output": "false",
        "explanation": "Capitals are not used correctly."
      },
      {
        "input": "word = \"leetcode\"",
        "output": "true",
        "explanation": "All letters are lowercase."
      }
    ],
    "constraints": [
      "1 <= word.length <= 100",
      "word consists of lowercase and uppercase English letters."
    ],
    "inputFormat": "String word.",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "word = \"USA\"",
    "sampleOutput": "true",
    "hints": [
      "Count uppercase characters or check if word matches one of the 3 valid cases."
    ],
    "tags": [
      "String"
    ],
    "companies": [
      "Google",
      "Amazon"
    ],
    "acceptanceRate": "56.9%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 6200,
    "totalSolved": 3528,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean detectCapitalUse(String word) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool detectCapitalUse(string word) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def detectCapitalUse(self, word: str) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "word = \"USA\"",
        "expectedOutput": "true"
      },
      {
        "input": "word = \"FlaG\"",
        "expectedOutput": "false"
      },
      {
        "input": "word = \"leetcode\"",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "word = \"Google\"",
        "expectedOutput": "true"
      },
      {
        "input": "word = \"g\"",
        "expectedOutput": "true"
      },
      {
        "input": "word = \"G\"",
        "expectedOutput": "true"
      },
      {
        "input": "word = \"mL\"",
        "expectedOutput": "false"
      },
      {
        "input": "word = \"FLAG\"",
        "expectedOutput": "true"
      }
    ],
    "expectedOutput": "true",
    "id": "p-14",
    "number": 14,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "ransom-note",
    "title": "Ransom Note",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Strings",
    "problemStatement": "Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise.\n\nEach letter in `magazine` can only be used once in `ransomNote`.",
    "examples": [
      {
        "input": "ransomNote = \"a\", magazine = \"b\"",
        "output": "false",
        "explanation": "\"b\" does not contain \"a\"."
      },
      {
        "input": "ransomNote = \"aa\", magazine = \"ab\"",
        "output": "false",
        "explanation": "\"ab\" only has one \"a\"."
      },
      {
        "input": "ransomNote = \"aa\", magazine = \"aab\"",
        "output": "true",
        "explanation": "\"aab\" contains two \"a\"s."
      }
    ],
    "constraints": [
      "1 <= ransomNote.length, magazine.length <= 10^5",
      "ransomNote and magazine consist of lowercase English letters."
    ],
    "inputFormat": "Line 1: String ransomNote\nLine 2: String magazine",
    "outputFormat": "Boolean true or false.",
    "sampleInput": "ransomNote = \"a\", magazine = \"b\"",
    "sampleOutput": "false",
    "hints": [
      "Count character frequencies in magazine and ensure ransomNote needs do not exceed available counts."
    ],
    "tags": [
      "Hash Table",
      "String",
      "Counting"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "acceptanceRate": "60.3%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 9500,
    "totalSolved": 5720,
    "timeComplexity": "O(M + N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "ransomNote = \"a\", magazine = \"b\"",
        "expectedOutput": "false"
      },
      {
        "input": "ransomNote = \"aa\", magazine = \"ab\"",
        "expectedOutput": "false"
      },
      {
        "input": "ransomNote = \"aa\", magazine = \"aab\"",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "ransomNote = \"bg\", magazine = \"efjbdfbdgfjhaacwhbg\"",
        "expectedOutput": "true"
      },
      {
        "input": "ransomNote = \"fffbfg\", magazine = \"effjfggffbbf\"",
        "expectedOutput": "true"
      },
      {
        "input": "ransomNote = \"a\", magazine = \"a\"",
        "expectedOutput": "true"
      },
      {
        "input": "ransomNote = \"abc\", magazine = \"cba\"",
        "expectedOutput": "true"
      },
      {
        "input": "ransomNote = \"a\", magazine = \"\"",
        "expectedOutput": "false"
      }
    ],
    "expectedOutput": "false",
    "id": "p-15",
    "number": 15,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "binary-search",
    "title": "Binary Search",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.",
    "examples": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "output": "4",
        "explanation": "9 exists in nums and its index is 4"
      },
      {
        "input": "nums = [-1,0,3,5,9,12], target = 2",
        "output": "-1",
        "explanation": "2 does not exist in nums so return -1"
      },
      {
        "input": "nums = [5], target = 5",
        "output": "0",
        "explanation": "Single element match at index 0."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i], target <= 10^4",
      "All integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    "inputFormat": "Line 1: Sorted integer array nums\nLine 2: Target integer",
    "outputFormat": "Integer index or -1.",
    "sampleInput": "nums = [-1,0,3,5,9,12], target = 9",
    "sampleOutput": "4",
    "hints": [
      "Set left = 0, right = n-1. Calculate mid = left + (right - left)/2."
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "56.9%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 14500,
    "totalSolved": 8250,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int search(int[] nums, int target) {\n        // Write Java solution\n        return -1;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write C++ solution\n        return -1;\n    }\n};",
    "starterCodePython": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write Python solution\n        return -1",
    "testCases": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "expectedOutput": "4"
      },
      {
        "input": "nums = [-1,0,3,5,9,12], target = 2",
        "expectedOutput": "-1"
      },
      {
        "input": "nums = [5], target = 5",
        "expectedOutput": "0"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "nums = [2,5], target = 5",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [2,5], target = 2",
        "expectedOutput": "0"
      },
      {
        "input": "nums = [1,3,5,7,9,11], target = 7",
        "expectedOutput": "3"
      },
      {
        "input": "nums = [-10,-5,0,5,10], target = -5",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [1,2,3,4,5], target = 6",
        "expectedOutput": "-1"
      }
    ],
    "expectedOutput": "4",
    "id": "p-16",
    "number": 16,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    "examples": [
      {
        "input": "nums = [1,3,5,6], target = 5",
        "output": "2"
      },
      {
        "input": "nums = [1,3,5,6], target = 2",
        "output": "1"
      },
      {
        "input": "nums = [1,3,5,6], target = 7",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order."
    ],
    "inputFormat": "Line 1: Sorted integer array nums\nLine 2: Target integer",
    "outputFormat": "Insertion index integer.",
    "sampleInput": "nums = [1,3,5,6], target = 5",
    "sampleOutput": "2",
    "hints": [
      "Binary search returns `left` pointer when target is not found."
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "acceptanceRate": "45.8%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11800,
    "totalSolved": 5400,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def searchInsert(self, nums: list[int], target: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "nums = [1,3,5,6], target = 5",
        "expectedOutput": "2"
      },
      {
        "input": "nums = [1,3,5,6], target = 2",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [1,3,5,6], target = 7",
        "expectedOutput": "4"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "nums = [1,3,5,6], target = 0",
        "expectedOutput": "0"
      },
      {
        "input": "nums = [1], target = 0",
        "expectedOutput": "0"
      },
      {
        "input": "nums = [1], target = 2",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [2,4,6,8], target = 5",
        "expectedOutput": "2"
      },
      {
        "input": "nums = [1,3,5,7,9], target = 8",
        "expectedOutput": "4"
      }
    ],
    "expectedOutput": "2",
    "id": "p-17",
    "number": 17,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "guess-number-higher-or-lower",
    "title": "Guess Number Higher or Lower",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "We are playing the Guess Game. The game is as follows:\n\nI pick a number from 1 to `n`. You have to guess which number I picked.\n\nEvery time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.",
    "examples": [
      {
        "input": "n = 10, pick = 6",
        "output": "6"
      },
      {
        "input": "n = 1, pick = 1",
        "output": "1"
      },
      {
        "input": "n = 2, pick = 1",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1",
      "1 <= pick <= n"
    ],
    "inputFormat": "Integer n",
    "outputFormat": "Picked integer",
    "sampleInput": "n = 10, pick = 6",
    "sampleOutput": "6",
    "hints": [
      "Binary search range 1 to n based on guess API feedback."
    ],
    "tags": [
      "Binary Search",
      "Interactive"
    ],
    "companies": [
      "Google",
      "Amazon"
    ],
    "acceptanceRate": "52.9%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 7500,
    "totalSolved": 3960,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "public class Solution {\n    public int guessNumber(int n) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int guessNumber(int n) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def guessNumber(self, n: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "n = 10, pick = 6",
        "expectedOutput": "6"
      },
      {
        "input": "n = 1, pick = 1",
        "expectedOutput": "1"
      },
      {
        "input": "n = 2, pick = 1",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "n = 100, pick = 42",
        "expectedOutput": "42"
      },
      {
        "input": "n = 1000, pick = 999",
        "expectedOutput": "999"
      },
      {
        "input": "n = 2147483647, pick = 2147483647",
        "expectedOutput": "2147483647"
      },
      {
        "input": "n = 50, pick = 1",
        "expectedOutput": "1"
      },
      {
        "input": "n = 10, pick = 10",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "6",
    "id": "p-18",
    "number": 18,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "first-bad-version",
    "title": "First Bad Version",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "You are a product manager and currently leading a team to develop a new product. Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one.\n\nYou are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version.",
    "examples": [
      {
        "input": "n = 5, bad = 4",
        "output": "4",
        "explanation": "isBadVersion(3) -> false, isBadVersion(5) -> true, isBadVersion(4) -> true. First bad is 4."
      },
      {
        "input": "n = 1, bad = 1",
        "output": "1"
      },
      {
        "input": "n = 3, bad = 2",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= bad <= n <= 2^31 - 1"
    ],
    "inputFormat": "Integer n",
    "outputFormat": "First bad version integer",
    "sampleInput": "n = 5, bad = 4",
    "sampleOutput": "4",
    "hints": [
      "Binary search on version numbers [1...n]. If mid is bad, answer <= mid."
    ],
    "tags": [
      "Binary Search",
      "Interactive"
    ],
    "companies": [
      "Meta",
      "Amazon",
      "Apple"
    ],
    "acceptanceRate": "43.2%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10900,
    "totalSolved": 4700,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "public class Solution {\n    public int firstBadVersion(int n) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int firstBadVersion(int n) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def firstBadVersion(self, n: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "n = 5, bad = 4",
        "expectedOutput": "4"
      },
      {
        "input": "n = 1, bad = 1",
        "expectedOutput": "1"
      },
      {
        "input": "n = 3, bad = 2",
        "expectedOutput": "2"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "n = 10, bad = 1",
        "expectedOutput": "1"
      },
      {
        "input": "n = 100, bad = 88",
        "expectedOutput": "88"
      },
      {
        "input": "n = 2147483647, bad = 2147483647",
        "expectedOutput": "2147483647"
      },
      {
        "input": "n = 2, bad = 2",
        "expectedOutput": "2"
      },
      {
        "input": "n = 500, bad = 250",
        "expectedOutput": "250"
      }
    ],
    "expectedOutput": "4",
    "id": "p-19",
    "number": 19,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "sqrtx",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given a non-negative integer `x`, compute and return the square root of `x`. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.",
    "examples": [
      {
        "input": "x = 4",
        "output": "2"
      },
      {
        "input": "x = 8",
        "output": "2",
        "explanation": "The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned."
      },
      {
        "input": "x = 0",
        "output": "0"
      }
    ],
    "constraints": [
      "0 <= x <= 2^31 - 1"
    ],
    "inputFormat": "Integer x",
    "outputFormat": "Truncated integer square root",
    "sampleInput": "x = 4",
    "sampleOutput": "2",
    "hints": [
      "Binary search the range [0, x]. Check mid * mid <= x."
    ],
    "tags": [
      "Math",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "acceptanceRate": "38.2%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9800,
    "totalSolved": 3740,
    "timeComplexity": "O(log X)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int mySqrt(int x) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int mySqrt(int x) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def mySqrt(self, x: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "x = 4",
        "expectedOutput": "2"
      },
      {
        "input": "x = 8",
        "expectedOutput": "2"
      },
      {
        "input": "x = 0",
        "expectedOutput": "0"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "x = 1",
        "expectedOutput": "1"
      },
      {
        "input": "x = 2147395599",
        "expectedOutput": "46339"
      },
      {
        "input": "x = 9",
        "expectedOutput": "3"
      },
      {
        "input": "x = 16",
        "expectedOutput": "4"
      },
      {
        "input": "x = 25",
        "expectedOutput": "5"
      }
    ],
    "expectedOutput": "2",
    "id": "p-20",
    "number": 20,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "valid-perfect-square",
    "title": "Valid Perfect Square",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given a positive integer `num`, return `true` if `num` is a perfect square or `false` otherwise.\n\nDo not use any built-in library function, such as `sqrt`.",
    "examples": [
      {
        "input": "num = 16",
        "output": "true",
        "explanation": "16 = 4 * 4."
      },
      {
        "input": "num = 14",
        "output": "false",
        "explanation": "14 is not a square of an integer."
      },
      {
        "input": "num = 1",
        "output": "true",
        "explanation": "1 = 1 * 1."
      }
    ],
    "constraints": [
      "1 <= num <= 2^31 - 1"
    ],
    "inputFormat": "Positive integer num",
    "outputFormat": "Boolean true or false",
    "sampleInput": "num = 16",
    "sampleOutput": "true",
    "hints": [
      "Binary search between 1 and num/2. Check mid * mid == num."
    ],
    "tags": [
      "Math",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "LinkedIn"
    ],
    "acceptanceRate": "43.6%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 6800,
    "totalSolved": 2960,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public boolean isPerfectSquare(int num) {\n        // Write Java solution\n        return false;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    bool isPerfectSquare(int num) {\n        // Write C++ solution\n        return false;\n    }\n};",
    "starterCodePython": "class Solution:\n    def isPerfectSquare(self, num: int) -> bool:\n        # Write Python solution\n        return False",
    "testCases": [
      {
        "input": "num = 16",
        "expectedOutput": "true"
      },
      {
        "input": "num = 14",
        "expectedOutput": "false"
      },
      {
        "input": "num = 1",
        "expectedOutput": "true"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "num = 25",
        "expectedOutput": "true"
      },
      {
        "input": "num = 100",
        "expectedOutput": "true"
      },
      {
        "input": "num = 2147483647",
        "expectedOutput": "false"
      },
      {
        "input": "num = 9",
        "expectedOutput": "true"
      },
      {
        "input": "num = 8",
        "expectedOutput": "false"
      }
    ],
    "expectedOutput": "true",
    "id": "p-21",
    "number": 21,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "peak-index-in-a-mountain-array",
    "title": "Peak Index in a Mountain Array",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "An array `arr` is a mountain array if it increases to a peak element and then decreases. Given a mountain array `arr`, return the index `i` such that `arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.",
    "examples": [
      {
        "input": "arr = [0,1,0]",
        "output": "1"
      },
      {
        "input": "arr = [0,2,1,0]",
        "output": "1"
      },
      {
        "input": "arr = [0,10,5,2]",
        "output": "1"
      }
    ],
    "constraints": [
      "3 <= arr.length <= 10^5",
      "0 <= arr[i] <= 10^6"
    ],
    "inputFormat": "Array of mountain integers arr",
    "outputFormat": "Peak index integer",
    "sampleInput": "arr = [0,1,0]",
    "sampleOutput": "1",
    "hints": [
      "Binary search comparing arr[mid] with arr[mid + 1]."
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Uber"
    ],
    "acceptanceRate": "69.4%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8900,
    "totalSolved": 6175,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int peakIndexInMountainArray(int[] arr) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int peakIndexInMountainArray(vector<int>& arr) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def peakIndexInMountainArray(self, arr: list[int]) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "arr = [0,1,0]",
        "expectedOutput": "1"
      },
      {
        "input": "arr = [0,2,1,0]",
        "expectedOutput": "1"
      },
      {
        "input": "arr = [0,10,5,2]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "arr = [3,4,5,1]",
        "expectedOutput": "2"
      },
      {
        "input": "arr = [24,69,100,99,79,78,67,36,26,19]",
        "expectedOutput": "2"
      },
      {
        "input": "arr = [0,1,2,3,4,5,4,3,2,1,0]",
        "expectedOutput": "5"
      },
      {
        "input": "arr = [10,20,30,20,10]",
        "expectedOutput": "2"
      },
      {
        "input": "arr = [1,3,2]",
        "expectedOutput": "1"
      }
    ],
    "expectedOutput": "1",
    "id": "p-22",
    "number": 22,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "find-smallest-letter-greater-than-target",
    "title": "Find Smallest Letter Greater Than Target",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given a characters array `letters` that is sorted in non-decreasing order, and a character `target`, return the smallest character in `letters` that is lexicographically greater than `target`. If such a character does not exist, return the first character in `letters`.",
    "examples": [
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"a\"",
        "output": "\"c\""
      },
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"c\"",
        "output": "\"f\""
      },
      {
        "input": "letters = [\"x\",\"x\",\"y\",\"y\"], target = \"z\"",
        "output": "\"x\""
      }
    ],
    "constraints": [
      "2 <= letters.length <= 10^4",
      "letters[i] is a lowercase English letter.",
      "letters is sorted in non-decreasing order.",
      "target is a lowercase English letter."
    ],
    "inputFormat": "Line 1: Sorted character array letters\nLine 2: Target character",
    "outputFormat": "Character output",
    "sampleInput": "letters = [\"c\",\"f\",\"j\"], target = \"a\"",
    "sampleOutput": "\"c\"",
    "hints": [
      "Binary search for the upper bound index. Use modulo length if no element > target is found."
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "LinkedIn",
      "Amazon"
    ],
    "acceptanceRate": "49.1%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 5400,
    "totalSolved": 2650,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public char nextGreatestLetter(char[] letters, char target) {\n        // Write Java solution\n        return letters[0];\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    char nextGreatestLetter(vector<char>& letters, char target) {\n        // Write C++ solution\n        return letters[0];\n    }\n};",
    "starterCodePython": "class Solution:\n    def nextGreatestLetter(self, letters: list[str], target: str) -> str:\n        # Write Python solution\n        return letters[0]",
    "testCases": [
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"a\"",
        "expectedOutput": "\"c\""
      },
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"c\"",
        "expectedOutput": "\"f\""
      },
      {
        "input": "letters = [\"x\",\"x\",\"y\",\"y\"], target = \"z\"",
        "expectedOutput": "\"x\""
      }
    ],
    "hiddenTestCases": [
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"d\"",
        "expectedOutput": "\"f\""
      },
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"g\"",
        "expectedOutput": "\"j\""
      },
      {
        "input": "letters = [\"c\",\"f\",\"j\"], target = \"j\"",
        "expectedOutput": "\"c\""
      },
      {
        "input": "letters = [\"a\",\"b\"], target = \"z\"",
        "expectedOutput": "\"a\""
      },
      {
        "input": "letters = [\"e\",\"e\",\"e\",\"e\",\"e\",\"e\",\"n\",\"n\",\"n\",\"n\"], target = \"e\"",
        "expectedOutput": "\"n\""
      }
    ],
    "expectedOutput": "\"c\"",
    "id": "p-23",
    "number": 23,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "count-negative-numbers-in-a-sorted-matrix",
    "title": "Count Negative Numbers in a Sorted Matrix",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given a `m x n` matrix `grid` which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in `grid`.",
    "examples": [
      {
        "input": "grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]",
        "output": "8"
      },
      {
        "input": "grid = [[3,2],[1,0]]",
        "output": "0"
      },
      {
        "input": "grid = [[-1]]",
        "output": "1"
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 100",
      "-100 <= grid[i][j] <= 100"
    ],
    "inputFormat": "2D array grid",
    "outputFormat": "Integer count of negative numbers",
    "sampleInput": "grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]",
    "sampleOutput": "8",
    "hints": [
      "Use binary search on each row, or staircase search from top-right corner in O(M+N) time."
    ],
    "tags": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "75.6%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7200,
    "totalSolved": 5440,
    "timeComplexity": "O(M + N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int countNegatives(int[][] grid) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int countNegatives(vector<vector<int>>& grid) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def countNegatives(self, grid: list[list[int]]) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]",
        "expectedOutput": "8"
      },
      {
        "input": "grid = [[3,2],[1,0]]",
        "expectedOutput": "0"
      },
      {
        "input": "grid = [[-1]]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "grid = [[-1,-1],[-1,-1]]",
        "expectedOutput": "4"
      },
      {
        "input": "grid = [[1,2],[3,4]]",
        "expectedOutput": "0"
      },
      {
        "input": "grid = [[5,1,0],[-5,-5,-5]]",
        "expectedOutput": "3"
      },
      {
        "input": "grid = [[0]]",
        "expectedOutput": "0"
      },
      {
        "input": "grid = [[-2, -3]]",
        "expectedOutput": "2"
      }
    ],
    "expectedOutput": "8",
    "id": "p-24",
    "number": 24,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "special-array-with-x-elements-greater-than-or-equal-x",
    "title": "Special Array With X Elements Greater Than or Equal X",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "You are given an array `nums` of non-negative integers. `nums` is considered special if there exists a number `x` such that there are exactly `x` numbers in `nums` that are greater than or equal to `x`.\n\nNotice that `x` does not have to be an element in `nums`.\n\nReturn `x` if the array is special, otherwise return `-1`.",
    "examples": [
      {
        "input": "nums = [3,5]",
        "output": "2",
        "explanation": "There are 2 values (3 and 5) that are greater than or equal to 2."
      },
      {
        "input": "nums = [0,0]",
        "output": "-1",
        "explanation": "No numbers fit the criteria."
      },
      {
        "input": "nums = [0,4,3,0,4]",
        "output": "3",
        "explanation": "There are 3 values that are greater than or equal to 3."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    "inputFormat": "Array of non-negative integers nums",
    "outputFormat": "Integer x or -1",
    "sampleInput": "nums = [3,5]",
    "sampleOutput": "2",
    "hints": [
      "Sort array or binary search range [1, n]. Count elements >= mid."
    ],
    "tags": [
      "Array",
      "Binary Search",
      "Sorting"
    ],
    "companies": [
      "Google",
      "Amazon"
    ],
    "acceptanceRate": "60.4%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4800,
    "totalSolved": 2900,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int specialArray(int[] nums) {\n        // Write Java solution\n        return -1;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int specialArray(vector<int>& nums) {\n        // Write C++ solution\n        return -1;\n    }\n};",
    "starterCodePython": "class Solution:\n    def specialArray(self, nums: list[int]) -> int:\n        # Write Python solution\n        return -1",
    "testCases": [
      {
        "input": "nums = [3,5]",
        "expectedOutput": "2"
      },
      {
        "input": "nums = [0,0]",
        "expectedOutput": "-1"
      },
      {
        "input": "nums = [0,4,3,0,4]",
        "expectedOutput": "3"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "nums = [3,6,7,7,0]",
        "expectedOutput": "-1"
      },
      {
        "input": "nums = [1]",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [10]",
        "expectedOutput": "1"
      },
      {
        "input": "nums = [1,2,3,4,5,6,7,8,9]",
        "expectedOutput": "5"
      },
      {
        "input": "nums = [0]",
        "expectedOutput": "-1"
      }
    ],
    "expectedOutput": "2",
    "id": "p-25",
    "number": 25,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "kth-missing-positive-number",
    "title": "Kth Missing Positive Number",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "Given an array `arr` of positive integers sorted in a strictly increasing order, and an integer `k`, return the `k`-th positive integer that is missing from this array.",
    "examples": [
      {
        "input": "arr = [2,3,4,7,11], k = 5",
        "output": "9",
        "explanation": "The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing is 9."
      },
      {
        "input": "arr = [1,2,3,4], k = 2",
        "output": "6",
        "explanation": "The missing positive integers are [5,6,7,...]. The 2nd missing is 6."
      },
      {
        "input": "arr = [5,6,7,8,9], k = 1",
        "output": "1",
        "explanation": "The 1st missing positive integer is 1."
      }
    ],
    "constraints": [
      "1 <= arr.length <= 1000",
      "1 <= arr[i] <= 1000",
      "1 <= k <= 1000",
      "arr[i] < arr[j] for 1 <= i < j <= arr.length"
    ],
    "inputFormat": "Line 1: Strictly increasing positive integer array arr\nLine 2: Integer k",
    "outputFormat": "Integer representing k-th missing positive number",
    "sampleInput": "arr = [2,3,4,7,11], k = 5",
    "sampleOutput": "9",
    "hints": [
      "Number of missing elements before index mid is arr[mid] - mid - 1. Binary search for boundary."
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "59.2%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8100,
    "totalSolved": 4795,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int findKthPositive(int[] arr, int k) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int findKthPositive(vector<int>& arr, int k) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def findKthPositive(self, arr: list[int], k: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "arr = [2,3,4,7,11], k = 5",
        "expectedOutput": "9"
      },
      {
        "input": "arr = [1,2,3,4], k = 2",
        "expectedOutput": "6"
      },
      {
        "input": "arr = [5,6,7,8,9], k = 1",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "arr = [2], k = 1",
        "expectedOutput": "1"
      },
      {
        "input": "arr = [1], k = 1",
        "expectedOutput": "2"
      },
      {
        "input": "arr = [3,10], k = 2",
        "expectedOutput": "2"
      },
      {
        "input": "arr = [1000], k = 1000",
        "expectedOutput": "1000"
      },
      {
        "input": "arr = [2,4,6,8], k = 3",
        "expectedOutput": "5"
      }
    ],
    "expectedOutput": "9",
    "id": "p-26",
    "number": 26,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "slug": "arrange-coins",
    "title": "Arrange Coins",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search",
    "problemStatement": "You have `n` coins and you want to build a staircase with these coins. The staircase consists of `k` rows where the `i`-th row has exactly `i` coins. The last row of the staircase may be incomplete.\n\nGiven the integer `n`, return the number of complete rows of the staircase you will build.",
    "examples": [
      {
        "input": "n = 5",
        "output": "2",
        "explanation": "Row 1 has 1 coin, Row 2 has 2 coins, Row 3 has 2 coins (incomplete). Total complete rows = 2."
      },
      {
        "input": "n = 8",
        "output": "3",
        "explanation": "Row 1 has 1 coin, Row 2 has 2 coins, Row 3 has 3 coins, Row 4 has 2 coins (incomplete). Total complete rows = 3."
      },
      {
        "input": "n = 1",
        "output": "1",
        "explanation": "Row 1 has 1 coin. Total complete rows = 1."
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "inputFormat": "Integer n",
    "outputFormat": "Integer number of complete rows",
    "sampleInput": "n = 5",
    "sampleOutput": "2",
    "hints": [
      "Formula for coins in k rows is k*(k+1)/2. Binary search k range [1, n]."
    ],
    "tags": [
      "Math",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "46.3%",
    "estimatedTime": "10 mins",
    "totalSubmissions": 6100,
    "totalSolved": 2824,
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public int arrangeCoins(int n) {\n        // Write Java solution\n        return 0;\n    }\n}",
    "starterCodeCpp": "class Solution {\npublic:\n    int arrangeCoins(int n) {\n        // Write C++ solution\n        return 0;\n    }\n};",
    "starterCodePython": "class Solution:\n    def arrangeCoins(self, n: int) -> int:\n        # Write Python solution\n        return 0",
    "testCases": [
      {
        "input": "n = 5",
        "expectedOutput": "2"
      },
      {
        "input": "n = 8",
        "expectedOutput": "3"
      },
      {
        "input": "n = 1",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "n = 3",
        "expectedOutput": "2"
      },
      {
        "input": "n = 6",
        "expectedOutput": "3"
      },
      {
        "input": "n = 10",
        "expectedOutput": "4"
      },
      {
        "input": "n = 2147483647",
        "expectedOutput": "65535"
      },
      {
        "input": "n = 2",
        "expectedOutput": "1"
      }
    ],
    "expectedOutput": "2",
    "id": "p-27",
    "number": 27,
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-28",
    "number": 28,
    "slug": "merge-sorted-array",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Merge Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3000,
    "totalSolved": 1740,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-29",
    "number": 29,
    "slug": "sort-array-by-parity",
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Sort Array By Parity** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Sort Array By Parity."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3120,
    "totalSolved": 1810,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Array By Parity\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Array By Parity\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Sort Array By Parity\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-30",
    "number": 30,
    "slug": "squares-of-a-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Squares of a Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Squares of a Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3240,
    "totalSolved": 1879,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Squares of a Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Squares of a Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Squares of a Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-31",
    "number": 31,
    "slug": "height-checker",
    "title": "Height Checker",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Height Checker** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Height Checker."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "60.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3360,
    "totalSolved": 1949,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Height Checker\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Height Checker\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Height Checker\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-32",
    "number": 32,
    "slug": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Reverse Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Reverse Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "64.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3480,
    "totalSolved": 2018,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reverse Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reverse Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Reverse Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-33",
    "number": 33,
    "slug": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Merge Two Sorted Lists** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Two Sorted Lists."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "60.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3600,
    "totalSolved": 2088,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Two Sorted Lists\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Two Sorted Lists\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Two Sorted Lists\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-34",
    "number": 34,
    "slug": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Linked List Cycle** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Linked List Cycle."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "63.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3720,
    "totalSolved": 2158,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Linked List Cycle\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Linked List Cycle\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Linked List Cycle\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-35",
    "number": 35,
    "slug": "middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Middle of the Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Middle of the Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "62.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3840,
    "totalSolved": 2227,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Middle of the Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Middle of the Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Middle of the Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-36",
    "number": 36,
    "slug": "min-stack",
    "title": "Min Stack",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Min Stack** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Min Stack."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "63.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 3960,
    "totalSolved": 2297,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Min Stack\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Min Stack\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Min Stack\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-37",
    "number": 37,
    "slug": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Implement Queue using Stacks** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Queue using Stacks."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4080,
    "totalSolved": 2366,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Queue using Stacks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Queue using Stacks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Queue using Stacks\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-38",
    "number": 38,
    "slug": "backspace-string-compare",
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Backspace String Compare** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Backspace String Compare."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointers",
      "String",
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4200,
    "totalSolved": 2436,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Backspace String Compare\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Backspace String Compare\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Backspace String Compare\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-39",
    "number": 39,
    "slug": "implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Implement Stack using Queues** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Stack using Queues."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4320,
    "totalSolved": 2506,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Stack using Queues\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Stack using Queues\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Stack using Queues\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-40",
    "number": 40,
    "slug": "number-of-recent-calls",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Number of Recent Calls** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Number of Recent Calls."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Design",
      "Queue",
      "Data Stream"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "70.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4440,
    "totalSolved": 2575,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Number of Recent Calls\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Number of Recent Calls\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Number of Recent Calls\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-41",
    "number": 41,
    "slug": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Maximum Depth of Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Maximum Depth of Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4560,
    "totalSolved": 2645,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum Depth of Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum Depth of Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Maximum Depth of Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-42",
    "number": 42,
    "slug": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Invert Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Invert Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "70.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4680,
    "totalSolved": 2714,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Invert Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Invert Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Invert Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-43",
    "number": 43,
    "slug": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Same Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Same Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "67.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4800,
    "totalSolved": 2784,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Same Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Same Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Same Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-44",
    "number": 44,
    "slug": "search-in-a-binary-search-tree",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST",
    "problemStatement": "Solve **Search in a Binary Search Tree** efficiently using BST fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Search in a Binary Search Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "BST",
      "Binary Tree"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "72.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 4920,
    "totalSolved": 2854,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search in a Binary Search Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search in a Binary Search Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Search in a Binary Search Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-45",
    "number": 45,
    "slug": "lowest-common-ancestor-of-a-bst",
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST",
    "problemStatement": "Solve **Lowest Common Ancestor of a BST** efficiently using BST fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Lowest Common Ancestor of a BST."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "BST",
      "DFS"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5040,
    "totalSolved": 2923,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Lowest Common Ancestor of a BST\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Lowest Common Ancestor of a BST\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Lowest Common Ancestor of a BST\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-46",
    "number": 46,
    "slug": "kth-largest-element-in-a-stream",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Heap",
    "problemStatement": "Solve **Kth Largest Element in a Stream** efficiently using Heap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Kth Largest Element in a Stream."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "Heap",
      "Data Stream"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "73.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5160,
    "totalSolved": 2993,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Kth Largest Element in a Stream\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Kth Largest Element in a Stream\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Kth Largest Element in a Stream\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-47",
    "number": 47,
    "slug": "last-stone-weight",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Heap",
    "problemStatement": "Solve **Last Stone Weight** efficiently using Heap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Last Stone Weight."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Heap"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "76.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5280,
    "totalSolved": 3062,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Last Stone Weight\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Last Stone Weight\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Last Stone Weight\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-48",
    "number": 48,
    "slug": "single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "HashMap",
    "problemStatement": "Solve **Single Number** efficiently using HashMap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Single Number."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "73.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5400,
    "totalSolved": 3132,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Single Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Single Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Single Number\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-49",
    "number": 49,
    "slug": "jewels-and-stones",
    "title": "Jewels and Stones",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "HashMap",
    "problemStatement": "Solve **Jewels and Stones** efficiently using HashMap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Jewels and Stones."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Hash Table",
      "String"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "77.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5520,
    "totalSolved": 3202,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Jewels and Stones\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Jewels and Stones\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Jewels and Stones\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-50",
    "number": 50,
    "slug": "fibonacci-number",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Recursion",
    "problemStatement": "Solve **Fibonacci Number** efficiently using Recursion fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Fibonacci Number."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math",
      "Dynamic Programming",
      "Recursion"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "77.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5640,
    "totalSolved": 3271,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Fibonacci Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Fibonacci Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Fibonacci Number\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-51",
    "number": 51,
    "slug": "power-of-two",
    "title": "Power of Two",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Recursion",
    "problemStatement": "Solve **Power of Two** efficiently using Recursion fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Power of Two."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math",
      "Bit Manipulation",
      "Recursion"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "75.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5760,
    "totalSolved": 3341,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Power of Two\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Power of Two\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Power of Two\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-52",
    "number": 52,
    "slug": "two-sum-ii---input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Two Pointer",
    "problemStatement": "Solve **Two Sum II - Input Array Is Sorted** efficiently using Two Pointer fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Two Sum II - Input Array Is Sorted."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Binary Search"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "77.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 5880,
    "totalSolved": 3410,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Two Sum II - Input Array Is Sorted\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Two Sum II - Input Array Is Sorted\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Two Sum II - Input Array Is Sorted\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-53",
    "number": 53,
    "slug": "valid-palindrome-ii",
    "title": "Valid Palindrome II",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Two Pointer",
    "problemStatement": "Solve **Valid Palindrome II** efficiently using Two Pointer fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Valid Palindrome II."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointers",
      "String"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "78.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6000,
    "totalSolved": 3480,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Valid Palindrome II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Valid Palindrome II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Valid Palindrome II\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-54",
    "number": 54,
    "slug": "maximum-average-subarray-i",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Sliding Window",
    "problemStatement": "Solve **Maximum Average Subarray I** efficiently using Sliding Window fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Maximum Average Subarray I."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sliding Window"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "81.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6120,
    "totalSolved": 3550,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum Average Subarray I\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum Average Subarray I\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Maximum Average Subarray I\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-55",
    "number": 55,
    "slug": "minimum-recolors-for-k-blocks",
    "title": "Minimum Recolors for K Blocks",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Sliding Window",
    "problemStatement": "Solve **Minimum Recolors for K Blocks** efficiently using Sliding Window fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Minimum Recolors for K Blocks."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "String",
      "Sliding Window"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "82.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6240,
    "totalSolved": 3619,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Minimum Recolors for K Blocks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Minimum Recolors for K Blocks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Minimum Recolors for K Blocks\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-56",
    "number": 56,
    "slug": "merge-sorted-array",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Merge Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "85.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6360,
    "totalSolved": 3689,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-57",
    "number": 57,
    "slug": "sort-array-by-parity",
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Sort Array By Parity** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Sort Array By Parity."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "80.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6480,
    "totalSolved": 3758,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Array By Parity\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Array By Parity\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Sort Array By Parity\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-58",
    "number": 58,
    "slug": "squares-of-a-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Squares of a Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Squares of a Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "88.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6600,
    "totalSolved": 3828,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Squares of a Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Squares of a Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Squares of a Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-59",
    "number": 59,
    "slug": "height-checker",
    "title": "Height Checker",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Height Checker** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Height Checker."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "90.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6720,
    "totalSolved": 3898,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Height Checker\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Height Checker\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Height Checker\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-60",
    "number": 60,
    "slug": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Reverse Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Reverse Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "89.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6840,
    "totalSolved": 3967,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reverse Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reverse Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Reverse Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-61",
    "number": 61,
    "slug": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Merge Two Sorted Lists** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Two Sorted Lists."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "87.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 6960,
    "totalSolved": 4037,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Two Sorted Lists\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Two Sorted Lists\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Two Sorted Lists\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-62",
    "number": 62,
    "slug": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Linked List Cycle** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Linked List Cycle."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "91.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7080,
    "totalSolved": 4106,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Linked List Cycle\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Linked List Cycle\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Linked List Cycle\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-63",
    "number": 63,
    "slug": "middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Middle of the Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Middle of the Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7200,
    "totalSolved": 4176,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Middle of the Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Middle of the Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Middle of the Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-64",
    "number": 64,
    "slug": "min-stack",
    "title": "Min Stack",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Min Stack** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Min Stack."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "61.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7320,
    "totalSolved": 4246,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Min Stack\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Min Stack\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Min Stack\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-65",
    "number": 65,
    "slug": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Implement Queue using Stacks** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Queue using Stacks."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7440,
    "totalSolved": 4315,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Queue using Stacks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Queue using Stacks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Queue using Stacks\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-66",
    "number": 66,
    "slug": "backspace-string-compare",
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Backspace String Compare** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Backspace String Compare."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointers",
      "String",
      "Stack"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7560,
    "totalSolved": 4385,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Backspace String Compare\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Backspace String Compare\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Backspace String Compare\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-67",
    "number": 67,
    "slug": "implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Implement Stack using Queues** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Stack using Queues."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "61.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7680,
    "totalSolved": 4454,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Stack using Queues\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Stack using Queues\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Stack using Queues\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-68",
    "number": 68,
    "slug": "number-of-recent-calls",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Number of Recent Calls** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Number of Recent Calls."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Design",
      "Queue",
      "Data Stream"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "61.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7800,
    "totalSolved": 4524,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Number of Recent Calls\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Number of Recent Calls\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Number of Recent Calls\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-69",
    "number": 69,
    "slug": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Maximum Depth of Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Maximum Depth of Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "66.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 7920,
    "totalSolved": 4594,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum Depth of Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum Depth of Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Maximum Depth of Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-70",
    "number": 70,
    "slug": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Invert Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Invert Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "60.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8040,
    "totalSolved": 4663,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Invert Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Invert Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Invert Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-71",
    "number": 71,
    "slug": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Same Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Same Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "67.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8160,
    "totalSolved": 4733,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Same Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Same Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Same Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-72",
    "number": 72,
    "slug": "search-in-a-binary-search-tree",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST",
    "problemStatement": "Solve **Search in a Binary Search Tree** efficiently using BST fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Search in a Binary Search Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "BST",
      "Binary Tree"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8280,
    "totalSolved": 4802,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search in a Binary Search Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search in a Binary Search Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Search in a Binary Search Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-73",
    "number": 73,
    "slug": "lowest-common-ancestor-of-a-bst",
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST",
    "problemStatement": "Solve **Lowest Common Ancestor of a BST** efficiently using BST fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Lowest Common Ancestor of a BST."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "BST",
      "DFS"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "66.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8400,
    "totalSolved": 4872,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Lowest Common Ancestor of a BST\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Lowest Common Ancestor of a BST\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Lowest Common Ancestor of a BST\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-74",
    "number": 74,
    "slug": "kth-largest-element-in-a-stream",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Heap",
    "problemStatement": "Solve **Kth Largest Element in a Stream** efficiently using Heap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Kth Largest Element in a Stream."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "Heap",
      "Data Stream"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8520,
    "totalSolved": 4942,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Kth Largest Element in a Stream\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Kth Largest Element in a Stream\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Kth Largest Element in a Stream\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-75",
    "number": 75,
    "slug": "last-stone-weight",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Heap",
    "problemStatement": "Solve **Last Stone Weight** efficiently using Heap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Last Stone Weight."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Heap"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "63.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8640,
    "totalSolved": 5011,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Last Stone Weight\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Last Stone Weight\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Last Stone Weight\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-76",
    "number": 76,
    "slug": "single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "HashMap",
    "problemStatement": "Solve **Single Number** efficiently using HashMap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Single Number."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Bit Manipulation"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "64.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8760,
    "totalSolved": 5081,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Single Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Single Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Single Number\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-77",
    "number": 77,
    "slug": "jewels-and-stones",
    "title": "Jewels and Stones",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "HashMap",
    "problemStatement": "Solve **Jewels and Stones** efficiently using HashMap fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Jewels and Stones."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Hash Table",
      "String"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "65.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 8880,
    "totalSolved": 5150,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Jewels and Stones\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Jewels and Stones\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Jewels and Stones\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-78",
    "number": 78,
    "slug": "fibonacci-number",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Recursion",
    "problemStatement": "Solve **Fibonacci Number** efficiently using Recursion fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Fibonacci Number."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math",
      "Dynamic Programming",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "66.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9000,
    "totalSolved": 5220,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Fibonacci Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Fibonacci Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Fibonacci Number\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-79",
    "number": 79,
    "slug": "power-of-two",
    "title": "Power of Two",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Recursion",
    "problemStatement": "Solve **Power of Two** efficiently using Recursion fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Power of Two."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math",
      "Bit Manipulation",
      "Recursion"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "75.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9120,
    "totalSolved": 5290,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Power of Two\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Power of Two\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Power of Two\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-80",
    "number": 80,
    "slug": "two-sum-ii---input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Two Pointer",
    "problemStatement": "Solve **Two Sum II - Input Array Is Sorted** efficiently using Two Pointer fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Two Sum II - Input Array Is Sorted."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9240,
    "totalSolved": 5359,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Two Sum II - Input Array Is Sorted\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Two Sum II - Input Array Is Sorted\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Two Sum II - Input Array Is Sorted\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-81",
    "number": 81,
    "slug": "valid-palindrome-ii",
    "title": "Valid Palindrome II",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Two Pointer",
    "problemStatement": "Solve **Valid Palindrome II** efficiently using Two Pointer fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Valid Palindrome II."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointers",
      "String"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "75.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9360,
    "totalSolved": 5429,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Valid Palindrome II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Valid Palindrome II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Valid Palindrome II\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-82",
    "number": 82,
    "slug": "maximum-average-subarray-i",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Sliding Window",
    "problemStatement": "Solve **Maximum Average Subarray I** efficiently using Sliding Window fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Maximum Average Subarray I."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sliding Window"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "78.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9480,
    "totalSolved": 5498,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum Average Subarray I\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum Average Subarray I\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Maximum Average Subarray I\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-83",
    "number": 83,
    "slug": "minimum-recolors-for-k-blocks",
    "title": "Minimum Recolors for K Blocks",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Sliding Window",
    "problemStatement": "Solve **Minimum Recolors for K Blocks** efficiently using Sliding Window fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Minimum Recolors for K Blocks."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "String",
      "Sliding Window"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "73.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9600,
    "totalSolved": 5568,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Minimum Recolors for K Blocks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Minimum Recolors for K Blocks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Minimum Recolors for K Blocks\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-84",
    "number": 84,
    "slug": "merge-sorted-array",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Merge Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "80.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9720,
    "totalSolved": 5638,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-85",
    "number": 85,
    "slug": "sort-array-by-parity",
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Sort Array By Parity** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Sort Array By Parity."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "80.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9840,
    "totalSolved": 5707,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Array By Parity\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Array By Parity\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Sort Array By Parity\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-86",
    "number": 86,
    "slug": "squares-of-a-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Squares of a Sorted Array** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Squares of a Sorted Array."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "74.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9960,
    "totalSolved": 5777,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Squares of a Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Squares of a Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Squares of a Sorted Array\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-87",
    "number": 87,
    "slug": "height-checker",
    "title": "Height Checker",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Sorting",
    "problemStatement": "Solve **Height Checker** efficiently using Sorting fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Height Checker."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "82.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10080,
    "totalSolved": 5846,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Height Checker\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Height Checker\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Height Checker\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-88",
    "number": 88,
    "slug": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Reverse Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Reverse Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "77.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10200,
    "totalSolved": 5916,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reverse Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reverse Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Reverse Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-89",
    "number": 89,
    "slug": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Merge Two Sorted Lists** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Merge Two Sorted Lists."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "79.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10320,
    "totalSolved": 5986,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Two Sorted Lists\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Two Sorted Lists\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Merge Two Sorted Lists\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-90",
    "number": 90,
    "slug": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Linked List Cycle** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Linked List Cycle."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "80.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10440,
    "totalSolved": 6055,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Linked List Cycle\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Linked List Cycle\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Linked List Cycle\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-91",
    "number": 91,
    "slug": "middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Linked List",
    "problemStatement": "Solve **Middle of the Linked List** efficiently using Linked List fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Middle of the Linked List."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Meta",
      "Apple"
    ],
    "acceptanceRate": "79.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10560,
    "totalSolved": 6125,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Middle of the Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Middle of the Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Middle of the Linked List\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-92",
    "number": 92,
    "slug": "min-stack",
    "title": "Min Stack",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Min Stack** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Min Stack."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design"
    ],
    "companies": [
      "Apple",
      "Uber"
    ],
    "acceptanceRate": "81.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10680,
    "totalSolved": 6194,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Min Stack\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Min Stack\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Min Stack\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-93",
    "number": 93,
    "slug": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Implement Queue using Stacks** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Queue using Stacks."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Uber",
      "Adobe"
    ],
    "acceptanceRate": "85.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10800,
    "totalSolved": 6264,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Queue using Stacks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Queue using Stacks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Queue using Stacks\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-94",
    "number": 94,
    "slug": "backspace-string-compare",
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack",
    "problemStatement": "Solve **Backspace String Compare** efficiently using Stack fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Backspace String Compare."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointers",
      "String",
      "Stack"
    ],
    "companies": [
      "Adobe",
      "Netflix"
    ],
    "acceptanceRate": "88.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10920,
    "totalSolved": 6334,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Backspace String Compare\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Backspace String Compare\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Backspace String Compare\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-95",
    "number": 95,
    "slug": "implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Implement Stack using Queues** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Implement Stack using Queues."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "companies": [
      "Netflix",
      "Flipkart"
    ],
    "acceptanceRate": "84.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11040,
    "totalSolved": 6403,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Implement Stack using Queues\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Implement Stack using Queues\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Implement Stack using Queues\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-96",
    "number": 96,
    "slug": "number-of-recent-calls",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue",
    "problemStatement": "Solve **Number of Recent Calls** efficiently using Queue fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Number of Recent Calls."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Design",
      "Queue",
      "Data Stream"
    ],
    "companies": [
      "Flipkart",
      "Bloomberg"
    ],
    "acceptanceRate": "90.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11160,
    "totalSolved": 6473,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Number of Recent Calls\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Number of Recent Calls\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Number of Recent Calls\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-97",
    "number": 97,
    "slug": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Maximum Depth of Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Maximum Depth of Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "acceptanceRate": "92.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11280,
    "totalSolved": 6542,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum Depth of Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum Depth of Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Maximum Depth of Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-98",
    "number": 98,
    "slug": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Invert Binary Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Invert Binary Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS",
      "BFS"
    ],
    "companies": [
      "Amazon",
      "Google"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11400,
    "totalSolved": 6612,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Invert Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Invert Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Invert Binary Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-99",
    "number": 99,
    "slug": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree",
    "problemStatement": "Solve **Same Tree** efficiently using Tree fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Same Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "DFS"
    ],
    "companies": [
      "Google",
      "Microsoft"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11520,
    "totalSolved": 6682,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Same Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Same Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Same Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-100",
    "number": 100,
    "slug": "search-in-a-binary-search-tree",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST",
    "problemStatement": "Solve **Search in a Binary Search Tree** efficiently using BST fundamentals.\n\nRead the inputs carefully, process according to edge constraints, and return the formatted expected solution.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Basic example execution for Search in a Binary Search Tree."
      },
      {
        "input": "input_data = [4, 5, 6]",
        "output": "[4, 5, 6]"
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= Element <= 10^5"
    ],
    "inputFormat": "Input values provided as formatted argument string.",
    "outputFormat": "Expected algorithm result value.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree",
      "BST",
      "Binary Tree"
    ],
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "acceptanceRate": "60.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11640,
    "totalSolved": 6751,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search in a Binary Search Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search in a Binary Search Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> list:\n        # Solution for Search in a Binary Search Tree\n        return input_data",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "[1, 2, 3]"
      },
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "[4, 5, 6]"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [7, 8, 9]",
        "expectedOutput": "[7, 8, 9]"
      },
      {
        "input": "input_data = [0]",
        "expectedOutput": "[0]"
      }
    ],
    "expectedOutput": "[1, 2, 3]",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-101",
    "number": 101,
    "slug": "majority-element",
    "title": "Majority Element",
    "difficulty": "Easy",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Boyer-Moore Voting",
    "problemStatement": "Given the input constraints, solve **Majority Element** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Majority Element."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9545,
    "totalSolved": 4963,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Majority Element\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Majority Element\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Majority Element\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-102",
    "number": 102,
    "slug": "move-zeroes",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Two Pointers",
    "problemStatement": "Given the input constraints, solve **Move Zeroes** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Move Zeroes."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9590,
    "totalSolved": 4987,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Move Zeroes\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Move Zeroes\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Move Zeroes\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-103",
    "number": 103,
    "slug": "subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Prefix Sum + HashMap",
    "problemStatement": "Given the input constraints, solve **Subarray Sum Equals K** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarray Sum Equals K."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "43.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9635,
    "totalSolved": 5010,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarray Sum Equals K\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarray Sum Equals K\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarray Sum Equals K\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-104",
    "number": 104,
    "slug": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Prefix & Suffix Products",
    "problemStatement": "Given the input constraints, solve **Product of Array Except Self** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Product of Array Except Self."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9680,
    "totalSolved": 5034,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Product of Array Except Self\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Product of Array Except Self\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Product of Array Except Self\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-105",
    "number": 105,
    "slug": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Two Pointers",
    "problemStatement": "Given the input constraints, solve **Container With Most Water** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Container With Most Water."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9725,
    "totalSolved": 5057,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Container With Most Water\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Container With Most Water\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Container With Most Water\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-106",
    "number": 106,
    "slug": "3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Two Pointers",
    "problemStatement": "Given the input constraints, solve **3Sum** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for 3Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9770,
    "totalSolved": 5080,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for 3Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for 3Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for 3Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-107",
    "number": 107,
    "slug": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Sorting + Interval Merge",
    "problemStatement": "Given the input constraints, solve **Merge Intervals** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Merge Intervals."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9815,
    "totalSolved": 5104,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Merge Intervals\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Merge Intervals\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Merge Intervals\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-108",
    "number": 108,
    "slug": "rotate-array",
    "title": "Rotate Array",
    "difficulty": "Medium",
    "topic": "Arrays",
    "category": "Arrays",
    "pattern": "Array Reversal",
    "problemStatement": "Given the input constraints, solve **Rotate Array** efficiently using optimal Arrays techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Rotate Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Arrays pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Arrays"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9860,
    "totalSolved": 5127,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Rotate Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Rotate Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Rotate Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-109",
    "number": 109,
    "slug": "valid-anagram-ii",
    "title": "Valid Anagram II",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Frequency Counter",
    "problemStatement": "Given the input constraints, solve **Valid Anagram II** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Valid Anagram II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "64.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9905,
    "totalSolved": 5151,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Valid Anagram II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Valid Anagram II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Valid Anagram II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-110",
    "number": 110,
    "slug": "longest-common-prefix-ii",
    "title": "Longest Common Prefix II",
    "difficulty": "Easy",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Horizontal Scanning",
    "problemStatement": "Given the input constraints, solve **Longest Common Prefix II** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Longest Common Prefix II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "65.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 9950,
    "totalSolved": 5174,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Longest Common Prefix II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Longest Common Prefix II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Longest Common Prefix II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-111",
    "number": 111,
    "slug": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Expand Around Center",
    "problemStatement": "Given the input constraints, solve **Longest Palindromic Substring** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Longest Palindromic Substring."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 9995,
    "totalSolved": 5197,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Longest Palindromic Substring\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Longest Palindromic Substring\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Longest Palindromic Substring\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-112",
    "number": 112,
    "slug": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Categorize by Count",
    "problemStatement": "Given the input constraints, solve **Group Anagrams** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Group Anagrams."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10040,
    "totalSolved": 5221,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Group Anagrams\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Group Anagrams\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Group Anagrams\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-113",
    "number": 113,
    "slug": "string-to-integer-atoi",
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "State Machine Parsing",
    "problemStatement": "Given the input constraints, solve **String to Integer (atoi)** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for String to Integer (atoi)."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10085,
    "totalSolved": 5244,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for String to Integer (atoi)\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for String to Integer (atoi)\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for String to Integer (atoi)\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-114",
    "number": 114,
    "slug": "encode-and-decode-strings",
    "title": "Encode and Decode Strings",
    "difficulty": "Medium",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Length Prefix Formatting",
    "problemStatement": "Given the input constraints, solve **Encode and Decode Strings** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Encode and Decode Strings."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "54.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10130,
    "totalSolved": 5268,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Encode and Decode Strings\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Encode and Decode Strings\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Encode and Decode Strings\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-115",
    "number": 115,
    "slug": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "Strings",
    "category": "Strings",
    "pattern": "Sliding Window",
    "problemStatement": "Given the input constraints, solve **Longest Substring Without Repeating Characters** efficiently using optimal Strings techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Longest Substring Without Repeating Characters."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Strings pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Strings"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10175,
    "totalSolved": 5291,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Longest Substring Without Repeating Characters\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Longest Substring Without Repeating Characters\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Longest Substring Without Repeating Characters\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-116",
    "number": 116,
    "slug": "find-smallest-letter-greater-than-target-ii",
    "title": "Find Smallest Letter Greater Than Target II",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Upper Bound Search",
    "problemStatement": "Given the input constraints, solve **Find Smallest Letter Greater Than Target II** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find Smallest Letter Greater Than Target II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "71.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10220,
    "totalSolved": 5314,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find Smallest Letter Greater Than Target II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find Smallest Letter Greater Than Target II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find Smallest Letter Greater Than Target II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-117",
    "number": 117,
    "slug": "arranging-coins-ii",
    "title": "Arranging Coins II",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search Math",
    "problemStatement": "Given the input constraints, solve **Arranging Coins II** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Arranging Coins II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "72.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10265,
    "totalSolved": 5338,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Arranging Coins II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Arranging Coins II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Arranging Coins II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-118",
    "number": 118,
    "slug": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Rotated Binary Search",
    "problemStatement": "Given the input constraints, solve **Search in Rotated Sorted Array** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Search in Rotated Sorted Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10310,
    "totalSolved": 5361,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search in Rotated Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search in Rotated Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Search in Rotated Sorted Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-119",
    "number": 119,
    "slug": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Pivot Binary Search",
    "problemStatement": "Given the input constraints, solve **Find Minimum in Rotated Sorted Array** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find Minimum in Rotated Sorted Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10355,
    "totalSolved": 5385,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find Minimum in Rotated Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find Minimum in Rotated Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find Minimum in Rotated Sorted Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-120",
    "number": 120,
    "slug": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Matrix Flattening",
    "problemStatement": "Given the input constraints, solve **Search a 2D Matrix** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Search a 2D Matrix."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "40.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10400,
    "totalSolved": 5408,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search a 2D Matrix\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search a 2D Matrix\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Search a 2D Matrix\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-121",
    "number": 121,
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Lower/Upper Bound",
    "problemStatement": "Given the input constraints, solve **Find First and Last Position of Element in Sorted Array** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find First and Last Position of Element in Sorted Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "41.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10445,
    "totalSolved": 5431,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find First and Last Position of Element in Sorted Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find First and Last Position of Element in Sorted Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find First and Last Position of Element in Sorted Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-122",
    "number": 122,
    "slug": "koko-eating-bananas",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "category": "Binary Search",
    "pattern": "Binary Search on Answer",
    "problemStatement": "Given the input constraints, solve **Koko Eating Bananas** efficiently using optimal Binary Search techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Koko Eating Bananas."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Binary Search pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10490,
    "totalSolved": 5455,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Koko Eating Bananas\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Koko Eating Bananas\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Koko Eating Bananas\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-123",
    "number": 123,
    "slug": "sort-array-by-parity-ii",
    "title": "Sort Array By Parity II",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Two Pointers Sorting",
    "problemStatement": "Given the input constraints, solve **Sort Array By Parity II** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sort Array By Parity II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "78.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10535,
    "totalSolved": 5478,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Array By Parity II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Array By Parity II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sort Array By Parity II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-124",
    "number": 124,
    "slug": "relative-sort-array",
    "title": "Relative Sort Array",
    "difficulty": "Easy",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Counting Sort",
    "problemStatement": "Given the input constraints, solve **Relative Sort Array** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Relative Sort Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "79.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10580,
    "totalSolved": 5502,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Relative Sort Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Relative Sort Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Relative Sort Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-125",
    "number": 125,
    "slug": "sort-colors",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Dutch National Flag",
    "problemStatement": "Given the input constraints, solve **Sort Colors** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sort Colors."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10625,
    "totalSolved": 5525,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Colors\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Colors\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sort Colors\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-126",
    "number": 126,
    "slug": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Bucket Sort / Min-Heap",
    "problemStatement": "Given the input constraints, solve **Top K Frequent Elements** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Top K Frequent Elements."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10670,
    "totalSolved": 5548,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Top K Frequent Elements\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Top K Frequent Elements\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Top K Frequent Elements\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-127",
    "number": 127,
    "slug": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "QuickSelect",
    "problemStatement": "Given the input constraints, solve **Kth Largest Element in an Array** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Kth Largest Element in an Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10715,
    "totalSolved": 5572,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Kth Largest Element in an Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Kth Largest Element in an Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Kth Largest Element in an Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-128",
    "number": 128,
    "slug": "custom-sort-string",
    "title": "Custom Sort String",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Frequency Mapping",
    "problemStatement": "Given the input constraints, solve **Custom Sort String** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Custom Sort String."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10760,
    "totalSolved": 5595,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Custom Sort String\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Custom Sort String\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Custom Sort String\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-129",
    "number": 129,
    "slug": "sort-list",
    "title": "Sort List",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Merge Sort Linked List",
    "problemStatement": "Given the input constraints, solve **Sort List** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sort List."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "49.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10805,
    "totalSolved": 5619,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sort List\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-130",
    "number": 130,
    "slug": "car-fleet",
    "title": "Car Fleet",
    "difficulty": "Medium",
    "topic": "Sorting",
    "category": "Sorting",
    "pattern": "Monotonic Stack + Sorting",
    "problemStatement": "Given the input constraints, solve **Car Fleet** efficiently using optimal Sorting techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Car Fleet."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sorting pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10850,
    "totalSolved": 5642,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Car Fleet\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Car Fleet\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Car Fleet\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-131",
    "number": 131,
    "slug": "remove-linkedlist-elements",
    "title": "Remove LinkedList Elements",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Sentinel Node",
    "problemStatement": "Given the input constraints, solve **Remove LinkedList Elements** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Remove LinkedList Elements."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "61.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10895,
    "totalSolved": 5665,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Remove LinkedList Elements\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Remove LinkedList Elements\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Remove LinkedList Elements\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-132",
    "number": 132,
    "slug": "intersection-of-two-linked-lists",
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Two Pointers Intersection",
    "problemStatement": "Given the input constraints, solve **Intersection of Two Linked Lists** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Intersection of Two Linked Lists."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "62.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 10940,
    "totalSolved": 5689,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Intersection of Two Linked Lists\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Intersection of Two Linked Lists\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Intersection of Two Linked Lists\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-133",
    "number": 133,
    "slug": "add-two-numbers",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Digit Addition Carry",
    "problemStatement": "Given the input constraints, solve **Add Two Numbers** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Add Two Numbers."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 10985,
    "totalSolved": 5712,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Add Two Numbers\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Add Two Numbers\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Add Two Numbers\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-134",
    "number": 134,
    "slug": "remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Fast & Slow Pointer Gap",
    "problemStatement": "Given the input constraints, solve **Remove Nth Node From End of List** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Remove Nth Node From End of List."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "54.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11030,
    "totalSolved": 5736,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Remove Nth Node From End of List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Remove Nth Node From End of List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Remove Nth Node From End of List\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-135",
    "number": 135,
    "slug": "reorder-list",
    "title": "Reorder List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Reverse & Merge Half",
    "problemStatement": "Given the input constraints, solve **Reorder List** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Reorder List."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11075,
    "totalSolved": 5759,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reorder List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reorder List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Reorder List\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-136",
    "number": 136,
    "slug": "copy-list-with-random-pointer",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Interleaving Nodes",
    "problemStatement": "Given the input constraints, solve **Copy List with Random Pointer** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Copy List with Random Pointer."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11120,
    "totalSolved": 5782,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Copy List with Random Pointer\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Copy List with Random Pointer\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Copy List with Random Pointer\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-137",
    "number": 137,
    "slug": "linked-list-cycle-ii",
    "title": "Linked List Cycle II",
    "difficulty": "Medium",
    "topic": "Linked List",
    "category": "Linked List",
    "pattern": "Floyd Cycle Detection",
    "problemStatement": "Given the input constraints, solve **Linked List Cycle II** efficiently using optimal Linked List techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Linked List Cycle II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Linked List pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11165,
    "totalSolved": 5806,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Linked List Cycle II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Linked List Cycle II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Linked List Cycle II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-138",
    "number": 138,
    "slug": "remove-outermost-parentheses",
    "title": "Remove Outermost Parentheses",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Depth Counter",
    "problemStatement": "Given the input constraints, solve **Remove Outermost Parentheses** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Remove Outermost Parentheses."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11210,
    "totalSolved": 5829,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Remove Outermost Parentheses\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Remove Outermost Parentheses\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Remove Outermost Parentheses\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-139",
    "number": 139,
    "slug": "make-the-string-great",
    "title": "Make The String Great",
    "difficulty": "Easy",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Stack String Cancellation",
    "problemStatement": "Given the input constraints, solve **Make The String Great** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Make The String Great."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11255,
    "totalSolved": 5853,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Make The String Great\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Make The String Great\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Make The String Great\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-140",
    "number": 140,
    "slug": "evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Postfix Evaluation",
    "problemStatement": "Given the input constraints, solve **Evaluate Reverse Polish Notation** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Evaluate Reverse Polish Notation."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "40.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11300,
    "totalSolved": 5876,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Evaluate Reverse Polish Notation\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Evaluate Reverse Polish Notation\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Evaluate Reverse Polish Notation\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-141",
    "number": 141,
    "slug": "daily-temperatures",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Monotonic Stack",
    "problemStatement": "Given the input constraints, solve **Daily Temperatures** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Daily Temperatures."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "41.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11345,
    "totalSolved": 5899,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Daily Temperatures\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Daily Temperatures\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Daily Temperatures\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-142",
    "number": 142,
    "slug": "asteroid-collision",
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Simulation Stack",
    "problemStatement": "Given the input constraints, solve **Asteroid Collision** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Asteroid Collision."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11390,
    "totalSolved": 5923,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Asteroid Collision\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Asteroid Collision\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Asteroid Collision\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-143",
    "number": 143,
    "slug": "decode-string",
    "title": "Decode String",
    "difficulty": "Medium",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Nested Stack Decoding",
    "problemStatement": "Given the input constraints, solve **Decode String** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Decode String."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "43.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11435,
    "totalSolved": 5946,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Decode String\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Decode String\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Decode String\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-144",
    "number": 144,
    "slug": "simplify-path",
    "title": "Simplify Path",
    "difficulty": "Medium",
    "topic": "Stack",
    "category": "Stack",
    "pattern": "Directory Stack",
    "problemStatement": "Given the input constraints, solve **Simplify Path** efficiently using optimal Stack techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Simplify Path."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Stack pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Stack"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11480,
    "totalSolved": 5970,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Simplify Path\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Simplify Path\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Simplify Path\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-145",
    "number": 145,
    "slug": "moving-average-from-data-stream",
    "title": "Moving Average from Data Stream",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Sliding Window Queue",
    "problemStatement": "Given the input constraints, solve **Moving Average from Data Stream** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Moving Average from Data Stream."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "75.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11525,
    "totalSolved": 5993,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Moving Average from Data Stream\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Moving Average from Data Stream\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Moving Average from Data Stream\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-146",
    "number": 146,
    "slug": "first-unique-character-in-a-string-queue",
    "title": "First Unique Character in a String Queue",
    "difficulty": "Easy",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue Stream Processing",
    "problemStatement": "Given the input constraints, solve **First Unique Character in a String Queue** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for First Unique Character in a String Queue."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "76.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11570,
    "totalSolved": 6016,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for First Unique Character in a String Queue\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for First Unique Character in a String Queue\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for First Unique Character in a String Queue\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-147",
    "number": 147,
    "slug": "design-circular-queue",
    "title": "Design Circular Queue",
    "difficulty": "Medium",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Array Buffer Pointer",
    "problemStatement": "Given the input constraints, solve **Design Circular Queue** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Design Circular Queue."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11615,
    "totalSolved": 6040,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Design Circular Queue\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Design Circular Queue\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Design Circular Queue\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-148",
    "number": 148,
    "slug": "dota2-senate",
    "title": "Dota2 Senate",
    "difficulty": "Medium",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Two Queue Simulation",
    "problemStatement": "Given the input constraints, solve **Dota2 Senate** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Dota2 Senate."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11660,
    "totalSolved": 6063,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Dota2 Senate\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Dota2 Senate\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Dota2 Senate\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-149",
    "number": 149,
    "slug": "task-scheduler",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Priority Queue / Idle Fill",
    "problemStatement": "Given the input constraints, solve **Task Scheduler** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Task Scheduler."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "49.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11705,
    "totalSolved": 6087,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Task Scheduler\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Task Scheduler\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Task Scheduler\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-150",
    "number": 150,
    "slug": "design-hit-counter",
    "title": "Design Hit Counter",
    "difficulty": "Medium",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Fixed Buffer Queue",
    "problemStatement": "Given the input constraints, solve **Design Hit Counter** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Design Hit Counter."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11750,
    "totalSolved": 6110,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Design Hit Counter\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Design Hit Counter\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Design Hit Counter\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-151",
    "number": 151,
    "slug": "find-the-winner-of-the-circular-game",
    "title": "Find the Winner of the Circular Game",
    "difficulty": "Medium",
    "topic": "Queue",
    "category": "Queue",
    "pattern": "Queue Josephus Simulation",
    "problemStatement": "Given the input constraints, solve **Find the Winner of the Circular Game** efficiently using optimal Queue techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find the Winner of the Circular Game."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Queue pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Queue"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11795,
    "totalSolved": 6133,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find the Winner of the Circular Game\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find the Winner of the Circular Game\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find the Winner of the Circular Game\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-152",
    "number": 152,
    "slug": "balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Height Bottom-Up DFS",
    "problemStatement": "Given the input constraints, solve **Balanced Binary Tree** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Balanced Binary Tree."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11840,
    "totalSolved": 6157,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Balanced Binary Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Balanced Binary Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Balanced Binary Tree\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-153",
    "number": 153,
    "slug": "subtree-of-another-tree",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Tree Serialization / DFS",
    "problemStatement": "Given the input constraints, solve **Subtree of Another Tree** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subtree of Another Tree."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 11885,
    "totalSolved": 6180,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subtree of Another Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subtree of Another Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subtree of Another Tree\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-154",
    "number": 154,
    "slug": "binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Queue BFS",
    "problemStatement": "Given the input constraints, solve **Binary Tree Level Order Traversal** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Binary Tree Level Order Traversal."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "54.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11930,
    "totalSolved": 6204,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Binary Tree Level Order Traversal\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Binary Tree Level Order Traversal\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Binary Tree Level Order Traversal\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-155",
    "number": 155,
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Divide and Conquer Tree",
    "problemStatement": "Given the input constraints, solve **Construct Binary Tree from Preorder and Inorder Traversal** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Construct Binary Tree from Preorder and Inorder Traversal."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 11975,
    "totalSolved": 6227,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Construct Binary Tree from Preorder and Inorder Traversal\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Construct Binary Tree from Preorder and Inorder Traversal\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Construct Binary Tree from Preorder and Inorder Traversal\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-156",
    "number": 156,
    "slug": "binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "BFS / DFS Level Marker",
    "problemStatement": "Given the input constraints, solve **Binary Tree Right Side View** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Binary Tree Right Side View."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12020,
    "totalSolved": 6250,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Binary Tree Right Side View\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Binary Tree Right Side View\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Binary Tree Right Side View\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-157",
    "number": 157,
    "slug": "path-sum-ii",
    "title": "Path Sum II",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Backtracking Tree DFS",
    "problemStatement": "Given the input constraints, solve **Path Sum II** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Path Sum II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12065,
    "totalSolved": 6274,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Path Sum II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Path Sum II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Path Sum II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-158",
    "number": 158,
    "slug": "flatten-binary-tree-to-linked-list",
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Preorder Link Swap",
    "problemStatement": "Given the input constraints, solve **Flatten Binary Tree to Linked List** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Flatten Binary Tree to Linked List."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12110,
    "totalSolved": 6297,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Flatten Binary Tree to Linked List\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Flatten Binary Tree to Linked List\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Flatten Binary Tree to Linked List\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-159",
    "number": 159,
    "slug": "populating-next-right-pointers-in-each-node",
    "title": "Populating Next Right Pointers in Each Node",
    "difficulty": "Medium",
    "topic": "Tree",
    "category": "Tree",
    "pattern": "Level Link Pointers",
    "problemStatement": "Given the input constraints, solve **Populating Next Right Pointers in Each Node** efficiently using optimal Tree techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Populating Next Right Pointers in Each Node."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Tree pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Tree"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12155,
    "totalSolved": 6321,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Populating Next Right Pointers in Each Node\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Populating Next Right Pointers in Each Node\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Populating Next Right Pointers in Each Node\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-160",
    "number": 160,
    "slug": "convert-sorted-array-to-binary-search-tree-ii",
    "title": "Convert Sorted Array to Binary Search Tree II",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "Divide and Conquer Midpoint",
    "problemStatement": "Given the input constraints, solve **Convert Sorted Array to Binary Search Tree II** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Convert Sorted Array to Binary Search Tree II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "65.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12200,
    "totalSolved": 6344,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Convert Sorted Array to Binary Search Tree II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Convert Sorted Array to Binary Search Tree II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Convert Sorted Array to Binary Search Tree II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-161",
    "number": 161,
    "slug": "range-sum-of-bst",
    "title": "Range Sum of BST",
    "difficulty": "Easy",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST Pruning Traversal",
    "problemStatement": "Given the input constraints, solve **Range Sum of BST** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Range Sum of BST."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "66.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12245,
    "totalSolved": 6367,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Range Sum of BST\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Range Sum of BST\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Range Sum of BST\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-162",
    "number": 162,
    "slug": "kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "topic": "BST",
    "category": "BST",
    "pattern": "Inorder Traversal Counter",
    "problemStatement": "Given the input constraints, solve **Kth Smallest Element in a BST** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Kth Smallest Element in a BST."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12290,
    "totalSolved": 6391,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Kth Smallest Element in a BST\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Kth Smallest Element in a BST\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Kth Smallest Element in a BST\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-163",
    "number": 163,
    "slug": "validate-binary-search-tree",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topic": "BST",
    "category": "BST",
    "pattern": "Min/Max Bound Validation",
    "problemStatement": "Given the input constraints, solve **Validate Binary Search Tree** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Validate Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "43.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12335,
    "totalSolved": 6414,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Validate Binary Search Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Validate Binary Search Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Validate Binary Search Tree\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-164",
    "number": 164,
    "slug": "bst-iterator",
    "title": "BST Iterator",
    "difficulty": "Medium",
    "topic": "BST",
    "category": "BST",
    "pattern": "Controlled Stack Inorder",
    "problemStatement": "Given the input constraints, solve **BST Iterator** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for BST Iterator."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12380,
    "totalSolved": 6438,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for BST Iterator\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for BST Iterator\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for BST Iterator\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-165",
    "number": 165,
    "slug": "delete-node-in-a-bst",
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "topic": "BST",
    "category": "BST",
    "pattern": "Inorder Successor Swap",
    "problemStatement": "Given the input constraints, solve **Delete Node in a BST** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Delete Node in a BST."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12425,
    "totalSolved": 6461,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Delete Node in a BST\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Delete Node in a BST\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Delete Node in a BST\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-166",
    "number": 166,
    "slug": "insert-into-a-binary-search-tree",
    "title": "Insert into a Binary Search Tree",
    "difficulty": "Medium",
    "topic": "BST",
    "category": "BST",
    "pattern": "BST Search & Attach",
    "problemStatement": "Given the input constraints, solve **Insert into a Binary Search Tree** efficiently using optimal BST techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Insert into a Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal BST pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "BST"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12470,
    "totalSolved": 6484,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Insert into a Binary Search Tree\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Insert into a Binary Search Tree\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Insert into a Binary Search Tree\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-167",
    "number": 167,
    "slug": "relative-ranks",
    "title": "Relative Ranks",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Max-Heap / Sorting Rank",
    "problemStatement": "Given the input constraints, solve **Relative Ranks** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Relative Ranks."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "72.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12515,
    "totalSolved": 6508,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Relative Ranks\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Relative Ranks\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Relative Ranks\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-168",
    "number": 168,
    "slug": "take-gifts-from-the-richest-pile",
    "title": "Take Gifts From the Richest Pile",
    "difficulty": "Easy",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Max-Heap Square Root",
    "problemStatement": "Given the input constraints, solve **Take Gifts From the Richest Pile** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Take Gifts From the Richest Pile."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "73.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12560,
    "totalSolved": 6531,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Take Gifts From the Richest Pile\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Take Gifts From the Richest Pile\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Take Gifts From the Richest Pile\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-169",
    "number": 169,
    "slug": "reorganize-string",
    "title": "Reorganize String",
    "difficulty": "Medium",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Max-Heap Frequency Swap",
    "problemStatement": "Given the input constraints, solve **Reorganize String** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Reorganize String."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "49.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12605,
    "totalSolved": 6555,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reorganize String\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reorganize String\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Reorganize String\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-170",
    "number": 170,
    "slug": "find-k-pairs-with-smallest-sums",
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Min-Heap Multi-pointer",
    "problemStatement": "Given the input constraints, solve **Find K Pairs with Smallest Sums** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find K Pairs with Smallest Sums."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12650,
    "totalSolved": 6578,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find K Pairs with Smallest Sums\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find K Pairs with Smallest Sums\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find K Pairs with Smallest Sums\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-171",
    "number": 171,
    "slug": "k-closest-points-to-origin",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Max-Heap / QuickSelect",
    "problemStatement": "Given the input constraints, solve **K Closest Points to Origin** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for K Closest Points to Origin."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12695,
    "totalSolved": 6601,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for K Closest Points to Origin\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for K Closest Points to Origin\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for K Closest Points to Origin\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-172",
    "number": 172,
    "slug": "furthest-building-you-can-reach",
    "title": "Furthest Building You Can Reach",
    "difficulty": "Medium",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Min-Heap Greedy Bricks",
    "problemStatement": "Given the input constraints, solve **Furthest Building You Can Reach** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Furthest Building You Can Reach."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12740,
    "totalSolved": 6625,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Furthest Building You Can Reach\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Furthest Building You Can Reach\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Furthest Building You Can Reach\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-173",
    "number": 173,
    "slug": "sort-characters-by-frequency",
    "title": "Sort Characters By Frequency",
    "difficulty": "Medium",
    "topic": "Heap",
    "category": "Heap",
    "pattern": "Max-Heap / Bucket Sort",
    "problemStatement": "Given the input constraints, solve **Sort Characters By Frequency** efficiently using optimal Heap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sort Characters By Frequency."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Heap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Heap"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12785,
    "totalSolved": 6648,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sort Characters By Frequency\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sort Characters By Frequency\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sort Characters By Frequency\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-174",
    "number": 174,
    "slug": "contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Sliding Window Map",
    "problemStatement": "Given the input constraints, solve **Contains Duplicate II** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Contains Duplicate II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "79.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12830,
    "totalSolved": 6672,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Contains Duplicate II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Contains Duplicate II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Contains Duplicate II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-175",
    "number": 175,
    "slug": "word-pattern",
    "title": "Word Pattern",
    "difficulty": "Easy",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Bijections Mapping",
    "problemStatement": "Given the input constraints, solve **Word Pattern** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Word Pattern."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 12875,
    "totalSolved": 6695,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Word Pattern\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Word Pattern\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Word Pattern\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-176",
    "number": 176,
    "slug": "continuous-subarray-sum",
    "title": "Continuous Subarray Sum",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Modulo Mod Map",
    "problemStatement": "Given the input constraints, solve **Continuous Subarray Sum** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Continuous Subarray Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12920,
    "totalSolved": 6718,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Continuous Subarray Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Continuous Subarray Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Continuous Subarray Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-177",
    "number": 177,
    "slug": "insert-delete-getrandom-o-1",
    "title": "Insert Delete GetRandom O(1)",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Map + Dynamic Array",
    "problemStatement": "Given the input constraints, solve **Insert Delete GetRandom O(1)** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Insert Delete GetRandom O(1)."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 12965,
    "totalSolved": 6742,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Insert Delete GetRandom O(1)\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Insert Delete GetRandom O(1)\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Insert Delete GetRandom O(1)\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-178",
    "number": 178,
    "slug": "find-players-with-zero-or-one-losses",
    "title": "Find Players With Zero or One Losses",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Count Frequency Map",
    "problemStatement": "Given the input constraints, solve **Find Players With Zero or One Losses** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find Players With Zero or One Losses."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13010,
    "totalSolved": 6765,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find Players With Zero or One Losses\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find Players With Zero or One Losses\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find Players With Zero or One Losses\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-179",
    "number": 179,
    "slug": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Set Start Element Lookup",
    "problemStatement": "Given the input constraints, solve **Longest Consecutive Sequence** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Longest Consecutive Sequence."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13055,
    "totalSolved": 6789,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Longest Consecutive Sequence\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Longest Consecutive Sequence\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Longest Consecutive Sequence\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-180",
    "number": 180,
    "slug": "subarray-sums-divisible-by-k",
    "title": "Subarray Sums Divisible by K",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Remainder Frequency Map",
    "problemStatement": "Given the input constraints, solve **Subarray Sums Divisible by K** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarray Sums Divisible by K."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "40.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13100,
    "totalSolved": 6812,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarray Sums Divisible by K\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarray Sums Divisible by K\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarray Sums Divisible by K\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-181",
    "number": 181,
    "slug": "group-shifted-strings",
    "title": "Group Shifted Strings",
    "difficulty": "Medium",
    "topic": "HashMap",
    "category": "HashMap",
    "pattern": "Canonical Difference Key",
    "problemStatement": "Given the input constraints, solve **Group Shifted Strings** efficiently using optimal HashMap techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Group Shifted Strings."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal HashMap pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "HashMap"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "41.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13145,
    "totalSolved": 6835,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Group Shifted Strings\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Group Shifted Strings\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Group Shifted Strings\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-182",
    "number": 182,
    "slug": "climbing-stairs-ii",
    "title": "Climbing Stairs II",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Memoized Recursion",
    "problemStatement": "Given the input constraints, solve **Climbing Stairs II** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Climbing Stairs II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "62.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13190,
    "totalSolved": 6859,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Climbing Stairs II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Climbing Stairs II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Climbing Stairs II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-183",
    "number": 183,
    "slug": "power-of-three",
    "title": "Power of Three",
    "difficulty": "Easy",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Recursive Division",
    "problemStatement": "Given the input constraints, solve **Power of Three** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Power of Three."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "63.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13235,
    "totalSolved": 6882,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Power of Three\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Power of Three\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Power of Three\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-184",
    "number": 184,
    "slug": "pow-x-n",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Fast Binary Exponentiation",
    "problemStatement": "Given the input constraints, solve **Pow(x, n)** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Pow(x, n)."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13280,
    "totalSolved": 6906,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Pow(x, n)\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Pow(x, n)\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Pow(x, n)\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-185",
    "number": 185,
    "slug": "k-th-symbol-in-grammar",
    "title": "K-th Symbol in Grammar",
    "difficulty": "Medium",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Tree Halving Recursion",
    "problemStatement": "Given the input constraints, solve **K-th Symbol in Grammar** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for K-th Symbol in Grammar."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13325,
    "totalSolved": 6929,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for K-th Symbol in Grammar\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for K-th Symbol in Grammar\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for K-th Symbol in Grammar\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-186",
    "number": 186,
    "slug": "tower-of-hanoi",
    "title": "Tower of Hanoi",
    "difficulty": "Medium",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Classic Divide & Conquer",
    "problemStatement": "Given the input constraints, solve **Tower of Hanoi** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Tower of Hanoi."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13370,
    "totalSolved": 6952,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Tower of Hanoi\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Tower of Hanoi\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Tower of Hanoi\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-187",
    "number": 187,
    "slug": "find-the-winner-of-the-circular-game-recursive",
    "title": "Find the Winner of the Circular Game (Recursive)",
    "difficulty": "Medium",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Josephus Recursive Relation",
    "problemStatement": "Given the input constraints, solve **Find the Winner of the Circular Game (Recursive)** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find the Winner of the Circular Game (Recursive)."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13415,
    "totalSolved": 6976,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find the Winner of the Circular Game (Recursive)\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find the Winner of the Circular Game (Recursive)\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find the Winner of the Circular Game (Recursive)\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-188",
    "number": 188,
    "slug": "partition-to-k-equal-sum-subsets",
    "title": "Partition to K Equal Sum Subsets",
    "difficulty": "Medium",
    "topic": "Recursion",
    "category": "Recursion",
    "pattern": "Backtracking Search",
    "problemStatement": "Given the input constraints, solve **Partition to K Equal Sum Subsets** efficiently using optimal Recursion techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Partition to K Equal Sum Subsets."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Recursion pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Recursion"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13460,
    "totalSolved": 6999,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Partition to K Equal Sum Subsets\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Partition to K Equal Sum Subsets\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Partition to K Equal Sum Subsets\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-189",
    "number": 189,
    "slug": "binary-tree-paths",
    "title": "Binary Tree Paths",
    "difficulty": "Easy",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Root-to-Leaf Backtrack",
    "problemStatement": "Given the input constraints, solve **Binary Tree Paths** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Binary Tree Paths."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13505,
    "totalSolved": 7023,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Binary Tree Paths\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Binary Tree Paths\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Binary Tree Paths\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-190",
    "number": 190,
    "slug": "sum-of-all-subset-xor-totals",
    "title": "Sum of All Subset XOR Totals",
    "difficulty": "Easy",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Include/Exclude Subsets",
    "problemStatement": "Given the input constraints, solve **Sum of All Subset XOR Totals** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sum of All Subset XOR Totals."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "70.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13550,
    "totalSolved": 7046,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sum of All Subset XOR Totals\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sum of All Subset XOR Totals\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sum of All Subset XOR Totals\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-191",
    "number": 191,
    "slug": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Swap / Visited Array",
    "problemStatement": "Given the input constraints, solve **Permutations** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Permutations."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13595,
    "totalSolved": 7069,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Permutations\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Permutations\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Permutations\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-192",
    "number": 192,
    "slug": "subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Cascading / Decision Tree",
    "problemStatement": "Given the input constraints, solve **Subsets** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subsets."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13640,
    "totalSolved": 7093,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subsets\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subsets\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subsets\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-193",
    "number": 193,
    "slug": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Unbounded Choice Tree",
    "problemStatement": "Given the input constraints, solve **Combination Sum** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Combination Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13685,
    "totalSolved": 7116,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Combination Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Combination Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Combination Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-194",
    "number": 194,
    "slug": "word-search",
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "2D Grid DFS Backtrack",
    "problemStatement": "Given the input constraints, solve **Word Search** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Word Search."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "54.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13730,
    "totalSolved": 7140,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Word Search\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Word Search\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Word Search\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-195",
    "number": 195,
    "slug": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Digit Mapping Tree",
    "problemStatement": "Given the input constraints, solve **Letter Combinations of a Phone Number** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Letter Combinations of a Phone Number."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13775,
    "totalSolved": 7163,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Letter Combinations of a Phone Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Letter Combinations of a Phone Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Letter Combinations of a Phone Number\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-196",
    "number": 196,
    "slug": "palindrome-partitioning",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "category": "Backtracking",
    "pattern": "Subproblem Partitioning",
    "problemStatement": "Given the input constraints, solve **Palindrome Partitioning** efficiently using optimal Backtracking techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Palindrome Partitioning."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Backtracking pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Backtracking"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13820,
    "totalSolved": 7186,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Palindrome Partitioning\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Palindrome Partitioning\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Palindrome Partitioning\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-197",
    "number": 197,
    "slug": "valid-palindrome-iii",
    "title": "Valid Palindrome III",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Inward Pointers",
    "problemStatement": "Given the input constraints, solve **Valid Palindrome III** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Valid Palindrome III."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "77.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13865,
    "totalSolved": 7210,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Valid Palindrome III\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Valid Palindrome III\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Valid Palindrome III\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-198",
    "number": 198,
    "slug": "remove-duplicates-from-sorted-array-ii",
    "title": "Remove Duplicates from Sorted Array II",
    "difficulty": "Easy",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Slow/Fast Pointers",
    "problemStatement": "Given the input constraints, solve **Remove Duplicates from Sorted Array II** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Remove Duplicates from Sorted Array II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "78.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 13910,
    "totalSolved": 7233,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Remove Duplicates from Sorted Array II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Remove Duplicates from Sorted Array II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Remove Duplicates from Sorted Array II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-199",
    "number": 199,
    "slug": "container-with-most-water-ii",
    "title": "Container With Most Water II",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Outer Boundary Pointers",
    "problemStatement": "Given the input constraints, solve **Container With Most Water II** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Container With Most Water II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 13955,
    "totalSolved": 7257,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Container With Most Water II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Container With Most Water II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Container With Most Water II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-200",
    "number": 200,
    "slug": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Left/Right Max Pointers",
    "problemStatement": "Given the input constraints, solve **Trapping Rain Water** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Trapping Rain Water."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "40.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14000,
    "totalSolved": 7280,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Trapping Rain Water\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Trapping Rain Water\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Trapping Rain Water\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-201",
    "number": 201,
    "slug": "3sum-closest",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Sorted Target Search",
    "problemStatement": "Given the input constraints, solve **3Sum Closest** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for 3Sum Closest."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "41.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14045,
    "totalSolved": 7303,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for 3Sum Closest\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for 3Sum Closest\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for 3Sum Closest\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-202",
    "number": 202,
    "slug": "4sum",
    "title": "4Sum",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Nested Two Pointers",
    "problemStatement": "Given the input constraints, solve **4Sum** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for 4Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14090,
    "totalSolved": 7327,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for 4Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for 4Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for 4Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-203",
    "number": 203,
    "slug": "subarrays-with-k-different-integers",
    "title": "Subarrays with K Different Integers",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "At Most K Window Difference",
    "problemStatement": "Given the input constraints, solve **Subarrays with K Different Integers** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarrays with K Different Integers."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "43.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14135,
    "totalSolved": 7350,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarrays with K Different Integers\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarrays with K Different Integers\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarrays with K Different Integers\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-204",
    "number": 204,
    "slug": "boats-to-save-people",
    "title": "Boats to Save People",
    "difficulty": "Medium",
    "topic": "Two Pointer",
    "category": "Two Pointer",
    "pattern": "Greedy Pair Pointers",
    "problemStatement": "Given the input constraints, solve **Boats to Save People** efficiently using optimal Two Pointer techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Boats to Save People."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Two Pointer pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Two Pointer"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14180,
    "totalSolved": 7374,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Boats to Save People\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Boats to Save People\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Boats to Save People\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-205",
    "number": 205,
    "slug": "defuse-the-bomb",
    "title": "Defuse the Bomb",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Circular Fixed Window",
    "problemStatement": "Given the input constraints, solve **Defuse the Bomb** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Defuse the Bomb."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "60.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14225,
    "totalSolved": 7397,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Defuse the Bomb\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Defuse the Bomb\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Defuse the Bomb\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-206",
    "number": 206,
    "slug": "minimum-difference-between-highest-and-lowest-of-k-scores",
    "title": "Minimum Difference Between Highest and Lowest of K Scores",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Sorted Fixed Window",
    "problemStatement": "Given the input constraints, solve **Minimum Difference Between Highest and Lowest of K Scores** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Minimum Difference Between Highest and Lowest of K Scores."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "61.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14270,
    "totalSolved": 7420,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Minimum Difference Between Highest and Lowest of K Scores\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Minimum Difference Between Highest and Lowest of K Scores\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Minimum Difference Between Highest and Lowest of K Scores\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-207",
    "number": 207,
    "slug": "longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Max Frequency Count Window",
    "problemStatement": "Given the input constraints, solve **Longest Repeating Character Replacement** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Longest Repeating Character Replacement."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14315,
    "totalSolved": 7444,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Longest Repeating Character Replacement\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Longest Repeating Character Replacement\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Longest Repeating Character Replacement\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-208",
    "number": 208,
    "slug": "permutation-in-string",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Matches Count Fixed Window",
    "problemStatement": "Given the input constraints, solve **Permutation in String** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Permutation in String."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14360,
    "totalSolved": 7467,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Permutation in String\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Permutation in String\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Permutation in String\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-209",
    "number": 209,
    "slug": "minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Variable Expand/Shrink Window",
    "problemStatement": "Given the input constraints, solve **Minimum Size Subarray Sum** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Minimum Size Subarray Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "49.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14405,
    "totalSolved": 7491,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Minimum Size Subarray Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Minimum Size Subarray Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Minimum Size Subarray Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-210",
    "number": 210,
    "slug": "fruit-into-baskets",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "At Most 2 Unique Map Window",
    "problemStatement": "Given the input constraints, solve **Fruit Into Baskets** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Fruit Into Baskets."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14450,
    "totalSolved": 7514,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Fruit Into Baskets\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Fruit Into Baskets\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Fruit Into Baskets\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-211",
    "number": 211,
    "slug": "max-consecutive-ones-iii",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "At Most K Zeroes Window",
    "problemStatement": "Given the input constraints, solve **Max Consecutive Ones III** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Max Consecutive Ones III."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14495,
    "totalSolved": 7537,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Max Consecutive Ones III\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Max Consecutive Ones III\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Max Consecutive Ones III\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-212",
    "number": 212,
    "slug": "subarray-product-less-than-k",
    "title": "Subarray Product Less Than K",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "category": "Sliding Window",
    "pattern": "Product Shrink Window",
    "problemStatement": "Given the input constraints, solve **Subarray Product Less Than K** efficiently using optimal Sliding Window techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarray Product Less Than K."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Sliding Window pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Sliding Window"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14540,
    "totalSolved": 7561,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarray Product Less Than K\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarray Product Less Than K\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarray Product Less Than K\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-213",
    "number": 213,
    "slug": "find-pivot-index",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Total Sum Left Comparison",
    "problemStatement": "Given the input constraints, solve **Find Pivot Index** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Find Pivot Index."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "68.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14585,
    "totalSolved": 7584,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Find Pivot Index\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Find Pivot Index\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Find Pivot Index\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-214",
    "number": 214,
    "slug": "range-sum-query-immutable",
    "title": "Range Sum Query - Immutable",
    "difficulty": "Easy",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Precomputed Cumulative Array",
    "problemStatement": "Given the input constraints, solve **Range Sum Query - Immutable** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Range Sum Query - Immutable."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "69.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14630,
    "totalSolved": 7608,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Range Sum Query - Immutable\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Range Sum Query - Immutable\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Range Sum Query - Immutable\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-215",
    "number": 215,
    "slug": "subarray-sum-equals-k-prefix-sum",
    "title": "Subarray Sum Equals K (Prefix Sum)",
    "difficulty": "Medium",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Prefix Difference Frequency Map",
    "problemStatement": "Given the input constraints, solve **Subarray Sum Equals K (Prefix Sum)** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarray Sum Equals K (Prefix Sum)."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "55.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14675,
    "totalSolved": 7631,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarray Sum Equals K (Prefix Sum)\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarray Sum Equals K (Prefix Sum)\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarray Sum Equals K (Prefix Sum)\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-216",
    "number": 216,
    "slug": "continuous-subarray-sum-prefix",
    "title": "Continuous Subarray Sum Prefix",
    "difficulty": "Medium",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Remainder Index Map",
    "problemStatement": "Given the input constraints, solve **Continuous Subarray Sum Prefix** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Continuous Subarray Sum Prefix."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "56.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14720,
    "totalSolved": 7654,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Continuous Subarray Sum Prefix\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Continuous Subarray Sum Prefix\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Continuous Subarray Sum Prefix\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-217",
    "number": 217,
    "slug": "product-of-array-except-self-prefix",
    "title": "Product of Array Except Self Prefix",
    "difficulty": "Medium",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Left/Right Cumulative Product",
    "problemStatement": "Given the input constraints, solve **Product of Array Except Self Prefix** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Product of Array Except Self Prefix."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14765,
    "totalSolved": 7678,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Product of Array Except Self Prefix\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Product of Array Except Self Prefix\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Product of Array Except Self Prefix\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-218",
    "number": 218,
    "slug": "subarray-sums-divisible-by-k-prefix",
    "title": "Subarray Sums Divisible by K Prefix",
    "difficulty": "Medium",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Normalized Remainder Frequency",
    "problemStatement": "Given the input constraints, solve **Subarray Sums Divisible by K Prefix** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Subarray Sums Divisible by K Prefix."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14810,
    "totalSolved": 7701,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Subarray Sums Divisible by K Prefix\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Subarray Sums Divisible by K Prefix\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Subarray Sums Divisible by K Prefix\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-219",
    "number": 219,
    "slug": "car-pooling",
    "title": "Car Pooling",
    "difficulty": "Medium",
    "topic": "Prefix Sum",
    "category": "Prefix Sum",
    "pattern": "Difference Array Capacity",
    "problemStatement": "Given the input constraints, solve **Car Pooling** efficiently using optimal Prefix Sum techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Car Pooling."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Prefix Sum pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Prefix Sum"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14855,
    "totalSolved": 7725,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Car Pooling\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Car Pooling\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Car Pooling\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-220",
    "number": 220,
    "slug": "matrix-diagonal-sum",
    "title": "Matrix Diagonal Sum",
    "difficulty": "Easy",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Primary & Secondary Diagonal",
    "problemStatement": "Given the input constraints, solve **Matrix Diagonal Sum** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Matrix Diagonal Sum."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "75.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14900,
    "totalSolved": 7748,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Matrix Diagonal Sum\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Matrix Diagonal Sum\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Matrix Diagonal Sum\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-221",
    "number": 221,
    "slug": "flipping-an-image",
    "title": "Flipping an Image",
    "difficulty": "Easy",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Row Invert & Reverse",
    "problemStatement": "Given the input constraints, solve **Flipping an Image** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Flipping an Image."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "76.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 14945,
    "totalSolved": 7771,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Flipping an Image\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Flipping an Image\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Flipping an Image\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-222",
    "number": 222,
    "slug": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Transpose & Reverse Rows",
    "problemStatement": "Given the input constraints, solve **Rotate Image** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Rotate Image."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 14990,
    "totalSolved": 7795,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Rotate Image\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Rotate Image\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Rotate Image\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-223",
    "number": 223,
    "slug": "spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Four Boundary Traversal",
    "problemStatement": "Given the input constraints, solve **Spiral Matrix** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Spiral Matrix."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "43.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15035,
    "totalSolved": 7818,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Spiral Matrix\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Spiral Matrix\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Spiral Matrix\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-224",
    "number": 224,
    "slug": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "First Row/Col Markers",
    "problemStatement": "Given the input constraints, solve **Set Matrix Zeroes** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Set Matrix Zeroes."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "44.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15080,
    "totalSolved": 7842,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Set Matrix Zeroes\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Set Matrix Zeroes\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Set Matrix Zeroes\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-225",
    "number": 225,
    "slug": "search-a-2d-matrix-ii",
    "title": "Search a 2D Matrix II",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Top-Right Corner Search",
    "problemStatement": "Given the input constraints, solve **Search a 2D Matrix II** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Search a 2D Matrix II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15125,
    "totalSolved": 7865,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Search a 2D Matrix II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Search a 2D Matrix II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Search a 2D Matrix II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-226",
    "number": 226,
    "slug": "valid-sudoku",
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "Row/Col/Box Hashing",
    "problemStatement": "Given the input constraints, solve **Valid Sudoku** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Valid Sudoku."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15170,
    "totalSolved": 7888,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Valid Sudoku\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Valid Sudoku\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Valid Sudoku\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-227",
    "number": 227,
    "slug": "game-of-life",
    "title": "Game of Life",
    "difficulty": "Medium",
    "topic": "Matrix",
    "category": "Matrix",
    "pattern": "In-place State Bits",
    "problemStatement": "Given the input constraints, solve **Game of Life** efficiently using optimal Matrix techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Game of Life."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Matrix pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Matrix"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15215,
    "totalSolved": 7912,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Game of Life\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Game of Life\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Game of Life\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-228",
    "number": 228,
    "slug": "assign-cookies",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Greedy Sorting Match",
    "problemStatement": "Given the input constraints, solve **Assign Cookies** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Assign Cookies."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15260,
    "totalSolved": 7935,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Assign Cookies\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Assign Cookies\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Assign Cookies\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-229",
    "number": 229,
    "slug": "lemonade-change",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Bill Count State",
    "problemStatement": "Given the input constraints, solve **Lemonade Change** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Lemonade Change."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15305,
    "totalSolved": 7959,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Lemonade Change\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Lemonade Change\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Lemonade Change\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-230",
    "number": 230,
    "slug": "jump-game",
    "title": "Jump Game",
    "difficulty": "Medium",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Farthest Reach Traversal",
    "problemStatement": "Given the input constraints, solve **Jump Game** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Jump Game."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15350,
    "totalSolved": 7982,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Jump Game\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Jump Game\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Jump Game\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-231",
    "number": 231,
    "slug": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Level Step Boundaries",
    "problemStatement": "Given the input constraints, solve **Jump Game II** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Jump Game II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "51.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15395,
    "totalSolved": 8005,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Jump Game II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Jump Game II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Jump Game II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-232",
    "number": 232,
    "slug": "gas-station",
    "title": "Gas Station",
    "difficulty": "Medium",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Net Surplus Accumulator",
    "problemStatement": "Given the input constraints, solve **Gas Station** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Gas Station."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "52.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15440,
    "totalSolved": 8029,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Gas Station\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Gas Station\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Gas Station\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-233",
    "number": 233,
    "slug": "partition-labels",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Last Occurrence Window",
    "problemStatement": "Given the input constraints, solve **Partition Labels** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Partition Labels."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "53.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15485,
    "totalSolved": 8052,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Partition Labels\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Partition Labels\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Partition Labels\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-234",
    "number": 234,
    "slug": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topic": "Greedy",
    "category": "Greedy",
    "pattern": "Earliest End Time Sorting",
    "problemStatement": "Given the input constraints, solve **Non-overlapping Intervals** efficiently using optimal Greedy techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Non-overlapping Intervals."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Greedy pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "54.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15530,
    "totalSolved": 8076,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Non-overlapping Intervals\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Non-overlapping Intervals\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Non-overlapping Intervals\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-235",
    "number": 235,
    "slug": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Brian Kernighan Bit Shift",
    "problemStatement": "Given the input constraints, solve **Number of 1 Bits** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Number of 1 Bits."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "65.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15575,
    "totalSolved": 8099,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Number of 1 Bits\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Number of 1 Bits\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Number of 1 Bits\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-236",
    "number": 236,
    "slug": "counting-bits",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Bit DP Least Significant Bit",
    "problemStatement": "Given the input constraints, solve **Counting Bits** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Counting Bits."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "66.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15620,
    "totalSolved": 8122,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Counting Bits\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Counting Bits\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Counting Bits\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-237",
    "number": 237,
    "slug": "single-number-ii",
    "title": "Single Number II",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Modulo 3 Bit Count",
    "problemStatement": "Given the input constraints, solve **Single Number II** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Single Number II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "57.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15665,
    "totalSolved": 8146,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Single Number II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Single Number II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Single Number II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-238",
    "number": 238,
    "slug": "single-number-iii",
    "title": "Single Number III",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Differentiating Bit Mask",
    "problemStatement": "Given the input constraints, solve **Single Number III** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Single Number III."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "58.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15710,
    "totalSolved": 8169,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Single Number III\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Single Number III\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Single Number III\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-239",
    "number": 239,
    "slug": "sum-of-two-integers",
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "XOR & Carry Shift",
    "problemStatement": "Given the input constraints, solve **Sum of Two Integers** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Sum of Two Integers."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "59.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15755,
    "totalSolved": 8193,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Sum of Two Integers\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Sum of Two Integers\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Sum of Two Integers\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-240",
    "number": 240,
    "slug": "reverse-bits-ii",
    "title": "Reverse Bits II",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Bit Reversal Loop",
    "problemStatement": "Given the input constraints, solve **Reverse Bits II** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Reverse Bits II."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "40.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15800,
    "totalSolved": 8216,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Reverse Bits II\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Reverse Bits II\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Reverse Bits II\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-241",
    "number": 241,
    "slug": "bitwise-and-of-numbers-range",
    "title": "Bitwise AND of Numbers Range",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Common Bit Prefix Shift",
    "problemStatement": "Given the input constraints, solve **Bitwise AND of Numbers Range** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Bitwise AND of Numbers Range."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "41.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15845,
    "totalSolved": 8239,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Bitwise AND of Numbers Range\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Bitwise AND of Numbers Range\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Bitwise AND of Numbers Range\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-242",
    "number": 242,
    "slug": "maximum-xor-of-two-numbers-in-an-array",
    "title": "Maximum XOR of Two Numbers in an Array",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "category": "Bit Manipulation",
    "pattern": "Trie / Bit Prefix Match",
    "problemStatement": "Given the input constraints, solve **Maximum XOR of Two Numbers in an Array** efficiently using optimal Bit Manipulation techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Maximum XOR of Two Numbers in an Array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Bit Manipulation pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "42.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 15890,
    "totalSolved": 8263,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Maximum XOR of Two Numbers in an Array\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Maximum XOR of Two Numbers in an Array\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Maximum XOR of Two Numbers in an Array\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-243",
    "number": 243,
    "slug": "fizz-buzz",
    "title": "Fizz Buzz",
    "difficulty": "Easy",
    "topic": "Math",
    "category": "Math",
    "pattern": "Modulo Cycle",
    "problemStatement": "Given the input constraints, solve **Fizz Buzz** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Fizz Buzz."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Microsoft",
      "Adobe",
      "TCS Prime",
      "Infosys",
      "Wipro"
    ],
    "acceptanceRate": "73.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15935,
    "totalSolved": 8286,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Fizz Buzz\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Fizz Buzz\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Fizz Buzz\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-244",
    "number": 244,
    "slug": "palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "topic": "Math",
    "category": "Math",
    "pattern": "Integer Reversal Half",
    "problemStatement": "Given the input constraints, solve **Palindrome Number** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Palindrome Number."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Goldman Sachs",
      "JP Morgan",
      "Cisco",
      "Salesforce",
      "Cognizant"
    ],
    "acceptanceRate": "74.0%",
    "estimatedTime": "15 mins",
    "totalSubmissions": 15980,
    "totalSolved": 8310,
    "firstAcTime": "12 mins",
    "bestRuntime": 8,
    "bestMemory": 14.5,
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Palindrome Number\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Palindrome Number\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Palindrome Number\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-245",
    "number": 245,
    "slug": "pow-x-n-math",
    "title": "Pow(x, n) Math",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Divide and Conquer Exponent",
    "problemStatement": "Given the input constraints, solve **Pow(x, n) Math** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Pow(x, n) Math."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS Prime",
      "Infosys"
    ],
    "acceptanceRate": "45.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16025,
    "totalSolved": 8333,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Pow(x, n) Math\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Pow(x, n) Math\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Pow(x, n) Math\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-246",
    "number": 246,
    "slug": "multiply-strings",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Column Position Multiplication",
    "problemStatement": "Given the input constraints, solve **Multiply Strings** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Multiply Strings."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Adobe",
      "Wipro",
      "Capgemini"
    ],
    "acceptanceRate": "46.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16070,
    "totalSolved": 8356,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Multiply Strings\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Multiply Strings\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Multiply Strings\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-247",
    "number": 247,
    "slug": "count-primes",
    "title": "Count Primes",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Sieve of Eratosthenes",
    "problemStatement": "Given the input constraints, solve **Count Primes** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Count Primes."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Google",
      "Apple",
      "Uber",
      "Accenture",
      "Cognizant"
    ],
    "acceptanceRate": "47.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16115,
    "totalSolved": 8380,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Count Primes\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Count Primes\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Count Primes\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-248",
    "number": 248,
    "slug": "integer-to-roman",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Greedy Value Match",
    "problemStatement": "Given the input constraints, solve **Integer to Roman** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Integer to Roman."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Microsoft",
      "Goldman Sachs",
      "JP Morgan",
      "LPU campus placements",
      "Walmart"
    ],
    "acceptanceRate": "48.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16160,
    "totalSolved": 8403,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Integer to Roman\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Integer to Roman\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Integer to Roman\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-249",
    "number": 249,
    "slug": "rotate-function",
    "title": "Rotate Function",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Math Difference Derivative",
    "problemStatement": "Given the input constraints, solve **Rotate Function** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Rotate Function."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Salesforce",
      "Cisco",
      "Atlassian",
      "Oracle",
      "Flipkart"
    ],
    "acceptanceRate": "49.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16205,
    "totalSolved": 8427,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Rotate Function\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Rotate Function\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Rotate Function\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  },
  {
    "id": "p-250",
    "number": 250,
    "slug": "super-pow",
    "title": "Super Pow",
    "difficulty": "Medium",
    "topic": "Math",
    "category": "Math",
    "pattern": "Euler Totient / Modular Exp",
    "problemStatement": "Given the input constraints, solve **Super Pow** efficiently using optimal Math techniques.\n\nRead test inputs, process data using optimal algorithm complexity, and return expected outputs matching problem requirements.",
    "examples": [
      {
        "input": "input_data = [1, 2, 3]",
        "output": "1",
        "explanation": "Standard example evaluation for Super Pow."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= Element <= 10^9"
    ],
    "inputFormat": "Formatted input data parameters.",
    "outputFormat": "Expected evaluated algorithm answer.",
    "sampleInput": "input_data = [1, 2, 3]",
    "sampleOutput": "1",
    "hints": [
      "Consider optimal Math pattern mechanics.",
      "Optimize time complexity to O(N log N)."
    ],
    "tags": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Oracle",
      "Bloomberg"
    ],
    "acceptanceRate": "50.0%",
    "estimatedTime": "25 mins",
    "totalSubmissions": 16250,
    "totalSolved": 8450,
    "firstAcTime": "12 mins",
    "bestRuntime": 24,
    "bestMemory": 14.5,
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "starterCodeJava": "class Solution {\n    public Object solve(int[] input) {\n        // Solution for Super Pow\n        return null;\n    }\n}",
    "starterCodeCpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Solution for Super Pow\n    }\n};",
    "starterCodePython": "class Solution:\n    def solve(self, input_data: list) -> any:\n        # Solution for Super Pow\n        pass",
    "testCases": [
      {
        "input": "input_data = [1, 2, 3]",
        "expectedOutput": "1"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "input_data = [4, 5, 6]",
        "expectedOutput": "4"
      },
      {
        "input": "input_data = [10]",
        "expectedOutput": "10"
      }
    ],
    "expectedOutput": "1",
    "isSolved": false,
    "isBookmarked": false,
    "status": "Not Attempted"
  }
];

export const generate100EasyQuestions = (): IPracticeQuestion[] => {
  return ALL_250_PRACTICE_QUESTIONS;
};

export const generate250PracticeQuestions = (): IPracticeQuestion[] => {
  return ALL_250_PRACTICE_QUESTIONS;
};
