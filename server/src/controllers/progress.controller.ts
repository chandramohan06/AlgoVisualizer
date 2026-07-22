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

