import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaderboardService } from '@services/leaderboardService';
import { IXPConfig } from '@algovisualizer/shared';
import { Sliders, Save, RefreshCw, Check, Zap, Percent } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const LeaderboardAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const [successMsg, setSuccessMsg] = useState('');

  const { data: config, isLoading } = useQuery({
    queryKey: ['xpConfig'],
    queryFn: () => leaderboardService.getXPConfig(),
  });

  const [formData, setFormData] = useState<Partial<IXPConfig>>({});

  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  const saveMutation = useMutation({
    mutationFn: (updated: Partial<IXPConfig>) => leaderboardService.updateXPConfig(updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['xpConfig'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      setSuccessMsg('XP Configuration updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
  });

  const recalcMutation = useMutation({
    mutationFn: () => leaderboardService.recalculateRanks(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      setSuccessMsg('All student ranks recalculated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl mx-auto font-sans">
        <Skeleton className="h-12 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" /> Leaderboard &amp; XP Configurator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure dynamic XP reward values and weighted formula parameters for calculating student ranks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => recalcMutation.mutate()}
            disabled={recalcMutation.isPending}
            className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${recalcMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Recalculate Ranks</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-500/30 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Grid Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Section 1: XP Reward Values */}
        <div className="bg-[#11161d] border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> XP Action Rewards
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Algorithm Complete XP:</label>
              <input
                type="number"
                value={formData.algorithmCompleteXP ?? 20}
                onChange={(e) => setFormData({ ...formData, algorithmCompleteXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Visualization Complete XP:</label>
              <input
                type="number"
                value={formData.visualizationCompleteXP ?? 10}
                onChange={(e) => setFormData({ ...formData, visualizationCompleteXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Solve Easy Question XP:</label>
              <input
                type="number"
                value={formData.solveEasyXP ?? 25}
                onChange={(e) => setFormData({ ...formData, solveEasyXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Solve Medium Question XP:</label>
              <input
                type="number"
                value={formData.solveMediumXP ?? 50}
                onChange={(e) => setFormData({ ...formData, solveMediumXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Solve Hard Question XP:</label>
              <input
                type="number"
                value={formData.solveHardXP ?? 100}
                onChange={(e) => setFormData({ ...formData, solveHardXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Quiz Perfect Score XP:</label>
              <input
                type="number"
                value={formData.quizPerfectXP ?? 150}
                onChange={(e) => setFormData({ ...formData, quizPerfectXP: Number(e.target.value) })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Ranking Formula Weights */}
        <div className="bg-[#11161d] border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-1.5">
            <Percent className="w-4 h-4" /> Formula Weights Configurator
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Questions Solved Weight (Default 0.40):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.questionsWeight ?? 0.40}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), questionsWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Quiz Accuracy Weight (Default 0.20):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.quizAccuracyWeight ?? 0.20}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), quizAccuracyWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Coding Accuracy Weight (Default 0.15):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.codingAccuracyWeight ?? 0.15}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), codingAccuracyWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Topics Completed Weight (Default 0.10):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.topicsWeight ?? 0.10}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), topicsWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Pattern Mastery Weight (Default 0.10):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.patternMasteryWeight ?? 0.10}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), patternMasteryWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Consistency / Streak Weight (Default 0.05):</label>
              <input
                type="number" step="0.05" min="0" max="1"
                value={formData.weights?.consistencyWeight ?? 0.05}
                onChange={(e) => setFormData({ ...formData, weights: { ...(formData.weights as any), consistencyWeight: Number(e.target.value) } })}
                className="w-full h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LeaderboardAdmin;
