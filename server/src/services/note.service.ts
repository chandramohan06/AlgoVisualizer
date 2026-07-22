import { Note } from '../models/Note.model';
import { AppError } from '../utils/AppError';
import { ICreateNoteDto, IUpdateNoteDto } from '@algovisualizer/shared';

export const getAll = async (userId: string, query: Record<string, string>) => {
  const filter: Record<string, unknown> = { userId };
  if (query.bookmarked === 'true') filter.isBookmarked = true;
  if (query.algorithmId) filter.algorithmId = query.algorithmId;

  return Note.find(filter).sort({ updatedAt: -1 });
};

export const create = async (userId: string, dto: ICreateNoteDto) => {
  return Note.create({ ...dto, userId });
};

export const update = async (userId: string, noteId: string, dto: IUpdateNoteDto) => {
  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, dto, { new: true, runValidators: true });
  if (!note) throw new AppError('Note not found', 404);
  return note;
};

export const remove = async (userId: string, noteId: string) => {
  const note = await Note.findOneAndDelete({ _id: noteId, userId });
  if (!note) throw new AppError('Note not found', 404);
};

export const toggleBookmark = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, userId });
  if (!note) throw new AppError('Note not found', 404);
  note.isBookmarked = !note.isBookmarked;
  await note.save();
  return note;
};
