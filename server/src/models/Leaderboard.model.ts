import mongoose, { Schema, Document, Types } from 'mongoose';
import { IPlacementReadinessMap, IPatternMasteryMap, ITopicProgressMap } from '@algovisualizer/shared';

export interface ILeaderboardDocument extends Document {
  userId: Types.ObjectId;
  totalPoints: number; // total XP
  weeklyPoints: number;
  monthlyPoints: number;
  streak: number;
  longestStreak: number;
  topicsCompleted: number;
  questionsSolved: number;
  codingQuestionsSolved: number;
  quizAccuracy: number;
  codingAccuracy: number;
  mcqsAttempted: number;
  mcqsCorrect: number;
  mcqsWrong: number;
  avgQuizTimeSeconds: number;
  avgCodingTimeMinutes: number;
  rankScore: number;
  previousRank?: number;
  currentRank: number;
  rankTrend: 'up' | 'down' | 'same' | 'new';
  trendValue: number;
  placementReadiness: IPlacementReadinessMap;
  topicProgress: ITopicProgressMap;
  patternMastery: IPatternMasteryMap;
  lastCalculatedAt: Date;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    totalPoints: { type: Number, default: 0, index: true },
    weeklyPoints: { type: Number, default: 0, index: true },
    monthlyPoints: { type: Number, default: 0, index: true },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    topicsCompleted: { type: Number, default: 0 },
    questionsSolved: { type: Number, default: 0 },
    codingQuestionsSolved: { type: Number, default: 0 },
    quizAccuracy: { type: Number, default: 0 },
    codingAccuracy: { type: Number, default: 0 },
    mcqsAttempted: { type: Number, default: 0 },
    mcqsCorrect: { type: Number, default: 0 },
    mcqsWrong: { type: Number, default: 0 },
    avgQuizTimeSeconds: { type: Number, default: 0 },
    avgCodingTimeMinutes: { type: Number, default: 0 },
    rankScore: { type: Number, default: 0, index: true },
    previousRank: { type: Number },
    currentRank: { type: Number, default: 0 },
    rankTrend: { type: String, enum: ['up', 'down', 'same', 'new'], default: 'new' },
    trendValue: { type: Number, default: 0 },
    placementReadiness: {
      type: Map,
      of: Number,
      default: { Amazon: 0, Google: 0, Microsoft: 0, TCS: 0, Accenture: 0, Cognizant: 0 },
    },
    topicProgress: {
      type: Map,
      of: Number,
      default: {},
    },
    patternMastery: {
      type: Map,
      of: Number,
      default: {},
    },
    lastCalculatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

LeaderboardSchema.index({ rankScore: -1 });
LeaderboardSchema.index({ totalPoints: -1 });
LeaderboardSchema.index({ weeklyPoints: -1 });
LeaderboardSchema.index({ monthlyPoints: -1 });

export const Leaderboard = mongoose.model<ILeaderboardDocument>('Leaderboard', LeaderboardSchema);
