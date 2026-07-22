import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { Cpu, Clock, HardDrive, Hash } from 'lucide-react';

interface ComplexityPanelProps {
  timeComplexity?: string;
  spaceComplexity?: string;
  frame: VisualizationFrame | null;
}

export const ComplexityPanel: React.FC<ComplexityPanelProps> = ({
  timeComplexity = 'O(N)',
  spaceComplexity = 'O(1)',
  frame,
}) => {
  const meta = frame?.meta || {};
  const comparisons = meta.comparisons ?? frame?.index ?? 0;
  const swaps = meta.swaps ?? 0;

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <Cpu className="w-4 h-4 text-purple-400" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Complexity & Metrics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Time Complexity */}
        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> Time Complexity
          </span>
          <span className="block font-mono font-bold text-amber-300 text-sm">{timeComplexity}</span>
        </div>

        {/* Space Complexity */}
        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-emerald-400" /> Space Complexity
          </span>
          <span className="block font-mono font-bold text-emerald-300 text-sm">{spaceComplexity}</span>
        </div>

        {/* Operations / Comparisons */}
        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Hash className="w-3 h-3 text-cyan-400" /> Comparisons
          </span>
          <span className="block font-mono font-bold text-cyan-300 text-sm">{comparisons}</span>
        </div>

        {/* Swaps */}
        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Hash className="w-3 h-3 text-pink-400" /> Swaps / Writes
          </span>
          <span className="block font-mono font-bold text-pink-300 text-sm">{swaps}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplexityPanel;
