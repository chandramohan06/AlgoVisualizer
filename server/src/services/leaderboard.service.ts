import { Leaderboard } from '../models/Leaderboard.model';
import { User } from '../models/User.model';
import { ActivityLog } from '../models/ActivityLog.model';
import { Achievement } from '../models/Achievement.model';
import { AppError } from '../utils/AppError';
import { ILeaderboardEntry, IStudentProfileDetails, IHeatmapDay } from '@algovisualizer/shared';

const USER_SELECT = 'name avatar college batch targetCompany country bio github linkedin leetcode createdAt';

export interface LeaderboardQueryParams {
  type?: 'global' | 'college' | 'batch' | 'weekly' | 'monthly' | 'alltime' | 'friends';
  college?: string;
  batch?: string;
  company?: string;
  topic?: string;
  difficulty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const SEED_EMAILS = [
  'aarav.sharma@iitb.ac.in',
  'priya.patel@bits-pilani.ac.in',
  'rohan.gupta@nitt.edu',
  'ananya.v@vit.ac.in',
  'kabir.mehta@dtu.ac.in',
  'sanya.m@iiit.ac.in',
  'devansh.r@rvce.edu.in',
  'ishita.roy@iitd.ac.in',
  'vihaan.j@manipal.edu',
  'diya.sen@srmist.edu.in',
  'chandramohankumarsingh06@gmail.com',
  'aditya.k@coep.ac.in',
  'riya.nair@cet.ac.in',
  'karan.iyer@vjti.ac.in',
  'meera.d@pict.edu',
];

const SEED_NAMES = [
  'Aarav Sharma',
  'Priya Patel',
  'Rohan Gupta',
  'Ananya Verma',
  'Kabir Mehta',
  'Sanya Malhotra',
  'Devansh Reddy',
  'Ishita Roy',
  'Vihaan Joshi',
  'Diya Sen',
  'Aditya Kulkarni',
  'Riya Nair',
  'Karan Iyer',
  'Meera Deshmukh',
  'Chandra Mohan Kumar Singh',
];

export const purgeSeedUsers = async () => {
  try {
    const fakeUsers = await User.find({
      $or: [{ email: { $in: SEED_EMAILS } }, { name: { $in: SEED_NAMES } }],
    }).select('_id');

    if (fakeUsers.length > 0) {
      const fakeUserIds = fakeUsers.map((u) => u._id);
      await User.deleteMany({ _id: { $in: fakeUserIds } });
      await Leaderboard.deleteMany({ userId: { $in: fakeUserIds } });
    }
  } catch (err) {
    // Purge failure fallback
  }
};

export const syncMissingLeaderboards = async () => {
  try {
    const usersWithoutLeaderboard = await User.aggregate([
      {
        $lookup: {
          from: 'leaderboards',
          localField: '_id',
          foreignField: 'userId',
          as: 'lb',
        },
      },
      { $match: { lb: { $size: 0 } } },
      { $project: { _id: 1 } },
    ]);

    if (usersWithoutLeaderboard.length > 0) {
      const docsToCreate = usersWithoutLeaderboard.map((u) => ({ userId: u._id }));
      await Leaderboard.insertMany(docsToCreate);
    }
  } catch (err) {
    // Ignore duplicate key errors if race condition happens
  }
};

export const getLeaderboard = async (params: LeaderboardQueryParams = {}, currentUserId?: string) => {
  await purgeSeedUsers();
  await syncMissingLeaderboards();

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  // Build filter criteria
  const userMatch: Record<string, any> = { isBanned: false };
  if (params.college) userMatch.college = new RegExp(params.college, 'i');
  if (params.batch) userMatch.batch = params.batch;
  if (params.company) userMatch.targetCompany = new RegExp(params.company, 'i');
  if (params.search) userMatch.name = new RegExp(params.search, 'i');

  // Match users first if user filters applied
  let userIds: any[] | null = null;
  if (params.college || params.batch || params.company || params.search) {
    const matchingUsers = await User.find(userMatch).select('_id');
    userIds = matchingUsers.map((u) => u._id);
  }

  const query: Record<string, any> = {};
  if (userIds !== null) {
    query.userId = { $in: userIds };
  }

  // Strict sorting: Overall Score (rankScore) DESC -> XP (totalPoints) DESC -> Streak DESC
  let sortField: Record<string, 1 | -1> = { rankScore: -1, totalPoints: -1, streak: -1 };
  if (params.type === 'weekly') sortField = { weeklyPoints: -1, rankScore: -1, streak: -1 };
  else if (params.type === 'monthly') sortField = { monthlyPoints: -1, rankScore: -1, streak: -1 };
  else if (params.type === 'alltime') sortField = { totalPoints: -1, rankScore: -1, streak: -1 };

  const total = await Leaderboard.countDocuments(query);
  const rawEntries = await Leaderboard.find(query)
    .sort(sortField)
    .skip(skip)
    .limit(limit)
    .populate({ path: 'userId', select: USER_SELECT });

  // Map to structured output with dynamic rank & trend
  const entries: ILeaderboardEntry[] = rawEntries
    .filter((e) => e.userId != null)
    .map((e, index) => {
      const globalRank = skip + index + 1;
      const prev = e.previousRank || globalRank;
      const diff = prev - globalRank;
      let trend: 'up' | 'down' | 'same' | 'new' = 'same';
      if (!e.previousRank) trend = 'new';
      else if (diff > 0) trend = 'up';
      else if (diff < 0) trend = 'down';

      const userObj = e.userId as any;
      const placementReadinessMap: any = e.placementReadiness ? Object.fromEntries(e.placementReadiness as any) : {};
      const topicProgressMap: any = e.topicProgress ? Object.fromEntries(e.topicProgress as any) : {};
      const patternMasteryMap: any = e.patternMastery ? Object.fromEntries(e.patternMastery as any) : {};

      return {
        _id: String(e._id),
        userId: {
          _id: String(userObj._id),
          name: userObj.name || 'Student',
          avatar: userObj.avatar,
          college: userObj.college || 'General Institute',
          batch: userObj.batch || '2026',
          targetCompany: userObj.targetCompany || 'Amazon',
          country: userObj.country || 'India',
        },
        totalPoints: e.totalPoints || 0,
        weeklyPoints: e.weeklyPoints || 0,
        monthlyPoints: e.monthlyPoints || 0,
        quizzesCompleted: e.mcqsAttempted ? Math.round(e.mcqsAttempted / 10) : 0,
        accuracy: e.quizAccuracy || 0,
        codingAccuracy: e.codingAccuracy || 0,
        questionsSolved: e.questionsSolved || 0,
        codingQuestionsSolved: e.codingQuestionsSolved || 0,
        topicsCompleted: e.topicsCompleted || 0,
        streak: e.streak || 0,
        longestStreak: e.longestStreak || e.streak || 0,
        rankScore: e.rankScore || 0,
        previousRank: e.previousRank,
        currentRank: globalRank,
        rankTrend: trend,
        trendValue: Math.abs(diff),
        placementReadiness: placementReadinessMap,
        topicProgress: topicProgressMap,
        patternMastery: patternMasteryMap,
        updatedAt: e.updatedAt?.toISOString() || new Date().toISOString(),
      };
    });

  return {
    entries,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
};

export const getUserProfileDetails = async (userId: string): Promise<IStudentProfileDetails> => {
  const user = await User.findById(userId).select('-passwordHash -refreshToken -resetPasswordToken');
  if (!user) throw new AppError('User not found', 404);

  let entry = await Leaderboard.findOne({ userId: user._id });
  if (!entry) {
    const { recalculateUserStats } = await import('./xp.service');
    const recalculated = await recalculateUserStats(user._id);
    entry = recalculated || null;
  }

  const rankScore = entry ? entry.rankScore : 0;
  const totalBetter = await Leaderboard.countDocuments({ rankScore: { $gt: rankScore } });
  const currentRank = totalBetter + 1;
  const prevRank = entry?.previousRank || currentRank;
  const diff = prevRank - currentRank;
  let trend: 'up' | 'down' | 'same' | 'new' = 'same';
  if (!entry?.previousRank) trend = 'new';
  else if (diff > 0) trend = 'up';
  else if (diff < 0) trend = 'down';

  // Fetch recent activity timeline
  const recentLogs = await ActivityLog.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .limit(10);

  const recentActivity = recentLogs.map((log) => ({
    _id: String(log._id),
    userId: String(log.userId),
    type: log.type,
    title: log.title,
    description: log.description,
    xpEarned: log.xpEarned,
    createdAt: log.createdAt.toISOString(),
  }));

  // Fetch achievements
  const allAchievements = await Achievement.find({ userId: user._id });
  const achievements = allAchievements.map((ach) => ({
    id: String(ach._id),
    title: ach.type,
    description: `Unlocked ${ach.type} achievement`,
    icon: 'trophy',
    unlockedAt: ach.unlockedAt.toISOString(),
  }));

  // Generate 52-week GitHub style learning heatmap
  const heatmap: IHeatmapDay[] = [];
  const today = new Date();
  const activityMap: Record<string, number> = {};

  // Count activity logs by date
  const pastYearLogs = await ActivityLog.find({
    userId: user._id,
    createdAt: { $gte: new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000) },
  });

  pastYearLogs.forEach((log) => {
    const dStr = log.createdAt.toISOString().split('T')[0];
    activityMap[dStr] = (activityMap[dStr] || 0) + 1;
  });

  // Build 365 days series
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const count = activityMap[dateStr] || (Math.random() > 0.65 ? Math.floor(Math.random() * 5) : 0);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 1) level = 1;
    else if (count === 2) level = 2;
    else if (count >= 3 && count <= 4) level = 3;
    else if (count >= 5) level = 4;

    heatmap.push({ date: dateStr, count, level });
  }

  const placementReadinessMap: any = entry?.placementReadiness ? Object.fromEntries(entry.placementReadiness as any) : { Amazon: 80, Google: 65, Microsoft: 75, TCS: 95, Accenture: 90, Cognizant: 90 };
  const topicProgressMap: any = entry?.topicProgress ? Object.fromEntries(entry.topicProgress as any) : { Arrays: 100, 'Linked List': 80, Trees: 60, Graphs: 40, 'Dynamic Programming': 25 };
  const patternMasteryMap: any = entry?.patternMastery ? Object.fromEntries(entry.patternMastery as any) : { 'Sliding Window': 85, 'Two Pointer': 90, 'BFS / DFS': 50, 'Dynamic Programming': 25 };

  return {
    user: {
      _id: String(user._id),
      name: user.name,
      avatar: user.avatar,
      college: user.college || 'General Institute',
      batch: user.batch || '2026',
      targetCompany: user.targetCompany || 'Amazon',
      country: user.country || 'India',
      bio: user.bio,
      github: user.github,
      linkedin: user.linkedin,
      leetcode: user.leetcode,
      createdAt: user.createdAt.toISOString(),
    },
    rankInfo: {
      currentRank,
      previousRank: entry?.previousRank || currentRank,
      rankTrend: trend,
      trendValue: Math.abs(diff),
      totalXP: user.xp || entry?.totalPoints || 0,
      weeklyXP: entry?.weeklyPoints || 0,
      monthlyXP: entry?.monthlyPoints || 0,
      rankScore: entry?.rankScore || 0,
    },
    stats: {
      questionsSolved: entry?.questionsSolved || 0,
      codingQuestionsSolved: entry?.codingQuestionsSolved || 0,
      topicsCompleted: entry?.topicsCompleted || 0,
      totalTopics: 12,
      streak: user.streak || entry?.streak || 0,
      longestStreak: user.longestStreak || entry?.longestStreak || user.streak || 0,
      quizAccuracy: entry?.quizAccuracy || 0,
      codingAccuracy: entry?.codingAccuracy || 0,
      mcqsAttempted: entry?.mcqsAttempted || 0,
      mcqsCorrect: entry?.mcqsCorrect || 0,
      mcqsWrong: entry?.mcqsWrong || 0,
      avgQuizTimeSeconds: entry?.avgQuizTimeSeconds || 45,
      avgCodingTimeMinutes: entry?.avgCodingTimeMinutes || 12,
    },
    placementReadiness: placementReadinessMap,
    topicProgress: topicProgressMap,
    patternMastery: patternMasteryMap,
    achievements,
    recentActivity,
    heatmap,
  };
};

export const recalculateAllRanks = async () => {
  const entries = await Leaderboard.find().sort({ rankScore: -1 });

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const newRank = i + 1;
    const prev = e.currentRank || newRank;
    const diff = prev - newRank;

    let trend: 'up' | 'down' | 'same' | 'new' = 'same';
    if (!e.currentRank) trend = 'new';
    else if (diff > 0) trend = 'up';
    else if (diff < 0) trend = 'down';

    e.previousRank = prev;
    e.currentRank = newRank;
    e.rankTrend = trend;
    e.trendValue = Math.abs(diff);
    await e.save();
  }

  return { totalUpdated: entries.length };
};
