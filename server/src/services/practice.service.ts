import { PracticeProblem } from '../models/PracticeProblem.model';
import { PracticeUserProgress, IProblemProgressDetail } from '../models/PracticeUserProgress.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { User } from '../models/User.model';
import { Submission, SubmissionVerdict } from '../models/Submission.model';
import { AppError } from '../utils/AppError';
import { evaluateCode, ITestCase } from './judge.service';

// Helper to expand all possible problem identifiers (slug, _id, number, p-number)
// so frontend components can reliably match progress regardless of key format used.
const expandProblemIdentifiers = (ids: string[]): string[] => {
  if (!ids || ids.length === 0) return [];
  const expandedSet = new Set<string>();

  ids.forEach((id) => {
    if (!id) return;
    expandedSet.add(id);
    expandedSet.add(id.toLowerCase());

    // If id is numeric e.g. "4", add "p-4"
    if (/^\d+$/.test(id)) {
      expandedSet.add(`p-${id}`);
    }
    // If id is "p-4", add "4"
    if (/^p-\d+$/i.test(id)) {
      const num = id.replace(/^p-/i, '');
      expandedSet.add(num);
    }
  });

  return Array.from(expandedSet);
};

export const getUserProgressRecord = async (userId: string) => {
  let record = await PracticeUserProgress.findOne({ userId });
  if (!record) {
    record = await PracticeUserProgress.create({
      userId,
      solvedProblemIds: [],
      attemptedProblemIds: [],
      bookmarkedProblemIds: [],
      problemProgressMap: new Map(),
      revisionLevels: new Map(),
      personalNotes: new Map(),
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
    });
  }
  return record;
};

export const getUserProgress = async (userId: string) => {
  const userProg = await getUserProgressRecord(userId);

  const revisionObj: Record<string, string> = {};
  if (userProg.revisionLevels) {
    userProg.revisionLevels.forEach((val, key) => {
      revisionObj[key] = val;
    });
  }

  const notesObj: Record<string, string> = {};
  if (userProg.personalNotes) {
    userProg.personalNotes.forEach((val, key) => {
      notesObj[key] = val;
    });
  }

  const progressMapObj: Record<string, IProblemProgressDetail> = {};
  if (userProg.problemProgressMap) {
    userProg.problemProgressMap.forEach((val, key) => {
      progressMapObj[key] = val;
    });
  }

  // Expanded ID arrays for 100% reliable matching on frontend
  const expandedSolvedIds = expandProblemIdentifiers(userProg.solvedProblemIds || []);
  const expandedAttemptedIds = expandProblemIdentifiers(userProg.attemptedProblemIds || []);
  const expandedBookmarkedIds = expandProblemIdentifiers(userProg.bookmarkedProblemIds || []);

  // Calculate Overall Statistics
  const solvedCount = (userProg.solvedProblemIds || []).filter((id) => !id.startsWith('p-') && !/^\d+$/.test(id)).length || (userProg.solvedProblemIds?.length ? Math.ceil(userProg.solvedProblemIds.length / 2) : 0);
  const attemptedCount = (userProg.attemptedProblemIds || []).filter((id) => !id.startsWith('p-') && !/^\d+$/.test(id)).length || 0;
  const bookmarkedCount = (userProg.bookmarkedProblemIds || []).filter((id) => !id.startsWith('p-') && !/^\d+$/.test(id)).length || 0;

  // Acceptance Rate calculation across all user submissions
  const totalSubmissionsCount = await Submission.countDocuments({ userId });
  const acceptedSubmissionsCount = await Submission.countDocuments({ userId, verdict: 'Accepted' });
  const acceptanceRate = totalSubmissionsCount > 0
    ? `${((acceptedSubmissionsCount / totalSubmissionsCount) * 100).toFixed(1)}%`
    : '0.0%';

  return {
    solvedProblemIds: expandedSolvedIds,
    attemptedProblemIds: expandedAttemptedIds,
    bookmarkedProblemIds: expandedBookmarkedIds,
    problemProgressMap: progressMapObj,
    revisionLevels: revisionObj,
    personalNotes: notesObj,
    overallStats: {
      solvedCount: userProg.solvedProblemIds?.length || 0,
      attemptedCount: userProg.attemptedProblemIds?.length || 0,
      bookmarkedCount: userProg.bookmarkedProblemIds?.length || 0,
      acceptanceRate,
      currentStreak: userProg.currentStreak || 0,
      longestStreak: userProg.longestStreak || 0,
      totalXP: userProg.totalXP || 0,
    },
  };
};

export const getQuestions = async (userId: string, filters: Record<string, any> = {}) => {
  const { category, topic, difficulty, company, status, search, sortBy = 'default', limit = 250 } = filters;

  const query: any = {};

  // 1. Topic / Category Multi-select Filter
  const targetTopic = topic || category;
  if (targetTopic && targetTopic !== 'All' && targetTopic !== 'all') {
    const topicList = Array.isArray(targetTopic)
      ? targetTopic
      : String(targetTopic).split(',').map(t => t.trim()).filter(Boolean);

    if (topicList.length > 0) {
      query.$or = [
        { topic: { $in: topicList.map(t => new RegExp(`^${t}$`, 'i')) } },
        { category: { $in: topicList.map(t => new RegExp(`^${t}$`, 'i')) } },
        { pattern: { $in: topicList.map(t => new RegExp(`^${t}$`, 'i')) } },
      ];
    }
  }

  // 2. Difficulty Filter
  if (difficulty && difficulty !== 'All' && difficulty !== 'all') {
    const diffList = Array.isArray(difficulty)
      ? difficulty
      : String(difficulty).split(',').map(d => d.trim()).filter(Boolean);

    if (diffList.length > 0) {
      query.difficulty = { $in: diffList.map(d => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()) };
    }
  }

  // 3. Multi-select Company Filter
  if (company && company !== 'All' && company !== 'all') {
    const companyList = Array.isArray(company)
      ? company
      : String(company).split(',').map(c => c.trim()).filter(Boolean);

    if (companyList.length > 0) {
      query.companies = { $in: companyList.map(c => new RegExp(`^${c}$`, 'i')) };
    }
  }

  // 4. Global Search
  if (search && search.trim()) {
    const s = search.trim();
    const searchRegex = new RegExp(s, 'i');
    query.$or = [
      { title: searchRegex },
      { slug: searchRegex },
      { topic: searchRegex },
      { category: searchRegex },
      { pattern: searchRegex },
      { companies: searchRegex },
      { tags: searchRegex },
    ];
  }

  const [problems, userProg] = await Promise.all([
    PracticeProblem.find(query).limit(Number(limit)).lean(),
    getUserProgressRecord(userId),
  ]);

  const solvedSet = new Set(expandProblemIdentifiers(userProg.solvedProblemIds));
  const attemptedSet = new Set(expandProblemIdentifiers(userProg.attemptedProblemIds));
  const bookmarkSet = new Set(expandProblemIdentifiers(userProg.bookmarkedProblemIds));
  const revisionMap = userProg.revisionLevels || new Map();
  const progressMap = userProg.problemProgressMap || new Map();

  let results = problems.map((p, idx) => {
    const idStr = p._id.toString();
    const key = p.slug || idStr;
    const detail = progressMap.get(key) || progressMap.get(idStr);

    const isSolved = solvedSet.has(idStr) || solvedSet.has(p.slug) || (p.leetcodeNumber ? solvedSet.has(String(p.leetcodeNumber)) : false);
    const isAttempted = attemptedSet.has(idStr) || attemptedSet.has(p.slug);
    const isBookmarked = bookmarkSet.has(idStr) || bookmarkSet.has(p.slug);
    const revisionLevel = revisionMap.get(idStr) || revisionMap.get(p.slug) || 'unmarked';
    const isRevision = revisionLevel !== 'unmarked';

    let currentStatus: 'Not Attempted' | 'Attempted' | 'Solved' = 'Not Attempted';
    if (isSolved) currentStatus = 'Solved';
    else if (isAttempted) currentStatus = 'Attempted';

    const rawAccRate = (p as any).acceptanceRate;
    const formattedAccRate = typeof rawAccRate === 'number' ? `${rawAccRate.toFixed(1)}%` : (rawAccRate || '58.4%');

    return {
      _id: p._id,
      id: key,
      number: p.leetcodeNumber || (idx + 1),
      title: p.title,
      slug: p.slug,
      category: p.topic || p.category,
      topic: p.topic || p.category,
      pattern: p.pattern,
      difficulty: p.difficulty,
      companies: p.companies || [],
      tags: p.tags || [],
      estimatedTime: `${p.estimatedTimeMinutes || 15} mins`,
      acceptanceRate: formattedAccRate,
      frequency: (p as any).frequency || 50,
      totalSubmissions: (p as any).totalSubmissions || 100,
      isSolved,
      isBookmarked,
      isRevision,
      status: currentStatus,
      revisionLevel,
      bestRuntime: detail?.bestRuntime,
      bestMemory: detail?.bestMemory,
      firstAcceptedAt: detail?.firstAcceptedAt,
    };
  });

  // Filter by Status
  if (status === 'solved') {
    results = results.filter((q) => q.isSolved);
  } else if (status === 'attempted') {
    results = results.filter((q) => q.status === 'Attempted');
  } else if (status === 'unsolved' || status === 'not_started') {
    results = results.filter((q) => !q.isSolved);
  } else if (status === 'bookmarked') {
    results = results.filter((q) => q.isBookmarked);
  } else if (status === 'revision') {
    results = results.filter((q) => q.isRevision);
  }

  // Sort Results
  if (sortBy === 'acceptance') {
    results.sort((a, b) => parseFloat(b.acceptanceRate) - parseFloat(a.acceptanceRate));
  } else if (sortBy === 'frequency') {
    results.sort((a, b) => b.frequency - a.frequency);
  } else if (sortBy === 'newest') {
    results.reverse();
  }

  return results;
};

export const getQuestionById = async (userId: string, idOrSlug: string): Promise<any> => {
  const problem = await PracticeProblem.findOne({
    $or: [
      { slug: idOrSlug },
      { leetcodeNumber: isNaN(Number(idOrSlug)) ? -1 : Number(idOrSlug) },
      { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
    ],
  }).lean();

  const userProg = await getUserProgressRecord(userId);
  const solvedSet = new Set(expandProblemIdentifiers(userProg.solvedProblemIds));
  const attemptedSet = new Set(expandProblemIdentifiers(userProg.attemptedProblemIds));
  const bookmarkSet = new Set(expandProblemIdentifiers(userProg.bookmarkedProblemIds));

  const detail = userProg.problemProgressMap?.get(idOrSlug) || userProg.problemProgressMap?.get(problem?._id?.toString() || '');

  if (!problem) {
    const isSolved = solvedSet.has(idOrSlug);
    const isBookmarked = bookmarkSet.has(idOrSlug);
    const isAttempted = attemptedSet.has(idOrSlug);
    return {
      id: idOrSlug,
      title: 'Practice Problem',
      difficulty: 'Easy',
      category: 'Arrays',
      topic: 'Arrays',
      problemStatement: 'Problem description for ' + idOrSlug,
      examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
      constraints: ['1 <= N <= 10^4'],
      hints: ['Check complement in HashMap.'],
      tags: ['Array', 'Hash Table'],
      companies: ['Amazon', 'Google'],
      acceptanceRate: '58.4%',
      estimatedTime: '15 mins',
      starterCodeJava: 'class Solution {\n    public int[] solve() { return new int[]{}; }\n}',
      starterCodeCpp: 'class Solution {\npublic:\n    vector<int> solve() { return {}; }\n};',
      starterCodePython: 'class Solution:\n    def solve(self):\n        pass',
      testCases: [{ input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]' }],
      hiddenTestCases: [{ input: 'nums = [3,3], target = 6', expectedOutput: '[0, 1]' }],
      isSolved,
      isBookmarked,
      status: isSolved ? 'Solved' : isAttempted ? 'Attempted' : 'Not Attempted',
      firstAcceptedAt: detail?.firstAcceptedAt,
      bestRuntime: detail?.bestRuntime,
      bestMemory: detail?.bestMemory,
    };
  }

  const idStr = problem._id.toString();
  const isSolved = solvedSet.has(idStr) || solvedSet.has(problem.slug);
  const isAttempted = attemptedSet.has(idStr) || attemptedSet.has(problem.slug);
  const isBookmarked = bookmarkSet.has(idStr) || bookmarkSet.has(problem.slug);
  const personalNote = userProg.personalNotes?.get(idStr) || userProg.personalNotes?.get(problem.slug) || '';

  return {
    ...problem,
    id: problem.slug || idStr,
    isSolved,
    isBookmarked,
    status: isSolved ? 'Solved' : isAttempted ? 'Attempted' : 'Not Attempted',
    personalNote,
    firstAcceptedAt: detail?.firstAcceptedAt,
    bestRuntime: detail?.bestRuntime,
    bestMemory: detail?.bestMemory,
  };
};

export const toggleBookmark = async (userId: string, problemId: string) => {
  const userProg = await getUserProgressRecord(userId);
  const index = userProg.bookmarkedProblemIds.indexOf(problemId);
  let isBookmarked = false;

  if (index > -1) {
    userProg.bookmarkedProblemIds.splice(index, 1);
    isBookmarked = false;
  } else {
    userProg.bookmarkedProblemIds.push(problemId);
    isBookmarked = true;
  }

  if (!userProg.problemProgressMap) userProg.problemProgressMap = new Map();
  const detail = userProg.problemProgressMap.get(problemId) || {
    problemId,
    status: 'Not Attempted',
    attempted: false,
    solved: false,
    bookmarked: isBookmarked,
    notes: '',
    languageUsed: 'python',
    submissionCount: 0,
    revisionLevel: 'unmarked',
  };
  detail.bookmarked = isBookmarked;
  userProg.problemProgressMap.set(problemId, detail);

  await userProg.save();
  return { problemId, isBookmarked };
};

export const saveNote = async (userId: string, problemId: string, note: string) => {
  const userProg = await getUserProgressRecord(userId);
  if (!userProg.personalNotes) userProg.personalNotes = new Map();
  userProg.personalNotes.set(problemId, note);

  if (!userProg.problemProgressMap) userProg.problemProgressMap = new Map();
  const detail = userProg.problemProgressMap.get(problemId) || {
    problemId,
    status: 'Not Attempted',
    attempted: false,
    solved: false,
    bookmarked: false,
    notes: note,
    languageUsed: 'python',
    submissionCount: 0,
    revisionLevel: 'unmarked',
  };
  detail.notes = note;
  userProg.problemProgressMap.set(problemId, detail);

  await userProg.save();
  return { problemId, note };
};

export const updateQuestionStatus = async (userId: string, problemId: string, status: string) => {
  const userProg = await getUserProgressRecord(userId);
  if (!userProg.revisionLevels) userProg.revisionLevels = new Map();

  const isCurrentlySolved = userProg.solvedProblemIds.includes(problemId);
  const isNewStatusCompleted = ['solved', 'completed', 'mastered'].includes(status.toLowerCase());

  userProg.revisionLevels.set(problemId, status);

  if (isNewStatusCompleted && !isCurrentlySolved) {
    userProg.solvedProblemIds.push(problemId);
    userProg.totalXP = (userProg.totalXP || 0) + 15;
    await Leaderboard.findOneAndUpdate(
      { userId },
      { $inc: { questionsSolved: 1, xp: 15 } },
      { upsert: true }
    );
    await User.findByIdAndUpdate(userId, { $inc: { xp: 15 } });
  }

  await userProg.save();
  return { problemId, status, isSolved: userProg.solvedProblemIds.includes(problemId) };
};

export const runCode = async (
  userId: string,
  problemIdOrSlug: string,
  language: 'java' | 'cpp' | 'python' | 'javascript',
  code: string,
  customInput?: string
) => {
  const validLanguages = ['java', 'cpp'];
  if (!validLanguages.includes(language)) {
    throw new AppError(`Unsupported language: '${language}'. The Practice platform supports ONLY Java and C++.`, 400);
  }

  const problem = await PracticeProblem.findOne({
    $or: [
      { slug: problemIdOrSlug },
      { leetcodeNumber: isNaN(Number(problemIdOrSlug)) ? -1 : Number(problemIdOrSlug) },
      { _id: problemIdOrSlug.match(/^[0-9a-fA-F]{24}$/) ? problemIdOrSlug : null },
    ],
  }).lean();

  if (!problem) {
    throw new AppError(`Practice problem '${problemIdOrSlug}' not found in database.`, 404);
  }

  const starterCode = (problem.codeSnippets as any)?.[language] || '';
  let testCases: ITestCase[] = [];

  if (customInput && customInput.trim()) {
    testCases = [{ input: customInput.trim(), expectedOutput: '' }];
  } else if (problem.testCases && problem.testCases.length > 0) {
    testCases = problem.testCases;
  } else {
    throw new AppError(`No testcases configured for practice problem '${problemIdOrSlug}'.`, 400);
  }

  const result = await evaluateCode({
    userId,
    problemId: problemIdOrSlug,
    language,
    code,
    testCases,
    starterCode,
    metadata: problem.metadata,
    isSubmission: false,
  });

  return result;
};

export const submitCode = async (
  userId: string,
  problemIdOrSlug: string,
  language: 'java' | 'cpp' | 'python' | 'javascript',
  code: string
) => {
  const validLanguages = ['java', 'cpp'];
  if (!validLanguages.includes(language)) {
    throw new AppError(`Unsupported language: '${language}'. The Practice platform supports ONLY Java and C++.`, 400);
  }
  const problem = await PracticeProblem.findOne({
    $or: [
      { slug: problemIdOrSlug },
      { leetcodeNumber: isNaN(Number(problemIdOrSlug)) ? -1 : Number(problemIdOrSlug) },
      { _id: problemIdOrSlug.match(/^[0-9a-fA-F]{24}$/) ? problemIdOrSlug : null },
    ],
  }).lean();

  if (!problem) {
    throw new AppError(`Practice problem '${problemIdOrSlug}' not found in database.`, 404);
  }

  const problemId = problem._id ? problem._id.toString() : problemIdOrSlug;
  const problemSlug = problem.slug || problemIdOrSlug;
  const starterCode = (problem.codeSnippets as any)?.[language] || '';

  let testCases: ITestCase[] = [];
  if (problem.testCases && problem.testCases.length > 0) {
    testCases = [...problem.testCases];
  } else {
    throw new AppError(`No testcases configured for practice problem '${problemIdOrSlug}'.`, 400);
  }

  if ((problem as any).hiddenTestCases && (problem as any).hiddenTestCases.length > 0) {
    testCases = testCases.concat((problem as any).hiddenTestCases);
  }

  const evalResult = await evaluateCode({
    userId,
    problemId: problemIdOrSlug,
    language,
    code,
    testCases,
    starterCode,
    metadata: problem.metadata,
    isSubmission: true,
  });

  const verdict: SubmissionVerdict = evalResult.verdict as SubmissionVerdict;

  const submission = await Submission.create({
    userId,
    problemId,
    problemSlug,
    language,
    code,
    verdict,
    passedCount: evalResult.passedCount,
    totalCount: evalResult.totalCount,
    runtimeMs: evalResult.runtimeMs,
    memoryMb: evalResult.memoryMb,
    stdout: evalResult.stdout,
    stderr: evalResult.stderr,
  });

  const userProg = await getUserProgressRecord(userId);

  const addUniqueId = (arr: string[], val: string) => {
    if (val && !arr.includes(val)) arr.push(val);
  };

  addUniqueId(userProg.attemptedProblemIds, problemId);
  if (problemSlug) addUniqueId(userProg.attemptedProblemIds, problemSlug);

  if (!userProg.problemProgressMap) userProg.problemProgressMap = new Map();

  const existingDetail = userProg.problemProgressMap.get(problemId) || userProg.problemProgressMap.get(problemSlug) || {
    problemId: problemSlug || problemId,
    status: 'Not Attempted',
    attempted: true,
    solved: false,
    bookmarked: userProg.bookmarkedProblemIds.includes(problemId),
    notes: userProg.personalNotes?.get(problemId) || '',
    languageUsed: language,
    submissionCount: 0,
    revisionLevel: userProg.revisionLevels?.get(problemId) || 'unmarked',
  };

  existingDetail.submissionCount = (existingDetail.submissionCount || 0) + 1;
  existingDetail.lastAttemptAt = new Date();
  existingDetail.languageUsed = language;
  existingDetail.attempted = true;

  const isFirstTimeAccepted = verdict === 'Accepted' && !userProg.solvedProblemIds.includes(problemId) && !userProg.solvedProblemIds.includes(problemSlug);

  if (verdict === 'Accepted') {
    existingDetail.solved = true;
    existingDetail.status = 'Solved';

    if (!existingDetail.firstAcceptedAt) {
      existingDetail.firstAcceptedAt = new Date();
      existingDetail.acceptedSubmissionId = submission._id.toString();
    }

    existingDetail.bestRuntime = existingDetail.bestRuntime
      ? Math.min(existingDetail.bestRuntime, evalResult.runtimeMs)
      : evalResult.runtimeMs;
    existingDetail.bestMemory = existingDetail.bestMemory
      ? Math.min(existingDetail.bestMemory, evalResult.memoryMb)
      : evalResult.memoryMb;

    if (isFirstTimeAccepted) {
      addUniqueId(userProg.solvedProblemIds, problemId);
      if (problemSlug) addUniqueId(userProg.solvedProblemIds, problemSlug);

      userProg.totalXP = (userProg.totalXP || 0) + 15;

      const now = new Date();
      const lastDate = userProg.lastStreakDate ? new Date(userProg.lastStreakDate) : null;
      if (!lastDate) {
        userProg.currentStreak = 1;
      } else {
        const diffHours = (now.getTime() - lastDate.getTime()) / (1000 * 3600);
        if (diffHours >= 24 && diffHours <= 48) {
          userProg.currentStreak = (userProg.currentStreak || 0) + 1;
        } else if (diffHours > 48) {
          userProg.currentStreak = 1;
        }
      }
      userProg.lastStreakDate = now;
      userProg.longestStreak = Math.max(userProg.longestStreak || 0, userProg.currentStreak || 1);

      await Leaderboard.findOneAndUpdate(
        { userId },
        { $inc: { questionsSolved: 1, xp: 15 } },
        { upsert: true }
      );
      await User.findByIdAndUpdate(userId, { $inc: { xp: 15 } });
    }
  } else {
    if (!existingDetail.solved) {
      existingDetail.status = 'Attempted';
    }
  }

  userProg.problemProgressMap.set(problemId, existingDetail);
  if (problemSlug) {
    userProg.problemProgressMap.set(problemSlug, existingDetail);
  }

  await userProg.save();

  const freshProgress = await getUserProgress(userId);

  return {
    ...submission.toObject(),
    ...evalResult,
    userProgress: freshProgress,
  };
};

export const getSubmissions = async (userId: string, problemIdOrSlug: string) => {
  const submissions = await Submission.find({
    userId,
    $or: [{ problemSlug: problemIdOrSlug }, { problemId: problemIdOrSlug }],
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  return submissions;
};

export const getPlacementRoadmap = async (userId: string) => {
  const userProg = await getUserProgressRecord(userId);
  const solvedSet = new Set(expandProblemIdentifiers(userProg.solvedProblemIds));

  const roadmapSteps = [
    { id: 'arrays', name: 'Arrays', topicMatch: ['Arrays', 'Array'] },
    { id: 'strings', name: 'Strings', topicMatch: ['Strings', 'String'] },
    { id: 'hashmap', name: 'HashMap', topicMatch: ['HashMap', 'Hash Table', 'HashSet'] },
    { id: 'sorting', name: 'Sorting', topicMatch: ['Sorting'] },
    { id: 'searching', name: 'Searching', topicMatch: ['Searching', 'Binary Search'] },
    { id: 'linkedlist', name: 'Linked List', topicMatch: ['Linked List'] },
    { id: 'stack', name: 'Stack', topicMatch: ['Stack'] },
    { id: 'queue', name: 'Queue', topicMatch: ['Queue', 'Deque'] },
    { id: 'trees', name: 'Trees', topicMatch: ['Tree', 'BST', 'Binary Search Tree'] },
    { id: 'graphs', name: 'Graphs', topicMatch: ['Graph'] },
    { id: 'dp', name: 'Dynamic Programming', topicMatch: ['Dynamic Programming', 'DP'] },
  ];

  const allProblems = await PracticeProblem.find({}).lean();

  const result = roadmapSteps.map((step) => {
    const matchingProblems = allProblems.filter((p) => {
      const pTopic = (p.topic || p.category || '').toLowerCase();
      return step.topicMatch.some((tm) => pTopic.includes(tm.toLowerCase()));
    });

    const total = matchingProblems.length;
    const solved = matchingProblems.filter((p) => {
      const idStr = p._id.toString();
      return solvedSet.has(idStr) || solvedSet.has(p.slug);
    }).length;

    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

    return {
      id: step.id,
      name: step.name,
      total,
      solved,
      percentage,
      isCompleted: percentage === 100 && total > 0,
    };
  });

  const totalQuestions = allProblems.length;
  const totalSolved = Array.from(solvedSet).filter(id => !id.startsWith('p-') && !/^\d+$/.test(id)).length;
  const overallPercentage = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

  return {
    overallPercentage,
    totalQuestions,
    totalSolved,
    steps: result,
  };
};
