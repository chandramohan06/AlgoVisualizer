export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded';

export interface IProblemParameter {
  name: string;
  type: string; // e.g. 'int' | 'long' | 'double' | 'boolean' | 'String' | 'char' | 'char[]' | 'int[]' | 'long[]' | 'String[]' | 'int[][]' | 'char[][]' | 'ListNode' | 'TreeNode' | 'List<Integer>' | 'List<String>'
}

export interface IProblemMetadata {
  functionName: string;
  returnType: string; // e.g. 'int' | 'boolean' | 'void' | 'int[]' | 'char[]' | 'ListNode' | 'TreeNode' | 'List<Integer>' | 'int[][]' | 'char[][]'
  parameters: IProblemParameter[];
  mutateParamName?: string; // For void in-place methods e.g. 's' for reverseString(char[] s)
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface ITestCaseResult {
  testCaseIndex: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtimeMs: number;
  memoryMb: number;
  error?: string;
}

export interface IJudgeResult {
  verdict: Verdict;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryMb: number;
  stdout: string;
  stderr: string;
  testResults: ITestCaseResult[];
  failedTestCaseIndex?: number;
}

export interface IExecutionResult {
  stdout: string;
  stderr: string;
  actualOutput: string;
  timedOut: boolean;
  mutatedInputOutput?: string;
}

export interface ILanguageStrategy {
  execute(
    code: string,
    testCase: ITestCase,
    metadata: IProblemMetadata,
    timeoutMs?: number
  ): Promise<IExecutionResult>;
}

export interface IComparatorStrategy {
  compare(actual: string, expected: string): boolean;
}
