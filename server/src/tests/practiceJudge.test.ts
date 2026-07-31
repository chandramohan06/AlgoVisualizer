import { evaluateCode } from '../services/judge.service';

const runTests = async () => {
  console.log('🧪 Starting Online Judge Engine End-to-End Automated Regression Test Suite...\n');

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

  const sampleTestCases = [
    { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]' },
    { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]' },
  ];

  const anagramTestCases = [
    { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
  ];

  // -------------------------------------------------------------
  // JAVA TEST CASES
  // -------------------------------------------------------------

  console.log('--- JAVA TESTS ---');

  // Test 1: User's Java Anagram Code Snippet (Requirement 11)
  console.log('\n[Java Test 1: Target Anagram Snippet]');
  const javaUserCode = `class Solution {
    public boolean isAnagram(String s, String t) {
        return true;
    }
}`;
  const resJava1 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'java',
    code: javaUserCode,
    testCases: anagramTestCases,
  });
  assertEqual(resJava1.verdict, 'Accepted', 'Java isAnagram snippet should evaluate to Accepted');
  assertNotContains(resJava1.stderr, 'Unexpected identifier', 'Java output must NOT contain JS V8 "Unexpected identifier" error');

  // Test 2: Java Two Sum Accepted
  console.log('\n[Java Test 2: Two Sum Accepted]');
  const javaTwoSumCode = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        java.util.Map<Integer, Integer> map = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                return new int[]{map.get(diff), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`;
  const resJava2 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: javaTwoSumCode,
    testCases: sampleTestCases,
  });
  assertEqual(resJava2.verdict, 'Accepted', 'Java Two Sum should produce Accepted verdict');
  assertEqual(resJava2.passedCount, 2, 'Java Two Sum passed count should be 2');

  // Test 3: Java Compilation Error (Directly from javac)
  console.log('\n[Java Test 3: Compilation Error]');
  const javaCompileErrorCode = `class Solution {
    public boolean isAnagram(String s, String t) {
        boolean x = ;
        return true;
    }
}`;
  const resJava3 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'java',
    code: javaCompileErrorCode,
    testCases: anagramTestCases,
  });
  assertEqual(resJava3.verdict, 'Compile Error', 'Invalid Java code should produce Compile Error');
  assertContains(resJava3.stderr, 'javac:', 'Compile error message must come directly from javac compiler');

  // Test 4: Java Runtime Error (ArithmeticException)
  console.log('\n[Java Test 4: Runtime Error]');
  const javaRuntimeErrorCode = `class Solution {
    public boolean isAnagram(String s, String t) {
        int x = 1 / 0;
        return true;
    }
}`;
  const resJava4 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'java',
    code: javaRuntimeErrorCode,
    testCases: anagramTestCases,
  });
  assertEqual(resJava4.verdict, 'Runtime Error', 'Division by zero in Java should produce Runtime Error');
  assertContains(resJava4.stderr, 'ArithmeticException', 'Java runtime error stderr should report ArithmeticException');

  // Test 5: Java Wrong Answer
  console.log('\n[Java Test 5: Wrong Answer]');
  const javaWrongAnswerCode = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{99, 99};
    }
}`;
  const resJava5 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'java',
    code: javaWrongAnswerCode,
    testCases: sampleTestCases,
  });
  assertEqual(resJava5.verdict, 'Wrong Answer', 'Incorrect return value in Java should produce Wrong Answer');

  // -------------------------------------------------------------
  // C++ TEST CASES
  // -------------------------------------------------------------

  console.log('\n--- C++ TESTS ---');

  // Test 6: C++ Accepted
  console.log('\n[C++ Test 1: Accepted Solution]');
  const cppAcceptedCode = `class Solution {
public:
    bool isAnagram(string s, string t) {
        return true;
    }
};`;
  const resCpp1 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'cpp',
    code: cppAcceptedCode,
    testCases: anagramTestCases,
  });
  assertEqual(resCpp1.verdict, 'Accepted', 'Valid C++ solution should produce Accepted verdict');

  // Test 7: C++ Compilation Error
  console.log('\n[C++ Test 2: Compilation Error]');
  const cppCompileErrorCode = `class Solution {
public:
    bool isAnagram(string s, string t) {
        int x = ;
        return true;
    }
};`;
  const resCpp2 = await evaluateCode({
    userId: 'test_user',
    problemId: 'valid-anagram',
    language: 'cpp',
    code: cppCompileErrorCode,
    testCases: anagramTestCases,
  });
  assertEqual(resCpp2.verdict, 'Compile Error', 'Invalid C++ code should produce Compile Error');
  assertContains(resCpp2.stderr, 'g++:', 'C++ compilation error must come directly from g++ compiler');

  // -------------------------------------------------------------
  // PYTHON TEST CASES
  // -------------------------------------------------------------

  console.log('\n--- PYTHON TESTS ---');

  // Test 8: Python Accepted
  console.log('\n[Python Test 1: Accepted Solution]');
  const pythonAcceptedCode = `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        m = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in m:
                return [m[diff], i]
            m[n] = i
        return []`;
  const resPy1 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: pythonAcceptedCode,
    testCases: sampleTestCases,
  });
  assertEqual(resPy1.verdict, 'Accepted', 'Correct Python Two Sum code should produce Accepted');
  assertEqual(resPy1.passedCount, 2, 'Python Two Sum all test cases passed');

  // Test 9: Python Syntax Error
  console.log('\n[Python Test 2: Syntax Error]');
  const pythonCompileErrorCode = `class Solution:
    def twoSum(self, nums, target):
        if (nums == [:
            return []`;
  const resPy2 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: pythonCompileErrorCode,
    testCases: sampleTestCases,
  });
  assertEqual(resPy2.verdict, 'Compile Error', 'Invalid Python syntax should produce Compile Error');

  // Test 10: Python Runtime Error
  console.log('\n[Python Test 3: Runtime Error]');
  const pythonRuntimeErrorCode = `class Solution:
    def twoSum(self, nums, target):
        return 1 / 0`;
  const resPy3 = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'python',
    code: pythonRuntimeErrorCode,
    testCases: sampleTestCases,
  });
  assertEqual(resPy3.verdict, 'Runtime Error', 'ZeroDivisionError in Python should produce Runtime Error');

  // -------------------------------------------------------------
  // STRICT UNSUPPORTED LANGUAGE VALIDATION
  // -------------------------------------------------------------

  console.log('\n--- UNSUPPORTED LANGUAGE VALIDATION ---');
  const resUnsupported = await evaluateCode({
    userId: 'test_user',
    problemId: 'two-sum',
    language: 'ruby' as any,
    code: 'def two_sum; end',
    testCases: sampleTestCases,
  });
  assertEqual(resUnsupported.verdict, 'Compile Error', 'Unsupported language request should produce Compile Error');
  assertContains(resUnsupported.stderr, 'Unsupported language', 'Stderr should report unsupported language error');

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
