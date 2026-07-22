import { type VisualizationFrame } from '@store/visualizationStore';
import { buildAdjacencyList, graphToGraphData, createCircularLayout } from '../shared';
import type { Graph } from '../shared';

export const generateTopologicalSortFrames = (
  graph: Graph,
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const adjList = buildAdjacencyList(graph);
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Sorted Node' },
    { color: 'bg-amber-400', label: 'Current Processing Node' },
    { color: 'bg-emerald-500', label: 'In Queue (Indegree = 0)' },
  ];

  const indegrees = new Map<string, number>();
  const topOrder: string[] = [];
  const queue: string[] = [];
  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();
  const activeNodes = new Set<string>();
  const activeEdges = new Set<string>();

  // 1. Calculate indegrees
  graph.vertices.forEach(v => {
    indegrees.set(v.id, 0);
  });

  graph.edges.forEach(edge => {
    indegrees.set(edge.target, (indegrees.get(edge.target) || 0) + 1);
  });

  const getIndegreesState = () => {
    const obj: Record<string, number> = {};
    indegrees.forEach((val, key) => {
      obj[key] = val;
    });
    return obj;
  };

  frames.push({
    index: frameIdx++,
    description: `Topological Sort initialized. Calculated indegrees for all nodes.`,
    data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 1, // indegree array setup
    variables: {
      indegrees: getIndegreesState(),
      queue: [...queue],
      topOrder: [...topOrder],
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  // 2. Queue nodes with indegree 0
  graph.vertices.forEach(v => {
    if (indegrees.get(v.id) === 0) {
      queue.push(v.id);
    }
  });

  const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'> = {};
  queue.forEach(id => {
    statusMap[id] = 'success'; // in queue
  });

  frames.push({
    index: frameIdx++,
    description: `Enqueued all nodes with indegree = 0: [${queue.join(', ')}]`,
    data: graphToGraphData(graph, visitedNodes, new Set(queue), activeEdges, visitedEdges, nodePositions),
    highlights: [...queue],
    pointers: {},
    codeLineHighlight: 8, // IF indegree[v] is 0 -> enqueue
    variables: {
      indegrees: getIndegreesState(),
      queue: [...queue],
      topOrder: [...topOrder],
    },
    meta: { statusMap, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  // 3. Process queue
  while (queue.length > 0) {
    const u = queue.shift()!;
    activeNodes.clear();
    activeNodes.add(u);
    topOrder.push(u);
    visitedNodes.add(u);

    const stepStatusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'> = {};
    queue.forEach(id => {
      stepStatusMap[id] = 'success';
    });
    visitedNodes.forEach(id => {
      stepStatusMap[id] = 'visited';
    });
    stepStatusMap[u] = 'warning';

    frames.push({
      index: frameIdx++,
      description: `Dequeued node ${u} and added it to topological order: [${topOrder.join(', ')}].`,
      data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
      highlights: [u],
      pointers: { current: u },
      codeLineHighlight: 13, // u = queue.dequeue(), topOrder.add(u)
      variables: {
        indegrees: getIndegreesState(),
        queue: [...queue],
        topOrder: [...topOrder],
        current: u,
      },
      meta: { statusMap: stepStatusMap, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    const neighbors = adjList.get(u) || [];
    for (const v of neighbors) {
      // Find edge
      const edge = graph.edges.find(e => e.source === u && e.target === v);
      if (edge) {
        activeEdges.add(edge.id);
      }
      activeNodes.add(v);

      const preIndegree = indegrees.get(v)!;
      indegrees.set(v, preIndegree - 1);

      if (edge) {
        visitedEdges.add(edge.id);
      }

      const checkStatusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'> = {};
      queue.forEach(id => {
        checkStatusMap[id] = 'success';
      });
      visitedNodes.forEach(id => {
        checkStatusMap[id] = 'visited';
      });
      checkStatusMap[u] = 'warning';
      checkStatusMap[v] = 'highlighted';

      frames.push({
        index: frameIdx++,
        description: `Decrementing indegree of neighbor ${v} because of edge ${u} → ${v}. Indegree updated: ${preIndegree} → ${preIndegree - 1}.`,
        data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
        highlights: [v],
        pointers: { current: u, neighbor: v },
        codeLineHighlight: 16, // indegree[neighbor]--
        variables: {
          indegrees: getIndegreesState(),
          queue: [...queue],
          topOrder: [...topOrder],
          current: u,
          neighbor: v,
        },
        meta: { statusMap: checkStatusMap, legend: baseLegend },
        timestamp: frameIdx * 600,
      });

      if (indegrees.get(v) === 0) {
        queue.push(v);
        checkStatusMap[v] = 'success';

        frames.push({
          index: frameIdx++,
          description: `Indegree of neighbor ${v} is now 0. Enqueuing ${v}.`,
          data: graphToGraphData(graph, visitedNodes, activeNodes, activeEdges, visitedEdges, nodePositions),
          highlights: [v],
          pointers: { current: u, neighbor: v },
          codeLineHighlight: 18, // queue.enqueue(v)
          variables: {
            indegrees: getIndegreesState(),
            queue: [...queue],
            topOrder: [...topOrder],
            current: u,
            neighbor: v,
          },
          meta: { statusMap: checkStatusMap, legend: baseLegend },
          timestamp: frameIdx * 600,
        });
      }

      activeEdges.clear();
      activeNodes.clear();
      activeNodes.add(u);
    }
  }

  const finalStatusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default'> = {};
  visitedNodes.forEach(id => {
    finalStatusMap[id] = 'visited';
  });

  frames.push({
    index: frameIdx++,
    description: `Topological Sort complete. Final ordering: [${topOrder.join(', ')}]`,
    data: graphToGraphData(graph, visitedNodes, new Set(), new Set(), visitedEdges, nodePositions),
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: {
      indegrees: getIndegreesState(),
      queue: [...queue],
      topOrder: [...topOrder],
    },
    meta: { statusMap: finalStatusMap, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
