import React, { useState, useEffect } from 'react';
import practiceService, { IPracticeQuestionItem } from '../../services/practiceService';
import {
  Plus,
  Search,
  Trash2,
  Edit,
  Upload,
  X,
  FileCode,
} from 'lucide-react';

export const AdminPracticeManager: React.FC = () => {
  const [questions, setQuestions] = useState<IPracticeQuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [bulkJson, setBulkJson] = useState<string>('');

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const data = await practiceService.getQuestions({ search: searchQuery, limit: 300 });
      setQuestions(data || []);
    } catch {
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [searchQuery]);

  const handleBulkUpload = () => {
    try {
      const parsed = JSON.parse(bulkJson);
      if (Array.isArray(parsed)) {
        alert(`Successfully validated ${parsed.length} practice questions for bulk import!`);
        setShowBulkModal(false);
        setBulkJson('');
        fetchQuestions();
      } else {
        alert('JSON must be an array of question objects.');
      }
    } catch (e: any) {
      alert('Invalid JSON format: ' + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-100 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11131a] border border-white/10 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileCode className="w-6 h-6 text-indigo-400" />
              Practice Problem CMS & Admin Panel
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage Data Structures & Algorithms practice questions, company tags, Java & C++ starter codes, and test cases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBulkModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-400" /> Bulk JSON Upload
            </button>

            <button
              onClick={() => setShowBulkModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Problem
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#11131a] border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by title, topic, company..."
              className="w-full pl-10 pr-4 py-2 bg-[#090a0f] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">Total: {questions.length} Questions</span>
        </div>

        {/* Questions Data Table */}
        <div className="bg-[#11131a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="bg-[#090a0f] border-b border-white/10 font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Problem Title</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Companies</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-mono">
                    Loading practice problems...
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-mono">
                    No problems found.
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q._id || q.slug} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{q.title}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{q.topic || q.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-mono font-bold ${
                        String(q.difficulty) === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                        String(q.difficulty) === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-indigo-300">{(q.companies || []).join(', ')}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#11131a] border border-white/15 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Bulk Upload Questions (JSON)</h3>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              placeholder="Paste JSON array of practice questions here..."
              className="w-full h-64 bg-[#090a0f] border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowBulkModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                Cancel
              </button>
              <button onClick={handleBulkUpload} className="px-4 py-2 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30">
                Validate & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPracticeManager;
