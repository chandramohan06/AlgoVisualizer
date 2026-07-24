import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { noteService } from '@services/noteService';
import { INote, ICreateNoteDto } from '@algovisualizer/shared';
import SyntaxHighlighter from '@components/notes/SyntaxHighlighter';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  CheckCircle,
  XCircle,
  Save,
  X,
  FileText,
  Sparkles,
  Search,
} from 'lucide-react';

const CATEGORIES = [
  'Arrays',
  'Strings',
  'Sorting',
  'Searching',
  'Linked List',
  'Stack',
  'Queue',
  'Deque',
  'Tree',
  'BST',
  'Heap',
  'Trie',
  'Graph',
  'Recursion',
  'Backtracking',
  'Dynamic Programming',
  'Greedy',
  'Sliding Window',
  'Two Pointer',
  'Prefix Sum',
  'HashMap',
  'HashSet',
  'Bit Manipulation',
  'Math',
  'Segment Tree',
  'Fenwick Tree',
  'Disjoint Set Union',
  'Topological Sort',
  'Shortest Path',
  'Minimum Spanning Tree',
  'Binary Indexed Tree',
];

export const NoteCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Partial<INote> | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  // Fetch all notes (including unpublished drafts for Admin)
  const { data: notes = [], isLoading } = useQuery<INote[]>({
    queryKey: ['admin-notes'],
    queryFn: () => noteService.getAll({ published: 'all' }),
  });

  // Mutations
  const saveMutation = useMutation({
    mutationFn: (data: Partial<INote>) => {
      if (data._id) {
        return noteService.update(data._id, data as any);
      }
      return noteService.create(data as ICreateNoteDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setEditingNote(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => noteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) => noteService.togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: string) => noteService.duplicate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const startNewNote = () => {
    setEditingNote({
      title: '',
      slug: '',
      category: 'Arrays',
      difficulty: 'Easy',
      description: '',
      definition: '',
      characteristics: ['Fast O(1) operations'],
      types: [{ name: 'Standard Type', description: 'Standard implementation variant' }],
      operations: [{ name: 'Access', description: 'Direct index access', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' }],
      javaMethods: [
        {
          name: 'add(E element)',
          purpose: 'Appends element to container',
          syntax: 'public boolean add(E e)',
          parameters: 'e - element to append',
          returnType: 'boolean',
          timeComplexity: 'O(1)',
          example: 'list.add(10);',
          notes: 'Amortized constant time operation',
        },
      ],
      internalWorking: 'Internal dynamic memory buffer.',
      memoryRepresentation: 'Contiguous memory address offsets.',
      working: '',
      algorithm: '',
      flow: '',
      dryRun: '',
      timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N)', description: '' },
      spaceComplexity: { auxiliary: 'O(1)', worst: 'O(N)', description: '' },
      advantages: ['Fast operations'],
      disadvantages: ['Memory overhead'],
      applications: ['General Data Processing'],
      javaCode: '// Java Implementation\npublic class Solution {\n}',
      cppCode: '// C++ Implementation\n#include <iostream>\n',
      pythonCode: '# Python Implementation\ndef solution():\n    pass',
      jsCode: '// JavaScript Implementation\nfunction solution() {}\n',
      example: 'Input: [1, 2, 3]',
      output: 'Output: [3, 2, 1]',
      interviewQuestions: [{ question: 'Sample Question?', answer: 'Sample Answer', companyTags: ['Amazon', 'Google'] }],
      companyWiseQuestions: [{ company: 'Amazon', questions: ['Two Sum'] }],
      commonMistakes: ['Off-by-one indexing error'],
      bestPractices: ['Use initial capacity if size is known.'],
      relatedProblems: [{ title: 'Two Sum', difficulty: 'Easy', link: '/practice' }],
      tags: ['dsa', 'learning'],
      estimatedReadTime: 5,
      revisionNotes: 'Key takeaway revision points...',
      cheatSheet: 'Summary table cheat sheet...',
      published: true,
    });
    setIsPreview(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote?.title || !editingNote?.definition) return;
    saveMutation.mutate(editingNote);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* CMS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Admin Management
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            Notes &amp; DSA Knowledge Base CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, duplicate, publish, and reorder comprehensive study material notes.
          </p>
        </div>

        <button
          onClick={startNewNote}
          className="btn-primary self-start sm:self-auto cursor-pointer flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs"
        >
          <Plus className="w-4 h-4" />
          Create New DSA Note
        </button>
      </div>

      {/* Editor Modal / Panel if Editing */}
      {editingNote && (
        <div className="glass-card rounded-2xl p-6 border-2 border-purple-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-purple-400" />
              {editingNote._id ? 'Edit DSA Note' : 'Create New DSA Note'}
            </h3>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                {isPreview ? 'Back to Editor' : 'Live Preview'}
              </button>

              <button onClick={() => setEditingNote(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isPreview ? (
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-white/10 text-xs">
              <h2 className="text-xl font-black text-white">{editingNote.title}</h2>
              <p className="text-slate-300">{editingNote.description}</p>
              <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-500 rounded">
                <strong>Definition:</strong> {editingNote.definition}
              </div>
              <SyntaxHighlighter
                javaCode={editingNote.javaCode}
                cppCode={editingNote.cppCode}
                pythonCode={editingNote.pythonCode}
                jsCode={editingNote.jsCode}
              />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Title</label>
                  <input
                    type="text"
                    required
                    value={editingNote.title || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Category</label>
                  <select
                    value={editingNote.category || 'Arrays'}
                    onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Difficulty</label>
                  <select
                    value={editingNote.difficulty || 'Easy'}
                    onChange={(e) => setEditingNote({ ...editingNote, difficulty: e.target.value as any })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Description & Definition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Short Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingNote.description || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">1. Definition</label>
                  <textarea
                    rows={3}
                    required
                    value={editingNote.definition || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, definition: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white resize-none"
                  />
                </div>
              </div>

              {/* Working & Algorithm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">4. Working Principle</label>
                  <textarea
                    rows={4}
                    value={editingNote.working || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, working: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">5. Step-by-Step Algorithm</label>
                  <textarea
                    rows={4}
                    value={editingNote.algorithm || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, algorithm: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Flow & Dry Run */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">6. Dry Run Trace</label>
                  <textarea
                    rows={4}
                    value={editingNote.dryRun || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, dryRun: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">7. Flow Explanation</label>
                  <textarea
                    rows={4}
                    value={editingNote.flow || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, flow: e.target.value })}
                    className="w-full bg-[#121624] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Code Snippets */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold text-purple-300 uppercase">13-15. Code Implementations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Java Code</label>
                    <textarea
                      rows={6}
                      value={editingNote.javaCode || ''}
                      onChange={(e) => setEditingNote({ ...editingNote, javaCode: e.target.value })}
                      className="w-full bg-[#0a0d14] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">C++ Code</label>
                    <textarea
                      rows={6}
                      value={editingNote.cppCode || ''}
                      onChange={(e) => setEditingNote({ ...editingNote, cppCode: e.target.value })}
                      className="w-full bg-[#0a0d14] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Python Code</label>
                    <textarea
                      rows={6}
                      value={editingNote.pythonCode || ''}
                      onChange={(e) => setEditingNote({ ...editingNote, pythonCode: e.target.value })}
                      className="w-full bg-[#0a0d14] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Save / Cancel buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
                >
                  <Save className="w-4 h-4" />
                  {saveMutation.isPending ? 'Saving Note...' : 'Save Note'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Notes Management List */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes in CMS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121624] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Total Notes: <span className="text-white font-bold">{notes.length}</span>
          </div>
        </div>

        {/* Notes Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Loading CMS notes...
                  </td>
                </tr>
              ) : filteredNotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No notes found in CMS.
                  </td>
                </tr>
              ) : (
                filteredNotes.map((note) => (
                  <tr key={note._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                      {note.title}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">{note.category}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {note.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => togglePublishMutation.mutate(note._id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer ${
                          note.published
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {note.published ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {note.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingNote(note)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                          title="Edit Note"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateMutation.mutate(note._id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 cursor-pointer"
                          title="Duplicate Note"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(note._id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 cursor-pointer"
                          title="Delete Note"
                        >
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
    </motion.div>
  );
};

export default NoteCMS;
