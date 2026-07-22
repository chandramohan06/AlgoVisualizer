import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Play } from 'lucide-react';
import { useUpcomingQuiz } from '@hooks/useDashboard';
import { Skeleton } from '@components/common/Skeleton';
import { cn } from '@utils/index';

const difficultyBadges: Record<string, string> = {
  easy: 'badge-easy',
  medium: 'badge-medium',
  hard: 'badge-hard',
};

export const UpcomingQuizCard: React.FC = () => {
  const { data: quiz, isLoading } = useUpcomingQuiz();

  if (isLoading) {
    return <Skeleton className="h-44 rounded-xl" />;
  }

  if (!quiz) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-xl bg-gradient-to-br from-blue-950/20 to-accent/10 border border-blue-500/20 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              Recommended Quiz
            </span>
            <span className={cn('text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full', difficultyBadges[quiz.difficulty])}>
              {quiz.difficulty}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wide">{quiz.title}</h3>
          <p className="text-[11px] text-slate-500 font-semibold mb-4">{quiz.questionCount} Questions &bull; 100 XP Potential</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all hover:shadow-lg hover:shadow-blue-500/15 active:scale-[0.98] group cursor-pointer">
          <Play className="w-4 h-4 fill-white" />
          Start Quiz
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
