/**
 * Activity Selection Test
 * Run: npx tsx src/algorithms/greedy/activitySelection/generateFrames.test.ts
 */
import { generateActivitySelectionFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateActivitySelectionFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Activity Selection greedy scheduling walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should find 2 activities selected (Act 0 and Act 2)
      console.assert(f[f.length - 1].description.includes('2'), 'Activities count resolved to 2');
    },
  },
];

function runActivityTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateActivitySelectionFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Activity Selection');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runActivityTests();
export { runActivityTests };
