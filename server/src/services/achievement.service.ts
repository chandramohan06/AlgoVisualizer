import { Achievement } from '../models/Achievement.model';

export const getAll = async (userId: string) => {
  return Achievement.find({ userId }).sort({ unlockedAt: -1 });
};

export const unlock = async (userId: string, type: string) => {
  try {
    return await Achievement.create({ userId, type });
  } catch {
    // Silently ignore duplicate (already unlocked)
  }
};
