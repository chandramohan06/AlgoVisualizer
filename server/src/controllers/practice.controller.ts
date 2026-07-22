import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as PracticeService from '../services/practice.service';

export const getQuestions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await PracticeService.getQuestions(req.user!._id, req.query);
  sendSuccess({ res, data });
});

export const getQuestionById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.params.slug) as string;
  const data = await PracticeService.getQuestionById(req.user!._id, id);
  sendSuccess({ res, data });
});

export const getUserProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await PracticeService.getUserProgress(req.user!._id);
  sendSuccess({ res, data });
});

export const toggleBookmark = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.body.id) as string;
  const data = await PracticeService.toggleBookmark(req.user!._id, id);
  sendSuccess({ res, message: 'Bookmark updated', data });
});

export const updateQuestionStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.body.id) as string;
  const { status } = req.body;
  const data = await PracticeService.updateQuestionStatus(req.user!._id, id, status);
  sendSuccess({ res, message: 'Status updated', data });
});

export const saveNote = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.body.id) as string;
  const { note } = req.body;
  const data = await PracticeService.saveNote(req.user!._id, id, note);
  sendSuccess({ res, message: 'Note saved', data });
});

export const runCode = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.body.id || req.body.problemId) as string;
  const { language, code, customInput } = req.body;
  const data = await PracticeService.runCode(req.user!._id, id, language, code, customInput);
  sendSuccess({ res, message: 'Code executed', data });
});

export const submitCode = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || req.body.id || req.body.problemId) as string;
  const { language, code } = req.body;
  const data = await PracticeService.submitCode(req.user!._id, id, language, code);
  sendSuccess({ res, message: 'Submission evaluated', data });
});

export const getSubmissions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = (req.params.id || (req.query.problemId as string) || (req.query.id as string)) as string;
  const data = await PracticeService.getSubmissions(req.user!._id, id);
  sendSuccess({ res, data });
});
