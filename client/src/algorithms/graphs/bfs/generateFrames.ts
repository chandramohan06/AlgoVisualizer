import { type VisualizationFrame } from '@store/visualizationStore';
import { buildAdjacencyList, graphToGraphData } from '../shared';
import type { Graph } from '../shared';

export const generateBFSFrames = (
  graph: Graph,
  startNodeId: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildAdjacencyList(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Current' },
    { color: 'bg-emerald-500', label: 'Queue' },
  ];

  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const parent = new Map<string, string>();
  const queue: string[] = [startNodeId];
  const traversalOrder: string[] = [];

  visitedNodes.add(startNodeId);

  frames.push({
    index: frameIdx++,
    description: `BFS initialized. Starting from node ${startNodeId}. Queue: [${startNodeId}]`,
    data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges),
    highlights: [startNodeId],
    pointers: { current: startNodeId } as Record<string, string | number>,
    codeLineHighlight: 0,
    variables: { queue: [...queue], visited: Array.from(visitedNodes) },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    traversalOrder.push(current);
    activeNodes.clear();
    activeNodes.add(current);

    const neighbors = adjList.get(current) || [];
    
    frames.push({
      index: frameIdx++,
      description: `Processing node ${current}. Visiting neighbors: [${neighbors.join(', ')}]`,
      data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges),
      highlights: [current],
      pointers: { current } as Record<string, string | number>,
      codeLineHighlight: 1,
      variables: { queue: [...queue], visited: Array.from(visitedNodes), current },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    for (const neighbor of neighbors) {
      if (!visitedNodes.has(neighbor)) {
        visitedNodes.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
        
        const edgeId = `${current}-${neighbor}`;
        visitedEdges.add(edgeId);

        activeNodes.clear();
        activeNodes.add(neighbor);

        frames.push({
          index: frameIdx++,
          description: `Discovered node ${neighbor}. Added to queue. Parent: ${current}`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges),
          highlights: [neighbor],
          pointers: { current: neighbor, parent: current } as Record<string, string | number>,
          codeLineHighlight: 2,
          variables: { queue: [...queue], visited: Array.from(visitedNodes), discovered: neighbor },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      }
    }
  }

  frames.push({
    index: frameIdx++,
    description: `BFS complete. Traversal order: [${traversalOrder.join(' → ')}]`,
    data: graphToGraphData(graph, visitedNodes),
    highlights: [],
    pointers: {} as Record<string, string | number>,
    codeLineHighlight: 3,
    variables: { traversalOrder },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
