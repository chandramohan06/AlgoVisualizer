import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface TreeRendererProps {
  frame: VisualizationFrame | null;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const rawData = frame.data as any;
  const nodes = rawData?.nodes || [
    { id: '1', label: '10', value: 10, x: 250, y: 40 },
    { id: '2', label: '5', value: 5, x: 150, y: 110 },
    { id: '3', label: '15', value: 15, x: 350, y: 110 },
    { id: '4', label: '2', value: 2, x: 100, y: 180 },
    { id: '5', label: '7', value: 7, x: 200, y: 180 },
  ];

  const edges = rawData?.edges || [
    { fromX: 250, fromY: 40, toX: 150, toY: 110 },
    { fromX: 250, fromY: 40, toX: 350, toY: 110 },
    { fromX: 150, fromY: 110, toX: 100, toY: 180 },
    { fromX: 150, fromY: 110, toX: 200, toY: 180 },
  ];

  const highlights = (frame.highlights || []) as string[];
  const meta = frame.meta as Record<string, any> | undefined;
  const statusMap = meta?.statusMap as Record<string, string> | undefined;

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
          Binary Search Tree (BST)
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Nodes: {nodes.length}
        </span>
      </div>

      <div className="w-full max-w-xl bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center shadow-inner">
        <svg viewBox="0 0 500 240" className="w-full max-h-64">
          {/* Edges */}
          {edges.map((edge: any, i: number) => (
            <line
              key={i}
              x1={edge.fromX || edge.x1}
              y1={edge.fromY || edge.y1}
              x2={edge.toX || edge.x2}
              y2={edge.toY || edge.y2}
              stroke="rgba(99, 102, 241, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}

          {/* Nodes */}
          {nodes.map((node: any) => {
            const status = statusMap?.[node.id];
            const isHighlighted = highlights.includes(node.id);

            let circleFill = 'fill-[#1E293B] stroke-white/20';
            if (status === 'success') circleFill = 'fill-emerald-600 stroke-emerald-400';
            if (status === 'warning') circleFill = 'fill-amber-500 stroke-amber-300';
            if (status === 'danger') circleFill = 'fill-rose-600 stroke-rose-400';
            if (isHighlighted) circleFill = 'fill-indigo-600 stroke-indigo-400';

            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                transform={`translate(${node.x || 250}, ${node.y || 120})`}
              >
                <circle r={18} className={`transition-all duration-300 ${circleFill}`} strokeWidth="2.5" />
                <text textAnchor="middle" y={4} className="fill-white font-mono font-bold text-xs">
                  {String(node.value ?? node.label)}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default TreeRenderer;
