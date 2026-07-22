import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivityLogDocument extends Document {
  userId: Types.ObjectId;
  type: 'question_solved' | 'quiz_completed' | 'algorithm_visualized' | 'streak_reward' | 'rank_reached' | 'achievement_unlocked';
  title: string;
  description: string;
  xpEarned: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['question_solved', 'quiz_completed', 'algorithm_visualized', 'streak_reward', 'rank_reached', 'achievement_unlocked'],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    xpEarned: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

ActivityLogSchema.index({ userId: 1, createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLogDocument>('ActivityLog', ActivityLogSchema);
