import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode, GenericEdge } from '@components/visualizer/nodeEngine/types';

export const generateMergeSortTreeFrames = (initialArr: number[] = [5, 2, 8, 3]): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-amber-400', label: 'Splitting Sub-Array' },
    { color: 'bg-emerald-500', label: 'Sorted Sub-Array / Base Case' },
    { color: 'bg-indigo-600', label: 'Unresolved Sub-Array' },
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
        arrayState: Array.from(nodesMap.values()).map(n => `${n.id}: [${n.valStr}]`),
        totalNodes: nodesMap.size,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  const solveMergeSort = (arr: number[], l: number, r: number, parentId: string | null): number[] => {
    const nodeKey = `node-${l}-${r}`;
    const subArr = arr.slice(l, r + 1);
    
    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `[${subArr.join(',')}]`,
      status: 'warning',
    });

    if (parentId) {
      edges.push({ source: parentId, target: nodeKey });
    }

    pushFrame(`Recursive call: mergeSort(arr, l=${l}, r=${r}) representing slice [${subArr.join(', ')}].`, nodeKey, 3);

    if (l >= r) {
      nodesMap.set(nodeKey, {
        id: nodeKey,
        valStr: `[${subArr.join(',')}]`,
        status: 'success',
      });
      pushFrame(`Base case hit: subarray of size 1 is sorted.`, nodeKey, 1);
      return subArr;
    }

    const m = Math.floor(l + (r - l) / 2);

    // Split Left
    const leftSorted = solveMergeSort(arr, l, m, nodeKey);

    // Split Right
    const rightSorted = solveMergeSort(arr, m + 1, r, nodeKey);

    // Merge
    const merged: number[] = [];
    let i = 0, j = 0;
    while (i < leftSorted.length && j < rightSorted.length) {
      if (leftSorted[i] <= rightSorted[j]) {
        merged.push(leftSorted[i++]);
      } else {
        merged.push(rightSorted[j++]);
      }
    }
    while (i < leftSorted.length) merged.push(leftSorted[i++]);
    while (j < rightSorted.length) merged.push(rightSorted[j++]);

    nodesMap.set(nodeKey, {
      id: nodeKey,
      valStr: `[${merged.join(',')}]`,
      status: 'success',
    });
    pushFrame(`Merged sorted halves [${leftSorted.join(', ')}] and [${rightSorted.join(', ')}] into [${merged.join(', ')}].`, nodeKey, 6);

    return merged;
  };

  solveMergeSort(initialArr, 0, initialArr.length - 1, null);

  return frames;
};
