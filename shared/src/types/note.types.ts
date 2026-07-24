export interface IInterviewQuestion {
  question: string;
  answer: string;
  companyTags?: string[];
}

export interface IRelatedProblem {
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  link?: string;
}

export interface ITimeComplexity {
  best?: string;
  average?: string;
  worst?: string;
  description?: string;
}

export interface ISpaceComplexity {
  auxiliary?: string;
  worst?: string;
  description?: string;
}

export interface IJavaMethod {
  name: string;
  purpose?: string;
  syntax: string;
  parameters: string;
  returnType: string;
  timeComplexity: string;
  example: string;
  notes?: string;
}

export interface IOperation {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ITypeItem {
  name: string;
  description: string;
}

export interface ICompanyQuestions {
  company: string;
  questions: string[];
}

export interface INote {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  definition: string;
  introduction?: string;
  whyUsed?: string;
  characteristics?: string[];
  types?: ITypeItem[];
  operations?: IOperation[];
  javaMethods?: IJavaMethod[];
  internalWorking?: string;
  memoryRepresentation?: string;
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
  companyWiseQuestions?: ICompanyQuestions[];
  commonMistakes: string[];
  bestPractices?: string[];
  relatedProblems: IRelatedProblem[];
  quizIds?: string[];
  visualizationId?: string;
  videoUrl?: string;
  pdfUrl?: string;
  images?: string[];
  diagrams?: string[];
  tags: string[];
  estimatedReadTime: number;
  revisionNotes?: string;
  cheatSheet?: string;
  references?: string[];
  published: boolean;
  order: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;

  // Virtual / Populated properties for student state
  isBookmarked?: boolean;
  isCompleted?: boolean;
  userReadTime?: number;
  lastReadAt?: string;
}

export interface INoteProgress {
  _id: string;
  userId: string;
  noteId: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  readTimeMinutes: number;
  lastReadAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNoteDto {
  title: string;
  slug?: string;
  category: string;
  subcategory?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  definition: string;
  introduction?: string;
  whyUsed?: string;
  characteristics?: string[];
  types?: ITypeItem[];
  operations?: IOperation[];
  javaMethods?: IJavaMethod[];
  internalWorking?: string;
  memoryRepresentation?: string;
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
  companyWiseQuestions?: ICompanyQuestions[];
  commonMistakes: string[];
  bestPractices?: string[];
  relatedProblems: IRelatedProblem[];
  quizIds?: string[];
  visualizationId?: string;
  videoUrl?: string;
  pdfUrl?: string;
  images?: string[];
  diagrams?: string[];
  tags: string[];
  estimatedReadTime?: number;
  revisionNotes?: string;
  cheatSheet?: string;
  references?: string[];
  published?: boolean;
  order?: number;
}

export type IUpdateNoteDto = Partial<ICreateNoteDto>;

export interface INoteQueryFilter {
  category?: string;
  difficulty?: string;
  topic?: string;
  search?: string;
  tag?: string;
  bookmarked?: boolean | string;
  completed?: boolean | string;
  published?: boolean | string;
  sort?: string;
}
