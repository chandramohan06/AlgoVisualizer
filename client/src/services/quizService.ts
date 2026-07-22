import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { IQuizAttempt, IQuizQuestion, ISubmitQuizDto } from '@algovisualizer/shared';

export interface GeneratedQuizResponse {
  topic: string;
  mcqs: any[];
  codingQuestions: any[];
  totalQuestions: number;
}

export const quizService = {
  generateQuiz: async (params: {
    topic: string;
    difficulty?: string;
    numberOfMCQs?: number;
    numberOfCodingQuestions?: number;
  }): Promise<GeneratedQuizResponse> => {
    // POST to /api/v1/quiz/generate with full absolute path
    const { data } = await api.post<{ data: GeneratedQuizResponse }>(
      API_ENDPOINTS.QUIZ_GENERATE,
      params,
    );
    return data.data;
  },

  getQuestions: async (slug: string): Promise<IQuizQuestion[]> => {
    const { data } = await api.get<{ data: IQuizQuestion[] }>(API_ENDPOINTS.ALGORITHM_QUIZ(slug));
    return data.data;
  },

  submitAttempt: async (payload: ISubmitQuizDto): Promise<IQuizAttempt> => {
    const { data } = await api.post<{ data: IQuizAttempt }>(API_ENDPOINTS.QUIZ_ATTEMPT, payload);
    return data.data;
  },

  getHistory: async (): Promise<IQuizAttempt[]> => {
    const { data } = await api.get<{ data: IQuizAttempt[] }>(API_ENDPOINTS.QUIZ_HISTORY);
    return data.data;
  },

  getAttemptById: async (id: string): Promise<IQuizAttempt> => {
    const { data } = await api.get<{ data: IQuizAttempt }>(API_ENDPOINTS.QUIZ_ATTEMPT_BY_ID(id));
    return data.data;
  },
};

export default quizService;
