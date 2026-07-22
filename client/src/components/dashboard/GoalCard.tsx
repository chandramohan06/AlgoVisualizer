import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { useDailyGoal } from '@hooks/useDashboard';
import { Skeleton } from '@components/common/Skeleton';

export const GoalCard: React.FC = () => {
  const { data: goal, isLoading } = useDailyGoal();

  if (isLoading) {
    return <Skeleton className="h-48 rounded-xl" />;
  }

  if (!goal) return null;

  const xpPercent = Math.min(Math.round((goal.xpEarned / goal.xpTarget) * 100), 100);
  const quizPercent = Math.min(Math.round((goal.quizzesCompleted / goal.quizzesTarget) * 100), 100);
  const algoPercent = Math.min(Math.round((goal.algorithmsCompleted / goal.algorithmsTarget) * 100), 100);

  const overallPercent = Math.round((xpPercent + quizPercent + algoPercent) / 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Today's Goals
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Complete activities to earn extra bonus XP</p>
        </div>
        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
          {overallPercent}% Done
        </span>
      </div>

      <div className="space-y-4">
        {/* XP Goal */}
        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-gray-300 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              XP Goal
            </span>
            <span className="text-gray-500">
              {goal.xpEarned} / {goal.xpTarget} XP
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Quizzes Completed */}
        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-gray-300 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Quizzes Goal
            </span>
            <span className="text-gray-500">
              {goal.quizzesCompleted} / {goal.quizzesTarget} Completed
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${quizPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Algorithms Read */}
        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-gray-300 flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Algorithms Goal
            </span>
            <span className="text-gray-500">
              {goal.algorithmsCompleted} / {goal.algorithmsTarget} Read
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${algoPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
