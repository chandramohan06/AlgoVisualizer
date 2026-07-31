import {
  Verdict,
  ITestCase,
  ITestCaseResult,
  IJudgeResult,
  IProblemMetadata,
} from './judge/judge.types';
import { MetadataExtractor } from './judge/utils/MetadataExtractor';
import { LanguageStrategyFactory } from './judge/strategies/LanguageStrategyFactory';
import { ComparatorFactory } from './judge/comparators/ComparatorFactory';

export type { Verdict, ITestCaseResult, IJudgeResult, ITestCase, IProblemMetadata };

// Check if code is empty or whitespace-only
export const isEmptyCode = (code: string | undefined | null): boolean => {
  if (!code) return true;
  return code.trim().length === 0;
};

// Check if code is unmodified starter template
export const isStarterTemplate = (code: string, starterCode?: string): boolean => {
  if (!code || !code.trim()) return true;
  if (starterCode && starterCode.trim()) {
    const cleaned = code.trim().replace(/\s+/g, ' ');
    const cleanedStarter = starterCode.trim().replace(/\s+/g, ' ');
    if (cleaned === cleanedStarter) return true;
  }
  return false;
};

// Output Normalizer for comparing expectedOutput vs actualOutput
export const normalizeOutput = (val: any): string => {
  if (val === undefined || val === null) return '';
  let str = String(val).trim();

  // Normalize booleans
  if (str === 'True' || str === 'true') return 'true';
  if (str === 'False' || str === 'false') return 'false';

  // Normalize JSON arrays / objects spacing e.g. [0, 1] vs [0,1]
  try {
    const parsed = JSON.parse(str.replace(/'/g, '"'));
    return JSON.stringify(parsed);
  } catch {
    return str
      .replace(/\[\s+/g, '[')
      .replace(/\s+\]/g, ']')
      .replace(/,\s+/g, ',')
      .replace(/"/g, '')
      .replace(/'/g, '');
  }
};

// JS input string argument parser
export const parseInputVars = (inputStr: string): Record<string, any> => {
  const argsMap: Record<string, any> = {};
  if (!inputStr || !inputStr.trim()) return argsMap;

  const pattern = /([a-zA-Z_]\w*)\s*=\s*(.*?)(?=(?:,\s*[a-zA-Z_]\w*\s*=|\n\s*[a-zA-Z_]\w*\s*=|$))/gs;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(inputStr)) !== null) {
    const key = match[1].trim();
    let valStr = match[2].trim();
    if (valStr.endsWith(',')) valStr = valStr.slice(0, -1).trim();

    try {
      argsMap[key] = JSON.parse(valStr.replace(/'/g, '"'));
    } catch {
      argsMap[key] = valStr;
    }
  }

  if (Object.keys(argsMap).length === 0) {
    try {
      argsMap['input'] = JSON.parse(inputStr.replace(/'/g, '"'));
    } catch {
      argsMap['input'] = inputStr.trim();
    }
  }

  return argsMap;
};

// Main Judge Engine Function
export const evaluateCode = async (params: {
  userId: string;
  problemId: string;
  language: 'java' | 'cpp' | 'python' | 'javascript';
  code: string;
  testCases: ITestCase[];
  starterCode?: string;
  metadata?: Partial<IProblemMetadata> | null;
  isSubmission?: boolean;
}): Promise<IJudgeResult> => {
  const { userId, problemId, language, code, testCases, starterCode, metadata: rawMetadata, isSubmission = false } = params;
  const startTime = Date.now();

  console.log(`[JudgeService] Executing Code Evaluation:`, {
    userId,
    problemId,
    language,
    codeLength: code ? code.length : 0,
    testCasesCount: testCases ? testCases.length : 0,
    isSubmission,
  });

  // 1. Validation: Empty or Whitespace-only code
  if (isEmptyCode(code)) {
    return {
      verdict: 'Compile Error',
      passedCount: 0,
      totalCount: testCases.length,
      runtimeMs: 0,
      memoryMb: 0,
      stdout: '',
      stderr: 'Please write some code before running.',
      testResults: [],
    };
  }

  // 2. Validation: Unmodified Starter Template Code
  if (isStarterTemplate(code, starterCode)) {
    return {
      verdict: 'Compile Error',
      passedCount: 0,
      totalCount: testCases.length,
      runtimeMs: 0,
      memoryMb: 0,
      stdout: '',
      stderr: 'Default template code submitted. Please write your solution before running.',
      testResults: [],
    };
  }

  // 3. Extract problem metadata (functionName, returnType, parameters, mutateParamName)
  const metadata = MetadataExtractor.extractMetadata(code, rawMetadata, starterCode);

  // 4. Instantiate Language Execution Strategy & Output Comparator Strategy
  let strategy;
  try {
    strategy = LanguageStrategyFactory.getStrategy(language);
  } catch (err: any) {
    return {
      verdict: 'Compile Error',
      passedCount: 0,
      totalCount: testCases.length,
      runtimeMs: 0,
      memoryMb: 0,
      stdout: '',
      stderr: err.message || `Unsupported language: '${language}'.`,
      testResults: [],
    };
  }

  const comparator = ComparatorFactory.getComparator(metadata);

  const testResults: ITestCaseResult[] = [];
  let passedCount = 0;
  let aggregateStdout = '';
  let aggregateStderr = '';
  let finalVerdict: Verdict = 'Accepted';
  let failedTestCaseIndex: number | undefined = undefined;

  // 5. Execute against test cases
  for (let idx = 0; idx < testCases.length; idx++) {
    const tc = testCases[idx];
    const tcStartTime = Date.now();

    const runRes = await strategy.execute(code, tc, metadata, 3000);
    const tcRuntime = Date.now() - tcStartTime;

    if (runRes.stdout) {
      aggregateStdout += `[TestCase #${idx + 1} Output]:\n${runRes.stdout}\n`;
    }

    // Handle Time Limit Exceeded
    if (runRes.timedOut) {
      finalVerdict = 'Time Limit Exceeded';
      failedTestCaseIndex = idx + 1;
      testResults.push({
        testCaseIndex: idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Time Limit Exceeded (>3000ms)',
        passed: false,
        runtimeMs: tcRuntime,
        memoryMb: 14.5,
        error: 'Execution timed out after maximum time limit.',
      });
      break;
    }

    // Handle Compile Error FIRST
    const isCompileErr =
      runRes.stderr.includes('SyntaxError') ||
      runRes.stderr.includes('Unmatched') ||
      runRes.stderr.includes('no public method') ||
      runRes.stderr.includes('No public method') ||
      runRes.stderr.includes('CompileError') ||
      runRes.stderr.includes('Unexpected') ||
      runRes.stderr.includes('cannot find symbol') ||
      runRes.stderr.includes('javac:') ||
      runRes.stderr.includes('g++:') ||
      runRes.stderr.includes('not installed') ||
      runRes.stderr.includes('Unsupported language') ||
      /syntax error/i.test(runRes.stderr);

    if (isCompileErr) {
      finalVerdict = 'Compile Error';
      aggregateStderr = runRes.stderr;
      failedTestCaseIndex = idx + 1;
      passedCount = 0;
      testResults.length = 0;
      break;
    }

    // Handle Runtime Error
    const isRuntimeErr =
      runRes.stderr.includes('Traceback (most recent call last)') ||
      runRes.stderr.includes('ZeroDivisionError') ||
      runRes.stderr.includes('IndexError') ||
      runRes.stderr.includes('KeyError') ||
      runRes.stderr.includes('TypeError') ||
      runRes.stderr.includes('ValueError') ||
      runRes.stderr.includes('AttributeError') ||
      runRes.stderr.includes('NameError') ||
      runRes.stderr.includes('NullPointerException') ||
      runRes.stderr.includes('ArithmeticException') ||
      runRes.stderr.includes('ArrayIndexOutOfBoundsException') ||
      runRes.stderr.includes('ClassCastException') ||
      runRes.stderr.includes('Exception in thread') ||
      runRes.stderr.includes('Segmentation fault') ||
      runRes.stderr.includes('ReferenceError') ||
      runRes.stderr.length > 0;

    if (isRuntimeErr) {
      finalVerdict = 'Runtime Error';
      aggregateStderr = runRes.stderr;
      failedTestCaseIndex = idx + 1;
      testResults.push({
        testCaseIndex: idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Runtime Error',
        passed: false,
        runtimeMs: tcRuntime,
        memoryMb: 14.5,
        error: runRes.stderr,
      });
      break;
    }

    const isPassed = comparator.compare(runRes.actualOutput, tc.expectedOutput);

    if (isPassed) {
      passedCount++;
    } else if (finalVerdict === 'Accepted') {
      finalVerdict = 'Wrong Answer';
      failedTestCaseIndex = idx + 1;
    }

    testResults.push({
      testCaseIndex: idx + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: runRes.actualOutput || 'None',
      passed: isPassed,
      runtimeMs: tcRuntime,
      memoryMb: Math.round((Math.random() * 2 + 13) * 10) / 10,
    });
  }

  if (finalVerdict === 'Compile Error') {
    passedCount = 0;
  }

  const totalRuntimeMs = Date.now() - startTime;
  const memoryMb = Math.round((Math.random() * 4 + 14) * 10) / 10;

  return {
    verdict: finalVerdict,
    passedCount: finalVerdict === 'Compile Error' ? 0 : passedCount,
    totalCount: testCases.length,
    runtimeMs: finalVerdict === 'Compile Error' ? 0 : totalRuntimeMs,
    memoryMb: finalVerdict === 'Compile Error' ? 0 : memoryMb,
    stdout: aggregateStdout || (finalVerdict === 'Accepted' ? 'All test cases passed cleanly.' : 'Execution completed.'),
    stderr: aggregateStderr,
    testResults: finalVerdict === 'Compile Error' ? [] : testResults,
    failedTestCaseIndex,
  };
};
