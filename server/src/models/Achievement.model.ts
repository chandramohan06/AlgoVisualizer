import mongoose, { Schema, Document, Types } from 'mongoose';
import { AchievementType } from '@algovisualizer/shared';

export interface IAchievementDocument extends Document {
  userId: Types.ObjectId;
  type: AchievementType;
  unlockedAt: Date;
}

const AchievementSchema = new Schema<IAchievementDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: Object.values(AchievementType), required: true },
  unlockedAt: { type: Date, default: Date.now },
});

AchievementSchema.index({ userId: 1, type: 1 }, { unique: true });

export const Achievement = mongoose.model<IAchievementDocument>('Achievement', AchievementSchema);
