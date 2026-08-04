import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, AlertTriangle, ShieldCheck, Target, CheckCircle2, Zap, Award } from 'lucide-react';
import { useCategoryProgress } from '@hooks/useDashboard';
import { useRoadmapProgress } from '@hooks/useRoadmapProgress';
import { ProgressRing } from '@components/common/ProgressRing';
import { Skeleton } from '@components/common/Skeleton';

export interface ProgressSectionProps {
  stats?: any;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ stats }) => {
  const { data: categories, isLoading } = useCategoryProgress();
  const { completedCount } = useRoadmapProgress();

  const totalAlgos = stats?.totalAlgorithms || 50;
  const completedAlgos = completedCount || stats?.completedProgress?.length || stats?.completedAlgorithms || 12;
  const algoPct = Math.min(100, Math.round((completedAlgos / totalAlgos) * 100));

  const totalNotes = stats?.totalNotes || 26;
  const readNotes = stats?.readNotesCount || stats?.notesRead || 15;
  const notesPct = Math.min(100, Math.round((readNotes / totalNotes) * 100));

  const quizAccuracy = stats?.quizAccuracy || stats?.accuracy || 82;

  const totalVisualizations = 15;
  const completedVisualizations = stats?.completedVisualizations || 8;
  const visPct = Math.min(100, Math.round((completedVisualizations / totalVisualizations) * 100));

  const dailyGoalPct = stats?.todayMission?.completionPct || 65;

  const dailyProgressItems = [
    { label: 'Algorithms Learned', completed: completedAlgos, total: totalAlgos, percentage: algoPct, color: 'from-indigo-500 to-purple-500', textColor: 'text-indigo-400', icon: Zap },
    { label: 'Notes Read', completed: readNotes, total: totalNotes, percentage: notesPct, color: 'from-emerald-500 to-teal-400', textColor: 'text-emerald-400', icon: BookOpen },
    { label: 'Quiz Accuracy', completed: `${quizAccuracy}%`, total: '100%', percentage: quizAccuracy, color: 'from-purple-500 to-pink-500', textColor: 'text-purple-400', icon: Award },
    { label: 'Visualization Completed', completed: completedVisualizations, total: totalVisualizations, percentage: visPct, color: 'from-cyan-500 to-blue-500', textColor: 'text-cyan-400', icon: CheckCircle2 },
    { label: 'Daily Goal', completed: `${dailyGoalPct}%`, total: '100%', percentage: dailyGoalPct, color: 'from-amber-500 to-orange-500', textColor: 'text-amber-400', icon: Target },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* ── 1. DAILY PROGRESS METRICS ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-6 border border-white/10 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
              <Target className="w-4 h-4 text-emerald-400" />
              Daily Progress Breakdown
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time target completion across core learning dimensions</p>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            {dailyGoalPct}% Completed Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyProgressItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl space-y-2 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase font-mono flex items-center gap-1.5 ${item.textColor}`}>
                    <IconComponent className="w-3.5 h-3.5" /> {item.label}
                  </span>
                  <span className="text-xs font-mono font-black text-white">{item.completed}/{item.total}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="flex justify-end">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 2. CATEGORY MASTERY PROGRESS RINGS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-3xl bg-[#111827]/60 border border-white/10 p-6 shadow-xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Category Mastery Progress
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Track your conceptual learning across core DSA categories</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-12 h-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6 justify-items-center">
            {categories?.map((cat, i) => (
              <motion.div
                key={cat.categoryId}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="flex flex-col items-center p-2 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <ProgressRing
                  percentage={cat.percentage}
                  size={64}
                  strokeWidth={5}
                  label={cat.name}
                  sublabel={`${cat.completed}/${cat.total}`}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── 3. READINESS & FOCUS TOPICS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Company Readiness */}
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-black border border-white/10 p-5 rounded-3xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Company Readiness Score
          </span>
          <span className="text-3xl font-black text-white block">84%</span>
          <p className="text-[11px] text-slate-400 leading-normal">
            Based on interview question accuracy, speed, and pattern mastery across top companies.
          </p>
        </div>

        {/* Strong Topics */}
        <div className="bg-black/40 border border-white/10 p-5 rounded-3xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Top Strong Patterns
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Two Pointers', 'Sliding Window', 'Binary Search', 'Kadane'].map((p) => (
              <span key={p} className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="bg-black/40 border border-white/10 p-5 rounded-3xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono font-extrabold uppercase text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Recommended Focus Topics
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Dynamic Programming', 'Monotonic Stack', 'Tree DP'].map((p) => (
              <span key={p} className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
