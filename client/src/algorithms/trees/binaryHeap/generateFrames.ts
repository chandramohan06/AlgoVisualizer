import { type VisualizationFrame } from '@store/visualizationStore';
import { BinaryHeap } from './BinaryHeap';
import type { HeapType } from './types';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';

function heapToGraphData<T>(heap: { value: T; id: string; index: number }[]): GraphData<T> {
  const nodes: GenericNode<T>[] = [];
  const edges: GenericEdge[] = [];

  const NODE_WIDTH = 50;
  const NODE_GAP = 30;
  const START_X = 50;
  const START_Y = 50;

  heap.forEach((item, idx) => {
    const level = Math.floor(Math.log2(idx + 1));
    const positionInLevel = idx - Math.pow(2, level) + 1;
    const nodesInLevel = Math.pow(2, level);
    const levelWidth = nodesInLevel * (NODE_WIDTH + NODE_GAP);
    const x = START_X + positionInLevel * (NODE_WIDTH + NODE_GAP) + (800 - levelWidth) / 2;
    const y = START_Y + level * 60;

    nodes.push({
      id: item.id,
      value: item.value,
      x,
      y,
      label: `idx:${idx}`,
    });
  });

  // Create edges for heap structure
  heap.forEach((item, idx) => {
    const leftChildIdx = 2 * idx + 1;
    const rightChildIdx = 2 * idx + 2;

    if (leftChildIdx < heap.length) {
      edges.push({
        id: `${item.id}-${heap[leftChildIdx].id}`,
        source: item.id,
        target: heap[leftChildIdx].id,
        directed: true,
      });
    }

    if (rightChildIdx < heap.length) {
      edges.push({
        id: `${item.id}-${heap[rightChildIdx].id}`,
        source: item.id,
        target: heap[rightChildIdx].id,
        directed: true,
      });
    }
  });

  return { nodes, edges, layout: 'tree' };
}

export const generateBinaryHeapFrames = (
  operation: 'create' | 'insert' | 'extract' | 'buildHeap',
  initialValues: number[],
  operationValue?: number,
  heapType: HeapType = 'min',
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const heap = new BinaryHeap<number>(heapType);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Active' },
    { color: 'bg-emerald-500', label: 'Success' },
    { color: 'bg-violet-500', label: 'Swapped' },
  ];

  if (operation === 'buildHeap') {
    frames.push({
      index: frameIdx++,
      description: `Building ${heapType} heap from array: [${initialValues.join(', ')}]`,
      data: { nodes: [], edges: [] },
      highlights: [],
      pointers: {} as Record<string, string | number>,
      codeLineHighlight: 0,
      variables: { size: 0 },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    heap.buildHeap(initialValues);
    frames.push({
      index: frameIdx++,
      description: `Heap built successfully. Size: ${heap.size()}`,
      data: heapToGraphData(heap.heap),
      highlights: [],
      pointers: {} as Record<string, string | number>,
      codeLineHighlight: 1,
      variables: { size: heap.size() },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    return frames;
  }

  initialValues.forEach(value => heap.insert(value));

  const createHeapFrame = (description: string, activeNodeId?: string, swappedNodeIds: string[] = [], codeLine: number = 0) => {
    const graphData = heapToGraphData(heap.heap);
    const statusMap: Record<string, any> = {};
    
    swappedNodeIds.forEach(id => {
      statusMap[id] = 'warning';
    });
    
    if (activeNodeId) {
      statusMap[activeNodeId] = 'highlighted';
    }

    return {
      index: frameIdx++,
      description,
      data: graphData,
      highlights: activeNodeId ? [activeNodeId] : [],
      pointers: activeNodeId ? { current: activeNodeId } as Record<string, string | number> : {} as Record<string, string | number>,
      codeLineHighlight: codeLine,
      variables: { size: heap.size(), root: heap.peek() },
      meta: {
        statusMap,
        legend: baseLegend,
      },
      timestamp: frameIdx * 600,
    };
  };

  frames.push(createHeapFrame(
    `${heapType} heap initialized with ${initialValues.length} nodes: [${initialValues.join(', ')}]`,
  ));

  switch (operation) {
    case 'create':
      frames.push(createHeapFrame('Heap creation complete.', undefined, [], 1));
      break;

    case 'insert':
      if (operationValue !== undefined) {
        frames.push(createHeapFrame(`Inserting value ${operationValue} into heap.`, undefined, [], 2));
        heap.insert(operationValue);
        frames.push(createHeapFrame(`Value ${operationValue} inserted and heapified.`, undefined, [], 3));
      }
      break;

    case 'extract':
      frames.push(createHeapFrame(`Extracting ${heapType} element from heap.`, heap.heap[0]?.id, [], 4));
      const extracted = heap.extract();
      frames.push(createHeapFrame(
        `Extracted value: ${extracted}. Heap restructured.`,
        heap.heap[0]?.id,
        [],
        5,
      ));
      break;
  }

  return frames;
};
