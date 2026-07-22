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

// ── Mock data factories (used until backend is live) ────────────────────────

const MOCK_STATS: DashboardStats = {
  totalAlgorithms: 85,
  completedCount: 32,
  percentage: 38,
  totalXP: 4250,
  level: 12,
  streak: 7,
  quizzesCompleted: 28,
  quizAccuracy: 82,
  problemsSolved: 45,
  bookmarksCount: 15,
  notesCount: 23,
  rank: 42,
};

const MOCK_CATEGORY_PROGRESS: CategoryProgress[] = [
  { categoryId: '1', name: 'Arrays', slug: 'arrays', icon: '📊', total: 8, completed: 6, percentage: 75 },
  { categoryId: '2', name: 'Strings', slug: 'strings', icon: '🔤', total: 6, completed: 3, percentage: 50 },
  { categoryId: '3', name: 'Sorting', slug: 'sorting', icon: '🔃', total: 7, completed: 5, percentage: 71 },
  { categoryId: '4', name: 'Searching', slug: 'searching', icon: '🔍', total: 4, completed: 4, percentage: 100 },
  { categoryId: '5', name: 'Linked List', slug: 'linked-list', icon: '🔗', total: 5, completed: 2, percentage: 40 },
  { categoryId: '6', name: 'Stack', slug: 'stack', icon: '📚', total: 4, completed: 3, percentage: 75 },
  { categoryId: '7', name: 'Queue', slug: 'queue', icon: '🚶', total: 4, completed: 1, percentage: 25 },
  { categoryId: '8', name: 'Tree', slug: 'tree', icon: '🌳', total: 6, completed: 2, percentage: 33 },
  { categoryId: '9', name: 'Graph', slug: 'graph', icon: '🕸️', total: 8, completed: 1, percentage: 13 },
  { categoryId: '10', name: 'Heap', slug: 'heap', icon: '⛰️', total: 3, completed: 1, percentage: 33 },
  { categoryId: '11', name: 'Trie', slug: 'trie', icon: '🌿', total: 3, completed: 0, percentage: 0 },
  { categoryId: '12', name: 'Greedy', slug: 'greedy', icon: '💰', total: 5, completed: 2, percentage: 40 },
  { categoryId: '13', name: 'DP', slug: 'dp', icon: '🧩', total: 8, completed: 1, percentage: 13 },
  { categoryId: '14', name: 'Recursion', slug: 'recursion', icon: '🔁', total: 4, completed: 1, percentage: 25 },
  { categoryId: '15', name: 'Backtracking', slug: 'backtracking', icon: '↩️', total: 5, completed: 0, percentage: 0 },
];

const MOCK_RECENT: RecentActivity[] = [
  { _id: '1', type: 'algorithm_view', title: 'Binary Search', description: 'Viewed algorithm page', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: '2', type: 'quiz_attempt', title: 'Sorting Quiz', description: 'Scored 90% on quiz', metadata: { score: 90 }, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { _id: '3', type: 'note_created', title: 'DFS Notes', description: 'Created a new note', createdAt: new Date(Date.now() - 14400000).toISOString() },
  { _id: '4', type: 'achievement_unlocked', title: '7 Day Streak!', description: 'Unlocked streak achievement', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '5', type: 'algorithm_view', title: 'Merge Sort', description: 'Completed algorithm', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const MOCK_CONTINUE: ContinueLearning[] = [
  { _id: '1', slug: 'bubble-sort', title: 'Bubble Sort', category: 'Sorting', difficulty: 'easy', progress: 70, lastAccessed: new Date(Date.now() - 3600000).toISOString() },
  { _id: '2', slug: 'dfs', title: 'Depth First Search', category: 'Graph', difficulty: 'medium', progress: 40, lastAccessed: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', slug: 'binary-search', title: 'Binary Search', category: 'Searching', difficulty: 'easy', progress: 85, lastAccessed: new Date(Date.now() - 172800000).toISOString() },
];

const MOCK_UPCOMING_QUIZ: UpcomingQuiz = {
  algorithmId: '1',
  slug: 'binary-search-tree',
  title: 'Binary Search Tree',
  difficulty: 'medium',
  questionCount: 10,
};

const MOCK_DAILY_GOAL: DailyGoal = {
  xpEarned: 120,
  xpTarget: 200,
  quizzesCompleted: 1,
  quizzesTarget: 3,
  algorithmsCompleted: 2,
  algorithmsTarget: 3,
};

// ── Feature flag: switch to real API when backend is ready ──────────────────
const USE_MOCK = false;

// ── Hooks ───────────────────────────────────────────────────────────────────

export const useDashboardStats = () =>
  useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_STATS) : dashboardService.getStats,
    staleTime: 5 * 60 * 1000,
  });

export const useCategoryProgress = () =>
  useQuery<CategoryProgress[]>({
    queryKey: ['dashboard', 'categoryProgress'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_CATEGORY_PROGRESS) : dashboardService.getCategoryProgress,
    staleTime: 5 * 60 * 1000,
  });

export const useRecentActivity = () =>
  useQuery<RecentActivity[]>({
    queryKey: ['dashboard', 'recentActivity'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_RECENT) : dashboardService.getRecentActivity,
    staleTime: 2 * 60 * 1000,
  });

export const useContinueLearning = () =>
  useQuery<ContinueLearning[]>({
    queryKey: ['dashboard', 'continueLearning'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_CONTINUE) : dashboardService.getContinueLearning,
    staleTime: 5 * 60 * 1000,
  });

export const useUpcomingQuiz = () =>
  useQuery<UpcomingQuiz | null>({
    queryKey: ['dashboard', 'upcomingQuiz'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_UPCOMING_QUIZ) : dashboardService.getUpcomingQuiz,
    staleTime: 10 * 60 * 1000,
  });

export const useDailyGoal = () =>
  useQuery<DailyGoal>({
    queryKey: ['dashboard', 'dailyGoal'],
    queryFn: USE_MOCK ? () => Promise.resolve(MOCK_DAILY_GOAL) : dashboardService.getDailyGoal,
    staleTime: 2 * 60 * 1000,
  });
