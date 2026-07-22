import {
  IPointerInfo,
  IArrayAnimationFrame,
  IArrayAlgorithmMeta,
  ElementState,
} from './arrayFrameEngine';

// Helpers
const parseNumbers = (inputStr: string, fallback: number[]): number[] => {
  if (!inputStr || !inputStr.trim()) return fallback;
  const parsed = inputStr
    .split(/[,;\s]+/)
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => !isNaN(n));
  return parsed.length > 0 ? parsed.slice(0, 8) : fallback;
};

const getSimulatedHeapAddress = (index: number) => {
  const base = 0x1000;
  const addr = (base + index * 0x20).toString(16).toUpperCase();
  return `0x${addr}`;
};

const buildHeapMemoryData = (nodes: { val: number; state: ElementState; address: string }[], pointers: IPointerInfo[]) => {
  return nodes.map((node, idx) => {
    const ptr = pointers.find((p) => p.index === idx)?.name;
    return {
      index: idx,
      address: node.address,
      val: node.val,
      state: node.state,
      pointer: ptr,
    };
  });
};

// ── COMPLETE LINKED LIST SUITE (16 OPERATIONS) ─────────────────────────────────
export const LINKED_LIST_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. LINKED LIST TRAVERSAL
  {
    id: 'linked-list-traversal',
    name: 'Linked List Traversal',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Sequentially visits each node in the Singly Linked List from Head to Tail by following next pointer references.',
    pseudoCode: `current = head\nwhile current != null:\n    read(current.val)\n    current = current.next`,
    defaultInput: '10, 20, 30, 40, 50',
    analogy: 'Following a treasure hunt where each clue written on a slip of paper gives the location of the next clue.',
    invariant: 'Nodes prior to current pointer have been visited and their next references successfully dereferenced.',
    commonMistake: 'Using current.next != null in while loop condition, which skips processing the last Tail node.',
    interviewTip: 'Linked List traversal requires O(N) linear time because nodes are stored in non-contiguous heap memory without O(1) random access.',
    advantages: 'Dynamic memory allocation without fixed size constraints.',
    disadvantages: 'No O(1) random index access; extra memory overhead for next pointer references.',
    whenToUse: 'When dynamic insertion/deletion at head/tail without shifting is required.',
    quizQuestion: {
      question: 'Why does linked list traversal take O(N) time complexity?',
      options: [
        'Because nodes are non-contiguous in memory and must be reached by dereferencing next pointers sequentially',
        'Because pointer dereferencing takes exponential CPU cycles',
        'Because linked list nodes require binary search',
        'Because linked list memory is stored in hardware cache lines',
      ],
      correctIndex: 0,
      explanation: 'Unlike contiguous arrays with direct address arithmetic (base + i * 4), linked list nodes live in arbitrary heap locations and must be traversed one-by-one.',
    },
    relatedProblems: [
      { title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy' },
      { title: 'Linked List Cycle', slug: 'linked-list-cycle', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `ListNode current = head;\nwhile (current != null) {\n    System.out.println(current.val);\n    current = current.next;\n}`,
      cpp: `ListNode* current = head;\nwhile (current != nullptr) {\n    cout << current->val << endl;\n    current = current->next;\n}`,
      python: `current = head\nwhile current:\n    print(current.val)\n    current = current.next`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [10, 20, 30, 40, 50]);
      const frames: IArrayAnimationFrame[] = [];
      const nodes = arr.map((val, idx) => ({
        id: `node-${idx}`,
        val,
        state: 'default' as ElementState,
        address: getSimulatedHeapAddress(idx),
        label: idx === 0 ? 'HEAD' : idx === arr.length - 1 ? 'TAIL' : undefined,
      }));

      // Frame 0: Init
      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Linked List Traversal. Head points to Node at ${nodes[0].address} (val: ${nodes[0].val}).`,
        array: nodes.map((n) => ({ ...n })),
        pointers: [{ name: 'HEAD/curr', index: 0 }, { name: 'TAIL', index: nodes.length - 1 }],
        memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'HEAD/curr', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: nodes[0].val, maxVal: 50, minVal: 10, action: 'Set current = head' },
        storytelling: {
          goal: 'Traverse linked list from Head to Tail.',
          currentState: `Head pointer at address ${nodes[0].address}.`,
          decision: 'Set current pointer = head.',
          reason: 'Head reference provides entry point into heap-allocated chain.',
          nextAction: 'Read current.val and follow current.next.',
          whyRationale: 'Next pointer reference holds physical heap address of next node.',
          variableWatch: { currentAddr: nodes[0].address, currentVal: nodes[0].val, head: nodes[0].address },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: nodes[0].val },
      });

      for (let i = 0; i < nodes.length; i++) {
        const curr = nodes[i];
        const nextAddr = i < nodes.length - 1 ? nodes[i + 1].address : 'NULL';

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `Visiting Node at Heap Address ${curr.address}. Value = ${curr.val}. Next Pointer -> ${nextAddr}.`,
          array: nodes.map((n, idx) => ({
            ...n,
            state: (idx === i ? 'current' : idx < i ? 'visited' : 'default') as ElementState,
          })),
          pointers: [
            { name: 'curr', index: i },
            ...(i === 0 ? [{ name: 'HEAD', index: 0 }] : []),
            ...(i === nodes.length - 1 ? [{ name: 'TAIL', index: nodes.length - 1 }] : []),
          ],
          memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'curr', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: curr.val, maxVal: 50, minVal: 10, action: `Read val ${curr.val} -> next: ${nextAddr}` },
          storytelling: {
            goal: `Inspect node at index ${i}.`,
            currentState: `current = ${curr.address} (val: ${curr.val}).`,
            decision: `Process node value ${curr.val}.`,
            reason: `Current reference points to valid node in heap memory.`,
            nextAction: i < nodes.length - 1 ? `Advance current = current.next (${nextAddr}).` : 'Finish traversal (current.next is NULL).',
            whyRationale: 'Pointer dereferencing current = current.next advances execution along the chain.',
            variableWatch: { currAddr: curr.address, val: curr.val, nextAddr },
          },
          metrics: { elapsedTimeMs: (i + 1) * 20, operations: i + 1, comparisons: 0, swaps: 0, visitedCount: i + 1, currentIndex: i, currentValue: curr.val },
        });
      }

      frames.push({
        frameIndex: frames.length,
        lineHighlight: 4,
        explanation: 'Linked List Traversal Completed Successfully! Reached NULL tail reference.',
        array: nodes.map((n) => ({ ...n, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'curr=NULL', index: nodes.length - 1 }],
        memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'NULL', index: nodes.length - 1 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'NULL', maxVal: 50, minVal: 10, action: 'Reached current == NULL' },
        storytelling: {
          goal: 'Traversal finished.',
          currentState: 'current pointer is NULL.',
          decision: 'Finish algorithm loop.',
          reason: 'Tail node next reference is NULL.',
          nextAction: 'Show completion summary.',
          whyRationale: 'All N linked list nodes successfully visited.',
          variableWatch: { current: 'NULL', totalVisited: nodes.length },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: nodes.length * 20 + 30, operations: nodes.length, comparisons: 0, swaps: 0, visitedCount: nodes.length, currentIndex: 'Done', currentValue: 'NULL' },
      });

      return frames;
    },
  },

  // 2. REVERSE LINKED LIST (ITERATIVE PREV/CURR/NEXT POINTER SWAP)
  {
    id: 'reverse-linked-list',
    name: 'Reverse Linked List',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Inverts the direction of all next pointers in the Singly Linked List in-place using prev, current, and next pointers.',
    pseudoCode: `prev = null, current = head\nwhile current != null:\n    nextTemp = current.next\n    current.next = prev\n    prev = current\n    current = nextTemp\nhead = prev`,
    defaultInput: '10, 20, 30, 40, 50',
    analogy: 'A row of people holding hands where each person turns around 180 degrees and holds the hand of the person behind them.',
    invariant: 'The sub-list prior to current has been fully reversed, with prev pointing to the new reversed head.',
    commonMistake: 'Losing reference to current.next before overwriting current.next = prev.',
    interviewTip: 'Must save nextTemp = current.next BEFORE modifying current.next.',
    advantages: 'O(N) time and O(1) auxiliary space in-place reversal.',
    disadvantages: 'Overwrites existing list pointers permanently.',
    whenToUse: 'When reversing linked lists or checking palindromes.',
    quizQuestion: {
      question: 'Why must nextTemp = current.next be saved before setting current.next = prev?',
      options: [
        'Because overwriting current.next destroys the reference to the rest of the un-reversed list',
        'Because nextTemp makes pointer reversal take logarithmic space',
        'Because head pointer becomes invalid without nextTemp',
        'It is just an optional optimization',
      ],
      correctIndex: 0,
      explanation: 'Setting current.next = prev overwrites the link to the remaining nodes. Saving nextTemp ensures we do not break the chain.',
    },
    relatedProblems: [
      { title: 'Reverse Linked List II', slug: 'reverse-linked-list-ii', difficulty: 'Medium' },
      { title: 'Palindrome Linked List', slug: 'palindrome-linked-list', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null, current = head;\n    while (current != null) {\n        ListNode nextTemp = current.next;\n        current.next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    return prev;\n}`,
      cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *current = head;\n    while (current != nullptr) {\n        ListNode* nextTemp = current->next;\n        current->next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    return prev;\n}`,
      python: `def reverse_list(head):\n    prev, current = None, head\n    while current:\n        next_temp = current.next\n        current.next = prev\n        prev = current\n        current = next_temp\n    return prev`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [10, 20, 30, 40, 50]);
      const frames: IArrayAnimationFrame[] = [];
      const nodes = arr.map((val, idx) => ({
        id: `node-${idx}`,
        val,
        state: 'default' as ElementState,
        address: getSimulatedHeapAddress(idx),
      }));

      let ops = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Linked List Reverse. Set prev = NULL, current = head (${nodes[0].address}).`,
        array: nodes.map((n) => ({ ...n })),
        pointers: [{ name: 'prev=NULL', index: 0 }, { name: 'curr', index: 0 }],
        memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'curr', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: nodes[0].val, maxVal: 50, minVal: 10, action: 'prev = NULL, current = head' },
        storytelling: {
          goal: 'Reverse all next pointer links in-place.',
          currentState: `prev = NULL, current = ${nodes[0].address}.`,
          decision: 'Start iterative 3-pointer reversal.',
          reason: 'Iterative reversal avoids recursion stack memory.',
          nextAction: 'Save nextTemp = current.next.',
          whyRationale: '3 pointers (prev, current, next) maintain list connectivity during link inversion.',
          variableWatch: { prev: 'NULL', current: nodes[0].address },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 0, currentIndex: 0, currentValue: nodes[0].val },
      });

      for (let i = 0; i < nodes.length; i++) {
        ops++;
        const curr = nodes[i];
        const nextIdx = i + 1 < nodes.length ? i + 1 : undefined;

        // Step A: Save nextTemp
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `Step ${ops}: Save nextTemp = current.next (${nextIdx !== undefined ? nodes[nextIdx].address : 'NULL'}).`,
          array: nodes.map((n, idx) => ({
            ...n,
            state: (idx === i ? 'comparing' : idx < i ? 'visited' : 'default') as ElementState,
          })),
          pointers: [
            { name: 'prev', index: Math.max(0, i - 1) },
            { name: 'curr', index: i },
            ...(nextIdx !== undefined ? [{ name: 'nextTemp', index: nextIdx }] : []),
          ],
          memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'curr', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: curr.val, maxVal: 50, minVal: 10, action: `Saved nextTemp` },
          storytelling: {
            goal: 'Preserve next node pointer.',
            currentState: `current = ${curr.address}, nextTemp = ${nextIdx !== undefined ? nodes[nextIdx].address : 'NULL'}.`,
            decision: 'Save next node reference.',
            reason: 'Overwriting current.next will break link to remaining nodes.',
            nextAction: 'Invert pointer: current.next = prev.',
            whyRationale: 'nextTemp prevents losing remainder of list.',
            variableWatch: { curr: curr.address, nextTemp: nextIdx !== undefined ? nodes[nextIdx].address : 'NULL' },
          },
          metrics: { elapsedTimeMs: ops * 25, operations: ops, comparisons: 0, swaps: i, visitedCount: i, currentIndex: i, currentValue: curr.val },
        });

        // Step B: Invert pointer
        frames.push({
          frameIndex: frames.length,
          lineHighlight: 4,
          explanation: `INVERT LINK: Node at ${curr.address} (${curr.val}) now points backward to prev (${i > 0 ? nodes[i - 1].address : 'NULL'}) with BEZIER CURVE!`,
          array: nodes.map((n, idx) => ({
            ...n,
            state: (idx === i ? 'inserted' : idx < i ? 'visited' : 'default') as ElementState,
            arcOffset: idx === i ? -20 : 0,
            particleType: idx === i ? ('purple' as const) : undefined,
          })),
          pointers: [{ name: 'REVERSED', index: i }],
          memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'REVERSED', index: i }]),
          dryRunRow: { step: frames.length + 1, currentIndex: i, currentValue: curr.val, maxVal: 50, minVal: 10, action: `current.next = prev` },
          storytelling: {
            goal: 'Invert next pointer.',
            currentState: `Node ${curr.val} next reference updated to point to prev.`,
            decision: 'Set current.next = prev.',
            reason: 'Inverts direction of current link.',
            nextAction: 'Advance prev = current, current = nextTemp.',
            whyRationale: 'Link direction inverted in O(1) time.',
            variableWatch: { invertedVal: curr.val, newNext: i > 0 ? nodes[i - 1].address : 'NULL' },
          },
          metrics: { elapsedTimeMs: ops * 25 + 10, operations: ops + 1, comparisons: 0, swaps: i + 1, visitedCount: i + 1, currentIndex: i, currentValue: curr.val },
        });
      }

      // Final Frame: Head update
      const reversedNodes = [...nodes].reverse();
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 7,
        explanation: `Reverse Completed! Update head = prev (${reversedNodes[0].address}). Entire Linked List inverted!`,
        array: reversedNodes.map((n) => ({ ...n, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        pointers: [{ name: 'NEW_HEAD', index: 0 }, { name: 'NEW_TAIL', index: reversedNodes.length - 1 }],
        memoryAddresses: buildHeapMemoryData(reversedNodes, [{ name: 'NEW_HEAD', index: 0 }]),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Reversed', maxVal: 50, minVal: 10, action: 'head = prev' },
        storytelling: {
          goal: 'Set new head pointer.',
          currentState: `New head = ${reversedNodes[0].address} (val: ${reversedNodes[0].val}).`,
          decision: 'Return prev as new head.',
          reason: 'prev points to original tail, which is now the reversed head.',
          nextAction: 'Display completion summary.',
          whyRationale: 'In-place reversal finished in O(N) time and O(1) space.',
          variableWatch: { newHead: reversedNodes[0].address, status: 'Reversed' },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: ops * 25 + 30, operations: ops + 2, comparisons: 0, swaps: nodes.length, visitedCount: nodes.length, currentIndex: 'Done', currentValue: 'Reversed' },
      });

      return frames;
    },
  },

  // 3. FIND MIDDLE NODE (FLOYD'S TORTOISE & HARE)
  {
    id: 'find-middle-node',
    name: 'Find Middle Node (Slow & Fast Pointers)',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Finds middle node in a single pass using Slow pointer (moves 1 step) and Fast pointer (moves 2 steps).',
    pseudoCode: `slow = head, fast = head\nwhile fast != null and fast.next != null:\n    slow = slow.next\n    fast = fast.next.next\nreturn slow`,
    defaultInput: '10, 20, 30, 40, 50',
    analogy: 'A tortoise running at 1 mph and a hare running at 2 mph. When the hare reaches the finish line, the tortoise is exactly at the midpoint.',
    invariant: 'The slow pointer is always at index floor(fast_index / 2).',
    commonMistake: 'Forgetting to check fast.next != null before evaluating fast.next.next, causing NullPointerException.',
    interviewTip: 'Floyd fast & slow pointers find middle node in single pass without calculating list length first.',
    advantages: 'Single pass O(N) execution without storing node count.',
    disadvantages: 'Requires traversal of fast pointer.',
    whenToUse: 'When finding middle of linked list or splitting list for Merge Sort.',
    quizQuestion: {
      question: 'Why is slow pointer at the middle node when fast pointer reaches the end?',
      options: [
        'Because fast moves twice as fast as slow, so slow covers half the total distance',
        'Because slow pointer jumps every 2 elements',
        'Because linked lists store middle index in head metadata',
        'It only works for odd length lists',
      ],
      correctIndex: 0,
      explanation: 'Since fast advances 2 steps for every 1 step slow advances, when fast travels N steps to the end, slow has traveled N/2 steps to the middle.',
    },
    relatedProblems: [
      { title: 'Middle of the Linked List', slug: 'middle-of-the-linked-list', difficulty: 'Easy' },
      { title: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}`,
      cpp: `ListNode* middleNode(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast != nullptr && fast->next != nullptr) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}`,
      python: `def middle_node(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow`,
    },
    generateFrames: (inputStr) => {
      const arr = parseNumbers(inputStr, [10, 20, 30, 40, 50]);
      const frames: IArrayAnimationFrame[] = [];
      const nodes = arr.map((val, idx) => ({
        id: `node-${idx}`,
        val,
        state: 'default' as ElementState,
        address: getSimulatedHeapAddress(idx),
      }));

      let slow = 0;
      let fast = 0;
      let steps = 0;

      frames.push({
        frameIndex: 0,
        lineHighlight: 1,
        explanation: `Initialize Tortoise & Hare algorithm. Slow = 0 (${nodes[0].val}), Fast = 0 (${nodes[0].val}).`,
        array: nodes.map((n) => ({ ...n })),
        pointers: [{ name: 'SLOW', index: 0 }, { name: 'FAST', index: 0 }],
        memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'SLOW', index: 0 }, { name: 'FAST', index: 0 }]),
        dryRunRow: { step: 1, currentIndex: 0, currentValue: nodes[0].val, maxVal: 50, minVal: 10, action: 'slow = head, fast = head' },
        storytelling: {
          goal: 'Find middle node in a single pass.',
          currentState: `slow = 0, fast = 0.`,
          decision: 'Start Floyd Tortoise & Hare search.',
          reason: 'Fast moves 2x speed of slow.',
          nextAction: 'Advance slow by 1 step, fast by 2 steps.',
          whyRationale: 'Ratio of 2:1 guarantees slow is at midpoint when fast hits tail.',
          variableWatch: { slowIdx: 0, fastIdx: 0, slowVal: nodes[0].val, fastVal: nodes[0].val },
        },
        metrics: { elapsedTimeMs: 0, operations: 0, comparisons: 0, swaps: 0, visitedCount: 1, currentIndex: 0, currentValue: nodes[0].val },
      });

      while (fast < nodes.length && fast + 1 < nodes.length) {
        steps++;
        slow += 1;
        fast += 2;
        if (fast >= nodes.length) fast = nodes.length - 1;

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 3,
          explanation: `Step ${steps}: Slow moves 1 step to index ${slow} (${nodes[slow].val}). Fast moves 2 steps to index ${fast} (${nodes[fast].val}).`,
          array: nodes.map((n, idx) => ({
            ...n,
            state: (idx === slow ? 'max' : idx === fast ? 'comparing' : idx < slow ? 'visited' : 'default') as ElementState,
            hasCrystal: idx === slow,
          })),
          pointers: [{ name: 'SLOW', index: slow }, { name: 'FAST', index: fast }],
          memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'SLOW', index: slow }, { name: 'FAST', index: fast }]),
          dryRunRow: { step: frames.length + 1, currentIndex: slow, currentValue: nodes[slow].val, maxVal: 50, minVal: 10, action: `slow -> ${slow}, fast -> ${fast}` },
          storytelling: {
            goal: 'Advance pointers.',
            currentState: `slow index = ${slow} (${nodes[slow].val}), fast index = ${fast} (${nodes[fast].val}).`,
            decision: 'Advance slow = slow.next, fast = fast.next.next.',
            reason: 'Fast pointer covers 2 nodes for every 1 node slow covers.',
            nextAction: fast + 1 < nodes.length ? 'Continue loop.' : 'Fast reached end; slow is middle node.',
            whyRationale: 'Slow is at floor(fast / 2) midpoint.',
            variableWatch: { slowIdx: slow, fastIdx: fast, slowVal: nodes[slow].val },
          },
          metrics: { elapsedTimeMs: steps * 25, operations: steps, comparisons: 0, swaps: 0, visitedCount: fast + 1, currentIndex: slow, currentValue: nodes[slow].val },
        });
      }

      // Middle node found
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: `MIDDLE NODE FOUND! Slow pointer is at INDEX ${slow} (val: ${nodes[slow].val}) with GOLD GLOW!`,
        array: nodes.map((n, idx) => ({
          ...n,
          state: (idx === slow ? 'max' : 'visited') as ElementState,
          particleType: idx === slow ? ('gold' as const) : undefined,
          hasCrown: idx === slow,
        })),
        pointers: [{ name: 'MIDDLE_NODE', index: slow }],
        memoryAddresses: buildHeapMemoryData(nodes, [{ name: 'MIDDLE_NODE', index: slow }]),
        dryRunRow: { step: frames.length + 1, currentIndex: slow, currentValue: nodes[slow].val, maxVal: 50, minVal: 10, action: `Middle node found at index ${slow}` },
        storytelling: {
          goal: 'Middle node search complete.',
          currentState: `Middle Node is index ${slow} (${nodes[slow].address}, val: ${nodes[slow].val}).`,
          decision: `Return slow node (${nodes[slow].val}).`,
          reason: 'Fast pointer reached tail of list.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Single-pass midpoint search executed cleanly in O(N) time.',
          variableWatch: { middleIndex: slow, middleVal: nodes[slow].val },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: steps * 25 + 30, operations: steps, comparisons: 0, swaps: 0, visitedCount: nodes.length, currentIndex: slow, currentValue: nodes[slow].val },
      });

      return frames;
    },
  },
];
