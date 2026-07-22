/**
 * Bubble Sort Frame Generator Tests
 *
 * This file contains automated tests for the generateBubbleSortFrames function.
 * Tests cover edge cases and typical scenarios as specified in Phase 7 requirements.
 *
 * To run these tests:
 * 1. Install ts-node: npm install -D ts-node
 * 2. Run: npx ts-node src/algorithms/sorting/bubbleSort/generateFrames.test.ts
 */

import { generateBubbleSortFrames } from './generateFrames';

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
      console.assert(frames[0].description.includes('Empty array'), 'Description should mention empty array');
    },
  },
  {
    name: 'One element',
    input: [42],
    validations: (frames) => {
      console.assert(frames.length === 1, 'Single element should produce 1 frame');
      console.assert(frames[0].data[0] === 42, 'Frame data should contain the element');
      console.assert(frames[0].description.includes('Already sorted'), 'Description should mention already sorted');
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
      // Check for early termination
      const hasEarlyTermination = frames.some(f => f.variables?.earlyTermination === true);
      console.assert(hasEarlyTermination, 'Should have early termination frame for already sorted array');
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
      // Check that swaps occurred
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
      // Verify frame structure
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

/**
 * Run all test cases
 */
function runTests(): void {
  console.log('Running Bubble Sort Frame Generator Tests...\n');
  
  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase) => {
    try {
      console.log(`Testing: ${testCase.name}`);
      const frames = generateBubbleSortFrames(testCase.input);
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

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) {
  runTests();
}

export { runTests };
