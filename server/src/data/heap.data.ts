import { DSAAlgorithmEntry } from './dsa.types';

export const HEAP_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'heap-operations',
    title: 'Min / Max Heap Operations & Heapify',
    categorySlug: 'heap',
    categoryName: 'Heap',
    topicGroup: 'Basic',
    difficulty: 'medium',
    description: 'Binary Heap operations: Insert (sift-up), Extract Min/Max (sift-down), and O(N) Heapify.',
    theory: 'Complete binary tree stored as an array where parent at i has children at 2i+1 and 2i+2. Min-heap keeps parent <= children.',
    working: 'Insert appends to end and sift-up. Extract swaps root with last element, pops last, and sift-down root.',
    javaCode: `import java.util.PriorityQueue;
public class Solution {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(30);
        minHeap.add(10);
        minHeap.add(20);
        System.out.println(minHeap.poll()); // 10
    }
}`,
    cppCode: `#include <queue>
#include <iostream>
using namespace std;
int main() {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(20);
    cout << minHeap.top() << endl; // 10
    minHeap.pop();
}`,
    pythonCode: `import heapq
heap = []
heapq.heappush(heap, 30)
heapq.heappush(heap, 10)
heapq.heappush(heap, 20)
print(heapq.heappop(heap)) # 10`,
    pseudoCode: `FUNCTION heapOps():
    heap = CREATE MIN_HEAP
    INSERT 30, 10, 20
    MIN_VAL = EXTRACT_MIN(heap)
    PRINT MIN_VAL
END FUNCTION`,
    timeComplexity: 'O(log N) insert/extract, O(N) build heap',
    spaceComplexity: 'O(N)',
    applications: ['Priority Task Schedulers', 'Dijkstra Shortest Path', 'Top K Frequent Elements'],
    interviewTips: ['Build heap from unsorted array takes O(N) time using bottom-up heapify, NOT O(N log N)'],
    commonMistakes: ['Index out-of-bounds calculating left child 2i+1 and right child 2i+2'],
    leetCodeNumber: 215,
    leetCodeName: 'Kth Largest Element in an Array',
    leetCodeDifficulty: 'Medium',
    leetCodePattern: 'Heap / Priority Queue',
    leetCodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    sampleInput: [30, 10, 20],
    sampleOutput: '10 (min)',
    quizzes: [
      { question: 'Time complexity of building a Heap from unsorted array using bottom-up Heapify?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Mathematical sum of height steps yields linear O(N) bound.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of inserting an element into a Heap of size N?', type: 'mcq', options: ['O(log N)', 'O(1)', 'O(N)', 'O(N²)'], correctAnswer: 'O(log N)', explanation: 'Sift-up traverses at most tree height log N.', difficulty: 'easy', points: 10 },
      { question: 'Formula to locate parent index of node at index i in 0-indexed array Heap?', type: 'mcq', options: ['(i - 1) / 2', 'i / 2', '(i + 1) / 2', '2 * i'], correctAnswer: '(i - 1) / 2', explanation: 'Parent index equals floor((i - 1) / 2).', difficulty: 'easy', points: 10 },
      { question: 'What heap data structure is used to maintain running median of a stream?', type: 'mcq', options: ['Two heaps: Max-Heap for lower half, Min-Heap for upper half', 'Single array', 'BST', 'Stack'], correctAnswer: 'Two heaps: Max-Heap for lower half, Min-Heap for upper half', explanation: 'Balanced dual heaps allow O(1) median access.', difficulty: 'medium', points: 15 },
      { question: 'Time complexity of Heap Sort on N items?', type: 'mcq', options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N log N)', explanation: 'Build heap O(N) + N extracts taking O(log N) each = O(N log N).', difficulty: 'medium', points: 15 },
      { question: 'Is Heap Sort an in-place sorting algorithm?', type: 'mcq', options: ['Yes, requires O(1) auxiliary space', 'No', 'Only for Min Heap', 'Requires O(N) space'], correctAnswer: 'Yes, requires O(1) auxiliary space', explanation: 'Heap sort rearranges elements inside the original array.', difficulty: 'hard', points: 20 },
    ],
  },
];
