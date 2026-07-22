import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { IAdminOverviewStats, IAuditLogItem, IStudentProfileDetails } from '@algovisualizer/shared';

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalAlgorithms: number;
  totalCategories: number;
  totalProblems: number;
  totalQuizAttempts: number;
  totalNotes: number;
  totalBookmarks: number;
  totalXPEarned: number;
  dau: number;
  wau: number;
  mau: number;
  userGrowth: { date: string; count: number }[];
  algorithmPopularity: { title: string; views: number }[];
  categoryCompletion: { name: string; percentage: number }[];
  quizPerformance: { topic: string; avgScore: number }[];
  dailyActivity: { date: string; count: number }[];
  streakDistribution: { range: string; count: number }[];
}

export interface StudentAdminInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  college?: string;
  batch?: string;
  country?: string;
  targetCompany?: string;
  xp?: number;
  streak?: number;
  createdAt: string;
}

export const adminService = {
  getOverview: async (): Promise<IAdminOverviewStats> => {
    const res = await api.get<{ data: IAdminOverviewStats }>(API_ENDPOINTS.ADMIN_OVERVIEW);
    return res.data.data;
  },

  getAnalytics: async (): Promise<AdminAnalytics> => {
    const res = await api.get(API_ENDPOINTS.ADMIN_ANALYTICS);
    return res.data.data;
  },

  getStudents: async (params?: Record<string, any>): Promise<{ students: StudentAdminInfo[]; total: number; page: number; totalPages: number }> => {
    const res = await api.get(API_ENDPOINTS.ADMIN_STUDENTS, { params });
    return {
      students: res.data.data || [],
      total: res.data.meta?.total || 0,
      page: res.data.meta?.page || 1,
      totalPages: res.data.meta?.totalPages || 1,
    };
  },

  getStudentById: async (userId: string): Promise<IStudentProfileDetails> => {
    const res = await api.get<{ data: IStudentProfileDetails }>(API_ENDPOINTS.ADMIN_STUDENT(userId));
    return res.data.data;
  },

  toggleBan: async (userId: string): Promise<StudentAdminInfo> => {
    const res = await api.put(API_ENDPOINTS.ADMIN_STUDENT_BAN(userId));
    return res.data.data;
  },

  updateRole: async (userId: string, role: string): Promise<StudentAdminInfo> => {
    const res = await api.put(`${API_ENDPOINTS.ADMIN_STUDENTS}/${userId}/role`, { role });
    return res.data.data;
  },

  resetStudentPassword: async (userId: string): Promise<{ message: string }> => {
    const res = await api.post<{ message: string }>(`${API_ENDPOINTS.ADMIN_STUDENTS}/${userId}/reset-password`);
    return res.data;
  },

  grantBadge: async (userId: string, badgeTitle: string): Promise<{ message: string }> => {
    const res = await api.post<{ message: string }>(`${API_ENDPOINTS.ADMIN_STUDENTS}/${userId}/grant-badge`, { badgeTitle });
    return res.data;
  },

  resetStudentProgress: async (userId: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.ADMIN_STUDENT_RESET_PROGRESS(userId));
  },

  getAuditLogs: async (limit = 100): Promise<IAuditLogItem[]> => {
    const res = await api.get<{ data: IAuditLogItem[] }>(API_ENDPOINTS.ADMIN_AUDIT_LOGS, { params: { limit } });
    return res.data.data;
  },

  exportReport: async (type: string, format = 'csv') => {
    const res = await api.get(API_ENDPOINTS.ADMIN_REPORTS_EXPORT, {
      params: { type, format },
      responseType: 'blob',
    });
    return res.data;
  },

  createCategory: async (data: any) => {
    const res = await api.post(API_ENDPOINTS.ADMIN_CATEGORIES, data);
    return res.data.data;
  },

  updateCategory: async (id: string, data: any) => {
    const res = await api.put(API_ENDPOINTS.ADMIN_CATEGORY(id), data);
    return res.data.data;
  },

  deleteCategory: async (id: string) => {
    await api.delete(API_ENDPOINTS.ADMIN_CATEGORY(id));
  },

  createQuestion: async (data: any) => {
    const res = await api.post(API_ENDPOINTS.ADMIN_QUIZ_QUESTIONS, data);
    return res.data.data;
  },

  updateQuestion: async (id: string, data: any) => {
    const res = await api.put(API_ENDPOINTS.ADMIN_QUIZ_QUESTION(id), data);
    return res.data.data;
  },

  deleteQuestion: async (id: string) => {
    await api.delete(API_ENDPOINTS.ADMIN_QUIZ_QUESTION(id));
  },
};

export default adminService;
