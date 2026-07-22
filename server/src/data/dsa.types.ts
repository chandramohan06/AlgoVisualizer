export interface DSAMetadata {
  title: string;
  slug: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  theory: string;
  working: string;
  visualizationType: 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'heap' | 'graph' | 'recursion' | 'dp';
  applications: string[];
  interviewQuestions: string[];
  commonMistakes: string[];
  javaCode: string;
  cppCode: string;
  pythonCode: string;
  pseudoCode: string;
  leetCodeNumber?: number;
  leetCodeName?: string;
  leetCodeDifficulty?: 'Easy' | 'Medium' | 'Hard';
  leetCodePattern?: string;
  leetCodeUrl?: string;
  sampleInput?: any;
  sampleOutput?: string;
}

export interface DSAQuizQuestion {
  question: string;
  type: 'mcq';
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface DSAPracticeProblem {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pattern?: string;
  starterCode: {
    java: string;
    cpp: string;
    python: string;
  };
  testCases: Array<{ input: string; expectedOutput: string }>;
  hints?: string[];
  explanation?: string;
  solution?: string;
  externalLink?: string;
}

export interface DSAAlgorithmEntry {
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  topicGroup: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  theory: string;
  working: string;
  javaCode: string;
  cppCode: string;
  pythonCode: string;
  pseudoCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  applications: string[];
  interviewQuestions?: string[];
  interviewTips?: string[];
  commonMistakes: string[];
  leetCodeNumber?: number;
  leetCodeName?: string;
  leetCodeDifficulty?: 'Easy' | 'Medium' | 'Hard';
  leetCodePattern?: string;
  leetCodeUrl?: string;
  sampleInput?: any;
  sampleOutput?: string;
  quizzes: DSAQuizQuestion[];
  practiceProblems: DSAPracticeProblem[];
}
