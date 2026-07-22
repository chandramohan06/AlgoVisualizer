import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateKnapsackFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const N = 3;
  const W = 4;
  const wt = [1, 2, 3];
  const val = [15, 10, 9];

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Uncalculated DP Cell' },
    { color: 'bg-indigo-600', label: 'DP Value Cell' },
    { color: 'bg-amber-400', label: 'Dependency DP Cells (dp[i-1][w], dp[i-1][w-wt])' },
    { color: 'bg-emerald-500', label: 'Current Active Cell (dp[i][w])' },
  ];

  // DP table state
  const dp: number[][] = Array.from({ length: N + 1 }, () => Array(W + 1).fill(0));
  // Keep track of which cells are computed
  const computed: Record<string, boolean> = {};

  const getKnapsackGraphData = (activeCell?: [number, number], deps: [number, number][] = []): GraphData => {
    const nodes: GenericNode[] = [];

    for (let i = 0; i <= N; i++) {
      for (let w = 0; w <= W; w++) {
        const id = `${i},${w}`;
        const isComputed = computed[id] === true;
        const cellVal = isComputed ? dp[i][w] : 0;

        let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
        if (isComputed) {
          status = 'highlighted';
        }
        
        // Highlight active and dependencies
        const isDep = deps.some(([r, c]) => r === i && c === w);
        if (isDep) {
          status = 'warning';
        }
        if (activeCell && activeCell[0] === i && activeCell[1] === w) {
          status = 'success';
        }

        nodes.push({
          id,
          value: isComputed || (activeCell && activeCell[0] === i && activeCell[1] === w) ? String(cellVal) : '-',
          x: 180 + w * 65,
          y: 90 + i * 65,
          radius: 20,
          label: `dp[${i}][${w}]`,
          status,
        });
      }
    }

    return {
      nodes,
      edges: [],
      layout: 'free',
    };
  };

  const pushFrame = (
    description: string,
    activeCell?: [number, number],
    deps: [number, number][] = [],
    codeLineHighlight: number = 0,
  ) => {
    const data = getKnapsackGraphData(activeCell, deps);
    const pointers: Record<string, string> = {};
    if (activeCell) {
      pointers['current'] = `${activeCell[0]},${activeCell[1]}`;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeCell ? [`${activeCell[0]},${activeCell[1]}`] : [],
      pointers,
      codeLineHighlight,
      variables: {
        currentRow: activeCell ? activeCell[0] : '-',
        currentWeight: activeCell ? activeCell[1] : '-',
        dpMatrix: dp.map(row => [...row]),
        maxVal: activeCell ? dp[activeCell[0]][activeCell[1]] : 0,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('0/1 Knapsack DP initialized. Filling row 0 and col 0 base cases with 0.', undefined, [], 1);

  // Initialize base cases in computed list
  for (let i = 0; i <= N; i++) computed[`${i},0`] = true;
  for (let w = 0; w <= W; w++) computed[`0,${w}`] = true;
  pushFrame('Base cases initialized: dp[i][0] = 0 and dp[0][w] = 0.', undefined, [], 5);

  // Fill table
  for (let i = 1; i <= N; i++) {
    const currentWeight = wt[i - 1];
    const currentValue = val[i - 1];

    for (let w = 1; w <= W; w++) {
      const deps: [number, number][] = [];
      let nextVal = 0;

      if (currentWeight <= w) {
        deps.push([i - 1, w]);
        deps.push([i - 1, w - currentWeight]);
        nextVal = Math.max(currentValue + dp[i - 1][w - currentWeight], dp[i - 1][w]);
        
        pushFrame(
          `Item ${i} (wt: ${currentWeight}, val: ${currentValue}) fits in capacity ${w}. Comparing taking item vs skipping: max(${currentValue} + dp[${i - 1}][${w - currentWeight}], dp[${i - 1}][${w}]).`,
          [i, w],
          deps,
          8,
        );
      } else {
        deps.push([i - 1, w]);
        nextVal = dp[i - 1][w];
        
        pushFrame(
          `Item ${i} (wt: ${currentWeight}) is too heavy for capacity ${w}. Carrying forward value: dp[${i - 1}][${w}] (${nextVal}).`,
          [i, w],
          deps,
          10,
        );
      }

      dp[i][w] = nextVal;
      computed[`${i},${w}`] = true;
      pushFrame(`Resolved cell dp[${i}][${w}] = ${nextVal}.`, [i, w], [], 8);
    }
  }

  pushFrame(`Knapsack algorithm complete! Max profit is ${dp[N][W]}.`, [N, W], [], 14);

  return frames;
};
