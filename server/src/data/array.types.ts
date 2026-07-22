export interface ArrayQuizItem {
  question: string;
  type: 'mcq';
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface ArrayPracticeItem {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starterCode: {
    java: string;
    cpp: string;
  };
  testCases: Array<{ input: string; expectedOutput: string }>;
  solution: string;
  externalLink: string;
}

export interface ArrayAlgorithmData {
  slug: string;
  title: string;
  topicGroup: 'Basic' | 'Searching' | 'Sorting' | 'Two Pointer' | 'Sliding Window' | 'Prefix Sum' | 'Kadane' | 'Matrix' | 'Miscellaneous';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  theory: string;
  javaCode: string;
  cppCode: string;
  pseudoCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  applications: string[];
  interviewTips: string[];
  sampleInput: any;
  sampleOutput: string;
  quizzes: ArrayQuizItem[];
  practiceProblems: ArrayPracticeItem[];
}
