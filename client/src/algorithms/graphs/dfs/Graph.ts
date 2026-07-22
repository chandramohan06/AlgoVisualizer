import type { Graph } from './types';

export class DFSGraph {
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

  dfsRecursive(startNodeId: string): {
    traversalOrder: string[];
    visited: Set<string>;
  } {
    const visited = new Set<string>();
    const traversalOrder: string[] = [];

    const dfs = (nodeId: string) => {
      visited.add(nodeId);
      traversalOrder.push(nodeId);

      const neighbors = this.adjacencyList.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(startNodeId);
    return { traversalOrder, visited };
  }

  dfsIterative(startNodeId: string): {
    traversalOrder: string[];
    visited: Set<string>;
  } {
    const visited = new Set<string>();
    const traversalOrder: string[] = [];
    const stack: string[] = [startNodeId];

    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (!visited.has(current)) {
        visited.add(current);
        traversalOrder.push(current);

        const neighbors = this.adjacencyList.get(current) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return { traversalOrder, visited };
  }

  getGraph(): Graph {
    return this.graph;
  }

  getAdjacencyList(): Map<string, string[]> {
    return this.adjacencyList;
  }
}
