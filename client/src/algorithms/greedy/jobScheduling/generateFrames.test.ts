/**
 * Job Scheduling Test
 * Run: npx tsx src/algorithms/greedy/jobScheduling/generateFrames.test.ts
 */
import { generateJobSchedulingFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateJobSchedulingFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Job Scheduling greedy timeline walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should include total profit 142
      console.assert(f[f.length - 1].description.includes('142'), 'Max profit resolved to 142');
    },
  },
];

function runJobSchedulingTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateJobSchedulingFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Job Scheduling');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runJobSchedulingTests();
export { runJobSchedulingTests };
