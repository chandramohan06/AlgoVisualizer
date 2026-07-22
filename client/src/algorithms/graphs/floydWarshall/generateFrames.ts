import { type VisualizationFrame } from '@store/visualizationStore';
import { graphToGraphData, createCircularLayout } from '../shared';
import type { Graph } from '../shared';

export const generateFloydWarshallFrames = (
  graph: Graph,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-amber-400', label: 'Intermediate node (k)' },
    { color: 'bg-emerald-500', label: 'Source node (i)' },
    { color: 'bg-indigo-500', label: 'Target node (j)' },
  ];

  const V = graph.vertices.length;
  const dist = new Map<string, Map<string, number>>();

  // Initialize distance matrix
  graph.vertices.forEach(v1 => {
    dist.set(v1.id, new Map<string, number>());
    graph.vertices.forEach(v2 => {
      if (v1.id === v2.id) {
        dist.get(v1.id)!.set(v2.id, 0);
      } else {
        dist.get(v1.id)!.set(v2.id, Infinity);
      }
    });
  });

  graph.edges.forEach(edge => {
    dist.get(edge.source)!.set(edge.target, edge.weight ?? 1);
    if (!graph.directed) {
      dist.get(edge.target)!.set(edge.source, edge.weight ?? 1);
    }
  });

  const getMatrixState = () => {
    const obj: Record<string, string | number> = {};
    graph.vertices.forEach(v1 => {
      graph.vertices.forEach(v2 => {
        const d = dist.get(v1.id)!.get(v2.id)!;
        obj[`dist[${v1.id}][${v2.id}]`] = d === Infinity ? '∞' : d;
      });
    });
    return obj;
  };

  frames.push({
    index: frameIdx++,
    description: `Floyd-Warshall initialized. Distance matrix loaded with direct edge weights.`,
    data: graphToGraphData(graph, new Set(), new Set(), new Set(), new Set(), nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 1, // dist initialized
    variables: {
      matrix: getMatrixState(),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  // Floyd-Warshall main loops
  for (let k = 0; k < V; k++) {
    const nodeK = graph.vertices[k].id;

    for (let i = 0; i < V; i++) {
      const nodeI = graph.vertices[i].id;

      for (let j = 0; j < V; j++) {
        const nodeJ = graph.vertices[j].id;

        // Skip trivial checks
        if (nodeI === nodeJ || nodeI === nodeK || nodeJ === nodeK) continue;

        const distIK = dist.get(nodeI)!.get(nodeK)!;
        const distKJ = dist.get(nodeK)!.get(nodeJ)!;
        const distIJ = dist.get(nodeI)!.get(nodeJ)!;

        if (distIK === Infinity || distKJ === Infinity) continue;

        const activeNodes = new Set<string>([nodeK, nodeI, nodeJ]);
        const statusMap = {
          [nodeK]: 'warning' as const,  // intermediate
          [nodeI]: 'success' as const,  // source
          [nodeJ]: 'highlighted' as const // target
        };

        frames.push({
          index: frameIdx++,
          description: `Checking node ${nodeK} as intermediate node. Is path ${nodeI} → ${nodeK} → ${nodeJ} (${distIK} + ${distKJ} = ${distIK + distKJ}) shorter than current ${nodeI} → ${nodeJ} (${distIJ === Infinity ? '∞' : distIJ})?`,
          data: graphToGraphData(graph, new Set(), activeNodes, new Set(), new Set(), nodePositions),
          highlights: [nodeK, nodeI, nodeJ],
          pointers: { k: nodeK, i: nodeI, j: nodeJ },
          codeLineHighlight: 9, // IF dist[i][k] + dist[k][j] < dist[i][j]
          variables: {
            matrix: getMatrixState(),
            k: nodeK,
            i: nodeI,
            j: nodeJ,
            checking: `dist[${nodeI}][${nodeK}] + dist[${nodeK}][${nodeJ}] < dist[${nodeI}][${nodeJ}]`,
          },
          meta: { statusMap, legend: baseLegend },
          timestamp: frameIdx * 600,
        });

        if (distIK + distKJ < distIJ) {
          dist.get(nodeI)!.set(nodeJ, distIK + distKJ);

          frames.push({
            index: frameIdx++,
            description: `Updated shortest path ${nodeI} → ${nodeJ} to ${distIK + distKJ}.`,
            data: graphToGraphData(graph, new Set(), activeNodes, new Set(), new Set(), nodePositions),
            highlights: [nodeI, nodeJ],
            pointers: { k: nodeK, i: nodeI, j: nodeJ },
            codeLineHighlight: 10, // dist[i][j] = dist[i][k] + dist[k][j]
            variables: {
              matrix: getMatrixState(),
              k: nodeK,
              i: nodeI,
              j: nodeJ,
            },
            meta: { statusMap, legend: baseLegend },
            timestamp: frameIdx * 600,
          });
        }
      }
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Floyd-Warshall complete. Shortest path distances for all pairs have been calculated.`,
    data: graphToGraphData(graph, new Set(), new Set(), new Set(), new Set(), nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: {
      matrix: getMatrixState(),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
