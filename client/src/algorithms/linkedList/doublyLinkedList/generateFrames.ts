import { type VisualizationFrame } from '@store/visualizationStore';
import { DoublyLinkedList } from './DoublyLinkedList';
import type { DoublyLinkedListData } from './types';

const NODE_WIDTH = 60;
const NODE_GAP = 40;
const START_X = 50;
const START_Y = 100;

function calculateNodePositions(nodes: { id: string; value: number }[]): DoublyLinkedListData<number> {
  const positionedNodes = nodes.map((node, idx) => ({
    id: node.id,
    value: node.value,
    x: START_X + idx * (NODE_WIDTH + NODE_GAP),
    y: START_Y,
  }));

  const edges: { from: string; to: string | null; isBackward?: boolean }[] = [];

  // Forward edges (next pointers)
  positionedNodes.forEach((node, idx) => {
    edges.push({
      from: node.id,
      to: idx < positionedNodes.length - 1 ? positionedNodes[idx + 1].id : null,
      isBackward: false,
    });
  });

  // Backward edges (prev pointers)
  positionedNodes.forEach((node, idx) => {
    if (idx > 0) {
      edges.push({
        from: node.id,
        to: positionedNodes[idx - 1].id,
        isBackward: true,
      });
    }
  });

  return {
    nodes: positionedNodes,
    edges,
  };
}

export const generateDoublyLinkedListFrames = (
  operation: 'create' | 'insert' | 'delete' | 'search' | 'reverse' | 'traverseForward' | 'traverseBackward',
  initialValues: number[],
  operationValue?: number,
  operationIndex?: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const list = new DoublyLinkedList<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-indigo-600', label: 'Head' },
    { color: 'bg-purple-600', label: 'Tail' },
    { color: 'bg-violet-400', label: 'Prev Pointer' },
  ];

  // Create initial list
  for (const value of initialValues) {
    list.insertAtTail(value);
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
    `Doubly Linked List initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
    {},
    {},
    0,
  ));

  switch (operation) {
    case 'create':
      frames.push(createListFrame(
        'Doubly linked list creation complete. Supports bidirectional traversal.',
        {},
        {},
        1,
      ));
      break;

    case 'insert':
      if (operationValue !== undefined && operationIndex !== undefined) {
        frames.push(createListFrame(
          `Inserting value ${operationValue} at index ${operationIndex}.`,
          {},
          {},
          2,
        ));
        
        const result = list.insertAtIndex(operationValue, operationIndex);
        if (result) {
          frames.push(createListFrame(
            `Value ${operationValue} inserted at index ${operationIndex}. Both next and prev pointers updated.`,
            { statusMap: { [result.id]: 'success' } },
            { new: result.id },
            3,
          ));
        } else {
          frames.push(createListFrame(
            `Invalid index ${operationIndex}. Insertion failed.`,
            {},
            {},
            4,
          ));
        }
      }
      break;

    case 'delete':
      if (operationIndex !== undefined) {
        frames.push(createListFrame(
          `Deleting node at index ${operationIndex}.`,
          {},
          {},
          5,
        ));
        
        const deleted = list.deleteAtIndex(operationIndex);
        if (deleted) {
          frames.push(createListFrame(
            `Node with value ${deleted.value} deleted. Adjacent pointers updated.`,
            {},
            {},
            6,
          ));
        } else {
          frames.push(createListFrame(
            `Invalid index ${operationIndex}. Deletion failed.`,
            {},
            {},
            7,
          ));
        }
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Searching for value ${operationValue} in forward direction.`,
          {},
          {},
          8,
        ));
        
        const nodes = list.toNodesArray();
        const statusMap: Record<string, any> = {};
        
        for (let i = 0; i < nodes.length; i++) {
          statusMap[nodes[i].id] = 'warning';
          frames.push(createListFrame(
            `Checking node at index ${i}: value = ${nodes[i].value}`,
            { statusMap: { ...statusMap } },
            { current: nodes[i].id },
            9,
          ));
          
          if (nodes[i].value === operationValue) {
            statusMap[nodes[i].id] = 'success';
            frames.push(createListFrame(
              `Value ${operationValue} found at index ${i}!`,
              { statusMap: { ...statusMap } },
              { found: nodes[i].id },
              10,
            ));
            return frames;
          }
          
          statusMap[nodes[i].id] = 'visited';
        }
        
        frames.push(createListFrame(
          `Value ${operationValue} not found in forward traversal.`,
          { statusMap },
          {},
          11,
        ));
      }
      break;

    case 'reverse':
      frames.push(createListFrame(
        'Reversing the doubly linked list. Swapping next and prev pointers.',
        {},
        {},
        12,
      ));
      
      list.reverse();
      frames.push(createListFrame(
        'Doubly linked list reversed. Head and tail swapped.',
        {},
        {},
        13,
      ));
      break;

    case 'traverseForward':
      frames.push(createListFrame(
        'Traversing list forward (head to tail).',
        {},
        { head: list.head?.id || '' },
        14,
      ));
      
      const forwardNodes = list.toNodesArray();
      const forwardStatusMap: Record<string, any> = {};
      
      for (let i = 0; i < forwardNodes.length; i++) {
        forwardStatusMap[forwardNodes[i].id] = 'warning';
        frames.push(createListFrame(
          `Visiting node ${i}: value = ${forwardNodes[i].value}`,
          { statusMap: { ...forwardStatusMap } },
          { current: forwardNodes[i].id },
          15,
        ));
        forwardStatusMap[forwardNodes[i].id] = 'visited';
      }
      
      frames.push(createListFrame(
        `Forward traversal complete. Values: [${forwardNodes.map(n => n.value).join(', ')}]`,
        { statusMap: forwardStatusMap },
        {},
        16,
      ));
      break;

    case 'traverseBackward':
      frames.push(createListFrame(
        'Traversing list backward (tail to head).',
        {},
        { tail: list.tail?.id || '' },
        17,
      ));
      
      const backwardValues = list.traverseBackward();
      const backwardNodes = list.toNodesArray().reverse();
      const backwardStatusMap: Record<string, any> = {};
      
      for (let i = 0; i < backwardNodes.length; i++) {
        backwardStatusMap[backwardNodes[i].id] = 'warning';
        frames.push(createListFrame(
          `Visiting node ${backwardNodes.length - 1 - i}: value = ${backwardNodes[i].value}`,
          { statusMap: { ...backwardStatusMap } },
          { current: backwardNodes[i].id },
          18,
        ));
        backwardStatusMap[backwardNodes[i].id] = 'visited';
      }
      
      frames.push(createListFrame(
        `Backward traversal complete. Values: [${backwardValues.join(', ')}]`,
        { statusMap: backwardStatusMap },
        {},
        19,
      ));
      break;
  }

  return frames;
};
