import api from './api';
import { API_ENDPOINTS } from '@constants/api';

export interface DashboardStats {
  totalAlgorithms: number;
  completedCount: number;
  percentage: number;
  totalXP: number;
  level: number;
  streak: number;
  quizzesCompleted: number;
  quizAccuracy: number;
  problemsSolved: number;
  bookmarksCount: number;
  notesCount: number;
  rank: number;
}

export interface CategoryProgress {
  categoryId: string;
  name: string;
  slug: string;
  icon: string;
  total: number;
  completed: number;
  percentage: number;
}

export interface RecentActivity {
  _id: string;
  type: 'algorithm_view' | 'quiz_attempt' | 'note_created' | 'achievement_unlocked';
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ContinueLearning {
  _id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  progress: number;
  lastAccessed: string;
}

export interface UpcomingQuiz {
  algorithmId: string;
  slug: string;
  title: string;
  difficulty: string;
  questionCount: number;
}

export interface DailyGoal {
  xpEarned: number;
  xpTarget: number;
  quizzesCompleted: number;
  quizzesTarget: number;
  algorithmsCompleted: number;
  algorithmsTarget: number;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get(API_ENDPOINTS.PROGRESS_SUMMARY);
    return data.data;
  },

  getCategoryProgress: async (): Promise<CategoryProgress[]> => {
    const { data } = await api.get(API_ENDPOINTS.PROGRESS);
    return data.data;
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const { data } = await api.get(`${API_ENDPOINTS.PROGRESS}/recent`);
    return data.data;
  },

  getContinueLearning: async (): Promise<ContinueLearning[]> => {
    const { data } = await api.get(`${API_ENDPOINTS.ALGORITHMS}?sort=recent&limit=5`);
    return data.data;
  },

  getUpcomingQuiz: async (): Promise<UpcomingQuiz | null> => {
    const { data } = await api.get(`${API_ENDPOINTS.QUIZ_HISTORY}?limit=1&upcoming=true`);
    return data.data;
  },

  getDailyGoal: async (): Promise<DailyGoal> => {
    const { data } = await api.get(`${API_ENDPOINTS.PROGRESS_SUMMARY}?type=daily`);
    return data.data;
  },

  getBookmarks: async () => {
    const { data } = await api.get(API_ENDPOINTS.USER_BOOKMARKS);
    return data.data;
  },
};
