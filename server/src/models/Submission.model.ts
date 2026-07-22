import mongoose, { Schema, Document, Types } from 'mongoose';

export type SubmissionVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Runtime Error'
  | 'Compile Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded';

export interface ISubmissionDocument extends Document {
  userId: Types.ObjectId;
  problemId: string;
  problemSlug: string;
  language: 'java' | 'cpp' | 'python' | 'javascript';
  code: string;
  verdict: SubmissionVerdict;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryMb: number;
  stderr?: string;
  stdout?: string;
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmissionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    problemId: { type: String, required: true, index: true },
    problemSlug: { type: String, required: true, index: true },
    language: { type: String, required: true, enum: ['java', 'cpp', 'python', 'javascript'] },
    code: { type: String, required: true },
    verdict: {
      type: String,
      required: true,
      enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compile Error', 'Time Limit Exceeded', 'Memory Limit Exceeded'],
    },
    passedCount: { type: Number, default: 0 },
    totalCount: { type: Number, default: 0 },
    runtimeMs: { type: Number, default: 0 },
    memoryMb: { type: Number, default: 0 },
    stderr: { type: String, default: '' },
    stdout: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Submission = mongoose.model<ISubmissionDocument>('Submission', SubmissionSchema);
