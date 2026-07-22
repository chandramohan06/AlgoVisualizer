import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBookmarkDocument extends Document {
  userId: Types.ObjectId;
  algorithmId: Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    algorithmId: { type: Schema.Types.ObjectId, ref: 'Algorithm', required: true },
  },
  { timestamps: true },
);

BookmarkSchema.index({ userId: 1, algorithmId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmarkDocument>('Bookmark', BookmarkSchema);
