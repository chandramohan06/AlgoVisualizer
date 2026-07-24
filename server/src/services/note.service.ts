import { Note } from '../models/Note.model';
import { NoteProgress } from '../models/NoteProgress.model';
import { AppError } from '../utils/AppError';
import { INote, ICreateNoteDto, IUpdateNoteDto, INoteQueryFilter } from '@algovisualizer/shared';
import mongoose from 'mongoose';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getAllNotes = async (userId?: string, query: INoteQueryFilter = {}): Promise<INote[]> => {
  const filter: Record<string, unknown> = {};

  // Admin vs Public filtering
  if (query.published !== 'all') {
    filter.published = query.published === 'false' ? false : true;
  }

  if (query.category && query.category !== 'All') {
    filter.category = query.category;
  }

  if (query.difficulty && query.difficulty !== 'All') {
    filter.difficulty = query.difficulty;
  }

  if (query.tag) {
    filter.tags = query.tag;
  }

  if (query.search) {
    const searchRegex = new RegExp(query.search, 'i');
    filter.$or = [
      { title: searchRegex },
      { category: searchRegex },
      { definition: searchRegex },
      { tags: searchRegex },
      { description: searchRegex },
    ];
  }

  // Handle student progress filters (bookmarked / completed)
  let userProgressMap = new Map<string, { isBookmarked: boolean; isCompleted: boolean; readTimeMinutes: number; lastReadAt: Date }>();

  if (userId) {
    const userProgress = await NoteProgress.find({ userId });
    userProgress.forEach((p) => {
      userProgressMap.set(p.noteId.toString(), {
        isBookmarked: p.isBookmarked,
        isCompleted: p.isCompleted,
        readTimeMinutes: p.readTimeMinutes,
        lastReadAt: p.lastReadAt,
      });
    });

    if (query.bookmarked === 'true') {
      const bookmarkedIds = Array.from(userProgressMap.entries())
        .filter(([_, val]) => val.isBookmarked)
        .map(([id]) => new mongoose.Types.ObjectId(id));
      filter._id = { $in: bookmarkedIds };
    }

    if (query.completed === 'true') {
      const completedIds = Array.from(userProgressMap.entries())
        .filter(([_, val]) => val.isCompleted)
        .map(([id]) => new mongoose.Types.ObjectId(id));
      filter._id = { $in: completedIds };
    }
  }

  const sortOption: Record<string, 1 | -1> = query.sort === 'title' ? { title: 1 } : { order: 1, createdAt: 1 };
  const notes = await Note.find(filter).sort(sortOption).lean();

  return notes.map((note) => {
    const noteIdStr = note._id.toString();
    const userState = userProgressMap.get(noteIdStr);
    return {
      ...note,
      isBookmarked: userState ? userState.isBookmarked : false,
      isCompleted: userState ? userState.isCompleted : false,
      userReadTime: userState ? userState.readTimeMinutes : 0,
      lastReadAt: userState ? userState.lastReadAt?.toISOString() : undefined,
    } as unknown as INote;
  });
};

export const getNoteBySlugOrId = async (idOrSlug: string, userId?: string): Promise<INote> => {
  const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
  const filter = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };

  const note = await Note.findOne(filter).lean();
  if (!note) {
    throw new AppError('Note not found', 404);
  }

  let userState = null;
  if (userId) {
    const progress = await NoteProgress.findOneAndUpdate(
      { userId, noteId: note._id },
      { $set: { lastReadAt: new Date() } },
      { new: true, upsert: true }
    );
    userState = {
      isBookmarked: progress.isBookmarked,
      isCompleted: progress.isCompleted,
      userReadTime: progress.readTimeMinutes,
      lastReadAt: progress.lastReadAt?.toISOString(),
    };
  }

  return {
    ...note,
    isBookmarked: userState ? userState.isBookmarked : false,
    isCompleted: userState ? userState.isCompleted : false,
    userReadTime: userState ? userState.userReadTime : 0,
    lastReadAt: userState ? userState.lastReadAt : undefined,
  } as unknown as INote;
};

export const createNote = async (userId: string, dto: ICreateNoteDto) => {
  let slug = dto.slug ? generateSlug(dto.slug) : generateSlug(dto.title);
  
  // Ensure unique slug
  let existing = await Note.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const note = await Note.create({
    ...dto,
    slug,
    createdBy: userId,
    updatedBy: userId,
  });

  return note;
};

export const updateNote = async (userId: string, noteId: string, dto: IUpdateNoteDto) => {
  if (dto.title && !dto.slug) {
    dto.slug = generateSlug(dto.title);
  }

  const note = await Note.findByIdAndUpdate(
    noteId,
    { ...dto, updatedBy: userId },
    { new: true, runValidators: true }
  );

  if (!note) {
    throw new AppError('Note not found', 404);
  }

  return note;
};

export const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findByIdAndDelete(noteId);
  if (!note) {
    throw new AppError('Note not found', 404);
  }
  await NoteProgress.deleteMany({ noteId });
  return { message: 'Note deleted successfully' };
};

export const togglePublishNote = async (userId: string, noteId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new AppError('Note not found', 404);
  }
  note.published = !note.published;
  note.updatedBy = new mongoose.Types.ObjectId(userId);
  await note.save();
  return note;
};

export const duplicateNote = async (userId: string, noteId: string) => {
  const sourceNote = await Note.findById(noteId).lean();
  if (!sourceNote) {
    throw new AppError('Note not found', 404);
  }

  const { _id, createdAt, updatedAt, ...rest } = sourceNote;
  const newTitle = `${rest.title} (Copy)`;
  const newSlug = `${generateSlug(newTitle)}-${Date.now().toString().slice(-4)}`;

  const duplicated = await Note.create({
    ...rest,
    title: newTitle,
    slug: newSlug,
    published: false,
    createdBy: userId,
    updatedBy: userId,
  });

  return duplicated;
};

export const reorderNotes = async (userId: string, orderedIds: string[]) => {
  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index, updatedBy: new mongoose.Types.ObjectId(userId) } },
    },
  }));

  await Note.bulkWrite(bulkOps as any);
  return { message: 'Notes reordered successfully' };
};

export const toggleBookmark = async (userId: string, noteId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new AppError('Note not found', 404);
  }

  let progress = await NoteProgress.findOne({ userId, noteId });
  if (!progress) {
    progress = await NoteProgress.create({
      userId,
      noteId,
      isBookmarked: true,
    });
  } else {
    progress.isBookmarked = !progress.isBookmarked;
    await progress.save();
  }

  return {
    noteId: note._id,
    isBookmarked: progress.isBookmarked,
  };
};

export const toggleComplete = async (userId: string, noteId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new AppError('Note not found', 404);
  }

  let progress = await NoteProgress.findOne({ userId, noteId });
  if (!progress) {
    progress = await NoteProgress.create({
      userId,
      noteId,
      isCompleted: true,
    });
  } else {
    progress.isCompleted = !progress.isCompleted;
    await progress.save();
  }

  return {
    noteId: note._id,
    isCompleted: progress.isCompleted,
  };
};

export const recordReadTime = async (userId: string, noteId: string, minutes: number) => {
  let progress = await NoteProgress.findOne({ userId, noteId });
  if (!progress) {
    progress = await NoteProgress.create({
      userId,
      noteId,
      readTimeMinutes: Math.max(1, minutes),
      lastReadAt: new Date(),
    });
  } else {
    progress.readTimeMinutes += Math.max(1, minutes);
    progress.lastReadAt = new Date();
    await progress.save();
  }

  return progress;
};

export const getDashboardNotes = async (userId: string) => {
  // Get recent progress
  const userProgress = await NoteProgress.find({ userId })
    .sort({ lastReadAt: -1 })
    .limit(10)
    .populate('noteId')
    .lean();

  const completedCount = await NoteProgress.countDocuments({ userId, isCompleted: true });
  const bookmarkedProgress = await NoteProgress.find({ userId, isBookmarked: true })
    .populate('noteId')
    .lean();

  const totalReadingTimeAgg = await NoteProgress.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalTime: { $sum: '$readTimeMinutes' } } },
  ]);

  const totalReadingTime = totalReadingTimeAgg[0]?.totalTime || 0;

  const recentlyOpened = userProgress
    .filter((p) => p.noteId && (p.noteId as unknown as { published: boolean }).published)
    .map((p) => ({
      ...(p.noteId as unknown as Record<string, unknown>),
      isBookmarked: p.isBookmarked,
      isCompleted: p.isCompleted,
      lastReadAt: p.lastReadAt,
    }));

  const bookmarkedNotes = bookmarkedProgress
    .filter((p) => p.noteId && (p.noteId as unknown as { published: boolean }).published)
    .map((p) => ({
      ...(p.noteId as unknown as Record<string, unknown>),
      isBookmarked: true,
      isCompleted: p.isCompleted,
    }));

  const recentlyAdded = await Note.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const continueReading = recentlyOpened[0] || recentlyAdded[0] || null;

  return {
    stats: {
      notesReadCount: userProgress.length,
      completedCount,
      bookmarkedCount: bookmarkedNotes.length,
      totalReadingTimeMinutes: totalReadingTime,
    },
    continueReading,
    recentlyOpened: recentlyOpened.slice(0, 5),
    bookmarkedNotes: bookmarkedNotes.slice(0, 5),
    recentlyAdded,
  };
};
