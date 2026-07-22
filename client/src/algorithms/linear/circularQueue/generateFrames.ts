import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateCircularQueueFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = 6;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Slot' },
    { color: 'bg-emerald-500', label: 'Front of Queue' },
    { color: 'bg-violet-500', label: 'Rear of Queue' },
    { color: 'bg-indigo-600', label: 'Filled Slot' },
    { color: 'bg-rose-500', label: 'Overflow/Underflow Warning' },
  ];

  // Helper to generate GraphData representing circular queue of size 6
  // Layout is radial (computed by RadialLayout)
  const getCircularQueueGraphData = (queueArr: (number | null)[], front: number, rear: number, activeIdx?: number, errorIdx?: number): GraphData => {
    const nodes = [];
    const isEmptyQueue = front === -1;

    for (let i = 0; i < capacity; i++) {
      const val = queueArr[i];
      let isFilled = false;

      if (!isEmptyQueue) {
        if (front <= rear) {
          isFilled = i >= front && i <= rear;
        } else {
          isFilled = i >= front || i <= rear;
        }
      }

      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      if (isFilled && val !== null) {
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
        x: 0, // Calculated automatically by RadialLayout
        y: 0,
        label: `idx:${i}`,
        status,
      });
    }

    return {
      nodes,
      edges: [],
      layout: 'radial',
    };
  };

  const queueArr: (number | null)[] = Array(capacity).fill(null);
  let front = -1;
  let rear = -1;

  const pushFrame = (
    description: string,
    activeIdx?: number,
    errorIdx?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getCircularQueueGraphData(queueArr, front, rear, activeIdx, errorIdx);
    const pointers: Record<string, string> = {};

    if (front !== -1) {
      pointers['front'] = String(front);
    }
    if (rear !== -1) {
      pointers['rear'] = String(rear);
    }

    const isEmptyQueue = front === -1;
    const isFullQueue = (rear + 1) % capacity === front;

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
        isFull: isFullQueue,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Circular Queue initialized. Capacity: 6. Empty State.', undefined, undefined, 1);

  // 2. isEmpty check
  pushFrame('Checking if circular queue is empty. front is -1, so isEmpty() = true.', undefined, undefined, 17);

  // 3. Enqueue 10
  front = 0;
  rear = 0;
  queueArr[rear] = 10;
  pushFrame('enqueue(10): Queue empty. Set front to 0, rear to 0 and added 10.', undefined, undefined, 5);

  // 4. Enqueue 20
  rear = (rear + 1) % capacity;
  queueArr[rear] = 20;
  pushFrame('enqueue(20): Incremented rear to 1 and added 20.', undefined, undefined, 8);

  // 5. Enqueue 30
  rear = (rear + 1) % capacity;
  queueArr[rear] = 30;
  pushFrame('enqueue(30): Incremented rear to 2 and added 30.', undefined, undefined, 8);

  // 6. Enqueue 40
  rear = (rear + 1) % capacity;
  queueArr[rear] = 40;
  pushFrame('enqueue(40): Incremented rear to 3 and added 40.', undefined, undefined, 8);

  // 7. Enqueue 50
  rear = (rear + 1) % capacity;
  queueArr[rear] = 50;
  pushFrame('enqueue(50): Incremented rear to 4 and added 50.', undefined, undefined, 8);

  // 8. Dequeue
  let popped = queueArr[front];
  queueArr[front] = null;
  front = (front + 1) % capacity;
  pushFrame(`dequeue(): Removed and returned front element (value: ${popped}). front moved to 1.`, undefined, undefined, 13);

  // 9. Dequeue
  popped = queueArr[front];
  queueArr[front] = null;
  front = (front + 1) % capacity;
  pushFrame(`dequeue(): Removed and returned front element (value: ${popped}). front moved to 2.`, undefined, undefined, 13);

  // 10. Enqueue 60
  rear = (rear + 1) % capacity;
  queueArr[rear] = 60;
  pushFrame('enqueue(60): Incremented rear to 5 and added 60.', undefined, undefined, 8);

  // 11. Enqueue 70 (Wrap-around!)
  rear = (rear + 1) % capacity; // (5 + 1) % 6 = 0
  queueArr[rear] = 70;
  pushFrame('enqueue(70): Wrap-around! rear wrapped from 5 to 0. Pushed 70 at slot 0.', undefined, undefined, 8);

  // 12. Enqueue 80
  rear = (rear + 1) % capacity; // 1
  queueArr[rear] = 80;
  pushFrame('enqueue(80): Incremented rear to 1 and added 80. Queue is now FULL.', undefined, undefined, 8);

  // 13. isFull check
  pushFrame('Checking if circular queue is full. (rear + 1) % capacity = front (2), so isFull() = true.', undefined, undefined, 21);

  // 14. Overflow Enqueue 90
  pushFrame('enqueue(90): Queue Overflow! Cannot enqueue into a full circular queue.', undefined, 2, 4);

  // 15. Clear
  queueArr.fill(null);
  front = -1;
  rear = -1;
  pushFrame('clear(): Reset front and rear pointers to -1. Queue empty.', undefined, undefined, 1);

  // 16. Underflow Dequeue
  pushFrame('dequeue(): Queue Underflow! Cannot dequeue from an empty circular queue.', undefined, undefined, 15);

  return frames;
};
