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
  },
];
