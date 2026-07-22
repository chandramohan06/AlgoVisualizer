import type { Graph } from './types';

export class BFSGraph {
  private graph: Graph;
  private adjacencyList: Map<string, string[]>;

  constructor(graph: Graph) {
    this.graph = graph;
    this.adjacencyList = this.buildAdjacencyList();
  }

  private buildAdjacencyList(): Map<string, string[]> {
    const adj = new Map<string, string[]>();
    
    this.graph.nodes.forEach(node => {
      adj.set(node.id, []);
    });

    this.graph.edges.forEach(edge => {
      const neighbors = adj.get(edge.source) || [];
      neighbors.push(edge.target);
      adj.set(edge.source, neighbors);
      
      if (!this.graph.directed) {
        const reverseNeighbors = adj.get(edge.target) || [];
        reverseNeighbors.push(edge.source);
        adj.set(edge.target, reverseNeighbors);
      }
    });

    return adj;
  }

  bfs(startNodeId: string): {
    traversalOrder: string[];
    visited: Set<string>;
    parent: Map<string, string>;
  } {
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const traversalOrder: string[] = [];
    const queue: string[] = [startNodeId];

    visited.add(startNodeId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      traversalOrder.push(current);

      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return { traversalOrder, visited, parent };
  }

  getGraph(): Graph {
    return this.graph;
  }

  getAdjacencyList(): Map<string, string[]> {
    return this.adjacencyList;
  }
}
