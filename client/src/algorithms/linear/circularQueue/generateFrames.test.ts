/**
 * Circular Queue Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linear/circularQueue/generateFrames.test.ts
 */
import { generateCircularQueueFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateCircularQueueFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Circular Queue frame generation operations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 6, 'Circular Queue capacity is 6');
      console.assert(f[f.length - 1].description.includes('Underflow'), 'Includes underflow test');
    },
  },
];

function runCircularQueueTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateCircularQueueFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Circular Queue');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runCircularQueueTests();
export { runCircularQueueTests };
