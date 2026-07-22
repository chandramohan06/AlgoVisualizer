import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06060a] text-slate-200 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 shadow-2xl">
        <Compass className="w-10 h-10 animate-pulse" />
      </div>

      <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
        Error 404
      </span>

      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
        Page Not Found
      </h1>

      <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed font-mono">
        The visualization module, question link, or route you are looking for doesn't exist or may have been moved.
      </p>

      <div className="flex items-center gap-3 font-mono text-xs">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-colors"
        >
          <Home className="w-4 h-4" /> Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
