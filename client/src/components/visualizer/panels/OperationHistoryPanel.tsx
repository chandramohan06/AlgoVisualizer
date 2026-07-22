import React from 'react';
import { History, RotateCcw } from 'lucide-react';

export interface OperationLogItem {
  id: string;
  name: string;
  inputParams: Record<string, any>;
  timestamp: number;
}

interface OperationHistoryPanelProps {
  operationsLog: OperationLogItem[];
  onReplayOperation: (op: OperationLogItem) => void;
}

export const OperationHistoryPanel: React.FC<OperationHistoryPanelProps> = ({ operationsLog, onReplayOperation }) => {
  return (
    <div className="w-full bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">User Operation History</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">{operationsLog.length} Operations Executed</span>
      </div>

      {operationsLog.length === 0 ? (
        <div className="text-xs text-slate-500 font-mono py-4 text-center">
          No dynamic operations recorded. Execute operations in the Operations Panel to log interactions.
        </div>
      ) : (
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {operationsLog.map((op, idx) => (
            <div
              key={op.id || idx}
              className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </div>
                <div className="truncate">
                  <span className="font-bold text-white block">{op.name}</span>
                  <span className="text-[10px] text-slate-400">
                    Input: {JSON.stringify(op.inputParams)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onReplayOperation(op)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Replay
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationHistoryPanel;
