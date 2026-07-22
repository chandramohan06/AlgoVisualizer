import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as NoteService from '../services/note.service';

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const notes = await NoteService.getAll(req.user!._id, req.query as Record<string, string>);
  sendSuccess({ res, data: notes });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.create(req.user!._id, req.body);
  sendSuccess({ res, statusCode: 201, message: 'Note created', data: note });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.update(req.user!._id, req.params.id as string, req.body);
  sendSuccess({ res, message: 'Note updated', data: note });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  await NoteService.remove(req.user!._id, req.params.id as string);
  sendSuccess({ res, message: 'Note deleted' });
});

export const toggleBookmark = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.toggleBookmark(req.user!._id, req.params.id as string);
  sendSuccess({ res, message: 'Note bookmark toggled', data: note });
});
