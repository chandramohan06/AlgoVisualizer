import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { getDSAFrameGenerator } from '@algorithms/engine/dsaFrameEngine';
import { generateDynamicOperationFrames } from '@algorithms/engine/dynamicOperationFrameEngine';
import api from '@services/api';
import { API_ENDPOINTS } from '@constants/api';
import { Skeleton } from '@components/common/Skeleton';
import { ARRAY_ALGORITHMS_REGISTRY } from '@algorithms/array/arrayRegistry';
import { type VisualizationFrame } from '@store/visualizationStore';
import { getCategoryOperations } from '@algorithms/metadata/categoryOperations';

// Default slug per category — shown when user switches category from Methods Explorer
const CATEGORY_DEFAULT_SLUG: Record<string, string> = {
  array:                  'array-traversal',
  'linked-list':          'linked-list-traversal',
  stack:                  'stack',
  queue:                  'queue',
  tree:                   'binary-search-tree',
  heap:                   'heap-insert',
  graph:                  'bfs',
  recursion:              'factorial',
  backtracking:           'n-queens',
  greedy:                 'activity-selection',
  'dynamic-programming':  'fibonacci-tabulation',
};

export const GenericVisualizer: React.FC = () => {
  const { category = 'array', slug = 'array-traversal' } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();

  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [customInput, setCustomInput] = useState<any | null>(null);
  const [dynamicFramesOverride, setDynamicFramesOverride] = useState<VisualizationFrame[] | null>(null);

  // Fetch algorithm detail from backend API, fallback to local registry
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setDynamicFramesOverride(null);

    const loadData = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.ALGORITHM_BY_SLUG(slug));
        if (isMounted && res.data?.data) {
          setDbData(res.data.data);
          setLoading(false);
          return;
        }
      } catch (_err) {
        // Fallback to local registry if API call fails or offline
      }

      const fallback = ARRAY_ALGORITHMS_REGISTRY[slug];
      if (isMounted) {
        setDbData(fallback || null);
        setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [slug]);

  // Handle custom input update
  const handleCustomInput = useCallback((newInput: any) => {
    setCustomInput(newInput);
    setDynamicFramesOverride(null);
  }, []);

  // Base frame generation
  const baseFrames = useMemo(() => {
    const generator = getDSAFrameGenerator(slug, category);
    const input = customInput || dbData?.sampleInput || [5, 2, 8, 1, 9, 3, 7, 4];
    return generator(input);
  }, [slug, category, customInput, dbData]);

  // Active frames (either dynamic operation frames override or base frames)
  const frames = useMemo(() => {
    return dynamicFramesOverride && dynamicFramesOverride.length > 0
      ? dynamicFramesOverride
      : baseFrames;
  }, [dynamicFramesOverride, baseFrames]);

  // Handle dynamic operation execution from Methods Explorer
  const handleExecuteOperation = useCallback(
    (opId: string, inputParams: Record<string, any>) => {
      const currentState = frames[0]?.data || [10, 20, 30, 40, 50];
      const generated = generateDynamicOperationFrames({
        operationId: opId,
        categorySlug: category,
        algoSlug: slug,
        currentState,
        inputParams,
      });
      setDynamicFramesOverride(generated);
    },
    [category, slug, frames],
  );

  // Handle category switch from Methods Explorer sidebar
  // Navigate to the default algorithm for the selected category
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      if (newCategory === category) return;
      // Pick first operation in that category as the default slug
      const ops = getCategoryOperations(newCategory);
      const defaultOp = ops[0];
      const defaultSlug = defaultOp
        ? defaultOp.id.replace(/_/g, '-')
        : CATEGORY_DEFAULT_SLUG[newCategory] || newCategory;
      navigate(`/visualizer/${newCategory}/${defaultSlug}`);
    },
    [category, navigate],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-6 flex flex-col gap-6">
        <Skeleton className="w-64 h-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  const metadata = {
    title: dbData?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: dbData?.category?.name || category.toLowerCase(),
    difficulty: dbData?.difficulty || 'easy',
    timeComplexity: dbData?.timeComplexity || 'O(n)',
    spaceComplexity: dbData?.spaceComplexity || 'O(1)',
    description: dbData?.theory || 'Algorithm visualizer',
    slug,
  };

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={dbData?.javaCode || '// Java implementation loading...'}
      cppCode={dbData?.cppCode || '// C++ implementation loading...'}
      pseudoCode={dbData?.pseudoCode || '// Pseudocode loading...'}
      metadata={metadata}
      rendererType={category as any}
      onCustomInput={handleCustomInput}
      onExecuteOperation={handleExecuteOperation}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default GenericVisualizer;
