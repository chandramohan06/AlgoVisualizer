import React, { useEffect, useRef, useState } from 'react';
import {
  getCategoryGroups,
  getGroupOperations,
  type DSAOperationMeta,
} from '@algorithms/metadata/categoryOperations';
import { type UseMethodsExplorerReturn } from '@hooks/useMethodsExplorer';
import {
  Search, Star, Pin, ChevronDown, ChevronRight,
  ChevronsUpDown, Layers, Play, Clock, PanelLeftClose,
  PanelLeftOpen, History, TrendingUp,
} from 'lucide-react';

// ── Category Icons map (lucide-free: use text glyphs for categories) ─────────
const CATEGORY_GLYPH: Record<string, string> = {
  array:                '[ ]',
  'linked-list':        '⟶',
  stack:                '⬆',
  queue:                '⇨',
  tree:                 '🌳',
  heap:                 '▲',
  graph:                '⬡',
  recursion:            '↺',
  backtracking:         '⤺',
  greedy:               '⚡',
  'dynamic-programming':'◈',
};

const CATEGORY_LABEL: Record<string, string> = {
  array:                'Arrays',
  'linked-list':        'Linked List',
  stack:                'Stack',
  queue:                'Queue',
  tree:                 'Tree',
  heap:                 'Heap',
  graph:                'Graph',
  recursion:            'Recursion',
  backtracking:         'Backtracking',
  greedy:               'Greedy',
  'dynamic-programming':'Dynamic Prog.',
};

const CATEGORY_LIST = Object.keys(CATEGORY_LABEL);

// ── Group icon mapping ────────────────────────────────────────────────────────
const GROUP_ICON: Record<string, React.ReactNode> = {
  Basic:         <Layers className="w-3 h-3" />,
  Searching:     <Search className="w-3 h-3" />,
  Sorting:       <TrendingUp className="w-3 h-3" />,
  Advanced:      <ChevronsUpDown className="w-3 h-3" />,
  Operations:    <Play className="w-3 h-3" />,
  Applications:  <Star className="w-3 h-3" />,
  Variants:      <ChevronsUpDown className="w-3 h-3" />,
  Traversals:    <History className="w-3 h-3" />,
  Modifications: <Play className="w-3 h-3" />,
  Properties:    <TrendingUp className="w-3 h-3" />,
  Traversal:     <History className="w-3 h-3" />,
  'Shortest Path': <TrendingUp className="w-3 h-3" />,
  MST:           <Layers className="w-3 h-3" />,
  Others:        <ChevronsUpDown className="w-3 h-3" />,
};

interface MethodsExplorerProps {
  explorer: UseMethodsExplorerReturn;
  categorySlug: string;
  onCategoryChange: (slug: string) => void;
  onMethodSelect: (opId: string, inputs: Record<string, any>) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// MethodsExplorer — IDE-style left sidebar
// ─────────────────────────────────────────────────────────────────────────────
export const MethodsExplorer: React.FC<MethodsExplorerProps> = ({
  explorer,
  categorySlug,
  onCategoryChange,
  onMethodSelect,
}) => {
  const {
    selectedMethodId,
    setSelectedMethodId,
    expandedGroups,
    toggleGroup,
    collapseAll,
    expandAll,
    searchQuery,
    setSearchQuery,
    filteredOperations,
    isFavorite,
    toggleFavorite,
    isPinned,
    togglePin,
    pinnedMethods,
    recentMethods,
    isCollapsed,
    toggleCollapsed,
    focusedIndex,
    setFocusedIndex,
    handleKeyNav,
  } = explorer;

  const searchRef = useRef<HTMLInputElement>(null);
  const [inputValues, setInputValues] = useState<Record<string, any>>({});

  const groups = getCategoryGroups(categorySlug);

  // When selection changes, update default inputs
  useEffect(() => {
    const op = filteredOperations.find((o) => o.id === selectedMethodId);
    if (op) {
      const defaults = op.inputs.reduce<Record<string, any>>((acc, inp) => {
        acc[inp.name] = inp.defaultValue ?? '';
        return acc;
      }, {});
      setInputValues(defaults);
    }
  }, [selectedMethodId, filteredOperations]);

  // Focus search on Ctrl+F
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleMethodClick = (op: DSAOperationMeta) => {
    setSelectedMethodId(op.id);
    const defaults = op.inputs.reduce<Record<string, any>>((acc, inp) => {
      acc[inp.name] = inp.defaultValue ?? '';
      return acc;
    }, {});
    setInputValues(defaults);
    onMethodSelect(op.id, defaults);
  };

  const handleRunActive = () => {
    if (selectedMethodId) {
      onMethodSelect(selectedMethodId, inputValues);
    }
  };

  // ── Collapsed (icon-only) Mode ────────────────────────────────────────────
  if (isCollapsed) {
    return (
      <aside className="h-full w-12 bg-[#0d1117] border-r border-white/[0.06] flex flex-col items-center py-3 gap-1 select-none">
        {/* Expand toggle */}
        <button
          onClick={toggleCollapsed}
          className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer mb-2"
          title="Expand Methods Explorer"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>

        {/* Category dots */}
        <div className="flex flex-col gap-1 w-full px-1">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              title={CATEGORY_LABEL[cat]}
              className={`w-full h-8 rounded-lg text-[10px] font-mono font-black flex items-center justify-center transition-all cursor-pointer ${
                categorySlug === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {CATEGORY_GLYPH[cat] || '●'}
            </button>
          ))}
        </div>
      </aside>
    );
  }

  // ── Full Expanded Mode ────────────────────────────────────────────────────
  return (
    <aside
      className="h-full w-[240px] min-w-[240px] bg-[#0d1117] border-r border-white/[0.06] flex flex-col select-none overflow-hidden"
      onKeyDown={handleKeyNav}
      tabIndex={-1}
    >
      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.06] shrink-0">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
          Methods Explorer
        </span>
        <button
          onClick={toggleCollapsed}
          className="p-1 rounded text-slate-600 hover:text-white transition-colors cursor-pointer"
          title="Collapse Sidebar"
        >
          <PanelLeftClose className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Category Navigation ── */}
      <div className="shrink-0 border-b border-white/[0.06]">
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 font-mono">Category</span>
        </div>
        <div className="px-2 pb-2 flex flex-col gap-0.5">
          {CATEGORY_LIST.map((cat) => {
            const isActive = categorySlug === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left group ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={`text-[11px] font-mono shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-300'}`}>
                  {CATEGORY_GLYPH[cat] || '●'}
                </span>
                <span className="truncate">{CATEGORY_LABEL[cat]}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search Box ── */}
      <div className="px-3 py-2 border-b border-white/[0.06] shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search methods... (Ctrl+F)"
            className="w-full bg-black/50 border border-white/[0.06] rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white text-xs cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="text-[9px] text-slate-500 font-mono mt-1.5">
            {filteredOperations.length} result{filteredOperations.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* ── Scrollable Methods Body ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

        {/* ── Pinned Methods Section ── */}
        {pinnedMethods.length > 0 && !searchQuery && (
          <div className="border-b border-white/[0.04] pb-1">
            <div className="px-3 py-2 flex items-center gap-1.5">
              <Pin className="w-3 h-3 text-amber-500" />
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-500/70 font-mono">Pinned</span>
            </div>
            {pinnedMethods.map((op) => (
              <MethodItem
                key={`pinned-${op.id}`}
                op={op}
                isSelected={selectedMethodId === op.id}
                isFavorite={isFavorite(op.id)}
                isPinned={isPinned(op.id)}
                focusedIndex={-1}
                myIndex={-1}
                onSelect={handleMethodClick}
                onToggleFavorite={toggleFavorite}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        )}

        {/* ── Recently Used Section ── */}
        {recentMethods.length > 0 && !searchQuery && (
          <div className="border-b border-white/[0.04] pb-1">
            <div className="px-3 py-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 font-mono">Recently Used</span>
            </div>
            {recentMethods.slice(0, 3).map((op) => (
              <MethodItem
                key={`recent-${op.id}`}
                op={op}
                isSelected={selectedMethodId === op.id}
                isFavorite={isFavorite(op.id)}
                isPinned={isPinned(op.id)}
                focusedIndex={-1}
                myIndex={-1}
                onSelect={handleMethodClick}
                onToggleFavorite={toggleFavorite}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        )}

        {/* ── Search Results (flat list when searching) ── */}
        {searchQuery ? (
          <div className="py-1">
            {filteredOperations.length === 0 ? (
              <div className="px-4 py-6 text-[11px] text-slate-600 font-mono text-center">
                No methods found for "{searchQuery}"
              </div>
            ) : (
              filteredOperations.map((op, idx) => (
                <MethodItem
                  key={op.id}
                  op={op}
                  isSelected={selectedMethodId === op.id}
                  isFavorite={isFavorite(op.id)}
                  isPinned={isPinned(op.id)}
                  focusedIndex={focusedIndex}
                  myIndex={idx}
                  onSelect={handleMethodClick}
                  onToggleFavorite={toggleFavorite}
                  onTogglePin={togglePin}
                  onFocus={() => setFocusedIndex(idx)}
                />
              ))
            )}
          </div>
        ) : (
          /* ── Grouped Methods (default mode) ── */
          <div className="py-1">
            {/* Collapse / Expand All controls */}
            <div className="px-3 pt-2 pb-1 flex items-center justify-between">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 font-mono">
                {CATEGORY_LABEL[categorySlug] || categorySlug}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={expandAll}  className="text-[9px] font-mono text-slate-600 hover:text-indigo-400 transition-colors cursor-pointer">All+</button>
                <button onClick={collapseAll} className="text-[9px] font-mono text-slate-600 hover:text-indigo-400 transition-colors cursor-pointer">All−</button>
              </div>
            </div>

            {groups.map((group) => {
              const groupOps = getGroupOperations(categorySlug, group);
              const isExpanded = expandedGroups[group] !== false;

              return (
                <div key={group} className="select-none">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <span className="text-slate-600 shrink-0">
                      {isExpanded
                        ? <ChevronDown className="w-3 h-3" />
                        : <ChevronRight className="w-3 h-3" />}
                    </span>
                    <span className="text-slate-500 group-hover:text-slate-300 shrink-0">
                      {GROUP_ICON[group] || <Layers className="w-3 h-3" />}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 font-mono truncate">
                      {group}
                    </span>
                    <span className="ml-auto text-[9px] text-slate-700 font-mono shrink-0">
                      {groupOps.length}
                    </span>
                  </button>

                  {/* Group Methods */}
                  {isExpanded && (
                    <div className="ml-0">
                      {groupOps.map((op, idx) => (
                        <MethodItem
                          key={op.id}
                          op={op}
                          isSelected={selectedMethodId === op.id}
                          isFavorite={isFavorite(op.id)}
                          isPinned={isPinned(op.id)}
                          focusedIndex={focusedIndex}
                          myIndex={idx}
                          onSelect={handleMethodClick}
                          onToggleFavorite={toggleFavorite}
                          onTogglePin={togglePin}
                          onFocus={() => setFocusedIndex(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Active Method Input & Execute Panel ── */}
      {selectedMethodId && (
        <ActiveMethodPanel
          explorer={explorer}
          inputValues={inputValues}
          setInputValues={setInputValues}
          onRun={handleRunActive}
        />
      )}
    </aside>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MethodItem — Individual method row in the explorer
// ─────────────────────────────────────────────────────────────────────────────
interface MethodItemProps {
  op: DSAOperationMeta;
  isSelected: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  focusedIndex: number;
  myIndex: number;
  onSelect: (op: DSAOperationMeta) => void;
  onToggleFavorite: (id: string) => void;
  onTogglePin: (id: string) => void;
  onFocus?: () => void;
}

const MethodItem: React.FC<MethodItemProps> = ({
  op, isSelected, isFavorite, isPinned,
  onSelect, onToggleFavorite, onTogglePin, onFocus,
}) => {
  return (
    <div
      onClick={() => onSelect(op)}
      onMouseEnter={onFocus}
      className={`w-full flex items-center gap-2 px-4 py-1.5 cursor-pointer group transition-all relative ${
        isSelected
          ? 'bg-indigo-600/15 border-l-2 border-indigo-500 text-white'
          : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent'
      }`}
    >
      {/* Method label */}
      <span className={`flex-1 text-[11px] font-mono font-semibold truncate leading-tight ${isSelected ? 'text-white' : ''}`}>
        {op.label}
      </span>

      {/* Complexity badge — visible on hover or selected */}
      <span className={`text-[9px] font-mono shrink-0 transition-opacity ${
        isSelected ? 'opacity-100 text-indigo-300' : 'opacity-0 group-hover:opacity-100 text-slate-600'
      }`}>
        {op.timeComplexity}
      </span>

      {/* Favorite + Pin buttons — only on hover */}
      <div className={`flex items-center gap-0.5 transition-opacity shrink-0 ${
        isSelected || isFavorite || isPinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(op.id); }}
          title="Favorite"
          className={`p-0.5 rounded hover:scale-110 transition-transform cursor-pointer ${isFavorite ? 'text-amber-400' : 'text-slate-700 hover:text-amber-400'}`}
        >
          <Star className="w-2.5 h-2.5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePin(op.id); }}
          title="Pin"
          className={`p-0.5 rounded hover:scale-110 transition-transform cursor-pointer ${isPinned ? 'text-amber-400' : 'text-slate-700 hover:text-amber-400'}`}
        >
          <Pin className="w-2.5 h-2.5" fill={isPinned ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ActiveMethodPanel — bottom of sidebar showing selected method inputs + run btn
// ─────────────────────────────────────────────────────────────────────────────
interface ActiveMethodPanelProps {
  explorer: UseMethodsExplorerReturn;
  inputValues: Record<string, any>;
  setInputValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onRun: () => void;
}

const ActiveMethodPanel: React.FC<ActiveMethodPanelProps> = ({
  explorer, inputValues, setInputValues, onRun,
}) => {
  const { activeMethod } = explorer;
  if (!activeMethod) return null;

  return (
    <div className="border-t border-white/[0.06] bg-[#0d1117] p-3 space-y-2 shrink-0">
      {/* Method Name + Complexity */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-white font-mono truncate">{activeMethod.label}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[8px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
            {activeMethod.timeComplexity}
          </span>
          <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            {activeMethod.spaceComplexity}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
        {activeMethod.description}
      </p>

      {/* Dynamic Input Fields */}
      {activeMethod.inputs.length > 0 && (
        <div className="space-y-1.5">
          {activeMethod.inputs.map((inp) => (
            <div key={inp.name} className="flex items-center gap-2">
              <label className="text-[9px] font-mono text-slate-500 w-16 shrink-0">{inp.label}:</label>
              <input
                type={inp.type === 'number' ? 'number' : 'text'}
                value={inputValues[inp.name] ?? ''}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, [inp.name]: e.target.value }))
                }
                className="flex-1 bg-black/60 border border-white/[0.08] rounded px-2 py-1 text-[10px] text-white font-mono focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          ))}
        </div>
      )}

      {/* Run Button */}
      <button
        onClick={onRun}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-wider transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-[0.98]"
      >
        <Play className="w-3 h-3 fill-current" /> Execute
      </button>
    </div>
  );
};

export default MethodsExplorer;
