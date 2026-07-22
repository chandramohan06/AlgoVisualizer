import {
  IPointerInfo,
  IArrayAnimationFrame,
  IArrayAlgorithmMeta,
  ElementState,
} from './arrayFrameEngine';

// Helpers
const getSimulatedAddress = (index: number, baseHex: number = 0x2000) => {
  const addr = (baseHex + index * 4).toString(16).toUpperCase();
  return `0x${addr}`;
};

const buildMemoryData = (arr: { val: number; state: ElementState; address: string }[], pointers: IPointerInfo[]) => {
  return arr.map((item, idx) => {
    const ptr = pointers.find((p) => p.index === idx)?.name;
    return {
      index: idx,
      address: item.address || getSimulatedAddress(idx),
      val: item.val,
      state: item.state,
      pointer: ptr,
    };
  });
};

// ── COMPLETE STACK & QUEUE VISUALIZATION SUITE ──────────────────────────────────
export const STACK_QUEUE_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. STACK PUSH & POP (LIFO)
  {
    id: 'stack-push-pop',
    name: 'Stack Operations (Push & Pop LIFO)',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(N)',
    description: 'Demonstrates Last-In, First-Out (LIFO) stack push and pop operations with top pointer tracking and stack overflow/underflow checks.',
    pseudoCode: `// Push(val):\nif top == CAPACITY - 1: return OVERFLOW\ntop++\nstack[top] = val\n\n// Pop():\nif top == -1: return UNDERFLOW\nval = stack[top]\ntop--\nreturn val`,
    defaultInput: '10, 20, 30, 40',
    analogy: 'A stack of dinner plates in a cafeteria: you add plates to the top and remove plates from the top.',
    invariant: 'The top pointer always references the most recently inserted element.',
    commonMistake: 'Popping from an empty stack (top == -1) causing stack underflow.',
    interviewTip: 'All stack operations (push, pop, peek, isEmpty) run in strictly O(1) constant time.',
    advantages: 'O(1) constant time push/pop operations.',
    disadvantages: 'No O(1) random access to middle elements.',
    whenToUse: 'When implementing undo/redo functionality, expression evaluation, or recursion call stacks.',
    quizQuestion: {
      question: 'What is the time complexity of Push and Pop operations on a Stack?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
      correctIndex: 0,
      explanation: 'Push and Pop only interact with the top pointer index at the end of the stack, operating in strictly O(1) constant time.',
    },
    relatedProblems: [
      { title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy' },
      { title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public class ArrayStack {\n    private int[] stack = new int[100];\n    private int top = -1;\n    public void push(int x) { stack[++top] = x; }\n    public int pop() { return stack[top--]; }\n}`,
      cpp: `class ArrayStack {\n    int stack[100]; int top = -1;\npublic:\n    void push(int x) { stack[++top] = x; }\n    int pop() { return stack[top--]; }\n};`,
      python: `class Stack:\n    def __init__(self):\n        self.stack = []\n    def push(self, x):\n        self.stack.append(x)\n    def pop():\n        return self.stack.pop()`,
    },
    generateFrames: (inputStr) => {
      const nums = inputStr ? inputStr.split(/[,;\s]+/).map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n)) : [10, 20, 30, 40];
      const frames: IArrayAnimationFrame[] = [];
      const stack: { id: string; val: number; state: ElementState; address: string }[] = [];

      let ops = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: 'Initialize empty Stack. Top = -1. Capacity = 6.',
        array: [],
        pointers: [{ name: 'TOP=-1', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: 1, currentIndex: -1, currentValue: 'EMPTY', maxVal: 40, minVal: 10, action: 'Init empty stack' },
        storytelling: {
          goal: 'Demonstrate LIFO Stack operations.',
          currentState: 'Stack is empty (top = -1).',
          decision: 'Begin Push operations.',
          reason: 'LIFO order adds and removes elements strictly from top.',
          nextAction: `Push value ${nums[0]}.`,
          whyRationale: 'Top pointer tracks active element position.',
          variableWatch: { top: -1, capacity: 6, size: 0 },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: -1, currentValue: 'Empty' },
      });

      // PUSH operations
      nums.forEach((val, idx) => {
        ops++;
        stack.push({ id: `s-${idx}`, val, state: 'inserted', address: getSimulatedAddress(idx) });

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `PUSH(${val}): Incremented top = ${idx}. Pushed ${val} onto top of Stack with BOUNCE ANIMATION!`,
          array: stack.map((item, i) => ({ id: item.id, val: item.val, state: i === idx ? 'inserted' : 'default', address: item.address })),
          pointers: [{ name: 'TOP', index: idx }],
          memoryAddresses: buildMemoryData(stack, [{ name: 'TOP', index: idx }]),
          dryRunRow: { step: frames.length + 1, currentIndex: idx, currentValue: val, maxVal: 40, minVal: 10, action: `Push(${val})` },
          storytelling: {
            goal: `Push element ${val} onto stack.`,
            currentState: `Top updated to index ${idx} (${val}).`,
            decision: `Place ${val} at stack[top].`,
            reason: 'LIFO rule places new element above existing elements.',
            nextAction: idx < nums.length - 1 ? `Push next value.` : 'Start Pop operations.',
            whyRationale: 'Push operates in O(1) constant time.',
            variableWatch: { top: idx, topValue: val, size: stack.length },
          },
          metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: 0, swaps: 0, visitedCount: stack.length, currentIndex: idx, currentValue: val },
        });
      });

      // POP operations
      while (stack.length > 0) {
        ops++;
        const popped = stack.pop()!;
        const newTop = stack.length - 1;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 7,
          explanation: `POP(): Popped top element ${popped.val} from Stack (PURPLE GLOW). Top decremented to ${newTop}.`,
          array: stack.map((item, i) => ({ id: item.id, val: item.val, state: i === newTop ? 'max' : 'default', address: item.address })),
          pointers: newTop >= 0 ? [{ name: 'TOP', index: newTop }] : [{ name: 'TOP=-1', index: 0 }],
          memoryAddresses: buildMemoryData(stack, newTop >= 0 ? [{ name: 'TOP', index: newTop }] : []),
          dryRunRow: { step: frames.length + 1, currentIndex: newTop, currentValue: popped.val, maxVal: 40, minVal: 10, action: `Pop() -> ${popped.val}` },
          storytelling: {
            goal: 'Pop top element.',
            currentState: `Popped ${popped.val}. New top index = ${newTop}.`,
            decision: 'Decrement top pointer.',
            reason: 'LIFO rule removes the most recently pushed element.',
            nextAction: stack.length > 0 ? 'Continue pop.' : 'Stack empty.',
            whyRationale: 'Pop executes in O(1) constant time without shifting elements.',
            variableWatch: { poppedValue: popped.val, top: newTop, size: stack.length },
          },
          metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: 0, swaps: 0, visitedCount: stack.length, currentIndex: newTop, currentValue: popped.val },
        });
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 8,
        explanation: 'Stack Push & Pop Suite Completed Successfully! Stack returned to empty state.',
        array: [],
        pointers: [{ name: 'EMPTY', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: -1, currentValue: 'Empty', maxVal: 40, minVal: 10, action: 'Completed Successfully' },
        storytelling: {
          goal: 'Operations complete.',
          currentState: 'Stack is empty.',
          decision: 'Finish algorithm.',
          reason: 'All push and pop operations executed.',
          nextAction: 'Show summary.',
          whyRationale: 'LIFO behavior verified in O(1) time per operation.',
          variableWatch: { status: 'Complete', totalOps: ops },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: ops * 20 + 30, operations: ops, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 'Done', currentValue: 'Empty' },
      });

      return frames;
    },
  },

  // 2. QUEUE ENQUEUE & DEQUEUE (FIFO)
  {
    id: 'queue-enqueue-dequeue',
    name: 'Queue Operations (Enqueue & Dequeue FIFO)',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(N)',
    description: 'Demonstrates First-In, First-Out (FIFO) queue enqueue and dequeue operations with Front and Rear pointer tracking.',
    pseudoCode: `// Enqueue(val):\nif size == CAPACITY: return OVERFLOW\nrear = (rear + 1) % CAPACITY\nqueue[rear] = val\n\n// Dequeue():\nif size == 0: return UNDERFLOW\nval = queue[front]\nfront = (front + 1) % CAPACITY`,
    defaultInput: '10, 20, 30, 40',
    analogy: 'A ticket counter line: people enter at the rear of the line and exit from the front of the line.',
    invariant: 'The front pointer references the oldest inserted element, and rear references the newest.',
    commonMistake: 'Using non-circular array queue where front pointer drift leaves unused memory at the beginning of array.',
    interviewTip: 'Circular Queue uses modulo arithmetic (index % Capacity) to reuse freed space at the front.',
    advantages: 'O(1) constant time insertion at rear and removal at front.',
    disadvantages: 'Fixed capacity in array-based implementations.',
    whenToUse: 'When implementing task scheduling, printer queues, or BFS graph traversals.',
    quizQuestion: {
      question: 'What is the First-In, First-Out (FIFO) rule in a Queue?',
      options: [
        'The element inserted first is removed first',
        'The element inserted last is removed first',
        'Elements are removed at random',
        'Elements are sorted by value',
      ],
      correctIndex: 0,
      explanation: 'In a FIFO queue, elements exit in the exact sequential order they arrived (first-in, first-out).',
    },
    relatedProblems: [
      { title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks', difficulty: 'Easy' },
      { title: 'Design Circular Queue', slug: 'design-circular-queue', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public class ArrayQueue {\n    private int[] q = new int[100];\n    private int front = 0, rear = -1, size = 0;\n    public void enqueue(int x) { q[++rear] = x; size++; }\n    public int dequeue() { size--; return q[front++]; }\n}`,
      cpp: `class ArrayQueue {\n    int q[100]; int front = 0, rear = -1, size = 0;\npublic:\n    void enqueue(int x) { q[++rear] = x; size++; }\n    int dequeue() { size--; return q[front++]; }\n};`,
      python: `from collections import deque\nq = deque()\nq.append(10) # enqueue\nval = q.popleft() # dequeue`,
    },
    generateFrames: (inputStr) => {
      const nums = inputStr ? inputStr.split(/[,;\s]+/).map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n)) : [10, 20, 30, 40];
      const frames: IArrayAnimationFrame[] = [];
      const queue: { id: string; val: number; state: ElementState; address: string }[] = [];

      let ops = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: 'Initialize empty Queue. Front = 0, Rear = -1.',
        array: [],
        pointers: [{ name: 'FRONT=0', index: 0 }, { name: 'REAR=-1', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: 1, currentIndex: 0, currentValue: 'EMPTY', maxVal: 40, minVal: 10, action: 'Init empty queue' },
        storytelling: {
          goal: 'Demonstrate FIFO Queue operations.',
          currentState: 'Queue is empty.',
          decision: 'Begin Enqueue operations.',
          reason: 'FIFO rule inserts at Rear and removes from Front.',
          nextAction: `Enqueue value ${nums[0]}.`,
          whyRationale: 'Front tracks exit node; Rear tracks entry node.',
          variableWatch: { front: 0, rear: -1, size: 0 },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: 'Empty' },
      });

      // ENQUEUE
      nums.forEach((val, idx) => {
        ops++;
        queue.push({ id: `q-${idx}`, val, state: 'inserted', address: getSimulatedAddress(idx) });

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `ENQUEUE(${val}): Element ${val} slid into Rear of Queue (GREEN GLOW). Rear = ${idx}.`,
          array: queue.map((item, i) => ({ id: item.id, val: item.val, state: i === idx ? 'inserted' : 'default', address: item.address })),
          pointers: [
            { name: 'FRONT', index: 0 },
            { name: 'REAR', index: idx },
          ],
          memoryAddresses: buildMemoryData(queue, [{ name: 'FRONT', index: 0 }, { name: 'REAR', index: idx }]),
          dryRunRow: { step: frames.length + 1, currentIndex: idx, currentValue: val, maxVal: 40, minVal: 10, action: `Enqueue(${val})` },
          storytelling: {
            goal: `Enqueue ${val} at Rear of queue.`,
            currentState: `Front = index 0 (${queue[0].val}), Rear = index ${idx} (${val}).`,
            decision: `Insert ${val} at Rear.`,
            reason: 'FIFO places new arrivals at the back of the line.',
            nextAction: idx < nums.length - 1 ? 'Enqueue next element.' : 'Start Dequeue operations.',
            whyRationale: 'Enqueue operates in O(1) constant time.',
            variableWatch: { front: 0, rear: idx, size: queue.length },
          },
          metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: 0, swaps: 0, visitedCount: queue.length, currentIndex: idx, currentValue: val },
        });
      });

      // DEQUEUE
      let frontIdx = 0;
      while (queue.length > 0) {
        ops++;
        const dequeued = queue.shift()!;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 7,
          explanation: `DEQUEUE(): Front element ${dequeued.val} exited from Left (AMBER GLOW). Front advanced to index ${frontIdx + 1}.`,
          array: queue.map((item, i) => ({ id: item.id, val: item.val, state: i === 0 ? 'comparing' : 'default', address: item.address })),
          pointers: queue.length > 0 ? [
            { name: 'FRONT', index: 0 },
            { name: 'REAR', index: queue.length - 1 },
          ] : [{ name: 'EMPTY', index: 0 }],
          memoryAddresses: buildMemoryData(queue, queue.length > 0 ? [{ name: 'FRONT', index: 0 }] : []),
          dryRunRow: { step: frames.length + 1, currentIndex: frontIdx, currentValue: dequeued.val, maxVal: 40, minVal: 10, action: `Dequeue() -> ${dequeued.val}` },
          storytelling: {
            goal: 'Dequeue front element.',
            currentState: `Dequeued ${dequeued.val}. Queue size = ${queue.length}.`,
            decision: 'Advance Front pointer.',
            reason: 'FIFO removes the oldest element at the front.',
            nextAction: queue.length > 0 ? 'Continue dequeue.' : 'Queue empty.',
            whyRationale: 'Dequeue returns oldest arrival in O(1) time.',
            variableWatch: { dequeuedVal: dequeued.val, remainingSize: queue.length },
          },
          metrics: { elapsedTimeMs: ops * 20, operations: ops, comparisons: 0, swaps: 0, visitedCount: queue.length, currentIndex: frontIdx, currentValue: dequeued.val },
        });
        frontIdx++;
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 8,
        explanation: 'Queue Enqueue & Dequeue Suite Completed Successfully!',
        array: [],
        pointers: [{ name: 'EMPTY', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Empty', maxVal: 40, minVal: 10, action: 'Completed Successfully' },
        storytelling: {
          goal: 'Queue suite finished.',
          currentState: 'Queue is empty.',
          decision: 'Finish algorithm.',
          reason: 'All FIFO operations completed.',
          nextAction: 'Show summary.',
          whyRationale: 'FIFO queue behavior verified in O(1) time.',
          variableWatch: { status: 'Complete', totalOps: ops },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: ops * 20 + 30, operations: ops, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 'Done', currentValue: 'Empty' },
      });

      return frames;
    },
  },

  // 3. BALANCED PARENTHESES (STACK APPLICATION DEMO)
  {
    id: 'balanced-parentheses',
    name: 'Balanced Parentheses Checker (Stack Demo)',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Uses a Stack to verify if brackets in a string like "({[]})" are properly opened and closed in valid order.',
    pseudoCode: `for char in string:\n    if char in "({[":\n        stack.push(char)\n    else if char in ")}]":\n        if stack.isEmpty() or not match(stack.pop(), char):\n            return FALSE\nreturn stack.isEmpty()`,
    defaultInput: '({[]})',
    analogy: 'Nested boxes: you must open outer boxes first, and close inner boxes before closing outer boxes.',
    invariant: 'The stack holds all currently open unmatched brackets in LIFO order.',
    commonMistake: 'Failing to check stack.isEmpty() before popping closing bracket.',
    interviewTip: 'Balanced parentheses is a classic Stack problem testing LIFO matching of open/close symbols.',
    advantages: 'Single pass O(N) verification.',
    disadvantages: 'Requires extra stack space up to O(N).',
    whenToUse: 'Compiler syntax parsing, HTML/XML tag validation, and math expression evaluation.',
    quizQuestion: {
      question: 'Why is a Stack used for checking balanced parentheses?',
      options: [
        'Because the last opened bracket must be the first bracket closed (LIFO)',
        'Because queues process brackets in random order',
        'Because arrays sort brackets alphabetically',
        'Because binary search works on strings',
      ],
      correctIndex: 0,
      explanation: 'Bracket matching requires LIFO evaluation: the most recently opened bracket is always the first one that must be matched and closed.',
    },
    relatedProblems: [
      { title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy' },
      { title: 'Minimum Add to Make Parentheses Valid', slug: 'minimum-add-to-make-parentheses-valid', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public boolean isValid(String s) {\n    Stack<Character> st = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.isEmpty()) return false;\n            char top = st.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == '}' && top != '{') return false;\n            if (c == ']' && top != '[') return false;\n        }\n    }\n    return st.isEmpty();\n}`,
      cpp: `bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == '}' && top != '{') return false;\n            if (c == ']' && top != '[') return false;\n        }\n    }\n    return st.empty();\n}`,
      python: `def is_valid(s):\n    st = []\n    mp = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mp.values(): st.append(c)\n        elif c in mp:\n            if not st or st.pop() != mp[c]: return False\n    return len(st) == 0`,
    },
    generateFrames: (inputStr) => {
      const expr = inputStr && inputStr.trim() ? inputStr.trim() : '({[]})';
      const chars = expr.split('');
      const frames: IArrayAnimationFrame[] = [];
      const stack: { id: string; val: string; state: ElementState; address: string }[] = [];

      let comps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Parentheses Checker for String "${expr}". Stack is empty.`,
        array: chars.map((c, i) => ({ id: `ch-${i}`, val: c.charCodeAt(0), state: 'default' as ElementState })),
        pointers: [{ name: 'str', index: 0 }],
        memoryAddresses: [],
        dryRunRow: { step: 1, currentIndex: 0, currentValue: chars[0], maxVal: 'N/A', minVal: 'N/A', action: `Check string "${expr}"` },
        storytelling: {
          goal: `Verify if string "${expr}" has valid balanced parentheses.`,
          currentState: 'Stack empty. Index = 0.',
          decision: 'Scan characters one by one.',
          reason: 'Open brackets push to stack; closing brackets pop and match.',
          nextAction: `Inspect character 0 ('${chars[0]}').`,
          whyRationale: 'LIFO stack matches innermost brackets first.',
          variableWatch: { char: chars[0], stackSize: 0 },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: chars[0] },
      });

      for (let i = 0; i < chars.length; i++) {
        comps++;
        const ch = chars[i];
        const isOpen = ch === '(' || ch === '{' || ch === '[';

        if (isOpen) {
          stack.push({ id: `st-${stack.length}`, val: ch, state: 'inserted', address: getSimulatedAddress(stack.length) });

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 3,
            explanation: `Char '${ch}' is OPEN BRACKET -> PUSH onto Stack. Stack Top is now '${ch}'.`,
            array: chars.map((c, idx) => ({
              id: `ch-${idx}`,
              val: c.charCodeAt(0),
              state: (idx === i ? 'inserted' : idx < i ? 'visited' : 'default') as ElementState,
            })),
            pointers: [{ name: 'i', index: i }],
            memoryAddresses: [],
            dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: ch, maxVal: 'N/A', minVal: 'N/A', action: `Push('${ch}')` },
            storytelling: {
              goal: `Process open bracket '${ch}'.`,
              currentState: `Char '${ch}' pushed. Stack depth = ${stack.length}.`,
              decision: `Push '${ch}' to stack.`,
              reason: 'Open brackets wait for matching closing bracket.',
              nextAction: i < chars.length - 1 ? `Advance to index ${i + 1}.` : 'Scan complete.',
              whyRationale: 'Pushing preserves LIFO nested bracket hierarchy.',
              variableWatch: { currentChar: ch, stackTop: ch, stackDepth: stack.length },
            },
            metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: 0, visitedCount: i + 1, currentIndex: i, currentValue: ch },
          });
        } else {
          const popped = stack.length > 0 ? stack.pop()!.val : null;
          const matches = (ch === ')' && popped === '(') || (ch === '}' && popped === '{') || (ch === ']' && popped === '[');

          frames.push({
            frameIndex: frames.length,
            lineHighlight: 6,
            explanation: `Char '${ch}' is CLOSING BRACKET -> POP Top ('${popped}'). Match '${popped}' with '${ch}' -> ${matches ? 'VALID MATCH!' : 'MISMATCH ERROR!'}`,
            array: chars.map((c, idx) => ({
              id: `ch-${idx}`,
              val: c.charCodeAt(0),
              state: (idx === i ? (matches ? 'max' : 'deleted') : idx < i ? 'visited' : 'default') as ElementState,
              particleType: matches && idx === i ? ('gold' as const) : undefined,
            })),
            pointers: [{ name: 'i', index: i }],
            memoryAddresses: [],
            dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: ch, maxVal: 'N/A', minVal: 'N/A', action: `Match '${popped}' vs '${ch}'` },
            storytelling: {
              goal: `Process closing bracket '${ch}'.`,
              currentState: `Popped '${popped}', compared with '${ch}'.`,
              comparison: `'${popped}' matches '${ch}' -> ${matches}`,
              decision: matches ? 'Bracket pair matched successfully.' : 'Mismatched brackets; return invalid.',
              reason: matches ? 'Closing bracket matches the most recently opened bracket.' : 'Incompatible bracket pair.',
              nextAction: matches ? 'Continue scanning string.' : 'Abort with invalid result.',
              whyRationale: 'LIFO pops exact corresponding opening bracket.',
              variableWatch: { popped: popped || 'None', closingChar: ch, matches: String(matches) },
            },
            metrics: { elapsedTimeMs: comps * 20, operations: comps, comparisons: comps, swaps: 0, visitedCount: i + 1, currentIndex: i, currentValue: ch },
          });

          if (!matches) break;
        }
      }

      const isValid = stack.length === 0;
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 8,
        explanation: `Balanced Parentheses Check Finished! Result: STRING "${expr}" IS ${isValid ? 'FULLY VALID & BALANCED (GREEN)' : 'INVALID'}.`,
        array: chars.map((c, idx) => ({
          id: `ch-${idx}`,
          val: c.charCodeAt(0),
          state: (isValid ? 'visited' : 'deleted') as ElementState,
          particleType: isValid ? ('confetti' as const) : undefined,
        })),
        pointers: [{ name: isValid ? 'VALID' : 'INVALID', index: chars.length - 1 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: isValid ? 'Valid' : 'Invalid', maxVal: 'N/A', minVal: 'N/A', action: `Result: ${isValid}` },
        storytelling: {
          goal: 'Validation complete.',
          currentState: `Stack empty check: ${isValid}.`,
          decision: `Return ${isValid}.`,
          reason: isValid ? 'All brackets matched and closed properly.' : 'Unmatched brackets remain in stack.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Stack verified string in O(N) linear time.',
          variableWatch: { isValid: String(isValid), finalStackSize: stack.length },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: comps * 20 + 30, operations: comps, comparisons: comps, swaps: 0, visitedCount: chars.length, currentIndex: 'Done', currentValue: isValid ? 'Valid' : 'Invalid' },
      });

      return frames;
    },
  },
];
