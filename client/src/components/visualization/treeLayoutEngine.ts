export interface ITreeNodeData {
  id: string;
  val: number;
  left?: ITreeNodeData | null;
  right?: ITreeNodeData | null;
}

export interface IPositionedTreeNode {
  id: string;
  val: number;
  x: number;
  y: number;
  depth: number;
  level: number;
  parentId?: string;
  address: string;
  state: 'default' | 'active' | 'visited' | 'comparing' | 'inserted' | 'deleted' | 'max' | 'min';
  label?: string;
}

export interface ITreeEdge {
  id: string;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  pathD: string;
  state: 'default' | 'active' | 'visited' | 'path';
}

export interface ITreeStats {
  height: number;
  levels: number;
  leafCount: number;
  internalCount: number;
  nodeCount: number;
  isBalanced: boolean;
}

export interface ITreeLayoutResult {
  nodes: IPositionedTreeNode[];
  edges: ITreeEdge[];
  width: number;
  height: number;
  stats: ITreeStats;
}

const getSimulatedAddress = (val: number, depth: number) => {
  const base = 0x3000 + depth * 0x40 + (val % 32) * 4;
  return `0x${base.toString(16).toUpperCase()}`;
};

/**
 * Reusable Tree Layout Engine
 * Calculates deterministic (x,y) coordinates for hierarchical tree rendering.
 * Guarantees no node overlaps and renders smooth curved SVG edges.
 */
export const calculateTreeLayout = (
  root: ITreeNodeData | null,
  activeNodeId?: string,
  visitedNodeIds: string[] = [],
  activeEdgeIds: string[] = [],
  width: number = 750,
  height: number = 320
): ITreeLayoutResult => {
  const emptyStats: ITreeStats = { height: 0, levels: 0, leafCount: 0, internalCount: 0, nodeCount: 0, isBalanced: true };

  if (!root) {
    return { nodes: [], edges: [], width, height, stats: emptyStats };
  }

  const nodes: IPositionedTreeNode[] = [];
  const edges: ITreeEdge[] = [];

  let leafCount = 0;
  let internalCount = 0;

  // Helper to calculate total leaf count for subtree horizontal spacing
  const getSubtreeWidth = (node?: ITreeNodeData | null): number => {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    return getSubtreeWidth(node.left) + getSubtreeWidth(node.right);
  };

  const getTreeDepth = (node?: ITreeNodeData | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
  };

  const checkBalanced = (node?: ITreeNodeData | null): boolean => {
    if (!node) return true;
    const lh = getTreeDepth(node.left);
    const rh = getTreeDepth(node.right);
    return Math.abs(lh - rh) <= 1 && checkBalanced(node.left) && checkBalanced(node.right);
  };

  const treeHeight = getTreeDepth(root);
  const isBalanced = checkBalanced(root);
  const levelGap = Math.min(75, Math.max(50, (height - 80) / Math.max(1, treeHeight)));
  const topPadding = 45;

  const positionNode = (
    node: ITreeNodeData,
    depth: number,
    leftX: number,
    rightX: number,
    parentId?: string
  ) => {
    const isLeaf = !node.left && !node.right;
    if (isLeaf) leafCount++;
    else internalCount++;

    const x = (leftX + rightX) / 2;
    const y = topPadding + depth * levelGap;

    const isVisited = visitedNodeIds.includes(node.id);
    const isActive = activeNodeId === node.id;

    const state: IPositionedTreeNode['state'] = isActive
      ? 'max'
      : isVisited
      ? 'visited'
      : 'default';

    const positionedNode: IPositionedTreeNode = {
      id: node.id,
      val: node.val,
      x,
      y,
      depth,
      level: depth + 1,
      parentId,
      address: getSimulatedAddress(node.val, depth),
      state,
      label: depth === 0 ? 'ROOT' : undefined,
    };
    nodes.push(positionedNode);

    if (parentId) {
      const parentNode = nodes.find((n) => n.id === parentId);
      if (parentNode) {
        const edgeId = `${parentId}->${node.id}`;
        const isEdgeActive = activeEdgeIds.includes(edgeId);
        const isEdgeVisited = isVisited && visitedNodeIds.includes(parentId);

        const midY = (parentNode.y + y) / 2;
        const pathD = `M ${parentNode.x} ${parentNode.y} C ${parentNode.x} ${midY}, ${x} ${midY}, ${x} ${y}`;

        edges.push({
          id: edgeId,
          fromId: parentId,
          toId: node.id,
          fromX: parentNode.x,
          fromY: parentNode.y,
          toX: x,
          toY: y,
          pathD,
          state: isEdgeActive ? 'active' : isEdgeVisited ? 'visited' : 'default',
        });
      }
    }

    const leftWidth = getSubtreeWidth(node.left);
    const rightWidth = getSubtreeWidth(node.right);
    const totalWidth = Math.max(1, leftWidth + rightWidth);

    const segmentWidth = rightX - leftX;

    if (node.left) {
      const leftRatio = leftWidth / totalWidth;
      positionNode(node.left, depth + 1, leftX, leftX + segmentWidth * leftRatio, node.id);
    }

    if (node.right) {
      const leftRatio = leftWidth / totalWidth;
      positionNode(node.right, depth + 1, leftX + segmentWidth * leftRatio, rightX, node.id);
    }
  };

  positionNode(root, 0, 50, width - 50);

  const stats: ITreeStats = {
    height: treeHeight,
    levels: treeHeight,
    leafCount,
    internalCount,
    nodeCount: nodes.length,
    isBalanced,
  };

  return { nodes, edges, width, height, stats };
};
