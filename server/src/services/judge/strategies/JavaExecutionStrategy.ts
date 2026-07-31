import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ILanguageStrategy, ITestCase, IProblemMetadata, IExecutionResult } from '../judge.types';

export class JavaExecutionStrategy implements ILanguageStrategy {
  private static cachedAvailable: boolean | null = null;

  public static isAvailable(): boolean {
    if (this.cachedAvailable !== null) return this.cachedAvailable;
    try {
      execSync('javac -version', { stdio: 'pipe' });
      execSync('java -version', { stdio: 'pipe' });
      this.cachedAvailable = true;
      return true;
    } catch {
      this.cachedAvailable = false;
      return false;
    }
  }

  public async execute(
    code: string,
    testCase: ITestCase,
    metadata: IProblemMetadata,
    timeoutMs: number = 3000
  ): Promise<IExecutionResult> {
    if (!JavaExecutionStrategy.isAvailable()) {
      return {
        stdout: '',
        stderr: 'Java compiler (javac) or runtime (java) is not installed on the server environment.',
        actualOutput: '',
        timedOut: false,
      };
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'judge_java_'));
    const javaFilePath = path.join(tempDir, 'Main.java');

    try {
      const lines = code.split('\n');
      const imports: string[] = [];
      const bodyLines: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('import ')) {
          imports.push(trimmed);
        } else if (trimmed.startsWith('package ')) {
          // Ignore package declarations
        } else {
          bodyLines.push(line);
        }
      }

      let cleanedCode = bodyLines.join('\n');
      cleanedCode = cleanedCode.replace(/\bpublic\s+class\s+Solution\b/g, 'class Solution');

      const dq = 'String.valueOf(\'"\')';

      const javaSource = `
${imports.join('\n')}
import java.util.*;
import java.io.*;
import java.lang.reflect.*;
import java.util.regex.*;

class ListNode {
    public int val;
    public ListNode next;
    public ListNode() {}
    public ListNode(int val) { this.val = val; }
    public ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode() {}
    public TreeNode(int val) { this.val = val; }
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Node {
    public int val;
    public List<Node> neighbors;
    public Node() { val = 0; neighbors = new ArrayList<Node>(); }
    public Node(int _val) { val = _val; neighbors = new ArrayList<Node>(); }
    public Node(int _val, ArrayList<Node> _neighbors) { val = _val; neighbors = _neighbors; }
}

${cleanedCode}

public class Main {
    public static void main(String[] args) {
        try {
            Solution sol = new Solution();
            Method targetMethod = null;
            String targetName = ${JSON.stringify(metadata.functionName || '')};

            for (Method m : Solution.class.getDeclaredMethods()) {
                if (Modifier.isPublic(m.getModifiers()) && !m.isSynthetic()) {
                    if (targetName.isEmpty() || m.getName().equalsIgnoreCase(targetName)) {
                        targetMethod = m;
                        break;
                    }
                }
            }

            if (targetMethod == null) {
                Method[] allMethods = Solution.class.getDeclaredMethods();
                for (Method m : allMethods) {
                    if (Modifier.isPublic(m.getModifiers()) && !m.isSynthetic()) {
                        targetMethod = m;
                        break;
                    }
                }
            }

            if (targetMethod == null) {
                System.err.println("Error: No public method found in Solution class");
                System.exit(1);
            }

            String rawInput = ${JSON.stringify(testCase.input)};
            Object[] parsedArgs = parseArgsForMethod(targetMethod, rawInput);
            Object result = targetMethod.invoke(sol, parsedArgs);

            if (targetMethod.getReturnType() == void.class) {
                if (parsedArgs.length > 0) {
                    serializeOutput(parsedArgs[0]);
                } else {
                    System.out.println("null");
                }
            } else {
                serializeOutput(result);
            }
        } catch (InvocationTargetException ite) {
            Throwable cause = ite.getCause() != null ? ite.getCause() : ite;
            cause.printStackTrace(System.err);
            System.exit(1);
        } catch (Throwable t) {
            t.printStackTrace(System.err);
            System.exit(1);
        }
    }

    private static void serializeOutput(Object result) {
        if (result == null) {
            System.out.println("null");
        } else if (result instanceof ListNode) {
            System.out.println(serializeListNode((ListNode) result));
        } else if (result instanceof TreeNode) {
            System.out.println(serializeTreeNode((TreeNode) result));
        } else if (result.getClass().isArray()) {
            if (result instanceof char[]) {
                char[] ca = (char[]) result;
                List<String> list = new ArrayList<>();
                for (char c : ca) list.add(String.valueOf('"') + c + String.valueOf('"'));
                System.out.println(list.toString());
            } else if (result instanceof int[]) {
                System.out.println(Arrays.toString((int[]) result));
            } else if (result instanceof double[]) {
                System.out.println(Arrays.toString((double[]) result));
            } else if (result instanceof boolean[]) {
                System.out.println(Arrays.toString((boolean[]) result));
            } else if (result instanceof char[][]) {
                char[][] grid = (char[][]) result;
                List<List<String>> list = new ArrayList<>();
                for (char[] row : grid) {
                    List<String> r = new ArrayList<>();
                    for (char c : row) r.add(String.valueOf(c));
                    list.add(r);
                }
                System.out.println(list.toString());
            } else {
                System.out.println(Arrays.deepToString((Object[]) result));
            }
        } else if (result instanceof Boolean) {
            System.out.println(((Boolean) result).booleanValue() ? "true" : "false");
        } else {
            System.out.println(result.toString());
        }
    }

    private static String serializeListNode(ListNode head) {
        List<Integer> list = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            list.add(curr.val);
            curr = curr.next;
        }
        return list.toString();
    }

    private static String serializeTreeNode(TreeNode root) {
        if (root == null) return "[]";
        List<String> result = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) {
                result.add(String.valueOf(node.val));
                queue.add(node.left);
                queue.add(node.right);
            } else {
                result.add("null");
            }
        }
        while (!result.isEmpty() && result.get(result.size() - 1).equals("null")) {
            result.remove(result.size() - 1);
        }
        return result.toString();
    }

    private static Object[] parseArgsForMethod(Method method, String inputStr) {
        Class<?>[] paramTypes = method.getParameterTypes();
        Object[] args = new Object[paramTypes.length];
        if (paramTypes.length == 0) return args;

        List<String> rawValStrings = extractValueStrings(inputStr);

        for (int i = 0; i < paramTypes.length; i++) {
            String valStr = i < rawValStrings.size() ? rawValStrings.get(i) : "";
            args[i] = convertValue(valStr, paramTypes[i]);
        }
        return args;
    }

    private static List<String> extractValueStrings(String inputStr) {
        List<String> list = new ArrayList<>();
        if (inputStr == null || inputStr.trim().isEmpty()) return list;

        Pattern pattern = Pattern.compile("([a-zA-Z_]\\\\w*)\\\\s*=\\\\s*(.*?)(?=(?:,\\\\s*[a-zA-Z_]\\\\w*\\\\s*= |\\\\n\\\\s*[a-zA-Z_]\\\\w*\\\\s*= |$))", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(inputStr);
        while (matcher.find()) {
            String val = matcher.group(2).trim();
            if (val.endsWith(",")) val = val.substring(0, val.length() - 1).trim();
            list.add(val);
        }
        if (list.isEmpty()) {
            list.add(inputStr.trim());
        }
        return list;
    }

    private static Object convertValue(String val, Class<?> type) {
        val = val.trim();
        if (type == int.class || type == Integer.class) {
            try { return Integer.parseInt(val); } catch (Exception e) { return 0; }
        }
        if (type == long.class || type == Long.class) {
            try { return Long.parseLong(val); } catch (Exception e) { return 0L; }
        }
        if (type == double.class || type == Double.class) {
            try { return Double.parseDouble(val); } catch (Exception e) { return 0.0; }
        }
        if (type == boolean.class || type == Boolean.class) {
            return Boolean.parseBoolean(val.toLowerCase());
        }
        if (type == String.class) {
            if ((val.startsWith(${dq}) && val.endsWith(${dq})) || (val.startsWith("'") && val.endsWith("'"))) {
                return val.substring(1, val.length() - 1);
            }
            return val;
        }
        if (type == char.class || type == Character.class) {
            String s = val.replace("'", "").replace(${dq}, "");
            return s.isEmpty() ? ' ' : s.charAt(0);
        }
        if (type == char[].class) {
            return parseCharArray(val);
        }
        if (type == int[].class) {
            return parseIntArray(val);
        }
        if (type == int[][].class) {
            return parseInt2DArray(val);
        }
        if (type == char[][].class) {
            return parseChar2DArray(val);
        }
        if (type == ListNode.class) {
            return parseListNode(val);
        }
        if (type == TreeNode.class) {
            return parseTreeNode(val);
        }
        if (type == String[].class) {
            return parseStringArray(val);
        }
        if (List.class.isAssignableFrom(type)) {
            return parseList(val);
        }
        return val;
    }

    private static char[] parseCharArray(String val) {
        val = val.replace("[", "").replace("]", "").trim();
        if (val.isEmpty()) return new char[0];
        String[] parts = val.split(",");
        char[] arr = new char[parts.length];
        for (int i = 0; i < parts.length; i++) {
            String p = parts[i].trim().replace("'", "").replace(${dq}, "");
            arr[i] = p.isEmpty() ? ' ' : p.charAt(0);
        }
        return arr;
    }

    private static int[] parseIntArray(String val) {
        val = val.replace("[", "").replace("]", "").trim();
        if (val.isEmpty()) return new int[0];
        String[] parts = val.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            try { arr[i] = Integer.parseInt(parts[i].trim()); } catch (Exception e) { arr[i] = 0; }
        }
        return arr;
    }

    private static int[][] parseInt2DArray(String val) {
        val = val.trim();
        if (!val.startsWith("[") || !val.endsWith("]")) return new int[0][0];
        val = val.substring(1, val.length() - 1).trim();
        if (val.isEmpty()) return new int[0][0];

        List<int[]> rows = new ArrayList<>();
        Pattern p = Pattern.compile("\\\\[(.*?)\\\\]");
        Matcher m = p.matcher(val);
        while (m.find()) {
            rows.add(parseIntArray(m.group(1)));
        }
        return rows.toArray(new int[0][]);
    }

    private static char[][] parseChar2DArray(String val) {
        val = val.trim();
        if (!val.startsWith("[") || !val.endsWith("]")) return new char[0][0];
        val = val.substring(1, val.length() - 1).trim();
        if (val.isEmpty()) return new char[0][0];

        List<char[]> rows = new ArrayList<>();
        Pattern p = Pattern.compile("\\\\[(.*?)\\\\]");
        Matcher m = p.matcher(val);
        while (m.find()) {
            rows.add(parseCharArray(m.group(1)));
        }
        return rows.toArray(new char[0][]);
    }

    private static ListNode parseListNode(String val) {
        int[] nums = parseIntArray(val);
        if (nums.length == 0) return null;
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int n : nums) {
            curr.next = new ListNode(n);
            curr = curr.next;
        }
        return dummy.next;
    }

    private static TreeNode parseTreeNode(String val) {
        val = val.replace("[", "").replace("]", "").trim();
        if (val.isEmpty()) return null;
        String[] parts = val.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) return null;

        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode curr = queue.poll();

            if (i < parts.length && !parts[i].trim().equals("null") && !parts[i].trim().isEmpty()) {
                curr.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.add(curr.left);
            }
            i++;

            if (i < parts.length && !parts[i].trim().equals("null") && !parts[i].trim().isEmpty()) {
                curr.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.add(curr.right);
            }
            i++;
        }
        return root;
    }

    private static String[] parseStringArray(String val) {
        val = val.replace("[", "").replace("]", "").trim();
        if (val.isEmpty()) return new String[0];
        String[] parts = val.split(",");
        for (int i = 0; i < parts.length; i++) {
            String p = parts[i].trim();
            if ((p.startsWith(${dq}) && p.endsWith(${dq})) || (p.startsWith("'") && p.endsWith("'"))) {
                p = p.substring(1, p.length() - 1);
            }
            parts[i] = p;
        }
        return parts;
    }

    private static List<Object> parseList(String val) {
        List<Object> list = new ArrayList<>();
        val = val.replace("[", "").replace("]", "").trim();
        if (val.isEmpty()) return list;
        String[] parts = val.split(",");
        for (String p : parts) {
            p = p.trim();
            if ((p.startsWith(${dq}) && p.endsWith(${dq})) || (p.startsWith("'") && p.endsWith("'"))) {
                p = p.substring(1, p.length() - 1);
            }
            try {
                list.add(Integer.parseInt(p));
            } catch (Exception e) {
                list.add(p);
            }
        }
        return list;
    }
}
`;

      fs.writeFileSync(javaFilePath, javaSource, 'utf8');

      // 1. Compile Main.java
      try {
        execSync('javac -cp . Main.java', { cwd: tempDir, encoding: 'utf8', stdio: 'pipe' });
      } catch (compileErr: any) {
        const compileStderr = compileErr.stderr
          ? compileErr.stderr.toString()
          : compileErr.stdout
          ? compileErr.stdout.toString()
          : compileErr.message || String(compileErr);
        return {
          stdout: '',
          stderr: `javac: Compilation Error:\n${compileStderr}`,
          actualOutput: '',
          timedOut: false,
        };
      }

      // 2. Execute Main with java
      try {
        const runStdout = execSync('java -cp . Main', {
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
