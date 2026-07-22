import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateCoinChangeFrames = (coins: number[] = [1, 2, 5], amount: number = 5): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const capacity = amount + 1;
  const INF = amount + 1;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Infinity (No Combination yet)' },
    { color: 'bg-emerald-500', label: 'Computed Min Coins' },
    { color: 'bg-amber-400', label: 'Dependency Cell (dp[i - coin])' },
  ];

  const dp = Array(capacity).fill(INF);

  const getCoinChangeGraphData = (activeI?: number, dependencyJ?: number): GraphData => {
    const nodes = [];
    for (let i = 0; i < capacity; i++) {
      const val = dp[i];
      const valStr = val >= INF ? '∞' : String(val);

      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      if (val < INF) {
        status = 'success';
      }
      if (i === dependencyJ) {
        status = 'warning';
      }
      if (i === activeI) {
        status = 'success'; // Computed active
      }

      nodes.push({
        id: String(i),
        value: valStr,
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
    activeI?: number,
    dependencyJ?: number,
    currentCoin?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getCoinChangeGraphData(activeI, dependencyJ);
    const pointers: Record<string, string> = {};
    if (activeI !== undefined) pointers['i'] = String(activeI);
    if (dependencyJ !== undefined) pointers['i-coin'] = String(dependencyJ);

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeI !== undefined ? (dependencyJ !== undefined ? [String(activeI), String(dependencyJ)] : [String(activeI)]) : [],
      pointers,
      codeLineHighlight,
      variables: {
        dpTable: dp.map(v => v >= INF ? 'INF' : v),
        currentAmount: activeI !== undefined ? activeI : '-',
        tryingCoin: currentCoin !== undefined ? currentCoin : '-',
        dpVal: activeI !== undefined ? (dp[activeI] >= INF ? 'INF' : dp[activeI]) : '-',
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Coin Change DP initialized. Setting dp[0] = 0.', undefined, undefined, undefined, 1);

  dp[0] = 0;
  pushFrame('Base case: 0 coins needed to make amount 0. dp[0] = 0.', 0, undefined, undefined, 5);

  // Tabulate
  for (let i = 1; i <= amount; i++) {
    pushFrame(`Tabulating min coins for amount ${i}.`, i, undefined, undefined, 7);
    for (const coin of coins) {
      if (coin <= i) {
        const prevVal = dp[i];
        const depVal = dp[i - coin];
        const nextVal = Math.min(dp[i], depVal + 1);
        
        pushFrame(
          `Checking coin ${coin}. Querying dp[${i} - ${coin}] = dp[${i - coin}] (${depVal >= INF ? 'INF' : depVal}).`,
          i,
          i - coin,
          coin,
          9,
        );

        if (depVal < INF) {
          dp[i] = nextVal;
          pushFrame(
            `Updating dp[${i}] = min(dp[${i}] (${prevVal >= INF ? 'INF' : prevVal}), dp[${i - coin}] + 1 (${depVal} + 1)) = ${nextVal}.`,
            i,
            i - coin,
            coin,
            10,
          );
        } else {
          pushFrame(`dp[${i - coin}] is INFINITY. Cannot use coin ${coin} to form amount ${i}.`, i, i - coin, coin, 9);
        }
      } else {
        pushFrame(`Coin ${coin} is too large for amount ${i}. Skipping coin.`, i, undefined, coin, 9);
      }
    }
  }

  const finalResult = dp[amount] >= INF ? -1 : dp[amount];
  pushFrame(`Coin Change complete! Minimum coins needed for amount ${amount} is ${finalResult}.`, amount, undefined, undefined, 14);

  return frames;
};
