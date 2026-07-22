import React from 'react';
import type { NodeRendererProps, NodeStatus } from './types';

function getNodeClass(status: NodeStatus = 'default'): string {
  switch (status) {
    case 'success':
      return 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30';
    case 'warning':
      return 'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/30';
    case 'danger':
      return 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30';
    case 'info':
      return 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-500/25';
    case 'visited':
      return 'bg-white/[0.04] border-white/5 text-gray-600 opacity-60';
    case 'highlighted':
      return 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25';
    default:
      return 'bg-white/[0.02] border-white/5 text-gray-300';
  }
}

function getPointerClass(style: string): string {
  switch (style) {
    case 'primary':
    case 'indigo':
      return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    case 'secondary':
    case 'purple':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    case 'success':
    case 'emerald':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'danger':
    case 'rose':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    case 'warning':
    case 'amber':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'info':
    case 'sky':
      return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    case 'violet':
      return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
    default:
      return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
  }
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  isHighlighted = false,
  pointerBadges = [],
  pointerStyles = {},
}) => {
  const status = node.status || (isHighlighted ? 'highlighted' : 'default');
  const nodeClass = getNodeClass(status);
  const radius = node.radius || 20;
  const color = node.colorOverride;

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      {/* Node circle/rectangle */}
      {node.label ? (
        // Rectangle for nodes with labels
        <rect
          x={-radius}
          y={-radius / 2}
          width={radius * 2}
          height={radius}
          rx={8}
          className={`transition-all duration-300 ${nodeClass}`}
          style={color ? { backgroundColor: color, borderColor: color } : undefined}
          strokeWidth="2"
        />
      ) : (
        // Circle for simple nodes
        <circle
          r={radius}
          className={`transition-all duration-300 ${nodeClass}`}
          style={color ? { fill: color, stroke: color } : undefined}
          strokeWidth="2"
        />
      )}

      {/* Node value */}
      <text
        x={0}
        y={4}
        textAnchor="middle"
        className="fill-white"
        fontSize={12}
        fontWeight="700"
      >
        {String(node.value)}
      </text>

      {/* Node label */}
      {node.label && (
        <text
          x={0}
          y={radius + 15}
          textAnchor="middle"
          className="fill-gray-500"
          fontSize={9}
          fontWeight="600"
        >
          {node.label}
        </text>
      )}

      {/* Pointer badges */}
      {pointerBadges.length > 0 && (
        <g transform={`translate(0, -radius - 15)`}>
          {pointerBadges.map((badge, idx) => (
            <text
              key={badge}
              x={0}
              y={-idx * 12}
              textAnchor="middle"
              className={`text-[9px] font-bold uppercase tracking-wider border px-1.5 py-0.5 rounded ${getPointerClass(pointerStyles[badge] || 'primary')}`}
            >
              {badge}
            </text>
          ))}
        </g>
      )}
    </g>
  );
};
