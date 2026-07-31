import { evaluateCode, isEmptyCode, isStarterTemplate } from '../services/judge.service';

const runTests = async () => {
  console.log('🧪 Starting Practice Judge Engine Automated Test Suite...\n');

  let passed = 0;
  let failed = 0;

  const assertEqual = (actual: any, expected: any, testName: string) => {
    if (actual === expected) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - Expected "${expected}", got "${actual}"`);
      failed++;
    }
  };

  const sampleTestCases = [
    { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]' },
    { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]' },
  ];

  // Test 1: Empty editor
  console.log('--- Test 1: Empty Editor Code ---');
  const res1 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: '',
    testCases: sampleTestCases,
  });
  assertEqual(res1.verdict, 'Compile Error', 'Empty editor should produce Compile Error');
  assertEqual(res1.stderr, 'Please write some code before running.', 'Empty editor error message');

  // Test 2: Only whitespace
  console.log('\n--- Test 2: Whitespace Only Code ---');
  const res2 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: '   \n\t  \n  ',
    testCases: sampleTestCases,
  });
  assertEqual(res2.verdict, 'Compile Error', 'Whitespace only should produce Compile Error');

  // Test 3: Unchanged Starter Template
  console.log('\n--- Test 3: Starter Template Code ---');
  const starterCode = 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass';
  const res3 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: starterCode,
    starterCode,
    testCases: sampleTestCases,
  });
  assertEqual(res3.verdict, 'Compile Error', 'Starter template should produce Compile Error');

  // Test 4: Invalid syntax
  console.log('\n--- Test 4: Invalid Syntax (Compile Error) ---');
  const res4 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: 'class Solution:\n    def twoSum(self, nums, target):\n        if (nums == [:\n            return []',
    testCases: sampleTestCases,
  });
  assertEqual(res4.verdict, 'Compile Error', 'Invalid syntax should produce Compile Error');

  // Test 5: Infinite loop (Time Limit Exceeded)
  console.log('\n--- Test 5: Infinite Loop (Time Limit Exceeded) ---');
  const res5 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: 'class Solution:\n    def twoSum(self, nums, target):\n        while True:\n            pass',
    testCases: sampleTestCases,
  });
  assertEqual(res5.verdict, 'Time Limit Exceeded', 'Infinite loop should produce Time Limit Exceeded');

  // Test 6: Runtime Exception
  console.log('\n--- Test 6: Runtime Exception (Runtime Error) ---');
  const res6 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: 'class Solution:\n    def twoSum(self, nums, target):\n        x = 1 / 0\n        return []',
    testCases: sampleTestCases,
  });
  assertEqual(res6.verdict, 'Runtime Error', 'Division by zero should produce Runtime Error');

  // Test 7: Wrong Answer
  console.log('\n--- Test 7: Wrong Answer ---');
  const res7 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: 'class Solution:\n    def twoSum(self, nums, target):\n        return [99, 99]',
    testCases: sampleTestCases,
  });
  assertEqual(res7.verdict, 'Wrong Answer', 'Incorrect return value should produce Wrong Answer');

  // Test 8: Partial Correct
  console.log('\n--- Test 8: Partial Correct ---');
  const res8 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: `class Solution:
    def twoSum(self, nums, target):
        if nums == [2,7,11,15]:
            return [0, 1]
        return [99, 99]`,
    testCases: sampleTestCases,
  });
  assertEqual(res8.verdict, 'Wrong Answer', 'Failing 2nd test case should produce Wrong Answer');
  assertEqual(res8.passedCount, 1, 'Passed count for partial correct should be 1');

  // Test 9: Accepted
  console.log('\n--- Test 9: Accepted Solution ---');
  const res9 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: `class Solution:
    def twoSum(self, nums, target):
        m = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in m:
                return [m[diff], i]
            m[n] = i
        return []`,
    testCases: sampleTestCases,
  });
  assertEqual(res9.verdict, 'Accepted', 'Correct Two Sum code should produce Accepted');
  assertEqual(res9.passedCount, 2, 'All test cases passed');

  console.log(`\n========================================`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
};

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
