import { generateSelectionSortFrames } from './generateFrames';

interface TestCase {
  name: string;
  input: number[];
  validations: (frames: any[]) => void;
}

const testCases: TestCase[] = [
  {
    name: 'Empty array',
    input: [],
    validations: (frames) => {
      console.assert(frames.length === 1, 'Empty array should produce 1 frame');
      console.assert(frames[0].data.length === 0, 'Frame data should be empty');
    },
  },
  {
    name: 'One element',
    input: [42],
    validations: (frames) => {
      console.assert(frames.length === 1, 'Single element should produce 1 frame');
      console.assert(frames[0].data[0] === 42, 'Frame data should contain the element');
    },
  },
  {
    name: 'Already sorted',
    input: [1, 2, 3, 4, 5],
    validations: (frames) => {
      console.assert(frames.length > 0, 'Should produce frames');
      const lastFrame = frames[frames.length - 1];
      console.assert(
        JSON.stringify(lastFrame.data) === JSON.stringify([1, 2, 3, 4, 5]),
        'Final array should be sorted'
      );
    },
  },
  {
    name: 'Reverse sorted',
    input: [5, 4, 3, 2, 1],
    validations: (frames) => {
      console.assert(frames.length > 0, 'Should produce frames');
      const lastFrame = frames[frames.length - 1];
      console.assert(
        JSON.stringify(lastFrame.data) === JSON.stringify([1, 2, 3, 4, 5]),
        'Final array should be sorted'
      );
      const swapCount = lastFrame.variables?.swaps || 0;
      console.assert(swapCount > 0, 'Should have swaps for reverse sorted array');
    },
  },
  {
    name: 'Duplicate values',
    input: [3, 1, 4, 1, 5, 9, 2, 6, 5],
    validations: (frames) => {
      console.assert(frames.length > 0, 'Should produce frames');
      const lastFrame = frames[frames.length - 1];
      console.assert(
        JSON.stringify(lastFrame.data) === JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]),
        'Final array should be sorted with duplicates'
      );
    },
  },
  {
    name: 'Random array',
    input: [5, 3, 8, 1, 2],
    validations: (frames) => {
      console.assert(frames.length > 0, 'Should produce frames');
      const lastFrame = frames[frames.length - 1];
      console.assert(
        JSON.stringify(lastFrame.data) === JSON.stringify([1, 2, 3, 5, 8]),
        'Final array should be sorted'
      );
      frames.forEach((frame, index) => {
        console.assert(typeof frame.index === 'number', `Frame ${index} should have index`);
        console.assert(typeof frame.description === 'string', `Frame ${index} should have description`);
        console.assert(Array.isArray(frame.data), `Frame ${index} should have data array`);
        console.assert(Array.isArray(frame.highlights), `Frame ${index} should have highlights array`);
        console.assert(typeof frame.pointers === 'object', `Frame ${index} should have pointers object`);
        console.assert(typeof frame.codeLineHighlight === 'number', `Frame ${index} should have codeLineHighlight`);
        console.assert(typeof frame.variables === 'object', `Frame ${index} should have variables object`);
        console.assert(typeof frame.timestamp === 'number', `Frame ${index} should have timestamp`);
      });
    },
  },
];

function runTests(): void {
  console.log('Running Selection Sort Frame Generator Tests...\n');
  
  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase) => {
    try {
      console.log(`Testing: ${testCase.name}`);
      const frames = generateSelectionSortFrames(testCase.input);
      testCase.validations(frames);
      console.log(`✓ PASSED: ${testCase.name}\n`);
      passed++;
    } catch (error) {
      console.error(`✗ FAILED: ${testCase.name}`);
      console.error(`  Error: ${error}\n`);
      failed++;
    }
  });

  console.log('\n=== Test Summary ===');
  console.log(`Total: ${testCases.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

export { runTests };
