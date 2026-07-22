import React, { useRef, useEffect } from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { Activity } from 'lucide-react';

interface LiveVariablesPanelProps {
  frame: VisualizationFrame | null;
}

const VARIABLE_ROLE_COLOR: Record<string, string> = {
  i: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  j: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  left: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
  right: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  mid: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  pivot: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
  current: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
  top: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  front: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
  rear: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
  parent: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
  child: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
  visited: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  queue: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  stack: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
};

export const LiveVariablesPanel: React.FC<LiveVariablesPanelProps> = ({ frame }) => {
  const prevFrameRef = useRef<VisualizationFrame | null>(null);

  useEffect(() => {
    prevFrameRef.current = frame;
  }, [frame]);

  if (!frame) return null;

  const pointers = frame.pointers || {};
  const variables = frame.variables || {};

  const allVars = {
    ...pointers,
    ...variables,
  };

  const entries = Object.entries(allVars);
  const prevVars = prevFrameRef.current ? { ...prevFrameRef.current.pointers, ...prevFrameRef.current.variables } : {};

  return (
    <div className="w-full bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Variables Inspector</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">{entries.length} Active Symbol(s)</span>
      </div>

      {entries.length === 0 ? (
        <div className="text-xs text-slate-500 font-mono py-4 text-center">No active scoped variables in frame context.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {entries.map(([key, val]) => {
            const isChanged = prevVars[key] !== undefined && prevVars[key] !== val;
            const style = VARIABLE_ROLE_COLOR[key.toLowerCase()] || 'border-white/10 text-cyan-300 bg-black/40';

            return (
              <div
                key={key}
                className={`border rounded-xl p-3 flex flex-col justify-between gap-1 transition-all duration-200 ${style} ${
                  isChanged ? 'ring-2 ring-indigo-400 scale-[1.03] shadow-lg shadow-indigo-500/20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">{key}</span>
                  {isChanged && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                </div>

                <div className="font-mono text-sm font-black truncate tracking-tight pt-1">
                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                </div>

                <span className="text-[9px] font-mono text-slate-500 font-semibold uppercase">
                  {typeof val === 'number' ? 'pointer / index' : Array.isArray(val) ? 'collection' : typeof val}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveVariablesPanel;
