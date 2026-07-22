import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INoteDocument extends Document {
  userId: Types.ObjectId;
  algorithmId?: Types.ObjectId;
  title: string;
  content: string;
  isBookmarked: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INoteDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    algorithmId: { type: Schema.Types.ObjectId, ref: 'Algorithm' },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true },
    isBookmarked: { type: Boolean, default: false },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

NoteSchema.index({ userId: 1, createdAt: -1 });
NoteSchema.index({ userId: 1, isBookmarked: 1 });

export const Note = mongoose.model<INoteDocument>('Note', NoteSchema);
