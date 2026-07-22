import { type VisualizationFrame } from '@store/visualizationStore';
import { buildWeightedAdjacencyList, graphToGraphData, createCircularLayout, PriorityQueue } from '../shared';
import type { Graph } from '../shared';

export const generateDijkstraFrames = (
  graph: Graph,
  startNodeId: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildWeightedAdjacencyList(graph);
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited' },
    { color: 'bg-amber-400', label: 'Current' },
    { color: 'bg-indigo-500', label: 'In PQ' },
  ];

  const distances = new Map<string, number>();
  const parents = new Map<string, string>();
  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  // Initialize
  graph.vertices.forEach(v => {
    distances.set(v.id, Infinity);
  });
  distances.set(startNodeId, 0);

  const pq = new PriorityQueue<string>();
  pq.enqueue(startNodeId, 0);

  const getPQState = () => pq.toArray().map(item => `${item.item}(${item.priority})`);
  const getDistancesState = () => {
    const obj: Record<string, string | number> = {};
    distances.forEach((d, node) => {
      obj[node] = d === Infinity ? '∞' : d;
    });
    return obj;
  };
  const getParentsState = () => {
    const obj: Record<string, string> = {};
    parents.forEach((p, node) => {
      obj[node] = p;
    });
    return obj;
  };

  frames.push({
    index: frameIdx++,
    description: `Dijkstra initialized with source node ${startNodeId}. Distances set to Infinity.`,
    data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
    highlights: [startNodeId],
    pointers: { current: startNodeId } as Record<string, string | number>,
    codeLineHighlight: 1, // dist initialized
    variables: {
      pq: getPQState(),
      distances: getDistancesState(),
      parents: getParentsState(),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  while (!pq.isEmpty()) {
    const current = pq.dequeue()!;
    visitedNodes.add(current);
    activeNodes.clear();
    activeNodes.add(current);

    frames.push({
      index: frameIdx++,
      description: `Dequeued node ${current} with distance ${distances.get(current)}.`,
      data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
      highlights: [current],
      pointers: { current } as Record<string, string | number>,
      codeLineHighlight: 6, // current = pq.dequeue()
      variables: {
        pq: getPQState(),
        distances: getDistancesState(),
        parents: getParentsState(),
        current,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    const neighbors = adjList.get(current) || [];
    for (const neighbor of neighbors) {
      const v = neighbor.node;
      const weight = neighbor.weight;
      const distU = distances.get(current)!;
      const distV = distances.get(v)!;

      activeNodes.clear();
      activeNodes.add(current);
      activeNodes.add(v);

      const edgeId1 = `${current}-${v}`;
      const edgeId2 = `${v}-${current}`;
      const matchingEdge = graph.edges.find(e => e.id === edgeId1 || e.id === edgeId2);
      if (matchingEdge) {
        activeEdges.add(matchingEdge.id);
      }

      frames.push({
        index: frameIdx++,
        description: `Examining neighbor ${v} with edge weight ${weight}. Checking: dist[${current}] + ${weight} < dist[${v}] (${distU} + ${weight} < ${distV === Infinity ? '∞' : distV})`,
        data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [v],
        pointers: { current, neighbor: v } as Record<string, string | number>,
        codeLineHighlight: 9, // IF dist[current] + weight < dist[neighbor]
        variables: {
          pq: getPQState(),
          distances: getDistancesState(),
          parents: getParentsState(),
          current,
          neighbor: v,
        },
        meta: { statusMap: {}, legend: baseLegend },
        timestamp: frameIdx * 600,
      });

      if (distU + weight < distV) {
        distances.set(v, distU + weight);
        parents.set(v, current);
        pq.enqueue(v, distU + weight);

        if (matchingEdge) {
          visitedEdges.add(matchingEdge.id);
        }

        frames.push({
          index: frameIdx++,
          description: `Relaxed distance to node ${v}. Updated distance: ${distU + weight}, parent: ${current}. Added to PQ.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
          highlights: [v],
          pointers: { current, neighbor: v } as Record<string, string | number>,
          codeLineHighlight: 10, // dist[neighbor] = dist[current] + weight ...
          variables: {
            pq: getPQState(),
            distances: getDistancesState(),
            parents: getParentsState(),
            current,
            neighbor: v,
          },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      } else {
        frames.push({
          index: frameIdx++,
          description: `No update needed for node ${v}. Existing distance ${distV === Infinity ? '∞' : distV} is shorter.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
          highlights: [v],
          pointers: { current, neighbor: v } as Record<string, string | number>,
          codeLineHighlight: 9,
          variables: {
            pq: getPQState(),
            distances: getDistancesState(),
            parents: getParentsState(),
            current,
            neighbor: v,
          },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      }
      activeEdges.clear();
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Dijkstra complete. All reachable shortest path distances found.`,
    data: graphToGraphData(graph, visitedNodes, new Set(), new Set(), visitedEdges, nodePositions),
    highlights: [],
    pointers: {} as Record<string, string | number>,
    codeLineHighlight: 0,
    variables: {
      distances: getDistancesState(),
      parents: getParentsState(),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
