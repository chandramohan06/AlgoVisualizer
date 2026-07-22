import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, type AdminAnalytics, type StudentAdminInfo } from '@services/adminService';

// Fallback mock analytics for initial launch validation
const MOCK_ANALYTICS: AdminAnalytics = {
  totalUsers: 1420,
  activeUsers: 480,
  totalAlgorithms: 25,
  totalCategories: 12,
  totalProblems: 50,
  totalQuizAttempts: 1890,
  totalNotes: 940,
  totalBookmarks: 610,
  totalXPEarned: 84500,
  dau: 120,
  wau: 450,
  mau: 920,
  userGrowth: [
    { date: 'Mon', count: 1200 },
    { date: 'Tue', count: 1230 },
    { date: 'Wed', count: 1280 },
    { date: 'Thu', count: 1310 },
    { date: 'Fri', count: 1350 },
    { date: 'Sat', count: 1390 },
    { date: 'Sun', count: 1420 },
  ],
  algorithmPopularity: [
    { title: 'Quick Sort', views: 340 },
    { title: 'Binary Search', views: 290 },
    { title: 'Dijkstra', views: 210 },
    { title: 'Bubble Sort', views: 180 },
  ],
  categoryCompletion: [
    { name: 'Sorting', percentage: 72 },
    { name: 'Searching', percentage: 65 },
    { name: 'Trees', percentage: 40 },
    { name: 'Graphs', percentage: 22 },
  ],
  quizPerformance: [
    { topic: 'Sorting', avgScore: 82 },
    { topic: 'Searching', avgScore: 78 },
    { topic: 'Linked List', avgScore: 70 },
  ],
  dailyActivity: [
    { date: 'Mon', count: 420 },
    { date: 'Tue', count: 510 },
    { date: 'Wed', count: 480 },
    { date: 'Thu', count: 620 },
    { date: 'Fri', count: 590 },
    { date: 'Sat', count: 320 },
    { date: 'Sun', count: 350 },
  ],
  streakDistribution: [
    { range: '1-3d', count: 450 },
    { range: '4-7d', count: 280 },
    { range: '8-14d', count: 120 },
    { range: '15d+', count: 45 },
  ],
};

export const useAdminAnalytics = () =>
  useQuery<AdminAnalytics>({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      try {
        return await adminService.getAnalytics();
      } catch {
        return MOCK_ANALYTICS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

export const useAdminStudents = (params?: Record<string, string>) =>
  useQuery<{ students: StudentAdminInfo[]; total: number }>({
    queryKey: ['admin', 'students', params],
    queryFn: async () => {
      try {
        return await adminService.getStudents(params);
      } catch {
        // Mock fallback
        return {
          students: [
            { _id: '1', name: 'Alice Smith', email: 'alice@algo.com', role: 'student', isBanned: false, college: 'Stanford', createdAt: new Date().toISOString(), streak: 5 },
            { _id: '2', name: 'Bob Jones', email: 'bob@algo.com', role: 'student', isBanned: true, college: 'MIT', createdAt: new Date().toISOString(), streak: 0 },
            { _id: '3', name: 'Charlie Brown', email: 'charlie@algo.com', role: 'student', isBanned: false, college: 'UC Berkeley', createdAt: new Date().toISOString(), streak: 12 },
          ],
          total: 3,
        };
      }
    },
  });

export const useAdminToggleBan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => adminService.toggleBan(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'students'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'analytics'] });
    },
  });
};

export const useAdminResetProgress = () => {
  return useMutation({
    mutationFn: (userId: string) => adminService.resetStudentProgress(userId),
  });
};

export const useAdminUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      adminService.updateRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'students'] });
    },
  });
};
