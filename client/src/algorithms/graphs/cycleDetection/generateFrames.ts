import { type VisualizationFrame } from '@store/visualizationStore';
import { buildAdjacencyList, graphToGraphData, createCircularLayout } from '../shared';
import type { Graph } from '../shared';

export const generateCycleDetectionFrames = (
  graph: Graph,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildAdjacencyList(graph);
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-indigo-500', label: 'In Recursion Stack' },
    { color: 'bg-rose-500', label: 'Cycle Detected' },
  ];

  const visited = new Set<string>();
  const recStack = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  const getStatusMap = (cycleNode?: string) => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'> = {};
    visited.forEach(node => {
      map[node] = 'visited';
    });
    recStack.forEach(node => {
      map[node] = 'highlighted'; // indigo
    });
    if (cycleNode) {
      map[cycleNode] = 'danger'; // red
    }
    return map;
  };

  let cycleFound = false;

  const detectCycle = (node: string, parent?: string): boolean => {
    if (recStack.has(node)) {
      cycleFound = true;
      activeNodes.clear();
      activeNodes.add(node);

      frames.push({
        index: frameIdx++,
        description: `Node ${node} is already in the recursion stack! Cycle detected!`,
        data: graphToGraphData(graph, visited, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [node],
        pointers: { current: node, cycleRoot: node },
        codeLineHighlight: 2, // IF recStack[node] is true -> return true
        variables: {
          visited: Array.from(visited),
          recStack: Array.from(recStack),
          currentNode: node,
          cycleDetected: true,
        },
        meta: { statusMap: getStatusMap(node), legend: baseLegend },
        timestamp: frameIdx * 600,
      });
      return true;
    }

    if (visited.has(node)) {
      return false;
    }

    visited.add(node);
    recStack.add(node);
    activeNodes.clear();
    activeNodes.add(node);

    if (parent) {
      const edge = graph.edges.find(e => e.source === parent && e.target === node);
      if (edge) visitedEdges.add(edge.id);
    }

    frames.push({
      index: frameIdx++,
      description: `Entering node ${node}. Adding to visited and recursion stack.`,
      data: graphToGraphData(graph, visited, activeNodes, activeEdges, visitedEdges, nodePositions),
      highlights: [node],
      pointers: { current: node },
      codeLineHighlight: 7, // visited[node] = true, recStack[node] = true
      variables: {
        visited: Array.from(visited),
        recStack: Array.from(recStack),
        currentNode: node,
      },
      meta: { statusMap: getStatusMap(), legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    const neighbors = adjList.get(node) || [];
    for (const neighbor of neighbors) {
      activeNodes.clear();
      activeNodes.add(node);
      activeNodes.add(neighbor);

      const edge = graph.edges.find(e => e.source === node && e.target === neighbor);
      activeEdges.clear();
      if (edge) activeEdges.add(edge.id);

      frames.push({
        index: frameIdx++,
        description: `From node ${node}, visiting neighbor ${neighbor}.`,
        data: graphToGraphData(graph, visited, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [neighbor],
        pointers: { current: node, neighbor },
        codeLineHighlight: 10, // FOR each neighbor OF node
        variables: {
          visited: Array.from(visited),
          recStack: Array.from(recStack),
          currentNode: node,
          neighbor,
        },
        meta: { statusMap: getStatusMap(), legend: baseLegend },
        timestamp: frameIdx * 600,
      });

      activeEdges.clear();

      if (detectCycle(neighbor, node)) {
        return true;
      }
    }

    recStack.delete(node);
    activeNodes.clear();
    activeNodes.add(node);

    frames.push({
      index: frameIdx++,
      description: `Finished exploring node ${node}. Removing from recursion stack.`,
      data: graphToGraphData(graph, visited, activeNodes, activeEdges, visitedEdges, nodePositions),
      highlights: [node],
      pointers: { current: node },
      codeLineHighlight: 14, // recStack[node] = false
      variables: {
        visited: Array.from(visited),
        recStack: Array.from(recStack),
        currentNode: node,
      },
      meta: { statusMap: getStatusMap(), legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    return false;
  };

  // Run DFS from each node to handle disconnected graphs
  for (const vertex of graph.vertices) {
    if (!visited.has(vertex.id)) {
      frames.push({
        index: frameIdx++,
        description: `Starting DFS traversal from unvisited node ${vertex.id}.`,
        data: graphToGraphData(graph, visited, new Set(), new Set(), visitedEdges, nodePositions),
        highlights: [vertex.id],
        pointers: { startNode: vertex.id },
        codeLineHighlight: 0,
        variables: {
          visited: Array.from(visited),
          recStack: Array.from(recStack),
        },
        meta: { statusMap: getStatusMap(), legend: baseLegend },
        timestamp: frameIdx * 600,
      });

      if (detectCycle(vertex.id)) {
        break;
      }
    }
  }

  if (!cycleFound) {
    frames.push({
      index: frameIdx++,
      description: `Cycle Detection complete. No cycles detected in the graph.`,
      data: graphToGraphData(graph, visited, new Set(), new Set(), visitedEdges, nodePositions),
      highlights: [],
      pointers: {},
      codeLineHighlight: 0,
      variables: {
        visited: Array.from(visited),
        recStack: Array.from(recStack),
        cycleDetected: false,
      },
      meta: { statusMap: getStatusMap(), legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  }

  return frames;
};
