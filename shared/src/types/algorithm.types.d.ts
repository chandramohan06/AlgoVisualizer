import { Difficulty } from '../enums/difficulty.enum';
export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    order: number;
}
export interface IAlgorithm {
    _id: string;
    slug: string;
    title: string;
    category: ICategory;
    difficulty: Difficulty;
    theory: string;
    javaCode: string;
    cppCode: string;
    pseudoCode: string;
    timeComplexity: string;
    spaceComplexity: string;
    applications: string[];
    relatedAlgorithms: IAlgorithmSummary[];
    animationConfig: IAnimationConfig;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IAlgorithmSummary {
    _id: string;
    slug: string;
    title: string;
    difficulty: Difficulty;
    category: string;
}
export interface IAnimationConfig {
    type: 'array' | 'tree' | 'graph' | 'matrix' | 'string';
    defaultInput?: number[];
    minSize?: number;
    maxSize?: number;
}
export interface IProgress {
    _id: string;
    userId: string;
    algorithmId: string;
    isCompleted: boolean;
    completedAt?: string;
    timeSpent: number;
}
export interface IBookmark {
    _id: string;
    userId: string;
    algorithmId: IAlgorithmSummary;
    createdAt: string;
}
