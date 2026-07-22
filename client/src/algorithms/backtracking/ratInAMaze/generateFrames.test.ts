/**
 * Rat in a Maze Test
 * Run: npx tsx src/algorithms/backtracking/ratInAMaze/generateFrames.test.ts
 */
import { generateRatInAMazeFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateRatInAMazeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Rat in a maze path walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('exit path'), 'Finds exit path');
    },
  },
];

function runRatInAMazeTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateRatInAMazeFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Rat in a Maze');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runRatInAMazeTests();
export { runRatInAMazeTests };
