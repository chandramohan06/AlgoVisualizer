import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateLCSFrames = (s1: string = 'BAT', s2: string = 'CAT'): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const m = s1.length;
  const n = s2.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Uncalculated DP Cell' },
    { color: 'bg-indigo-600', label: 'DP Value Cell' },
    { color: 'bg-amber-400', label: 'Dependency DP Cells' },
    { color: 'bg-emerald-500', label: 'Current Cell / Match Placed' },
  ];

  // DP table state
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const computed: Record<string, boolean> = {};

  const getLCSGraphData = (activeCell?: [number, number], deps: [number, number][] = []): GraphData => {
    const nodes: GenericNode[] = [];

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        const id = `${i},${j}`;
        const isComputed = computed[id] === true;
        const cellVal = isComputed ? dp[i][j] : 0;

        let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
        if (isComputed) {
          status = 'highlighted';
        }
        
        // Highlight active and dependencies
        const isDep = deps.some(([r, c]) => r === i && c === j);
        if (isDep) {
          status = 'warning';
        }
        if (activeCell && activeCell[0] === i && activeCell[1] === j) {
          status = 'success';
        }

        // Generate row/col labels to show characters
        const rowChar = i > 0 ? s1[i - 1] : '-';
        const colChar = j > 0 ? s2[j - 1] : '-';

        nodes.push({
          id,
          value: isComputed || (activeCell && activeCell[0] === i && activeCell[1] === j) ? String(cellVal) : '-',
          x: 180 + j * 65,
          y: 90 + i * 65,
          radius: 20,
          label: `dp[${rowChar}][${colChar}]`,
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
    const data = getLCSGraphData(activeCell, deps);
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
        currentRowChar: activeCell && activeCell[0] > 0 ? s1[activeCell[0] - 1] : '-',
        currentColChar: activeCell && activeCell[1] > 0 ? s2[activeCell[1] - 1] : '-',
        lcsLength: activeCell ? dp[activeCell[0]][activeCell[1]] : 0,
        dpMatrix: dp.map(row => [...row]),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame(`LCS initialized. Comparing String s1: "${s1}" and s2: "${s2}".`, undefined, [], 1);

  // Initialize base cases in computed list
  for (let i = 0; i <= m; i++) computed[`${i},0`] = true;
  for (let j = 0; j <= n; j++) computed[`0,${j}`] = true;
  pushFrame('Base cases initialized: dp[i][0] = 0 and dp[0][j] = 0.', undefined, [], 5);

  // Fill table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const char1 = s1[i - 1];
      const char2 = s2[j - 1];
      const deps: [number, number][] = [];
      let nextVal = 0;

      if (char1 === char2) {
        deps.push([i - 1, j - 1]);
        nextVal = dp[i - 1][j - 1] + 1;
        pushFrame(
          `Characters match: s1[${i - 1}] ('${char1}') == s2[${j - 1}] ('${char2}'). dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i - 1][j - 1]} + 1 = ${nextVal}.`,
          [i, j],
          deps,
          8,
        );
      } else {
        deps.push([i - 1, j]);
        deps.push([i, j - 1]);
        nextVal = Math.max(dp[i - 1][j], dp[i][j - 1]);
        pushFrame(
          `Characters mismatch: s1[${i - 1}] ('${char1}') != s2[${j - 1}] ('${char2}'). dp[${i}][${j}] = max(dp[${i - 1}][${j}] (${dp[i - 1][j]}), dp[${i}][${j - 1}] (${dp[i][j - 1]})) = ${nextVal}.`,
          [i, j],
          deps,
          10,
        );
      }

      dp[i][j] = nextVal;
      computed[`${i},${j}`] = true;
      pushFrame(`Resolved cell dp[${i}][${j}] = ${nextVal}.`, [i, j], [], 8);
    }
  }

  pushFrame(`LCS algorithm complete! Length of Longest Common Subsequence is ${dp[m][n]}.`, [m, n], [], 14);

  return frames;
};
