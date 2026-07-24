import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INoteProgressDocument extends Document {
  userId: Types.ObjectId;
  noteId: Types.ObjectId;
  isBookmarked: boolean;
  isCompleted: boolean;
  readTimeMinutes: number;
  lastReadAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoteProgressSchema = new Schema<INoteProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true, index: true },
    isBookmarked: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    readTimeMinutes: { type: Number, default: 0 },
    lastReadAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

NoteProgressSchema.index({ userId: 1, noteId: 1 }, { unique: true });
NoteProgressSchema.index({ userId: 1, isBookmarked: 1 });
NoteProgressSchema.index({ userId: 1, isCompleted: 1 });

export const NoteProgress = mongoose.model<INoteProgressDocument>('NoteProgress', NoteProgressSchema);
