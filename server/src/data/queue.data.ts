import { DSAAlgorithmEntry } from './dsa.types';

export const QUEUE_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'queue-operations',
    title: 'Queue Operations',
    categorySlug: 'queue',
    categoryName: 'Queue',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'FIFO (First-In First-Out) operations: enqueue, dequeue, peek, isEmpty.',
    theory: 'Queue is a linear FIFO structure where elements are added at rear and removed from front.',
    working: 'Enqueue adds to rear. Dequeue removes from front. Front returns head item. isEmpty checks size == 0.',
    javaCode: `import java.util.LinkedList;
import java.util.Queue;
public class Solution {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(10);
        q.offer(20);
        System.out.println(q.peek()); // 10
        q.poll();
        System.out.println(q.isEmpty()); // false
    }
}`,
    cppCode: `#include <queue>
#include <iostream>
using namespace std;
int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    cout << q.front() << endl; // 10
    q.pop();
    cout << q.empty() << endl; // 0
}`,
    pythonCode: `from collections import deque
q = deque()
q.append(10)
q.append(20)
print(q[0]) # 10
q.popleft()
print(len(q) == 0) # False`,
    pseudoCode: `FUNCTION queueOps():
    q = CREATE QUEUE
    ENQUEUE 10 to q
    ENQUEUE 20 to q
    PRINT FRONT(q)
    DEQUEUE from q
    PRINT IS_EMPTY(q)
END FUNCTION`,
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(N)',
    applications: ['Breadth-First Search (BFS)', 'CPU task scheduling', 'Printer job queues'],
    interviewTips: ['LinkedList or Circular Array implementation provides O(1) enqueue and dequeue'],
    commonMistakes: ['Dequeuing from empty queue causing underflow error'],
    leetCodeNumber: 225,
    leetCodeName: 'Implement Stack using Queues',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: 'Design',
    leetCodeUrl: 'https://leetcode.com/problems/implement-stack-using-queues/',
    sampleInput: [10, 20, 30],
    sampleOutput: '10 (front)',
    quizzes: [
      { question: 'What principle does Queue follow?', type: 'mcq', options: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'Random', 'Sorted'], correctAnswer: 'FIFO (First In First Out)', explanation: 'First element added is first element removed.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of enqueue and dequeue in LinkedList Queue?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Head and tail pointer updates take O(1) constant time.', difficulty: 'easy', points: 10 },
      { question: 'Where are new elements added in a Queue?', type: 'mcq', options: ['Rear (tail)', 'Front (head)', 'Middle', 'Random index'], correctAnswer: 'Rear (tail)', explanation: 'Enqueue adds elements at the rear.', difficulty: 'easy', points: 10 },
      { question: 'Primary advantage of Circular Queue over Linear Array Queue?', type: 'mcq', options: ['Reuses dequeued space without shifting elements', 'O(1) search', 'Sorted order', 'Uses less CPU'], correctAnswer: 'Reuses dequeued space without shifting elements', explanation: 'Circular modulo arithmetic wraps around head/tail pointers.', difficulty: 'medium', points: 15 },
      { question: 'Which graph traversal algorithm relies on a Queue?', type: 'mcq', options: ['BFS (Breadth First Search)', 'DFS', 'Dijkstra', 'Kruskal'], correctAnswer: 'BFS (Breadth First Search)', explanation: 'BFS processes vertices layer-by-layer using FIFO queue.', difficulty: 'medium', points: 15 },
      { question: 'How to implement Queue using two Stacks?', type: 'mcq', options: ['Stack 1 for enqueue, Stack 2 for dequeue (transfer when Stack 2 empty)', 'Use 1 stack', 'Sort stack', 'Reverse stack'], correctAnswer: 'Stack 1 for enqueue, Stack 2 for dequeue (transfer when Stack 2 empty)', explanation: 'Two LIFO stacks combine to produce FIFO behavior in amortized O(1) time.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Implement Queue using Stacks (LeetCode 232)', description: 'Implement FIFO queue using two stacks.', difficulty: 'easy', starterCode: { java: 'class MyQueue {\n  public MyQueue() {}\n  public void push(int x) {}\n  public int pop() { return 0; }\n  public int peek() { return 0; }\n  public boolean empty() { return false; }\n}', cpp: 'class MyQueue {\npublic:\n  MyQueue() {}\n  void push(int x) {}\n  int pop() { return 0; }\n  int peek() { return 0; }\n  bool empty() { return false; }\n};', python: 'class MyQueue:\n    def __init__(self):\n        pass' }, testCases: [{ input: 'push(1),push(2),peek(),pop(),empty()', expectedOutput: '1, 1, false' }], explanation: 'Amortized O(1) push and pop using input/output stacks.', externalLink: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
      { title: 'Design Circular Queue (LeetCode 622)', description: 'Design ring buffer circular queue.', difficulty: 'medium', starterCode: { java: 'class MyCircularQueue {\n  public MyCircularQueue(int k) {}\n  public boolean enQueue(int value) { return false; }\n  public boolean deQueue() { return false; }\n  public int Front() { return 0; }\n  public int Rear() { return 0; }\n}', cpp: 'class MyCircularQueue {\npublic:\n  MyCircularQueue(int k) {}\n  bool enQueue(int value) { return false; }\n  bool deQueue() { return false; }\n  int Front() { return 0; }\n  int Rear() { return 0; }\n};', python: 'class MyCircularQueue:\n    def __init__(self, k):\n        pass' }, testCases: [{ input: 'enQueue(1),enQueue(2),Front()', expectedOutput: 'true, true, 1' }], solution: 'Array with front, rear pointers and modulo size.', externalLink: 'https://leetcode.com/problems/design-circular-queue/' },
      { title: 'Design Circular Deque (LeetCode 641)', description: 'Design double-ended circular queue.', difficulty: 'hard', starterCode: { java: 'class MyCircularDeque {\n  public MyCircularDeque(int k) {}\n  public boolean insertFront(int value) { return false; }\n  public boolean insertLast(int value) { return false; }\n}', cpp: 'class MyCircularDeque {\npublic:\n  MyCircularDeque(int k) {}\n  bool insertFront(int value) { return false; }\n  bool insertLast(int value) { return false; }\n};', python: 'class MyCircularDeque:\n    def __init__(self, k):\n        pass' }, testCases: [{ input: 'insertLast(1),insertLast(2),insertFront(3)', expectedOutput: 'true, true, true' }], solution: 'Circular array with front and rear wrapping indices.', externalLink: 'https://leetcode.com/problems/design-circular-deque/' },
    ],
  },
];
