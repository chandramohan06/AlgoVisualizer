import mongoose, { Schema, Document, Types } from 'mongoose';

export interface StarterCodeMap {
  java?: string;
  cpp?: string;
  python?: string;
  javascript?: string;
}

export interface IQuizQuestionDocument extends Document {
  algorithmId?: Types.ObjectId;
  topic: string;
  subTopic?: string;
  title?: string;
  question: string;
  type: 'mcq' | 'coding';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  tags?: string[];
  starterCode?: StarterCodeMap;
  sampleInput?: string;
  sampleOutput?: string;
}

const QuizQuestionSchema = new Schema<IQuizQuestionDocument>(
  {
    algorithmId: { type: Schema.Types.ObjectId, ref: 'Algorithm', required: false },
    topic: { type: String, required: true, index: true },
    subTopic: { type: String },
    title: { type: String },
    question: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'coding'], required: true, index: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    points: { type: Number, default: 10 },
    tags: [{ type: String }],
    starterCode: {
      java: String,
      cpp: String,
      python: String,
      javascript: String,
    },
    sampleInput: { type: String },
    sampleOutput: { type: String },
  },
  { timestamps: true },
);

QuizQuestionSchema.index({ topic: 1, type: 1, difficulty: 1 });

export const QuizQuestion = mongoose.model<IQuizQuestionDocument>('QuizQuestion', QuizQuestionSchema);
