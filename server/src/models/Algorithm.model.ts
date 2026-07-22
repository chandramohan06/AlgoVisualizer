import mongoose, { Schema, Document, Types } from 'mongoose';
import { Difficulty } from '@algovisualizer/shared';

export interface IAlgorithmDocument extends Document {
  slug: string;
  title: string;
  category: Types.ObjectId;
  difficulty: Difficulty;
  theory: string;
  javaCode: string;
  cppCode: string;
  pseudoCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  applications: string[];
  relatedAlgorithms: Types.ObjectId[];
  animationConfig: {
    type: 'array' | 'tree' | 'graph' | 'matrix' | 'string';
    defaultInput?: number[];
    minSize?: number;
    maxSize?: number;
  };
  isPublished: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AlgorithmSchema = new Schema<IAlgorithmDocument>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    theory: { type: String, required: true },
    javaCode: { type: String, default: '' },
    cppCode: { type: String, default: '' },
    pseudoCode: { type: String, default: '' },
    timeComplexity: { type: String, required: true },
    spaceComplexity: { type: String, required: true },
    applications: [{ type: String }],
    relatedAlgorithms: [{ type: Schema.Types.ObjectId, ref: 'Algorithm' }],
    animationConfig: {
      type: { type: String, enum: ['array', 'tree', 'graph', 'matrix', 'string'], required: true },
      defaultInput: [{ type: Number }],
      minSize: { type: Number, default: 4 },
      maxSize: { type: Number, default: 20 },
    },
    isPublished: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

// slug index is auto-created by unique: true
AlgorithmSchema.index({ category: 1 });
AlgorithmSchema.index({ difficulty: 1 });
AlgorithmSchema.index({ isPublished: 1 });

export const Algorithm = mongoose.model<IAlgorithmDocument>('Algorithm', AlgorithmSchema);
