import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ILanguageStrategy, ITestCase, IProblemMetadata, IExecutionResult } from '../judge.types';

export class PythonExecutionStrategy implements ILanguageStrategy {
  private static cachedCmd: string | null = null;

  public static getCommand(): string | null {
    if (this.cachedCmd !== null) return this.cachedCmd || null;
    for (const cmd of ['python3', 'py', 'python']) {
      try {
        const output = execSync(`${cmd} --version`, { stdio: 'pipe' }).toString();
        if (output.toLowerCase().includes('python 3') || cmd === 'py') {
          this.cachedCmd = cmd;
          return cmd;
        }
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
    timeoutMs: number = 2000
  ): Promise<IExecutionResult> {
    const pyCmd = PythonExecutionStrategy.getCommand();
    if (!pyCmd) {
      return {
        stdout: '',
        stderr: 'Python 3 interpreter is not installed on the server environment.',
        actualOutput: '',
        timedOut: false,
      };
    }

    const runnerScript = `
import sys
import json
import ast
import re

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

${code}

def parse_input(input_str):
    scope = {}
    pattern = r'([a-zA-Z_]\\w*)\\s*=\\s*(.*?)(?=(?:,\\s*[a-zA-Z_]\\w*\\s*=|\\n\\s*[a-zA-Z_]\\w*\\s*=|$))'
    matches = re.findall(pattern, input_str, re.DOTALL)
    for var_name, val_str in matches:
        var_name = var_name.strip()
        val_str = val_str.strip()
        if val_str.endswith(','):
            val_str = val_str[:-1].strip()
        try:
            py_clean_val = val_str.replace('null', 'None').replace('true', 'True').replace('false', 'False')
            scope[var_name] = ast.literal_eval(py_clean_val)
        except Exception:
            scope[var_name] = val_str
    if not scope and input_str.strip():
        try:
            py_clean_val = input_str.strip().replace('null', 'None').replace('true', 'True').replace('false', 'False')
            scope['arg0'] = ast.literal_eval(py_clean_val)
        except Exception:
            scope['arg0'] = input_str.strip()
    return scope

def build_list_node(vals):
    if not vals or not isinstance(vals, list): return None
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def build_tree_node(vals):
    if not vals or not isinstance(vals, list) or len(vals) == 0 or vals[0] is None: return None
    root = TreeNode(vals[0])
    queue = [root]
    i = 1
    while queue and i < len(vals):
        curr = queue.pop(0)
        if i < len(vals) and vals[i] is not None:
            curr.left = TreeNode(vals[i])
            queue.append(curr.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            curr.right = TreeNode(vals[i])
            queue.append(curr.right)
        i += 1
    return root

def serialize(obj):
    if obj is None:
        return "null"
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if isinstance(obj, ListNode):
        res = []
        curr = obj
        while curr:
            res.append(curr.val)
            curr = curr.next
        return json.dumps(res)
    if isinstance(obj, TreeNode):
        res = []
        queue = [obj]
        while queue:
            node = queue.pop(0)
            if node:
                res.append(node.val)
                queue.append(node.left)
                queue.append(node.right)
            else:
                res.append(None)
        while res and res[-1] is None:
            res.pop()
        return json.dumps(res)
    return json.dumps(obj)

try:
    sol_class = Solution()
    target_name = "${metadata.functionName || ''}"
    methods = [m for m in dir(sol_class) if not m.startswith('_') and callable(getattr(sol_class, m))]
    
    if target_name and hasattr(sol_class, target_name):
        target_method = getattr(sol_class, target_name)
    elif methods:
        target_method = getattr(sol_class, methods[0])
    else:
        print("Error: No public method found in Solution class", file=sys.stderr)
        sys.exit(1)

    raw_input = """${testCase.input.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""
    input_vars = parse_input(raw_input)

    import inspect
    sig = inspect.signature(target_method)
    param_names = list(sig.parameters.keys())

    kwargs = {}
    for p in param_names:
        val = input_vars.get(p, None)
        annotation_str = str(sig.parameters[p].annotation)
        if 'ListNode' in annotation_str or p in ('l1', 'l2', 'list1', 'list2', 'head'):
            val = build_list_node(val)
        elif 'TreeNode' in annotation_str or p in ('root', 'tree'):
            val = build_tree_node(val)
        kwargs[p] = val

    result = target_method(**kwargs)

    return_type = "${metadata.returnType || ''}"

    if return_type == "void" or result is None:
        if len(input_vars) > 0:
            first_val = list(input_vars.values())[0]
            print(serialize(first_val))
        else:
            print("null")
    else:
        print(serialize(result))

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
}
