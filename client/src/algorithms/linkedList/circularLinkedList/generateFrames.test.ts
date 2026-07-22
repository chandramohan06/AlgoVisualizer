/**
 * Circular Linked List Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linkedList/circularLinkedList/generateFrames.test.ts
 */
import { generateCircularLinkedListFrames } from './generateFrames.ts';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateCircularLinkedListFrames>[0];
  initialValues: number[];
  operationValue?: number;
  validate: (frames: ReturnType<typeof generateCircularLinkedListFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty list',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[0].data.nodes.length === 0, 'Empty list has no nodes');
    },
  },
  {
    name: 'Create list with values',
    operation: 'create',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[0].data.nodes.length === 3, 'List has 3 nodes');
      console.assert(f[0].data.isCircular === true, 'List is marked as circular');
    },
  },
  {
    name: 'Insert',
    operation: 'insert',
    initialValues: [1, 2],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data.nodes as any[]).length === 3, 'List has 3 nodes after insert');
      console.assert(lastFrame.description.includes('circular'), 'Mentions circular structure');
    },
  },
  {
    name: 'Delete - found',
    operation: 'delete',
    initialValues: [1, 2, 3],
    operationValue: 2,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data.nodes as any[]).length === 2, 'List has 2 nodes after delete');
    },
  },
  {
    name: 'Delete - not found',
    operation: 'delete',
    initialValues: [1, 2, 3],
    operationValue: 5,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Value not found');
    },
  },
  {
    name: 'Search - found',
    operation: 'search',
    initialValues: [1, 2, 3],
    operationValue: 2,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('found'), 'Found the value');
    },
  },
  {
    name: 'Search - not found',
    operation: 'search',
    initialValues: [1, 2, 3],
    operationValue: 5,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Value not found');
    },
  },
  {
    name: 'Traverse',
    operation: 'traverse',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for traversal');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('complete'), 'Traversal complete');
    },
  },
];

function runTests(): void {
  console.log('=== Circular Linked List Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, validate }) => {
    try {
      const frames = generateCircularLinkedListFrames(operation, initialValues, operationValue);
      validate(frames);
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
