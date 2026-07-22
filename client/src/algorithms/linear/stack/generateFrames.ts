import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateStackFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = 5;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Slot' },
    { color: 'bg-emerald-500', label: 'Active/Top of Stack' },
    { color: 'bg-indigo-600', label: 'Filled Slot' },
    { color: 'bg-rose-500', label: 'Overflow/Underflow Warning' },
  ];

  // Helper to generate GraphData representing stack of size 5
  // We place nodes so index 0 is visual top and index 4 is visual bottom.
  // The stack elements start from bottom (index 4) up to index 4 - top.
  const getStackGraphData = (stackArr: number[], topIdx: number, activeIdx?: number, errorIdx?: number): GraphData => {
    const nodes = [];
    for (let i = 0; i < capacity; i++) {
      // Index of value in stackArr
      // e.g. if capacity is 5, topIdx is 0 (one element at bottom index 4), stackArr[0] is at index 4
      const stackValIdx = capacity - 1 - i;
      const isFilled = stackValIdx <= topIdx;
      const val = isFilled ? stackArr[stackValIdx] : null;

      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      if (isFilled) {
        status = 'highlighted'; // Filled
        if (i === activeIdx) {
          status = 'success'; // Top of Stack
        }
      }
      if (i === errorIdx) {
        status = 'danger'; // Error/Overflow
      }

      nodes.push({
        id: String(i),
        value: val !== null ? String(val) : '-',
        x: 0, // Calculated automatically by LinearVerticalLayout
        y: 0,
        label: `[${stackValIdx}]`,
        status,
      });
    }

    return {
      nodes,
      edges: [],
      layout: 'linear-vertical',
    };
  };

  const stack: number[] = [];
  let top = -1;

  const pushFrame = (
    description: string,
    activeIdx?: number,
    errorIdx?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getStackGraphData(stack, top, activeIdx, errorIdx);
    const pointers: Record<string, string> = {};
    if (top !== -1) {
      // Pointer points to the visual node index (capacity - 1 - top)
      pointers['top'] = String(capacity - 1 - top);
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeIdx !== undefined ? [String(activeIdx)] : [],
      pointers,
      codeLineHighlight,
      variables: {
        stack: [...stack],
        top,
        isEmpty: top === -1,
        isFull: top === capacity - 1,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial Empty Stack
  pushFrame('Stack initialized. Capacity: 5. Empty State.', undefined, undefined, 1);

  // 2. isEmpty check
  pushFrame('Checking if stack is empty. top is -1, so isEmpty() = true.', undefined, undefined, 29);

  // 3. Push 10
  top++;
  stack.push(10);
  pushFrame('push(10): Stack is not full. Incremented top to 0 and pushed 10.', capacity - 1 - top, undefined, 9);

  // 4. Push 20
  top++;
  stack.push(20);
  pushFrame('push(20): Incremented top to 1 and pushed 20.', capacity - 1 - top, undefined, 14);

  // 5. Push 30
  top++;
  stack.push(30);
  pushFrame('push(30): Incremented top to 2 and pushed 30.', capacity - 1 - top, undefined, 14);

  // 6. Peek
  pushFrame(`peek(): Returns the top element of the stack (value: ${stack[top]}) without removing it.`, capacity - 1 - top, undefined, 24);

  // 7. Pop
  const poppedVal = stack.pop()!;
  top--;
  // Temporarily show the popped element highlighted as warning before frame updates
  pushFrame(`pop(): Returns and removes the top element (value: ${poppedVal}). Decremented top to 1.`, undefined, undefined, 17);

  // 8. Push 40
  top++;
  stack.push(40);
  pushFrame('push(40): Incremented top to 2 and pushed 40.', capacity - 1 - top, undefined, 14);

  // 9. Push 50
  top++;
  stack.push(50);
  pushFrame('push(50): Incremented top to 3 and pushed 50.', capacity - 1 - top, undefined, 14);

  // 10. Push 60
  top++;
  stack.push(60);
  pushFrame('push(60): Incremented top to 4 and pushed 60. Stack is now FULL.', capacity - 1 - top, undefined, 14);

  // 11. isFull check
  pushFrame('Checking if stack is full. top is capacity - 1 (4), so isFull() = true.', capacity - 1 - top, undefined, 33);

  // 12. Overflow Push 70
  // Display slot 0 in danger color to show overflow
  pushFrame('push(70): Stack Overflow! Cannot push onto a full stack.', undefined, 0, 11);

  // 13. Clear
  stack.length = 0;
  top = -1;
  pushFrame('clear(): Cleared the stack. Reset top to -1.', undefined, undefined, 1);

  // 14. Pop on empty stack (underflow)
  pushFrame('pop(): Stack Underflow! Cannot pop from an empty stack.', undefined, undefined, 19);

  return frames;
};
