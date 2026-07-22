/**
 * Union-Find Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/unionFind/generateFrames.test.ts
 */
import { generateUnionFindFrames } from './generateFrames';
import { createSimpleGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateUnionFindFrames>[0];
  validate: (frames: ReturnType<typeof generateUnionFindFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Union-Find on simple graph',
    graph: createSimpleGraph(),
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Union-Find completes');
    },
  },
];

function runUnionFindTests(): void {
  const testCases = cases.map(({ name, graph, validate }) => ({
    name,
    validate: () => {
      const frames = generateUnionFindFrames(graph);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Union-Find');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runUnionFindTests();
export { runUnionFindTests };
