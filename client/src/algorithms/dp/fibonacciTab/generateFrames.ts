import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateFibonacciTabFrames = (n: number = 5): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = n + 1;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Uncalculated DP Cell' },
    { color: 'bg-emerald-500', label: 'Computed DP Cell (F[i])' },
    { color: 'bg-amber-400', label: 'Input Dependency Cells (F[i-1], F[i-2])' },
  ];

  const dp: (number | null)[] = Array(capacity).fill(null);

  const getTabGraphData = (activeIdxs: number[], computedIdx?: number): GraphData => {
    const nodes = [];
    for (let i = 0; i < capacity; i++) {
      const val = dp[i];
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      
      if (val !== null) {
        status = 'success';
      }
      if (activeIdxs.includes(i)) {
        status = 'warning';
      }
      if (i === computedIdx) {
        status = 'success';
      }

      nodes.push({
        id: String(i),
        value: val !== null ? String(val) : '-',
        x: 0,
        y: 0,
        label: `dp[${i}]`,
        status,
      });
    }

    return {
      nodes,
      edges: [],
      layout: 'linear-horizontal',
    };
  };

  const pushFrame = (
    description: string,
    activeIdxs: number[],
    computedIdx?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getTabGraphData(activeIdxs, computedIdx);
    const pointers: Record<string, string> = {};
    if (computedIdx !== undefined) {
      pointers['i'] = String(computedIdx);
      if (computedIdx >= 2) {
        pointers['i-1'] = String(computedIdx - 1);
        pointers['i-2'] = String(computedIdx - 2);
      }
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeIdxs.map(String),
      pointers,
      codeLineHighlight,
      variables: {
        dpTable: [...dp],
        currentI: computedIdx !== undefined ? computedIdx : '-',
        result: computedIdx !== undefined ? dp[computedIdx] : '-',
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial Empty State
  pushFrame('DP Tabulation table initialized. Setting base cases.', [], undefined, 1);

  // 2. Base case F[0] = 0
  dp[0] = 0;
  pushFrame('Base case: dp[0] = 0.', [], 0, 5);

  // 3. Base case F[1] = 1
  dp[1] = 1;
  pushFrame('Base case: dp[1] = 1.', [], 1, 6);

  // 4. Fill DP Table iteratively
  for (let i = 2; i <= n; i++) {
    const val1 = dp[i - 1]!;
    const val2 = dp[i - 2]!;
    const computedVal = val1 + val2;
    
    // Highlight dependencies F[i-1] and F[i-2]
    pushFrame(`Iterating i = ${i}. Querying dependencies: dp[${i - 1}] (${val1}) and dp[${i - 2}] (${val2}).`, [i - 1, i - 2], i, 8);
    
    dp[i] = computedVal;
    pushFrame(`Tabulated result: dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${val1} + ${val2} = ${computedVal}.`, [], i, 9);
  }

  pushFrame(`Fibonacci tabulation complete. Result for N = ${n} is ${dp[n]}.`, [], n, 12);

  return frames;
};
