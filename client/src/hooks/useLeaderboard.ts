import { useQuery } from '@tanstack/react-query';
import { leaderboardService } from '@services/leaderboardService';
import { ILeaderboardEntry } from '@algovisualizer/shared';

export interface LeaderboardEntry {
  _id: string;
  name: string;
  avatar?: string;
  college?: string;
  totalPoints: number;
  rank: number;
  streak: number;
}

export const useLeaderboardPreview = () =>
  useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard', 'preview'],
    queryFn: async () => {
      try {
        const raw = await leaderboardService.getGlobal();
        return raw.map((item: ILeaderboardEntry) => ({
          _id: item._id,
          name: item.userId?.name || 'Student',
          avatar: item.userId?.avatar,
          college: item.userId?.college,
          totalPoints: item.totalPoints,
          rank: item.currentRank || 1,
          streak: item.streak || 0,
        }));
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
  });
