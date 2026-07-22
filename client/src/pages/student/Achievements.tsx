import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { achievementService } from '@services/achievementService';
import { Award, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const Achievements: React.FC = () => {
  // Fetch achievements
  const { data: achievements, isLoading, error } = useQuery({
    queryKey: ['achievements'],
    queryFn: achievementService.getAll,
    staleTime: 60 * 1000,
  });

  const unlockedCount = achievements?.filter((a) => a.unlocked).length || 0;
  const totalCount = achievements?.length || 4;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Award className="w-6 h-6 text-purple-400" />
            Milestone Achievements
          </h1>
          <p className="text-sm text-gray-500">Track and unlock accomplishments on your learning journey.</p>
        </div>

        {/* Completion summary */}
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-5 py-3 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">Unlocked Stats</span>
            <span className="text-base font-bold text-gray-200">
              {unlockedCount} / {totalCount} Badges
            </span>
          </div>
        </div>
      </div>

      {/* Grid of badges */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Skeleton className="h-40 rounded-2xl" count={3} />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center text-sm text-gray-500">
          Failed to retrieve achievements from backend.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements?.map((achievement) => (
            <div
              key={achievement._id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20'
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl select-none">{achievement.icon}</span>
                  {achievement.unlocked ? (
                    <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                      <ShieldAlert className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-gray-200">{achievement.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-500">XP Reward</span>
                <span className="font-bold text-indigo-400">+{achievement.points} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;
