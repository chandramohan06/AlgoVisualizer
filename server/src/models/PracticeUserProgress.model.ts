import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProblemProgressDetail {
  problemId: string;
  status: 'Not Attempted' | 'Attempted' | 'Solved';
  attempted: boolean;
  solved: boolean;
  bookmarked: boolean;
  notes: string;
  languageUsed: string;
  firstAcceptedAt?: Date;
  lastAttemptAt?: Date;
  bestRuntime?: number;
  bestMemory?: number;
  submissionCount: number;
  acceptedSubmissionId?: string;
  revisionLevel: string;
}

export interface IPracticeUserProgressDocument extends Document {
  userId: Types.ObjectId;
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  bookmarkedProblemIds: string[];
  problemProgressMap: Map<string, IProblemProgressDetail>;
  revisionLevels: Map<string, string>; // problemId -> 'unmarked' | 'revision-1' | 'revision-2' | 'revision-3' | 'mastered'
  personalNotes: Map<string, string>; // problemId -> markdown note text
  attemptsCount: Map<string, number>; // problemId -> number of attempts
  timeSpentMinutes: Map<string, number>; // problemId -> minutes spent
  currentStreak: number;
  longestStreak: number;
  lastStreakDate?: Date;
  totalXP: number;
  updatedAt: Date;
}

const ProblemProgressDetailSchema = new Schema<IProblemProgressDetail>(
  {
    problemId: { type: String, required: true },
    status: {
      type: String,
      enum: ['Not Attempted', 'Attempted', 'Solved'],
      default: 'Not Attempted',
    },
    attempted: { type: Boolean, default: false },
    solved: { type: Boolean, default: false },
    bookmarked: { type: Boolean, default: false },
    notes: { type: String, default: '' },
    languageUsed: { type: String, default: 'python' },
    firstAcceptedAt: { type: Date },
    lastAttemptAt: { type: Date, default: Date.now },
    bestRuntime: { type: Number },
    bestMemory: { type: Number },
    submissionCount: { type: Number, default: 0 },
    acceptedSubmissionId: { type: String },
    revisionLevel: { type: String, default: 'unmarked' },
  },
  { _id: false },
);

const PracticeUserProgressSchema = new Schema<IPracticeUserProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    solvedProblemIds: { type: [String], default: [] },
    attemptedProblemIds: { type: [String], default: [] },
    bookmarkedProblemIds: { type: [String], default: [] },
    problemProgressMap: { type: Map, of: ProblemProgressDetailSchema, default: {} },
    revisionLevels: { type: Map, of: String, default: {} },
    personalNotes: { type: Map, of: String, default: {} },
    attemptsCount: { type: Map, of: Number, default: {} },
    timeSpentMinutes: { type: Map, of: Number, default: {} },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastStreakDate: { type: Date },
    totalXP: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const PracticeUserProgress = mongoose.model<IPracticeUserProgressDocument>(
  'PracticeUserProgress',
  PracticeUserProgressSchema,
);
