import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode, GenericEdge } from '@components/visualizer/nodeEngine/types';

export const generateFibonacciFrames = (n: number = 4): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unvisited / Queue' },
    { color: 'bg-amber-400', label: 'Active Call Frame' },
    { color: 'bg-emerald-500', label: 'Resolved Node / Return Value' },
  ];

  // Store node visual representations
  const nodesMap = new Map<string, { id: string; valStr: string; status: any }>();
  const edges: { source: string; target: string }[] = [];

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
        currentN: nodesMap.get(activeId)?.valStr || '',
        totalCalls: nodesMap.size,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Standard DFS tree generator
  const solveFib = (currN: number, pathId: string, parentId: string | null): number => {
    const nodeKey = pathId;
    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `fib(${currN}) = ?`,
      status: 'warning',
    });

    if (parentId) {
      edges.push({ source: parentId, target: nodeKey });
    }

    pushFrame(`Calling fib(${currN}). Adding to recursion tree.`, nodeKey, 5);

    if (currN <= 1) {
      const result = currN;
      nodesMap.set(nodeKey, {
        id: nodeKey,
        valStr: `fib(${currN}) = ${result}`,
        status: 'success',
      });
      pushFrame(`fib(${currN}) is a base case. Returns ${result}.`, nodeKey, 3);
      return result;
    }

    // Call Left Child (n - 1)
    const leftVal = solveFib(currN - 1, `${pathId}-L`, nodeKey);

    // Call Right Child (n - 2)
    const rightVal = solveFib(currN - 2, `${pathId}-R`, nodeKey);

    const result = leftVal + rightVal;
    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `fib(${currN}) = ${result}`,
      status: 'success',
    });
    
    // Highlight parent node as active resolving state
    nodesMap.get(nodeKey)!.status = 'warning';
    pushFrame(`Summing results for children: fib(${currN}) = fib(${currN - 1}) + fib(${currN - 2}) = ${leftVal} + ${rightVal} = ${result}.`, nodeKey, 5);
    
    nodesMap.get(nodeKey)!.status = 'success';
    pushFrame(`Resolved fib(${currN}) = ${result}. Returning up.`, nodeKey, 5);

    return result;
  };

  solveFib(n, 'root', null);

  return frames;
};
