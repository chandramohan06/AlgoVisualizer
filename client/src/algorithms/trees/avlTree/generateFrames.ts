import { type VisualizationFrame } from '@store/visualizationStore';
import { AVLTree } from './AVLTree';
import type { AVLNode } from './types';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';

function treeToGraphData<T>(root: AVLNode<T> | null): GraphData<T> {
  if (!root) return { nodes: [], edges: [] };

  const nodes: GenericNode<T>[] = [];
  const edges: GenericEdge[] = [];
  const nodeMap = new Map<AVLNode<T>, { x: number; y: number }>();

  const calculatePositions = (node: AVLNode<T>, x: number, y: number, level: number): void => {
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

  const collectNodes = (node: AVLNode<T> | null): void => {
    if (!node) return;
    const pos = nodeMap.get(node);
    if (pos) {
      nodes.push({
        id: node.id,
        value: node.value,
        x: pos.x,
        y: pos.y,
        label: `h:${node.height}`,
      });
    }
    collectNodes(node.left);
    collectNodes(node.right);
  };

  collectNodes(root);

  const collectEdges = (node: AVLNode<T> | null): void => {
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

export const generateAVLTreeFrames = (
  operation: 'create' | 'insert' | 'delete' | 'search',
  initialValues: number[],
  operationValue?: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const avl = new AVLTree<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-violet-500', label: 'Rotation' },
  ];

  initialValues.forEach(value => avl.insert(value));

  const createTreeFrame = (description: string, activeNodeId?: string, visitedNodeIds: string[] = [], codeLine: number = 0) => {
    const graphData = treeToGraphData(avl.root);
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
      variables: { 
        nodeCount: avl.toNodesArray().length,
        rotation: avl.lastRotation || 'none',
      },
      meta: {
        statusMap,
        legend: baseLegend,
        rotation: avl.lastRotation,
      },
      timestamp: frameIdx * 600,
    };
  };

  frames.push(createTreeFrame(
    `AVL Tree initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
  ));

  switch (operation) {
    case 'create':
      frames.push(createTreeFrame('AVL Tree creation complete.', undefined, [], 1));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Inserting value ${operationValue} into AVL Tree.`, undefined, [], 2));
        avl.insert(operationValue);
        
        if (avl.lastRotation) {
          frames.push(createTreeFrame(
            `Balance factor violated. Performing ${avl.lastRotation} rotation to rebalance.`,
            undefined,
            [],
            3,
          ));
        }
        
        frames.push(createTreeFrame(
          `Value ${operationValue} inserted. Tree is balanced.`,
          undefined,
          [],
          4,
        ));
      }
      break;

    case 'delete':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Deleting value ${operationValue} from AVL Tree.`, undefined, [], 5));
        avl.delete(operationValue);
        
        if (avl.lastRotation) {
          frames.push(createTreeFrame(
            `Balance factor violated. Performing ${avl.lastRotation} rotation to rebalance.`,
            undefined,
            [],
            6,
          ));
        }
        
        frames.push(createTreeFrame(
          `Value ${operationValue} deleted. Tree is rebalanced.`,
          undefined,
          [],
          7,
        ));
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createTreeFrame(`Searching for value ${operationValue} in AVL Tree.`, undefined, [], 8));
        const visited: string[] = [];
        let current = avl.root;
        
        while (current) {
          visited.push(current.id);
          frames.push(createTreeFrame(`Checking node: value = ${current.value}, height = ${current.height}`, current.id, [...visited], 9));
          
          if (current.value === operationValue) {
            frames.push(createTreeFrame(`Value ${operationValue} found!`, current.id, visited, 10));
            return frames;
          }
          
          current = operationValue < current.value ? current.left : current.right;
        }
        
        frames.push(createTreeFrame(`Value ${operationValue} not found in AVL Tree.`, undefined, visited, 11));
      }
      break;
  }

  return frames;
};
