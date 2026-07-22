import { Algorithm } from '../models/Algorithm.model';
import { Bookmark } from '../models/Bookmark.model';
import { Progress } from '../models/Progress.model';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { PracticeProblem } from '../models/PracticeProblem.model';
import { AppError } from '../utils/AppError';

interface GetAllOptions {
  category?: string;
  difficulty?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export const getAll = async ({ category, difficulty, search, page = '1', limit = '20' }: GetAllOptions) => {
  const filter: Record<string, unknown> = { isPublished: true };
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);
  const [algorithms, total] = await Promise.all([
    Algorithm.find(filter)
      .populate('category', 'name slug icon')
      .select('-theory -javaCode -cppCode -pseudoCode -animationConfig')
      .skip(skip)
      .limit(Number(limit))
      .sort({ 'category.order': 1, title: 1 }),
    Algorithm.countDocuments(filter),
  ]);

  return { algorithms, total, page: Number(page) };
};

export const getBySlug = async (slug: string) => {
  const algorithm = await Algorithm.findOne({ slug, isPublished: true })
    .populate('category', 'name slug icon')
    .populate('relatedAlgorithms', 'slug title difficulty');
  if (!algorithm) throw new AppError('Algorithm not found', 404);
  return algorithm;
};

export const getQuizQuestions = async (slug: string) => {
  const algorithm = await Algorithm.findOne({ slug }).select('_id');
  if (!algorithm) throw new AppError('Algorithm not found', 404);
  return QuizQuestion.find({ algorithmId: algorithm._id }).select('-correctAnswer'); // hide answer
};

export const getPracticeProblems = async (slug: string) => {
  const algorithm = await Algorithm.findOne({ slug }).select('_id');
  if (!algorithm) throw new AppError('Algorithm not found', 404);
  return PracticeProblem.find({ algorithmId: algorithm._id }).select('-solution');
};

export const toggleBookmark = async (userId: string, slug: string) => {
  const algorithm = await Algorithm.findOne({ slug }).select('_id');
  if (!algorithm) throw new AppError('Algorithm not found', 404);

  const existing = await Bookmark.findOne({ userId, algorithmId: algorithm._id });
  if (existing) {
    await existing.deleteOne();
    return { bookmarked: false };
  }
  await Bookmark.create({ userId, algorithmId: algorithm._id });
  return { bookmarked: true };
};

export const markComplete = async (userId: string, slug: string) => {
  const algorithm = await Algorithm.findOne({ slug }).select('_id');
  if (!algorithm) throw new AppError('Algorithm not found', 404);

  const progress = await Progress.findOneAndUpdate(
    { userId, algorithmId: algorithm._id },
    { isCompleted: true, completedAt: new Date() },
    { upsert: true, new: true },
  );
  return progress;
};

export const create = async (data: Record<string, unknown>) => {
  return Algorithm.create(data);
};

export const update = async (id: string, data: Record<string, unknown>) => {
  const algorithm = await Algorithm.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!algorithm) throw new AppError('Algorithm not found', 404);
  return algorithm;
};

export const remove = async (id: string) => {
  const algorithm = await Algorithm.findByIdAndDelete(id);
  if (!algorithm) throw new AppError('Algorithm not found', 404);
};
