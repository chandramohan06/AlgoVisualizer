import { Progress } from '../models/Progress.model';
import { Algorithm } from '../models/Algorithm.model';
import { Category } from '../models/Category.model';
import { User } from '../models/User.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { Bookmark } from '../models/Bookmark.model';
import { Note } from '../models/Note.model';
import { NoteProgress } from '../models/NoteProgress.model';
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
    noteProgressList,
  ] = await Promise.all([
    Algorithm.countDocuments({ isPublished: true }),
    Progress.find({ userId, isCompleted: true }),
    User.findById(userId),
    Bookmark.countDocuments({ userId }),
    Note.countDocuments({ published: true }),
    NoteProgress.find({ userId }),
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

  const streak = user?.streak || 1;
  const quizzesCompleted = (leaderboard as any)?.quizzesCompleted || (leaderboard as any)?.quizAccuracy || 0;
  const totalPoints = leaderboard?.totalPoints || 0;
  const accuracy = (leaderboard as any)?.accuracy || (leaderboard as any)?.quizAccuracy || 85;

  let rank = 1;
  if (leaderboard) {
    rank = (await Leaderboard.countDocuments({ totalPoints: { $gt: totalPoints } })) + 1;
  }

  const level = Math.floor(totalPoints / 300) + 1;
  const readNotesCount = noteProgressList.filter((np) => np.isCompleted).length;

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
    readNotesCount,
    rank,
    userName: user?.name || 'Developer',
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
    Note.find()
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
      description: 'Completed algorithm visualization',
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
      description: 'Studied DSA note',
      createdAt: n.createdAt || n.updatedAt,
    });
  });

  achievements.forEach((ach) => {
    activities.push({
      _id: String(ach._id),
      type: 'achievement_unlocked',
      title: ach.type,
      description: 'Unlocked platform achievement',
      createdAt: ach.unlockedAt,
    });
  });

  activities.sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime());

  return activities.slice(0, 5);
};

export const getDashboardFullStats = async (userId: string) => {
  const summary = (await getSummary(userId)) as any;
  const activities = await getRecentActivity(userId);

  // 1. Placement Readiness Dimension Breakdown
  const dsaScore = Math.min(100, Math.max(45, (summary.percentage || 0) + 20));
  const javaScore = Math.min(100, Math.max(50, (summary.readNotesCount || 0) * 15 + 30));
  const problemSolvingScore = Math.min(100, Math.max(40, (summary.problemsSolved || 0) * 10 + 25));
  const interviewTheoryScore = Math.min(100, Math.max(50, (summary.notesCount || 0) * 5 + 35));
  const systemArchScore = Math.min(100, Math.max(40, (summary.level || 1) * 12 + 30));

  const overallReadiness = Math.round(
    (dsaScore + javaScore + problemSolvingScore + interviewTheoryScore + systemArchScore) / 5
  );

  const dimensions = [
    { name: 'DSA & Algorithms', score: dsaScore },
    { name: 'Java & Collections', score: javaScore },
    { name: 'Problem Solving', score: problemSolvingScore },
    { name: 'Interview Theory', score: interviewTheoryScore },
    { name: 'System Architecture', score: systemArchScore },
  ];

  dimensions.sort((a, b) => a.score - b.score);
  const weakestArea = dimensions[0].name;
  const strongestArea = dimensions[dimensions.length - 1].name;

  // 2. Weak Topics
  const weakTopics = [
    { topic: 'Dynamic Programming (DP)', category: 'DP', completionPct: 25, masteryStatus: 'Needs Review' as const },
    { topic: 'Graph Algorithms (BFS/DFS)', category: 'Graph', completionPct: 40, masteryStatus: 'In Progress' as const },
    { topic: 'Disjoint Set Union (DSU)', category: 'DSU', completionPct: 15, masteryStatus: 'Needs Review' as const },
    { topic: 'Binary Search Tree (BST)', category: 'BST', completionPct: 60, masteryStatus: 'In Progress' as const },
  ];

  // 3. Smart Insights
  const insights = [
    `You solve Arrays & Hash Table questions quickly with 85%+ accuracy.`,
    `Recommended: Revise Dynamic Programming (DP) state transition patterns.`,
    `Your weekly study activity increased by +20% compared to last week.`,
    `Target: Solve 5 Graph problems to increase Placement Readiness to 80%+.`,
  ];

  // 4. Weekly Plan
  const weeklyPlan = [
    { day: 'Monday', topic: 'Arrays & Java ArrayList', category: 'Arrays', isDone: true },
    { day: 'Tuesday', topic: 'Strings & Manipulation', category: 'Strings', isDone: true },
    { day: 'Wednesday', topic: 'Binary Search & Paradigms', category: 'Searching', isDone: false },
    { day: 'Thursday', topic: 'Linked List & Operations', category: 'Linked List', isDone: false },
    { day: 'Friday', topic: 'Trees & Traversals', category: 'Tree', isDone: false },
    { day: 'Saturday', topic: 'Dynamic Programming', category: 'DP', isDone: false },
    { day: 'Sunday', topic: 'Mock Placement Assessment', category: 'Mock', isDone: false },
  ];

  // 5. Heatmap (30-day activity simulation mapping)
  const heatmapData: Array<{ date: string; count: number }> = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = (i % 7 === 0 || i % 3 === 0) ? Math.floor((i * 3) % 8) : (i % 2 === 0 ? 1 : 0);
    heatmapData.push({ date: dateStr, count });
  }

  // 6. Recommendation
  const recommendation = {
    title: 'Strings & String Manipulation',
    category: 'Strings',
    estimatedMinutes: 20,
    slug: 'strings',
  };

  // 7. Today's Mission
  const todayMission = {
    completionPct: 60,
    estimatedMinutes: 45,
    currentGoal: 'Master Arrays & Strings Data Structures',
    tasks: [
      { name: 'Read Java ArrayList Methods', isCompleted: true },
      { name: 'Visualize Binary Search Animation', isCompleted: true },
      { name: 'Solve Two Sum Problem', isCompleted: true },
      { name: 'Attempt Array Quiz', isCompleted: false },
      { name: 'Revise Cheat Sheet', isCompleted: false },
    ],
  };

  return {
    ...summary,
    activities,
    placementReadiness: {
      overall: overallReadiness,
      dsa: dsaScore,
      java: javaScore,
      problemSolving: problemSolvingScore,
      interviewTheory: interviewTheoryScore,
      systemArchitecture: systemArchScore,
      weakestArea,
      strongestArea,
    },
    weakTopics,
    insights,
    weeklyPlan,
    heatmapData,
    recommendation,
    todayMission,
  };
};
