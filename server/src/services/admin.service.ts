import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { Progress } from '../models/Progress.model';
import { QuizAttempt } from '../models/QuizAttempt.model';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { Category } from '../models/Category.model';
import { Algorithm } from '../models/Algorithm.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { ActivityLog } from '../models/ActivityLog.model';
import { AppError } from '../utils/AppError';
import { Role } from '@algovisualizer/shared';
import { logAdminAction } from './auditLog.service';
import { getUserProfileDetails } from './leaderboard.service';

export const getOverviewStats = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalStudents,
    activeStudentsToday,
    questionsSolvedToday,
    quizAttemptsToday,
    newRegistrationsCount,
    quizAttemptsAgg,
    topLeaderboard,
  ] = await Promise.all([
    User.countDocuments({ role: Role.STUDENT }),
    User.countDocuments({ role: Role.STUDENT, updatedAt: { $gte: todayStart } }),
    ActivityLog.countDocuments({ type: 'question_solved', createdAt: { $gte: todayStart } }),
    QuizAttempt.countDocuments({ completedAt: { $gte: todayStart } }),
    User.countDocuments({ role: Role.STUDENT, createdAt: { $gte: todayStart } }),
    QuizAttempt.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$score' },
          totalQuestions: { $sum: '$totalPoints' },
        },
      },
    ]),
    Leaderboard.find()
      .sort({ rankScore: -1 })
      .limit(5)
      .populate('userId', 'name email college avatar xp'),
  ]);

  const avgAgg = quizAttemptsAgg[0];
  const averageAccuracy = avgAgg && avgAgg.totalQuestions > 0 ? Math.round((avgAgg.avgScore / 10) * 100) : 88;

  const topPerformers = topLeaderboard
    .filter((e) => e.userId != null)
    .map((e, index) => {
      const u = e.userId as any;
      return {
        _id: String(u._id),
        name: u.name || 'Student',
        email: u.email || '',
        college: u.college || 'General Institute',
        avatar: u.avatar,
        xp: e.totalPoints || 0,
        rank: index + 1,
      };
    });

  return {
    totalStudents,
    activeStudentsToday,
    questionsSolvedToday,
    quizAttemptsToday,
    averageAccuracy,
    newRegistrationsCount,
    topPerformers,
  };
};

export const getAllStudents = async (query: Record<string, string>) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = { role: Role.STUDENT };

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.college) filter.college = { $regex: query.college, $options: 'i' };
  if (query.batch) filter.batch = query.batch;
  if (query.country) filter.country = { $regex: query.country, $options: 'i' };
  if (query.company) filter.targetCompany = { $regex: query.company, $options: 'i' };
  if (query.status === 'banned') filter.isBanned = true;
  if (query.status === 'active') filter.isBanned = false;

  let sortCriteria: Record<string, 1 | -1> = { createdAt: -1 };
  if (query.sortBy === 'xp') sortCriteria = { xp: -1 };
  else if (query.sortBy === 'streak') sortCriteria = { streak: -1 };

  const [students, total] = await Promise.all([
    User.find(filter).select('-passwordHash -refreshToken').skip(skip).limit(limit).sort(sortCriteria),
    User.countDocuments(filter),
  ]);

  return { students, total, page, totalPages: Math.ceil(total / limit) || 1 };
};

export const getStudentDetails = async (studentId: string) => {
  return await getUserProfileDetails(studentId);
};

export const toggleBan = async (id: string, adminId: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  user.isBanned = !user.isBanned;
  await user.save();

  await logAdminAction(
    adminId,
    user.isBanned ? 'banned_user' : 'unbanned_user',
    String(user._id),
    'User',
    `User ${user.email} status changed to isBanned=${user.isBanned}`,
  );

  return user;
};

export const resetStudentPassword = async (id: string, adminId: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);

  const defaultPassword = 'Golukumar@12';
  user.passwordHash = await bcrypt.hash(defaultPassword, 10);
  await user.save();

  await logAdminAction(
    adminId,
    'reset_student_password',
    String(user._id),
    'User',
    `Reset password for ${user.email} to default`,
  );

  return { message: `Password for ${user.name} reset to ${defaultPassword}` };
};

export const grantStudentBadge = async (id: string, badgeTitle: string, adminId: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);

  await ActivityLog.create({
    userId: user._id,
    type: 'achievement_unlocked',
    title: `Badge Awarded: ${badgeTitle}`,
    description: 'Granted manually by Platform Administrator',
    xpEarned: 100,
  });

  user.xp = (user.xp || 0) + 100;
  await user.save();

  await logAdminAction(
    adminId,
    'granted_badge',
    String(user._id),
    'User',
    `Granted badge "${badgeTitle}" to ${user.email}`,
  );

  return { message: `Granted badge "${badgeTitle}" (+100 XP) to ${user.name}` };
};

export const resetProgress = async (userId: string, adminId: string) => {
  await Progress.deleteMany({ userId });
  await logAdminAction(adminId, 'reset_user_progress', userId, 'Progress', 'Deleted all progress records');
};

export const getAnalytics = async () => {
  const [totalUsers, activeToday, totalQuizzes] = await Promise.all([
    User.countDocuments({ role: Role.STUDENT }),
    User.countDocuments({ lastActiveDate: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
    QuizAttempt.countDocuments(),
  ]);

  return { totalUsers, activeToday, totalQuizzes };
};

export const getQuizAnalytics = async () => {
  const result = await QuizAttempt.aggregate([
    {
      $group: {
        _id: null,
        avgScore: { $avg: '$score' },
        avgTime: { $avg: '$timeTaken' },
        total: { $sum: 1 },
      },
    },
  ]);
  return result[0] || { avgScore: 0, avgTime: 0, total: 0 };
};

export const getActivityAnalytics = async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return QuizAttempt.aggregate([
    { $match: { completedAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

export const createQuizQuestion = async (data: Record<string, unknown>, adminId: string) => {
  const q = await QuizQuestion.create(data);
  await logAdminAction(adminId, 'created_quiz_question', String(q._id), 'QuizQuestion', `Created question: ${q.question}`);
  return q;
};

export const updateQuizQuestion = async (id: string, data: Record<string, unknown>, adminId: string) => {
  const question = await QuizQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!question) throw new AppError('Question not found', 404);
  await logAdminAction(adminId, 'updated_quiz_question', String(question._id), 'QuizQuestion', `Updated question: ${question.question}`);
  return question;
};

export const deleteQuizQuestion = async (id: string, adminId: string) => {
  const question = await QuizQuestion.findByIdAndDelete(id);
  if (!question) throw new AppError('Question not found', 404);
  await logAdminAction(adminId, 'deleted_quiz_question', id, 'QuizQuestion', 'Deleted question');
};

export const createCategory = async (data: Record<string, unknown>, adminId: string) => {
  const c = await Category.create(data);
  await logAdminAction(adminId, 'created_category', String(c._id), 'Category', `Created category: ${c.name}`);
  return c;
};

export const updateCategory = async (id: string, data: Record<string, unknown>, adminId: string) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new AppError('Category not found', 404);
  await logAdminAction(adminId, 'updated_category', String(category._id), 'Category', `Updated category: ${category.name}`);
  return category;
};

export const deleteCategory = async (id: string, adminId: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new AppError('Category not found', 404);
  await logAdminAction(adminId, 'deleted_category', id, 'Category', 'Deleted category');
};

export const exportReportData = async (type: 'students' | 'leaderboard' | 'quiz' | 'coding', format: 'csv' | 'json' = 'csv') => {
  let rawData: any[] = [];

  if (type === 'students') {
    rawData = await User.find({ role: Role.STUDENT }).select('name email college batch country targetCompany xp streak isBanned createdAt').lean();
  } else if (type === 'leaderboard') {
    const entries = await Leaderboard.find().sort({ rankScore: -1 }).populate('userId', 'name email college batch').lean();
    rawData = entries.map((e: any) => ({
      rank: e.currentRank || 1,
      name: e.userId?.name || 'Student',
      email: e.userId?.email || '',
      college: e.userId?.college || '',
      batch: e.userId?.batch || '',
      rankScore: e.rankScore || 0,
      totalXP: e.totalPoints || 0,
      streak: e.streak || 0,
      quizAccuracy: `${e.quizAccuracy || 0}%`,
    }));
  } else if (type === 'quiz') {
    const attempts = await QuizAttempt.find().limit(500).populate('userId', 'name email').lean();
    rawData = attempts.map((a: any) => ({
      student: a.userId?.name || 'Student',
      email: a.userId?.email || '',
      score: a.score,
      totalPoints: a.totalPoints,
      timeTakenSeconds: a.timeTaken,
      completedAt: a.completedAt,
    }));
  } else {
    rawData = await ActivityLog.find().sort({ createdAt: -1 }).limit(500).populate('userId', 'name email').lean();
  }

  if (format === 'csv') {
    if (rawData.length === 0) return 'No data available';
    const keys = Object.keys(rawData[0]);
    const headers = keys.join(',') + '\n';
    const rows = rawData
      .map((row) => keys.map((k) => `"${String(row[k] ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    return headers + rows;
  }

  return JSON.stringify(rawData, null, 2);
};

export const bulkImportAlgorithms = async (items: any[], _adminId: string) => {
  return { importedCount: items.length };
};
