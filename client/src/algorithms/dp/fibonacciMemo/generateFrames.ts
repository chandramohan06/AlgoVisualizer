import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode, GenericEdge } from '@components/visualizer/nodeEngine/types';

export const generateFibonacciMemoFrames = (n: number = 4): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unvisited / Queue' },
    { color: 'bg-amber-400', label: 'Active Call Frame' },
    { color: 'bg-emerald-500', label: 'Resolved Node / Memo Hit' },
  ];

  const nodesMap = new Map<string, { id: string; valStr: string; status: any }>();
  const edges: { source: string; target: string }[] = [];
  const memo: Record<number, number> = {};

  const getGraphData = (): GraphData => {
    const nodes: GenericNode[] = Array.from(nodesMap.values()).map(n => ({
      id: n.id,
      value: n.valStr,
      x: 0,
      y: 0,
      status: n.status,
    }));

    const formattedEdges: GenericEdge[] = edges.map(e => ({
      id: `edge-${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      directed: true,
    }));

    return {
      nodes,
      edges: formattedEdges,
      layout: 'tree',
    };
  };

  const pushFrame = (description: string, activeId: string, codeLineHighlight: number = 0) => {
    const data = getGraphData();
    const pointers: Record<string, string> = {
      active: activeId,
    };

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: [activeId],
      pointers,
      codeLineHighlight,
      variables: {
        memoTable: { ...memo },
        currentN: nodesMap.get(activeId)?.valStr || '',
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  const solveFibMemo = (currN: number, pathId: string, parentId: string | null): number => {
    const nodeKey = pathId;
    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `fib(${currN}) = ?`,
      status: 'warning',
    });

    if (parentId) {
      edges.push({ source: parentId, target: nodeKey });
    }

    pushFrame(`Calling fib(${currN}). Checking memo table.`, nodeKey, 6);

    // Memo lookup hit
    if (memo[currN] !== undefined) {
      const cachedResult = memo[currN];
      nodesMap.set(nodeKey, {
        id: nodeKey,
        valStr: `fib(${currN}) = ${cachedResult} (Cached)`,
        status: 'success',
      });
      pushFrame(`Memo Cache Hit! fib(${currN}) found in memo table. Returns ${cachedResult} immediately.`, nodeKey, 7);
      return cachedResult;
    }

    if (currN <= 1) {
      memo[currN] = currN;
      nodesMap.set(nodeKey, {
        id: nodeKey,
        valStr: `fib(${currN}) = ${currN}`,
        status: 'success',
      });
      pushFrame(`fib(${currN}) is a base case. Memoizing result: ${currN}.`, nodeKey, 4);
      return currN;
    }

    const leftVal = solveFibMemo(currN - 1, `${pathId}-L`, nodeKey);
    const rightVal = solveFibMemo(currN - 2, `${pathId}-R`, nodeKey);

    const result = leftVal + rightVal;
    memo[currN] = result;

    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `fib(${currN}) = ${result}`,
      status: 'success',
    });
    pushFrame(`Memoizing computed result: fib(${currN}) = ${result}.`, nodeKey, 9);

    return result;
  };

  solveFibMemo(n, 'root', null);
  pushFrame('Fibonacci memoized recursion complete.', 'root', 1);

  return frames;
};
