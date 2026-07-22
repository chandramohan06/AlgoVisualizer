import type { GraphData, LayoutStrategy, LayoutType } from './types';

const NODE_WIDTH = 60;
const NODE_HEIGHT = 40;
const NODE_GAP = 40;
const START_X = 50;
const START_Y = 100;

export class LinearHorizontalLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'linear-horizontal';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    const nodes = data.nodes.map((node, idx) => ({
      ...node,
      x: START_X + idx * (NODE_WIDTH + NODE_GAP),
      y: START_Y,
    }));

    return { ...data, nodes, layout: this.type };
  }
}

export class LinearVerticalLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'linear-vertical';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    const nodes = data.nodes.map((node, idx) => ({
      ...node,
      x: START_X,
      y: START_Y + idx * (NODE_HEIGHT + NODE_GAP),
    }));

    return { ...data, nodes, layout: this.type };
  }
}

export class TreeLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'tree';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    const nodes = [...data.nodes];
    const children = new Map<string, string[]>();

    // Build children map
    data.edges.forEach(edge => {
      if (!children.has(edge.source)) {
        children.set(edge.source, []);
      }
      children.get(edge.source)!.push(edge.target);
    });

    // Find root (node with no incoming edges)
    const hasIncoming = new Set(data.edges.map(e => e.target));
    const roots = nodes.filter(n => !hasIncoming.has(n.id));
    const root = roots[0] || nodes[0];

    // Calculate positions recursively
    const levels = new Map<string, number>();
    const positions = new Map<string, number>();

    const calculateLevel = (nodeId: string, level: number): void => {
      levels.set(nodeId, level);
      const nodeChildren = children.get(nodeId) || [];
      nodeChildren.forEach(childId => calculateLevel(childId, level + 1));
    };

    const calculatePosition = (nodeId: string, left: number, right: number): void => {
      const nodeChildren = children.get(nodeId) || [];
      const width = right - left;
      
      if (nodeChildren.length === 0) {
        positions.set(nodeId, left + width / 2);
      } else {
        const childWidth = width / nodeChildren.length;
        nodeChildren.forEach((childId, idx) => {
          calculatePosition(childId, left + idx * childWidth, left + (idx + 1) * childWidth);
        });
        
        // Position parent in middle of children
        const childPositions = nodeChildren.map(id => positions.get(id) || 0);
        positions.set(nodeId, (Math.min(...childPositions) + Math.max(...childPositions)) / 2);
      }
    };

    calculateLevel(root.id, 0);
    calculatePosition(root.id, 0, 600);

    const positionedNodes = nodes.map(node => ({
      ...node,
      x: positions.get(node.id) || START_X,
      y: START_Y + (levels.get(node.id) || 0) * 80,
    }));

    return { ...data, nodes: positionedNodes, layout: this.type };
  }
}

export class RadialLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'radial';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    const centerX = 300;
    const centerY = 120;
    const radius = 100;
    const nodes = data.nodes;

    const positionedNodes = nodes.map((node, idx) => {
      const angle = (2 * Math.PI * idx) / nodes.length;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    return { ...data, nodes: positionedNodes, layout: this.type };
  }
}

export class GridLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'grid';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    const nodes = data.nodes;
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const positionedNodes = nodes.map((node, idx) => ({
      ...node,
      x: START_X + (idx % cols) * (NODE_WIDTH + NODE_GAP),
      y: START_Y + Math.floor(idx / cols) * (NODE_HEIGHT + NODE_GAP),
    }));

    return { ...data, nodes: positionedNodes, layout: this.type };
  }
}

export class FreeLayout<T = any> implements LayoutStrategy<T> {
  type: LayoutType = 'free';

  calculateLayout(data: GraphData<T>): GraphData<T> {
    // Keep existing positions, just set layout type
    return { ...data, layout: this.type };
  }
}

export function getLayoutStrategy<T = any>(type: LayoutType): LayoutStrategy<T> {
  switch (type) {
    case 'linear-horizontal':
      return new LinearHorizontalLayout<T>();
    case 'linear-vertical':
      return new LinearVerticalLayout<T>();
    case 'tree':
      return new TreeLayout<T>();
    case 'radial':
      return new RadialLayout<T>();
    case 'grid':
      return new GridLayout<T>();
    case 'free':
      return new FreeLayout<T>();
    default:
      return new FreeLayout<T>();
  }
}
