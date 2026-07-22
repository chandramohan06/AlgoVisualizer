import React from 'react';
import type { EdgeRendererProps, EdgeStyle, NodeStatus } from './types';

function getEdgeStyle(style: EdgeStyle = 'solid'): string {
  switch (style) {
    case 'dashed':
      return 'stroke-dasharray="5,5"';
    case 'dotted':
      return 'stroke-dasharray="2,2"';
    case 'double':
      return 'stroke-width="4"';
    default:
      return '';
  }
}

function getEdgeClass(status: NodeStatus = 'default'): string {
  switch (status) {
    case 'success':
      return 'stroke-emerald-500';
    case 'warning':
      return 'stroke-amber-400';
    case 'danger':
      return 'stroke-rose-500';
    case 'info':
      return 'stroke-sky-400';
    case 'visited':
      return 'stroke-white/10 opacity-40';
    case 'highlighted':
      return 'stroke-indigo-500';
    default:
      return 'stroke-white/20';
  }
}

export const EdgeRenderer: React.FC<EdgeRendererProps> = ({
  edge,
  sourceNode,
  targetNode,
  isCircular = false,
}) => {
  const fromX = sourceNode.x + (sourceNode.radius || 20);
  const fromY = sourceNode.y;
  const toX = targetNode.x - (targetNode.radius || 20);
  const toY = targetNode.y;
  
  const status = edge.status || 'default';
  const edgeClass = getEdgeClass(status);
  const styleAttr = getEdgeStyle(edge.style);
  const strokeWidth = edge.style === 'double' ? 4 : 2;

  // Handle circular edge (self-loop or circular list)
  if (isCircular || edge.source === edge.target) {
    const midX = (fromX + toX) / 2;
    const midY = fromY + 60;
    
    return (
      <g>
        <path
          d={`M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`}
          className={`transition-all duration-300 ${edgeClass}`}
          strokeWidth={strokeWidth}
          fill="none"
          {...(styleAttr ? { dangerouslySetInnerHTML: { __html: styleAttr } } : {})}
        />
        
        {/* Arrow for directed edges */}
        {edge.directed && (
          <polygon
            points={`${toX},${toY} ${toX - 6},${toY - 10} ${toX + 6},${toY - 10}`}
            className={edgeClass}
            transform={`rotate(${Math.atan2(toY - midY, toX - midX) * 180 / Math.PI}, ${toX}, ${toY})`}
          />
        )}
        
        {/* Edge label */}
        {edge.label && (
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            className="fill-gray-400 text-xs font-semibold"
          >
            {edge.label}
          </text>
        )}
        
        {/* Weight label */}
        {edge.weight !== undefined && (
          <text
            x={midX}
            y={midY + 12}
            textAnchor="middle"
            className="fill-gray-500 text-[10px] font-semibold"
          >
            {edge.weight}
          </text>
        )}
      </g>
    );
  }

  // Straight line for regular edges
  return (
    <g>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        className={`transition-all duration-300 ${edgeClass}`}
        strokeWidth={strokeWidth}
        {...(styleAttr ? { dangerouslySetInnerHTML: { __html: styleAttr } } : {})}
      />
      
      {/* Arrow for directed edges */}
      {edge.directed && (
        <polygon
          points={`${toX},${toY} ${toX - 6},${toY - 10} ${toX + 6},${toY - 10}`}
          className={edgeClass}
          transform={`rotate(${Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI}, ${toX}, ${toY})`}
        />
      )}
      
      {/* Edge label */}
      {edge.label && (
        <text
          x={(fromX + toX) / 2}
          y={(fromY + toY) / 2 - 8}
          textAnchor="middle"
          className="fill-gray-400 text-xs font-semibold"
        >
          {edge.label}
        </text>
      )}
      
      {/* Weight label */}
      {edge.weight !== undefined && (
        <text
          x={(fromX + toX) / 2}
          y={(fromY + toY) / 2 + 8}
          textAnchor="middle"
          className="fill-gray-500 text-[10px] font-semibold"
        >
          {edge.weight}
        </text>
      )}
    </g>
  );
};
