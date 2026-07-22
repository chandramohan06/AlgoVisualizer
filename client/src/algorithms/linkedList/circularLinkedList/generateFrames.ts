import { type VisualizationFrame } from '@store/visualizationStore';
import { CircularLinkedList } from './CircularLinkedList';
import type { CircularLinkedListData } from './types';

const NODE_WIDTH = 60;
const NODE_GAP = 40;
const START_X = 50;
const START_Y = 100;

function calculateNodePositions(nodes: { id: string; value: number }[]): CircularLinkedListData<number> {
  const positionedNodes = nodes.map((node, idx) => ({
    id: node.id,
    value: node.value,
    x: START_X + idx * (NODE_WIDTH + NODE_GAP),
    y: START_Y,
  }));

  const edges: { from: string; to: string | null; isBackward?: boolean }[] = [];

  // Forward edges (next pointers)
  positionedNodes.forEach((node, idx) => {
    if (idx < positionedNodes.length - 1) {
      edges.push({
        from: node.id,
        to: positionedNodes[idx + 1].id,
        isBackward: false,
      });
    } else {
      // Circular edge from last to first
      edges.push({
        from: node.id,
        to: positionedNodes[0].id,
        isBackward: false,
      });
    }
  });

  return {
    nodes: positionedNodes,
    edges,
    isCircular: true,
  };
}

export const generateCircularLinkedListFrames = (
  operation: 'create' | 'insert' | 'delete' | 'search' | 'traverse',
  initialValues: number[],
  operationValue?: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const list = new CircularLinkedList<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-indigo-600', label: 'Head' },
    { color: 'bg-purple-600', label: 'Tail' },
    { color: 'bg-sky-400', label: 'Circular Link' },
  ];

  // Create initial list
  for (const value of initialValues) {
    list.insert(value);
  }

  const createListFrame = (description: string, statusMap: Record<string, any> = {}, pointers: Record<string, string> = {}, codeLine: number = 0) => {
    const nodes = list.toNodesArray();
    const data = calculateNodePositions(nodes);
    
    return {
      index: frameIdx++,
      description,
      data,
      highlights: [],
      pointers,
      codeLineHighlight: codeLine,
      variables: { size: list.size, head: list.head?.id, tail: list.tail?.id },
      meta: {
        ...statusMap,
        headPointer: list.head?.id,
        tailPointer: list.tail?.id,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    };
  };

  // Initial state frame
  frames.push(createListFrame(
    `Circular Linked List initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
    {},
    {},
    0,
  ));

  switch (operation) {
    case 'create':
      frames.push(createListFrame(
        'Circular linked list creation complete. Last node points back to head.',
        {},
        {},
    1,
      ));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Inserting value ${operationValue} at tail. Will update circular link.`,
          {},
          { tail: list.tail?.id || '' },
          2,
        ));
        
        const newNode = list.insert(operationValue);
        frames.push(createListFrame(
          `Value ${operationValue} inserted. Tail now points to head to maintain circular structure.`,
          { statusMap: { [newNode.id]: 'success' } },
          { new: newNode.id },
          3,
        ));
      }
      break;

    case 'delete':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Deleting node with value ${operationValue}. Will update circular links.`,
          {},
          {},
          4,
        ));
        
        const success = list.delete(operationValue);
        if (success) {
          frames.push(createListFrame(
            `Node with value ${operationValue} deleted. Circular structure maintained.`,
            {},
            {},
            5,
          ));
        } else {
          frames.push(createListFrame(
            `Value ${operationValue} not found. Deletion failed.`,
            {},
            {},
            6,
          ));
        }
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Searching for value ${operationValue} in circular list.`,
          {},
          { head: list.head?.id || '' },
          7,
        ));
        
        const nodes = list.toNodesArray();
        const statusMap: Record<string, any> = {};
        
        for (let i = 0; i < nodes.length; i++) {
          statusMap[nodes[i].id] = 'warning';
          frames.push(createListFrame(
            `Checking node at index ${i}: value = ${nodes[i].value}`,
            { statusMap: { ...statusMap } },
            { current: nodes[i].id },
            8,
          ));
          
          if (nodes[i].value === operationValue) {
            statusMap[nodes[i].id] = 'success';
            frames.push(createListFrame(
              `Value ${operationValue} found at index ${i}!`,
              { statusMap: { ...statusMap } },
              { found: nodes[i].id },
              9,
            ));
            return frames;
          }
          
          statusMap[nodes[i].id] = 'visited';
        }
        
        frames.push(createListFrame(
          `Value ${operationValue} not found after completing full circle.`,
          { statusMap },
          {},
          10,
        ));
      }
      break;

    case 'traverse':
      frames.push(createListFrame(
        'Traversing circular list. Will continue until we return to head.',
        {},
        { head: list.head?.id || '' },
        11,
      ));
      
      const nodes = list.toNodesArray();
      const statusMap: Record<string, any> = {};
      
      for (let i = 0; i < nodes.length; i++) {
        statusMap[nodes[i].id] = 'warning';
        frames.push(createListFrame(
          `Visiting node ${i}: value = ${nodes[i].value}`,
          { statusMap: { ...statusMap } },
          { current: nodes[i].id },
          12,
        ));
        statusMap[nodes[i].id] = 'visited';
      }
      
      frames.push(createListFrame(
        `Traversal complete. Visited all ${nodes.length} nodes and returned to head.`,
        { statusMap },
        { head: list.head?.id || '' },
        13,
      ));
      break;
  }

  return frames;
};
