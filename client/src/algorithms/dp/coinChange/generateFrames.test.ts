/**
 * Coin Change Test
 * Run: npx tsx src/algorithms/dp/coinChange/generateFrames.test.ts
 */
import { generateCoinChangeFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateCoinChangeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Coin Change 1D DP table walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should find 1 coin (since amount is 5 and coin 5 exists)
      console.assert(f[f.length - 1].description.includes('is 1'), 'Min coins resolved to 1');
    },
  },
];

function runCoinChangeTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateCoinChangeFrames([1, 2, 5], 5);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Coin Change');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runCoinChangeTests();
export { runCoinChangeTests };
