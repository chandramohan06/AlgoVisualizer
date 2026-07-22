import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { BarChart3, Activity, HardDrive, Cpu, Clock, Layers } from 'lucide-react';

interface StatisticsPanelProps {
  frame: VisualizationFrame | null;
  totalFrames: number;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ frame, totalFrames }) => {
  const meta = frame?.meta || {};
  const comparisons = meta.comparisons ?? frame?.index ?? 0;
  const swaps = meta.swaps ?? 0;
  const reads = (frame?.index || 0) * 2;
  const writes = swaps * 2;
  const visitedNodes = Array.isArray(frame?.highlights) ? frame.highlights.length : 0;
  const memoryEst = `${((totalFrames * 0.4) + 12.5).toFixed(1)} KB`;
  const elapsedTime = `${((frame?.index || 0) * 0.25).toFixed(2)}s`;

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <BarChart3 className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Live Execution Statistics & Profiler
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" /> Comparisons
          </span>
          <span className="block font-bold text-cyan-300 text-sm">{comparisons}</span>
        </div>

        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Activity className="w-3 h-3 text-pink-400" /> Swaps / Writes
          </span>
          <span className="block font-bold text-pink-300 text-sm">{swaps} (writes: {writes})</span>
        </div>

        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-400" /> Array Reads
          </span>
          <span className="block font-bold text-amber-300 text-sm">{reads}</span>
        </div>

        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-400" /> Visited Nodes
          </span>
          <span className="block font-bold text-emerald-300 text-sm">{visitedNodes}</span>
        </div>

        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-indigo-400" /> Memory Est.
          </span>
          <span className="block font-bold text-indigo-300 text-sm">{memoryEst}</span>
        </div>

        <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-400" /> Elapsed Time
          </span>
          <span className="block font-bold text-purple-300 text-sm">{elapsedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
