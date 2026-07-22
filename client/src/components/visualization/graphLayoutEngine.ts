export interface IGraphNodeInput {
  id: string;
  label: string;
  val?: number;
}

export interface IGraphEdgeInput {
  id: string;
  fromId: string;
  toId: string;
  weight?: number;
  isDirected?: boolean;
}

export interface IGraphNodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  state: 'default' | 'active' | 'visited' | 'path' | 'frontier' | 'processing';
  dist?: string | number;
  inDegree?: number;
  component?: number;
  discoveryTime?: number;
  finishTime?: number;
}

export interface IGraphEdgeData {
  id: string;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  weight?: number;
  isDirected?: boolean;
  state: 'default' | 'active' | 'visited' | 'path' | 'frontier';
  pathD: string;
}

export interface IGraphStats {
  vertices: number;
  edges: number;
  density: string;
  components: number;
  hasCycle: boolean;
  avgDegree: string;
}

export interface IGraphLayoutResult {
  nodes: IGraphNodeData[];
  edges: IGraphEdgeData[];
  stats: IGraphStats;
}

/**
 * Reusable Graph Layout Engine
 * Computes deterministic (x,y) positioning for Circular, Grid, and Force layouts.
 * Automatically generates curved SVG paths, directed arrow coordinates, and edge weights.
 */
export const calculateGraphLayout = (
  rawNodes: IGraphNodeInput[],
  rawEdges: IGraphEdgeInput[],
  activeNodeId?: string,
  visitedNodeIds: string[] = [],
  pathEdgeIds: string[] = [],
  layoutType: 'circular' | 'grid' | 'hierarchical' = 'circular',
  width: number = 750,
  height: number = 320
): IGraphLayoutResult => {
  const n = rawNodes.length;
  const nodes: IGraphNodeData[] = [];
  const edges: IGraphEdgeData[] = [];

  const centerX = width / 2;
  const centerY = height / 2 + 10;
  const radius = Math.min(width, height) * 0.38;

  // 1. POSITION NODES
  rawNodes.forEach((node, idx) => {
    let x = centerX;
    let y = centerY;

    if (layoutType === 'circular') {
      const angle = (2 * Math.PI * idx) / Math.max(1, n) - Math.PI / 2;
      x = centerX + radius * Math.cos(angle);
      y = centerY + radius * Math.sin(angle);
    } else if (layoutType === 'grid') {
      const cols = Math.ceil(Math.sqrt(n));
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      const stepX = (width - 120) / Math.max(1, cols - 1);
      const stepY = (height - 100) / Math.max(1, Math.ceil(n / cols) - 1);
      x = 60 + col * (cols === 1 ? 0 : stepX);
      y = 50 + row * (Math.ceil(n / cols) === 1 ? 0 : stepY);
    } else {
      // Hierarchical
      const level = Math.floor(idx / 3);
      const pos = idx % 3;
      x = 100 + pos * ((width - 200) / 2);
      y = 50 + level * 80;
    }

    const isActive = activeNodeId === node.id;
    const isVisited = visitedNodeIds.includes(node.id);

    nodes.push({
      id: node.id,
      label: node.label,
      x,
      y,
      state: isActive ? 'active' : isVisited ? 'visited' : 'default',
    });
  });

  // 2. COLLISION AVOIDANCE & FORCE STABILIZATION
  const minNodeDist = 70;
  for (let iter = 0; iter < 15; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < minNodeDist) {
          const overlap = (minNodeDist - dist) / 2;
          const nx = (dx / dist) * overlap;
          const ny = (dy / dist) * overlap;
          nodes[i].x -= nx;
          nodes[i].y -= ny;
          nodes[j].x += nx;
          nodes[j].y += ny;
        }
      }
    }
  }

  // 3. AUTO FIT BOUNDING BOX NORMALIZATION (85% Canvas Fill, 80px Safe Margins)
  if (nodes.length > 0) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach((n) => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });

    const currentW = Math.max(1, maxX - minX);
    const currentH = Math.max(1, maxY - minY);

    const targetMarginX = 80;
    const targetMarginY = 60;
    const targetW = width - targetMarginX * 2;
    const targetH = height - targetMarginY * 2;

    const scaleX = currentW > 0 ? targetW / currentW : 1;
    const scaleY = currentH > 0 ? targetH / currentH : 1;
    const scale = Math.min(scaleX, scaleY, 1.2); // Cap max zoom scaling

    const graphCenterX = (minX + maxX) / 2;
    const graphCenterY = (minY + maxY) / 2;

    nodes.forEach((n) => {
      n.x = centerX + (n.x - graphCenterX) * scale;
      n.y = centerY + (n.y - graphCenterY) * scale;
    });
  }

  // 4. POSITION & CURVE EDGES AFTER NORMALIZATION
  rawEdges.forEach((edge) => {
    const fromNode = nodes.find((n) => n.id === edge.fromId);
    const toNode = nodes.find((n) => n.id === edge.toId);

    if (fromNode && toNode) {
      const isPath = pathEdgeIds.includes(edge.id);
      const isVisited = visitedNodeIds.includes(edge.fromId) && visitedNodeIds.includes(edge.toId);
      const isActive = activeNodeId === edge.fromId || activeNodeId === edge.toId;

      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const normX = -dy / dist;
      const normY = dx / dist;

      const curveOffset = 18;
      const ctrlX = midX + normX * curveOffset;
      const ctrlY = midY + normY * curveOffset;

      const pathD = `M ${fromNode.x} ${fromNode.y} Q ${ctrlX} ${ctrlY} ${toNode.x} ${toNode.y}`;

      edges.push({
        id: edge.id,
        fromId: edge.fromId,
        toId: edge.toId,
        fromX: fromNode.x,
        fromY: fromNode.y,
        toX: toNode.x,
        toY: toNode.y,
        weight: edge.weight,
        isDirected: edge.isDirected,
        state: isPath ? 'path' : isActive ? 'active' : isVisited ? 'visited' : 'default',
        pathD,
      });
    }
  });

  // 5. GRAPH STATISTICS
  const maxEdges = (n * (n - 1)) / 2;
  const density = maxEdges > 0 ? ((rawEdges.length / maxEdges) * 100).toFixed(1) + '%' : '0%';
  const avgDeg = n > 0 ? ((2 * rawEdges.length) / n).toFixed(1) : '0';

  const stats: IGraphStats = {
    vertices: n,
    edges: rawEdges.length,
    density,
    components: 1,
    hasCycle: rawEdges.length >= n,
    avgDegree: avgDeg,
  };

  return { nodes, edges, stats };
};
