import mongoose, { Schema, Document, Types } from 'mongoose';
import { IInterviewQuestion, IRelatedProblem, ITimeComplexity, ISpaceComplexity } from '@algovisualizer/shared';

export interface INoteDocument extends Document {
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  definition: string;
  introduction?: string;
  whyUsed?: string;
  working: string;
  algorithm: string;
  flow: string;
  dryRun: string;
  timeComplexity: ITimeComplexity;
  spaceComplexity: ISpaceComplexity;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  javaCode: string;
  cppCode: string;
  pythonCode: string;
  jsCode?: string;
  example: string;
  output: string;
  interviewQuestions: IInterviewQuestion[];
  commonMistakes: string[];
  relatedProblems: IRelatedProblem[];
  quizIds?: Types.ObjectId[];
  visualizationId?: string;
  videoUrl?: string;
  pdfUrl?: string;
  images?: string[];
  tags: string[];
  estimatedReadTime: number;
  revisionNotes?: string;
  cheatSheet?: string;
  references?: string[];
  published: boolean;
  order: number;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INoteDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 250 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    subcategory: { type: String, trim: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy', index: true },
    description: { type: String, required: true, trim: true },
    definition: { type: String, required: true, trim: true },
    introduction: { type: String, default: '' },
    whyUsed: { type: String, default: '' },
    working: { type: String, required: true, default: '' },
    algorithm: { type: String, required: true, default: '' },
    flow: { type: String, required: true, default: '' },
    dryRun: { type: String, required: true, default: '' },
    timeComplexity: {
      best: { type: String, default: 'O(1)' },
      average: { type: String, default: 'O(N)' },
      worst: { type: String, default: 'O(N)' },
      description: { type: String, default: '' },
    },
    spaceComplexity: {
      auxiliary: { type: String, default: 'O(1)' },
      worst: { type: String, default: 'O(1)' },
      description: { type: String, default: '' },
    },
    advantages: [{ type: String, trim: true }],
    disadvantages: [{ type: String, trim: true }],
    applications: [{ type: String, trim: true }],
    javaCode: { type: String, default: '' },
    cppCode: { type: String, default: '' },
    pythonCode: { type: String, default: '' },
    jsCode: { type: String, default: '' },
    example: { type: String, default: '' },
    output: { type: String, default: '' },
    interviewQuestions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        companyTags: [{ type: String, trim: true }],
      },
    ],
    commonMistakes: [{ type: String, trim: true }],
    relatedProblems: [
      {
        title: { type: String, required: true },
        difficulty: { type: String, default: 'Medium' },
        link: { type: String, default: '' },
      },
    ],
    quizIds: [{ type: Schema.Types.ObjectId, ref: 'QuizQuestion' }],
    visualizationId: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    images: [{ type: String }],
    tags: [{ type: String, trim: true, index: true }],
    estimatedReadTime: { type: Number, default: 5 },
    revisionNotes: { type: String, default: '' },
    cheatSheet: { type: String, default: '' },
    references: [{ type: String }],
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

// Search Indexes
NoteSchema.index({
  title: 'text',
  definition: 'text',
  category: 'text',
  tags: 'text',
  description: 'text',
});

NoteSchema.index({ category: 1, difficulty: 1, published: 1, order: 1 });

export const Note = mongoose.model<INoteDocument>('Note', NoteSchema);
