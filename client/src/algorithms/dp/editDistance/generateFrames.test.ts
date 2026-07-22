/**
 * Edit Distance Test
 * Run: npx tsx src/algorithms/dp/editDistance/generateFrames.test.ts
 */
import { generateEditDistanceFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateEditDistanceFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Edit Distance 2D DP matrix transitions walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // s1 = 'CAT', s2 = 'CUT' -> Edit distance is 1 (replace A -> U)
      console.assert(f[f.length - 1].description.includes('1'), 'Edit distance resolved to 1');
    },
  },
];

function runEditDistanceTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateEditDistanceFrames('CAT', 'CUT');
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Edit Distance');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runEditDistanceTests();
export { runEditDistanceTests };
