import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { Difficulty } from '@algovisualizer/shared';

export interface IPracticeCategoryStat {
  categoryName: string;
  totalQuestions: number;
  solvedQuestions: number;
  completionPct: number;
  difficultyDistribution: { easy: number; medium: number; hard: number };
  estimatedHours: number;
}

export interface IPatternMasteryStat {
  category: string;
  patternName: string;
  totalQuestions: number;
  solvedQuestions: number;
  completionPct: number;
  recommendedQuestionSlug?: string;
}

export interface IPracticeQuestionItem {
  _id: string;
  title: string;
  slug: string;
  leetcodeNumber?: number;
  category: string;
  pattern: string;
  difficulty: Difficulty;
  companies: string[];
  tags: string[];
  leetcodeUrl?: string;
  estimatedTimeMinutes: number;
  visualizerSlug?: string;
  visualizerCategory?: string;
  isSolved: boolean;
  isBookmarked: boolean;
  status: 'Not Attempted' | 'Attempted' | 'Solved';
  revisionLevel: 'unmarked' | 'revision-1' | 'revision-2' | 'revision-3' | 'mastered';
  firstAcceptedAt?: string;
  bestRuntime?: number;
  bestMemory?: number;
}

export interface IPracticeApproach {
  name: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface IPracticeQuestionDetails extends IPracticeQuestionItem {
  overview: string;
  description?: string;
  hints: string[];
  examples?: { input: string; output: string; explanation?: string }[];
  approaches: IPracticeApproach[];
  codeSnippets: {
    java: string;
    cpp: string;
    python: string;
    pseudo: string;
  };
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  commonMistakes: string[];
  relatedSlugs: string[];
  prerequisites?: string[];
  personalNote?: string;
}

export interface IProblemProgressDetail {
  problemId: string;
  status: 'Not Attempted' | 'Attempted' | 'Solved';
  attempted: boolean;
  solved: boolean;
  bookmarked: boolean;
  notes: string;
  languageUsed: string;
  firstAcceptedAt?: string;
  lastAttemptAt?: string;
  bestRuntime?: number;
  bestMemory?: number;
  submissionCount: number;
  acceptedSubmissionId?: string;
  revisionLevel: string;
}

export interface IUserProgressResponse {
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  bookmarkedProblemIds: string[];
  problemProgressMap?: Record<string, IProblemProgressDetail>;
  revisionLevels: Record<string, string>;
  personalNotes: Record<string, string>;
  overallStats?: {
    solvedCount: number;
    attemptedCount: number;
    bookmarkedCount: number;
    acceptanceRate: string;
    currentStreak: number;
    longestStreak: number;
    totalXP: number;
  };
}

export const practiceService = {
  getCategories: async (): Promise<IPracticeCategoryStat[]> => {
    const { data } = await api.get<{ data: IPracticeCategoryStat[] }>(API_ENDPOINTS.PRACTICE_CATEGORIES);
    return data.data;
  },

  getPatternMastery: async (): Promise<IPatternMasteryStat[]> => {
    const { data } = await api.get<{ data: IPatternMasteryStat[] }>(API_ENDPOINTS.PRACTICE_PATTERNS);
    return data.data;
  },

  getQuestions: async (params?: Record<string, any>): Promise<IPracticeQuestionItem[]> => {
    const { data } = await api.get<{ data: IPracticeQuestionItem[] }>(API_ENDPOINTS.PRACTICE_QUESTIONS, { params });
    return data.data;
  },

  getUserProgress: async (): Promise<IUserProgressResponse> => {
    const { data } = await api.get<{ data: IUserProgressResponse }>(API_ENDPOINTS.PRACTICE_USER_PROGRESS);
    return data.data;
  },

  getQuestionBySlug: async (slug: string): Promise<IPracticeQuestionDetails> => {
    const { data } = await api.get<{ data: IPracticeQuestionDetails }>(API_ENDPOINTS.PRACTICE_QUESTION_BY_SLUG(slug));
    return data.data;
  },

  toggleSolved: async (id: string): Promise<{ isSolved: boolean }> => {
    const { data } = await api.post<{ data: { isSolved: boolean } }>(API_ENDPOINTS.PRACTICE_QUESTION_SOLVE(id));
    return data.data;
  },

  toggleBookmark: async (id: string): Promise<{ isBookmarked: boolean }> => {
    const { data } = await api.post<{ data: { isBookmarked: boolean } }>(API_ENDPOINTS.PRACTICE_QUESTION_BOOKMARK(id));
    return data.data;
  },

  setRevisionLevel: async (id: string, level: string): Promise<{ revisionLevel: string }> => {
    const { data } = await api.post<{ data: { revisionLevel: string } }>(API_ENDPOINTS.PRACTICE_QUESTION_REVISION(id), { level });
    return data.data;
  },

  saveNote: async (id: string, note: string): Promise<{ note: string }> => {
    const { data } = await api.post<{ data: { note: string } }>(API_ENDPOINTS.PRACTICE_QUESTION_NOTE(id), { note });
    return data.data;
  },

  updateStatus: async (id: string, status: string): Promise<{ status: string; isSolved: boolean }> => {
    const { data } = await api.post<{ data: { status: string; isSolved: boolean } }>(API_ENDPOINTS.PRACTICE_QUESTION_STATUS(id), { status });
    return data.data;
  },

  runCode: async (id: string, language: string, code: string, customInput?: string): Promise<any> => {
    const { data } = await api.post<{ data: any }>(API_ENDPOINTS.PRACTICE_QUESTION_RUN(id), { id, language, code, customInput });
    return data.data;
  },

  submitCode: async (id: string, language: string, code: string): Promise<any> => {
    const { data } = await api.post<{ data: any }>(API_ENDPOINTS.PRACTICE_QUESTION_SUBMIT(id), { id, language, code });
    return data.data;
  },

  getSubmissions: async (id: string): Promise<any[]> => {
    const { data } = await api.get<{ data: any[] }>(API_ENDPOINTS.PRACTICE_QUESTION_SUBMISSIONS(id));
    return data.data;
  },
};

export default practiceService;
