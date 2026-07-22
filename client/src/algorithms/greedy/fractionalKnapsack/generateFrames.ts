import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateFractionalKnapsackFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const wt = [10, 20, 30];
  const val = [60, 100, 120];
  const n = wt.length;
  let capacity = 50;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unprocessed Item' },
    { color: 'bg-emerald-500', label: 'Item Fully Selected' },
    { color: 'bg-amber-400', label: 'Item Fractionally Selected' },
    { color: 'bg-indigo-600', label: 'Evaluating Item' },
  ];

  // item states: 'full' | 'fraction' | 'evaluating' | 'unprocessed'
  const states: ('full' | 'fraction' | 'evaluating' | 'unprocessed')[] = Array(n).fill('unprocessed');
  const fractionTaken = Array(n).fill(0);

  const getKnapsackGraphData = (): GraphData => {
    const nodes = wt.map((w, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      
      const st = states[idx];
      if (st === 'full') status = 'success';
      if (st === 'fraction') status = 'warning';
      if (st === 'evaluating') status = 'highlighted';

      const fracStr = fractionTaken[idx] > 0 && fractionTaken[idx] < 1 
        ? ` (${(fractionTaken[idx] * 100).toFixed(0)}%)` 
        : fractionTaken[idx] === 1 ? ' (100%)' : '';

      return {
        id: String(idx),
        value: `wt:${w}, val:${val[idx]}${fracStr}`,
        x: 0,
        y: 0,
        label: `Ratio:${(val[idx]/w).toFixed(0)}`,
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
    currentCap?: number,
    totalVal?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getKnapsackGraphData();
    const pointers: Record<string, string> = {};
    if (activeI !== undefined) pointers['eval'] = String(activeI);

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeI !== undefined ? [String(activeI)] : [],
      pointers,
      codeLineHighlight,
      variables: {
        capacityLeft: currentCap !== undefined ? currentCap : capacity,
        totalValueCollected: totalVal !== undefined ? totalVal : 0,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  let totalValue = 0.0;

  // 1. Initial
  pushFrame('Fractional Knapsack initialized. Items sorted by value/weight ratio descending.', undefined, capacity, totalValue, 1);

  // 2. Greedy Loop
  for (let i = 0; i < n; i++) {
    states[i] = 'evaluating';
    pushFrame(`Evaluating Item ${i + 1} (wt: ${wt[i]}, val: ${val[i]}, ratio: ${val[i] / wt[i]}). Capacity left: ${capacity}.`, i, capacity, totalValue, 6);

    if (capacity - wt[i] >= 0) {
      capacity -= wt[i];
      totalValue += val[i];
      states[i] = 'full';
      fractionTaken[i] = 1;
      
      pushFrame(
        `Item ${i + 1} fits fully. Added full weight (${wt[i]}) and value (${val[i]}). New capacity: ${capacity}.`,
        i,
        capacity,
        totalValue,
        7,
      );
    } else {
      const fraction = capacity / wt[i];
      const addedVal = val[i] * fraction;
      totalValue += addedVal;
      states[i] = 'fraction';
      fractionTaken[i] = fraction;
      capacity = 0;
      
      pushFrame(
        `Item ${i + 1} exceeds capacity. Greedily took fraction: ${capacity} / ${wt[i]} = ${(fraction * 100).toFixed(0)}%. Value added: ${addedVal.toFixed(1)}.`,
        i,
        capacity,
        totalValue,
        11,
      );
      break;
    }
  }

  pushFrame(`Fractional Knapsack complete! Maximum value collected: ${totalValue.toFixed(1)}.`, undefined, capacity, totalValue, 14);

  return frames;
};
