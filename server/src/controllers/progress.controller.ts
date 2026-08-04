import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as ProgressService from '../services/progress.service';

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await ProgressService.getAll(req.user!._id);
  sendSuccess({ res, data });
});

export const getSummary = asyncHandler(async (req: AuthRequest, res: Response) => {
  const type = req.query.type as string | undefined;
  const data = await ProgressService.getSummary(req.user!._id, type);
  sendSuccess({ res, data });
});

export const getRecentActivity = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await ProgressService.getRecentActivity(req.user!._id);
  sendSuccess({ res, data });
});

export const getDashboardFullStats = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await ProgressService.getDashboardFullStats(req.user!._id);
  sendSuccess({ res, data });
});

export const toggleProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { questionId, isCompleted, status } = req.body;
  const data = await ProgressService.toggleProgress(req.user!._id, questionId, isCompleted, status);
  sendSuccess({ res, data });
});

export const saveProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { items } = req.body;
  const data = await ProgressService.saveProgress(req.user!._id, items || []);
  sendSuccess({ res, data });
});
