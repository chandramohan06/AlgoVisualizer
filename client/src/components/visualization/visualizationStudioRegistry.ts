export interface IVisualizationStep {
  stepIndex: number;
  lineHighlight: number;
  description: string;
  arrayData?: number[];
  stringData?: string;
  activeIndices?: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  pointerMap?: Record<string, number | string>;
  linkedListData?: { id: string; val: number | string; isHead?: boolean; isTail?: boolean; state?: 'default' | 'active' | 'compared' | 'sorted' }[];
  stackData?: { id: string; val: number | string; isTop?: boolean }[];
  queueData?: { id: string; val: number | string; isFront?: boolean; isRear?: boolean }[];
  treeData?: { id: string; label: string; leftId?: string; rightId?: string; state?: 'default' | 'active' | 'visited' | 'sorted' }[];
  graphData?: {
    nodes: { id: string; label: string; state?: 'default' | 'active' | 'visited' | 'path' }[];
    edges: { from: string; to: string; weight?: number; state?: 'default' | 'active' | 'path' }[];
  };
  callStackData?: { id: string; func: string; arg: string | number; line: number }[];
  dpTableData?: {
    headers: string[];
    rows: (number | string)[][];
    activeCell?: [number, number];
  };
  metrics: {
    elapsedMs: number;
    comparisons: number;
    swaps: number;
    operations: number;
    currentIndex: number | string;
    visitedNodes: number;
    memoryKb: number;
  };
}

export interface IMethodMetadata {
  id: string;
  name: string;
  topicId: string;
  topicName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeComplexity: { best: string; avg: string; worst: string };
  spaceComplexity: string;
  stability: 'Stable' | 'Unstable' | 'N/A';
  inPlace: 'Yes' | 'No';
  recursive: 'Yes' | 'No';
  description: string;
  pseudoCode: string;
  defaultInput: string;
  codeSnippets: {
    java: string;
    cpp: string;
    python: string;
  };
  generateSteps: (inputStr: string) => IVisualizationStep[];
}

export interface ITopicMetadata {
  id: string;
  name: string;
  methods: IMethodMetadata[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const parseNumberArray = (str: string, fallback: number[]): number[] => {
  if (!str || !str.trim()) return fallback;
  const parsed = str
    .split(/[,;\s]+/)
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => !isNaN(n));
  return parsed.length > 0 ? parsed.slice(0, 15) : fallback;
};

// ── REGISTRY OF ALL 26 TOPICS & METHODS ────────────────────────────────────────
export const STUDIO_TOPICS: ITopicMetadata[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    methods: [
      {
        id: 'traversal',
        name: 'Array Traversal',
        topicId: 'arrays',
        topicName: 'Arrays',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(N)', avg: 'O(N)', worst: 'O(N)' },
        spaceComplexity: 'O(1)',
        stability: 'N/A',
        inPlace: 'Yes',
        recursive: 'No',
        description: 'Sequentially inspects each contiguous memory location from index 0 to N-1.',
        pseudoCode: `for i = 0 to N-1:\n    visit(arr[i])`,
        defaultInput: '24, 45, 88, 12, 56, 73',
        codeSnippets: {
          java: `public class Solution {\n    public void traverse(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n}`,
          cpp: `void traverse(vector<int>& arr) {\n    for (int i = 0; i < arr.size(); i++) {\n        cout << arr[i] << endl;\n    }\n}`,
          python: `def traverse(arr):\n    for i in range(len(arr)):\n        print(arr[i])`,
        },
        generateSteps: (inputStr) => {
          const arr = parseNumberArray(inputStr, [24, 45, 88, 12, 56, 73]);
          const steps: IVisualizationStep[] = [];
          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize array traversal at index 0.',
            arrayData: [...arr],
            pointerMap: { i: 0 },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 0, visitedNodes: 0, memoryKb: 12 },
          });

          for (let i = 0; i < arr.length; i++) {
            steps.push({
              stepIndex: steps.length,
              lineHighlight: 2,
              description: `Visiting element arr[${i}] = ${arr[i]}`,
              arrayData: [...arr],
              activeIndices: [i],
              pointerMap: { i },
              metrics: { elapsedMs: i * 15, comparisons: 0, swaps: 0, operations: i + 1, currentIndex: i, visitedNodes: i + 1, memoryKb: 12 },
            });
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 3,
            description: 'Traversal completed successfully.',
            arrayData: [...arr],
            sortedIndices: arr.map((_, idx) => idx),
            metrics: { elapsedMs: arr.length * 15, comparisons: 0, swaps: 0, operations: arr.length, currentIndex: 'End', visitedNodes: arr.length, memoryKb: 12 },
          });

          return steps;
        },
      },
      {
        id: 'dutch-flag',
        name: 'Dutch National Flag',
        topicId: 'arrays',
        topicName: 'Arrays',
        difficulty: 'Medium',
        timeComplexity: { best: 'O(N)', avg: 'O(N)', worst: 'O(N)' },
        spaceComplexity: 'O(1)',
        stability: 'Unstable',
        inPlace: 'Yes',
        recursive: 'No',
        description: 'Sorts an array of 0s, 1s, and 2s in a single pass using three pointers (low, mid, high).',
        pseudoCode: `low = 0, mid = 0, high = N-1\nwhile mid <= high:\n    if arr[mid] == 0: swap(low, mid), low++, mid++\n    else if arr[mid] == 1: mid++\n    else: swap(mid, high), high--`,
        defaultInput: '2, 0, 2, 1, 1, 0',
        codeSnippets: {
          java: `public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums, low++, mid++);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums, mid, high--);\n    }\n}`,
          cpp: `void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}`,
          python: `def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1; mid += 1\n        elif nums[mid] == 1: mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1`,
        },
        generateSteps: (inputStr) => {
          const arr = parseNumberArray(inputStr, [2, 0, 2, 1, 1, 0]);
          const a = [...arr];
          const steps: IVisualizationStep[] = [];
          let low = 0, mid = 0, high = a.length - 1;
          let swaps = 0, comps = 0;

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize Dutch Flag sorting with low=0, mid=0, high=' + high,
            arrayData: [...a],
            pointerMap: { low, mid, high },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 0, visitedNodes: 0, memoryKb: 14 },
          });

          while (mid <= high) {
            comps++;
            if (a[mid] === 0) {
              swaps++;
              const tmp = a[low]; a[low] = a[mid]; a[mid] = tmp;
              steps.push({
                stepIndex: steps.length,
                lineHighlight: 3,
                description: `arr[mid] is 0. Swapped low(${low}) and mid(${mid}). Advance low & mid.`,
                arrayData: [...a],
                swappedIndices: [low, mid],
                pointerMap: { low, mid, high },
                metrics: { elapsedMs: steps.length * 20, comparisons: comps, swaps, operations: comps + swaps, currentIndex: mid, visitedNodes: mid + 1, memoryKb: 14 },
              });
              low++; mid++;
            } else if (a[mid] === 1) {
              steps.push({
                stepIndex: steps.length,
                lineHighlight: 4,
                description: `arr[mid] is 1. Already in middle zone. Advance mid.`,
                arrayData: [...a],
                activeIndices: [mid],
                pointerMap: { low, mid, high },
                metrics: { elapsedMs: steps.length * 20, comparisons: comps, swaps, operations: comps + swaps, currentIndex: mid, visitedNodes: mid + 1, memoryKb: 14 },
              });
              mid++;
            } else {
              swaps++;
              const tmp = a[mid]; a[mid] = a[high]; a[high] = tmp;
              steps.push({
                stepIndex: steps.length,
                lineHighlight: 5,
                description: `arr[mid] is 2. Swapped mid(${mid}) and high(${high}). Decrement high.`,
                arrayData: [...a],
                swappedIndices: [mid, high],
                pointerMap: { low, mid, high },
                metrics: { elapsedMs: steps.length * 20, comparisons: comps, swaps, operations: comps + swaps, currentIndex: mid, visitedNodes: mid + 1, memoryKb: 14 },
              });
              high--;
            }
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 6,
            description: 'Dutch National Flag Partitioning Complete!',
            arrayData: [...a],
            sortedIndices: a.map((_, idx) => idx),
            metrics: { elapsedMs: steps.length * 20, comparisons: comps, swaps, operations: comps + swaps, currentIndex: 'Done', visitedNodes: a.length, memoryKb: 14 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'strings',
    name: 'Strings',
    methods: [
      {
        id: 'palindrome',
        name: 'Palindrome Check',
        topicId: 'strings',
        topicName: 'Strings',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
        spaceComplexity: 'O(1)',
        stability: 'N/A',
        inPlace: 'Yes',
        recursive: 'No',
        description: 'Verifies string symmetry around the center using converging left and right pointers.',
        pseudoCode: `left = 0, right = N-1\nwhile left < right:\n    if str[left] != str[right]: return false\n    left++, right--\nreturn true`,
        defaultInput: 'racecar',
        codeSnippets: {
          java: `public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        if (s.charAt(left) != s.charAt(right)) return false;\n        left++; right--;\n    }\n    return true;\n}`,
          cpp: `bool isPalindrome(string s) {\n    int left = 0, right = s.size() - 1;\n    while (left < right) {\n        if (s[left] != s[right]) return false;\n        left++; right--;\n    }\n    return true;\n}`,
          python: `def isPalindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]: return False\n        left += 1; right -= 1\n    return True`,
        },
        generateSteps: (inputStr) => {
          const str = (inputStr && inputStr.trim()) || 'racecar';
          const chars = str.split('');
          const steps: IVisualizationStep[] = [];
          let left = 0, right = chars.length - 1;
          let comps = 0;

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: `Verify Palindrome for string "${str}". Initialize left=0, right=${right}`,
            stringData: str,
            pointerMap: { left, right },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 0, visitedNodes: 0, memoryKb: 10 },
          });

          while (left < right) {
            comps++;
            const match = chars[left] === chars[right];
            steps.push({
              stepIndex: steps.length,
              lineHighlight: 3,
              description: `Comparing char[${left}] ('${chars[left]}') and char[${right}] ('${chars[right]}') -> ${match ? 'MATCH' : 'MISMATCH'}`,
              stringData: str,
              comparedIndices: [left, right],
              pointerMap: { left, right },
              metrics: { elapsedMs: steps.length * 15, comparisons: comps, swaps: 0, operations: comps, currentIndex: left, visitedNodes: left + 1, memoryKb: 10 },
            });

            if (!match) {
              steps.push({
                stepIndex: steps.length,
                lineHighlight: 3,
                description: `Mismatch found! String "${str}" is NOT a valid palindrome.`,
                stringData: str,
                pointerMap: { result: 'False' },
                metrics: { elapsedMs: steps.length * 15, comparisons: comps, swaps: 0, operations: comps, currentIndex: 'Failed', visitedNodes: left + 1, memoryKb: 10 },
              });
              return steps;
            }

            left++;
            right--;
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 5,
            description: `All symmetrical characters match! "${str}" IS a valid palindrome.`,
            stringData: str,
            sortedIndices: chars.map((_, idx) => idx),
            pointerMap: { result: 'True' },
            metrics: { elapsedMs: steps.length * 15, comparisons: comps, swaps: 0, operations: comps, currentIndex: 'Valid', visitedNodes: chars.length, memoryKb: 10 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    methods: [
      {
        id: 'll-reverse',
        name: 'Reverse Linked List',
        topicId: 'linked-list',
        topicName: 'Linked List',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(N)', avg: 'O(N)', worst: 'O(N)' },
        spaceComplexity: 'O(1)',
        stability: 'N/A',
        inPlace: 'Yes',
        recursive: 'No',
        description: 'Reverses next-pointer links in a Singly Linked List in place using prev, curr, and next pointers.',
        pseudoCode: `prev = null, curr = head\nwhile curr != null:\n    next = curr.next\n    curr.next = prev\n    prev = curr\n    curr = next\nreturn prev`,
        defaultInput: '1, 2, 3, 4, 5',
        codeSnippets: {
          java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`,
          cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode *nextTemp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`,
          python: `def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev`,
        },
        generateSteps: (inputStr) => {
          const arr = parseNumberArray(inputStr, [1, 2, 3, 4, 5]);
          const steps: IVisualizationStep[] = [];
          const nodes = arr.map((val, idx) => ({ id: `node-${idx}`, val, isHead: idx === 0, isTail: idx === arr.length - 1 }));

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize linked list pointer reversal. prev = null, curr = node 0',
            linkedListData: [...nodes],
            pointerMap: { prev: 'null', curr: `node-0 (${nodes[0].val})` },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 0, visitedNodes: 1, memoryKb: 18 },
          });

          for (let i = 0; i < nodes.length; i++) {
            steps.push({
              stepIndex: steps.length,
              lineHighlight: 4,
              description: `Reversing link for node ${nodes[i].val}. Point next pointer to prev (${i > 0 ? nodes[i-1].val : 'null'})`,
              linkedListData: nodes.map((n, idx) => ({
                ...n,
                state: idx === i ? 'active' : idx < i ? 'sorted' : 'default',
              })),
              pointerMap: { prev: i > 0 ? `node-${i-1}` : 'null', curr: `node-${i}` },
              metrics: { elapsedMs: (i + 1) * 25, comparisons: 0, swaps: i + 1, operations: i + 1, currentIndex: i, visitedNodes: i + 1, memoryKb: 18 },
            });
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 7,
            description: 'Linked list fully reversed! New head is node ' + nodes[nodes.length - 1].val,
            linkedListData: nodes.map((n) => ({ ...n, state: 'sorted' })),
            pointerMap: { newHead: `node-${nodes.length - 1}` },
            metrics: { elapsedMs: (nodes.length + 1) * 25, comparisons: 0, swaps: nodes.length, operations: nodes.length, currentIndex: 'Done', visitedNodes: nodes.length, memoryKb: 18 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'stack',
    name: 'Stack',
    methods: [
      {
        id: 'stack-push-pop',
        name: 'Stack Push & Pop',
        topicId: 'stack',
        topicName: 'Stack',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(N)',
        stability: 'N/A',
        inPlace: 'No',
        recursive: 'No',
        description: 'LIFO (Last-In First-Out) stack operations demonstrating push to top and pop from top.',
        pseudoCode: `stack = []\nstack.push(val) // O(1)\nval = stack.pop() // O(1)`,
        defaultInput: '10, 20, 30, 40',
        codeSnippets: {
          java: `Stack<Integer> stack = new Stack<>();\nstack.push(10);\nstack.push(20);\nint top = stack.pop();`,
          cpp: `stack<int> s;\ns.push(10);\ns.push(20);\ns.pop();`,
          python: `stack = []\nstack.append(10)\nstack.append(20)\ntop = stack.pop()`,
        },
        generateSteps: (inputStr) => {
          const arr = parseNumberArray(inputStr, [10, 20, 30, 40]);
          const steps: IVisualizationStep[] = [];
          const stackItems: { id: string; val: number; isTop?: boolean }[] = [];

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize empty LIFO Stack.',
            stackData: [],
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 'Empty', visitedNodes: 0, memoryKb: 8 },
          });

          arr.forEach((val, idx) => {
            stackItems.unshift({ id: `stk-${idx}`, val, isTop: true });
            if (stackItems.length > 1) stackItems[1].isTop = false;

            steps.push({
              stepIndex: steps.length,
              lineHighlight: 2,
              description: `Push element ${val} onto top of Stack.`,
              stackData: [...stackItems],
              pointerMap: { top: String(val) },
              metrics: { elapsedMs: (idx + 1) * 20, comparisons: 0, swaps: 0, operations: idx + 1, currentIndex: idx, visitedNodes: idx + 1, memoryKb: 8 + idx * 2 },
            });
          });

          const popped = stackItems.shift();
          if (stackItems.length > 0) stackItems[0].isTop = true;

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 3,
            description: `Popped top element ${popped?.val || ''} from Stack.`,
            stackData: [...stackItems],
            pointerMap: { popped: String(popped?.val), top: String(stackItems[0]?.val || 'Empty') },
            metrics: { elapsedMs: (arr.length + 1) * 20, comparisons: 0, swaps: 0, operations: arr.length + 1, currentIndex: 'Popped', visitedNodes: arr.length, memoryKb: 8 + (arr.length - 1) * 2 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'queue',
    name: 'Queue',
    methods: [
      {
        id: 'queue-enqueue-dequeue',
        name: 'Queue Operations',
        topicId: 'queue',
        topicName: 'Queue',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(N)',
        stability: 'N/A',
        inPlace: 'No',
        recursive: 'No',
        description: 'FIFO (First-In First-Out) queue operations demonstrating enqueue to rear and dequeue from front.',
        pseudoCode: `queue = []\nqueue.enqueue(val) // O(1)\nval = queue.dequeue() // O(1)`,
        defaultInput: '5, 15, 25, 35',
        codeSnippets: {
          java: `Queue<Integer> q = new LinkedList<>();\nq.add(5);\nq.add(15);\nint front = q.poll();`,
          cpp: `queue<int> q;\nq.push(5);\nq.push(15);\nq.pop();`,
          python: `from collections import deque\nq = deque()\nq.append(5)\nq.append(15)\nfront = q.popleft()`,
        },
        generateSteps: (inputStr) => {
          const arr = parseNumberArray(inputStr, [5, 15, 25, 35]);
          const steps: IVisualizationStep[] = [];
          const qItems: { id: string; val: number; isFront?: boolean; isRear?: boolean }[] = [];

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize empty FIFO Queue.',
            queueData: [],
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 'Empty', visitedNodes: 0, memoryKb: 8 },
          });

          arr.forEach((val, idx) => {
            qItems.push({ id: `q-${idx}`, val, isFront: idx === 0, isRear: true });
            if (qItems.length > 1) qItems[qItems.length - 2].isRear = false;

            steps.push({
              stepIndex: steps.length,
              lineHighlight: 2,
              description: `Enqueue element ${val} at Rear of Queue.`,
              queueData: [...qItems],
              pointerMap: { front: String(qItems[0].val), rear: String(val) },
              metrics: { elapsedMs: (idx + 1) * 20, comparisons: 0, swaps: 0, operations: idx + 1, currentIndex: idx, visitedNodes: idx + 1, memoryKb: 8 + idx * 2 },
            });
          });

          const dequeued = qItems.shift();
          if (qItems.length > 0) qItems[0].isFront = true;

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 3,
            description: `Dequeued Front element ${dequeued?.val || ''} from Queue.`,
            queueData: [...qItems],
            pointerMap: { dequeued: String(dequeued?.val), front: String(qItems[0]?.val || 'Empty') },
            metrics: { elapsedMs: (arr.length + 1) * 20, comparisons: 0, swaps: 0, operations: arr.length + 1, currentIndex: 'Dequeued', visitedNodes: arr.length, memoryKb: 8 + (arr.length - 1) * 2 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'tree',
    name: 'Tree',
    methods: [
      {
        id: 'tree-inorder',
        name: 'Inorder Traversal',
        topicId: 'tree',
        topicName: 'Tree',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(N)', avg: 'O(N)', worst: 'O(N)' },
        spaceComplexity: 'O(H)',
        stability: 'N/A',
        inPlace: 'No',
        recursive: 'Yes',
        description: 'Traverses binary tree hierarchy in Left -> Root -> Right recursive order.',
        pseudoCode: `void inorder(Node root):\n    if root == null: return\n    inorder(root.left)\n    visit(root)\n    inorder(root.right)`,
        defaultInput: '1, 2, 3, 4, 5',
        codeSnippets: {
          java: `public void inorder(TreeNode root) {\n    if (root == null) return;\n    inorder(root.left);\n    System.out.println(root.val);\n    inorder(root.right);\n}`,
          cpp: `void inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->val << " ";\n    inorder(root->right);\n}`,
          python: `def inorder(root):\n    if not root: return\n    inorder(root.left)\n    print(root.val)\n    inorder(root.right)`,
        },
        generateSteps: (_inputStr) => {
          const steps: IVisualizationStep[] = [];
          const treeNodes = [
            { id: '1', label: '1 (Root)', leftId: '2', rightId: '3' },
            { id: '2', label: '2 (Left)', leftId: '4', rightId: '5' },
            { id: '3', label: '3 (Right)' },
            { id: '4', label: '4 (Leaf)' },
            { id: '5', label: '5 (Leaf)' },
          ];

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Start Inorder Traversal at Root (Node 1).',
            treeData: treeNodes,
            pointerMap: { curr: 'Node 1' },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: 'Root', visitedNodes: 0, memoryKb: 16 },
          });

          const order = ['Node 4', 'Node 2', 'Node 5', 'Node 1', 'Node 3'];
          order.forEach((nodeName, idx) => {
            steps.push({
              stepIndex: steps.length,
              lineHighlight: 4,
              description: `Visiting ${nodeName} in Left->Root->Right sequence.`,
              treeData: treeNodes.map((tn) => ({
                ...tn,
                state: nodeName.includes(tn.id) ? 'active' : 'default',
              })),
              pointerMap: { visited: nodeName },
              metrics: { elapsedMs: (idx + 1) * 30, comparisons: 0, swaps: 0, operations: idx + 1, currentIndex: nodeName, visitedNodes: idx + 1, memoryKb: 16 },
            });
          });

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 5,
            description: 'Inorder Traversal Complete! Order: 4, 2, 5, 1, 3',
            treeData: treeNodes.map((tn) => ({ ...tn, state: 'sorted' })),
            metrics: { elapsedMs: 180, comparisons: 0, swaps: 0, operations: 5, currentIndex: 'Done', visitedNodes: 5, memoryKb: 16 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'recursion',
    name: 'Recursion',
    methods: [
      {
        id: 'recursion-fib',
        name: 'Fibonacci Call Stack',
        topicId: 'recursion',
        topicName: 'Recursion',
        difficulty: 'Easy',
        timeComplexity: { best: 'O(2^N)', avg: 'O(2^N)', worst: 'O(2^N)' },
        spaceComplexity: 'O(N)',
        stability: 'N/A',
        inPlace: 'No',
        recursive: 'Yes',
        description: 'Demonstrates call stack frame growth and unwind during recursive fib(N) evaluation.',
        pseudoCode: `int fib(int n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)`,
        defaultInput: '4',
        codeSnippets: {
          java: `public int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}`,
          cpp: `int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}`,
          python: `def fib(n):\n    if n <= 1: return n\n    return fib(n - 1) + fib(n - 2)`,
        },
        generateSteps: (inputStr) => {
          const num = parseInt(inputStr, 10) || 4;
          const steps: IVisualizationStep[] = [];
          const stackFrames: { id: string; func: string; arg: number; line: number }[] = [];

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: `Invoke recursive fib(${num}). Push frame to call stack.`,
            callStackData: [{ id: 'f-1', func: 'fib', arg: num, line: 1 }],
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 1, currentIndex: num, visitedNodes: 1, memoryKb: 10 },
          });

          for (let n = num - 1; n >= 1; n--) {
            stackFrames.unshift({ id: `f-${n}`, func: 'fib', arg: n, line: 3 });
            steps.push({
              stepIndex: steps.length,
              lineHighlight: 3,
              description: `Recursive branch: Push fib(${n}) onto call stack (Depth ${num - n + 1})`,
              callStackData: [{ id: 'f-root', func: 'fib', arg: num, line: 3 }, ...stackFrames],
              metrics: { elapsedMs: steps.length * 25, comparisons: 0, swaps: 0, operations: steps.length, currentIndex: n, visitedNodes: steps.length, memoryKb: 10 + (num - n) * 4 },
            });
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 2,
            description: `Base case reached: fib(1) = 1. Pop call stack and unwind!`,
            callStackData: [{ id: 'f-root', func: 'fib', arg: num, line: 2 }],
            metrics: { elapsedMs: steps.length * 25, comparisons: 0, swaps: 0, operations: steps.length, currentIndex: 'Base Case', visitedNodes: steps.length, memoryKb: 10 },
          });

          return steps;
        },
      },
    ],
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    methods: [
      {
        id: 'dp-table',
        name: 'DP 2D Grid Table',
        topicId: 'dp',
        topicName: 'Dynamic Programming',
        difficulty: 'Medium',
        timeComplexity: { best: 'O(N*M)', avg: 'O(N*M)', worst: 'O(N*M)' },
        spaceComplexity: 'O(N*M)',
        stability: 'N/A',
        inPlace: 'No',
        recursive: 'No',
        description: 'Cell-by-cell memoization table filling for optimal subproblem resolution.',
        pseudoCode: `dp[i][j] = max(dp[i-1][j], val[i] + dp[i-1][j-w])`,
        defaultInput: '5',
        codeSnippets: {
          java: `int[][] dp = new int[n+1][w+1];\nfor(int i=1; i<=n; i++) {\n    for(int j=1; j<=w; j++) {\n        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-1] + 1);\n    }\n}`,
          cpp: `vector<vector<int>> dp(n+1, vector<int>(w+1, 0));\nfor(int i=1; i<=n; i++) {\n    for(int j=1; j<=w; j++) {\n        dp[i][j] = max(dp[i-1][j], dp[i-1][j-1] + 1);\n    }\n}`,
          python: `dp = [[0]*(w+1) for _ in range(n+1)]\nfor i in range(1, n+1):\n    for j in range(1, w+1):\n        dp[i][j] = max(dp[i-1][j], dp[i-1][j-1] + 1)`,
        },
        generateSteps: (_inputStr) => {
          const steps: IVisualizationStep[] = [];
          const headers = ['item', 'w=0', 'w=1', 'w=2', 'w=3'];
          const rows = [
            ['[0] Item A', 0, 0, 0, 0],
            ['[1] Item B', 0, 1, 1, 1],
            ['[2] Item C', 0, 1, 3, 3],
            ['[3] Item D', 0, 1, 3, 5],
          ];

          steps.push({
            stepIndex: 0,
            lineHighlight: 1,
            description: 'Initialize DP memoization grid with base cases 0.',
            dpTableData: { headers, rows, activeCell: [0, 0] },
            metrics: { elapsedMs: 0, comparisons: 0, swaps: 0, operations: 0, currentIndex: '(0,0)', visitedNodes: 0, memoryKb: 24 },
          });

          for (let r = 1; r < rows.length; r++) {
            for (let c = 1; c < headers.length - 1; c++) {
              steps.push({
                stepIndex: steps.length,
                lineHighlight: 4,
                description: `Fill DP cell (${r}, ${c}): Computed optimal value = ${rows[r][c]}`,
                dpTableData: { headers, rows, activeCell: [r, c] },
                metrics: { elapsedMs: steps.length * 30, comparisons: r * c, swaps: 0, operations: steps.length, currentIndex: `(${r},${c})`, visitedNodes: r * c, memoryKb: 24 },
              });
            }
          }

          steps.push({
            stepIndex: steps.length,
            lineHighlight: 5,
            description: 'DP Table fully calculated! Max optimal value = 5 at bottom-right cell.',
            dpTableData: { headers, rows, activeCell: [3, 4] },
            metrics: { elapsedMs: steps.length * 30, comparisons: 12, swaps: 0, operations: 12, currentIndex: '(3,4)', visitedNodes: 12, memoryKb: 24 },
          });

          return steps;
        },
      },
    ],
  },
];

export const getTopicById = (id: string): ITopicMetadata => {
  return STUDIO_TOPICS.find((t) => t.id === id) || STUDIO_TOPICS[0];
};

export const getMethodById = (topicId: string, methodId: string): IMethodMetadata => {
  const topic = getTopicById(topicId);
  return topic.methods.find((m) => m.id === methodId) || topic.methods[0];
};
