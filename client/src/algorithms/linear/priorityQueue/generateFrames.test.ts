/**
 * Priority Queue Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linear/priorityQueue/generateFrames.test.ts
 */
import { generatePriorityQueueFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generatePriorityQueueFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Priority Queue frame generation operations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('Underflow'), 'Includes underflow test');
    },
  },
];

function runPriorityQueueTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generatePriorityQueueFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Priority Queue');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runPriorityQueueTests();
export { runPriorityQueueTests };
