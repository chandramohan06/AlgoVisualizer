import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateQueueFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = 5;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Slot' },
    { color: 'bg-emerald-500', label: 'Front of Queue' },
    { color: 'bg-violet-500', label: 'Rear of Queue' },
    { color: 'bg-indigo-600', label: 'Filled Slot' },
    { color: 'bg-rose-500', label: 'Overflow/Underflow Warning' },
  ];

  // Helper to generate GraphData representing queue of size 5
  // We place nodes so index 0 is visual left and index 4 is visual right.
  const getQueueGraphData = (queueArr: (number | null)[], front: number, rear: number, activeIdx?: number, errorIdx?: number): GraphData => {
    const nodes = [];
    const isEmptyQueue = front > rear || rear === -1;

    for (let i = 0; i < capacity; i++) {
      const val = queueArr[i];
      const isFilled = val !== null && !isEmptyQueue && i >= front && i <= rear;

      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      if (isFilled) {
        status = 'highlighted';
        if (i === front) {
          status = 'success'; // Front
        } else if (i === rear) {
          status = 'warning'; // Rear
        }
      }
      if (i === activeIdx) {
        status = 'success';
      }
      if (i === errorIdx) {
        status = 'danger'; // Overflow
      }

      nodes.push({
        id: String(i),
        value: val !== null ? String(val) : '-',
        x: 0, // Calculated automatically by LinearHorizontalLayout
        y: 0,
        label: `idx:${i}`,
        status,
      });
    }

    return {
      nodes,
      edges: [],
      layout: 'linear-horizontal',
    };
  };

  const queueArr: (number | null)[] = Array(capacity).fill(null);
  let front = 0;
  let rear = -1;

  const pushFrame = (
    description: string,
    activeIdx?: number,
    errorIdx?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getQueueGraphData(queueArr, front, rear, activeIdx, errorIdx);
    const pointers: Record<string, string> = {};
    const isEmptyQueue = front > rear || rear === -1;

    if (!isEmptyQueue) {
      pointers['front'] = String(front);
      pointers['rear'] = String(rear);
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeIdx !== undefined ? [String(activeIdx)] : [],
      pointers,
      codeLineHighlight,
      variables: {
        front,
        rear,
        queue: queueArr.filter(v => v !== null),
        isEmpty: isEmptyQueue,
        isFull: rear === capacity - 1,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Queue initialized. Capacity: 5. Empty State.', undefined, undefined, 1);

  // 2. isEmpty check
  pushFrame('Checking if queue is empty. No elements present, so isEmpty() = true.', undefined, undefined, 24);

  // 3. Enqueue 10
  rear++;
  queueArr[rear] = 10;
  pushFrame('enqueue(10): Incremented rear and added 10.', undefined, undefined, 5);

  // 4. Enqueue 20
  rear++;
  queueArr[rear] = 20;
  pushFrame('enqueue(20): Incremented rear and added 20.', undefined, undefined, 10);

  // 5. Enqueue 30
  rear++;
  queueArr[rear] = 30;
  pushFrame('enqueue(30): Incremented rear and added 30.', undefined, undefined, 10);

  // 6. Peek Front
  pushFrame(`peekFront(): Returns element at front of queue (value: ${queueArr[front]}).`, front, undefined, 20);

  // 7. Dequeue
  const dequeuedVal = queueArr[front];
  queueArr[front] = null;
  front++;
  pushFrame(`dequeue(): Removed and returned front element (value: ${dequeuedVal}). Incremented front to 1.`, undefined, undefined, 13);

  // 8. Enqueue 40
  rear++;
  queueArr[rear] = 40;
  pushFrame('enqueue(40): Incremented rear and added 40.', undefined, undefined, 10);

  // 9. Enqueue 50
  rear++;
  queueArr[rear] = 50;
  pushFrame('enqueue(50): Incremented rear and added 50. Queue is now FULL.', undefined, undefined, 10);

  // 10. isFull check
  pushFrame('Checking if queue is full. rear is capacity - 1 (4), so isFull() = true.', undefined, undefined, 28);

  // 11. Overflow Enqueue 60
  pushFrame('enqueue(60): Queue Overflow! Cannot enqueue into a full queue.', undefined, 4, 7);

  // 12. Clear
  queueArr.fill(null);
  front = 0;
  rear = -1;
  pushFrame('clear(): Cleared all elements in queue. Reset pointers.', undefined, undefined, 1);

  // 13. Underflow Dequeue
  pushFrame('dequeue(): Queue Underflow! Cannot dequeue from an empty queue.', undefined, undefined, 15);

  return frames;
};
