import { type VisualizationFrame } from '@store/visualizationStore';
import { BinarySearchTree } from './BinarySearchTree';
import type { BSTNode } from './types';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';

function treeToGraphData<T>(root: BSTNode<T> | null): GraphData<T> {
  if (!root) return { nodes: [], edges: [] };

  const nodes: GenericNode<T>[] = [];
  const edges: GenericEdge[] = [];
  const nodeMap = new Map<BSTNode<T>, { x: number; y: number }>();

  const calculatePositions = (node: BSTNode<T>, x: number, y: number, level: number): void => {
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

  const collectNodes = (node: BSTNode<T> | null): void => {
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

  const collectEdges = (node: BSTNode<T> | null): void => {
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

export const generateBSTFrames = (
  operation: 'create' | 'insert' | 'delete' | 'search' | 'findMin' | 'findMax' | 'successor' | 'predecessor',
  initialValues: number[],
  operationValue?: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const bst = new BinarySearchTree<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-rose-500', label: 'Deleted' },
  ];

  initialValues.forEach(value => bst.insert(value));

  const createTreeFrame = (description: string, activeNodeId?: string, visitedNodeIds: string[] = [], codeLine: number = 0) => {
    const graphData = treeToGraphData(bst.root);
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
      variables: { nodeCount: bst.toNodesArray().length },
      meta: {
        statusMap,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    };
  };

  frames.push(createTreeFrame(
    `BST initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
  ));

  switch (operation) {
    case 'create':
      frames.push(createTreeFrame('BST creation complete.', undefined, [], 1));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Inserting value ${operationValue} into BST.`, undefined, [], 2));
        bst.insert(operationValue);
        frames.push(createTreeFrame(`Value ${operationValue} inserted at correct BST position.`, undefined, [], 3));
      }
      break;

    case 'delete':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Deleting value ${operationValue} from BST.`, undefined, [], 4));
        bst.delete(operationValue);
        frames.push(createTreeFrame(`Value ${operationValue} deleted from BST.`, undefined, [], 5));
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Searching for value ${operationValue} in BST.`, undefined, [], 6));
        const visited: string[] = [];
        let current = bst.root;
        
        while (current) {
          visited.push(current.id);
          frames.push(createTreeFrame(`Checking node: value = ${current.value}`, current.id, [...visited], 7));
          
          if (current.value === operationValue) {
            frames.push(createTreeFrame(`Value ${operationValue} found!`, current.id, visited, 8));
            return frames;
          }
          
          current = operationValue < current.value ? current.left : current.right;
        }
        
        frames.push(createTreeFrame(`Value ${operationValue} not found in BST.`, undefined, visited, 9));
      }
      break;

    case 'findMin':
      frames.push(createTreeFrame('Finding minimum value in BST (leftmost node).', undefined, [], 10));
      const minNode = bst.findMin();
      if (minNode) {
        frames.push(createTreeFrame(`Minimum value found: ${minNode.value}`, minNode.id, [], 11));
      }
      break;

    case 'findMax':
      frames.push(createTreeFrame('Finding maximum value in BST (rightmost node).', undefined, [], 12));
      const maxNode = bst.findMax();
      if (maxNode) {
        frames.push(createTreeFrame(`Maximum value found: ${maxNode.value}`, maxNode.id, [], 13));
      }
      break;

    case 'successor':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Finding successor of value ${operationValue}.`, undefined, [], 14));
        const succNode = bst.successor(operationValue);
        if (succNode) {
          frames.push(createTreeFrame(`Successor of ${operationValue} is ${succNode.value}`, succNode.id, [], 15));
        } else {
          frames.push(createTreeFrame(`No successor found for ${operationValue} (no larger value exists).`, undefined, [], 16));
        }
      }
      break;

    case 'predecessor':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Finding predecessor of value ${operationValue}.`, undefined, [], 17));
        const predNode = bst.predecessor(operationValue);
        if (predNode) {
          frames.push(createTreeFrame(`Predecessor of ${operationValue} is ${predNode.value}`, predNode.id, [], 18));
        } else {
          frames.push(createTreeFrame(`No predecessor found for ${operationValue} (no smaller value exists).`, undefined, [], 19));
        }
      }
      break;
  }

  return frames;
};
