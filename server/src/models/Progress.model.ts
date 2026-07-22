import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProgressDocument extends Document {
  userId: Types.ObjectId;
  algorithmId: Types.ObjectId;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number;
}

const ProgressSchema = new Schema<IProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    algorithmId: { type: Schema.Types.ObjectId, ref: 'Algorithm', required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    timeSpent: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ProgressSchema.index({ userId: 1, algorithmId: 1 }, { unique: true });

export const Progress = mongoose.model<IProgressDocument>('Progress', ProgressSchema);
