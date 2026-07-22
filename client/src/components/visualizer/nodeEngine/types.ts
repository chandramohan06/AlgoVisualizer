export type NodeStatus = 'success' | 'warning' | 'danger' | 'info' | 'visited' | 'highlighted' | 'default';

export type EdgeStyle = 'solid' | 'dashed' | 'dotted' | 'double';

export type LayoutType = 'linear-horizontal' | 'linear-vertical' | 'tree' | 'radial' | 'grid' | 'free';

export interface GenericNode<T = any> {
  id: string;
  value: T;
  label?: string;
  x: number;
  y: number;
  status?: NodeStatus;
  radius?: number;
  colorOverride?: string;
  metadata?: Record<string, any>;
}

export interface GenericEdge {
  id: string;
  source: string;
  target: string;
  directed?: boolean;
  weight?: number;
  label?: string;
  style?: EdgeStyle;
  status?: NodeStatus;
  metadata?: Record<string, any>;
}

export interface GraphData<T = any> {
  nodes: GenericNode<T>[];
  edges: GenericEdge[];
  layout?: LayoutType;
}

export interface LayoutStrategy<T = any> {
  type: LayoutType;
  calculateLayout(data: GraphData<T>): GraphData<T>;
}

export interface NodeRendererProps<T = any> {
  node: GenericNode<T>;
  isHighlighted?: boolean;
  pointerBadges?: string[];
  pointerStyles?: Record<string, string>;
}

export interface EdgeRendererProps {
  edge: GenericEdge;
  sourceNode: GenericNode;
  targetNode: GenericNode;
  isCircular?: boolean;
}
