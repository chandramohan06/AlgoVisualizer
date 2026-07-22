/**
 * Binary Heap Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/trees/binaryHeap/generateFrames.test.ts
 */
import { generateBinaryHeapFrames } from './generateFrames';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateBinaryHeapFrames>[0];
  initialValues: number[];
  operationValue?: number;
  heapType?: 'min' | 'max';
  validate: (frames: ReturnType<typeof generateBinaryHeapFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty heap',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 0, 'Empty heap has no nodes');
    },
  },
  {
    name: 'Create heap with values',
    operation: 'create',
    initialValues: [3, 1, 4, 2],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 4, 'Heap has 4 nodes');
    },
  },
  {
    name: 'Build heap from array',
    operation: 'buildHeap',
    initialValues: [4, 3, 2, 1],
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames for build');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 4, 'Heap has 4 nodes after build');
    },
  },
  {
    name: 'Insert',
    operation: 'insert',
    initialValues: [3, 1, 4],
    operationValue: 2,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 4, 'Heap has 4 nodes after insert');
    },
  },
  {
    name: 'Extract',
    operation: 'extract',
    initialValues: [1, 2, 3, 4],
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 3, 'Heap has 3 nodes after extract');
    },
  },
];

function runTests(): void {
  console.log('=== Binary Heap Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, heapType, validate }) => {
    try {
      const frames = generateBinaryHeapFrames(operation, initialValues, operationValue, heapType);
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
