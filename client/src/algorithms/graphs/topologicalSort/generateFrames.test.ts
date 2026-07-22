/**
 * Topological Sort Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/topologicalSort/generateFrames.test.ts
 */
import { generateTopologicalSortFrames } from './generateFrames';
import { createDirectedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateTopologicalSortFrames>[0];
  validate: (frames: ReturnType<typeof generateTopologicalSortFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Topological Sort on directed graph',
    graph: createDirectedGraph(),
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Topological Sort completes');
    },
  },
];

function runTopologicalSortTests(): void {
  const testCases = cases.map(({ name, graph, validate }) => ({
    name,
    validate: () => {
      const frames = generateTopologicalSortFrames(graph);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Topological Sort');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runTopologicalSortTests();
export { runTopologicalSortTests };
