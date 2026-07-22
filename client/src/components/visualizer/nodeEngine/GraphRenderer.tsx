import React from 'react';
import { NodeRenderer } from './NodeRenderer';
import { EdgeRenderer } from './EdgeRenderer';
import type { GraphData, LayoutType } from './types';
import { getLayoutStrategy } from './layouts';

interface GraphRendererProps<T = any> {
  data: GraphData<T>;
  highlights?: string[];
  pointers?: Record<string, string>;
  pointerStyles?: Record<string, string>;
  layout?: LayoutType;
  width?: number;
  height?: number;
}

export const GraphRenderer: React.FC<GraphRendererProps> = ({
  data,
  highlights = [],
  pointers = {},
  pointerStyles = {},
  layout = 'free',
  width = 800,
  height = 300,
}) => {
  // Apply layout if specified
  const layoutStrategy = getLayoutStrategy(layout);
  const layoutData = layout !== 'free' ? layoutStrategy.calculateLayout(data) : data;

  const nodeMap = new Map(layoutData.nodes.map(n => [n.id, n]));

  return (
    <div className="w-full bg-[#0b0b12] border border-white/5 rounded-xl p-6 flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-h-64">
        <defs>
          {/* Arrow markers for directed edges */}
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
          </marker>
        </defs>

        {/* Render edges first (behind nodes) */}
        {layoutData.edges.map((edge) => {
          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          
          if (!sourceNode || !targetNode) return null;

          const isCircular = edge.source === edge.target || 
                           (layoutData.nodes.length > 0 && 
                            edge.target === layoutData.nodes[0].id && 
                            edge.source === layoutData.nodes[layoutData.nodes.length - 1].id);

          return (
            <EdgeRenderer
              key={edge.id}
              edge={edge}
              sourceNode={sourceNode}
              targetNode={targetNode}
              isCircular={isCircular}
            />
          );
        })}

        {/* Render nodes */}
        {layoutData.nodes.map((node) => {
          const isHighlighted = highlights.includes(node.id);
          const nodePointers = Object.entries(pointers)
            .filter(([, pos]) => pos === node.id)
            .map(([name]) => name);

          return (
            <NodeRenderer
              key={node.id}
              node={node}
              isHighlighted={isHighlighted}
              pointerBadges={nodePointers}
              pointerStyles={pointerStyles}
            />
          );
        })}
      </svg>
    </div>
  );
};
