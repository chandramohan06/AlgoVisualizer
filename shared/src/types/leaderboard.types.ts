export interface IPlacementReadinessMap {
  Amazon: number;
  Google: number;
  Microsoft: number;
  TCS: number;
  Accenture: number;
  Cognizant: number;
}

export interface IPatternMasteryMap {
  'Sliding Window': number;
  'Two Pointer': number;
  'Fast & Slow Pointers': number;
  'Monotonic Stack': number;
  'Binary Search': number;
  'BFS / DFS': number;
  'Dynamic Programming': number;
  'Trie': number;
  [key: string]: number;
}

export interface ITopicProgressMap {
  Arrays: number;
  'Linked List': number;
  Trees: number;
  Graphs: number;
  'Dynamic Programming': number;
  Stack: number;
  Queue: number;
  Heap: number;
  Recursion: number;
  Backtracking: number;
  Greedy: number;
  [key: string]: number;
}

export interface IHeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface IActivityLogItem {
  _id: string;
  userId: string;
  type: 'question_solved' | 'quiz_completed' | 'algorithm_visualized' | 'streak_reward' | 'rank_reached' | 'achievement_unlocked';
  title: string;
  description: string;
  xpEarned: number;
  createdAt: string;
}

export interface ILeaderboardUserRef {
  _id: string;
  name: string;
  avatar?: string;
  college?: string;
  batch?: string;
  targetCompany?: string;
  country?: string;
}

export interface ILeaderboardEntry {
  _id: string;
  userId: ILeaderboardUserRef;
  totalPoints: number; // totalXP
  weeklyPoints: number;
  monthlyPoints: number;
  quizzesCompleted: number;
  accuracy: number; // quiz accuracy %
  codingAccuracy: number; // coding accuracy %
  questionsSolved: number;
  codingQuestionsSolved: number;
  topicsCompleted: number;
  streak: number;
  longestStreak: number;
  rankScore: number;
  previousRank?: number;
  currentRank: number;
  rankTrend: 'up' | 'down' | 'same' | 'new';
  trendValue: number; // e.g. +3 or -2
  placementReadiness: IPlacementReadinessMap;
  topicProgress: ITopicProgressMap;
  patternMastery: IPatternMasteryMap;
  updatedAt: string;
}

export interface ILeaderboardResponse {
  entries: ILeaderboardEntry[];
  myRank?: ILeaderboardEntry;
  total: number;
  page: number;
  totalPages: number;
}

export interface IStudentProfileDetails {
  user: ILeaderboardUserRef & {
    bio?: string;
    github?: string;
    linkedin?: string;
    leetcode?: string;
    createdAt: string;
  };
  rankInfo: {
    currentRank: number;
    previousRank?: number;
    rankTrend: 'up' | 'down' | 'same' | 'new';
    trendValue: number;
    totalXP: number;
    weeklyXP: number;
    monthlyXP: number;
    rankScore: number;
  };
  stats: {
    questionsSolved: number;
    codingQuestionsSolved: number;
    topicsCompleted: number;
    totalTopics: number;
    streak: number;
    longestStreak: number;
    quizAccuracy: number;
    codingAccuracy: number;
    mcqsAttempted: number;
    mcqsCorrect: number;
    mcqsWrong: number;
    avgQuizTimeSeconds: number;
    avgCodingTimeMinutes: number;
  };
  placementReadiness: IPlacementReadinessMap;
  topicProgress: ITopicProgressMap;
  patternMastery: IPatternMasteryMap;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }[];
  recentActivity: IActivityLogItem[];
  heatmap: IHeatmapDay[];
}

export interface IXPConfig {
  _id?: string;
  algorithmCompleteXP: number;
  visualizationCompleteXP: number;
  solveEasyXP: number;
  solveMediumXP: number;
  solveHardXP: number;
  quizCompleteXP: number;
  quizPerfectXP: number;
  streak7DayXP: number;
  weights: {
    questionsWeight: number; // e.g. 0.40
    quizAccuracyWeight: number; // e.g. 0.20
    codingAccuracyWeight: number; // e.g. 0.15
    topicsWeight: number; // e.g. 0.10
    patternMasteryWeight: number; // e.g. 0.10
    consistencyWeight: number; // e.g. 0.05
  };
  updatedAt?: string;
}
