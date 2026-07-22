import { type VisualizationFrame } from '@store/visualizationStore';
import { buildAdjacencyList, graphToGraphData, createCircularLayout } from '../shared';
import type { Graph } from '../shared';

export const generateDFSFrames = (
  graph: Graph,
  startNodeId: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildAdjacencyList(graph);
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Current' },
    { color: 'bg-indigo-500', label: 'Stack' },
  ];

  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const stack: string[] = [];

  const dfs = (nodeId: string, parentId?: string) => {
    stack.push(nodeId);
    visitedNodes.add(nodeId);
    activeNodes.clear();
    activeNodes.add(nodeId);

    if (parentId) {
      visitedEdges.add(`${parentId}-${nodeId}`);
      if (!graph.directed) {
        visitedEdges.add(`${nodeId}-${parentId}`);
      }
    }

    frames.push({
      index: frameIdx++,
      description: `DFS visiting node ${nodeId}. Stack: [${stack.join(', ')}]`,
      data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges, nodePositions),
      highlights: [nodeId],
      pointers: { current: nodeId } as Record<string, string | number>,
      codeLineHighlight: 1,
      variables: { stack: [...stack], visited: Array.from(visitedNodes), current: nodeId },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visitedNodes.has(neighbor)) {
        frames.push({
          index: frameIdx++,
          description: `Neighbor ${neighbor} is unvisited. Preparing to visit ${neighbor}.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges, nodePositions),
          highlights: [neighbor],
          pointers: { current: nodeId, neighbor } as Record<string, string | number>,
          codeLineHighlight: 4,
          variables: { stack: [...stack], visited: Array.from(visitedNodes), current: nodeId, neighbor },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });

        dfs(neighbor, nodeId);

        // Frame to show returning to current node after finishing neighbor's branch
        activeNodes.clear();
        activeNodes.add(nodeId);
        frames.push({
          index: frameIdx++,
          description: `Backtrack to node ${nodeId}. Stack: [${stack.join(', ')}]`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges, nodePositions),
          highlights: [nodeId],
          pointers: { current: nodeId } as Record<string, string | number>,
          codeLineHighlight: 3,
          variables: { stack: [...stack], visited: Array.from(visitedNodes), current: nodeId },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      } else {
        frames.push({
          index: frameIdx++,
          description: `Neighbor ${neighbor} is already visited. Skipping.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, new Set(), visitedEdges, nodePositions),
          highlights: [neighbor],
          pointers: { current: nodeId, neighbor } as Record<string, string | number>,
          codeLineHighlight: 4,
          variables: { stack: [...stack], visited: Array.from(visitedNodes), current: nodeId, neighbor },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      }
    }

    stack.pop();
  };

  dfs(startNodeId);

  frames.push({
    index: frameIdx++,
    description: `DFS complete. Visited nodes: [${Array.from(visitedNodes).join(', ')}]`,
    data: graphToGraphData(graph, visitedNodes, new Set(), new Set(), visitedEdges, nodePositions),
    highlights: [],
    pointers: {} as Record<string, string | number>,
    codeLineHighlight: 0,
    variables: { visited: Array.from(visitedNodes) },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
