/**
 * LIS Test
 * Run: npx tsx src/algorithms/dp/lis/generateFrames.test.ts
 */
import { generateLISFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateLISFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'LIS 1D DP table transitions walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('3'), 'LIS length resolved to 3');
    },
  },
];

function runLISTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateLISFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'LIS');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runLISTests();
export { runLISTests };
