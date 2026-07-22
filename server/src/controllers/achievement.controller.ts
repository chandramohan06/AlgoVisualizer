import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as AchievementService from '../services/achievement.service';

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await AchievementService.getAll(req.user!._id);
  sendSuccess({ res, data });
});
