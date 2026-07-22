export interface GraphNode {
  id: string;
  value: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  directed?: boolean;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
}
