import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Lock } from 'lucide-react';
import { useAchievements } from '@hooks/useAchievements';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';

export const AchievementPreviewCard: React.FC = () => {
  const navigate = useNavigate();
  const { data: achievements, isLoading } = useAchievements();

  const unlockedCount = achievements?.filter((a) => a.unlocked).length ?? 0;
  const totalCount = achievements?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            Achievements
          </h2>
          <button
            onClick={() => navigate(ROUTES.ACHIEVEMENTS)}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 rounded-lg" count={2} />
          </div>
        ) : (
          <div className="space-y-2.5">
            {achievements?.slice(0, 2).map((ach) => (
              <div
                key={ach._id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.01] border border-white/5 relative"
              >
                <div className="text-2xl shrink-0 w-10 h-10 rounded-lg bg-blue-500/5 flex items-center justify-center border border-white/5">
                  {ach.unlocked ? ach.icon : <Lock className="w-4.5 h-4.5 text-slate-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{ach.title}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{ach.description}</p>
                </div>
                {ach.unlocked && (
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0 font-mono">
                    +{ach.points} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span>Unlocked Status</span>
        <span className="font-bold text-slate-300">
          {unlockedCount} / {totalCount}
        </span>
      </div>
    </motion.div>
  );
};
