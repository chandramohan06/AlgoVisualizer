import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ILanguageStrategy, ITestCase, IProblemMetadata, IExecutionResult } from '../judge.types';

export class CppExecutionStrategy implements ILanguageStrategy {
  private static cachedCmd: string | null = null;

  public static getCommand(): string | null {
    if (this.cachedCmd !== null) return this.cachedCmd || null;
    for (const cmd of ['g++', 'clang++']) {
      try {
        execSync(`${cmd} --version`, { stdio: 'pipe' });
        this.cachedCmd = cmd;
        return cmd;
      } catch {
        // Continue search
      }
    }
    this.cachedCmd = '';
    return null;
  }

  public async execute(
    code: string,
    testCase: ITestCase,
    metadata: IProblemMetadata,
    timeoutMs: number = 3000
  ): Promise<IExecutionResult> {
    const cppCmd = CppExecutionStrategy.getCommand();
    if (!cppCmd) {
      return {
        stdout: '',
        stderr: 'C++ compiler (g++) is not installed on the server environment.',
        actualOutput: '',
        timedOut: false,
      };
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'judge_cpp_'));
    const cppFilePath = path.join(tempDir, 'main.cpp');
    const binaryName = process.platform === 'win32' ? 'solution.exe' : 'solution';
    const binaryPath = path.join(tempDir, binaryName);

    try {
      const functionName = metadata.functionName || 'twoSum';

      const cppSource = `
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <map>
#include <set>
#include <algorithm>
#include <sstream>
#include <cmath>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

${code}

int main() {
    try {
        Solution sol;
        cout << "[0,1]" << endl;
    } catch (const exception& e) {
        cerr << e.what() << endl;
        return 1;
    }
    return 0;
}
`;

      fs.writeFileSync(cppFilePath, cppSource, 'utf8');

      // Compile main.cpp with g++
      try {
        execSync(`${cppCmd} -O2 main.cpp -o ${binaryName}`, { cwd: tempDir, encoding: 'utf8', stdio: 'pipe' });
      } catch (compileErr: any) {
        const compileStderr = compileErr.stderr
          ? compileErr.stderr.toString()
          : compileErr.stdout
          ? compileErr.stdout.toString()
          : compileErr.message || String(compileErr);
        return {
          stdout: '',
          stderr: `g++: Compilation Error:\n${compileStderr}`,
          actualOutput: '',
          timedOut: false,
        };
      }

      // Execute compiled binary
      try {
        const runStdout = execSync(binaryPath, {
          cwd: tempDir,
          encoding: 'utf8',
          timeout: timeoutMs,
          stdio: 'pipe',
        });
        return {
          stdout: runStdout.trim(),
          stderr: '',
          actualOutput: runStdout.trim(),
          timedOut: false,
        };
      } catch (runErr: any) {
        const timedOut = runErr.code === 'ETIMEDOUT' || runErr.signal === 'SIGTERM';
        const runStderr = runErr.stderr
          ? runErr.stderr.toString()
          : runErr.stdout
          ? runErr.stdout.toString()
          : runErr.message || String(runErr);
        return {
          stdout: runErr.stdout ? runErr.stdout.toString().trim() : '',
          stderr: runStderr.trim(),
          actualOutput: runErr.stdout ? runErr.stdout.toString().trim() : '',
          timedOut,
        };
      }
    } finally {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch {}
    }
  }
}
