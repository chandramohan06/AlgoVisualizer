import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, ArrowRight, Zap, Clock, Target, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { useDashboardStats } from '@hooks/useDashboard';

export interface WelcomeCardProps {
  onNavigateToLearning?: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ onNavigateToLearning }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: stats } = useDashboardStats();

  const streak = stats?.streak ?? user?.streak ?? 0;
  const xp = (stats as any)?.totalXP ?? (stats as any)?.xp ?? (user as any)?.totalXP ?? 0;
  const level = Math.max(1, Math.floor(xp / 300) + 1);
  const xpCurrentLevel = xp % 300;
  const levelPct = Math.min(100, Math.round((xpCurrentLevel / 300) * 100));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name = user?.name ? user.name.split(' ')[0] : 'Learner';

  const todayMission = (stats as any)?.todayMission;
  const goalPct = todayMission?.completionPct ?? 65;
  const estTime = todayMission?.estimatedMinutes ?? 35;

  const handlePrimaryClick = () => {
    if (onNavigateToLearning) {
      onNavigateToLearning();
    } else {
      navigate('/algorithms');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl p-6 md:p-8 glass-card border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-[#0d1117] shadow-xl"
    >
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Greeting & Badges */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-extrabold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Learning Command Center
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Level {level} ({xp} XP)
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">{name}</span>! 👋
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
              {streak > 0
                ? `Sensational! You are on a ${streak}-day daily streak. Keep up the momentum to unlock advanced badges!`
                : 'Welcome to your daily DSA learning session. Master concepts step-by-step with interactive visualizers and cheat sheets.'}
            </p>
          </div>

          {/* Level Progress Bar & Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Metric 1: Level Progress */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 font-medium">Lvl {level} Progress</span>
                <span className="text-indigo-400 font-bold">{levelPct}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${levelPct}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Daily Goal */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Target className="w-3 h-3 text-emerald-400" /> Daily Goal
                </span>
                <span className="text-emerald-400 font-bold">{goalPct}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${goalPct}%` }}
                />
              </div>
            </div>

            {/* Metric 3: Est. Learning Time */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-medium">Est. Time Today</p>
                <p className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {estTime} mins left
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Streak & CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
          {streak > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 w-full sm:w-auto">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 animate-bounce">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xl font-black text-amber-300 font-mono leading-none">{streak} Days</p>
                <p className="text-[10px] text-amber-400/80 font-mono uppercase tracking-wider mt-1">Active Learning Streak</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrimaryClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-600/25 cursor-pointer active:scale-95"
            >
              Resume Learning <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/algorithms')}
              className="px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
              title="View DSA Roadmap"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
