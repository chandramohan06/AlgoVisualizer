import { type VisualizationFrame } from '@store/visualizationStore';

/**
 * Mock demo frames — NOT a real algorithm.
 * These frames exist solely to validate that the visualization engine
 * renders correctly: highlights, pointers, code line sync, variable updates.
 *
 * How to create real algorithm frames in Phase 7+:
 *   1. Write a pure function (e.g. `generateBubbleSortFrames(data: number[])`)
 *   2. Return an array of VisualizationFrame objects.
 *   3. Pass them to `useVisualization(frames)` or `setFrames(frames)` on mount.
 *   4. The engine handles all playback — no engine changes required.
 */
export const DEMO_FRAMES: VisualizationFrame[] = [
  {
    index: 0,
    description: 'Engine initialized. Array loaded into memory. Scanning from left to right.',
    data: [5, 3, 8, 1, 2],
    highlights: [],
    pointers: { i: 0 },
    codeLineHighlight: 1,
    variables: { swaps: 0, comparisons: 0 },
    timestamp: 0,
  },
  {
    index: 1,
    description: 'Comparing element at index 0 (value: 5) with element at index 1 (value: 3). 5 > 3, so a swap is required.',
    data: [5, 3, 8, 1, 2],
    highlights: [0, 1],
    pointers: { i: 0, j: 1 },
    codeLineHighlight: 3,
    variables: { swaps: 0, comparisons: 1, a: 5, b: 3 },
    timestamp: 600,
  },
  {
    index: 2,
    description: 'Swapping elements at index 0 and 1. Array state updated.',
    data: [3, 5, 8, 1, 2],
    highlights: [0, 1],
    pointers: { i: 0, j: 1 },
    codeLineHighlight: 4,
    variables: { swaps: 1, comparisons: 1, temp: 5 },
    timestamp: 1200,
  },
  {
    index: 3,
    description: 'Moving forward. Comparing element at index 1 (value: 5) with element at index 2 (value: 8). 5 < 8, no swap needed.',
    data: [3, 5, 8, 1, 2],
    highlights: [1, 2],
    pointers: { i: 1, j: 2 },
    codeLineHighlight: 3,
    variables: { swaps: 1, comparisons: 2, a: 5, b: 8 },
    timestamp: 1800,
  },
  {
    index: 4,
    description: 'Comparing element at index 2 (value: 8) with element at index 3 (value: 1). 8 > 1, swap required.',
    data: [3, 5, 8, 1, 2],
    highlights: [2, 3],
    pointers: { i: 2, j: 3 },
    codeLineHighlight: 3,
    variables: { swaps: 1, comparisons: 3, a: 8, b: 1 },
    timestamp: 2400,
  },
  {
    index: 5,
    description: 'Swapping elements at index 2 and 3.',
    data: [3, 5, 1, 8, 2],
    highlights: [2, 3],
    pointers: { i: 2, j: 3 },
    codeLineHighlight: 4,
    variables: { swaps: 2, comparisons: 3, temp: 8 },
    timestamp: 3000,
  },
  {
    index: 6,
    description: 'Comparing element at index 3 (value: 8) with element at index 4 (value: 2). 8 > 2, swap required.',
    data: [3, 5, 1, 8, 2],
    highlights: [3, 4],
    pointers: { i: 3, j: 4 },
    codeLineHighlight: 3,
    variables: { swaps: 2, comparisons: 4, a: 8, b: 2 },
    timestamp: 3600,
  },
  {
    index: 7,
    description: 'Swapping elements at index 3 and 4. Largest element (8) has bubbled to its final sorted position.',
    data: [3, 5, 1, 2, 8],
    highlights: [3, 4],
    pointers: { i: 3, j: 4 },
    codeLineHighlight: 4,
    variables: { swaps: 3, comparisons: 4, temp: 8 },
    timestamp: 4200,
  },
  {
    index: 8,
    description: 'First pass complete. Element 8 is now in its sorted position (index 4). Starting second pass.',
    data: [3, 5, 1, 2, 8],
    highlights: [4],
    pointers: { i: 0 },
    codeLineHighlight: 2,
    variables: { swaps: 3, comparisons: 4, pass: 2 },
    timestamp: 4800,
  },
  {
    index: 9,
    description: 'All elements are now in their correct sorted positions. Algorithm complete. Final array: [1, 2, 3, 5, 8].',
    data: [1, 2, 3, 5, 8],
    highlights: [0, 1, 2, 3, 4],
    pointers: {},
    codeLineHighlight: 7,
    variables: { swaps: 6, comparisons: 10, done: true },
    timestamp: 5400,
  },
];

export const DEMO_JAVA_CODE = `void sort(int[] arr) {
  for (int i = 0; i < arr.length - 1; i++) {
    for (int j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;

export const DEMO_CPP_CODE = `void sort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
}`;

export const DEMO_PSEUDO_CODE = `PROCEDURE Sort(array):
  FOR i FROM 0 TO length(array) - 2:
    FOR j FROM 0 TO length(array) - i - 2:
      IF array[j] > array[j+1]:
        SWAP array[j] AND array[j+1]
      END IF
    END FOR
  END FOR
END PROCEDURE`;

export const DEMO_METADATA = {
  title: 'Engine Demo — Visualization Proof',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  difficulty: 'easy' as const,
  category: 'Demo',
  description: 'This demo validates the visualization engine. It shows 10 mock frames of array traversal without implementing a real algorithm.',
};
