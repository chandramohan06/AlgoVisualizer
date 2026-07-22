import { Progress } from '../models/Progress.model';
import { Algorithm } from '../models/Algorithm.model';
import { Category } from '../models/Category.model';
import { User } from '../models/User.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { Bookmark } from '../models/Bookmark.model';
import { Note } from '../models/Note.model';
import { QuizAttempt } from '../models/QuizAttempt.model';
import { Achievement } from '../models/Achievement.model';

export const getAll = async (userId: string) => {
  const [categories, algorithms, completedProgress] = await Promise.all([
    Category.find().sort({ order: 1 }),
    Algorithm.find({ isPublished: true }),
    Progress.find({ userId, isCompleted: true }),
  ]);

  const completedSet = new Set(completedProgress.map((p) => String(p.algorithmId)));

  return categories.map((cat) => {
    const catAlgos = algorithms.filter((a) => String(a.category) === String(cat._id));
    const total = catAlgos.length;
    const completed = catAlgos.filter((a) => completedSet.has(String(a._id))).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      categoryId: cat._id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      total,
      completed,
      percentage,
    };
  });
};

export const getSummary = async (userId: string, type?: string) => {
  if (type === 'daily') {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [attemptsToday, progressToday] = await Promise.all([
      QuizAttempt.find({ userId, completedAt: { $gte: startOfToday } }),
      Progress.find({ userId, isCompleted: true, completedAt: { $gte: startOfToday } }),
    ]);

    const xpEarned = attemptsToday.reduce((acc, curr) => acc + curr.score, 0);
    const quizzesCompleted = attemptsToday.length;
    const algorithmsCompleted = progressToday.length;

    return {
      xpEarned,
      xpTarget: 100,
      quizzesCompleted,
      quizzesTarget: 2,
      algorithmsCompleted,
      algorithmsTarget: 2,
    };
  }

  const [
    totalAlgorithms,
    completedProgress,
    user,
    bookmarksCount,
    notesCount,
  ] = await Promise.all([
    Algorithm.countDocuments({ isPublished: true }),
    Progress.find({ userId, isCompleted: true }),
    User.findById(userId),
    Bookmark.countDocuments({ userId }),
    Note.countDocuments({ userId }),
  ]);

  let leaderboard = await Leaderboard.findOne({ userId });
  if (!leaderboard) {
    try {
      leaderboard = await Leaderboard.create({ userId });
    } catch {
      leaderboard = await Leaderboard.findOne({ userId });
    }
  }

  const completedCount = completedProgress.length;
  const percentage = totalAlgorithms > 0 ? Math.round((completedCount / totalAlgorithms) * 100) : 0;

  const streak = user?.streak || 0;
  const quizzesCompleted = (leaderboard as any)?.quizzesCompleted || (leaderboard as any)?.quizAccuracy || 0;
  const totalPoints = leaderboard?.totalPoints || 0;
  const accuracy = (leaderboard as any)?.accuracy || (leaderboard as any)?.quizAccuracy || 0;

  let rank = 1;
  if (leaderboard) {
    rank = (await Leaderboard.countDocuments({ totalPoints: { $gt: totalPoints } })) + 1;
  }

  const level = Math.floor(totalPoints / 300) + 1;

  return {
    totalAlgorithms,
    completedCount,
    percentage,
    totalXP: totalPoints,
    level,
    streak,
    quizzesCompleted,
    quizAccuracy: accuracy,
    problemsSolved: completedCount,
    bookmarksCount,
    notesCount,
    rank,
  };
};

export const getRecentActivity = async (userId: string) => {
  const [completedProgress, attempts, notes, achievements] = await Promise.all([
    Progress.find({ userId, isCompleted: true })
      .populate('algorithmId', 'title')
      .sort({ completedAt: -1 })
      .limit(5),
    QuizAttempt.find({ userId })
      .populate('algorithmId', 'title')
      .sort({ completedAt: -1 })
      .limit(5),
    Note.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5),
    Achievement.find({ userId })
      .sort({ unlockedAt: -1 })
      .limit(5),
  ]);

  const activities: any[] = [];

  completedProgress.forEach((p) => {
    activities.push({
      _id: String(p._id),
      type: 'algorithm_view',
      title: (p.algorithmId as any)?.title || 'Algorithm',
      description: 'Completed algorithm',
      createdAt: p.completedAt || (p as any).updatedAt,
    });
  });

  attempts.forEach((a) => {
    const scorePct = a.totalPoints > 0 ? Math.round((a.score / a.totalPoints) * 100) : 0;
    activities.push({
      _id: String(a._id),
      type: 'quiz_attempt',
      title: (a.algorithmId as any)?.title || 'Quiz',
      description: `Scored ${scorePct}% on quiz`,
      metadata: { score: scorePct },
      createdAt: a.completedAt,
    });
  });

  notes.forEach((n) => {
    activities.push({
      _id: String(n._id),
      type: 'note_created',
      title: n.title || 'Note',
      description: 'Created a new note',
      createdAt: n.createdAt || n.updatedAt,
    });
  });

  achievements.forEach((ach) => {
    activities.push({
      _id: String(ach._id),
      type: 'achievement_unlocked',
      title: ach.type,
      description: 'Unlocked achievement',
      createdAt: ach.unlockedAt,
    });
  });

  activities.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());

  return activities.slice(0, 5);
};

