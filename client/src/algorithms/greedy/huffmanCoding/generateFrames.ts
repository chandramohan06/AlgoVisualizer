import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode, GenericEdge } from '@components/visualizer/nodeEngine/types';

export const generateHuffmanCodingFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Leaf / Character Node' },
    { color: 'bg-emerald-500', label: 'Merged Parent Node' },
    { color: 'bg-amber-400', label: 'Active Min-Nodes Merging' },
  ];

  const nodesMap = new Map<string, { id: string; valStr: string; status: any }>();
  const edges: { source: string; target: string }[] = [];

  const getHuffmanGraphData = (): GraphData => {
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

  const pushFrame = (description: string, activeId?: string, mergingIds: string[] = [], codeLineHighlight: number = 0) => {
    // Temporarily update merging nodes status
    mergingIds.forEach(id => {
      if (nodesMap.has(id)) nodesMap.get(id)!.status = 'warning';
    });

    const data = getHuffmanGraphData();

    // Revert status back
    mergingIds.forEach(id => {
      if (nodesMap.has(id)) {
        nodesMap.get(id)!.status = id.includes('merge') ? 'success' : 'visited';
      }
    });

    const pointers: Record<string, string> = {};
    if (activeId) {
      pointers['parent'] = activeId;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: mergingIds,
      pointers,
      codeLineHighlight,
      variables: {
        activeHeapNodes: Array.from(nodesMap.values()).map(n => n.valStr),
        totalMerges: edges.length / 2,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initialize leaf nodes
  nodesMap.set('A', { id: 'A', valStr: 'A:5', status: 'visited' });
  nodesMap.set('B', { id: 'B', valStr: 'B:9', status: 'visited' });
  nodesMap.set('C', { id: 'C', valStr: 'C:12', status: 'visited' });
  nodesMap.set('D', { id: 'D', valStr: 'D:13', status: 'visited' });
  
  pushFrame('Huffman Coding initialized. Added initial character leaf nodes with frequencies to heap.', undefined, [], 11);

  // 2. Merge A:5 and B:9
  pushFrame('Selecting two nodes with minimum frequencies: A:5 and B:9.', undefined, ['A', 'B'], 19);
  
  nodesMap.set('merge-AB', { id: 'merge-AB', valStr: 'AB:14', status: 'success' });
  edges.push({ source: 'merge-AB', target: 'A' });
  edges.push({ source: 'merge-AB', target: 'B' });
  
  pushFrame('Merged A:5 and B:9 into parent node AB:14. Pushed back to heap.', 'merge-AB', ['A', 'B'], 25);

  // 3. Merge C:12 and D:13
  pushFrame('Selecting next two nodes with minimum frequencies: C:12 and D:13.', undefined, ['C', 'D'], 19);

  nodesMap.set('merge-CD', { id: 'merge-CD', valStr: 'CD:25', status: 'success' });
  edges.push({ source: 'merge-CD', target: 'C' });
  edges.push({ source: 'merge-CD', target: 'D' });

  pushFrame('Merged C:12 and D:13 into parent node CD:25. Pushed back to heap.', 'merge-CD', ['C', 'D'], 25);

  // 4. Merge AB:14 and CD:25
  pushFrame('Selecting final two nodes: AB:14 and CD:25.', undefined, ['merge-AB', 'merge-CD'], 19);

  nodesMap.set('merge-ABCD', { id: 'merge-ABCD', valStr: 'ABCD:39', status: 'success' });
  edges.push({ source: 'merge-ABCD', target: 'merge-AB' });
  edges.push({ source: 'merge-ABCD', target: 'merge-CD' });

  pushFrame('Merged AB:14 and CD:25 into root node ABCD:39.', 'merge-ABCD', ['merge-AB', 'merge-CD'], 25);
  pushFrame('Huffman Coding tree construction complete!', 'merge-ABCD', [], 28);

  return frames;
};
