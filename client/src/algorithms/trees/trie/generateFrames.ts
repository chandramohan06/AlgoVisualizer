import { type VisualizationFrame } from '@store/visualizationStore';
import { Trie } from './Trie';
import type { TrieNode } from './types';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';

function trieToGraphData(root: TrieNode): GraphData<string> {
  const nodes: GenericNode<string>[] = [];
  const edges: GenericEdge[] = [];
  const nodeMap = new Map<TrieNode, { x: number; y: number }>();

  // Calculate positions using tree layout
  const calculatePositions = (node: TrieNode, x: number, y: number, level: number): void => {
    nodeMap.set(node, { x, y });
    const children = Array.from(node.children.values());
    const offset = 300 / Math.pow(2, level);
    
    children.forEach((child, idx) => {
      const childX = x - (children.length - 1) * offset / 2 + idx * offset;
      calculatePositions(child, childX, y + 60, level + 1);
    });
  };

  calculatePositions(root, 400, 50, 0);

  // Convert nodes
  const collectNodes = (node: TrieNode): void => {
    const pos = nodeMap.get(node);
    if (pos) {
      nodes.push({
        id: node.id,
        value: node.char || 'root',
        x: pos.x,
        y: pos.y,
        label: node.isEndOfWord ? 'end' : '',
      });
    }
    node.children.forEach(child => collectNodes(child));
  };

  collectNodes(root);

  // Convert edges
  const collectEdges = (node: TrieNode): void => {
    node.children.forEach(child => {
      edges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        directed: true,
        label: child.char,
      });
      collectEdges(child);
    });
  };

  collectEdges(root);

  return { nodes, edges, layout: 'tree' };
}

export const generateTrieFrames = (
  operation: 'create' | 'insert' | 'search' | 'startsWith' | 'delete',
  initialValues: string[],
  operationValue?: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const trie = new Trie();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-rose-500', label: 'End of Word' },
  ];

  initialValues.forEach(word => trie.insert(word));

  const createTrieFrame = (description: string, activeNodeId?: string, visitedNodeIds: string[] = [], codeLine: number = 0) => {
    const graphData = trieToGraphData(trie.root);
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
      variables: { nodeCount: trie.toNodesArray().length },
      meta: {
        statusMap,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    };
  };

  frames.push(createTrieFrame(
    `Trie initialized with ${initialValues.length} words: [${initialValues.join(', ')}]`,
  ));

  switch (operation) {
    case 'create':
      frames.push(createTrieFrame('Trie creation complete.', undefined, [], 1));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createTrieFrame(`Inserting word "${operationValue}" into trie.`, undefined, [], 2));
        trie.insert(operationValue);
        frames.push(createTrieFrame(`Word "${operationValue}" inserted successfully.`, undefined, [], 3));
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createTrieFrame(`Searching for word "${operationValue}" in trie.`, undefined, [], 4));
        const visited: string[] = [];
        let current = trie.root;
        
        for (const char of operationValue) {
          if (!current.children.has(char)) {
            frames.push(createTrieFrame(`Character '${char}' not found. Word does not exist.`, undefined, visited, 5));
            return frames;
          }
          
          current = current.children.get(char)!;
          visited.push(current.id);
          frames.push(createTrieFrame(`Traversing to character '${char}'`, current.id, [...visited], 6));
        }
        
        if (current.isEndOfWord) {
          frames.push(createTrieFrame(`Word "${operationValue}" found!`, current.id, visited, 7));
        } else {
          frames.push(createTrieFrame(`Path exists but "${operationValue}" is not a complete word.`, current.id, visited, 8));
        }
      }
      break;

    case 'startsWith':
      if (operationValue !== undefined) {
        frames.push(createTrieFrame(`Checking if trie contains words starting with "${operationValue}".`, undefined, [], 9));
        const visited: string[] = [];
        let current = trie.root;
        
        for (const char of operationValue) {
          if (!current.children.has(char)) {
            frames.push(createTrieFrame(`Character '${char}' not found. Prefix does not exist.`, undefined, visited, 10));
            return frames;
          }
          
          current = current.children.get(char)!;
          visited.push(current.id);
          frames.push(createTrieFrame(`Traversing to character '${char}'`, current.id, [...visited], 11));
        }
        
        frames.push(createTrieFrame(`Prefix "${operationValue}" exists in trie.`, current.id, visited, 12));
      }
      break;

    case 'delete':
      if (operationValue !== undefined) {
        frames.push(createTrieFrame(`Deleting word "${operationValue}" from trie.`, undefined, [], 13));
        const deleted = trie.delete(operationValue);
        
        if (deleted) {
          frames.push(createTrieFrame(`Word "${operationValue}" deleted successfully.`, undefined, [], 14));
        } else {
          frames.push(createTrieFrame(`Word "${operationValue}" not found in trie.`, undefined, [], 15));
        }
      }
      break;
  }

  return frames;
};
