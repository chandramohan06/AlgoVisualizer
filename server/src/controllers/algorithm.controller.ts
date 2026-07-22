import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as AlgorithmService from '../services/algorithm.service';

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category, difficulty, search, page, limit } = req.query;
  const data = await AlgorithmService.getAll({ category, difficulty, search, page, limit } as Record<string, string>);
  sendSuccess({ res, data: data.algorithms, meta: { total: data.total, page: data.page } });
});

export const getBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const algorithm = await AlgorithmService.getBySlug(req.params.slug as string);
  sendSuccess({ res, data: algorithm });
});

export const getQuizQuestions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const questions = await AlgorithmService.getQuizQuestions(req.params.slug as string);
  sendSuccess({ res, data: questions });
});

export const getPracticeProblems = asyncHandler(async (req: AuthRequest, res: Response) => {
  const problems = await AlgorithmService.getPracticeProblems(req.params.slug as string);
  sendSuccess({ res, data: problems });
});

export const toggleBookmark = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AlgorithmService.toggleBookmark(req.user!._id, req.params.slug as string);
  sendSuccess({ res, message: result.bookmarked ? 'Bookmarked' : 'Bookmark removed', data: result });
});

export const markComplete = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AlgorithmService.markComplete(req.user!._id, req.params.slug as string);
  sendSuccess({ res, message: 'Progress updated', data: result });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const algorithm = await AlgorithmService.create({ ...req.body, createdBy: req.user!._id });
  sendSuccess({ res, statusCode: 201, message: 'Algorithm created', data: algorithm });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const algorithm = await AlgorithmService.update(req.params.id as string, req.body);
  sendSuccess({ res, message: 'Algorithm updated', data: algorithm });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AlgorithmService.remove(req.params.id as string);
  sendSuccess({ res, message: 'Algorithm deleted' });
});
