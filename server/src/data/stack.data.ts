import { DSAAlgorithmEntry } from './dsa.types';

export const STACK_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'stack-operations',
    title: 'Stack Operations',
    categorySlug: 'stack',
    categoryName: 'Stack',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'LIFO (Last-In First-Out) operations: push, pop, peek, isEmpty.',
    theory: 'Stack is a linear LIFO structure where elements are added and removed from the top pointer.',
    working: 'Push adds item to top. Pop removes item from top. Peek views top item. isEmpty checks if size == 0.',
    javaCode: `import java.util.Stack;
public class Solution {
    public static void main(String[] args) {
        Stack<Integer> st = new Stack<>();
        st.push(10);
        st.push(20);
        System.out.println(st.peek()); // 20
        st.pop();
        System.out.println(st.isEmpty()); // false
    }
}`,
    cppCode: `#include <stack>
#include <iostream>
using namespace std;
int main() {
    stack<int> st;
    st.push(10);
    st.push(20);
    cout << st.top() << endl; // 20
    st.pop();
    cout << st.empty() << endl; // 0
}`,
    pythonCode: `st = []
st.append(10)
st.append(20)
print(st[-1]) # 20
st.pop()
print(len(st) == 0) # False`,
    pseudoCode: `FUNCTION stackOps():
    st = CREATE STACK
    PUSH 10 to st
    PUSH 20 to st
    PRINT PEEK(st)
    POP from st
    PRINT IS_EMPTY(st)
END FUNCTION`,
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(N)',
    applications: ['Function call stack', 'Undo/redo buffer', 'Expression evaluation'],
    interviewQuestions: ['Difference between Stack and Queue', 'Array vs LinkedList stack implementation'],
    commonMistakes: ['Popping from empty stack causing underflow error'],
    leetCodeNumber: 155,
    leetCodeName: 'Min Stack',
    leetCodeDifficulty: 'Medium',
    leetCodePattern: 'Monotonic Stack',
    leetCodeUrl: 'https://leetcode.com/problems/min-stack/',
    sampleInput: [10, 20, 30],
    sampleOutput: '30 (peek)',
    quizzes: [
      { question: 'What principle does Stack follow?', type: 'mcq', options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random', 'Priority'], correctAnswer: 'LIFO (Last In First Out)', explanation: 'Items added last are popped first.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of push and pop in stack?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Top pointer operations execute in constant time.', difficulty: 'easy', points: 10 },
      { question: 'What error occurs when popping from an empty stack?', type: 'mcq', options: ['Stack Underflow', 'Stack Overflow', 'NullPointer', 'Memory Leak'], correctAnswer: 'Stack Underflow', explanation: 'Popping from empty stack causes underflow exception.', difficulty: 'easy', points: 10 },
      { question: 'Data structure used by CPU for function call recursion tracking?', type: 'mcq', options: ['Call Stack', 'Queue', 'Heap', 'Tree'], correctAnswer: 'Call Stack', explanation: 'Call stack manages function activation records and local variables.', difficulty: 'medium', points: 15 },
      { question: 'How to implement Stack using Array?', type: 'mcq', options: ['Maintain top index initialized to -1, push increments top, pop decrements top', 'Use two pointers', 'Sort array', 'Reverse array'], correctAnswer: 'Maintain top index initialized to -1, push increments top, pop decrements top', explanation: 'Top index keeps track of current stack apex.', difficulty: 'medium', points: 15 },
      { question: 'Auxiliary space complexity of storing N elements in Stack?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Stack stores N elements.', difficulty: 'hard', points: 20 },
    ],
  },
];
