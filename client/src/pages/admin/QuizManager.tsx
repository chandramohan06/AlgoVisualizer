import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Plus, Search, Edit2, Trash2,
  X, CheckCircle2, Save
} from 'lucide-react';

interface QuizQuestion {
  _id: string;
  algorithmSlug: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const INITIAL_QUESTIONS: QuizQuestion[] = [
  {
    _id: '1',
    algorithmSlug: 'bubble-sort',
    question: 'What is the worst-case time complexity of Bubble Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
    correctAnswer: 'O(n²)',
    explanation: 'In the worst case, every element must be compared and swapped with every other element, leading to n*(n-1)/2 operations.',
    difficulty: 'easy',
    points: 20,
  },
  {
    _id: '2',
    algorithmSlug: 'quick-sort',
    question: 'Which partitioning scheme is commonly used in Quick Sort?',
    options: ['Lomuto Partitioning', 'Hoare Partitioning', 'Both Lomuto & Hoare', 'Merge Partitioning'],
    correctAnswer: 'Both Lomuto & Hoare',
    explanation: 'Both Lomuto and Hoare are standard, widely accepted partitioning algorithms used to organize pivots.',
    difficulty: 'medium',
    points: 30,
  },
];

export const QuizManager: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(INITIAL_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);

  // Form states
  const [question, setQuestion] = useState('');
  const [algorithmSlug, setAlgorithmSlug] = useState('bubble-sort');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [points, setPoints] = useState(20);

  const handleOpenModal = (q?: QuizQuestion) => {
    if (q) {
      setSelectedQuestion(q);
      setQuestion(q.question);
      setAlgorithmSlug(q.algorithmSlug);
      setOption1(q.options[0] || '');
      setOption2(q.options[1] || '');
      setOption3(q.options[2] || '');
      setOption4(q.options[3] || '');
      setCorrectAnswer(q.correctAnswer);
      setExplanation(q.explanation || '');
      setDifficulty(q.difficulty);
      setPoints(q.points);
    } else {
      setSelectedQuestion(null);
      setQuestion('');
      setAlgorithmSlug('bubble-sort');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setCorrectAnswer('');
      setExplanation('');
      setDifficulty('easy');
      setPoints(20);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const options = [option1, option2, option3, option4].filter((opt) => opt.trim() !== '');

    if (!options.includes(correctAnswer)) {
      alert('The correct answer must be one of the listed options.');
      return;
    }

    if (selectedQuestion) {
      // Edit
      setQuestions(
        questions.map((q) =>
          q._id === selectedQuestion._id
            ? { ...q, question, algorithmSlug, options, correctAnswer, explanation, difficulty, points }
            : q,
        ),
      );
    } else {
      // Create
      const newQuestion: QuizQuestion = {
        _id: String(Date.now()),
        algorithmSlug,
        question,
        options,
        correctAnswer,
        explanation,
        difficulty,
        points,
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((q) => q._id !== id));
    }
  };

  const filteredQuestions = questions.filter(
    (q) =>
      (selectedAlgo === 'all' || q.algorithmSlug === selectedAlgo) &&
      q.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-400" />
            Quiz Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure test questions, explanations, and XP scores.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center max-w-2xl bg-[#0b0b12] border border-white/5 rounded-xl p-3">
        <div className="flex items-center gap-2 flex-1 w-full bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Search className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="bg-transparent text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none w-full"
          />
        </div>
        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-300 focus:outline-none"
        >
          <option value="all" className="bg-[#0b0b12]">All Algorithms</option>
          <option value="bubble-sort" className="bg-[#0b0b12]">Bubble Sort</option>
          <option value="quick-sort" className="bg-[#0b0b12]">Quick Sort</option>
          <option value="binary-search" className="bg-[#0b0b12]">Binary Search</option>
        </select>
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-white/5 rounded-xl bg-[#0b0b12]">
            No questions found. Click 'Add Question' to create one.
          </div>
        ) : (
          filteredQuestions.map((q, i) => (
            <div
              key={q._id}
              className="p-5 rounded-xl bg-[#0b0b12] border border-white/5 space-y-4 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {q.algorithmSlug.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                      {q.points} XP
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded capitalize">
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-200">{i + 1}. {q.question}</h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenModal(q)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-gray-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                {q.options.map((opt) => {
                  const isCorrect = opt === q.correctAnswer;
                  return (
                    <div
                      key={opt}
                      className={`p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-semibold'
                          : 'bg-white/[0.01] border-white/5 text-gray-400'
                      }`}
                    >
                      {isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-xs text-gray-500 leading-relaxed">
                  <span className="font-semibold text-indigo-400">Explanation:</span> {q.explanation}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0b0b12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                <h3 className="font-bold text-gray-200">
                  {selectedQuestion ? 'Edit Quiz Question' : 'Create Quiz Question'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Question Text</label>
                  <textarea
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type the question query..."
                    rows={2}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Associated Algorithm</label>
                    <select
                      value={algorithmSlug}
                      onChange={(e) => setAlgorithmSlug(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    >
                      <option value="bubble-sort">Bubble Sort</option>
                      <option value="quick-sort">Quick Sort</option>
                      <option value="binary-search">Binary Search</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Difficulty</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none capitalize"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">XP Value</label>
                      <input
                        type="number"
                        required
                        min={10}
                        max={100}
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Options inputs */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-400 mb-0.5">MCQ Option Choices</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                      placeholder="Option A"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                      placeholder="Option B"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                      placeholder="Option C (Optional)"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                      placeholder="Option D (Optional)"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Correct Answer Option (exact match)</label>
                  <input
                    type="text"
                    required
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="Must exactly match one of the options above"
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Explanation</label>
                  <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Details about why this option is correct..."
                    rows={2}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-semibold text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Save Question
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default QuizManager;
