import vm from 'vm';
import { ILanguageStrategy, ITestCase, IProblemMetadata, IExecutionResult } from '../judge.types';
import { parseInputVars, normalizeOutput } from '../../judge.service';

export class JavaScriptExecutionStrategy implements ILanguageStrategy {
  public async execute(
    code: string,
    testCase: ITestCase,
    metadata: IProblemMetadata,
    timeoutMs: number = 2000
  ): Promise<IExecutionResult> {
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
          function ListNode(val, next) {
            this.val = (val===undefined ? 0 : val);
            this.next = (next===undefined ? null : next);
          }

          function TreeNode(val, left, right) {
            this.val = (val===undefined ? 0 : val);
            this.left = (left===undefined ? null : left);
            this.right = (right===undefined ? null : right);
          }

          ${code}

          let sol;
          if (typeof Solution === 'function') {
            sol = new Solution();
          } else if (typeof solve === 'function') {
            sol = { solve };
          } else {
            throw new Error("No Solution class or solve function defined.");
          }

          const targetName = "${metadata.functionName || ''}";
          const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol) || sol).filter(m => m !== 'constructor');
          const methodName = (targetName && typeof sol[targetName] === 'function') ? targetName : (methods[0] || 'solve');

          const argsMap = ${JSON.stringify(argsMap)};
          const argValues = Object.values(argsMap);

          const rawRes = sol[methodName](...argValues);

          const returnType = "${metadata.returnType || ''}";
          if (returnType === "void" || rawRes === undefined) {
            result = argValues.length > 0 ? argValues[0] : null;
          } else {
            result = rawRes;
          }
        `;

        const ctx = vm.createContext(sandbox);
        const script = new vm.Script(scriptSource);
        script.runInContext(ctx, { timeout: timeoutMs });

        actualOutput =
          typeof sandbox.result === 'object' && sandbox.result !== null
            ? JSON.stringify(sandbox.result)
            : normalizeOutput(sandbox.result);
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
  }
}
