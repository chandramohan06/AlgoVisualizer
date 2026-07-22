/**
 * Cycle Detection Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/cycleDetection/generateFrames.test.ts
 */
import { generateCycleDetectionFrames } from './generateFrames';
import { createDirectedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateCycleDetectionFrames>[0];
  validate: (frames: ReturnType<typeof generateCycleDetectionFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Cycle Detection on directed graph',
    graph: createDirectedGraph(),
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete') || f[f.length - 1].description.includes('detected'), 'Cycle detection completes');
    },
  },
];

function runCycleDetectionTests(): void {
  const testCases = cases.map(({ name, graph, validate }) => ({
    name,
    validate: () => {
      const frames = generateCycleDetectionFrames(graph);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Cycle Detection');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runCycleDetectionTests();
export { runCycleDetectionTests };
