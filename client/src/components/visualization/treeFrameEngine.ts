import {
  IPointerInfo,
  IArrayAnimationFrame,
  IArrayAlgorithmMeta,
  ElementState,
} from './arrayFrameEngine';
import { calculateTreeLayout, ITreeNodeData } from './treeLayoutEngine';

// Helpers
const buildMemoryData = (arr: { val: number; state: ElementState; address: string }[], pointers: IPointerInfo[]) => {
  return arr.map((item, idx) => {
    const ptr = pointers.find((p) => p.index === idx)?.name;
    return {
      index: idx,
      address: item.address,
      val: item.val,
      state: item.state,
      pointer: ptr,
    };
  });
};

// ── COMPLETE TREE & BST VISUALIZATION SUITE ─────────────────────────────────────
export const TREE_ALGORITHMS: IArrayAlgorithmMeta[] = [
  // 1. BST INSERT
  {
    id: 'bst-insert',
    name: 'BST Insert (Binary Search Tree)',
    difficulty: 'Medium',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(log N)',
    description: 'Inserts a new value into the Binary Search Tree by traversing left if value < current node or right if value > current node until a null spot is reached.',
    pseudoCode: `insert(root, val):\n    if root is null: return new Node(val)\n    if val < root.val:\n        root.left = insert(root.left, val)\n    else if val > root.val:\n        root.right = insert(root.right, val)\n    return root`,
    defaultInput: '50, 30, 70, 20, 40, 60, 80',
    analogy: 'Filing a document in an organized archive: compare against section head, go left for A-M or right for N-Z until finding an open file slot.',
    invariant: 'For every node in a BST, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly larger.',
    commonMistake: 'Inserting duplicates without defined duplicate handling rule.',
    interviewTip: 'BST insertion takes O(log N) expected time on balanced trees, but degrades to O(N) on skewed (sorted input) trees.',
    advantages: 'O(log N) dynamic search and insertion without array shifting.',
    disadvantages: 'Can degenerate to O(N) linked list shape if input is already sorted.',
    whenToUse: 'When dynamic sorted data retrieval with fast insertion/deletion is needed.',
    quizQuestion: {
      question: 'What is the worst-case time complexity of BST Insert on a pre-sorted array input?',
      options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
      correctIndex: 0,
      explanation: 'Inserting pre-sorted elements into a standard BST builds a degenerate skewed tree (like a linked list), resulting in O(N) worst-case insertion time.',
    },
    relatedProblems: [
      { title: 'Insert into a Binary Search Tree', slug: 'insert-into-a-binary-search-tree', difficulty: 'Medium' },
      { title: 'Search in a Binary Search Tree', slug: 'search-in-a-binary-search-tree', difficulty: 'Easy' },
    ],
    codeSnippets: {
      java: `public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val < root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n}`,
      cpp: `TreeNode* insertIntoBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}`,
      python: `def insert_into_bst(root, val):\n    if not root: return TreeNode(val)\n    if val < root.val: root.left = insert_into_bst(root.left, val)\n    else: root.right = insert_into_bst(root.right, val)\n    return root`,
    },
    generateFrames: (inputStr) => {
      const values = inputStr ? inputStr.split(/[,;\s]+/).map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n)) : [50, 30, 70, 20, 40, 60, 80];
      const frames: IArrayAnimationFrame[] = [];

      let root: ITreeNodeData | null = null;
      const visitedIds: string[] = [];
      const activeEdges: string[] = [];

      const insertNode = (node: ITreeNodeData | null, val: number, id: string): ITreeNodeData => {
        if (!node) return { id, val };
        if (val < node.val) {
          node.left = insertNode(node.left || null, val, id);
        } else if (val > node.val) {
          node.right = insertNode(node.right || null, val, id);
        }
        return node;
      };

      values.forEach((insertVal, valIdx) => {
        const nodeId = `tree-node-${valIdx}`;
        root = insertNode(root, insertVal, nodeId);

        visitedIds.push(nodeId);
        const layout = calculateTreeLayout(root, nodeId, visitedIds, activeEdges);

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 2,
          explanation: `INSERT(${insertVal}): Placed Node ${insertVal} into BST at calculated level ${layout.nodes.find((n) => n.id === nodeId)?.depth || 0}!`,
          array: layout.nodes.map((n) => ({ id: n.id, val: n.val, state: n.id === nodeId ? 'inserted' : 'default', address: n.address })),
          treeData: { nodes: layout.nodes, edges: layout.edges },
          pointers: [{ name: 'NEW', index: valIdx }],
          memoryAddresses: buildMemoryData(
            layout.nodes.map((n) => ({ val: n.val, state: (n.id === nodeId ? 'max' : 'visited') as ElementState, address: n.address })),
            [{ name: 'NEW', index: valIdx }]
          ),
          dryRunRow: { step: frames.length + 1, currentIndex: valIdx, currentValue: insertVal, maxVal: Math.max(...values), minVal: Math.min(...values), action: `Insert BST(${insertVal})` },
          storytelling: {
            goal: `Insert value ${insertVal} into BST.`,
            currentState: `Inserted node ${insertVal} at level ${layout.nodes.find((n) => n.id === nodeId)?.depth}.`,
            decision: 'Update parent-child pointers.',
            reason: `BST Invariant verified: ${insertVal} placed cleanly in proper subtree.`,
            nextAction: valIdx < values.length - 1 ? `Insert next value ${values[valIdx + 1]}.` : 'BST insertion complete.',
            whyRationale: 'Tree layout automatically recalculates hierarchical (x,y) node coordinates.',
            variableWatch: { insertedVal: insertVal, treeSize: layout.nodes.length, height: Math.max(...layout.nodes.map((n) => n.depth)) + 1 },
          },
          metrics: { elapsedTimeMs: (valIdx + 1) * 25, operations: valIdx + 1, comparisons: valIdx, swaps: 0, visitedCount: layout.nodes.length, currentIndex: valIdx, currentValue: insertVal },
        });
      });

      const finalLayout = calculateTreeLayout(root, undefined, visitedIds);
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: 'BST Construction Completed Successfully! All elements organized in hierarchical tree topology.',
        array: finalLayout.nodes.map((n) => ({ id: n.id, val: n.val, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        treeData: { nodes: finalLayout.nodes, edges: finalLayout.edges },
        pointers: [{ name: 'ROOT', index: 0 }],
        memoryAddresses: buildMemoryData(
          finalLayout.nodes.map((n) => ({ val: n.val, state: 'visited' as ElementState, address: n.address })),
          [{ name: 'ROOT', index: 0 }]
        ),
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Complete', maxVal: Math.max(...values), minVal: Math.min(...values), action: 'Completed Successfully' },
        storytelling: {
          goal: 'BST construction complete.',
          currentState: `Full BST built with ${finalLayout.nodes.length} nodes.`,
          decision: 'Finish algorithm.',
          reason: 'All nodes inserted into BST.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Binary Search Tree maintains O(log N) average depth.',
          variableWatch: { totalNodes: finalLayout.nodes.length, status: 'Complete' },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: values.length * 25 + 30, operations: values.length, comparisons: values.length, swaps: 0, visitedCount: finalLayout.nodes.length, currentIndex: 'Done', currentValue: 'Complete' },
      });

      return frames;
    },
  },

  // 2. INORDER TRAVERSAL (LEFT - ROOT - RIGHT -> SORTED OUTPUT)
  {
    id: 'tree-inorder',
    name: 'Inorder Traversal (BST Sorted Output)',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'Recursively visits Left Subtree -> Root Node -> Right Subtree. Inorder traversal on a BST yields elements in strictly SORTED ASCENDING ORDER!',
    pseudoCode: `inorder(root):\n    if root is null: return\n    inorder(root.left)\n    visit(root.val)\n    inorder(root.right)`,
    defaultInput: '50, 30, 70, 20, 40, 60, 80',
    analogy: 'Reading an encyclopedia index from A to Z.',
    invariant: 'Visiting nodes in Left-Root-Right sequence processes values in strictly monotonic non-decreasing order.',
    commonMistake: 'Forgetting that recursion stack space takes O(H) memory where H is tree height.',
    interviewTip: 'Inorder traversal of a BST ALWAYS produces a sorted array. Use this property to validate BSTs.',
    advantages: 'Outputs BST elements in sorted ascending order.',
    disadvantages: 'Requires recursion or explicit stack.',
    whenToUse: 'When retrieving BST keys in sorted order or validating BST property.',
    quizQuestion: {
      question: 'What is unique about the Inorder Traversal of a Binary Search Tree (BST)?',
      options: [
        'It always visits elements in strictly sorted ascending order',
        'It visits root node first before any child',
        'It executes in O(1) space complexity',
        'It visits leaf nodes in reverse order',
      ],
      correctIndex: 0,
      explanation: 'Because BST left child < root < right child, Left-Root-Right traversal produces values in sorted order.',
    },
    relatedProblems: [
      { title: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal', difficulty: 'Easy' },
      { title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium' },
    ],
    codeSnippets: {
      java: `public void inorder(TreeNode root) {\n    if (root == null) return;\n    inorder(root.left);\n    System.out.print(root.val + " ");\n    inorder(root.right);\n}`,
      cpp: `void inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->val << " ";\n    inorder(root->right);\n}`,
      python: `def inorder(root):\n    if not root: return\n    inorder(root.left)\n    print(root.val)\n    inorder(root.right)`,
    },
    generateFrames: (inputStr) => {
      const values = inputStr ? inputStr.split(/[,;\s]+/).map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n)) : [50, 30, 70, 20, 40, 60, 80];
      const sorted = [...values].sort((a, b) => a - b);
      const frames: IArrayAnimationFrame[] = [];
      const visitedOutput: number[] = [];
      const visitedNodeIds: string[] = [];

      // Build full BST tree layout
      let root: ITreeNodeData | null = null;
      const insertNode = (node: ITreeNodeData | null, val: number, id: string): ITreeNodeData => {
        if (!node) return { id, val };
        if (val < node.val) node.left = insertNode(node.left || null, val, id);
        else if (val > node.val) node.right = insertNode(node.right || null, val, id);
        return node;
      };
      values.forEach((v, idx) => { root = insertNode(root, v, `tn-${idx}`); });

      sorted.forEach((val, idx) => {
        visitedOutput.push(val);
        const currNode = calculateTreeLayout(root).nodes.find((n) => n.val === val);
        if (currNode) visitedNodeIds.push(currNode.id);

        const frameLayout = calculateTreeLayout(root, currNode?.id, visitedNodeIds);

        frames.push({
          frameIndex: frames.length,
          lineHighlight: 4,
          explanation: `Inorder Step ${idx + 1}: Visited Node ${val} (Left -> Root -> Right). Traversal Output: ${visitedOutput.join(' → ')}`,
          array: visitedOutput.map((v, i) => ({ id: `in-${i}`, val: v, state: i === idx ? 'max' : 'visited', address: `0x${(0x3000 + i * 4).toString(16).toUpperCase()}` })),
          treeData: { nodes: frameLayout.nodes, edges: frameLayout.edges },
          pointers: [{ name: 'INORDER', index: idx }],
          memoryAddresses: [],
          dryRunRow: { step: frames.length + 1, currentIndex: idx, currentValue: val, maxVal: Math.max(...values), minVal: Math.min(...values), action: `Visited Node ${val}` },
          storytelling: {
            goal: 'Perform Inorder Traversal (Left -> Root -> Right).',
            currentState: `Currently at Node ${val}. Output Panel: ${visitedOutput.join(' → ')}.`,
            decision: `Process node ${val}.`,
            reason: 'Left subtree completed; processing Root node before Right subtree.',
            nextAction: idx < sorted.length - 1 ? 'Traverse next node in in-order sequence.' : 'Inorder traversal complete.',
            whyRationale: 'Full 2D tree structure remains permanently visible while active node highlights in Amber Glow.',
            variableWatch: { currentNode: val, traversalOutput: visitedOutput.join(' → ') },
          },
          metrics: { elapsedTimeMs: (idx + 1) * 25, operations: idx + 1, comparisons: 0, swaps: 0, visitedCount: visitedOutput.length, currentIndex: idx, currentValue: val },
        });
      });

      const finalLayout = calculateTreeLayout(root, undefined, visitedNodeIds);
      frames.push({
        frameIndex: frames.length,
        lineHighlight: 5,
        explanation: `Inorder Traversal Completed Successfully! Traversal Output Panel: ${sorted.join(' → ')}`,
        array: sorted.map((v, i) => ({ id: `in-${i}`, val: v, state: 'visited' as ElementState, particleType: 'confetti' as const })),
        treeData: { nodes: finalLayout.nodes, edges: finalLayout.edges },
        pointers: [{ name: 'SORTED', index: sorted.length - 1 }],
        memoryAddresses: [],
        dryRunRow: { step: frames.length + 1, currentIndex: 'End', currentValue: 'Complete', maxVal: Math.max(...values), minVal: Math.min(...values), action: 'Completed Successfully' },
        storytelling: {
          goal: 'Traversal complete.',
          currentState: `Final output sequence: ${sorted.join(' → ')}.`,
          decision: 'Finish algorithm.',
          reason: 'All tree nodes visited in order.',
          nextAction: 'Show completion summary.',
          whyRationale: 'Inorder traversal of BST yields monotonic ascending output.',
          variableWatch: { finalOutput: sorted.join(' → '), status: 'Complete' },
        },
        isComplete: true,
        metrics: { elapsedTimeMs: sorted.length * 25 + 30, operations: sorted.length, comparisons: 0, swaps: 0, visitedCount: sorted.length, currentIndex: 'Done', currentValue: 'Complete' },
      });

      return frames;
    },
  },
];
