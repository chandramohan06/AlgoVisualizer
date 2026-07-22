import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import practiceService from '../services/practiceService';
import { useUserProgress } from './useUserProgress';

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

  // Consume central user progress as well to maintain 100% synchronization
  const { isProblemSolved } = useUserProgress();

  const query = useQuery<IRoadmapProgressResponse>({
    queryKey: ROADMAP_PROGRESS_QUERY_KEY,
    queryFn: async () => {
      // Synchronize with practiceService user progress
      const userProg = await practiceService.getUserProgress();
      const map: Record<string, IRoadmapProgressItem> = {};

      (userProg.solvedProblemIds || []).forEach((id) => {
        map[id] = {
          questionId: id,
          moduleId: 'module-all',
          topicId: 'topic-all',
          patternId: 'pattern-all',
          completed: true,
          completedAt: new Date().toISOString(),
        };
      });

      return {
        completedQuestionIds: userProg.solvedProblemIds || [],
        roadmapProgressMap: map,
      };
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const toggleMutation = useMutation({
    mutationFn: async ({
      questionId,
      status,
    }: {
      questionId: string;
      status: string;
    }) => {
      const res = await practiceService.updateStatus(questionId, status);
      return res;
    },
    onMutate: async ({ questionId, status }) => {
      await queryClient.cancelQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
      const previous = queryClient.getQueryData<IRoadmapProgressResponse>(ROADMAP_PROGRESS_QUERY_KEY);

      const isCompleted = ['completed', 'mastered', 'solved', 'revision-1', 'revision-2'].includes(status.toLowerCase());

      if (previous) {
        const nextSet = new Set(previous.completedQuestionIds);
        if (isCompleted) {
          nextSet.add(questionId);
          nextSet.add(questionId.toLowerCase());
        } else {
          nextSet.delete(questionId);
          nextSet.delete(questionId.toLowerCase());
        }

        queryClient.setQueryData<IRoadmapProgressResponse>(ROADMAP_PROGRESS_QUERY_KEY, {
          ...previous,
          completedQuestionIds: Array.from(nextSet),
        });
      }

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ROADMAP_PROGRESS_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
  });

  const completedSet = new Set<string>(query.data?.completedQuestionIds || []);

  const isQuestionCompleted = (questionId: string, leetcodeNumber?: number | string): boolean => {
    if (isProblemSolved(questionId) || (leetcodeNumber && isProblemSolved(leetcodeNumber))) {
      return true;
    }
    if (completedSet.has(questionId) || completedSet.has(questionId.toLowerCase())) {
      return true;
    }
    if (leetcodeNumber && (completedSet.has(String(leetcodeNumber)) || completedSet.has(`p-${leetcodeNumber}`))) {
      return true;
    }
    return false;
  };

  const toggleQuestionCompletion = (questionId: string, isCurrentlyCompleted: boolean) => {
    const nextStatus = isCurrentlyCompleted ? 'not_started' : 'completed';
    toggleMutation.mutate({ questionId, status: nextStatus });
  };

  return {
    progress: query.data,
    isLoading: query.isLoading,
    isQuestionCompleted,
    toggleQuestionCompletion,
    invalidateRoadmapProgress: () => {
      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
  };
};

export default useRoadmapProgress;
