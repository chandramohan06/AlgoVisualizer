import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateFactorialFrames = (n: number = 5): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-amber-400', label: 'Current Execution Frame' },
    { color: 'bg-indigo-600', label: 'Call Stack Frame' },
    { color: 'bg-emerald-500', label: 'Returned Value / Base Case' },
  ];

  // Helper to map call stack list to GraphData
  // Stack grows downwards visually or upwards. Let's list from bottom to top.
  const getStackGraphData = (stack: { val: number; returned?: number }[], activeIdx: number): GraphData => {
    const nodes = stack.map((frame, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'highlighted';
      if (idx === activeIdx) {
        status = 'warning';
      }
      if (frame.returned !== undefined) {
        status = 'success';
      }

      const displayValue = frame.returned !== undefined 
        ? `fact(${frame.val}) = ${frame.returned}` 
        : `fact(${frame.val}) = ?`;

      return {
        id: String(idx),
        value: displayValue,
        x: 0,
        y: 0,
        label: `Frame ${idx}`,
        status,
      };
    });

    return {
      nodes,
      edges: [],
      layout: 'linear-vertical',
    };
  };

  const stack: { val: number; returned?: number }[] = [];

  const pushFrame = (description: string, activeIdx: number, codeLineHighlight: number = 0) => {
    const data = getStackGraphData(stack, activeIdx);
    const pointers: Record<string, string> = {
      active: String(activeIdx),
    };

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: [String(activeIdx)],
      pointers,
      codeLineHighlight,
      variables: {
        callStack: stack.map(f => `factorial(${f.val})`),
        currentN: stack[activeIdx]?.val || 0,
        depth: stack.length,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Simulate call phase
  for (let i = n; i >= 1; i--) {
    stack.push({ val: i });
    const depth = stack.length;
    if (i > 1) {
      pushFrame(`Called factorial(${i}). Pushed to stack. Deepening recursion.`, depth - 1, 6);
    } else {
      stack[depth - 1].returned = 1;
      pushFrame(`factorial(1) reached. Base case hit! Returns 1.`, depth - 1, 4);
    }
  }

  // Simulate return phase
  let currentVal = 1;
  for (let i = 2; i <= n; i++) {
    // Current stack index to resolve is at index n - i
    const activeIdx = n - i;
    currentVal = i * currentVal;
    stack[activeIdx].returned = currentVal;
    
    // Pop top frame from visual representation by shortening array in subsequent frames
    stack.splice(activeIdx + 1);
    
    pushFrame(`Returned from child frame. Resolved factorial(${i}) = ${i} * factorial(${i - 1}) = ${currentVal}.`, activeIdx, 6);
  }

  return frames;
};
