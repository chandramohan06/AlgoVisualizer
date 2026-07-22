import React from 'react';
import { IHeatmapDay } from '@algovisualizer/shared';

interface LearningHeatmapProps {
  data: IHeatmapDay[];
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-white/[0.04] border-white/[0.05]',
  1: 'bg-emerald-900/60 border-emerald-700/50 text-emerald-300',
  2: 'bg-emerald-700/80 border-emerald-600/60 text-emerald-200',
  3: 'bg-emerald-500 border-emerald-400 text-emerald-100',
  4: 'bg-emerald-400 border-emerald-300 shadow-sm shadow-emerald-400/50 text-emerald-950 font-bold',
};

export const LearningHeatmap: React.FC<LearningHeatmapProps> = ({ data }) => {
  const totalSubmissions = data.reduce((acc, curr) => acc + curr.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    <div className="w-full bg-[#11161d] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 font-sans">
      {/* Header stats */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
            GitHub-Style Learning Activity Heatmap
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {totalSubmissions} learning activities across {activeDays} active days in past 12 months
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span key={lvl} className={`w-3 h-3 rounded-sm border ${LEVEL_COLORS[lvl]}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* 52-Week Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px] grid grid-rows-7 grid-flow-col gap-1.5">
          {data.map((day, idx) => (
            <div
              key={day.date || idx}
              title={`${day.date}: ${day.count} activity item(s)`}
              className={`w-3.5 h-3.5 rounded-sm border transition-all cursor-pointer hover:scale-125 ${LEVEL_COLORS[day.level]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHeatmap;
