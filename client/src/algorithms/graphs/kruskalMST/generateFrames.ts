import { type VisualizationFrame } from '@store/visualizationStore';
import { graphToGraphData, createCircularLayout, DisjointSet } from '../shared';
import type { Graph } from '../shared';

export const generateKruskalMSTFrames = (
  graph: Graph,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Selected MST Edge' },
    { color: 'bg-amber-400', label: 'Probing Edge / Vertex' },
    { color: 'bg-rose-500', label: 'Cycle / Ignored Edge' },
  ];

  // 1. Sort edges by weight
  const sortedEdges = [...graph.edges].sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0));

  // 2. Initialize disjoint set
  const ds = new DisjointSet();
  graph.vertices.forEach(v => {
    ds.makeSet(v.id);
  });

  const getDisjointSetState = () => {
    const obj: Record<string, string> = {};
    graph.vertices.forEach(v => {
      obj[v.id] = `parent: ${ds.getParent(v.id) || v.id}`;
    });
    return obj;
  };

  const mstEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  frames.push({
    index: frameIdx++,
    description: `Kruskal's MST initialized. Disjoint Sets created. Edges sorted by weight: [${sortedEdges.map(e => `${e.source}-${e.target}(${e.weight})`).join(', ')}]`,
    data: graphToGraphData(graph, new Set(), activeNodes, activeEdges, mstEdges, nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 1, // Sort edges & makeSet
    variables: {
      disjointSet: getDisjointSetState(),
      sortedEdges: sortedEdges.map(e => `${e.source}-${e.target}(${e.weight})`),
      mstEdgeCount: 0,
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  for (const edge of sortedEdges) {
    const u = edge.source;
    const v = edge.target;

    activeNodes.clear();
    activeNodes.add(u);
    activeNodes.add(v);
    activeEdges.clear();
    activeEdges.add(edge.id);

    const rootU = ds.find(u);
    const rootV = ds.find(v);

    frames.push({
      index: frameIdx++,
      description: `Examining cheapest remaining edge: (${u} - ${v}, weight: ${edge.weight}). Finding representatives: ds.find(${u}) = ${rootU}, ds.find(${v}) = ${rootV}.`,
      data: graphToGraphData(graph, new Set(), activeNodes, activeEdges, mstEdges, nodePositions),
      highlights: [u, v],
      pointers: { u, v },
      codeLineHighlight: 9, // IF ds.find(u) != ds.find(v)
      variables: {
        disjointSet: getDisjointSetState(),
        currentEdge: `${u}-${v}(weight:${edge.weight})`,
        representatives: { [u]: rootU, [v]: rootV },
        mstEdgeCount: mstEdges.size,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    if (rootU !== rootV) {
      ds.union(u, v);
      mstEdges.add(edge.id);

      frames.push({
        index: frameIdx++,
        description: `Representatives differ (${rootU} ≠ ${rootV}). Adding edge to MST and merging sets.`,
        data: graphToGraphData(graph, new Set(), activeNodes, activeEdges, mstEdges, nodePositions),
        highlights: [u, v],
        pointers: { u, v },
        codeLineHighlight: 11, // ds.union(u, v) and mst.add(edge)
        variables: {
          disjointSet: getDisjointSetState(),
          currentEdge: `${u}-${v}`,
          mstEdgeCount: mstEdges.size,
        },
        meta: { statusMap: {}, legend: baseLegend },
        timestamp: frameIdx * 600,
      });
    } else {
      frames.push({
        index: frameIdx++,
        description: `Representatives are the same (${rootU} = ${rootV}). Adding edge (${u} - ${v}) would form a cycle. Skipping.`,
        data: graphToGraphData(graph, new Set(), activeNodes, activeEdges, mstEdges, nodePositions),
        highlights: [u, v],
        pointers: { u, v },
        codeLineHighlight: 9,
        variables: {
          disjointSet: getDisjointSetState(),
          currentEdge: `${u}-${v}`,
          mstEdgeCount: mstEdges.size,
        },
        meta: {
          statusMap: { [u]: 'danger', [v]: 'danger' },
          legend: baseLegend,
        },
        timestamp: frameIdx * 600,
      });
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Kruskal's MST complete. Selected ${mstEdges.size} edges forming the Minimum Spanning Tree.`,
    data: graphToGraphData(graph, new Set(), new Set(), new Set(), mstEdges, nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: {
      disjointSet: getDisjointSetState(),
      mstEdgeCount: mstEdges.size,
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
