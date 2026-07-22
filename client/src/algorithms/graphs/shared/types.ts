export interface Vertex<T = any> {
  id: string;
  value: T;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  directed?: boolean;
}

export interface WeightedEdge extends Edge {
  weight: number;
}

export interface Graph<T = any> {
  vertices: Vertex<T>[];
  edges: Edge[];
  directed: boolean;
}

export interface GraphFrameMeta {
  activeNodes?: string[];
  activeEdges?: string[];
  visitedNodes?: Set<string>;
  visitedEdges?: Set<string>;
  frontier?: string[];
  currentNode?: string;
  currentEdge?: string;
  distances?: Map<string, number>;
  parents?: Map<string, string>;
  queue?: string[];
  stack?: string[];
  priorityQueue?: Array<{ node: string; priority: number }>;
  disjointSets?: Map<string, string>;
  explanation?: string;
  codeLine?: number;
  metadata?: Record<string, any>;
}
