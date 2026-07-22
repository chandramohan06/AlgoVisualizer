import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCategoryProgress } from '@hooks/useDashboard';
import { ProgressRing } from '@components/common/ProgressRing';
import { Skeleton } from '@components/common/Skeleton';

export const ProgressSection: React.FC = () => {
  const { data: categories, isLoading } = useCategoryProgress();

  return (
    <div className="space-y-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
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

      {/* Analytics & Company Readiness Analytics Card */}
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
