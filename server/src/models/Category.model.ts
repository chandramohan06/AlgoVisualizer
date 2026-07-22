import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  icon: string;
  order: number;
}

const CategorySchema = new Schema<ICategoryDocument>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// slug index is auto-created by unique: true

export const Category = mongoose.model<ICategoryDocument>('Category', CategorySchema);
