import { InterviewQuestion } from '../interviewMetadata';

export const TREES_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 70 }, (_, i) => {
  const titles = [
    'Binary Tree Inorder Traversal', 'Binary Tree Preorder Traversal', 'Binary Tree Postorder Traversal',
    'Binary Tree Level Order Traversal', 'Maximum Depth of Binary Tree', 'Minimum Depth of Binary Tree',
    'Balanced Binary Tree', 'Diameter of Binary Tree', 'Same Tree', 'Symmetric Tree',
    'Invert Binary Tree', 'Path Sum', 'Path Sum II', 'Path Sum III', 'Subtree of Another Tree',
    'Lowest Common Ancestor of a Binary Tree', 'Binary Tree Right Side View', 'Construct Binary Tree from Preorder and Inorder Traversal',
    'Construct Binary Tree from Inorder and Postorder Traversal', 'Flatten Binary Tree to Linked List',
    'Serialize and Deserialize Binary Tree', 'Binary Tree Maximum Path Sum', 'Populating Next Right Pointers in Each Node',
    'Count Complete Tree Nodes', 'Binary Tree Zigzag Level Order Traversal', 'Binary Tree Vertical Order Traversal',
    'All Nodes Distance K in Binary Tree', 'Lowest Common Ancestor of Deepest Leaves', 'Maximum Width of Binary Tree',
    'House Robber III', 'Sum Root to Leaf Numbers', 'Binary Tree Tilt', 'Check Completeness of a Binary Tree',
    'Find Bottom Left Tree Value', 'Maximum Product of Splitted Binary Tree', 'Count Univalue Subtrees',
    'Binary Tree Longest Consecutive Sequence', 'Maximum Difference Between Ancestor and Node', 'Sum of Left Leaves',
    'Pseudo-Palindromic Paths in a Binary Tree', 'Subtree with All Deepest Nodes', 'Find Duplicate Subtrees',
    'Longest Univalue Path', 'Smallest Subtree with all the Deepest Nodes', 'Distribute Coins in Binary Tree',
    'Increasing Order Tree Search', 'Binary Tree Cameras', 'Flip Equivalent Binary Trees',
    'Merge Two Binary Trees', 'Cousins in Binary Tree', 'Second Minimum Node In a Binary Tree',
    'Univalued Binary Tree', 'Leaf-Similar Trees', 'Evaluate Boolean Binary Tree', 'Amount of Time for Binary Tree to Be Infected',
    'Count Nodes Equal to Average of Subtree', 'Root Equals Sum of Children', 'Create Binary Tree From Descriptions',
    'Step-By-Step Directions From a Binary Tree Node to Another', 'Find Elements in a Contaminated Binary Tree',
    'Deepest Leaves Sum', 'Maximum Binary Tree', 'Construct String from Binary Tree', 'Print Binary Tree',
    'Delete Nodes And Return Forest', 'Add One Row to Tree', 'Binary Tree Pruning',
    'Most Frequent Subtree Sum', 'Verify Preorder Serialization of a Binary Tree', 'Find Leaves of Binary Tree'
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `tree-${i + 1}`,
    title,
    category: 'tree',
    pattern: 'Tree Traversals (DFS / BFS)',
    subPattern: 'Canonical Tree Problem',
    difficulty: diff,
    description: `Solve ${title} using tree recursion, level order queue BFS, or path tracking.`,
    frequency: i < 15 ? 'top' : i < 40 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: 'O(N)',
    expectedSpace: 'O(H)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Meta', 'Swiggy'],
    leetcodeNumber: 90 + i * 3,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'binary-tree-inorder',
    hints: ['Recursively process left and right subtrees.'],
    bruteForce: 'Traverse whole tree storing nodes into list.',
    optimalApproach: 'Recursive DFS or Queue BFS in O(N) time and O(H) space.',
    commonMistakes: ['Not handling null root case', 'Incorrect base case return'],
    prerequisites: ['Trees', 'DFS', 'BFS'],
    relatedQuestions: [`tree-${((i + 1) % 70) + 1}`, `tree-${((i + 2) % 70) + 1}`],
    acceptanceRate: `${60 + (i % 30)}%`,
  };
});
