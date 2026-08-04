import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, BookOpen, Award, Clock, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '@utils/index';
import { useRecentActivity } from '@hooks/useDashboard';
import { Skeleton } from '@components/common/Skeleton';
import { useNavigate } from 'react-router-dom';

export interface RecentActivityItem {
  id: string;
  type: 'note' | 'visualizer' | 'quiz' | 'xp';
  title: string;
  description: string;
  timestamp: string;
  xpPoints?: number;
}

const defaultActivities: RecentActivityItem[] = [
  { id: '1', type: 'note', title: 'Read Arrays & ArrayList Note', description: 'Mastered 26-section DSA study note', timestamp: '10m ago', xpPoints: 25 },
  { id: '2', type: 'visualizer', title: 'Visualized BFS Traversal', description: 'Stepped through 14 frames in Graph Visualizer', timestamp: '45m ago', xpPoints: 40 },
  { id: '3', type: 'quiz', title: 'Completed Arrays MCQ Quiz', description: 'Scored 90% accuracy across 10 questions', timestamp: '2h ago', xpPoints: 50 },
  { id: '4', type: 'xp', title: 'Earned 115 Total XP Today', description: 'Reached Daily Goal Milestone', timestamp: '3h ago', xpPoints: 115 },
];

const activityTypeConfig = {
  note: { icon: BookOpen, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  visualizer: { icon: Eye, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  quiz: { icon: Brain, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  xp: { icon: Award, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
};

export const RecentActivityCard: React.FC = () => {
  const navigate = useNavigate();
  const { data: activities, isLoading } = useRecentActivity();

  const displayList: RecentActivityItem[] = activities && activities.length > 0
    ? activities.map((a: any) => ({
        id: a._id || a.id,
        type: a.type === 'quiz_attempt' ? 'quiz' : a.type === 'note_created' ? 'note' : a.type === 'achievement_unlocked' ? 'xp' : 'visualizer',
        title: a.title,
        description: a.description || 'Completed learning task',
        timestamp: a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        xpPoints: 30,
      }))
    : defaultActivities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 font-sans"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Recent Activity Timeline
        </h2>
        <button
          onClick={() => navigate('/profile')}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer"
        >
          Activity Log <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 rounded-2xl" count={4} />
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayList.map((item, i) => {
            const config = activityTypeConfig[item.type] || activityTypeConfig.visualizer;
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
              >
                <div className={cn('p-2.5 rounded-xl border shrink-0', config.color)}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white truncate">{item.title}</span>
                    {item.xpPoints && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold shrink-0 flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 fill-current" />+{item.xpPoints} XP
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 shrink-0">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivityCard;
