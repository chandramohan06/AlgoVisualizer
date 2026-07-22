import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Flame } from 'lucide-react';
import { useLeaderboardPreview } from '@hooks/useLeaderboard';
import { useDashboardStats } from '@hooks/useDashboard';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';

export const LeaderboardPreviewCard: React.FC = () => {
  const navigate = useNavigate();
  const { data: leaderboard, isLoading } = useLeaderboardPreview();
  const { data: stats } = useDashboardStats();

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    if (rank === 2) return 'bg-slate-300/20 text-slate-300 border-slate-300/30';
    if (rank === 3) return 'bg-amber-700/20 text-amber-600 border-amber-700/30';
    return 'bg-white/5 text-gray-400 border-white/5';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Top Learners
          </h2>
          <button
            onClick={() => navigate(ROUTES.LEADERBOARD)}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Board
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 rounded-lg" count={3} />
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard?.slice(0, 3).map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.01] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${getRankColor(user.rank)}`}>
                    {user.rank}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.college}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-300">{user.totalPoints} pts</span>
                  {user.streak > 0 && (
                    <div className="flex items-center text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded font-mono font-bold">
                      <Flame className="w-2.5 h-2.5 mr-0.5" />
                      {user.streak}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {stats && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-semibold">Your Rank</span>
          <span className="font-bold text-blue-400">#{stats.rank} Global</span>
        </div>
      )}
    </motion.div>
  );
};
