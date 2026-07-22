import { type VisualizationFrame } from '@store/visualizationStore';
import { buildWeightedAdjacencyList, graphToGraphData, createCircularLayout, PriorityQueue } from '../shared';
import type { Graph } from '../shared';

export const generatePrimMSTFrames = (
  graph: Graph,
  startNodeId: string,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildWeightedAdjacencyList(graph);
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'In MST' },
    { color: 'bg-amber-400', label: 'Current node u' },
    { color: 'bg-indigo-500', label: 'Candidate Node v' },
  ];

  const keys = new Map<string, number>();
  const parents = new Map<string, string>();
  const inMST = new Set<string>();
  const mstEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  graph.vertices.forEach(v => {
    keys.set(v.id, Infinity);
  });
  keys.set(startNodeId, 0);

  const pq = new PriorityQueue<string>();
  pq.enqueue(startNodeId, 0);

  const getPQState = () => pq.toArray().map(item => `${item.item}(key:${item.priority})`);
  const getKeysState = () => {
    const obj: Record<string, string | number> = {};
    keys.forEach((k, node) => {
      obj[node] = k === Infinity ? '∞' : k;
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
    description: `Prim's MST initialized starting from node ${startNodeId}. Key values set to Infinity.`,
    data: graphToGraphData(graph, inMST, activeNodes, activeEdges, mstEdges, nodePositions),
    highlights: [startNodeId],
    pointers: { startNode: startNodeId },
    codeLineHighlight: 1, // keys/parents initialized
    variables: {
      pq: getPQState(),
      keys: getKeysState(),
      parents: getParentsState(),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  while (!pq.isEmpty()) {
    const u = pq.dequeue()!;
    if (inMST.has(u)) continue;

    inMST.add(u);
    activeNodes.clear();
    activeNodes.add(u);

    // If u has a parent, add edge (parent, u) to MST edges
    const p = parents.get(u);
    if (p !== undefined) {
      const edgeId1 = `${p}-${u}`;
      const edgeId2 = `${u}-${p}`;
      const edge = graph.edges.find(e => e.id === edgeId1 || e.id === edgeId2);
      if (edge) {
        mstEdges.add(edge.id);
      }
    }

    frames.push({
      index: frameIdx++,
      description: `Selected node ${u} with minimum key value. Added to MST.`,
      data: graphToGraphData(graph, inMST, activeNodes, activeEdges, mstEdges, nodePositions),
      highlights: [u],
      pointers: { current: u },
      codeLineHighlight: 9, // u = pq.dequeue(), inMST[u] = true
      variables: {
        pq: getPQState(),
        keys: getKeysState(),
        parents: getParentsState(),
        current: u,
        mstNodes: Array.from(inMST),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    const neighbors = adjList.get(u) || [];
    for (const neighbor of neighbors) {
      const v = neighbor.node;
      const weight = neighbor.weight;

      if (!inMST.has(v)) {
        activeNodes.clear();
        activeNodes.add(u);
        activeNodes.add(v);

        const edgeId1 = `${u}-${v}`;
        const edgeId2 = `${v}-${u}`;
        const edge = graph.edges.find(e => e.id === edgeId1 || e.id === edgeId2);
        if (edge) {
          activeEdges.add(edge.id);
        }

        frames.push({
          index: frameIdx++,
          description: `Checking neighbor ${v}. Is edge weight ${weight} < key[${v}] (${keys.get(v) === Infinity ? '∞' : keys.get(v)})?`,
          data: graphToGraphData(graph, inMST, activeNodes, activeEdges, mstEdges, nodePositions),
          highlights: [v],
          pointers: { current: u, neighbor: v },
          codeLineHighlight: 12, // IF inMST[v] is false AND w < key[v]
          variables: {
            pq: getPQState(),
            keys: getKeysState(),
            parents: getParentsState(),
            current: u,
            neighbor: v,
          },
          meta: { statusMap: {}, legend: baseLegend },
          timestamp: frameIdx * 600,
        });

        if (weight < keys.get(v)!) {
          keys.set(v, weight);
          parents.set(v, u);
          pq.enqueue(v, weight);

          frames.push({
            index: frameIdx++,
            description: `Updated key for node ${v} to ${weight} and parent to ${u}. Enqueued into PQ.`,
            data: graphToGraphData(graph, inMST, activeNodes, activeEdges, mstEdges, nodePositions),
            highlights: [v],
            pointers: { current: u, neighbor: v },
            codeLineHighlight: 13, // key[v] = w ...
            variables: {
              pq: getPQState(),
              keys: getKeysState(),
              parents: getParentsState(),
              current: u,
              neighbor: v,
            },
            meta: { statusMap: {}, legend: baseLegend },
            timestamp: frameIdx * 600,
          });
        }
        activeEdges.clear();
      }
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Prim's MST complete. Minimum Spanning Tree built successfully.`,
    data: graphToGraphData(graph, inMST, new Set(), new Set(), mstEdges, nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: {
      keys: getKeysState(),
      parents: getParentsState(),
      mstNodes: Array.from(inMST),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
