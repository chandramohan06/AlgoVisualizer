import React from 'react';
import {
  BookOpen, Brain, Award, Flame
} from 'lucide-react';
import { useDashboardStats } from '@hooks/useDashboard';
import { DashboardHeader } from '@components/dashboard/DashboardHeader';
import { WelcomeCard } from '@components/dashboard/WelcomeCard';
import { StatCard } from '@components/dashboard/StatCard';
import { ContinueLearningCard } from '@components/dashboard/ContinueLearningCard';
import { GoalCard } from '@components/dashboard/GoalCard';
import { ProgressSection } from '@components/dashboard/ProgressSection';
import { RecentActivityCard } from '@components/dashboard/RecentActivityCard';
import { UpcomingQuizCard } from '@components/dashboard/UpcomingQuizCard';
import { LeaderboardPreviewCard } from '@components/dashboard/LeaderboardPreviewCard';
import { AchievementPreviewCard } from '@components/dashboard/AchievementPreviewCard';
import { BookmarkPreviewCard } from '@components/dashboard/BookmarkPreviewCard';
import { QuickActionCard } from '@components/dashboard/QuickActionCard';
import { DashboardFooter } from '@components/dashboard/DashboardFooter';
import { DashboardSkeleton } from '@components/common/Skeleton';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-200 mb-2">Failed to load dashboard data</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-4">
          There was an error communicating with the server. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6 animate-fade-in">
      {/* Header */}
      <DashboardHeader />

      {/* Welcome banner */}
      <WelcomeCard />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          title="Algorithms Completed"
          value={`${stats.completedCount}/${stats.totalAlgorithms}`}
          subtitle={`${stats.percentage}% learning path done`}
          icon={BookOpen}
          color="indigo"
          delay={0}
        />
        <StatCard
          title="Daily Learning Streak"
          value={`${stats.streak} Days`}
          subtitle="Keep learning to maintain streak"
          icon={Flame}
          color="orange"
          delay={1}
        />
        <StatCard
          title="Quizzes Completed"
          value={stats.quizzesCompleted}
          subtitle={`${stats.quizAccuracy}% average accuracy`}
          icon={Brain}
          color="emerald"
          delay={2}
        />
        <StatCard
          title="XP Level reached"
          value={`Level ${stats.level}`}
          subtitle={`${stats.totalXP} cumulative XP`}
          icon={Award}
          color="purple"
          delay={3}
        />
      </div>

      {/* Main Grid: Learning status + right widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Continue learning + Progress */}
        <div className="lg:col-span-2 space-y-6">
          <ContinueLearningCard />
          <ProgressSection />
          <QuickActionCard />
        </div>

        {/* Right Column: Goal + upcoming + previews */}
        <div className="space-y-6">
          <GoalCard />
          <UpcomingQuizCard />
          <LeaderboardPreviewCard />
          <AchievementPreviewCard />
          <BookmarkPreviewCard />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        <RecentActivityCard />
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
