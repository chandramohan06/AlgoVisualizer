import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, BookOpen, Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContinueLearning } from '@hooks/useContinueLearning';

export const ContinueLearningCard: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useContinueLearning();

  // Mock / cached recent sessions for Note and Quiz if session state is present or fallback defaults
  const recentAlgo = session || {
    title: 'Bubble Sort Visualization',
    category: 'Sorting',
    slug: 'bubble-sort',
    timestamp: new Date().toISOString(),
    frameIndex: 3,
  };

  const recentNote = {
    title: 'Arrays & Dynamic Arrays in Java',
    slug: 'arrays-and-arraylist-in-java',
    category: 'Array',
    estimatedReadTime: '15 mins',
  };

  const recentQuiz = {
    title: 'Arrays & Two Pointers MCQ Quiz',
    topic: 'Array',
    totalQuestions: 10,
    difficulty: 'Medium',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 font-sans"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
            Continue Learning Sessions
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400 font-semibold">Instant Resume</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Last Algorithm Card */}
        <div className="glass-card p-5 rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 to-black/40 space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                <Play className="w-3 h-3 text-cyan-400 fill-current" /> Algorithm
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Step #{recentAlgo.frameIndex ? recentAlgo.frameIndex + 1 : 1}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white line-clamp-1">{recentAlgo.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Category: {recentAlgo.category}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/visualizer/${recentAlgo.category.toLowerCase()}/${recentAlgo.slug}`)}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resume Algorithm
          </button>
        </div>

        {/* 2. Last Note Card */}
        <div className="glass-card p-5 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-black/40 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-400" /> Study Note
              </span>
              <span className="text-[10px] font-mono text-slate-500">{recentNote.estimatedReadTime}</span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white line-clamp-1">{recentNote.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Module: {recentNote.category}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/notes?slug=${recentNote.slug}`)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" /> Read Note
          </button>
        </div>

        {/* 3. Last Quiz Card */}
        <div className="glass-card p-5 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/20 to-black/40 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                <Brain className="w-3 h-3 text-purple-400" /> Quiz Module
              </span>
              <span className="text-[10px] font-mono text-amber-400 font-bold">{recentQuiz.difficulty}</span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white line-clamp-1">{recentQuiz.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{recentQuiz.totalQuestions} MCQ Questions</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/quiz')}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" /> Take Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContinueLearningCard;
