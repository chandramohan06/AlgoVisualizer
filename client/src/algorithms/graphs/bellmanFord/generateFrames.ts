import { type VisualizationFrame } from '@store/visualizationStore';
import { graphToGraphData, createCircularLayout } from '../shared';
import type { Graph } from '../shared';

export const generateBellmanFordFrames = (
  graph: Graph,
  startNodeId: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Visited / Reachable' },
    { color: 'bg-amber-400', label: 'Current Edge Source/Target' },
    { color: 'bg-rose-500', label: 'Negative Cycle Error' },
  ];

  const distances = new Map<string, number>();
  const parents = new Map<string, string>();
  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  // Initialize distances
  graph.vertices.forEach(v => {
    distances.set(v.id, Infinity);
  });
  distances.set(startNodeId, 0);
  visitedNodes.add(startNodeId);

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
    description: `Bellman-Ford initialized. Source ${startNodeId} distance set to 0. All other distances set to Infinity.`,
    data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
    highlights: [startNodeId],
    pointers: { source: startNodeId } as Record<string, string | number>,
    codeLineHighlight: 1, // dist initialized
    variables: {
      distances: getDistancesState(),
      parents: getParentsState(),
      iteration: 0,
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  const V = graph.vertices.length;

  // Relax edges V - 1 times
  for (let i = 1; i < V; i++) {
    let relaxedAny = false;

    for (const edge of graph.edges) {
      const u = edge.source;
      const v = edge.target;
      const w = edge.weight ?? 0;
      const distU = distances.get(u)!;
      const distV = distances.get(v)!;

      activeNodes.clear();
      activeNodes.add(u);
      activeNodes.add(v);
      activeEdges.clear();
      activeEdges.add(edge.id);

      frames.push({
        index: frameIdx++,
        description: `Pass ${i}/${V - 1}: Relaxing edge (${u} → ${v}, weight: ${w}). Checking if dist[${u}] + ${w} < dist[${v}] (${distU === Infinity ? '∞' : distU} + ${w} < ${distV === Infinity ? '∞' : distV})`,
        data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [u, v],
        pointers: { u, v } as Record<string, string | number>,
        codeLineHighlight: 5, // IF dist[u] + w < dist[v]
        variables: {
          distances: getDistancesState(),
          parents: getParentsState(),
          iteration: i,
          currentEdge: `${u}→${v}`,
        },
        meta: { statusMap: {}, legend: baseLegend },
        timestamp: frameIdx * 600,
      });

      if (distU !== Infinity && distU + w < distV) {
        distances.set(v, distU + w);
        parents.set(v, u);
        visitedNodes.add(v);
        visitedEdges.add(edge.id);
        relaxedAny = true;

        frames.push({
          index: frameIdx++,
          description: `Updated distance to node ${v} to ${distU + w} via node ${u}.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
          highlights: [v],
          pointers: { u, v } as Record<string, string | number>,
          codeLineHighlight: 6, // dist[v] = dist[u] + w
          variables: {
            distances: getDistancesState(),
            parents: getParentsState(),
            iteration: i,
            currentEdge: `${u}→${v}`,
          },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      }
    }

    if (!relaxedAny) {
      frames.push({
        index: frameIdx++,
        description: `No edges relaxed in pass ${i}. Algorithm can terminate early since shortest paths are finalized.`,
        data: graphToGraphData(graph, visitedNodes, new Set(), new Set(), visitedEdges, nodePositions),
        highlights: [],
        pointers: {} as Record<string, string | number>,
        codeLineHighlight: 3,
        variables: {
          distances: getDistancesState(),
          parents: getParentsState(),
          iteration: i,
        },
        meta: { statusMap: {}, legend: baseLegend },
        timestamp: frameIdx * 600,
      });
      break;
    }
  }

  // Check for negative-weight cycles
  let hasNegativeCycle = false;
  for (const edge of graph.edges) {
    const u = edge.source;
    const v = edge.target;
    const w = edge.weight ?? 0;
    const distU = distances.get(u)!;
    const distV = distances.get(v)!;

    if (distU !== Infinity && distU + w < distV) {
      hasNegativeCycle = true;
      activeNodes.clear();
      activeNodes.add(u);
      activeNodes.add(v);
      activeEdges.clear();
      activeEdges.add(edge.id);

      frames.push({
        index: frameIdx++,
        description: `Negative cycle detected! Edge (${u} → ${v}) can still be relaxed: ${distU} + ${w} < ${distV}`,
        data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [u, v],
        pointers: { u, v } as Record<string, string | number>,
        codeLineHighlight: 9, // IF dist[u] + w < dist[v] -> cycle
        variables: {
          distances: getDistancesState(),
          parents: getParentsState(),
          negativeCycleDetected: true,
        },
        meta: {
          statusMap: { [u]: 'danger', [v]: 'danger' },
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
      break;
    }
  }

  if (!hasNegativeCycle) {
    frames.push({
      index: frameIdx++,
      description: `Bellman-Ford complete. No negative weight cycles detected.`,
      data: graphToGraphData(graph, visitedNodes, new Set(), new Set(), visitedEdges, nodePositions),
      highlights: [],
      pointers: {} as Record<string, string | number>,
      codeLineHighlight: 12,
      variables: {
        distances: getDistancesState(),
        parents: getParentsState(),
        negativeCycleDetected: false,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  }

  return frames;
};
