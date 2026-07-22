/**
 * Queue Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linear/queue/generateFrames.test.ts
 */
import { generateQueueFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateQueueFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Queue frame generation operations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 5, 'Queue capacity is 5');
      console.assert(f[f.length - 1].description.includes('Underflow'), 'Includes underflow test');
    },
  },
];

function runQueueTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateQueueFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Queue');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runQueueTests();
export { runQueueTests };
