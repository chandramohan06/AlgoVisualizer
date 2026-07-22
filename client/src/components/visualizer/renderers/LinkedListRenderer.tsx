import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface LinkedListRendererProps {
  frame: VisualizationFrame | null;
}

export const LinkedListRenderer: React.FC<LinkedListRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const rawData = frame.data;
  const nodes: { id: string; value: number }[] = Array.isArray(rawData)
    ? rawData.map((val, idx) => ({ id: String(idx), value: val }))
    : (rawData as any)?.nodes || [
        { id: '0', value: 10 },
        { id: '1', value: 20 },
        { id: '2', value: 30 },
        { id: '3', value: 40 },
      ];

  const pointers = frame.pointers || {};
  const meta = frame.meta as Record<string, any> | undefined;
  const statusMap = meta?.statusMap as Record<string | number, string> | undefined;

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl overflow-x-auto">
      {/* Pointers Header Indicator */}
      <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
          Head: Node {nodes[0]?.value ?? 'NULL'}
        </span>
        {meta?.isCircular && (
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">
            Circular Linked List
          </span>
        )}
      </div>

      {/* Linked List Nodes Sequence */}
      <div className="flex items-center gap-2 min-w-full justify-center p-4">
        {nodes.map((node, idx) => {
          const activePointers = Object.entries(pointers).filter(([, pos]) => String(pos) === String(node.id) || Number(pos) === idx);
          const status = statusMap?.[idx] || statusMap?.[node.id];

          let nodeStyle = 'bg-[#1E293B] border-white/10 text-slate-200';
          if (status === 'success') nodeStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/30';
          if (status === 'warning') nodeStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/30';
          if (status === 'danger') nodeStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/30';

          return (
            <React.Fragment key={node.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                {/* Pointer tags */}
                <div className="flex flex-col items-center gap-1 min-h-[26px] justify-end">
                  {activePointers.map(([pName]) => (
                    <span
                      key={pName}
                      className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse"
                    >
                      {pName}
                    </span>
                  ))}
                </div>

                {/* Node Box */}
                <div className={`flex items-center border rounded-xl overflow-hidden shadow-lg transition-all ${nodeStyle}`}>
                  <div className="px-4 py-3 font-mono font-bold text-sm bg-black/20 border-r border-white/10">
                    {node.value}
                  </div>
                  <div className="px-2.5 py-3 text-[10px] font-mono text-slate-400 font-semibold bg-white/[0.02]">
                    next
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 font-bold">Node #{idx}</span>
              </motion.div>

              {/* Arrow Connector */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center text-indigo-400 px-1 font-bold text-lg animate-pulse">
                  &rarr;
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Null Pointer Terminator */}
        {!meta?.isCircular && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-indigo-400 font-bold text-lg">&rarr;</span>
            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-500 text-xs font-mono font-bold">
              NULL
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedListRenderer;
