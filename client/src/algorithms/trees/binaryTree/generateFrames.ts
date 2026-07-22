import { type VisualizationFrame } from '@store/visualizationStore';
import { BinaryTree } from './BinaryTree';
import type { TreeNode } from './types';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';

function treeToGraphData<T>(root: TreeNode<T> | null): GraphData<T> {
  if (!root) return { nodes: [], edges: [] };

  const nodes: GenericNode<T>[] = [];
  const edges: GenericEdge[] = [];
  const nodeMap = new Map<TreeNode<T>, { x: number; y: number }>();

  // Calculate positions using tree layout
  const calculatePositions = (node: TreeNode<T>, x: number, y: number, level: number): void => {
    nodeMap.set(node, { x, y });
    const offset = 300 / Math.pow(2, level);
    
    if (node.left) {
      calculatePositions(node.left, x - offset, y + 60, level + 1);
    }
    if (node.right) {
      calculatePositions(node.right, x + offset, y + 60, level + 1);
    }
  };

  calculatePositions(root, 400, 50, 0);

  // Convert nodes
  const collectNodes = (node: TreeNode<T> | null): void => {
    if (!node) return;
    const pos = nodeMap.get(node);
    if (pos) {
      nodes.push({
        id: node.id,
        value: node.value,
        x: pos.x,
        y: pos.y,
      });
    }
    collectNodes(node.left);
    collectNodes(node.right);
  };

  collectNodes(root);

  // Convert edges
  const collectEdges = (node: TreeNode<T> | null): void => {
    if (!node) return;
    if (node.left) {
      edges.push({
        id: `${node.id}-${node.left.id}`,
        source: node.id,
        target: node.left.id,
        directed: true,
      });
      collectEdges(node.left);
    }
    if (node.right) {
      edges.push({
        id: `${node.id}-${node.right.id}`,
        source: node.id,
        target: node.right.id,
        directed: true,
      });
      collectEdges(node.right);
    }
  };

  collectEdges(root);

  return { nodes, edges, layout: 'tree' };
}

export const generateBinaryTreeFrames = (
  operation: 'create' | 'insert' | 'search' | 'preorder' | 'inorder' | 'postorder' | 'levelorder',
  initialValues: number[],
  operationValue?: number,
  operationPosition?: 'left' | 'right',
  _parentId?: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const tree = new BinaryTree<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
  ];

  // Create initial tree
  if (initialValues.length > 0) {
    tree.insert(initialValues[0]);
    for (let i = 1; i < initialValues.length; i++) {
      const parent = tree.toNodesArray()[i - 1];
      tree.insert(initialValues[i], i % 2 === 0 ? 'left' : 'right', parent.id);
    }
  }

  const createTreeFrame = (description: string, activeNodeId?: string, visitedNodeIds: string[] = [], codeLine: number = 0) => {
    const graphData = treeToGraphData(tree.root);
    const statusMap: Record<string, any> = {};
    
    visitedNodeIds.forEach(id => {
      statusMap[id] = 'visited';
    });
    
    if (activeNodeId) {
      statusMap[activeNodeId] = 'warning';
    }

    return {
      index: frameIdx++,
      description,
      data: graphData,
      highlights: activeNodeId ? [activeNodeId] : [],
      pointers: activeNodeId ? { current: activeNodeId } as Record<string, string | number> : {} as Record<string, string | number>,
      codeLineHighlight: codeLine,
      variables: { nodeCount: tree.toNodesArray().length },
      meta: {
        statusMap,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    };
  };

  // Initial state frame
  frames.push(createTreeFrame(
    `Binary Tree initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
  ));

  switch (operation) {
    case 'create':
      frames.push(createTreeFrame(
        'Tree creation complete.',
        undefined,
        [],
        1,
      ));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(
          `Inserting value ${operationValue}.`,
          undefined,
          [],
          2,
        ));
        
        const nodes = tree.toNodesArray();
        const parent = nodes.length > 0 ? nodes[nodes.length - 1] : undefined;
        const newNode = tree.insert(operationValue, operationPosition || 'left', parent?.id);
        
        if (newNode) {
          frames.push(createTreeFrame(
            `Value ${operationValue} inserted as ${operationPosition || 'left'} child.`,
            newNode.id,
            [],
            3,
          ));
        }
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(
          `Searching for value ${operationValue}.`,
          undefined,
          [],
          4,
        ));
        
        const nodes = tree.toNodesArray();
        const visited: string[] = [];
        
        for (const node of nodes) {
          visited.push(node.id);
          frames.push(createTreeFrame(
            `Checking node: value = ${node.value}`,
            node.id,
            [...visited],
            5,
          ));
          
          if (node.value === operationValue) {
            frames.push(createTreeFrame(
              `Value ${operationValue} found!`,
              node.id,
              visited,
              6,
            ));
            return frames;
          }
        }
        
        frames.push(createTreeFrame(
          `Value ${operationValue} not found in tree.`,
          undefined,
          visited,
          7,
        ));
      }
      break;

    case 'preorder':
      frames.push(createTreeFrame(
        'Starting Preorder Traversal (Root → Left → Right).',
        undefined,
        [],
        8,
      ));
      
      const preorderResult: number[] = [];
      const preorderVisited: string[] = [];
      
      const preorderVisit = (node: TreeNode<number> | null): void => {
        if (!node) return;
        preorderVisited.push(node.id);
        frames.push(createTreeFrame(
          `Visiting node: ${node.value}`,
          node.id,
          [...preorderVisited],
          9,
        ));
        preorderResult.push(node.value);
        preorderVisit(node.left);
        preorderVisit(node.right);
      };
      
      preorderVisit(tree.root);
      
      frames.push(createTreeFrame(
        `Preorder traversal complete: [${preorderResult.join(', ')}]`,
        undefined,
        preorderVisited,
        10,
      ));
      break;

    case 'inorder':
      frames.push(createTreeFrame(
        'Starting Inorder Traversal (Left → Root → Right).',
        undefined,
        [],
        11,
      ));
      
      const inorderResult: number[] = [];
      const inorderVisited: string[] = [];
      
      const inorderVisit = (node: TreeNode<number> | null): void => {
        if (!node) return;
        inorderVisit(node.left);
        inorderVisited.push(node.id);
        frames.push(createTreeFrame(
          `Visiting node: ${node.value}`,
          node.id,
          [...inorderVisited],
          12,
        ));
        inorderResult.push(node.value);
        inorderVisit(node.right);
      };
      
      inorderVisit(tree.root);
      
      frames.push(createTreeFrame(
        `Inorder traversal complete: [${inorderResult.join(', ')}]`,
        undefined,
        inorderVisited,
        13,
      ));
      break;

    case 'postorder':
      frames.push(createTreeFrame(
        'Starting Postorder Traversal (Left → Right → Root).',
        undefined,
        [],
        14,
      ));
      
      const postorderResult: number[] = [];
      const postorderVisited: string[] = [];
      
      const postorderVisit = (node: TreeNode<number> | null): void => {
        if (!node) return;
        postorderVisit(node.left);
        postorderVisit(node.right);
        postorderVisited.push(node.id);
        frames.push(createTreeFrame(
          `Visiting node: ${node.value}`,
          node.id,
          [...postorderVisited],
          15,
        ));
        postorderResult.push(node.value);
      };
      
      postorderVisit(tree.root);
      
      frames.push(createTreeFrame(
        `Postorder traversal complete: [${postorderResult.join(', ')}]`,
        undefined,
        postorderVisited,
        16,
      ));
      break;

    case 'levelorder':
      frames.push(createTreeFrame(
        'Starting Level Order Traversal (Breadth-First).',
        undefined,
        [],
        17,
      ));
      
      const levelorderResult: number[] = [];
      const levelorderVisited: string[] = [];
      
      if (tree.root) {
        const queue: TreeNode<number>[] = [tree.root];
        
        while (queue.length > 0) {
          const node = queue.shift()!;
          levelorderVisited.push(node.id);
          frames.push(createTreeFrame(
            `Visiting node: ${node.value}`,
            node.id,
            [...levelorderVisited],
            18,
          ));
          levelorderResult.push(node.value);
          
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
      }
      
      frames.push(createTreeFrame(
        `Level order traversal complete: [${levelorderResult.join(', ')}]`,
        undefined,
        levelorderVisited,
        19,
      ));
      break;
  }

  return frames;
};
