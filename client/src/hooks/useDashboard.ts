import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@services/dashboardService';
import type {
  DashboardStats,
  CategoryProgress,
  RecentActivity,
  ContinueLearning,
  UpcomingQuiz,
  DailyGoal,
} from '@services/dashboardService';

// ── Hooks ───────────────────────────────────────────────────────────────────

export const useDashboardStats = () =>
  useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getStats,
    staleTime: 5 * 60 * 1000,
  });

export const useCategoryProgress = () =>
  useQuery<CategoryProgress[]>({
    queryKey: ['dashboard', 'categoryProgress'],
    queryFn: dashboardService.getCategoryProgress,
    staleTime: 5 * 60 * 1000,
  });

export const useRecentActivity = () =>
  useQuery<RecentActivity[]>({
    queryKey: ['dashboard', 'recentActivity'],
    queryFn: dashboardService.getRecentActivity,
    staleTime: 2 * 60 * 1000,
  });

export const useContinueLearning = () =>
  useQuery<ContinueLearning[]>({
    queryKey: ['dashboard', 'continueLearning'],
    queryFn: dashboardService.getContinueLearning,
    staleTime: 5 * 60 * 1000,
  });

export const useUpcomingQuiz = () =>
  useQuery<UpcomingQuiz | null>({
    queryKey: ['dashboard', 'upcomingQuiz'],
    queryFn: dashboardService.getUpcomingQuiz,
    staleTime: 10 * 60 * 1000,
  });

export const useDailyGoal = () =>
  useQuery<DailyGoal>({
    queryKey: ['dashboard', 'dailyGoal'],
    queryFn: dashboardService.getDailyGoal,
    staleTime: 2 * 60 * 1000,
  });

export const useFullDashboardStats = () =>
  useQuery({
    queryKey: ['dashboard', 'fullStats'],
    queryFn: dashboardService.getFullStats,
    staleTime: 2 * 60 * 1000,
  });
