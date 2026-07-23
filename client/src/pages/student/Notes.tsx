import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { noteService } from '@services/noteService';
import { BookOpen, Search, Star, Edit, Trash2, Plus, X, Save, FileText, Tag, Sparkles } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isBookmarked: boolean;
  updatedAt: string;
}

export const Notes: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Note Form Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Fetch all notes
  const { data: notes = [], isLoading } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => noteService.getAll(),
  });

  const queryParams = activeNoteId ? notes.find(n => n._id === activeNoteId) : null;

  // Extract all unique tags
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  // Mutations
  const createMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsEditing(false);
      if (newNote?._id) setActiveNoteId(newNote._id);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => noteService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: noteService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setActiveNoteId(null);
    },
  });

  const toggleBookmarkMutation = useMutation({
    mutationFn: noteService.toggleBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    if (activeNoteId && activeNoteId !== 'new') {
      updateMutation.mutate({
        id: activeNoteId,
        payload: { title, content, tags: tagList },
      });
    } else {
      createMutation.mutate({ title, content, tags: tagList });
    }
  };

  const startNewNote = () => {
    setActiveNoteId('new');
    setIsEditing(true);
    setTitle('');
    setContent('');
    setTags('');
  };

  const selectNote = (id: string) => {
    const note = notes.find(n => n._id === id);
    if (note) {
      setActiveNoteId(id);
      setIsEditing(false);
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags.join(', '));
    }
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || n.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Cheat Sheets &amp; Formulas
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-indigo-400" />
            Study Notes &amp; Highlights
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Personal algorithm cheat sheets, time complexity notes, and custom solution walk-throughs.
          </p>
        </div>

        <button
          onClick={startNewNote}
          className="btn-primary self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create New Note
        </button>
      </div>

      {/* ── Main Layout: Sidebar + Editor ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & Notes List (5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes or code snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-premium pl-10"
            />
          </div>

          {/* Tag Filter Pills */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedTag(null)}
                className={`badge cursor-pointer ${!selectedTag ? 'badge-indigo' : 'badge-slate'}`}
              >
                All ({notes.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`badge cursor-pointer ${selectedTag === tag ? 'badge-indigo' : 'badge-slate'}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Notes Scrollable List */}
          <div className="glass-card rounded-2xl p-2 space-y-2 h-[calc(100vh-280px)] min-h-[400px] overflow-y-auto">
            {isLoading ? (
              <Skeleton className="h-16 rounded-xl" count={4} />
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-16 text-xs text-slate-500 font-mono">
                No matching notes found.
              </div>
            ) : (
              filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  onClick={() => selectNote(note._id)}
                  whileHover={{ x: 2 }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    activeNoteId === note._id
                      ? 'bg-indigo-500/10 border-indigo-500/30 shadow-md shadow-indigo-500/5'
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-200 truncate pr-2 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      {note.title}
                    </h4>
                    {note.isBookmarked && (
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-mono leading-relaxed">
                    {note.content}
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      {note.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Note Editor / Viewer (7 cols) */}
        <div className="lg:col-span-8">
          {activeNoteId ? (
            <div className="glass-card rounded-2xl p-6 h-[calc(100vh-280px)] min-h-[400px] flex flex-col justify-between">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="text"
                        placeholder="Note Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full bg-transparent text-lg font-bold text-white border-b border-white/10 focus:border-indigo-500 pb-2 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-icon"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      placeholder="Write your study notes, time complexity breakdown, or code pseudocode..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      className="w-full flex-1 bg-black/20 border border-white/5 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50 resize-none font-mono leading-relaxed"
                    />

                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Tags (comma separated, e.g. arrays, dynamic-programming)..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="input-premium text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center mt-4 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save Note
                  </button>
                </form>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        {queryParams?.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmarkMutation.mutate(activeNoteId)}
                          className={`btn-icon ${queryParams?.isBookmarked ? 'text-amber-400' : ''}`}
                        >
                          <Star className={`w-4 h-4 ${queryParams?.isBookmarked ? 'fill-amber-400' : ''}`} />
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn-icon hover:text-indigo-400"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(activeNoteId)}
                          className="btn-icon hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content Display */}
                    <div className="text-xs text-slate-300 whitespace-pre-wrap font-mono h-64 overflow-y-auto leading-relaxed border border-white/5 rounded-xl p-5 bg-black/30">
                      {queryParams?.content}
                    </div>

                    {/* Tags List */}
                    {queryParams?.tags && queryParams.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {queryParams.tags.map((tag) => (
                          <span key={tag} className="badge badge-indigo">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Markdown supported</span>
                    <span>
                      Updated: {queryParams ? new Date(queryParams.updatedAt).toLocaleString() : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border-dashed border-white/10 p-12 text-center text-sm text-slate-500 h-[calc(100vh-280px)] min-h-[400px] flex flex-col justify-center items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Note Selected</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Select an existing note from the list or click 'Create New Note' to start writing cheat sheets.
              </p>
              <button onClick={startNewNote} className="btn-primary mt-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Create Note
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notes;
