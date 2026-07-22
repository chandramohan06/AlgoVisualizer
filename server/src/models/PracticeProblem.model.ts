import mongoose, { Schema, Document } from 'mongoose';
import { Difficulty } from '@algovisualizer/shared';

export interface IApproach {
  name: 'Brute Force' | 'Better' | 'Optimal' | string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface IPracticeProblemDocument extends Document {
  title: string;
  slug: string;
  leetcodeNumber?: number;
  category: string;
  pattern: string;
  difficulty: Difficulty;
  companies: string[];
  tags: string[];
  leetcodeUrl?: string;
  estimatedTimeMinutes: number;
  learningOrder?: number;
  prerequisites?: string[];
  overview: string;
  hints: string[];
  examples?: IExample[];
  constraints?: string[];
  testCases?: ITestCase[];
  approaches: IApproach[];
  codeSnippets: {
    java: string;
    cpp: string;
    python: string;
    pseudo: string;
    javascript?: string;
  };
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  commonMistakes: string[];
  relatedSlugs: string[];
  visualizerSlug?: string;
  visualizerCategory?: string;
  moduleNumber?: number;
  moduleTitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PracticeProblemSchema = new Schema<IPracticeProblemDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    leetcodeNumber: { type: Number },
    category: { type: String, required: true, index: true },
    pattern: { type: String, required: true, index: true },
    difficulty: { type: String, enum: Object.values(Difficulty), required: true, index: true },
    companies: { type: [String], default: [], index: true },
    tags: { type: [String], default: [] },
    leetcodeUrl: { type: String, default: '' },
    estimatedTimeMinutes: { type: Number, default: 15 },
    learningOrder: { type: Number, default: 1 },
    prerequisites: { type: [String], default: [] },
    overview: { type: String, required: true },
    hints: { type: [String], default: [] },
    approaches: [
      {
        name: { type: String, required: true },
        explanation: { type: String, required: true },
        timeComplexity: { type: String, required: true },
        spaceComplexity: { type: String, required: true },
      },
    ],
    codeSnippets: {
      java: { type: String, default: '' },
      cpp: { type: String, default: '' },
      python: { type: String, default: '' },
      pseudo: { type: String, default: '' },
    },
    complexity: {
      time: { type: String, default: 'O(N)' },
      space: { type: String, default: 'O(1)' },
      explanation: { type: String, default: '' },
    },
    commonMistakes: { type: [String], default: [] },
    relatedSlugs: { type: [String], default: [] },
    visualizerSlug: { type: String, default: '' },
    visualizerCategory: { type: String, default: '' },
    moduleNumber: { type: Number, index: true },
    moduleTitle: { type: String, index: true },
  },
  { timestamps: true },
);

PracticeProblemSchema.index({ category: 1, pattern: 1 });
PracticeProblemSchema.index({ difficulty: 1 });
PracticeProblemSchema.index({ companies: 1 });
PracticeProblemSchema.index({ moduleNumber: 1 });

export const PracticeProblem = mongoose.model<IPracticeProblemDocument>('PracticeProblem', PracticeProblemSchema);
