import { Types } from 'mongoose';
import { User } from '../models/User.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { ActivityLog } from '../models/ActivityLog.model';
import { XPConfig, IXPConfigDocument } from '../models/XPConfig.model';
import { QuizAttempt } from '../models/QuizAttempt.model';
import { Progress } from '../models/Progress.model';

export const getOrInitXPConfig = async (): Promise<IXPConfigDocument> => {
  let config = await XPConfig.findOne();
  if (!config) {
    config = await XPConfig.create({
      algorithmCompleteXP: 20,
      visualizationCompleteXP: 10,
      solveEasyXP: 25,
      solveMediumXP: 50,
      solveHardXP: 100,
      quizCompleteXP: 80,
      quizPerfectXP: 150,
      streak7DayXP: 100,
      weights: {
        questionsWeight: 0.40,
        quizAccuracyWeight: 0.20,
        codingAccuracyWeight: 0.15,
        topicsWeight: 0.10,
        patternMasteryWeight: 0.10,
        consistencyWeight: 0.05,
      },
    });
  }
  return config;
};

export const updateXPConfig = async (newConfig: Partial<IXPConfigDocument>) => {
  let config = await getOrInitXPConfig();
  if (newConfig.algorithmCompleteXP !== undefined) config.algorithmCompleteXP = newConfig.algorithmCompleteXP;
  if (newConfig.visualizationCompleteXP !== undefined) config.visualizationCompleteXP = newConfig.visualizationCompleteXP;
  if (newConfig.solveEasyXP !== undefined) config.solveEasyXP = newConfig.solveEasyXP;
  if (newConfig.solveMediumXP !== undefined) config.solveMediumXP = newConfig.solveMediumXP;
  if (newConfig.solveHardXP !== undefined) config.solveHardXP = newConfig.solveHardXP;
  if (newConfig.quizCompleteXP !== undefined) config.quizCompleteXP = newConfig.quizCompleteXP;
  if (newConfig.quizPerfectXP !== undefined) config.quizPerfectXP = newConfig.quizPerfectXP;
  if (newConfig.streak7DayXP !== undefined) config.streak7DayXP = newConfig.streak7DayXP;
  if (newConfig.weights) {
    config.weights = { ...config.weights, ...newConfig.weights };
  }
  await config.save();
  return config;
};

export interface AwardXPPayload {
  userId: string | Types.ObjectId;
  activityType: 'question_solved' | 'quiz_completed' | 'algorithm_visualized' | 'streak_reward' | 'rank_reached' | 'achievement_unlocked';
  title: string;
  description?: string;
  customXP?: number;
  metadata?: Record<string, any>;
}

export const awardXP = async ({
  userId,
  activityType,
  title,
  description = '',
  customXP,
  metadata = {},
}: AwardXPPayload) => {
  const config = await getOrInitXPConfig();
  const user = await User.findById(userId);
  if (!user) return;

  let earned = customXP || 0;
  if (!customXP) {
    switch (activityType) {
      case 'algorithm_visualized':
        earned = config.visualizationCompleteXP;
        break;
      case 'quiz_completed':
        earned = metadata.isPerfect ? config.quizPerfectXP : config.quizCompleteXP;
        break;
      case 'question_solved':
        if (metadata.difficulty === 'hard') earned = config.solveHardXP;
        else if (metadata.difficulty === 'medium') earned = config.solveMediumXP;
        else earned = config.solveEasyXP;
        break;
      case 'streak_reward':
        earned = config.streak7DayXP;
        break;
      case 'achievement_unlocked':
        earned = 50;
        break;
      default:
        earned = 20;
    }
  }

  // Update user XP
  user.xp = (user.xp || 0) + earned;
  await user.save();

  // Log activity
  await ActivityLog.create({
    userId: user._id,
    type: activityType,
    title,
    description,
    xpEarned: earned,
    metadata,
  });

  // Trigger recalculation of stats & leaderboard score
  await recalculateUserStats(user._id);

  return { xp: user.xp, earned };
};

export const recalculateUserStats = async (userId: string | Types.ObjectId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const config = await getOrInitXPConfig();

  // Fetch quiz attempts
  const quizAttempts = await QuizAttempt.find({ userId: user._id });
  let mcqsAttempted = 0;
  let mcqsCorrect = 0;
  let mcqsWrong = 0;
  let totalQuizTime = 0;

  quizAttempts.forEach((q: any) => {
    mcqsAttempted += q.totalQuestions || q.totalPoints || 0;
    mcqsCorrect += q.score || 0;
    mcqsWrong += Math.max(0, (q.totalQuestions || q.totalPoints || 0) - (q.score || 0));
    totalQuizTime += q.timeTakenSeconds || q.timeTaken || 0;
  });

  const quizAccuracy = mcqsAttempted > 0 ? Math.round((mcqsCorrect / mcqsAttempted) * 100) : 0;
  const avgQuizTimeSeconds = quizAttempts.length > 0 ? Math.round(totalQuizTime / quizAttempts.length) : 0;

  // Fetch practice progress
  const userProgress = await Progress.find({ userId: user._id });
  const completedItems = userProgress.filter((p) => p.isCompleted);
  const questionsSolved = completedItems.length;
  const codingQuestionsSolved = Math.max(0, Math.round(questionsSolved * 0.7)); // 70% coding estimate
  const codingAccuracy = Math.min(100, Math.round(quizAccuracy * 0.95 + 5));

  // Topics progress calculation
  const totalTopicsCount = 12;
  const topicsCompletedSet = new Set(completedItems.map((p) => p.algorithmId?.toString() || 'algo'));
  const topicsCompleted = Math.min(totalTopicsCount, Math.ceil(topicsCompletedSet.size / 2));

  // Derived topic progress map
  const topicProgress: Record<string, number> = {
    Arrays: Math.min(100, Math.round((questionsSolved / 15) * 100)),
    'Linked List': Math.min(100, Math.round((questionsSolved / 12) * 80)),
    Trees: Math.min(100, Math.round((questionsSolved / 10) * 70)),
    Graphs: Math.min(100, Math.round((questionsSolved / 10) * 50)),
    'Dynamic Programming': Math.min(100, Math.round((questionsSolved / 15) * 40)),
    Stack: Math.min(100, Math.round((questionsSolved / 8) * 85)),
    Queue: Math.min(100, Math.round((questionsSolved / 8) * 85)),
    Heap: Math.min(100, Math.round((questionsSolved / 8) * 60)),
    Recursion: Math.min(100, Math.round((questionsSolved / 8) * 75)),
    Backtracking: Math.min(100, Math.round((questionsSolved / 8) * 50)),
    Greedy: Math.min(100, Math.round((questionsSolved / 8) * 65)),
  };

  // Derived pattern mastery map
  const patternMastery: Record<string, number> = {
    'Sliding Window': Math.min(100, Math.round(topicProgress.Arrays * 0.9)),
    'Two Pointer': Math.min(100, Math.round(topicProgress.Arrays * 0.95)),
    'Fast & Slow Pointers': Math.min(100, Math.round(topicProgress['Linked List'] * 0.9)),
    'Monotonic Stack': Math.min(100, Math.round(topicProgress.Stack * 0.85)),
    'Binary Search': Math.min(100, Math.round(topicProgress.Arrays * 0.88)),
    'BFS / DFS': Math.min(100, Math.round((topicProgress.Trees + topicProgress.Graphs) / 2)),
    'Dynamic Programming': topicProgress['Dynamic Programming'],
    Trie: Math.min(100, Math.round(topicProgress.Trees * 0.5)),
  };

  const avgPatternMastery = Math.round(
    Object.values(patternMastery).reduce((a, b) => a + b, 0) / Object.keys(patternMastery).length,
  );

  // Derived placement readiness map
  const placementReadiness: Record<string, number> = {
    Amazon: Math.min(100, Math.round(topicProgress['Dynamic Programming'] * 0.4 + topicProgress.Graphs * 0.3 + quizAccuracy * 0.3)),
    Google: Math.min(100, Math.round(topicProgress['Dynamic Programming'] * 0.5 + topicProgress.Trees * 0.3 + codingAccuracy * 0.2)),
    Microsoft: Math.min(100, Math.round(topicProgress.Trees * 0.4 + topicProgress['Linked List'] * 0.3 + quizAccuracy * 0.3)),
    TCS: Math.min(100, Math.round(topicProgress.Arrays * 0.5 + quizAccuracy * 0.5)),
    Accenture: Math.min(100, Math.round(topicProgress.Arrays * 0.5 + quizAccuracy * 0.5)),
    Cognizant: Math.min(100, Math.round(topicProgress.Arrays * 0.4 + quizAccuracy * 0.6)),
  };

  // Weighted ranking formula calculation
  const { questionsWeight, quizAccuracyWeight, codingAccuracyWeight, topicsWeight, patternMasteryWeight, consistencyWeight } = config.weights;

  const scoreQ = (questionsSolved * 12);
  const scoreQuiz = (quizAccuracy * 4);
  const scoreCoding = (codingAccuracy * 4);
  const scoreTopics = (topicsCompleted * 25);
  const scorePattern = (avgPatternMastery * 3);
  const scoreStreak = ((user.streak || 0) * 15);

  const rankScore = Math.round(
    questionsWeight * scoreQ +
    quizAccuracyWeight * scoreQuiz +
    codingAccuracyWeight * scoreCoding +
    topicsWeight * scoreTopics +
    patternMasteryWeight * scorePattern +
    consistencyWeight * scoreStreak +
    (user.xp || 0) * 0.1,
  );

  // Update or create Leaderboard entry
  let entry = await Leaderboard.findOne({ userId: user._id });
  const prevRank = entry?.currentRank;

  if (!entry) {
    entry = new Leaderboard({ userId: user._id });
  }

  entry.totalPoints = user.xp || 0;
  entry.weeklyPoints = Math.round((user.xp || 0) * 0.35);
  entry.monthlyPoints = Math.round((user.xp || 0) * 0.75);
  entry.streak = user.streak || 0;
  entry.longestStreak = user.longestStreak || user.streak || 0;
  entry.topicsCompleted = topicsCompleted;
  entry.questionsSolved = questionsSolved;
  entry.codingQuestionsSolved = codingQuestionsSolved;
  entry.quizAccuracy = quizAccuracy;
  entry.codingAccuracy = codingAccuracy;
  entry.mcqsAttempted = mcqsAttempted;
  entry.mcqsCorrect = mcqsCorrect;
  entry.mcqsWrong = mcqsWrong;
  entry.avgQuizTimeSeconds = avgQuizTimeSeconds;
  entry.avgCodingTimeMinutes = 12;
  entry.rankScore = rankScore;
  entry.previousRank = prevRank;
  entry.placementReadiness = placementReadiness as any;
  entry.topicProgress = topicProgress as any;
  entry.patternMastery = patternMastery as any;
  entry.lastCalculatedAt = new Date();

  await entry.save();
  return entry;
};
