import React from 'react';
import { Clock, Cpu, CheckCircle2, XCircle, Calendar } from 'lucide-react';

export interface ISubmissionHistoryItem {
  _id: string;
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compile Error' | 'Time Limit Exceeded' | 'Memory Limit Exceeded';
  language: string;
  runtimeMs: number;
  memoryMb: number;
  passedCount: number;
  totalCount: number;
  createdAt: string;
}

interface SubmissionsHistoryTabProps {
  submissions: ISubmissionHistoryItem[];
  isLoading: boolean;
}

export const SubmissionsHistoryTab: React.FC<SubmissionsHistoryTabProps> = ({
  submissions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs font-mono">
        Loading submission history...
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        No submissions recorded for this problem yet. Click <strong className="text-emerald-400">Submit</strong> in the editor to submit your code solution!
      </div>
    );
  }

  const getVerdictBadgeClass = (verdict: string) => {
    switch (verdict) {
      case 'Accepted':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Wrong Answer':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'Runtime Error':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Compile Error':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Time Limit Exceeded':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'Memory Limit Exceeded':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs font-mono bg-[#090a0f]">
      <div className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
        <span>Submission History</span>
        <span className="text-slate-400 text-xs font-normal font-sans">Total: {submissions.length}</span>
      </div>

      <div className="space-y-2">
        {submissions.map((sub) => (
          <div
            key={sub._id}
            className="bg-[#12141c] p-3.5 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              {sub.verdict === 'Accepted' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${getVerdictBadgeClass(sub.verdict)}`}>
                  {sub.verdict}
                </span>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                  <span className="uppercase text-indigo-400 font-bold">{sub.language}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{sub.runtimeMs} ms</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>{sub.memoryMb} MB</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                {sub.passedCount} / {sub.totalCount} passed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
