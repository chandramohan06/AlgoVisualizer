import { useQuery } from '@tanstack/react-query';
import { achievementService } from '@services/achievementService';

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { _id: '1', title: 'First Algorithm', description: 'Read and analyzed your first algorithm', icon: '🚀', unlocked: true, unlockedAt: new Date(Date.now() - 5 * 86400000).toISOString(), points: 50 },
  { _id: '2', title: '7 Day Streak', description: 'Maintained a active learning streak for 7 days', icon: '🔥', unlocked: true, unlockedAt: new Date(Date.now() - 1 * 86400000).toISOString(), points: 100 },
  { _id: '3', title: 'Sorting Master', description: 'Completed all sorting algorithm modules', icon: '🔃', unlocked: false, points: 200 },
  { _id: '4', title: 'Quiz Whiz', description: 'Scored 100% on any medium-difficulty quiz', icon: '🧠', unlocked: false, points: 150 },
];

export const useAchievements = () =>
  useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      try {
        const live = await achievementService.getAll();
        // Merge unlock statuses
        return MOCK_ACHIEVEMENTS.map((mock) => {
          const match = live.find((l: any) => l.type.toLowerCase() === mock.title.toLowerCase().replace(' ', '_'));
          return {
            ...mock,
            unlocked: match ? true : mock.unlocked,
            unlockedAt: match ? match.unlockedAt : mock.unlockedAt,
          };
        });
      } catch {
        return MOCK_ACHIEVEMENTS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
