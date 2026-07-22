import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import {
  ILeaderboardEntry,
  ILeaderboardResponse,
  IStudentProfileDetails,
  IXPConfig,
} from '@algovisualizer/shared';

export interface LeaderboardQueryParams {
  type?: 'global' | 'college' | 'batch' | 'weekly' | 'monthly' | 'alltime' | 'friends';
  college?: string;
  batch?: string;
  company?: string;
  topic?: string;
  difficulty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const leaderboardService = {
  getLeaderboard: async (params: LeaderboardQueryParams = {}): Promise<ILeaderboardResponse> => {
    const { data } = await api.get<{ data: ILeaderboardResponse }>(API_ENDPOINTS.LEADERBOARD_GLOBAL, {
      params,
    });
    return data.data;
  },

  getGlobal: async (): Promise<ILeaderboardEntry[]> => {
    const res = await leaderboardService.getLeaderboard({ type: 'global', limit: 100 });
    return res.entries;
  },

  getWeekly: async (): Promise<ILeaderboardEntry[]> => {
    const res = await leaderboardService.getLeaderboard({ type: 'weekly', limit: 100 });
    return res.entries;
  },

  getMonthly: async (): Promise<ILeaderboardEntry[]> => {
    const res = await leaderboardService.getLeaderboard({ type: 'monthly', limit: 100 });
    return res.entries;
  },

  getProfile: async (userId: string): Promise<IStudentProfileDetails> => {
    const { data } = await api.get<{ data: IStudentProfileDetails }>(`/leaderboard/profile/${userId}`);
    return data.data;
  },

  getMe: async (): Promise<IStudentProfileDetails> => {
    const { data } = await api.get<{ data: IStudentProfileDetails }>(API_ENDPOINTS.LEADERBOARD_ME);
    return data.data;
  },

  getXPConfig: async (): Promise<IXPConfig> => {
    const { data } = await api.get<{ data: IXPConfig }>('/leaderboard/config');
    return data.data;
  },

  updateXPConfig: async (config: Partial<IXPConfig>): Promise<IXPConfig> => {
    const { data } = await api.put<{ data: IXPConfig }>('/leaderboard/config', config);
    return data.data;
  },

  recalculateRanks: async (): Promise<{ totalUpdated: number }> => {
    const { data } = await api.post<{ data: { totalUpdated: number } }>('/leaderboard/recalculate');
    return data.data;
  },
};

export default leaderboardService;
