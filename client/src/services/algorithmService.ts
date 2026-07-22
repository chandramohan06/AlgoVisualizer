import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { IAlgorithmDocument } from '../../../server/src/models/Algorithm.model';
import { IPracticeProblemDocument } from '../../../server/src/models/PracticeProblem.model';

export const algorithmService = {
  getAll: async (params?: Record<string, string>): Promise<IAlgorithmDocument[]> => {
    const { data } = await api.get<{ data: IAlgorithmDocument[] }>(API_ENDPOINTS.ALGORITHMS, { params });
    return data.data;
  },

  getBySlug: async (slug: string): Promise<IAlgorithmDocument> => {
    const { data } = await api.get<{ data: IAlgorithmDocument }>(API_ENDPOINTS.ALGORITHM_BY_SLUG(slug));
    return data.data;
  },

  getPracticeProblems: async (slug: string): Promise<IPracticeProblemDocument[]> => {
    const { data } = await api.get<{ data: IPracticeProblemDocument[] }>(API_ENDPOINTS.ALGORITHM_PRACTICE(slug));
    return data.data;
  },

  markComplete: async (slug: string): Promise<{ isCompleted: boolean }> => {
    const { data } = await api.post<{ data: { isCompleted: boolean } }>(API_ENDPOINTS.ALGORITHM_COMPLETE(slug));
    return data.data;
  },
};
export default algorithmService;
