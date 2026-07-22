import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateDequeFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = 5;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Slot' },
    { color: 'bg-emerald-500', label: 'Front of Deque' },
    { color: 'bg-violet-500', label: 'Rear of Deque' },
    { color: 'bg-indigo-600', label: 'Filled Slot' },
    { color: 'bg-rose-500', label: 'Overflow/Underflow Warning' },
  ];

  // Helper to generate GraphData representing deque of size 5
  const getDequeGraphData = (arr: (number | null)[], front: number, rear: number, activeIdx?: number, errorIdx?: number): GraphData => {
    const nodes = [];
    const isEmptyQueue = front === -1;

    for (let i = 0; i < capacity; i++) {
      const val = arr[i];
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

  const arr: (number | null)[] = Array(capacity).fill(null);
  let front = -1;
  let rear = -1;

  const isFull = (): boolean => {
    return (front === 0 && rear === capacity - 1) || front === rear + 1;
  };

  const isEmpty = (): boolean => {
    return front === -1;
  };

  const pushFrame = (
    description: string,
    activeIdx?: number,
    errorIdx?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getDequeGraphData(arr, front, rear, activeIdx, errorIdx);
    const pointers: Record<string, string> = {};

    if (front !== -1) {
      pointers['front'] = String(front);
    }
    if (rear !== -1) {
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
        deque: arr.filter(v => v !== null),
        isEmpty: isEmpty(),
        isFull: isFull(),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial Empty State
  pushFrame('Deque initialized. Capacity: 5. Empty State.', undefined, undefined, 1);

  // 2. Insert Rear 10
  front = 0;
  rear = 0;
  arr[rear] = 10;
  pushFrame('insertRear(10): Deque was empty. Initialized front, rear to 0 and added 10.', undefined, undefined, 20);

  // 3. Insert Rear 20
  rear = (rear + 1) % capacity;
  arr[rear] = 20;
  pushFrame('insertRear(20): Incremented rear to 1 and added 20.', undefined, undefined, 25);

  // 4. Insert Front 30 (Wrap-around!)
  front = capacity - 1; // 4
  arr[front] = 30;
  pushFrame('insertFront(30): Wrap-around! Decremented front to 4 and added 30.', undefined, undefined, 11);

  // 5. Insert Front 40
  front = front - 1; // 3
  arr[front] = 40;
  pushFrame('insertFront(40): Decremented front to 3 and added 40.', undefined, undefined, 13);

  // 6. Delete Rear
  let val = arr[rear];
  arr[rear] = null;
  rear = rear - 1; // 0
  pushFrame(`deleteRear(): Removed element at rear (value: ${val}). Decremented rear to 0.`, undefined, undefined, 45);

  // 7. Delete Front
  val = arr[front];
  arr[front] = null;
  front = (front + 1) % capacity; // 4
  pushFrame(`deleteFront(): Removed element at front (value: ${val}). Incremented front to 4.`, undefined, undefined, 38);

  // 8. Insert Rear 50
  rear = rear + 1; // 1
  arr[rear] = 50;
  pushFrame('insertRear(50): Incremented rear to 1 and added 50.', undefined, undefined, 25);

  // 9. Insert Rear 60
  rear = rear + 1; // 2
  arr[rear] = 60;
  pushFrame('insertRear(60): Incremented rear to 2 and added 60. Deque is now FULL.', undefined, undefined, 25);

  // 10. isFull check
  pushFrame('Checking if deque is full. front is rear + 1 (3 === 2 + 1), so isFull() = true.', undefined, undefined, 51);

  // 11. Overflow Insert Rear 70
  pushFrame('insertRear(70): Deque Overflow! Cannot insert into a full deque.', undefined, undefined, 18);

  // 12. Delete Front
  val = arr[front];
  arr[front] = null;
  front = (front + 1) % capacity; // 0
  pushFrame(`deleteFront(): Removed element at front (value: ${val}). Incremented front to 0.`, undefined, undefined, 38);

  // 13. Delete Front
  val = arr[front];
  arr[front] = null;
  front = (front + 1) % capacity; // 1
  pushFrame(`deleteFront(): Removed element at front (value: ${val}). Incremented front to 1.`, undefined, undefined, 38);

  // 14. Delete Front
  val = arr[front];
  arr[front] = null;
  front = (front + 1) % capacity; // 2
  pushFrame(`deleteFront(): Removed element at front (value: ${val}). Incremented front to 2.`, undefined, undefined, 38);

  // 15. Delete Front (last element)
  val = arr[front];
  arr[front] = null;
  front = -1;
  rear = -1;
  pushFrame(`deleteFront(): Removed last element (value: ${val}). Reset pointers to -1. Deque is empty.`, undefined, undefined, 36);

  // 16. Underflow Delete Front
  pushFrame('deleteFront(): Deque Underflow! Cannot delete from an empty deque.', undefined, undefined, 32);

  return frames;
};
