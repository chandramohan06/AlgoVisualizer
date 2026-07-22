import type { GraphData, GenericNode, GenericEdge } from './types';

/**
 * Adapter to convert linked list data to generic graph format
 */
export function adaptLinkedListToGraph(
  data: { nodes: { id: string; value: number; x: number; y: number }[]; edges: { from: string; to: string | null; isBackward?: boolean }[]; isCircular?: boolean }
): GraphData<number> {
  const nodes: GenericNode<number>[] = data.nodes.map(n => ({
    id: n.id,
    value: n.value,
    x: n.x,
    y: n.y,
  }));

  const edges: GenericEdge[] = data.edges
    .filter(e => e.to !== null) // Filter out null targets
    .map((e, idx) => ({
      id: `edge-${idx}`,
      source: e.from,
      target: e.to!,
      directed: true,
      style: e.isBackward ? 'dashed' : 'solid',
    }));

  return {
    nodes,
    edges,
    layout: 'linear-horizontal',
  };
}

/**
 * Adapter to convert tree data to generic graph format
 */
export function adaptTreeToGraph(
  data: { nodes: { id: string; x: number; y: number; value: unknown; label?: string }[]; edges: { fromX: number; fromY: number; toX: number; toY: number }[] }
): GraphData {
  const nodes: GenericNode[] = data.nodes.map(n => ({
    id: n.id,
    value: n.value,
    x: n.x,
    y: n.y,
    label: n.label,
  }));

  // Convert coordinate-based edges to node-based edges
  const edges: GenericEdge[] = [];
  const nodeByPosition = new Map<string, string>();

  data.nodes.forEach(n => {
    nodeByPosition.set(`${n.x},${n.y}`, n.id);
  });

  data.edges.forEach((e, idx) => {
    const sourceId = nodeByPosition.get(`${e.fromX},${e.fromY}`);
    const targetId = nodeByPosition.get(`${e.toX},${e.toY}`);
    
    if (sourceId && targetId) {
      edges.push({
        id: `edge-${idx}`,
        source: sourceId,
        target: targetId,
        directed: true,
      });
    }
  });

  return {
    nodes,
    edges,
    layout: 'tree',
  };
}

/**
 * Adapter to convert array data to generic graph format (for searching)
 */
export function adaptArrayToGraph(
  data: number[],
  highlights: number[],
  _pointers: Record<string, number>
): GraphData<number> {
  const NODE_WIDTH = 60;
  const NODE_GAP = 40;
  const START_X = 50;
  const START_Y = 100;

  const nodes: GenericNode<number>[] = data.map((value, idx) => ({
    id: String(idx),
    value,
    x: START_X + idx * (NODE_WIDTH + NODE_GAP),
    y: START_Y,
    status: highlights.includes(idx) ? 'highlighted' : 'default',
  }));

  // Create edges between consecutive elements
  const edges: GenericEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${i}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      directed: false,
      style: 'dotted',
    });
  }

  return {
    nodes,
    edges,
    layout: 'linear-horizontal',
  };
}
