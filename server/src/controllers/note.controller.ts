import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as NoteService from '../services/note.service';

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id?.toString();
  const notes = await NoteService.getAllNotes(userId, req.query as Record<string, string>);
  sendSuccess({ res, data: notes });
});

export const getBySlugOrId = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id?.toString();
  const note = await NoteService.getNoteBySlugOrId(req.params.idOrSlug as string, userId);
  sendSuccess({ res, data: note });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.createNote(req.user!._id.toString(), req.body);
  sendSuccess({ res, statusCode: 201, message: 'Note created successfully', data: note });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.updateNote(req.user!._id.toString(), req.params.id as string, req.body);
  sendSuccess({ res, message: 'Note updated successfully', data: note });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await NoteService.deleteNote(req.user!._id.toString(), req.params.id as string);
  sendSuccess({ res, message: result.message });
});

export const togglePublish = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.togglePublishNote(req.user!._id.toString(), req.params.id as string);
  sendSuccess({ res, message: `Note ${note.published ? 'published' : 'unpublished'} successfully`, data: note });
});

export const duplicate = asyncHandler(async (req: AuthRequest, res: Response) => {
  const note = await NoteService.duplicateNote(req.user!._id.toString(), req.params.id as string);
  sendSuccess({ res, statusCode: 201, message: 'Note duplicated successfully', data: note });
});

export const reorder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await NoteService.reorderNotes(req.user!._id.toString(), req.body.orderedIds as string[]);
  sendSuccess({ res, message: result.message });
});

export const toggleBookmark = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await NoteService.toggleBookmark(req.user!._id.toString(), req.params.id as string);
  sendSuccess({ res, message: 'Bookmark status updated', data: result });
});

export const toggleComplete = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await NoteService.toggleComplete(req.user!._id.toString(), req.params.id as string);
  sendSuccess({ res, message: 'Completion status updated', data: result });
});

export const recordReadTime = asyncHandler(async (req: AuthRequest, res: Response) => {
  const minutes = Number(req.body.minutes) || 1;
  const progress = await NoteService.recordReadTime(req.user!._id.toString(), req.params.id as string, minutes);
  sendSuccess({ res, message: 'Read time recorded', data: progress });
});

export const getDashboardNotes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await NoteService.getDashboardNotes(req.user!._id.toString());
  sendSuccess({ res, data });
});
