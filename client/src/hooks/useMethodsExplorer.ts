import { useState, useCallback, useEffect, useRef } from 'react';
import {
  getCategoryOperations,
  getCategoryGroups,
  type DSAOperationMeta,
} from '@algorithms/metadata/categoryOperations';

const STORAGE_KEY_FAVORITES = 'ide_methods_favorites';
const STORAGE_KEY_PINNED    = 'ide_methods_pinned';
const STORAGE_KEY_RECENT    = 'ide_methods_recent';
const MAX_RECENT = 6;

function readLS(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as string[];
  } catch {
    return [];
  }
}

function writeLS(key: string, val: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch { /* ignore quota errors */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// useMethodsExplorer
//
// Manages all state needed by the MethodsExplorer left sidebar:
//   - selected method per category
//   - expanded/collapsed groups
//   - favorites, pinned, recently-used (all localStorage-persisted)
//   - search query + filtered results
//   - sidebar collapsed mode (icon-only)
// ─────────────────────────────────────────────────────────────────────────────
export interface UseMethodsExplorerReturn {
  // Current category
  categorySlug: string;

  // All operations for this category
  operations: DSAOperationMeta[];

  // Groups
  groups: string[];

  // Selected method
  selectedMethodId: string;
  setSelectedMethodId: (id: string) => void;
  activeMethod: DSAOperationMeta | undefined;

  // Expanded groups
  expandedGroups: Record<string, boolean>;
  toggleGroup: (group: string) => void;
  collapseAll: () => void;
  expandAll: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredOperations: DSAOperationMeta[];

  // Favorites
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;

  // Pinned
  pinned: string[];
  isPinned: (id: string) => boolean;
  togglePin: (id: string) => void;
  pinnedMethods: DSAOperationMeta[];

  // Recently used
  recentIds: string[];
  recentMethods: DSAOperationMeta[];

  // Sidebar collapsed mode
  isCollapsed: boolean;
  toggleCollapsed: () => void;

  // Keyboard focus index for arrow navigation
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  handleKeyNav: (e: React.KeyboardEvent) => void;
}

export function useMethodsExplorer(
  categorySlug: string,
  onMethodExecute: (opId: string, inputs: Record<string, any>) => void,
): UseMethodsExplorerReturn {
  const operations = getCategoryOperations(categorySlug);
  const groups = getCategoryGroups(categorySlug);

  // ── Selected Method ──────────────────────────────────────────────────────
  const [selectedMethodId, setSelectedMethodIdInternal] = useState<string>(
    operations[0]?.id || 'traverse',
  );

  // When category changes, reset selection to first method in new category
  const prevCategoryRef = useRef<string>(categorySlug);
  useEffect(() => {
    if (prevCategoryRef.current !== categorySlug) {
      prevCategoryRef.current = categorySlug;
      setSelectedMethodIdInternal(operations[0]?.id || '');
    }
  }, [categorySlug, operations]);

  const setSelectedMethodId = useCallback(
    (id: string) => {
      setSelectedMethodIdInternal(id);
      // Record in recently used
      setRecentIds((prev) => {
        const next = [id, ...prev.filter((r) => r !== id)].slice(0, MAX_RECENT);
        writeLS(STORAGE_KEY_RECENT, next);
        return next;
      });
    },
    [],
  );

  const activeMethod = operations.find((op) => op.id === selectedMethodId);

  // ── Expanded Groups ──────────────────────────────────────────────────────
  // All groups start expanded
  const buildDefaultExpanded = useCallback(() => {
    return groups.reduce<Record<string, boolean>>((acc, g) => {
      acc[g] = true;
      return acc;
    }, {});
  }, [groups]);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    buildDefaultExpanded,
  );

  // Re-initialize when category changes
  useEffect(() => {
    setExpandedGroups(buildDefaultExpanded());
  }, [categorySlug, buildDefaultExpanded]);

  const toggleGroup = useCallback((group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedGroups(
      groups.reduce<Record<string, boolean>>((acc, g) => { acc[g] = false; return acc; }, {}),
    );
  }, [groups]);

  const expandAll = useCallback(() => {
    setExpandedGroups(
      groups.reduce<Record<string, boolean>>((acc, g) => { acc[g] = true; return acc; }, {}),
    );
  }, [groups]);

  // ── Search ───────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOperations = searchQuery.trim()
    ? operations.filter((op) =>
        op.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : operations;

  // ── Favorites ────────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState<string[]>(() => readLS(STORAGE_KEY_FAVORITES));

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      writeLS(STORAGE_KEY_FAVORITES, next);
      return next;
    });
  }, []);

  // ── Pinned ───────────────────────────────────────────────────────────────
  const [pinned, setPinned] = useState<string[]>(() => readLS(STORAGE_KEY_PINNED));

  const isPinned = useCallback((id: string) => pinned.includes(id), [pinned]);

  const togglePin = useCallback((id: string) => {
    setPinned((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      writeLS(STORAGE_KEY_PINNED, next);
      return next;
    });
  }, []);

  // All pinned operations across all categories
  const allOps = Object.values(
    // dynamic import would be circular — just use this category's ops here
    operations,
  );
  const pinnedMethods = allOps.filter((op) => pinned.includes(op.id));

  // ── Recently Used ────────────────────────────────────────────────────────
  const [recentIds, setRecentIds] = useState<string[]>(() => readLS(STORAGE_KEY_RECENT));
  const recentMethods = recentIds
    .map((id) => operations.find((op) => op.id === id))
    .filter(Boolean) as DSAOperationMeta[];

  // ── Collapsed Sidebar ────────────────────────────────────────────────────
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const toggleCollapsed = useCallback(() => setIsCollapsed((prev) => !prev), []);

  // ── Keyboard Navigation ──────────────────────────────────────────────────
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const handleKeyNav = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, filteredOperations.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const op = filteredOperations[focusedIndex];
        if (op) {
          setSelectedMethodId(op.id);
          // Build default inputs for the operation
          const defaultInputs = op.inputs.reduce<Record<string, any>>((acc, inp) => {
            acc[inp.name] = inp.defaultValue ?? '';
            return acc;
          }, {});
          onMethodExecute(op.id, defaultInputs);
        }
      }
    },
    [filteredOperations, focusedIndex, setSelectedMethodId, onMethodExecute],
  );

  return {
    categorySlug,
    operations,
    groups,
    selectedMethodId,
    setSelectedMethodId,
    activeMethod,
    expandedGroups,
    toggleGroup,
    collapseAll,
    expandAll,
    searchQuery,
    setSearchQuery,
    filteredOperations,
    favorites,
    isFavorite,
    toggleFavorite,
    pinned,
    isPinned,
    togglePin,
    pinnedMethods,
    recentIds,
    recentMethods,
    isCollapsed,
    toggleCollapsed,
    focusedIndex,
    setFocusedIndex,
    handleKeyNav,
  };
}
