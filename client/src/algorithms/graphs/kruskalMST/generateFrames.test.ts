/**
 * Kruskal's MST Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/kruskalMST/generateFrames.test.ts
 */
import { generateKruskalMSTFrames } from './generateFrames';
import { createWeightedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateKruskalMSTFrames>[0];
  validate: (frames: ReturnType<typeof generateKruskalMSTFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Kruskal MST on weighted graph',
    graph: createWeightedGraph(),
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Kruskal MST completes');
    },
  },
];

function runKruskalTests(): void {
  const testCases = cases.map(({ name, graph, validate }) => ({
    name,
    validate: () => {
      const frames = generateKruskalMSTFrames(graph);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Kruskal MST');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runKruskalTests();
export { runKruskalTests };
