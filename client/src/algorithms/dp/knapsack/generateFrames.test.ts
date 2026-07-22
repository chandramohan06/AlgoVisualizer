/**
 * Knapsack Test
 * Run: npx tsx src/algorithms/dp/knapsack/generateFrames.test.ts
 */
import { generateKnapsackFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateKnapsackFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Knapsack 2D DP matrix transitions walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should include the solution max profit 25
      console.assert(f[f.length - 1].description.includes('25'), 'Max profit resolved to 25');
    },
  },
];

function runKnapsackTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateKnapsackFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Knapsack');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runKnapsackTests();
export { runKnapsackTests };
