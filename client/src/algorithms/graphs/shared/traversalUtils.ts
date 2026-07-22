import type { Graph } from './types';

export function buildAdjacencyList(graph: Graph): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  
  graph.vertices.forEach(vertex => {
    adj.set(vertex.id, []);
  });

  graph.edges.forEach(edge => {
    const neighbors = adj.get(edge.source) || [];
    neighbors.push(edge.target);
    adj.set(edge.source, neighbors);
    
    if (!graph.directed) {
      const reverseNeighbors = adj.get(edge.target) || [];
      reverseNeighbors.push(edge.source);
      adj.set(edge.target, reverseNeighbors);
    }
  });

  return adj;
}

export function buildWeightedAdjacencyList(graph: Graph): Map<string, Array<{ node: string; weight: number }>> {
  const adj = new Map<string, Array<{ node: string; weight: number }>>();
  
  graph.vertices.forEach(vertex => {
    adj.set(vertex.id, []);
  });

  graph.edges.forEach(edge => {
    const neighbors = adj.get(edge.source) || [];
    if (edge.weight !== undefined) {
      neighbors.push({ node: edge.target, weight: edge.weight });
    }
    adj.set(edge.source, neighbors);
    
    if (!graph.directed) {
      const reverseNeighbors = adj.get(edge.target) || [];
      if (edge.weight !== undefined) {
        reverseNeighbors.push({ node: edge.source, weight: edge.weight });
      }
      adj.set(edge.target, reverseNeighbors);
    }
  });

  return adj;
}

export function getNeighbors(adjList: Map<string, string[]>, nodeId: string): string[] {
  return adjList.get(nodeId) || [];
}

export function getWeightedNeighbors(adjList: Map<string, Array<{ node: string; weight: number }>>, nodeId: string): Array<{ node: string; weight: number }> {
  return adjList.get(nodeId) || [];
}
