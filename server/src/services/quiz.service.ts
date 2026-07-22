import { QuizQuestion } from '../models/QuizQuestion.model';
import { QuizAttempt } from '../models/QuizAttempt.model';
import { Algorithm } from '../models/Algorithm.model';
import { AppError } from '../utils/AppError';
import { ISubmitQuizDto } from '@algovisualizer/shared';
import { awardXP } from './xp.service';
import { QUIZ_SEED_DATA } from '../data/quizDatabase';

const TOPIC_MAP: Record<string, string> = {
  array: 'Array',
  arrays: 'Array',
  'arrays & matrix': 'Array',
  string: 'String',
  strings: 'String',
  'linked-list': 'Linked List',
  linkedlist: 'Linked List',
  'linked list': 'Linked List',
  stack: 'Stack',
  queue: 'Queue',
  tree: 'Tree',
  trees: 'Tree',
  'trees & bst': 'Tree',
  bst: 'BST',
  heap: 'Heap',
  'heap & priority queue': 'Heap',
  graph: 'Graph',
  graphs: 'Graph',
  'graph algorithms': 'Graph',
  recursion: 'Recursion',
  backtracking: 'Recursion',
  dp: 'Dynamic Programming',
  'dynamic programming': 'Dynamic Programming',
};

// Seed topic-tagged questions if the collection has none
export const ensureQuizSeedData = async () => {
  // Count only documents that have a non-null topic (our new schema)
  const topicCount = await QuizQuestion.countDocuments({ topic: { $exists: true, $ne: null } });
  if (topicCount === 0) {
    console.log('[QuizSeed] No topic-tagged questions found. Seeding database...');
    // Remove old topic-less documents so they don't pollute queries
    const deleted = await QuizQuestion.deleteMany({ topic: { $exists: false } });
    const deleted2 = await QuizQuestion.deleteMany({ topic: null });
    console.log(`[QuizSeed] Removed ${deleted.deletedCount + deleted2.deletedCount} legacy documents`);
    await QuizQuestion.insertMany(QUIZ_SEED_DATA);
    const newCount = await QuizQuestion.countDocuments({ topic: { $exists: true, $ne: null } });
    console.log(`[QuizSeed] Seeded ${newCount} topic-tagged questions`);
  } else {
    console.log(`[QuizSeed] Found ${topicCount} existing topic-tagged questions — skipping seed`);
  }
};

// Fisher-Yates Array Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface GenerateQuizParams {
  topic?: string;
  difficulty?: string;
  numberOfMCQs?: number;
  numberOfCodingQuestions?: number;
}

export const generateTopicQuiz = async (params: GenerateQuizParams) => {
  await ensureQuizSeedData();

  const rawTopic = (params.topic || 'Array').trim();
  // Try lowercase TOPIC_MAP first, then case-insensitive direct match
  const normalizedKey = rawTopic.toLowerCase();
  let targetTopic = TOPIC_MAP[normalizedKey];
  if (!targetTopic) {
    // Direct match attempt — check if the topic exists in DB as-is
    const directMatch = await QuizQuestion.findOne({
      topic: { $regex: new RegExp(`^${rawTopic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
    });
    targetTopic = directMatch?.topic || 'Array';
  }

  console.log(`[QuizGen] Requested: "${rawTopic}" → Normalized: "${targetTopic}"`);

  const limitMCQs = Math.min(50, Math.max(1, Number(params.numberOfMCQs) || 15));
  const limitCoding = Math.min(10, Math.max(0, Number(params.numberOfCodingQuestions) || 2));

  // Query MCQs strictly matching topic
  const mcqQuery: Record<string, any> = {
    topic: targetTopic,
    type: 'mcq',
  };

  if (params.difficulty && params.difficulty !== 'mixed' && params.difficulty !== 'all') {
    mcqQuery.difficulty = new RegExp(`^${params.difficulty}$`, 'i');
  }

  let mcqDocs = await QuizQuestion.find(mcqQuery);
  console.log(`[QuizGen] MCQ query { topic: "${targetTopic}", type: "mcq" } → ${mcqDocs.length} docs`);

  // Fallback to topic matching without difficulty filter if insufficient
  if (mcqDocs.length === 0) {
    mcqDocs = await QuizQuestion.find({ topic: targetTopic, type: 'mcq' });
    console.log(`[QuizGen] Fallback (no difficulty filter) → ${mcqDocs.length} docs`);
  }

  // Shuffle questions randomly
  const shuffledMCQs = shuffleArray(mcqDocs).slice(0, limitMCQs);

  // Shuffle options for each MCQ
  const processedMCQs = shuffledMCQs.map((q) => {
    const obj = q.toObject();
    if (obj.options && obj.options.length > 0) {
      const originalOptions = [...obj.options];
      const correctVal = originalOptions[Number(obj.correctAnswer)] || obj.correctAnswer;
      const shuffledOptions = shuffleArray(originalOptions);
      const newCorrectIdx = shuffledOptions.indexOf(correctVal);

      return {
        ...obj,
        options: shuffledOptions,
        correctAnswer: newCorrectIdx >= 0 ? String(newCorrectIdx) : obj.correctAnswer,
      };
    }
    return obj;
  });

  // Query Coding Problems strictly matching topic
  const codingQuery: Record<string, any> = {
    topic: targetTopic,
    type: 'coding',
  };

  let codingDocs = await QuizQuestion.find(codingQuery);
  console.log(`[QuizGen] Coding query { topic: "${targetTopic}", type: "coding" } → ${codingDocs.length} docs`);
  const shuffledCoding = shuffleArray(codingDocs).slice(0, limitCoding);

  console.log(`[QuizGen] Returning ${processedMCQs.length} MCQs + ${shuffledCoding.length} coding problems for "${targetTopic}"`);
  return {
    topic: targetTopic,
    mcqs: processedMCQs,
    codingQuestions: shuffledCoding,
    totalQuestions: processedMCQs.length + shuffledCoding.length,
  };
};

export const submitAttempt = async (userId: string, dto: ISubmitQuizDto) => {
  const questions = await QuizQuestion.find({
    _id: { $in: dto.answers.map((a) => a.questionId) },
  });

  const questionMap = new Map(questions.map((q) => [String(q._id), q]));

  let totalPoints = 0;
  let earnedPoints = 0;

  const answers = dto.answers.map((a) => {
    const question = questionMap.get(a.questionId);
    if (!question) throw new AppError(`Question ${a.questionId} not found`, 404);

    const isCorrect = question.correctAnswer.toLowerCase() === a.givenAnswer.toLowerCase();
    const pointsEarned = isCorrect ? question.points : 0;
    totalPoints += question.points;
    earnedPoints += pointsEarned;

    return {
      questionId: question._id,
      givenAnswer: a.givenAnswer,
      isCorrect,
      pointsEarned,
    };
  });

  const attempt = await QuizAttempt.create({
    userId,
    algorithmId: dto.algorithmId,
    score: earnedPoints,
    totalPoints,
    timeTaken: dto.timeTaken,
    answers,
    completedAt: new Date(),
  });

  // Real-time XP & Stats update
  const isPerfect = earnedPoints >= totalPoints && totalPoints > 0;
  await awardXP({
    userId,
    activityType: 'quiz_completed',
    title: isPerfect ? 'Perfect Quiz Performance' : 'Quiz Completed',
    description: `Scored ${earnedPoints}/${totalPoints} on ${dto.algorithmId || 'DSA'} Quiz`,
    metadata: { isPerfect, earnedPoints, totalPoints },
  });

  return attempt;
};

export const getHistory = async (userId: string, upcoming?: string) => {
  if (upcoming === 'true') {
    const targetAlgo = await Algorithm.findOne({ isPublished: true });
    const questionCount = await QuizQuestion.countDocuments({ type: 'mcq' });

    if (!targetAlgo) return null;

    return {
      algorithmId: String(targetAlgo._id),
      slug: targetAlgo.slug,
      title: targetAlgo.title,
      difficulty: targetAlgo.difficulty,
      questionCount,
    };
  }

  return QuizAttempt.find({ userId })
    .sort({ completedAt: -1 })
    .limit(50);
};

export const getAttemptById = async (userId: string, attemptId: string) => {
  const attempt = await QuizAttempt.findOne({ _id: attemptId, userId }).populate(
    'answers.questionId',
  );
  if (!attempt) throw new AppError('Quiz attempt not found', 404);
  return attempt;
};
