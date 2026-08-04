import { DSAAlgorithmEntry } from './dsa.types';

export const TREE_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'binary-tree-traversal',
    title: 'Binary Tree Traversals (Inorder, Preorder, Postorder)',
    categorySlug: 'tree',
    categoryName: 'Trees',
    topicGroup: 'Traversals',
    difficulty: 'easy',
    description: 'Depth-First Search traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN).',
    theory: 'Inorder visits Left-Node-Right (yields sorted values in BST). Preorder visits Node-Left-Right (useful for cloning). Postorder visits Left-Right-Node (useful for deletion).',
    working: 'Inorder: traverse(node.left), visit(node), traverse(node.right). Preorder: visit(node), traverse(node.left), traverse(node.right). Postorder: traverse(node.left), traverse(node.right), visit(node).',
    javaCode: `class TreeNode { int val; TreeNode left, right; TreeNode(int v){ val = v; } }
public class Solution {
    public void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }
}`,
    cppCode: `struct TreeNode { int val; TreeNode *left, *right; TreeNode(int v): val(v), left(nullptr), right(nullptr){} };
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}`,
    pythonCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)`,
    pseudoCode: `FUNCTION inorder(root):
    IF root == null THEN RETURN
    inorder(root.left)
    PRINT root.val
    inorder(root.right)
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) where H is tree height',
    applications: ['Expression trees', 'BST sorted iteration', 'Folder structure traversal'],
    interviewQuestions: ['Iterative inorder traversal using Stack', 'Morris Traversal for O(1) space'],
    commonMistakes: ['Forgetting null check causing NullPointerException on empty subtree'],
    leetCodeNumber: 94,
    leetCodeName: 'Binary Tree Inorder Traversal',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: 'Tree DFS',
    leetCodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    sampleInput: [1, null, 2, 3],
    sampleOutput: '[1, 3, 2]',
    quizzes: [
      { question: 'Order of node visits in Inorder Traversal?', type: 'mcq', options: ['Left -> Node -> Right', 'Node -> Left -> Right', 'Left -> Right -> Node', 'Level by level'], correctAnswer: 'Left -> Node -> Right', explanation: 'Inorder visits left child, current node, then right child.', difficulty: 'easy', points: 10 },
      { question: 'Which traversal yields sorted sequence on Binary Search Tree (BST)?', type: 'mcq', options: ['Inorder', 'Preorder', 'Postorder', 'Level Order'], correctAnswer: 'Inorder', explanation: 'Inorder traversal of BST visits keys in strictly increasing order.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of tree traversal for N nodes?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(log N)', 'O(2^N)'], correctAnswer: 'O(N)', explanation: 'Visits every node once.', difficulty: 'easy', points: 10 },
      { question: 'Worst case space complexity for recursion stack on skewed tree?', type: 'mcq', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Height H equals N for linked-list-like skewed tree.', difficulty: 'medium', points: 15 },
      { question: 'Order of node visits in Preorder Traversal?', type: 'mcq', options: ['Node -> Left -> Right', 'Left -> Node -> Right', 'Left -> Right -> Node', 'Right -> Left -> Node'], correctAnswer: 'Node -> Left -> Right', explanation: 'Preorder processes parent node before child subtrees.', difficulty: 'medium', points: 15 },
      { question: 'What traversal algorithm achieves O(1) auxiliary space without stack?', type: 'mcq', options: ['Morris Traversal', 'BFS', 'Iterative DFS', 'Level order'], correctAnswer: 'Morris Traversal', explanation: 'Morris traversal uses threaded binary tree links for O(1) space.', difficulty: 'hard', points: 20 },
    ],
  },
];
