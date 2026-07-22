import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Plus, Search, Edit2, Trash2,
  X, Eye, EyeOff, Save, Code, Tag
} from 'lucide-react';

interface AlgorithmItem {
  _id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  isPublished: boolean;
  javaCode: string;
  cppCode: string;
  steps: string[];
}

const INITIAL_ALGORITHMS: AlgorithmItem[] = [
  {
    _id: '1',
    slug: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'easy',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    isPublished: true,
    javaCode: 'void bubbleSort(int[] arr) { ... }',
    cppCode: 'void bubbleSort(vector<int>& arr) { ... }',
    steps: ['Initialize outer loop', 'Compare elements', 'Swap if out of order'],
  },
  {
    _id: '2',
    slug: 'quick-sort',
    title: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'hard',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    isPublished: true,
    javaCode: 'void quickSort(int[] arr) { ... }',
    cppCode: 'void quickSort(vector<int>& arr) { ... }',
    steps: ['Select pivot element', 'Partition around pivot', 'Recurse on halves'],
  },
  {
    _id: '3',
    slug: 'binary-search',
    title: 'Binary Search',
    category: 'Searching',
    difficulty: 'easy',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    isPublished: false,
    javaCode: 'int binarySearch(int[] arr, int target) { ... }',
    cppCode: 'int binarySearch(vector<int>& arr, int target) { ... }',
    steps: ['Find middle index', 'Compare middle with target', 'Narrow search range'],
  },
];

export const AlgorithmManager: React.FC = () => {
  const [algorithms, setAlgorithms] = useState<AlgorithmItem[]>(INITIAL_ALGORITHMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sorting');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timeComplexity, setTimeComplexity] = useState('O(n)');
  const [spaceComplexity, setSpaceComplexity] = useState('O(1)');
  const [javaCode, setJavaCode] = useState('');
  const [cppCode, setCppCode] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenModal = (algo?: AlgorithmItem) => {
    if (algo) {
      setSelectedAlgo(algo);
      setTitle(algo.title);
      setCategory(algo.category);
      setDifficulty(algo.difficulty);
      setTimeComplexity(algo.timeComplexity);
      setSpaceComplexity(algo.spaceComplexity);
      setJavaCode(algo.javaCode);
      setCppCode(algo.cppCode);
      setStepsInput(algo.steps.join('\n'));
      setIsPublished(algo.isPublished);
    } else {
      setSelectedAlgo(null);
      setTitle('');
      setCategory('Sorting');
      setDifficulty('easy');
      setTimeComplexity('O(n)');
      setSpaceComplexity('O(1)');
      setJavaCode('');
      setCppCode('');
      setStepsInput('');
      setIsPublished(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const stepsArray = stepsInput.split('\n').filter((s) => s.trim() !== '');

    if (selectedAlgo) {
      // Edit
      setAlgorithms(
        algorithms.map((a) =>
          a._id === selectedAlgo._id
            ? { ...a, title, category, difficulty, timeComplexity, spaceComplexity, javaCode, cppCode, steps: stepsArray, isPublished }
            : a,
        ),
      );
    } else {
      // Create
      const newAlgo: AlgorithmItem = {
        _id: String(Date.now()),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        category,
        difficulty,
        timeComplexity,
        spaceComplexity,
        javaCode,
        cppCode,
        steps: stepsArray,
        isPublished,
      };
      setAlgorithms([...algorithms, newAlgo]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this algorithm? All associated progress and quizzes will be deleted.')) {
      setAlgorithms(algorithms.filter((a) => a._id !== id));
    }
  };

  const togglePublishStatus = (id: string) => {
    setAlgorithms(
      algorithms.map((a) => (a._id === id ? { ...a, isPublished: !a.isPublished } : a)),
    );
  };

  const filteredAlgos = algorithms.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            Algorithm Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and publish dynamic visualizer modules.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Algorithm
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 max-w-md bg-[#0b0b12] border border-white/5 rounded-xl px-3.5 py-2">
        <Search className="w-4 h-4 text-gray-500 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search algorithms or categories..."
          className="bg-transparent text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none w-full"
        />
      </div>

      {/* Algorithms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgos.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            No algorithms found. Click 'Add Algorithm' to create one.
          </div>
        ) : (
          filteredAlgos.map((algo) => (
            <div
              key={algo._id}
              className="p-5 rounded-xl bg-[#0b0b12] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {algo.category}
                  </span>
                  <button
                    onClick={() => togglePublishStatus(algo._id)}
                    className={`p-1 rounded-lg border transition-all ${
                      algo.isPublished
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-gray-500 bg-white/5 border-white/5'
                    }`}
                    title={algo.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {algo.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="text-base font-bold text-gray-200 mb-1">{algo.title}</h3>
                <p className="text-xs font-mono text-gray-500">/{algo.slug}</p>

                {/* Technical specs */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-semibold text-gray-400">
                  <div className="p-2 rounded bg-white/[0.01] border border-white/5 text-center">
                    <p className="text-gray-500">Time</p>
                    <p className="text-white mt-0.5">{algo.timeComplexity}</p>
                  </div>
                  <div className="p-2 rounded bg-white/[0.01] border border-white/5 text-center">
                    <p className="text-gray-500">Space</p>
                    <p className="text-white mt-0.5">{algo.spaceComplexity}</p>
                  </div>
                  <div className="p-2 rounded bg-white/[0.01] border border-white/5 text-center">
                    <p className="text-gray-500">Difficulty</p>
                    <p className="text-white mt-0.5 capitalize">{algo.difficulty}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-[10px] text-gray-500">
                  {algo.steps.length} Steps Configured
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(algo)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(algo._id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-gray-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
              className="w-full max-w-2xl bg-[#0b0b12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                <h3 className="font-bold text-gray-200">
                  {selectedAlgo ? 'Edit Algorithm Module' : 'Create Algorithm Module'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Module Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Bubble Sort"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    >
                      <option value="Sorting" className="bg-[#0b0b12]">Sorting</option>
                      <option value="Searching" className="bg-[#0b0b12]">Searching</option>
                      <option value="Trees" className="bg-[#0b0b12]">Trees</option>
                      <option value="Graphs" className="bg-[#0b0b12]">Graphs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Time Complexity</label>
                    <input
                      type="text"
                      required
                      value={timeComplexity}
                      onChange={(e) => setTimeComplexity(e.target.value)}
                      placeholder="e.g. O(n log n)"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Space Complexity</label>
                    <input
                      type="text"
                      required
                      value={spaceComplexity}
                      onChange={(e) => setSpaceComplexity(e.target.value)}
                      placeholder="e.g. O(1)"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none capitalize"
                    >
                      <option value="easy" className="bg-[#0b0b12]">Easy</option>
                      <option value="medium" className="bg-[#0b0b12]">Medium</option>
                      <option value="hard" className="bg-[#0b0b12]">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Code snippets */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" /> Java Implementation
                    </label>
                    <textarea
                      value={javaCode}
                      onChange={(e) => setJavaCode(e.target.value)}
                      placeholder="public void sort(int[] arr) { ..."
                      rows={4}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" /> C++ Implementation
                    </label>
                    <textarea
                      value={cppCode}
                      onChange={(e) => setCppCode(e.target.value)}
                      placeholder="void sort(vector<int>& arr) { ..."
                      rows={4}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Step List animation data */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-400" /> Animation Steps (One per line)
                  </label>
                  <textarea
                    value={stepsInput}
                    onChange={(e) => setStepsInput(e.target.value)}
                    placeholder="Step 1: Pivot chosen&#10;Step 2: Subarray split&#10;Step 3: Element swap"
                    rows={3}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded border-white/10 bg-white/5 text-indigo-600 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isPublished" className="text-xs font-semibold text-gray-400 cursor-pointer">
                    Publish immediately (visible to students)
                  </label>
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
                    Save Module
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
export default AlgorithmManager;
