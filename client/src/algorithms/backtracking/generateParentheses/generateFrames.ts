import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode, GenericEdge } from '@components/visualizer/nodeEngine/types';

export const generateParenthesesFrames = (n: number = 2): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unexplored Choice' },
    { color: 'bg-amber-400', label: 'Active Choice / Processing' },
    { color: 'bg-emerald-500', label: 'Valid Parenthesis Match' },
  ];

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
      current: activeId,
    };

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: [activeId],
      pointers,
      codeLineHighlight,
      variables: {
        currentString: nodesMap.get(activeId)?.valStr || '',
        totalSolutions: Array.from(nodesMap.values()).filter(n => n.status === 'success').map(n => n.valStr),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  const backtrack = (curr: string, open: number, close: number, pathId: string, parentId: string | null) => {
    const nodeKey = pathId;
    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: curr === '' ? 'ε' : curr,
      status: 'warning',
    });

    if (parentId) {
      edges.push({ source: parentId, target: nodeKey });
    }

    pushFrame(`Visiting state "${curr}" (open: ${open}, close: ${close}).`, nodeKey, 7);

    if (curr.length === n * 2) {
      nodesMap.set(nodeKey, {
        id: nodeKey,
        valStr: curr,
        status: 'success',
      });
      pushFrame(`Valid combination reached: "${curr}". Adding to results.`, nodeKey, 9);
      return;
    }

    // Try adding '('
    if (open < n) {
      backtrack(curr + '(', open + 1, close, `${pathId}-L`, nodeKey);
      nodesMap.get(nodeKey)!.status = 'warning'; // Restore active focus
      pushFrame(`Backtracked from choice. Returning to state "${curr}".`, nodeKey, 12);
    }

    // Try adding ')'
    if (close < open) {
      backtrack(curr + ')', open, close + 1, `${pathId}-R`, nodeKey);
      nodesMap.get(nodeKey)!.status = 'warning'; // Restore active focus
      pushFrame(`Backtracked from choice. Returning to state "${curr}".`, nodeKey, 16);
    }

    nodesMap.get(nodeKey)!.status = 'visited'; // Mark branch evaluated
  };

  backtrack('', 0, 0, 'root', null);
  pushFrame('Generate Parentheses complete. Found all valid combinations.', 'root', 1);

  return frames;
};
