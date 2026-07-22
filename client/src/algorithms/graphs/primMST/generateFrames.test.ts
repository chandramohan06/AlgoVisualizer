/**
 * Prim's MST Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/primMST/generateFrames.test.ts
 */
import { generatePrimMSTFrames } from './generateFrames';
import { createWeightedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generatePrimMSTFrames>[0];
  startNodeId: Parameters<typeof generatePrimMSTFrames>[1];
  validate: (frames: ReturnType<typeof generatePrimMSTFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Prim MST on weighted graph',
    graph: createWeightedGraph(),
    startNodeId: '0',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Prim MST completes');
    },
  },
];

function runPrimTests(): void {
  const testCases = cases.map(({ name, graph, startNodeId, validate }) => ({
    name,
    validate: () => {
      const frames = generatePrimMSTFrames(graph, startNodeId);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Prim MST');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runPrimTests();
export { runPrimTests };
