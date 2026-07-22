import mongoose, { Schema, Document } from 'mongoose';

export interface IXPConfigDocument extends Document {
  algorithmCompleteXP: number;
  visualizationCompleteXP: number;
  solveEasyXP: number;
  solveMediumXP: number;
  solveHardXP: number;
  quizCompleteXP: number;
  quizPerfectXP: number;
  streak7DayXP: number;
  weights: {
    questionsWeight: number;
    quizAccuracyWeight: number;
    codingAccuracyWeight: number;
    topicsWeight: number;
    patternMasteryWeight: number;
    consistencyWeight: number;
  };
  updatedAt: Date;
}

const XPConfigSchema = new Schema<IXPConfigDocument>(
  {
    algorithmCompleteXP: { type: Number, default: 20 },
    visualizationCompleteXP: { type: Number, default: 10 },
    solveEasyXP: { type: Number, default: 25 },
    solveMediumXP: { type: Number, default: 50 },
    solveHardXP: { type: Number, default: 100 },
    quizCompleteXP: { type: Number, default: 80 },
    quizPerfectXP: { type: Number, default: 150 },
    streak7DayXP: { type: Number, default: 100 },
    weights: {
      questionsWeight: { type: Number, default: 0.40 },
      quizAccuracyWeight: { type: Number, default: 0.20 },
      codingAccuracyWeight: { type: Number, default: 0.15 },
      topicsWeight: { type: Number, default: 0.10 },
      patternMasteryWeight: { type: Number, default: 0.10 },
      consistencyWeight: { type: Number, default: 0.05 },
    },
  },
  { timestamps: true },
);

export const XPConfig = mongoose.model<IXPConfigDocument>('XPConfig', XPConfigSchema);
