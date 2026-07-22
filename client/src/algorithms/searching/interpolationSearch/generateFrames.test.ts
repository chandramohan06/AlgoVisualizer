/**
 * Interpolation Search Frame Generator Tests
 *
 * Run: npx ts-node src/algorithms/searching/interpolationSearch/generateFrames.test.ts
 */
import { generateInterpolationSearchFrames } from './generateFrames.ts';

interface TestCase {
  name: string;
  input: number[];
  target: number;
  validate: (frames: ReturnType<typeof generateInterpolationSearchFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Empty array',
    input: [], target: 5,
    validate: (f) => { console.assert(f.length === 1, 'Empty → 1 frame'); },
  },
  {
    name: 'Single element — found',
    input: [50], target: 50,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Found at 0');
    },
  },
  {
    name: 'Uniform distribution — found',
    input: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], target: 70,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 6, 'Found at 6');
    },
  },
  {
    name: 'Target at beginning',
    input: [10, 20, 30, 40, 50], target: 10,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Index 0');
    },
  },
  {
    name: 'Target at end',
    input: [10, 20, 30, 40, 50], target: 50,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 4, 'Index 4');
    },
  },
  {
    name: 'Target absent',
    input: [10, 20, 30, 40, 50], target: 25,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found');
    },
  },
  {
    name: 'Target out of range',
    input: [10, 20, 30, 40, 50], target: 99,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found');
    },
  },
];

function runTests(): void {
  console.log('=== Interpolation Search Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, input, target, validate }) => {
    try {
      validate(generateInterpolationSearchFrames(input, target));
      console.log(`✓ ${name}`);
      passed++;
    } catch (e) {
      console.error(`✗ ${name}: ${e}`);
      failed++;
    }
  });
  console.log(`\nPassed: ${passed}/${cases.length}`);
  if (failed > 0) process.exit(1);
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runTests();
export { runTests };
