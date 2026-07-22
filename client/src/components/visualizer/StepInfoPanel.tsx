import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { Info, Cpu, Layers, Disc } from 'lucide-react';

interface StepInfoProps {
  frame: VisualizationFrame | null;
  timeComplexity: string;
  spaceComplexity: string;
}

export const StepInfoPanel: React.FC<StepInfoProps> = ({
  frame,
  timeComplexity,
  spaceComplexity,
}) => {
  if (!frame) return null;

  const variables = frame.variables || {};
  const variableEntries = Object.entries(variables);

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 space-y-5 flex flex-col h-full overflow-y-auto shadow-xl">
      {/* Complexity cards */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Complexity</p>
            <p className="text-sm font-bold text-white mt-0.5">{timeComplexity}</p>
          </div>
        </div>
        
        <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Space Complexity</p>
            <p className="text-sm font-bold text-white mt-0.5">{spaceComplexity}</p>
          </div>
        </div>
      </div>

      {/* Description Panel */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Execution Details</span>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            {frame.description}
          </p>
        </div>
      </div>

      {/* Variable Tracker */}
      <div className="space-y-2 flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
          <Disc className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Active Variable Tracker</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 rounded-xl bg-white/[0.01] border border-white/5 min-h-[100px] scrollbar-thin">
          {variableEntries.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-600 font-medium">
              No local scope variables active.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {variableEntries.map(([name, val]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.01] border border-white/5"
                >
                  <span className="text-[11px] font-bold font-mono text-slate-500">{name}</span>
                  <span className="text-xs font-bold font-mono text-blue-400">
                    {typeof val === 'boolean' ? String(val) : JSON.stringify(val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StepInfoPanel;
