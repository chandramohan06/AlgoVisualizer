import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as LeaderboardService from '../services/leaderboard.service';
import * as XPService from '../services/xp.service';

export const getLeaderboard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params: LeaderboardService.LeaderboardQueryParams = {
    type: req.query.type as any,
    college: req.query.college as string,
    batch: req.query.batch as string,
    company: req.query.company as string,
    topic: req.query.topic as string,
    difficulty: req.query.difficulty as string,
    search: req.query.search as string,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
  };

  const data = await LeaderboardService.getLeaderboard(params);
  sendSuccess({ res, data });
});

export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const targetUserId = (req.params.userId as string) || req.user!._id.toString();
  const data = await LeaderboardService.getUserProfileDetails(targetUserId);
  sendSuccess({ res, data });
});

export const getMyRank = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await LeaderboardService.getUserProfileDetails(req.user!._id.toString());
  sendSuccess({ res, data });
});

export const getXPConfig = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await XPService.getOrInitXPConfig();
  sendSuccess({ res, data });
});

export const updateXPConfig = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await XPService.updateXPConfig(req.body);
  sendSuccess({ res, data });
});

export const recalculateRanks = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await LeaderboardService.recalculateAllRanks();
  sendSuccess({ res, data });
});
