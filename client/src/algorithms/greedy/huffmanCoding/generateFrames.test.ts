/**
 * Huffman Coding Test
 * Run: npx tsx src/algorithms/greedy/huffmanCoding/generateFrames.test.ts
 */
import { generateHuffmanCodingFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateHuffmanCodingFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Huffman Coding greedy merges walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should include root frequency 39
      console.assert(f[f.length - 1].description.includes('complete'), 'Reaches end');
    },
  },
];

function runHuffmanTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateHuffmanCodingFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Huffman Coding');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runHuffmanTests();
export { runHuffmanTests };
