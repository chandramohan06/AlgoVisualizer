import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementService } from '@services/achievementService';
import { Award, ShieldCheck, Lock, Sparkles, Zap, Filter } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  category?: string;
  unlockedAt?: string;
}

const TIER_COLORS: Record<string, { badge: string; border: string; glow: string }> = {
  legendary: { badge: 'badge-legendary', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.15)' },
  epic:      { badge: 'badge-epic',      border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.15)' },
  rare:      { badge: 'badge-rare',      border: 'border-blue-500/30',   glow: 'rgba(59,130,246,0.15)' },
  common:    { badge: 'badge-common',    border: 'border-slate-500/20',  glow: 'transparent' },
};

function getTier(points: number): keyof typeof TIER_COLORS {
  if (points >= 500) return 'legendary';
  if (points >= 250) return 'epic';
  if (points >= 100) return 'rare';
  return 'common';
}

export const Achievements: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const { data: achievements = [], isLoading, error } = useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: achievementService.getAll,
    staleTime: 60 * 1000,
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length || 1;
  const totalXP = achievements.filter((a) => a.unlocked).reduce((acc, a) => acc + (a.points || 0), 0);
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const filtered = achievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Banner Header ── */}
      <div className="glass-premium rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-violet mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Milestone System
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
            <Award className="w-8 h-8 text-purple-400" />
            Badges &amp; Trophies
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Unlock achievements by solving algorithms, maintaining study streaks, and acing topic quizzes.
          </p>
        </div>

        {/* Progress summary pill */}
        <div className="flex items-center gap-6 glass-card px-6 py-4 rounded-2xl relative z-10 border border-white/10 shrink-0">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <motion.circle
                cx="28" cy="28" r="22" fill="none" stroke="#a855f7" strokeWidth="4"
                strokeDasharray={2 * Math.PI * 22}
                initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - percentage / 100) }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-mono font-bold text-xs text-purple-300">{percentage}%</span>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Trophies Collected</div>
            <div className="text-xl font-black font-mono text-white mt-0.5">
              {unlockedCount} <span className="text-slate-500 text-sm">/ {totalCount}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-indigo-400 mt-0.5">
              <Zap className="w-3 h-3" /> +{totalXP} XP Earned
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls / Filters ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          {(['all', 'unlocked', 'locked'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                filter === mode
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode} {mode === 'all' ? `(${totalCount})` : mode === 'unlocked' ? `(${unlockedCount})` : `(${totalCount - unlockedCount})`}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
          <Filter className="w-3.5 h-3.5" /> Sort: Highest XP Value
        </div>
      </div>

      {/* ── Badges Grid ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <Skeleton className="h-44 rounded-2xl" count={8} />
        </div>
      ) : error ? (
        <div className="glass-card rounded-2xl p-12 text-center text-sm text-slate-400">
          Failed to load achievements. Please check your backend connection.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((achievement) => {
              const tier = getTier(achievement.points);
              const style = TIER_COLORS[tier];

              return (
                <motion.div
                  key={achievement._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group ${
                    achievement.unlocked ? style.border : 'opacity-50 border-white/5'
                  }`}
                  style={achievement.unlocked ? { boxShadow: `0 8px 24px ${style.glow}` } : {}}
                >
                  <div>
                    {/* Top row: Icon + Tier */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                        achievement.unlocked ? 'bg-white/5 border border-white/10' : 'bg-black/30'
                      }`}>
                        {achievement.icon || '🏆'}
                      </div>
                      <span className={`badge ${style.badge} uppercase text-[9px]`}>{tier}</span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Footer status & points */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-indigo-400">+{achievement.points} XP</span>
                    {achievement.unlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Achievements;
