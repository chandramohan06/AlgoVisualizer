import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen, Plus, Search, Edit2, Trash2,
  X, Eye, EyeOff
} from 'lucide-react';

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  order: number;
  isVisible: boolean;
}

// Fallback categories list
const INITIAL_CATEGORIES: CategoryItem[] = [
  { _id: '1', name: 'Arrays', slug: 'arrays', description: 'Contiguous memory collection operations', icon: '📊', order: 1, isVisible: true },
  { _id: '2', name: 'Sorting', slug: 'sorting', description: 'Arrange elements in comparison orders', icon: '🔃', order: 2, isVisible: true },
  { _id: '3', name: 'Trees', slug: 'trees', description: 'Hierarchical node relationships', icon: '🌲', order: 3, isVisible: true },
  { _id: '4', name: 'Graphs', slug: 'graphs', description: 'Network vertex and edge linkings', icon: '🕸️', order: 4, isVisible: false },
];

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('📊');
  const [order, setOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpenModal = (category?: CategoryItem) => {
    if (category) {
      setSelectedCategory(category);
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description || '');
      setIcon(category.icon);
      setOrder(category.order);
      setIsVisible(category.isVisible);
    } else {
      setSelectedCategory(null);
      setName('');
      setSlug('');
      setDescription('');
      setIcon('📊');
      setOrder(categories.length + 1);
      setIsVisible(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      // Edit
      setCategories(
        categories.map((c) =>
          c._id === selectedCategory._id
            ? { ...c, name, slug, description, icon, order, isVisible }
            : c,
        ),
      );
    } else {
      // Create
      const newCategory: CategoryItem = {
        _id: String(Date.now()),
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        icon,
        order,
        isVisible,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category? All associated algorithms will lose their mapping.')) {
      setCategories(categories.filter((c) => c._id !== id));
    }
  };

  const filteredCategories = categories
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-indigo-400" />
            Category Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure curriculum categories and structure.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 max-w-md bg-[#0b0b12] border border-white/5 rounded-xl px-3.5 py-2">
        <Search className="w-4 h-4 text-gray-500 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="bg-transparent text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none w-full"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-[#0b0b12] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white/[0.01]">
                <th className="p-4 w-16 text-center">Icon</th>
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Description</th>
                <th className="p-4 w-24 text-center">Order</th>
                <th className="p-4 w-28 text-center">Visibility</th>
                <th className="p-4 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No categories found. Click 'Add Category' to create one.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 text-2xl text-center">{category.icon}</td>
                    <td className="p-4 font-semibold text-white">{category.name}</td>
                    <td className="p-4 font-mono text-xs text-indigo-400">{category.slug}</td>
                    <td className="p-4 text-xs text-gray-500 max-w-xs truncate">{category.description || '-'}</td>
                    <td className="p-4 text-center text-xs font-semibold">{category.order}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        category.isVisible
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-gray-500/10 text-gray-500 border border-white/5'
                      }`}>
                        {category.isVisible ? (
                          <>
                            <Eye className="w-3 h-3" /> Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Hidden
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0b0b12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                <h3 className="font-bold text-gray-200">
                  {selectedCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Category Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sorting"
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Slug (Auto-generated)</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. sorting"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon Emoji</label>
                    <input
                      type="text"
                      required
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="e.g. 📊"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief details about what topics are inside..."
                    rows={3}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Display Order</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <input
                      type="checkbox"
                      id="isVisible"
                      checked={isVisible}
                      onChange={(e) => setIsVisible(e.target.checked)}
                      className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="isVisible" className="text-xs font-semibold text-gray-400 cursor-pointer">
                      Visible in Library
                    </label>
                  </div>
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
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
                  >
                    Save Changes
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
export default CategoryManager;
