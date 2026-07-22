import { type VisualizationFrame } from '@store/visualizationStore';
import { SinglyLinkedList } from './SinglyLinkedList';
import type { LinkedListData } from './types';

const NODE_WIDTH = 60;
const NODE_GAP = 40;
const START_X = 50;
const START_Y = 100;

function calculateNodePositions(nodes: { id: string; value: number }[]): LinkedListData<number> {
  const positionedNodes = nodes.map((node, idx) => ({
    id: node.id,
    value: node.value,
    x: START_X + idx * (NODE_WIDTH + NODE_GAP),
    y: START_Y,
  }));

  const edges = positionedNodes.map((node, idx) => ({
    from: node.id,
    to: idx < positionedNodes.length - 1 ? positionedNodes[idx + 1].id : null,
  }));

  return {
    nodes: positionedNodes,
    edges,
  };
}

export const generateSinglyLinkedListFrames = (
  operation: 'create' | 'insertHead' | 'insertTail' | 'insertIndex' | 'deleteHead' | 'deleteTail' | 'deleteIndex' | 'search' | 'update' | 'reverse',
  initialValues: number[],
  operationValue?: number,
  operationIndex?: number,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const list = new SinglyLinkedList<number>();
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-indigo-600', label: 'Head' },
    { color: 'bg-purple-600', label: 'Tail' },
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
    `Singly Linked List initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
    {},
    {},
    0,
  ));

  switch (operation) {
    case 'create':
      frames.push(createListFrame(
        'List creation complete.',
        {},
        {},
        1,
      ));
      break;

    case 'insertHead':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Inserting value ${operationValue} at head.`,
          {},
          {},
          2,
        ));
        
        list.insertAtHead(operationValue);
        frames.push(createListFrame(
          `Value ${operationValue} inserted at head. New size: ${list.size}.`,
          { statusMap: { [list.head?.id || '']: 'success' } },
          { new: list.head?.id || '' },
          3,
        ));
      }
      break;

    case 'insertTail':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Inserting value ${operationValue} at tail.`,
          {},
          { tail: list.tail?.id || '' },
          4,
        ));
        
        list.insertAtTail(operationValue);
        frames.push(createListFrame(
          `Value ${operationValue} inserted at tail. New size: ${list.size}.`,
          { statusMap: { [list.tail?.id || '']: 'success' } },
          { new: list.tail?.id || '' },
          5,
        ));
      }
      break;

    case 'insertIndex':
      if (operationValue !== undefined && operationIndex !== undefined) {
        frames.push(createListFrame(
          `Inserting value ${operationValue} at index ${operationIndex}.`,
          {},
          {},
          6,
        ));
        
        const result = list.insertAtIndex(operationValue, operationIndex);
        if (result) {
          frames.push(createListFrame(
            `Value ${operationValue} inserted at index ${operationIndex}. New size: ${list.size}.`,
            { statusMap: { [result.id]: 'success' } },
            { new: result.id },
            7,
          ));
        } else {
          frames.push(createListFrame(
            `Invalid index ${operationIndex}. Insertion failed.`,
            {},
            {},
            8,
          ));
        }
      }
      break;

    case 'deleteHead':
      frames.push(createListFrame(
        'Deleting head node.',
        { statusMap: { [list.head?.id || '']: 'danger' } },
        { head: list.head?.id || '' },
        9,
      ));
      
      const deletedHead = list.deleteHead();
      frames.push(createListFrame(
        `Head node with value ${deletedHead?.value} deleted. New size: ${list.size}.`,
        {},
        {},
        10,
      ));
      break;

    case 'deleteTail':
      frames.push(createListFrame(
        'Deleting tail node.',
        { statusMap: { [list.tail?.id || '']: 'danger' } },
        { tail: list.tail?.id || '' },
        11,
      ));
      
      const deletedTail = list.deleteTail();
      frames.push(createListFrame(
        `Tail node with value ${deletedTail?.value} deleted. New size: ${list.size}.`,
        {},
        {},
        12,
      ));
      break;

    case 'deleteIndex':
      if (operationIndex !== undefined) {
        frames.push(createListFrame(
          `Deleting node at index ${operationIndex}.`,
          {},
          {},
          13,
        ));
        
        const deletedAtIndex = list.deleteAtIndex(operationIndex);
        if (deletedAtIndex) {
          frames.push(createListFrame(
            `Node with value ${deletedAtIndex.value} at index ${operationIndex} deleted. New size: ${list.size}.`,
            {},
            {},
            14,
          ));
        } else {
          frames.push(createListFrame(
            `Invalid index ${operationIndex}. Deletion failed.`,
            {},
            {},
            15,
          ));
        }
      }
      break;

    case 'search':
      if (operationValue !== undefined) {
        frames.push(createListFrame(
          `Searching for value ${operationValue}.`,
          {},
          {},
          16,
        ));
        
        const nodes = list.toNodesArray();
        const statusMap: Record<string, any> = {};
        
        for (let i = 0; i < nodes.length; i++) {
          statusMap[nodes[i].id] = 'warning';
          frames.push(createListFrame(
            `Checking node at index ${i}: value = ${nodes[i].value}`,
            { statusMap: { ...statusMap } },
            { current: nodes[i].id },
            17,
          ));
          
          if (nodes[i].value === operationValue) {
            statusMap[nodes[i].id] = 'success';
            frames.push(createListFrame(
              `Value ${operationValue} found at index ${i}!`,
              { statusMap: { ...statusMap } },
              { found: nodes[i].id },
              18,
            ));
            return frames;
          }
          
          statusMap[nodes[i].id] = 'visited';
        }
        
        frames.push(createListFrame(
          `Value ${operationValue} not found in the list.`,
          { statusMap },
          {},
          19,
        ));
      }
      break;

    case 'update':
      if (operationValue !== undefined && operationIndex !== undefined) {
        frames.push(createListFrame(
          `Updating node at index ${operationIndex} to value ${operationValue}.`,
          {},
          {},
          20,
        ));
        
        const success = list.update(operationIndex, operationValue);
        if (success) {
          const nodes = list.toNodesArray();
          frames.push(createListFrame(
            `Node at index ${operationIndex} updated to value ${operationValue}.`,
            { statusMap: { [nodes[operationIndex].id]: 'success' } },
            { updated: nodes[operationIndex].id },
            21,
          ));
        } else {
          frames.push(createListFrame(
            `Invalid index ${operationIndex}. Update failed.`,
            {},
            {},
            22,
          ));
        }
      }
      break;

    case 'reverse':
      frames.push(createListFrame(
        'Reversing the linked list.',
        {},
        {},
        23,
      ));
      
      list.reverse();
      frames.push(createListFrame(
        'Linked list reversed successfully.',
        {},
        {},
        24,
      ));
      break;
  }

  return frames;
};
