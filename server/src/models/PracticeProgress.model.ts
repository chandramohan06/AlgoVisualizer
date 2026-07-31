import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPracticeProgressDocument extends Document {
  userId: Types.ObjectId;
  problemSlug: string;
  isSolved: boolean;
  isBookmarked: boolean;
  isRevision: boolean;
  solvedAt?: Date;
  lastAttemptedAt?: Date;
  submissionsCount: number;
  bestRuntimeMs?: number;
  bestMemoryMb?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PracticeProgressSchema = new Schema<IPracticeProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    problemSlug: { type: String, required: true, index: true },
    isSolved: { type: Boolean, default: false },
    isBookmarked: { type: Boolean, default: false },
    isRevision: { type: Boolean, default: false },
    solvedAt: { type: Date },
    lastAttemptedAt: { type: Date },
    submissionsCount: { type: Number, default: 0 },
    bestRuntimeMs: { type: Number },
    bestMemoryMb: { type: Number },
  },
  { timestamps: true }
);

PracticeProgressSchema.index({ userId: 1, problemSlug: 1 }, { unique: true });
PracticeProgressSchema.index({ userId: 1, isSolved: 1 });
PracticeProgressSchema.index({ userId: 1, isBookmarked: 1 });
PracticeProgressSchema.index({ userId: 1, isRevision: 1 });

export const PracticeProgress = mongoose.model<IPracticeProgressDocument>('PracticeProgress', PracticeProgressSchema);
