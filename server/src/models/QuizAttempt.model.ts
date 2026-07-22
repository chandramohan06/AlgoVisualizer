import mongoose, { Schema, Document, Types } from 'mongoose';

interface IQuizAnswerSubDoc {
  questionId: Types.ObjectId;
  givenAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface IQuizAttemptDocument extends Document {
  userId: Types.ObjectId;
  algorithmId: Types.ObjectId;
  score: number;
  totalPoints: number;
  timeTaken: number;
  answers: IQuizAnswerSubDoc[];
  completedAt: Date;
}

const QuizAttemptSchema = new Schema<IQuizAttemptDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    algorithmId: { type: Schema.Types.ObjectId, ref: 'Algorithm', required: true },
    score: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'QuizQuestion', required: true },
        givenAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        pointsEarned: { type: Number, required: true },
      },
    ],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

QuizAttemptSchema.index({ userId: 1, algorithmId: 1 });
QuizAttemptSchema.index({ userId: 1, completedAt: -1 });

export const QuizAttempt = mongoose.model<IQuizAttemptDocument>('QuizAttempt', QuizAttemptSchema);
