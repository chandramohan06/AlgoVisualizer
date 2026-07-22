import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '@services/noteService';
import { BookOpen, Search, Star, Edit, Trash2, Plus, X, Save } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const Notes: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  
  // Note Form Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Fetch all notes
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => noteService.getAll(),
  });

  const queryParams = activeNoteId ? notes?.find(n => n._id === activeNoteId) : null;

  // Mutations
  const createMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsEditing(false);
      setTitle('');
      setContent('');
      setTags('');
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
    const note = notes?.find(n => n._id === id);
    if (note) {
      setActiveNoteId(id);
      setIsEditing(false);
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags.join(', '));
    }
  };

  const filteredNotes = notes?.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            My Study Notes
          </h1>
          <p className="text-sm text-gray-500">Manage, export, and review your DSA visualizer cheat sheets.</p>
        </div>

        <button
          onClick={startNewNote}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Sidebar list */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 space-y-2 h-[50vh] overflow-y-auto">
            {isLoading ? (
              <Skeleton className="h-14 rounded-xl" count={3} />
            ) : !filteredNotes?.length ? (
              <div className="text-center py-12 text-xs text-gray-500">No notes found.</div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  onClick={() => selectNote(note._id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    activeNoteId === note._id
                      ? 'bg-indigo-600/10 border-indigo-500/30'
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-200 truncate pr-2">{note.title}</h4>
                    {note.isBookmarked && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                  <p className="text-[10px] text-gray-500 truncate mt-1">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Note details editor */}
        <div className="lg:col-span-2">
          {activeNoteId ? (
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 h-[60vh] flex flex-col justify-between">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full bg-transparent text-lg font-bold text-white border-b border-white/10 focus:outline-none focus:border-indigo-500 pb-1"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      placeholder="Note Content (Supports Markdown)..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      rows={10}
                      className="w-full bg-transparent text-sm text-gray-300 border-none focus:outline-none resize-none font-mono"
                    />

                    <input
                      type="text"
                      placeholder="Tags (comma separated)..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-400 border-b border-white/5 focus:outline-none pb-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Note
                  </button>
                </form>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-white">{queryParams?.title}</h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmarkMutation.mutate(activeNoteId)}
                          className={`p-1.5 rounded-lg hover:bg-white/5 ${
                            queryParams?.isBookmarked ? 'text-amber-400' : 'text-gray-400'
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-indigo-400"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(activeNoteId)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono h-40 overflow-y-auto leading-relaxed border border-white/5 rounded-xl p-4 bg-black/10">
                      {queryParams?.content}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {queryParams?.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] uppercase font-bold text-indigo-400 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-500 text-right">
                    Last updated: {queryParams ? new Date(queryParams.updatedAt).toLocaleString() : ''}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-12 text-center text-sm text-gray-500 h-[60vh] flex flex-col justify-center items-center gap-2">
              <BookOpen className="w-8 h-8 text-gray-600 mb-2" />
              Select a note or create a new one to view cheat sheets.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
