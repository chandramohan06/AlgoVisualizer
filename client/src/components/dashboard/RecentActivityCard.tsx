import React from 'react';
import { motion } from 'framer-motion';
import {
  Eye, Brain, StickyNote, Award,
  Clock, ArrowRight,
} from 'lucide-react';
import { cn } from '@utils/index';
import { useRecentActivity } from '@hooks/useDashboard';
import { Skeleton } from '@components/common/Skeleton';
import { EmptyState } from '@components/common/EmptyState';
import type { RecentActivity } from '@services/dashboardService';

const activityIcons: Record<RecentActivity['type'], React.ElementType> = {
  algorithm_view: Eye,
  quiz_attempt: Brain,
  note_created: StickyNote,
  achievement_unlocked: Award,
};

const activityColors: Record<RecentActivity['type'], string> = {
  algorithm_view: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  quiz_attempt: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  note_created: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  achievement_unlocked: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const RecentActivityCard: React.FC = () => {
  const { data: activities, isLoading } = useRecentActivity();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Recent Activity</h2>
        <button className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1 cursor-pointer">
          View All
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-14 rounded-lg" count={4} />
        </div>
      ) : !activities?.length ? (
        <EmptyState
          variant="data"
          title="No recent activity"
          description="Your learning activity will appear here"
        />
      ) : (
        <div className="space-y-2">
          {activities.map((activity, i) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];
            return (
              <motion.div
                key={activity._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div className={cn('p-2 rounded-lg border shrink-0', colorClass)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-300 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 shrink-0">
                  <Clock className="w-3 h-3" />
                  {timeAgo(activity.createdAt)}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
