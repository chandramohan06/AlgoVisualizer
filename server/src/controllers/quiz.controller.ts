import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as QuizService from '../services/quiz.service';

export const generateQuiz = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params: QuizService.GenerateQuizParams = {
    topic: (req.query.topic as string) || (req.body.topic as string) || 'Array',
    difficulty: (req.query.difficulty as string) || (req.body.difficulty as string),
    numberOfMCQs: Number(req.query.numberOfMCQs || req.body.numberOfMCQs) || 15,
    numberOfCodingQuestions: Number(req.query.numberOfCodingQuestions || req.body.numberOfCodingQuestions) || 2,
  };

  const data = await QuizService.generateTopicQuiz(params);
  sendSuccess({ res, data });
});

export const submitAttempt = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await QuizService.submitAttempt(req.user!._id, req.body);
  sendSuccess({ res, statusCode: 201, message: 'Quiz submitted', data: result });
});

export const getHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const upcoming = req.query.upcoming as string | undefined;
  const data = await QuizService.getHistory(req.user!._id, upcoming);
  sendSuccess({ res, data });
});

export const getAttemptById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const attempt = await QuizService.getAttemptById(req.user!._id, req.params.attemptId as string);
  sendSuccess({ res, data: attempt });
});
