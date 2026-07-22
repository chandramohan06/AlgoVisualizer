import { type VisualizationFrame } from '@store/visualizationStore';
import { createCircularLayout, DisjointSet } from '../shared';
import type { Graph, Edge } from '../shared';

export const generateUnionFindFrames = (
  graph: Graph,
  operations: Array<[string, string]> = [],
): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  const nodePositions = createCircularLayout(graph);
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-amber-400', label: 'Probing element / Node' },
    { color: 'bg-emerald-500', label: 'Set Representative (Root)' },
    { color: 'bg-indigo-500', label: 'Merged Root / New Link' },
  ];

  const ds = new DisjointSet();
  graph.vertices.forEach(v => {
    ds.makeSet(v.id);
  });

  const getParentEdges = (): Edge[] => {
    const edges: Edge[] = [];
    graph.vertices.forEach(v => {
      const p = ds.getParent(v.id);
      if (p !== undefined && p !== v.id) {
        edges.push({
          id: `parent-edge-${v.id}`,
          source: v.id,
          target: p,
          directed: true,
        });
      }
    });
    return edges;
  };

  const getGraphData = (active: Set<string> = new Set(), roots: Set<string> = new Set()) => {
    const nodes = graph.vertices.map(v => {
      const pos = nodePositions.get(v.id) || { x: 100, y: 100 };
      let status: 'default' | 'warning' | 'success' | 'highlighted' = 'default';
      if (active.has(v.id)) status = 'warning';
      else if (roots.has(v.id)) status = 'success';
      
      return {
        id: v.id,
        value: v.value,
        x: pos.x,
        y: pos.y,
        status,
      };
    });

    const edges = getParentEdges().map(e => {
      const isActive = active.has(e.source) || active.has(e.target);
      return {
        ...e,
        status: isActive ? 'warning' as const : 'default' as const,
      };
    });

    return {
      nodes,
      edges,
      layout: 'free' as const,
    };
  };

  const getDisjointSetState = () => {
    const obj: Record<string, string> = {};
    graph.vertices.forEach(v => {
      const parent = ds.getParent(v.id) || v.id;
      const rank = ds.getRank(v.id) || 0;
      obj[v.id] = `parent: ${parent}, rank: ${rank}`;
    });
    return obj;
  };

  // Initial frame
  frames.push({
    index: frameIdx++,
    description: `Union-Find initialized. Each element forms its own disjoint set of rank 0.`,
    data: getGraphData(),
    highlights: [],
    pointers: {},
    codeLineHighlight: 1, // makeSet
    variables: {
      disjointSet: getDisjointSetState(),
      currentOperation: 'Initialize',
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  // Default operations if none provided
  const ops = operations.length > 0 ? operations : [
    [graph.vertices[0]?.id || '0', graph.vertices[1]?.id || '1'],
    [graph.vertices[2]?.id || '2', graph.vertices[3]?.id || '3'],
    [graph.vertices[1]?.id || '1', graph.vertices[3]?.id || '3'],
  ];

  for (const [u, v] of ops) {
    const active = new Set([u, v]);

    // 1. Probing union
    frames.push({
      index: frameIdx++,
      description: `Calling union(${u}, ${v}) to merge their sets.`,
      data: getGraphData(active),
      highlights: [u, v],
      pointers: { op1: u, op2: v },
      codeLineHighlight: 9, // union(x, y)
      variables: {
        disjointSet: getDisjointSetState(),
        currentOperation: `union(${u}, ${v})`,
      },
      meta: { statusMap: { [u]: 'warning', [v]: 'warning' }, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    // 2. Perform Find for U
    const rootU = ds.find(u);
    frames.push({
      index: frameIdx++,
      description: `find(${u}) returned root ${rootU}. Path compression applied if necessary.`,
      data: getGraphData(new Set([u]), new Set([rootU])),
      highlights: [u, rootU],
      pointers: { op1: u, root1: rootU },
      codeLineHighlight: 5, // find(x)
      variables: {
        disjointSet: getDisjointSetState(),
        currentOperation: `find(${u}) = ${rootU}`,
      },
      meta: { statusMap: { [u]: 'warning', [rootU]: 'success' }, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    // 3. Perform Find for V
    const rootV = ds.find(v);
    frames.push({
      index: frameIdx++,
      description: `find(${v}) returned root ${rootV}. Path compression applied if necessary.`,
      data: getGraphData(new Set([v]), new Set([rootV])),
      highlights: [v, rootV],
      pointers: { op2: v, root2: rootV },
      codeLineHighlight: 5, // find(y)
      variables: {
        disjointSet: getDisjointSetState(),
        currentOperation: `find(${v}) = ${rootV}`,
      },
      meta: { statusMap: { [v]: 'warning', [rootV]: 'success' }, legend: baseLegend },
      timestamp: frameIdx * 600,
    });

    // 4. Union the roots
    if (rootU !== rootV) {
      ds.union(u, v);

      frames.push({
        index: frameIdx++,
        description: `Roots differ (${rootU} ≠ ${rootV}). Linked root ${rootU} to root ${rootV} based on rank.`,
        data: getGraphData(new Set([rootU, rootV]), new Set([rootV])),
        highlights: [rootU, rootV],
        pointers: { root1: rootU, root2: rootV },
        codeLineHighlight: 11, // link roots
        variables: {
          disjointSet: getDisjointSetState(),
          currentOperation: `Link ${rootU} → ${rootV}`,
        },
        meta: { statusMap: { [rootU]: 'highlighted', [rootV]: 'success' }, legend: baseLegend },
        timestamp: frameIdx * 600,
      });
    } else {
      frames.push({
        index: frameIdx++,
        description: `Roots are identical (${rootU} = ${rootV}). Elements are already in the same set. No union needed.`,
        data: getGraphData(new Set(), new Set([rootU])),
        highlights: [rootU],
        pointers: { root: rootU },
        codeLineHighlight: 10,
        variables: {
          disjointSet: getDisjointSetState(),
          currentOperation: `Skip Union`,
        },
        meta: { statusMap: { [rootU]: 'success' }, legend: baseLegend },
        timestamp: frameIdx * 600,
      });
    }
  }

  frames.push({
    index: frameIdx++,
    description: `Disjoint Set operations complete. Final partition of subsets shown.`,
    data: getGraphData(),
    highlights: [],
    pointers: {},
    codeLineHighlight: 0,
    variables: {
      disjointSet: getDisjointSetState(),
      sets: Array.from(ds.getSets().values()),
    },
    meta: { statusMap: {}, legend: baseLegend },
    timestamp: frameIdx * 600,
  });

  return frames;
};
