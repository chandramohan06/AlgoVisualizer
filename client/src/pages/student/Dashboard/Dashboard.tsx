import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Brain, Award, Flame, Code2, Trophy, RefreshCw
} from 'lucide-react';
import { useDashboardStats } from '@hooks/useDashboard';

// Existing widgets
import { WelcomeCard } from '@components/dashboard/WelcomeCard';
import { StatCard } from '@components/dashboard/StatCard';
import { GoalCard } from '@components/dashboard/GoalCard';
import { ContinueLearningCard } from '@components/dashboard/ContinueLearningCard';
import { RecentActivityCard } from '@components/dashboard/RecentActivityCard';
import { UpcomingQuizCard } from '@components/dashboard/UpcomingQuizCard';
import { LeaderboardPreviewCard } from '@components/dashboard/LeaderboardPreviewCard';
import { AchievementPreviewCard } from '@components/dashboard/AchievementPreviewCard';
import { BookmarkPreviewCard } from '@components/dashboard/BookmarkPreviewCard';

// New premium widgets
import { ContributionHeatmap } from '@components/dashboard/ContributionHeatmap';
import { SkillRadarChart } from '@components/dashboard/SkillRadarChart';
import { XPTimelineChart } from '@components/dashboard/XPTimelineChart';
import { InterviewReadinessCard } from '@components/dashboard/InterviewReadinessCard';
import { TopicMasteryList } from '@components/dashboard/TopicMasteryList';
import { DailyStreakCalendar } from '@components/dashboard/DailyStreakCalendar';

import { DashboardSkeleton } from '@components/common/Skeleton';

const WidgetSkeleton: React.FC<{ height?: number }> = ({ height = 200 }) => (
  <div className="glass-card rounded-2xl overflow-hidden" style={{ height }}>
    <div className="skeleton w-full h-full" />
  </div>
);

const DashboardError: React.FC<{ refetch: () => void }> = ({ refetch }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
      <Award className="w-7 h-7 text-rose-400" />
    </div>
    <div className="text-center">
      <h3 className="text-base font-bold text-white">Failed to load dashboard</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">
        Could not connect to the server. Check your connection and try again.
      </p>
    </div>
    <button onClick={refetch} className="btn-primary">
      <RefreshCw className="w-4 h-4" />
      Retry
    </button>
  </div>
);

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !stats) return <DashboardError refetch={refetch} />;

  return (
    <motion.div
      className="max-w-screen-2xl mx-auto px-4 md:px-6 xl:px-8 py-6 space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Welcome Banner */}
      <WelcomeCard />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Algorithms Mastered"
          value={`${stats.completedCount}/${stats.totalAlgorithms}`}
          subtitle={`${stats.percentage}% of curriculum complete`}
          icon={BookOpen}
          color="indigo"
          delay={0}
          trend={stats.percentage > 50 ? 12 : 5}
        />
        <StatCard
          title="Learning Streak"
          value={`${stats.streak} Days`}
          subtitle="Daily consistency builds excellence"
          icon={Flame}
          color="orange"
          delay={1}
          trend={stats.streak > 7 ? 20 : 0}
        />
        <StatCard
          title="Quiz Accuracy"
          value={`${stats.quizAccuracy}%`}
          subtitle={`${stats.quizzesCompleted} quizzes completed`}
          icon={Brain}
          color="emerald"
          delay={2}
          trend={stats.quizAccuracy > 80 ? 8 : -3}
        />
        <StatCard
          title="XP Level"
          value={`Level ${stats.level}`}
          subtitle={`${stats.totalXP.toLocaleString()} total XP earned`}
          icon={Award}
          color="purple"
          delay={3}
          trend={15}
        />
      </div>

      {/* Main 2/3 + 1/3 Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-5">
          <Suspense fallback={<WidgetSkeleton height={220} />}>
            <ContinueLearningCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={180} />}>
            <XPTimelineChart />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Suspense fallback={<WidgetSkeleton height={320} />}>
              <SkillRadarChart />
            </Suspense>
            <Suspense fallback={<WidgetSkeleton height={320} />}>
              <TopicMasteryList />
            </Suspense>
          </div>
          <Suspense fallback={<WidgetSkeleton height={280} />}>
            <RecentActivityCard />
          </Suspense>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Suspense fallback={<WidgetSkeleton height={360} />}>
            <InterviewReadinessCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={220} />}>
            <GoalCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={260} />}>
            <DailyStreakCalendar />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={150} />}>
            <UpcomingQuizCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={200} />}>
            <LeaderboardPreviewCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={180} />}>
            <AchievementPreviewCard />
          </Suspense>
          <Suspense fallback={<WidgetSkeleton height={160} />}>
            <BookmarkPreviewCard />
          </Suspense>
        </div>
      </div>

      {/* Contribution Heatmap */}
      <Suspense fallback={<WidgetSkeleton height={180} />}>
        <ContributionHeatmap />
      </Suspense>

      {/* Extended Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Problems Solved"
          value={stats.problemsSolved}
          subtitle="Practice problems completed"
          icon={Code2}
          color="cyan"
          delay={0}
        />
        <StatCard
          title="Global Rank"
          value={stats.rank > 0 ? `#${stats.rank}` : 'Unranked'}
          subtitle="Ranking on the platform"
          icon={Trophy}
          color="orange"
          delay={1}
        />
        <StatCard
          title="Bookmarks"
          value={stats.bookmarksCount}
          subtitle="Saved for later review"
          icon={BookOpen}
          color="indigo"
          delay={2}
        />
        <StatCard
          title="Notes"
          value={stats.notesCount}
          subtitle="Personal study notes"
          icon={Brain}
          color="emerald"
          delay={3}
        />
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-slate-700">
          AlgoVisualizer · Built for developers, by developers ·{' '}
          <span className="text-indigo-600">Keep shipping 🚀</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Dashboard;
