import type { Graph } from './types';
import type { GraphData, NodeStatus } from '@components/visualizer/nodeEngine/types';

export function graphToGraphData(
  graph: Graph,
  visitedNodes: Set<string> = new Set(),
  activeNodes: Set<string> = new Set(),
  activeEdges: Set<string> = new Set(),
  visitedEdges: Set<string> = new Set(),
  nodePositions?: Map<string, { x: number; y: number }>
): GraphData {
  const nodes = graph.vertices.map(vertex => {
    const pos = nodePositions?.get(vertex.id) || {
      x: 100 + (parseInt(vertex.id) % 3) * 150,
      y: 50 + Math.floor(parseInt(vertex.id) / 3) * 100,
    };

    let status: NodeStatus = 'default';
    if (activeNodes.has(vertex.id)) status = 'warning';
    else if (visitedNodes.has(vertex.id)) status = 'visited';

    return {
      id: vertex.id,
      value: vertex.value,
      x: pos.x,
      y: pos.y,
      status,
    };
  });

  const edges = graph.edges.map(edge => {
    let status: NodeStatus = 'default';
    if (activeEdges.has(edge.id)) status = 'warning';
    else if (visitedEdges.has(edge.id)) status = 'visited';

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      directed: edge.directed,
      weight: edge.weight,
      status,
    };
  });

  return { nodes, edges, layout: 'free' };
}

export function createCircularLayout(graph: Graph, centerX: number = 400, centerY: number = 150, radius: number = 120): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const n = graph.vertices.length;

  graph.vertices.forEach((vertex, idx) => {
    const angle = (2 * Math.PI * idx) / n;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.set(vertex.id, { x, y });
  });

  return positions;
}

export function createGridLayout(graph: Graph, startX: number = 50, startY: number = 50, cols: number = 3): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const nodeWidth = 100;
  const nodeHeight = 60;

  graph.vertices.forEach((vertex, idx) => {
    const x = startX + (idx % cols) * nodeWidth;
    const y = startY + Math.floor(idx / cols) * nodeHeight;
    positions.set(vertex.id, { x, y });
  });

  return positions;
}

export function getEdgeId(source: string, target: string): string {
  return `${source}-${target}`;
}

export function getEdgeById(graph: Graph, edgeId: string) {
  return graph.edges.find(e => e.id === edgeId);
}

export function getVertexById(graph: Graph, vertexId: string) {
  return graph.vertices.find(v => v.id === vertexId);
}
