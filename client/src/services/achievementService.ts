import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { Achievement } from '../hooks/useAchievements';

export const achievementService = {
  getAll: async (): Promise<Achievement[]> => {
    const { data } = await api.get<{ data: Achievement[] }>(API_ENDPOINTS.USER_ACHIEVEMENTS);
    return data.data;
  },
};
export default achievementService;
