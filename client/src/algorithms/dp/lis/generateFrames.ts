import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateLISFrames = (arr: number[] = [10, 22, 9, 33]): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const n = arr.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unprocessed Node' },
    { color: 'bg-indigo-600', label: 'Processed Node / Active DP Value' },
    { color: 'bg-amber-400', label: 'Query Node j' },
    { color: 'bg-emerald-500', label: 'Active Node i' },
  ];

  const dp = Array(n).fill(1);

  const getLISGraphData = (activeI?: number, activeJ?: number): GraphData => {
    const nodes = arr.map((val, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      
      if (idx < (activeI || 0)) {
        status = 'highlighted';
      }
      if (idx === activeJ) {
        status = 'warning';
      }
      if (idx === activeI) {
        status = 'success';
      }

      return {
        id: String(idx),
        value: `${val} (dp:${dp[idx]})`,
        x: 0,
        y: 0,
        label: `idx:${idx}`,
        status,
      };
    });

    return {
      nodes,
      edges: [],
      layout: 'linear-horizontal',
    };
  };

  const pushFrame = (
    description: string,
    activeI?: number,
    activeJ?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getLISGraphData(activeI, activeJ);
    const pointers: Record<string, string> = {};
    if (activeI !== undefined) pointers['i'] = String(activeI);
    if (activeJ !== undefined) pointers['j'] = String(activeJ);

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeI !== undefined ? (activeJ !== undefined ? [String(activeI), String(activeJ)] : [String(activeI)]) : [],
      pointers,
      codeLineHighlight,
      variables: {
        dpTable: [...dp],
        currentI: activeI !== undefined ? activeI : '-',
        currentJ: activeJ !== undefined ? activeJ : '-',
        currentMax: Math.max(...dp.slice(0, (activeI !== undefined ? activeI + 1 : 1))),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  pushFrame('Longest Increasing Subsequence DP initialized. dp array filled with 1.', undefined, undefined, 1);

  for (let i = 0; i < n; i++) {
    pushFrame(`Initializing dp[${i}] = 1. Checking previous elements.`, i, undefined, 8);
    for (let j = 0; j < i; j++) {
      pushFrame(`Comparing arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}).`, i, j, 10);
      if (arr[i] > arr[j]) {
        const prevDp = dp[i];
        const nextDp = Math.max(dp[i], dp[j] + 1);
        dp[i] = nextDp;
        pushFrame(
          `Since ${arr[i]} > ${arr[j]}, updating dp[${i}] = max(dp[${i}] (${prevDp}), dp[${j}] + 1 (${dp[j]} + 1)) = ${nextDp}.`,
          i,
          j,
          11,
        );
      } else {
        pushFrame(`Since ${arr[i]} <= ${arr[j]}, subsequence cannot be extended.`, i, j, 10);
      }
    }
    pushFrame(`Finished checking previous elements for index ${i}. Final dp[${i}] = ${dp[i]}.`, i, undefined, 8);
  }

  const maxLIS = Math.max(...dp);
  pushFrame(`LIS algorithm complete! Length of Longest Increasing Subsequence is ${maxLIS}.`, undefined, undefined, 17);

  return frames;
};
