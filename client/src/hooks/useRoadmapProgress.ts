import { useQuery, useQueryClient } from '@tanstack/react-query';

export const ROADMAP_PROGRESS_QUERY_KEY = ['roadmap-progress'];

export interface IRoadmapProgressItem {
  questionId: string;
  moduleId: string;
  topicId: string;
  patternId: string;
  completed: boolean;
  completedAt?: string;
  updatedAt?: string;
}

export interface IRoadmapProgressResponse {
  completedQuestionIds: string[];
  roadmapProgressMap: Record<string, IRoadmapProgressItem>;
}

export const useRoadmapProgress = () => {
  const queryClient = useQueryClient();

  const query = useQuery<IRoadmapProgressResponse>({
    queryKey: ROADMAP_PROGRESS_QUERY_KEY,
    queryFn: async () => {
      return {
        completedQuestionIds: [],
        roadmapProgressMap: {},
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const completedSet = new Set<string>(query.data?.completedQuestionIds || []);

  const isQuestionCompleted = (questionId: string, leetcodeNumber?: number | string): boolean => {
    if (completedSet.has(questionId) || completedSet.has(questionId.toLowerCase())) {
      return true;
    }
    if (leetcodeNumber && (completedSet.has(String(leetcodeNumber)) || completedSet.has(`p-${leetcodeNumber}`))) {
      return true;
    }
    return false;
  };

  const toggleQuestionCompletion = (_questionId: string, _isCurrentlyCompleted: boolean) => {};

  return {
    progress: query.data,
    isLoading: query.isLoading,
    isQuestionCompleted,
    toggleQuestionCompletion,
    invalidateRoadmapProgress: () => {
      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
    },
  };
};

export default useRoadmapProgress;
