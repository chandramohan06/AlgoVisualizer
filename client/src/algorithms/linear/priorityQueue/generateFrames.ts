import { type VisualizationFrame } from '@store/visualizationStore';
import type { GenericNode, GenericEdge, GraphData } from '@components/visualizer/nodeEngine/types';
import { BinaryHeap } from '../../trees/binaryHeap/BinaryHeap';

export const generatePriorityQueueFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Heap Node' },
    { color: 'bg-emerald-500', label: 'Minimum Element (Root)' },
    { color: 'bg-amber-400', label: 'Active Node' },
    { color: 'bg-rose-500', label: 'Underflow Warning' },
  ];

  const heap = new BinaryHeap<number>('min');

  // Convert heap array to GraphData
  const getHeapGraphData = (activeId?: string, errorNodeId?: string): GraphData => {
    const nodes: GenericNode[] = [];
    const edges: GenericEdge[] = [];

    heap.heap.forEach((node, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'default';
      if (idx === 0) {
        status = 'success'; // Root
      }
      if (node.id === activeId) {
        status = 'warning'; // Active
      }
      if (node.id === errorNodeId) {
        status = 'danger'; // Error
      }

      nodes.push({
        id: node.id,
        value: node.value,
        x: 0, // Calculated automatically by TreeLayout
        y: 0,
        label: `idx:${idx}`,
        status,
      });

      // Add parent-child edges
      const leftChild = 2 * idx + 1;
      const rightChild = 2 * idx + 2;

      if (leftChild < heap.heap.length) {
        edges.push({
          id: `edge-${node.id}-${heap.heap[leftChild].id}`,
          source: node.id,
          target: heap.heap[leftChild].id,
          directed: true,
        });
      }
      if (rightChild < heap.heap.length) {
        edges.push({
          id: `edge-${node.id}-${heap.heap[rightChild].id}`,
          source: node.id,
          target: heap.heap[rightChild].id,
          directed: true,
        });
      }
    });

    return {
      nodes,
      edges,
      layout: 'tree',
    };
  };

  const pushFrame = (
    description: string,
    activeId?: string,
    errorNodeId?: string,
    codeLineHighlight: number = 0,
  ) => {
    const data = getHeapGraphData(activeId, errorNodeId);
    const pointers: Record<string, string> = {};
    if (heap.heap.length > 0) {
      pointers['min'] = heap.heap[0].id;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeId ? [activeId] : [],
      pointers,
      codeLineHighlight,
      variables: {
        heapArray: heap.toArray(),
        size: heap.size(),
        min: heap.peek(),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Priority Queue (Min-Heap) initialized. Empty State.', undefined, undefined, 1);

  // 2. Insert 30
  heap.insert(30);
  pushFrame('insert(30): Inserted 30 as root node of heap.', heap.heap[0]?.id, undefined, 2);

  // 3. Insert 10
  heap.insert(10);
  pushFrame('insert(10): Inserted 10 at index 1 and heapified up to root since 10 < 30.', heap.heap[0]?.id, undefined, 4);

  // 4. Insert 20
  heap.insert(20);
  pushFrame('insert(20): Inserted 20 at index 2. No heapify up required (20 > 10).', heap.heap[2]?.id, undefined, 4);

  // 5. Insert 5
  heap.insert(5);
  pushFrame('insert(5): Inserted 5 at index 3 and heapified up to root (5 < 10).', heap.heap[0]?.id, undefined, 4);

  // 6. Peek
  pushFrame(`peek(): Returns the minimum element at the root (value: ${heap.peek()}).`, heap.heap[0]?.id, undefined, 30);

  // 7. Extract Min
  const minVal = heap.extract();
  pushFrame(`extractMin(): Extracted min element (value: ${minVal}). Swapped last element to root and heapified down.`, heap.heap[0]?.id, undefined, 10);

  // 8. Extract Max (Custom implementation on Min-Heap)
  // Scan heap array for max value
  if (heap.heap.length > 0) {
    let maxIdx = 0;
    for (let i = 1; i < heap.heap.length; i++) {
      if (heap.heap[i].value > heap.heap[maxIdx].value) {
        maxIdx = i;
      }
    }
    const maxVal = heap.heap[maxIdx].value;

    // Perform swap & pop logic locally
    const last = heap.heap.pop()!;
    if (maxIdx < heap.heap.length) {
      heap.heap[maxIdx] = last;
      heap.heap[maxIdx].index = maxIdx;
      // heapify down and up
      // let's do a simple heapify
      for (let i = Math.floor(heap.heap.length / 2) - 1; i >= 0; i--) {
        // rebuild heap is safe and O(N)
        // heapify down at maxIdx
        let idx = maxIdx;
        while (true) {
          const left = 2 * idx + 1;
          const right = 2 * idx + 2;
          let smallest = idx;
          if (left < heap.heap.length && heap.heap[left].value < heap.heap[smallest].value) smallest = left;
          if (right < heap.heap.length && heap.heap[right].value < heap.heap[smallest].value) smallest = right;
          if (smallest !== idx) {
            [heap.heap[idx], heap.heap[smallest]] = [heap.heap[smallest], heap.heap[idx]];
            heap.heap[idx].index = idx;
            heap.heap[smallest].index = smallest;
            idx = smallest;
          } else break;
        }
      }
    }

    pushFrame(`extractMax(): Scanned heap leaves to find maximum element (value: ${maxVal}). Removed and reheapified.`, undefined, undefined, 20);
  }

  // 9. Extract Min 2
  const minVal2 = heap.extract();
  pushFrame(`extractMin(): Extracted next min element (value: ${minVal2}).`, heap.heap[0]?.id, undefined, 10);

  // 10. Extract Min 3
  const minVal3 = heap.extract();
  pushFrame(`extractMin(): Extracted last element (value: ${minVal3}). Heap is now empty.`, undefined, undefined, 12);

  // 11. Underflow Extract Min
  pushFrame('extractMin(): Priority Queue Underflow! Cannot extract from an empty queue.', undefined, undefined, 8);

  return frames;
};
