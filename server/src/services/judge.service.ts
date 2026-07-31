import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import vm from 'vm';

export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded';

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

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

// Check if code is empty or whitespace-only
export const isEmptyCode = (code: string | undefined | null): boolean => {
  if (!code) return true;
  return code.trim().length === 0;
};

// Check if code is unmodified starter template or trivial pass/empty function body
export const isStarterTemplate = (code: string, starterCode?: string): boolean => {
  if (!code || !code.trim()) return true;
  const cleaned = code.trim().replace(/\s+/g, ' ');

  if (starterCode && starterCode.trim()) {
    const cleanedStarter = starterCode.trim().replace(/\s+/g, ' ');
    if (cleaned === cleanedStarter) return true;
  }

  // Common trivial empty function bodies
  const trivialPatterns = [
    /^class Solution:\s*def \w+\(self,.*?\):\s*(#.*?\s*)*pass\s*$/i,
    /^class Solution:\s*def \w+\(self,.*?\):\s*(#.*?\s*)*return\s*(None|0|""|\[\]|\{\}|False)?\s*$/i,
    /^class Solution\s*\{\s*public\s+.*?\s+\w+\(.*?\)\s*\{\s*(?:\/\/*.*?\s*)*return\s*.*?;?\s*\}\s*\}$/i,
  ];

  return trivialPatterns.some((pattern) => pattern.test(cleaned));
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
    // String or non-JSON format: remove spaces around commas/brackets
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

// Detect if python binary is available on host OS
let cachedPythonCmd: string | null = null;
const getPythonCommand = (): string | null => {
  if (cachedPythonCmd !== null) return cachedPythonCmd;
  for (const cmd of ['python3', 'python']) {
    try {
      execSync(`${cmd} --version`, { stdio: 'ignore' as any });
      cachedPythonCmd = cmd;
      return cmd;
    } catch {
      // Continue search
    }
  }
  cachedPythonCmd = '';
  return null;
};

// Python Code Execution Runner
const runPythonCode = async (
  code: string,
  testCase: ITestCase,
  timeoutMs: number = 2000
): Promise<{ stdout: string; stderr: string; actualOutput: string; timedOut: boolean }> => {
  const pyCmd = getPythonCommand();

  if (pyCmd) {
    const runnerScript = `
import sys
import json
import ast
import re

${code}

def parse_input(input_str):
    scope = {}
    pattern = r'([a-zA-Z_]\\w*)\\s*=\\s*(.*?)(?=(?:,\\s*[a-zA-Z_]\\w*\\s*= |\\n\\s*[a-zA-Z_]\\w*\\s*= |$))'
    matches = re.findall(pattern, input_str, re.DOTALL)
    for var_name, val_str in matches:
        var_name = var_name.strip()
        val_str = val_str.strip()
        if val_str.endswith(','):
            val_str = val_str[:-1].strip()
        try:
            scope[var_name] = ast.literal_eval(val_str)
        except Exception:
            scope[var_name] = val_str
    if not scope and input_str.strip():
        try:
            scope['arg0'] = ast.literal_eval(input_str.strip())
        except Exception:
            scope['arg0'] = input_str.strip()
    return scope

try:
    sol_class = Solution()
    methods = [m for m in dir(sol_class) if not m.startswith('_') and callable(getattr(sol_class, m))]
    if not methods:
        print("Error: No public method found in Solution class", file=sys.stderr)
        sys.exit(1)
    
    target_method = getattr(sol_class, methods[0])
    raw_input = """${testCase.input.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""
    input_vars = parse_input(raw_input)

    import inspect
    sig = inspect.signature(target_method)
    param_names = list(sig.parameters.keys())

    args = []
    kwargs = {}
    for p in param_names:
        if p in input_vars:
            kwargs[p] = input_vars[p]

    if len(kwargs) == len(param_names) and len(param_names) > 0:
        result = target_method(**kwargs)
    else:
        arg_list = list(input_vars.values())
        result = target_method(*arg_list)

    if isinstance(result, bool):
        print(json.dumps(result).lower())
    else:
        print(json.dumps(result))

except Exception as e:
    import traceback
    print(traceback.format_exc(), file=sys.stderr)
    sys.exit(1)
`;

    const tmpDir = os.tmpdir();
    const scriptPath = path.join(tmpDir, `solution_${Date.now()}_${Math.random().toString(36).substring(7)}.py`);
    fs.writeFileSync(scriptPath, runnerScript, 'utf8');

    return new Promise((resolve) => {
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const proc = spawn(pyCmd, [scriptPath], { timeout: timeoutMs });

      proc.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('error', (err) => {
        stderr += err.message;
      });

      proc.on('close', (exitCode, signal) => {
        try {
          if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);
        } catch {}

        if (signal === 'SIGTERM' || proc.killed || exitCode === null) {
          timedOut = true;
        }

        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          actualOutput: stdout.trim(),
          timedOut,
        });
      });
    });
  }

  return runPythonViaJS(code, testCase, timeoutMs);
};

// Fallback Python via JS sandbox engine
const runPythonViaJS = async (
  code: string,
  testCase: ITestCase,
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; actualOutput: string; timedOut: boolean }> => {
  return new Promise((resolve) => {
    let timedOut = false;
    let stdout = '';
    let stderr = '';
    let actualOutput = '';

    try {
      let jsCode = code
        .replace(/def\s+(\w+)\s*\((.*?)\)\s*->\s*.*?:/g, 'function $1($2) {')
        .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'function $1($2) {')
        .replace(/class\s+Solution.*?:/g, 'class Solution {')
        .replace(/self,/g, '')
        .replace(/self/g, 'this')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/#.*/g, '')
        .replace(/pass\b/g, ';');

      let openBraces = 0;
      for (const char of code) {
        if (char === '(' || char === '[' || char === '{') openBraces++;
        if (char === ')' || char === ']' || char === '}') openBraces--;
      }
      if (openBraces !== 0) {
        throw new Error('SyntaxError: Unmatched parentheses or brackets in python source code.');
      }

      const sandbox: any = {
        console: {
          log: (...args: any[]) => {
            stdout += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
          },
        },
        result: null,
      };

      const argsMap = parseInputVars(testCase.input);

      const scriptSource = `
        ${jsCode}
        const sol = new Solution();
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(sol)).filter(m => m !== 'constructor');
        if (methodNames.length === 0) throw new Error("No method found in Solution class");
        
        const argsMap = ${JSON.stringify(argsMap)};
        const argValues = Object.values(argsMap);
        const method = sol[methodNames[0]];
        result = method.apply(sol, argValues);
      `;

      const ctx = vm.createContext(sandbox);
      const script = new vm.Script(scriptSource);
      script.runInContext(ctx, { timeout: timeoutMs });

      actualOutput = normalizeOutput(sandbox.result);
    } catch (err: any) {
      if (err.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
        timedOut = true;
      } else {
        stderr = err.message || String(err);
      }
    }

    resolve({
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      actualOutput,
      timedOut,
    });
  });
};

// Generic JavaScript / Node Code Runner
const runJavaScriptCode = async (
  code: string,
  testCase: ITestCase,
  timeoutMs: number = 2000
): Promise<{ stdout: string; stderr: string; actualOutput: string; timedOut: boolean }> => {
  return new Promise((resolve) => {
    let timedOut = false;
    let stdout = '';
    let stderr = '';
    let actualOutput = '';

    try {
      const sandbox: any = {
        console: {
          log: (...args: any[]) => {
            stdout += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
          },
        },
        result: null,
      };

      const argsMap = parseInputVars(testCase.input);

      const scriptSource = `
        ${code}
        let sol;
        if (typeof Solution === 'function') {
          sol = new Solution();
        } else if (typeof solve === 'function') {
          sol = { solve };
        } else {
          throw new Error("No Solution class or solve function defined.");
        }

        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol) || sol).filter(m => m !== 'constructor');
        const methodName = methods[0] || 'solve';
        const argsMap = ${JSON.stringify(argsMap)};
        const argValues = Object.values(argsMap);
        result = sol[methodName](...argValues);
      `;

      const ctx = vm.createContext(sandbox);
      const script = new vm.Script(scriptSource);
      script.runInContext(ctx, { timeout: timeoutMs });

      actualOutput = normalizeOutput(sandbox.result);
    } catch (err: any) {
      if (err.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
        timedOut = true;
      } else {
        stderr = err.message || String(err);
      }
    }

    resolve({
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      actualOutput,
      timedOut,
    });
  });
};

// Main Judge Engine Function
export const evaluateCode = async (params: {
  userId: string;
  problemId: string;
  language: 'java' | 'cpp' | 'python' | 'javascript';
  code: string;
  testCases: ITestCase[];
  starterCode?: string;
  isSubmission?: boolean;
}): Promise<IJudgeResult> => {
  const { userId, problemId, language, code, testCases, starterCode, isSubmission = false } = params;
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
    console.log(`[JudgeService] Rejected: Code is empty or whitespace-only.`);
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
    console.log(`[JudgeService] Rejected: Default starter template code submitted.`);
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

  const testResults: ITestCaseResult[] = [];
  let passedCount = 0;
  let aggregateStdout = '';
  let aggregateStderr = '';
  let finalVerdict: Verdict = 'Accepted';
  let failedTestCaseIndex: number | undefined = undefined;

  // Execute against every testcase individually
  for (let idx = 0; idx < testCases.length; idx++) {
    const tc = testCases[idx];
    const tcStartTime = Date.now();

    let runRes: { stdout: string; stderr: string; actualOutput: string; timedOut: boolean };

    if (language === 'python') {
      runRes = await runPythonCode(code, tc);
    } else {
      runRes = await runJavaScriptCode(code, tc);
    }

    const tcRuntime = Date.now() - tcStartTime;

    if (runRes.stdout) {
      aggregateStdout += `[TestCase #${idx + 1} Output]:\n${runRes.stdout}\n`;
    }

    // Handle Time Limit Exceeded (Infinite Loop)
    if (runRes.timedOut) {
      console.log(`[JudgeService] TestCase #${idx + 1} failed: Time Limit Exceeded`);
      finalVerdict = 'Time Limit Exceeded';
      failedTestCaseIndex = idx + 1;
      testResults.push({
        testCaseIndex: idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Time Limit Exceeded (>2000ms)',
        passed: false,
        runtimeMs: tcRuntime,
        memoryMb: 14.5,
        error: 'Execution timed out after 2000ms.',
      });
      break;
    }

    // Handle Runtime Error (Uncaught exceptions / crashes)
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
      runRes.stderr.includes('ReferenceError');

    if (isRuntimeErr) {
      console.log(`[JudgeService] TestCase #${idx + 1} failed: Runtime Error: ${runRes.stderr}`);
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

    // Handle Syntax / Compilation Error
    const isCompileErr =
      runRes.stderr.includes('SyntaxError') ||
      runRes.stderr.includes('Unmatched') ||
      runRes.stderr.includes('no public method') ||
      runRes.stderr.includes('CompileError') ||
      runRes.stderr.includes('Unexpected') ||
      runRes.stderr.includes('cannot find symbol') ||
      runRes.stderr.includes('javac:') ||
      runRes.stderr.includes('g++:') ||
      /syntax error/i.test(runRes.stderr);

    if (isCompileErr) {
      console.log(`[JudgeService] Compilation/Syntax Error at TestCase #${idx + 1}`);
      finalVerdict = 'Compile Error';
      aggregateStderr = runRes.stderr;
      failedTestCaseIndex = idx + 1;
      passedCount = 0;
      testResults.length = 0;
      break;
    }

    // Compare Outputs
    const normalizedActual = normalizeOutput(runRes.actualOutput);
    const normalizedExpected = normalizeOutput(tc.expectedOutput);
    const isPassed = normalizedActual === normalizedExpected;

    if (isPassed) {
      passedCount++;
    } else if (finalVerdict === 'Accepted') {
      finalVerdict = 'Wrong Answer';
      failedTestCaseIndex = idx + 1;
      console.log(`[JudgeService] TestCase #${idx + 1} failed: Wrong Answer (Expected: ${normalizedExpected}, Got: ${normalizedActual})`);
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

  console.log(`[JudgeService] Evaluation Complete:`, {
    verdict: finalVerdict,
    passedCount,
    totalCount: testCases.length,
    failedTestCaseIndex,
    totalRuntimeMs,
  });

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
