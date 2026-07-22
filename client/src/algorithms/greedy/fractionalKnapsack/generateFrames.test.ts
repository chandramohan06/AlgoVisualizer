/**
 * Fractional Knapsack Test
 * Run: npx tsx src/algorithms/greedy/fractionalKnapsack/generateFrames.test.ts
 */
import { generateFractionalKnapsackFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateFractionalKnapsackFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Fractional Knapsack greedy calculations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should include the solution max value 240
      console.assert(f[f.length - 1].description.includes('240'), 'Max value resolved to 240');
    },
  },
];

function runFractionalTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateFractionalKnapsackFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Fractional Knapsack');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFractionalTests();
export { runFractionalTests };
