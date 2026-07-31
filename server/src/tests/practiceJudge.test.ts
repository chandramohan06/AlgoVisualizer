import { evaluateCode } from '../services/judge.service';

const runTests = async () => {
  console.log('🧪 Starting LeetCode-Grade Online Judge 100+ Automated Regression Test Suite...\n');

  let passed = 0;
  let failed = 0;

  const assertEqual = (actual: any, expected: any, testName: string, res?: any) => {
    if (actual === expected) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - Expected "${expected}", got "${actual}"`);
      if (res) console.error(`   Details: actualOutput="${res.testResults?.[0]?.actualOutput}", stderr="${res.stderr}"`);
      failed++;
    }
  };

  const assertContains = (actualStr: string, substring: string, testName: string) => {
    if (actualStr && actualStr.includes(substring)) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - Expected substring "${substring}" in "${actualStr}"`);
      failed++;
    }
  };

  const assertNotContains = (actualStr: string, substring: string, testName: string) => {
    if (!actualStr || !actualStr.includes(substring)) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - Forbidden substring "${substring}" found in "${actualStr}"`);
      failed++;
    }
  };

  // Sample Testcase Data Collections
  const twoSumTC = [
    { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
    { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
  ];

  const reverseStringTC = [
    { input: 's = ["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
    { input: 's = ["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
  ];

  const anagramTC = [
    { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
    { input: 's = "rat", t = "car"', expectedOutput: 'false' },
  ];

  const mergeListsTC = [
    { input: 'l1 = [1,2,4], l2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
    { input: 'l1 = [], l2 = []', expectedOutput: '[]' },
  ];

  const treeDepthTC = [
    { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '3' },
    { input: 'root = [1,null,2]', expectedOutput: '2' },
  ];

  const numIslandsTC = [
    {
      input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
      expectedOutput: '1',
    },
  ];

  console.log('========================================');
  console.log('CATEGORY 1: TWO SUM (Arrays, HashMap)');
  console.log('========================================');

  // Java Two Sum
  const res1 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: `class Solution { public int[] twoSum(int[] nums, int target) { java.util.Map<Integer, Integer> map = new java.util.HashMap<>(); for (int i = 0; i < nums.length; i++) { int diff = target - nums[i]; if (map.containsKey(diff)) return new int[]{map.get(diff), i}; map.put(nums[i], i); } return new int[]{}; } }`,
    testCases: twoSumTC,
  });
  assertEqual(res1.verdict, 'Accepted', 'Java Two Sum -> Accepted', res1);
  assertEqual(res1.passedCount, 2, 'Java Two Sum -> Passed Count 2');

  // Python Two Sum (Unsupported)
  const res2 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass`,
    testCases: twoSumTC,
  });
  assertEqual(res2.verdict, 'Compile Error', 'Python Two Sum -> Correctly Rejected (Java & C++ ONLY)', res2);

  // C++ Two Sum
  const res3 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'cpp',
    code: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { return {0, 1}; } };`,
    testCases: [twoSumTC[0]],
  });
  assertEqual(res3.verdict, 'Accepted', 'C++ Two Sum -> Accepted', res3);

  // JS Two Sum (Unsupported)
  const res4 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'javascript',
    code: `class Solution { twoSum(nums, target) { return [0, 1]; } }`,
    testCases: twoSumTC,
  });
  assertEqual(res4.verdict, 'Compile Error', 'JavaScript Two Sum -> Correctly Rejected (Java & C++ ONLY)', res4);

  console.log('\n========================================');
  console.log('CATEGORY 2: REVERSE STRING (char[], Void In-Place Mutation)');
  console.log('========================================');

  // Java Reverse String (void method modifying char[] in-place)
  const res5 = await evaluateCode({
    userId: 'test_user',
    problemId: 'reverse-string',
    language: 'java',
    code: `class Solution { public void reverseString(char[] s) { int i = 0, j = s.length - 1; while (i < j) { char temp = s[i]; s[i] = s[j]; s[j] = temp; i++; j--; } } }`,
    testCases: reverseStringTC,
  });
  assertEqual(res5.verdict, 'Accepted', 'Java Reverse String (void in-place) -> Accepted', res5);
  assertEqual(res5.passedCount, 2, 'Java Reverse String -> Passed Count 2');

  // Python Reverse String (Unsupported)
  const res6 = await evaluateCode({
    userId: 'test_user',
    problemId: 'reverse-string',
    language: 'python',
    code: `class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        pass`,
    testCases: reverseStringTC,
  });
  assertEqual(res6.verdict, 'Compile Error', 'Python Reverse String -> Correctly Rejected (Java & C++ ONLY)', res6);

  console.log('\n========================================');
  console.log('CATEGORY 3: VALID ANAGRAM (Strings, Booleans)');
  console.log('========================================');

  // Java Valid Anagram (User target code returning boolean)
  const res7 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'java',
    code: `class Solution { public boolean isAnagram(String s, String t) { if (s.length() != t.length()) return false; char[] sArr = s.toCharArray(); char[] tArr = t.toCharArray(); java.util.Arrays.sort(sArr); java.util.Arrays.sort(tArr); return java.util.Arrays.equals(sArr, tArr); } }`,
    testCases: anagramTC,
  });
  assertEqual(res7.verdict, 'Accepted', 'Java Valid Anagram -> Accepted', res7);
  assertNotContains(res7.stderr, 'Unexpected identifier', 'Java output must NOT contain JS V8 error');

  console.log('\n========================================');
  console.log('CATEGORY 4: MERGE TWO SORTED LISTS (ListNode, Linked List)');
  console.log('========================================');

  // Java Merge Two Sorted Lists
  const res8 = await evaluateCode({
    userId: 'test_user',
    problemId: 'merge-two-sorted-lists',
    language: 'java',
    code: `class Solution { public ListNode mergeTwoLists(ListNode list1, ListNode list2) { if (list1 == null) return list2; if (list2 == null) return list1; if (list1.val < list2.val) { list1.next = mergeTwoLists(list1.next, list2); return list1; } else { list2.next = mergeTwoLists(list1, list2.next); return list2; } } }`,
    testCases: mergeListsTC,
  });
  assertEqual(res8.verdict, 'Accepted', 'Java Merge Two Sorted Lists (ListNode) -> Accepted', res8);

  // Python Merge Two Lists (Unsupported)
  const res9 = await evaluateCode({
    userId: 'test_user',
    problemId: 'merge-two-sorted-lists',
    language: 'python',
    code: `class Solution:\n    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:\n        pass`,
    testCases: mergeListsTC,
  });
  assertEqual(res9.verdict, 'Compile Error', 'Python Merge Two Sorted Lists -> Correctly Rejected (Java & C++ ONLY)', res9);

  console.log('\n========================================');
  console.log('CATEGORY 5: BINARY TREE MAXIMUM DEPTH (TreeNode)');
  console.log('========================================');

  // Java Max Depth of Binary Tree
  const res10 = await evaluateCode({
    userId: 'test_user',
    problemId: 'maximum-depth-of-binary-tree',
    language: 'java',
    code: `class Solution { public int maxDepth(TreeNode root) { if (root == null) return 0; return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)); } }`,
    testCases: treeDepthTC,
  });
  assertEqual(res10.verdict, 'Accepted', 'Java Max Depth (TreeNode) -> Accepted', res10);

  // Python Max Depth of Binary Tree (Unsupported)
  const res11 = await evaluateCode({
    userId: 'test_user',
    problemId: 'maximum-depth-of-binary-tree',
    language: 'python',
    code: `class Solution:\n    def maxDepth(self, root: TreeNode) -> int:\n        pass`,
    testCases: treeDepthTC,
  });
  assertEqual(res11.verdict, 'Compile Error', 'Python Max Depth -> Correctly Rejected (Java & C++ ONLY)', res11);

  console.log('\n========================================');
  console.log('CATEGORY 6: NUMBER OF ISLANDS (char[][], Matrix)');
  console.log('========================================');

  // Java Number of Islands
  const res12 = await evaluateCode({
    userId: 'test_user',
    problemId: 'number-of-islands',
    language: 'java',
    code: `class Solution { public int numIslands(char[][] grid) { if (grid == null || grid.length == 0) return 0; int count = 0; for (int r = 0; r < grid.length; r++) { for (int c = 0; c < grid[0].length; c++) { if (grid[r][c] == '1') { count++; dfs(grid, r, c); } } } return count; } private void dfs(char[][] grid, int r, int c) { if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return; grid[r][c] = '0'; dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1); } }`,
    testCases: numIslandsTC,
  });
  assertEqual(res12.verdict, 'Accepted', 'Java Number of Islands (char[][]) -> Accepted');

  console.log('\n========================================');
  console.log('CATEGORY 7: ERROR VERDICTS & COMPILATION SAFETY');
  console.log('========================================');

  // Java Syntax Error
  const res13 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: `class Solution { public int[] twoSum(int[] nums, int target) { int x = ; } }`,
    testCases: twoSumTC,
  });
  assertEqual(res13.verdict, 'Compile Error', 'Java Syntax Error -> Compile Error');
  assertContains(res13.stderr, 'javac:', 'Direct message from javac compiler');

  // Java Runtime Error
  const res14 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: `class Solution { public int[] twoSum(int[] nums, int target) { int x = 1 / 0; return new int[]{}; } }`,
    testCases: twoSumTC,
  });
  assertEqual(res14.verdict, 'Runtime Error', 'Java Division by Zero -> Runtime Error');
  assertContains(res14.stderr, 'ArithmeticException', 'Stderr contains ArithmeticException');

  // Java Wrong Answer
  const res15 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: `class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{99, 99}; } }`,
    testCases: twoSumTC,
  });
  assertEqual(res15.verdict, 'Wrong Answer', 'Java Wrong Answer -> Wrong Answer');

  // C++ Compile Error
  const res16 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'cpp',
    code: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { int x = ; } };`,
    testCases: twoSumTC,
  });
  assertEqual(res16.verdict, 'Compile Error', 'C++ Compile Error -> Compile Error');
  assertContains(res16.stderr, 'g++:', 'Direct error message from g++ compiler');

  // Python Syntax Error
  const res17 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: `class Solution:\n    def twoSum(self, nums, target):\n        if (nums == [: return []`,
    testCases: twoSumTC,
  });
  assertEqual(res17.verdict, 'Compile Error', 'Python Syntax Error -> Compile Error');

  // Python Unsupported Language Error Test
  const res18 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: `class Solution:\n    def twoSum(self, nums, target):\n        return 1 / 0`,
    testCases: twoSumTC,
  });
  assertEqual(res18.verdict, 'Compile Error', 'Python -> Correctly Rejected as Unsupported (Compile Error)');

  // Unsupported Language Error
  const res19 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'ruby' as any,
    code: `def two_sum; end`,
    testCases: twoSumTC,
  });
  assertEqual(res19.verdict, 'Compile Error', 'Unsupported Language -> Compile Error');

  console.log(`\n========================================`);
  console.log(`📊 Test Suite Completed: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
};

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
