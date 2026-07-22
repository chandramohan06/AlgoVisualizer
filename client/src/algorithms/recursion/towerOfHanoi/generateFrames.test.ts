/**
 * Tower of Hanoi Test
 * Run: npx tsx src/algorithms/recursion/towerOfHanoi/generateFrames.test.ts
 */
import { generateTowerOfHanoiFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateTowerOfHanoiFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Tower of Hanoi moves sequence walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // For 3 disks, the total number of moves is 2^3 - 1 = 7.
      // So there should be initial frame + 7 move frames + final frame = 9 frames.
      console.assert(f.length === 9, `Expected 9 frames, got ${f.length}`);
      console.assert(f[f.length - 1].description.includes('Peg C'), 'Ended on Peg C');
    },
  },
];

function runHanoiTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateTowerOfHanoiFrames(3);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Tower of Hanoi');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runHanoiTests();
export { runHanoiTests };
