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

export const useAchievements = () =>
  useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      try {
        const live = await achievementService.getAll();
        return (live || []).map((l: any) => ({
          _id: String(l._id),
          title: l.type || 'Achievement',
          description: l.description || 'Platform achievement',
          icon: l.icon || '🏆',
          unlocked: true,
          unlockedAt: l.unlockedAt,
          points: l.pointsEarned || 50,
        }));
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
  });
