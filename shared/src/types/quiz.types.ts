import { Difficulty } from '../enums/difficulty.enum';
import { QuestionType } from '../enums/questionType.enum';

export interface IQuizQuestion {
  _id: string;
  algorithmId: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  points: number;
}

export interface IQuizAttempt {
  _id: string;
  userId: string;
  algorithmId: string;
  score: number;
  totalPoints: number;
  timeTaken: number;
  answers: IQuizAnswer[];
  completedAt: string;
}

export interface IQuizAnswer {
  questionId: string;
  givenAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface ISubmitQuizDto {
  algorithmId: string;
  answers: { questionId: string; givenAnswer: string }[];
  timeTaken: number;
}
