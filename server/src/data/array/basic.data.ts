import { ArrayAlgorithmData } from '../array.types';

export const BASIC_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'array-traversal',
    title: 'Array Traversal',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Sequential visiting of each element in an array from beginning to end.',
    theory: 'Array Traversal involves visiting every element of an array in linear order from index 0 to size-1. It serves as the foundation for search, transformation, and reduction algorithms.',
    javaCode: `public class ArrayTraversal {
    public static void traverse(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Element at index " + i + ": " + arr[i]);
        }
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

void traverse(const vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); ++i) {
        cout << "Element at index " << i << ": " << arr[i] << endl;
    }
}`,
    pseudoCode: `FUNCTION traverse(arr):
    FOR i FROM 0 TO length(arr) - 1:
        PRINT arr[i]
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Displaying list elements', 'Calculating sum/average', 'Linear searches'],
    interviewTips: ['Ensure off-by-one errors are avoided (0 to N-1)', 'Discuss cache locality of sequential access'],
    sampleInput: [10, 20, 30, 40, 50],
    sampleOutput: '10 20 30 40 50',
    quizzes: [
      { question: 'What is the time complexity to traverse an array of N elements?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Visiting every element once takes linear time proportional to N.', difficulty: 'easy', points: 10 },
      { question: 'What is the index of the last element in an array of size N?', type: 'mcq', options: ['N', 'N - 1', 'N + 1', '0'], correctAnswer: 'N - 1', explanation: 'Arrays in Java/C++ are zero-indexed, making the last index N - 1.', difficulty: 'easy', points: 10 },
      { question: 'What is the space complexity of Array Traversal?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Traversal requires no extra memory allocation.', difficulty: 'easy', points: 10 },
      { question: 'In contiguous memory, how is the memory address of arr[i] computed?', type: 'mcq', options: ['base_address + i', 'base_address + i * size_of_type', 'base_address * i', 'base_address + size_of_type'], correctAnswer: 'base_address + i * size_of_type', explanation: 'Each element offset is multiplied by byte size of data type.', difficulty: 'medium', points: 15 },
      { question: 'Why is array traversal cache-friendly compared to linked lists?', type: 'mcq', options: ['Uses less memory', 'Elements reside in contiguous memory locations', 'Uses recursion', 'Supports hardware hashing'], correctAnswer: 'Elements reside in contiguous memory locations', explanation: 'Contiguous memory leverages spatial locality in CPU cache lines.', difficulty: 'medium', points: 15 },
      { question: 'What happens if you access arr[N] in Java?', type: 'mcq', options: ['Returns 0', 'Returns last element', 'Throws ArrayIndexOutOfBoundsException', 'Causes segmentation fault'], correctAnswer: 'Throws ArrayIndexOutOfBoundsException', explanation: 'Java throws explicit runtime exception for out-of-bound array accesses.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Print Array Elements', description: 'Write a program to traverse an array and return space-separated string of elements.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public String solve(int[] nums) {\n    return "";\n  }\n}', cpp: 'string solve(vector<int>& nums) {\n  return "";\n}' }, testCases: [{ input: '[1, 2, 3]', expectedOutput: '"1 2 3"' }], solution: 'Join elements with space.', externalLink: 'https://leetcode.com/explore/' },
      { title: 'Sum of Array Elements', description: 'Find the total sum of all elements in an integer array.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int sum(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int sum(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[1, 2, 3, 4]', expectedOutput: '10' }], solution: 'Accumulate array items.', externalLink: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
      { title: 'Count Even Numbers', description: 'Count how many even integers exist in the array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int countEven(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int countEven(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[2, 5, 8, 11]', expectedOutput: '2' }], solution: 'Filter elements modulo 2 == 0.', externalLink: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/' },
    ],
  },
  {
    slug: 'insert-at-beginning',
    title: 'Insert at Beginning',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Insert an element at index 0 by shifting existing elements one position to the right.',
    theory: 'Inserting at the beginning requires making room at index 0 by shifting all N existing elements to index i+1. This results in O(N) operations in fixed-size contiguous memory.',
    javaCode: `public class InsertBeginning {
    public static int[] insert(int[] arr, int val) {
        int[] newArr = new int[arr.length + 1];
        newArr[0] = val;
        for (int i = 0; i < arr.length; i++) {
            newArr[i + 1] = arr[i];
        }
        return newArr;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

vector<int> insertBeginning(vector<int> arr, int val) {
    arr.insert(arr.begin(), val);
    return arr;
}`,
    pseudoCode: `FUNCTION insertBeginning(arr, val):
    CREATE newArr of size length(arr) + 1
    newArr[0] = val
    FOR i FROM 0 TO length(arr) - 1:
        newArr[i + 1] = arr[i]
    RETURN newArr
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    applications: ['Prepending elements to buffer', 'Priority queues in reverse order'],
    interviewTips: ['Explain why linked list prepend is O(1) while array prepend is O(N)'],
    sampleInput: [1, 2, 3],
    sampleOutput: '99 1 2 3',
    quizzes: [
      { question: 'Why does inserting at the beginning of an array take O(N) time?', type: 'mcq', options: ['Must rehash elements', 'All existing elements must shift right', 'Requires full sorting', 'Takes binary search time'], correctAnswer: 'All existing elements must shift right', explanation: 'Index 0 insertion forces N elements to move right by 1 index.', difficulty: 'easy', points: 10 },
      { question: 'What is the new index of element initially at index 0 after insertion?', type: 'mcq', options: ['0', '1', '2', 'N'], correctAnswer: '1', explanation: 'All original elements shift index by +1.', difficulty: 'easy', points: 10 },
      { question: 'How can you insert at beginning in O(1) time?', type: 'mcq', options: ['Using fixed Array', 'Using Deque or Linked List', 'Using Binary Tree', 'Using Hash Table'], correctAnswer: 'Using Deque or Linked List', explanation: 'Deque / Doubly Linked List supports O(1) head insertion.', difficulty: 'easy', points: 10 },
      { question: 'What is the worst-case space complexity when allocating a new array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Creating a new array of size N+1 requires O(N) extra space.', difficulty: 'medium', points: 15 },
      { question: 'In C++ vector::insert at begin(), what happens internally?', type: 'mcq', options: ['O(1) pointer swap', 'Elements copied right, reallocation if capacity exceeded', 'Reverses vector', 'Bitwise shift'], correctAnswer: 'Elements copied right, reallocation if capacity exceeded', explanation: 'vector shifts elements and reallocates if capacity is insufficient.', difficulty: 'medium', points: 15 },
      { question: 'If inserting 1,000 elements one-by-one at beginning of empty array, total time is?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N²)', explanation: '1 + 2 + ... + N operations = N(N+1)/2 = O(N²).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Prepend Element', description: 'Insert target element at beginning of array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] prepend(int[] arr, int val) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> prepend(vector<int> arr, int val) {\n  return {};\n}' }, testCases: [{ input: '[2, 3], val=1', expectedOutput: '[1, 2, 3]' }], solution: 'Shift elements right.', externalLink: 'https://leetcode.com/' },
      { title: 'Batch Prepend', description: 'Prepend multiple elements to an array in order.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] batchPrepend(int[] arr, int[] items) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> batchPrepend(vector<int> arr, vector<int> items) {\n  return {};\n}' }, testCases: [{ input: '[3, 4], items=[1, 2]', expectedOutput: '[1, 2, 3, 4]' }], solution: 'Concatenate items before arr.', externalLink: 'https://leetcode.com/' },
      { title: 'Optimize Dynamic Head Insert', description: 'Simulate head insertion using ring buffer logic in O(1) amortized time.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] ringInsert(int[] arr, int val) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> ringInsert(vector<int> arr, int val) {\n  return {};\n}' }, testCases: [{ input: '[1, 2], val=0', expectedOutput: '[0, 1, 2]' }], solution: 'Use head pointer offset.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'insert-at-end',
    title: 'Insert at End',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Append an element to the end of an array.',
    theory: 'Inserting at the end places the element at index size. In dynamic arrays, this is O(1) amortized.',
    javaCode: `public class InsertEnd {
    public static int[] insert(int[] arr, int val) {
        int[] newArr = new int[arr.length + 1];
        System.arraycopy(arr, 0, newArr, 0, arr.length);
        newArr[arr.length] = val;
        return newArr;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

void insertEnd(vector<int>& arr, int val) {
    arr.push_back(val);
}`,
    pseudoCode: `FUNCTION insertEnd(arr, val):
    arr[length(arr)] = val
    INCREMENT length(arr)
END FUNCTION`,
    timeComplexity: 'O(1) Amortized',
    spaceComplexity: 'O(1)',
    applications: ['Pushing to stack', 'Appending records'],
    interviewTips: ['Discuss amortized analysis of std::vector doubling strategy'],
    sampleInput: [10, 20],
    sampleOutput: '10 20 30',
    quizzes: [
      { question: 'What is the amortized time complexity of push_back in dynamic array?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Doubling capacity ensures average constant insertion cost.', difficulty: 'easy', points: 10 },
      { question: 'When capacity is exceeded in std::vector, by what factor does capacity usually grow?', type: 'mcq', options: ['+1', '2x (or 1.5x)', '10x', 'Remains same'], correctAnswer: '2x (or 1.5x)', explanation: 'Geometric growth factor guarantees O(1) amortized append.', difficulty: 'easy', points: 10 },
      { question: 'What is worst-case time for push_back when vector resizes?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Resizing requires copying all N elements to new memory.', difficulty: 'easy', points: 10 },
      { question: 'Why is geometric resizing preferred over constant increment (+K)?', type: 'mcq', options: ['Uses less space', 'Geometric growth gives O(1) amortized, +K gives O(N)', 'Faster indexing', 'Prevents memory fragmentation'], correctAnswer: 'Geometric growth gives O(1) amortized, +K gives O(N)', explanation: 'Constant increments cause total copy operations of O(N²).', difficulty: 'medium', points: 15 },
      { question: 'In fixed-size native array `int arr[5]`, can you insert at end if full?', type: 'mcq', options: ['Yes', 'No, causes overflow', 'Automatically doubles', 'Replaces first item'], correctAnswer: 'No, causes overflow', explanation: 'Fixed-size arrays cannot extend beyond allocated bounds.', difficulty: 'medium', points: 15 },
      { question: 'If initial capacity = 1 and doubles each resize, how many copies occur to insert N items?', type: 'mcq', options: ['N', '2N - 1', 'N²', 'N log N'], correctAnswer: '2N - 1', explanation: 'Sum of geometric progression 1 + 2 + 4 + ... + N/2 < 2N.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Append Element', description: 'Append value to end of array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] append(int[] arr, int val) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> append(vector<int> arr, int val) {\n  return {};\n}' }, testCases: [{ input: '[1, 2], val=3', expectedOutput: '[1, 2, 3]' }], solution: 'Copy array and add item at end.', externalLink: 'https://leetcode.com/' },
      { title: 'Dynamic Array Append', description: 'Simulate vector append with capacity doubling.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int getResizes(int n) {\n    return 0;\n  }\n}', cpp: 'int getResizes(int n) {\n  return 0;\n}' }, testCases: [{ input: '5', expectedOutput: '3' }], solution: 'Track capacity double count.', externalLink: 'https://leetcode.com/' },
      { title: 'Concatenate Two Arrays', description: 'Append all elements of second array to end of first.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] concat(int[] a, int[] b) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> concat(vector<int>& a, vector<int>& b) {\n  return {};\n}' }, testCases: [{ input: '[1,2], [3,4]', expectedOutput: '[1,2,3,4]' }], solution: 'Copy both into new array.', externalLink: 'https://leetcode.com/problems/concatenation-of-array/' },
    ],
  },
  {
    slug: 'insert-at-index',
    title: 'Insert at Index',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Insert an element at a specified valid index k in an array.',
    theory: 'Inserting at index k requires shifting elements from index k to N-1 one position to the right.',
    javaCode: `public class InsertAtIndex {
    public static int[] insert(int[] arr, int idx, int val) {
        int[] result = new int[arr.length + 1];
        for (int i = 0; i < idx; i++) result[i] = arr[i];
        result[idx] = val;
        for (int i = idx; i < arr.length; i++) result[i + 1] = arr[i];
        return result;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

void insertAtIndex(vector<int>& arr, int idx, int val) {
    arr.insert(arr.begin() + idx, val);
}`,
    pseudoCode: `FUNCTION insertAtIndex(arr, idx, val):
    FOR i FROM length(arr) DOWN TO idx + 1:
        arr[i] = arr[i - 1]
    arr[idx] = val
END FUNCTION`,
    timeComplexity: 'O(N - k) = O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Maintaining ordered array', 'Text editor cursor insertions'],
    interviewTips: ['Validate boundary index: 0 <= idx <= N'],
    sampleInput: [10, 30, 40],
    sampleOutput: '10 20 30 40',
    quizzes: [
      { question: 'What is the time complexity to insert at index k in array of size N?', type: 'mcq', options: ['O(1)', 'O(k)', 'O(N - k)', 'O(N log N)'], correctAnswer: 'O(N - k)', explanation: 'Must shift all (N - k) elements to the right.', difficulty: 'easy', points: 10 },
      { question: 'What is the valid range of index k for insertion in array of size N?', type: 'mcq', options: ['0 <= k < N', '0 <= k <= N', '1 <= k <= N', 'k == 0'], correctAnswer: '0 <= k <= N', explanation: 'k=0 means head, k=N means append at end.', difficulty: 'easy', points: 10 },
      { question: 'Which index requires maximum element shifts during insertion?', type: 'mcq', options: ['k = 0', 'k = N / 2', 'k = N - 1', 'k = N'], correctAnswer: 'k = 0', explanation: 'Insertion at index 0 shifts all N elements.', difficulty: 'easy', points: 10 },
      { question: 'What error occurs if index k > N in Java?', type: 'mcq', options: ['NullPointerException', 'IndexOutOfBoundsException', 'StackOverflowError', 'Compiles fine'], correctAnswer: 'IndexOutOfBoundsException', explanation: 'Java checks array bounds strictly.', difficulty: 'medium', points: 15 },
      { question: 'How many elements shift when inserting at index N in an array of size N?', type: 'mcq', options: ['N', 'N - 1', '0', '1'], correctAnswer: '0', explanation: 'Inserting at index N is an append operation requiring 0 shifts.', difficulty: 'medium', points: 15 },
      { question: 'If inserting at index k = N/2, what is average shift count?', type: 'mcq', options: ['N/2', 'N', '1', 'log N'], correctAnswer: 'N/2', explanation: 'Middle insertion shifts half the array elements.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Insert at Index', description: 'Insert value at specified index in array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] insert(int[] arr, int idx, int val) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> insert(vector<int> arr, int idx, int val) {\n  return {};\n}' }, testCases: [{ input: '[1,3], idx=1, val=2', expectedOutput: '[1,2,3]' }], solution: 'Shift items right from index idx.', externalLink: 'https://leetcode.com/' },
      { title: 'Insert Multiple Elements', description: 'Insert array of values at index k.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] insertRange(int[] arr, int idx, int[] vals) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> insertRange(vector<int> arr, int idx, vector<int> vals) {\n  return {};\n}' }, testCases: [{ input: '[1,4], idx=1, vals=[2,3]', expectedOutput: '[1,2,3,4]' }], solution: 'Make space for vals length and copy.', externalLink: 'https://leetcode.com/' },
      { title: 'Sorted Array Insertion', description: 'Insert element in a sorted array to keep it sorted.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] insertSorted(int[] arr, int val) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> insertSorted(vector<int> arr, int val) {\n  return {};\n}' }, testCases: [{ input: '[1,3,5], val=4', expectedOutput: '[1,3,4,5]' }], solution: 'Find binary search index then shift.', externalLink: 'https://leetcode.com/problems/search-insert-position/' },
    ],
  },
  {
    slug: 'delete-from-beginning',
    title: 'Delete from Beginning',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Remove the first element (index 0) of an array by shifting all subsequent elements left.',
    theory: 'Deleting from index 0 frees index 0 and shifts elements from index 1..N-1 one position left.',
    javaCode: `public class DeleteBeginning {
    public static int[] deleteFirst(int[] arr) {
        if (arr.length == 0) return arr;
        int[] result = new int[arr.length - 1];
        System.arraycopy(arr, 1, result, 0, arr.length - 1);
        return result;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

void deleteBeginning(vector<int>& arr) {
    if (!arr.empty()) {
        arr.erase(arr.begin());
    }
}`,
    pseudoCode: `FUNCTION deleteBeginning(arr):
    FOR i FROM 1 TO length(arr) - 1:
        arr[i - 1] = arr[i]
    DECREMENT length(arr)
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Queue pop operations on simple arrays'],
    interviewTips: ['Contrast array deletion with O(1) LinkedList head removal'],
    sampleInput: [99, 1, 2, 3],
    sampleOutput: '1 2 3',
    quizzes: [
      { question: 'What is the time complexity of deleting element at index 0 in an array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Shifting remaining N-1 items left takes linear time.', difficulty: 'easy', points: 10 },
      { question: 'What is the new size of array after deleting one element from array of size N?', type: 'mcq', options: ['N - 1', 'N', 'N + 1', '0'], correctAnswer: 'N - 1', explanation: 'Deleting an element reduces total size by 1.', difficulty: 'easy', points: 10 },
      { question: 'What data structure performs head deletion in O(1) time?', type: 'mcq', options: ['Array', 'LinkedList / Queue', 'Stack', 'Matrix'], correctAnswer: 'LinkedList / Queue', explanation: 'Linked lists adjust head pointer in O(1) time.', difficulty: 'easy', points: 10 },
      { question: 'In C++ vector::erase(vec.begin()), how many copies occur?', type: 'mcq', options: ['0', '1', 'N - 1', 'N'], correctAnswer: 'N - 1', explanation: 'N-1 remaining elements are shifted left.', difficulty: 'medium', points: 15 },
      { question: 'What should be checked before deleting from beginning?', type: 'mcq', options: ['Array size > 0', 'Array is sorted', 'All elements positive', 'Memory capacity'], correctAnswer: 'Array size > 0', explanation: 'Deleting from empty array causes underflow error.', difficulty: 'medium', points: 15 },
      { question: 'If popping N elements from beginning one-by-one, total time is?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N²)', explanation: 'N + (N-1) + ... + 1 = O(N²) total shift operations.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Remove First Element', description: 'Remove element at index 0.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] removeFirst(int[] arr) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> removeFirst(vector<int> arr) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3]', expectedOutput: '[2,3]' }], solution: 'Copy array starting from index 1.', externalLink: 'https://leetcode.com/' },
      { title: 'Pop K Elements From Start', description: 'Remove first K elements from array.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] removeK(int[] arr, int k) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> removeK(vector<int> arr, int k) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3,4,5], k=2', expectedOutput: '[3,4,5]' }], solution: 'Slice array from index k.', externalLink: 'https://leetcode.com/' },
      { title: 'Queue Simulation', description: 'Simulate FIFO Queue dequeue using array shifting.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int dequeue(int[] queue) {\n    return 0;\n  }\n}', cpp: 'int dequeue(vector<int>& queue) {\n  return 0;\n}' }, testCases: [{ input: '[10,20,30]', expectedOutput: '10' }], solution: 'Return item at 0 and shift left.', externalLink: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
    ],
  },
  {
    slug: 'delete-from-end',
    title: 'Delete from End',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Remove the last element (index size-1) from an array.',
    theory: 'Deleting from the end merely involves reducing the size tracker by 1, running in O(1) constant time.',
    javaCode: `public class DeleteEnd {
    public static int[] deleteLast(int[] arr) {
        if (arr.length == 0) return arr;
        int[] result = new int[arr.length - 1];
        System.arraycopy(arr, 0, result, 0, arr.length - 1);
        return result;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

void deleteEnd(vector<int>& arr) {
    if (!arr.empty()) {
        arr.pop_back();
    }
}`,
    pseudoCode: `FUNCTION deleteEnd(arr):
    IF length(arr) > 0 THEN
        DECREMENT length(arr)
    END IF
END FUNCTION`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    applications: ['Stack pop operations', 'Truncating lists'],
    interviewTips: ['Explain why pop_back is O(1) while erase(begin) is O(N)'],
    sampleInput: [10, 20, 30],
    sampleOutput: '10 20',
    quizzes: [
      { question: 'What is the time complexity of deleting the last element in dynamic array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Requires only decrementing size index without element shifts.', difficulty: 'easy', points: 10 },
      { question: 'In C++ vector, what function removes the last element?', type: 'mcq', options: ['pop_front()', 'pop_back()', 'remove_end()', 'delete_last()'], correctAnswer: 'pop_back()', explanation: 'std::vector::pop_back removes the last element in O(1) time.', difficulty: 'easy', points: 10 },
      { question: 'Does pop_back() automatically reduce internal capacity in std::vector?', type: 'mcq', options: ['Yes, immediately', 'No, capacity remains reserved', 'Halves capacity', 'Frees all memory'], correctAnswer: 'No, capacity remains reserved', explanation: 'Vector capacity stays constant to avoid frequent allocations.', difficulty: 'easy', points: 10 },
      { question: 'What happens if you pop from an empty dynamic array?', type: 'mcq', options: ['Returns 0', 'Undefined behavior / throw error', 'Adds default item', 'Does nothing silently'], correctAnswer: 'Undefined behavior / throw error', explanation: 'Underflow access on empty container is invalid.', difficulty: 'medium', points: 15 },
      { question: 'How can you shrink std::vector capacity to match size after multiple deletions?', type: 'mcq', options: ['vec.shrink_to_fit()', 'vec.resize(0)', 'vec.clear()', 'vec.trim()'], correctAnswer: 'vec.shrink_to_fit()', explanation: 'shrink_to_fit requests freeing unused capacity.', difficulty: 'medium', points: 15 },
      { question: 'Amortized cost to pop N items from end of array is?', type: 'mcq', options: ['O(1) per operation', 'O(N) per operation', 'O(N²)', 'O(log N)'], correctAnswer: 'O(1) per operation', explanation: 'Each individual pop_back runs in strictly O(1) time.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Remove Last Item', description: 'Remove last element from array.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] removeLast(int[] arr) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> removeLast(vector<int> arr) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3]', expectedOutput: '[1,2]' }], solution: 'Slice array up to length - 1.', externalLink: 'https://leetcode.com/' },
      { title: 'Stack Pop Simulation', description: 'Implement stack pop operation.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int pop(int[] stack) {\n    return 0;\n  }\n}', cpp: 'int pop(vector<int>& stack) {\n  return 0;\n}' }, testCases: [{ input: '[5,10,15]', expectedOutput: '15' }], solution: 'Return last item and reduce size.', externalLink: 'https://leetcode.com/problems/min-stack/' },
      { title: 'Truncate Array', description: 'Remove last K items from array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int[] truncate(int[] arr, int k) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> truncate(vector<int> arr, int k) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3,4,5], k=2', expectedOutput: '[1,2,3]' }], solution: 'Copy first N-k elements.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'delete-from-index',
    title: 'Delete from Index',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Remove element at index k by shifting items from k+1..N-1 left by 1.',
    theory: 'Deleting at index k shifts all elements following k one slot left to close the gap.',
    javaCode: `public class DeleteAtIndex {
    public static int[] deleteAt(int[] arr, int idx) {
        if (idx < 0 || idx >= arr.length) return arr;
        int[] res = new int[arr.length - 1];
        for (int i = 0, j = 0; i < arr.length; i++) {
            if (i != idx) res[j++] = arr[i];
        }
        return res;
    }
}`,
    cppCode: `#include <vector>
using namespace std;

void deleteAtIndex(vector<int>& arr, int idx) {
    if (idx >= 0 && idx < arr.size()) {
        arr.erase(arr.begin() + idx);
    }
}`,
    pseudoCode: `FUNCTION deleteAtIndex(arr, idx):
    FOR i FROM idx TO length(arr) - 2:
        arr[i] = arr[i + 1]
    DECREMENT length(arr)
END FUNCTION`,
    timeComplexity: 'O(N - k) = O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Removing item from list by position'],
    interviewTips: ['Mention that order-independent array deletion can be done in O(1) by swapping with last item'],
    sampleInput: [10, 20, 30, 40],
    sampleOutput: '10 30 40',
    quizzes: [
      { question: 'What is the time complexity to delete item at index k in array of size N?', type: 'mcq', options: ['O(1)', 'O(k)', 'O(N - k)', 'O(N²)'], correctAnswer: 'O(N - k)', explanation: 'All items from index k+1 to N-1 must shift left by 1 position.', difficulty: 'easy', points: 10 },
      { question: 'How can you delete an element at index k in O(1) time if order does NOT matter?', type: 'mcq', options: ['Shift items right', 'Swap item with last element, then pop_back()', 'Sort array', 'Set item to 0'], correctAnswer: 'Swap item with last element, then pop_back()', explanation: 'Swapping with last element takes O(1) time when ordering is irrelevant.', difficulty: 'easy', points: 10 },
      { question: 'What is valid index k for deletion in array of size N?', type: 'mcq', options: ['0 <= k < N', '0 <= k <= N', 'k == N', 'k < 0'], correctAnswer: '0 <= k < N', explanation: 'Valid indices range from 0 to N-1.', difficulty: 'easy', points: 10 },
      { question: 'In C++ vector::erase(vec.begin() + k), how many items shift left?', type: 'mcq', options: ['k', 'N - k - 1', 'N', '1'], correctAnswer: 'N - k - 1', explanation: 'Items located after index k are shifted left.', difficulty: 'medium', points: 15 },
      { question: 'What happens if you delete at index 0 versus index N-1?', type: 'mcq', options: ['Index 0 takes O(N), Index N-1 takes O(1)', 'Both take O(1)', 'Both take O(N²)', 'Index 0 takes O(1)'], correctAnswer: 'Index 0 takes O(N), Index N-1 takes O(1)', explanation: 'Index 0 shifts all N-1 elements; index N-1 shifts 0 elements.', difficulty: 'medium', points: 15 },
      { question: 'Total time to delete all N elements from random indices one-by-one is?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N²)', explanation: 'Sum of shifts across N deletions equals O(N²).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Remove Element at Index', description: 'Remove item at target index.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] removeAt(int[] arr, int idx) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> removeAt(vector<int> arr, int idx) {\n  return {};\n}' }, testCases: [{ input: '[10,20,30], idx=1', expectedOutput: '[10,30]' }], solution: 'Skip item at index idx.', externalLink: 'https://leetcode.com/' },
      { title: 'Unordered Fast Delete', description: 'Delete item at index k in O(1) time without keeping order.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int[] fastDelete(int[] arr, int idx) {\n    return new int[0];\n  }\n}', cpp: 'vector<int> fastDelete(vector<int> arr, int idx) {\n  return {};\n}' }, testCases: [{ input: '[1,2,3,4], idx=1', expectedOutput: '[1,4,3]' }], solution: 'Swap arr[idx] with arr[last] and truncate.', externalLink: 'https://leetcode.com/' },
      { title: 'Remove Value Occurrences', description: 'Remove all instances of val in-place.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int removeElement(int[] nums, int val) {\n    return 0;\n  }\n}', cpp: 'int removeElement(vector<int>& nums, int val) {\n  return 0;\n}' }, testCases: [{ input: '[3,2,2,3], val=3', expectedOutput: '2' }], solution: 'Use two pointers to overwrite matching values.', externalLink: 'https://leetcode.com/problems/remove-element/' },
    ],
  },
  {
    slug: 'update-element',
    title: 'Update Element',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Change value of an element at a given valid index k.',
    theory: 'Direct random access allows updating an element at index k in O(1) time.',
    javaCode: `public class UpdateElement {
    public static void update(int[] arr, int idx, int val) {
        if (idx >= 0 && idx < arr.length) {
            arr[idx] = val;
        }
    }
}`,
    cppCode: `void updateElement(vector<int>& arr, int idx, int val) {
    if (idx >= 0 && idx < arr.size()) {
        arr[idx] = val;
    }
}`,
    pseudoCode: `FUNCTION updateElement(arr, idx, val):
    arr[idx] = val
END FUNCTION`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    applications: ['Modifying record field', 'In-place state mutation'],
    interviewTips: ['Array index lookup/update is O(1) due to contiguous RAM offset calculation'],
    sampleInput: [10, 20, 30],
    sampleOutput: '10 99 30',
    quizzes: [
      { question: 'What is the time complexity to update an element at a known index k?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Contiguous index calculation allows direct instant O(1) access.', difficulty: 'easy', points: 10 },
      { question: 'What formula calculates address of arr[i] with base B and size S?', type: 'mcq', options: ['B + i * S', 'B * i', 'B + i + S', 'B * S + i'], correctAnswer: 'B + i * S', explanation: 'Index offset formula enables O(1) array access.', difficulty: 'easy', points: 10 },
      { question: 'Does updating an element at index k change array size?', type: 'mcq', options: ['Yes, increases by 1', 'No, size remains unchanged', 'Decreases by 1', 'Doubles size'], correctAnswer: 'No, size remains unchanged', explanation: 'Updating overwrites existing value without altering array size.', difficulty: 'easy', points: 10 },
      { question: 'Difference between update and insert at index k?', type: 'mcq', options: ['Update overwrites O(1); Insert shifts items O(N)', 'Both shift items', 'Both take O(1)', 'Update shifts items O(N)'], correctAnswer: 'Update overwrites O(1); Insert shifts items O(N)', explanation: 'Update overwrites existing memory cell without shifting.', difficulty: 'medium', points: 15 },
      { question: 'In Java, what exception is thrown when updating arr[-1]?', type: 'mcq', options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IllegalArgumentException', 'No exception'], correctAnswer: 'ArrayIndexOutOfBoundsException', explanation: 'Negative indices are out of bounds in Java.', difficulty: 'medium', points: 15 },
      { question: 'Can updating an element break binary search invariant?', type: 'mcq', options: ['No', 'Yes, if array was sorted and new value breaks sorted order', 'Only if updating index 0', 'Only if negative value'], correctAnswer: 'Yes, if array was sorted and new value breaks sorted order', explanation: 'Sorted order invariants must be explicitly preserved.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Update Value', description: 'Update element at index idx with new value.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void update(int[] arr, int idx, int val) {\n  }\n}', cpp: 'void update(vector<int>& arr, int idx, int val) {\n}' }, testCases: [{ input: '[1,2,3], idx=1, val=5', expectedOutput: '[1,5,3]' }], solution: 'Assign arr[idx] = val.', externalLink: 'https://leetcode.com/' },
      { title: 'Replace Negative Values', description: 'Update all negative numbers in array to 0.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void zeroNegatives(int[] arr) {\n  }\n}', cpp: 'void zeroNegatives(vector<int>& arr) {\n}' }, testCases: [{ input: '[-1, 2, -3, 4]', expectedOutput: '[0, 2, 0, 4]' }], solution: 'Traverse and replace if < 0.', externalLink: 'https://leetcode.com/' },
      { title: 'Range Update Operation', description: 'Increment all elements in range [L, R] by val.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public void rangeUpdate(int[] arr, int L, int R, int val) {\n  }\n}', cpp: 'void rangeUpdate(vector<int>& arr, int L, int R, int val) {\n}' }, testCases: [{ input: '[1,2,3,4], L=1, R=2, val=10', expectedOutput: '[1,12,13,4]' }], solution: 'Loop from L to R updating items.', externalLink: 'https://leetcode.com/problems/range-addition/' },
    ],
  },
  {
    slug: 'reverse-array',
    title: 'Reverse Array',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'In-place reversal of elements in an array using two pointers.',
    theory: 'Using two pointers (left at 0, right at N-1), swap elements arr[left] and arr[right], then increment left and decrement right until left >= right.',
    javaCode: `public class ReverseArray {
    public static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}`,
    cppCode: `#include <algorithm>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0, right = (int)arr.size() - 1;
    while (left < right) {
        swap(arr[left++], arr[right--]);
    }
}`,
    pseudoCode: `FUNCTION reverse(arr):
    left = 0
    right = length(arr) - 1
    WHILE left < right DO:
        SWAP arr[left] AND arr[right]
        left = left + 1
        right = right - 1
    END WHILE
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Array rotation', 'Palindrome checking', 'Reversing strings'],
    interviewTips: ['Highlight that loop runs N/2 times, yielding O(N) complexity'],
    sampleInput: [1, 2, 3, 4, 5],
    sampleOutput: '5 4 3 2 1',
    quizzes: [
      { question: 'How many swaps are performed to reverse an array of size N?', type: 'mcq', options: ['N', 'N / 2', 'N - 1', 'N²'], correctAnswer: 'N / 2', explanation: 'Swapping pairs from outer boundary inward requires floor(N/2) swaps.', difficulty: 'easy', points: 10 },
      { question: 'What is the space complexity of two-pointer in-place array reversal?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'In-place reversal requires only 1 temp variable for swapping.', difficulty: 'easy', points: 10 },
      { question: 'What is the time complexity of array reversal?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Every element is involved in 1 swap operation.', difficulty: 'easy', points: 10 },
      { question: 'In C++ STL, what function reverses vector elements in-place?', type: 'mcq', options: ['std::reverse(vec.begin(), vec.end())', 'vec.invert()', 'std::flip(vec)', 'vec.reverse()'], correctAnswer: 'std::reverse(vec.begin(), vec.end())', explanation: 'std::reverse from <algorithm> reverses iterators range.', difficulty: 'medium', points: 15 },
      { question: 'How to swap two variables a and b without temporary variable?', type: 'mcq', options: ['a = a + b; b = a - b; a = a - b;', 'a = b; b = a;', 'a = a * b;', 'Not possible'], correctAnswer: 'a = a + b; b = a - b; a = a - b;', explanation: 'Arithmetic or XOR bitwise trick allows swapping without extra variable.', difficulty: 'medium', points: 15 },
      { question: 'If reversing a subarray from index L to R, loop condition is?', type: 'mcq', options: ['left <= right', 'left < right', 'left != right', 'i < N'], correctAnswer: 'left < right', explanation: 'Stopping when left >= right avoids redundant middle element swap.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Reverse Array', description: 'Reverse array in-place.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void reverse(int[] nums) {\n  }\n}', cpp: 'void reverse(vector<int>& nums) {\n}' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '[4,3,2,1]' }], solution: 'Use two pointers from edges.', externalLink: 'https://leetcode.com/problems/reverse-string/' },
      { title: 'Reverse Subarray', description: 'Reverse elements between indices L and R inclusive.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void reverseRange(int[] nums, int L, int R) {\n  }\n}', cpp: 'void reverseRange(vector<int>& nums, int L, int R) {\n}' }, testCases: [{ input: '[1,2,3,4,5], L=1, R=3', expectedOutput: '[1,4,3,2,5]' }], solution: 'Two pointers at L and R.', externalLink: 'https://leetcode.com/' },
      { title: 'Reverse Vowels of String', description: 'Reverse only the vowels in a character array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public String reverseVowels(String s) {\n    return "";\n  }\n}', cpp: 'string reverseVowels(string s) {\n  return "";\n}' }, testCases: [{ input: '"hello"', expectedOutput: '"holle"' }], solution: 'Two pointers skipping non-vowels.', externalLink: 'https://leetcode.com/problems/reverse-vowels-of-a-string/' },
    ],
  },
  {
    slug: 'left-rotation',
    title: 'Left Rotation',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Shift all array elements to the left by k positions circularly.',
    theory: 'Left rotating by k shifts element at index i to index (i - k + N) % N. Optimal O(N) time & O(1) space method uses 3 reversals: reverse(0, k-1), reverse(k, N-1), reverse(0, N-1).',
    javaCode: `public class LeftRotation {
    public static void rotateLeft(int[] arr, int k) {
        int n = arr.length;
        k = k % n;
        reverse(arr, 0, k - 1);
        reverse(arr, k, n - 1);
        reverse(arr, 0, n - 1);
    }
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}`,
    cppCode: `#include <algorithm>
#include <vector>
using namespace std;

void rotateLeft(vector<int>& arr, int k) {
    int n = arr.size();
    k %= n;
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
    reverse(arr.begin(), arr.end());
}`,
    pseudoCode: `FUNCTION rotateLeft(arr, k):
    n = length(arr)
    k = k MOD n
    REVERSE arr[0 ... k-1]
    REVERSE arr[k ... n-1]
    REVERSE arr[0 ... n-1]
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Cyclic scheduling', 'Bitwise circular shifts'],
    interviewTips: ['Normalize k using k = k % N', 'Use 3-reversal algorithm for O(1) auxiliary memory'],
    sampleInput: [1, 2, 3, 4, 5],
    sampleOutput: '3 4 5 1 2',
    quizzes: [
      { question: 'What is the effective rotation shift if k = 12 on an array of size 5?', type: 'mcq', options: ['12', '2', '5', '0'], correctAnswer: '2', explanation: 'k % N = 12 % 5 = 2.', difficulty: 'easy', points: 10 },
      { question: 'What is the auxiliary space complexity of the 3-reversal left rotation algorithm?', type: 'mcq', options: ['O(N)', 'O(k)', 'O(1)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Reversing sub-ranges in-place uses constant memory.', difficulty: 'easy', points: 10 },
      { question: 'In left rotation by k, what is new index of item originally at index i?', type: 'mcq', options: ['(i + k) % N', '(i - k + N) % N', 'i * k', 'N - i'], correctAnswer: '(i - k + N) % N', explanation: 'Shifting left subtracts k modulo array size N.', difficulty: 'easy', points: 10 },
      { question: 'How many total element reversals are performed in 3-reversal algorithm?', type: 'mcq', options: ['1', '2', '3', 'k'], correctAnswer: '3', explanation: 'Reverses first k elements, remaining N-k elements, then full array.', difficulty: 'medium', points: 15 },
      { question: 'What is the naive space complexity if allocating a temporary array for rotation?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N²)', 'O(k²)'], correctAnswer: 'O(N)', explanation: 'Auxiliary array copy requires O(N) space.', difficulty: 'medium', points: 15 },
      { question: 'If k = N, what does left rotation produce?', type: 'mcq', options: ['Reversed array', 'Original array unchanged', 'All zeroes', 'Empty array'], correctAnswer: 'Original array unchanged', explanation: 'Rotating by full size N returns array to initial order.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Left Rotate by 1', description: 'Left rotate array by 1 position.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void rotateOne(int[] arr) {\n  }\n}', cpp: 'void rotateOne(vector<int>& arr) {\n}' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '[2,3,4,1]' }], solution: 'Save arr[0], shift items left, put saved item at end.', externalLink: 'https://leetcode.com/' },
      { title: 'Left Rotate Array by K', description: 'Left rotate array by K positions in O(1) space.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void rotateLeft(int[] nums, int k) {\n  }\n}', cpp: 'void rotateLeft(vector<int>& nums, int k) {\n}' }, testCases: [{ input: '[1,2,3,4,5], k=2', expectedOutput: '[3,4,5,1,2]' }], solution: 'Apply 3 reversal steps.', externalLink: 'https://leetcode.com/' },
      { title: 'Check Array Rotation', description: 'Check if array B is a left rotated version of array A.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean isRotation(int[] A, int[] B) {\n    return false;\n  }\n}', cpp: 'bool isRotation(vector<int>& A, vector<int>& B) {\n  return false;\n}' }, testCases: [{ input: 'A=[1,2,3], B=[2,3,1]', expectedOutput: 'true' }], solution: 'Concatenate A+A and search B.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'right-rotation',
    title: 'Right Rotation',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Shift all array elements to the right by k positions circularly.',
    theory: 'Right rotating by k shifts element at index i to index (i + k) % N. Optimal O(N) time & O(1) space method uses 3 reversals: reverse(0, N-1), reverse(0, k-1), reverse(k, N-1).',
    javaCode: `public class RightRotation {
    public static void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`,
    cppCode: `#include <algorithm>
#include <vector>
using namespace std;

void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k %= n;
    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}`,
    pseudoCode: `FUNCTION rotateRight(arr, k):
    n = length(arr)
    k = k MOD n
    REVERSE arr[0 ... n-1]
    REVERSE arr[0 ... k-1]
    REVERSE arr[k ... n-1]
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Right shifting circular buffer', 'LeetCode 189 Rotate Array'],
    interviewTips: ['Be ready to demonstrate both 3-reversal method and cyclic replacements method'],
    sampleInput: [1, 2, 3, 4, 5, 6, 7],
    sampleOutput: '5 6 7 1 2 3 4',
    quizzes: [
      { question: 'Right rotation by k is equivalent to left rotation by how much?', type: 'mcq', options: ['N - k', 'k - N', 'k / N', 'N + k'], correctAnswer: 'N - k', explanation: 'Right rotation by k shifts elements forward by k, identical to left shift by N - k.', difficulty: 'easy', points: 10 },
      { question: 'What is time complexity of 3-reversal right rotation on size N?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Reversing segments takes total N swaps, running in linear time.', difficulty: 'easy', points: 10 },
      { question: 'Where does the last element (index N-1) move after 1 right rotation?', type: 'mcq', options: ['Index 0', 'Index N-2', 'Index 1', 'Stays at N-1'], correctAnswer: 'Index 0', explanation: 'Circular right shift moves last element to head index 0.', difficulty: 'easy', points: 10 },
      { question: 'What steps perform right rotation by k using reversal?', type: 'mcq', options: ['Reverse all, reverse first k, reverse remaining N-k', 'Reverse first k, reverse all', 'Reverse N-k, reverse all', 'Sort array'], correctAnswer: 'Reverse all, reverse first k, reverse remaining N-k', explanation: 'Reversing entire array then reversing both parts places elements correctly.', difficulty: 'medium', points: 15 },
      { question: 'What happens if k = 0?', type: 'mcq', options: ['Array reverses', 'Array unchanged', 'Throws error', 'Empties array'], correctAnswer: 'Array unchanged', explanation: 'k=0 means 0 shift, leaving array in original order.', difficulty: 'medium', points: 15 },
      { question: 'Cyclic replacement algorithm for right rotation uses GCD(N, k) cycles. Time & space complexity?', type: 'mcq', options: ['O(N) time, O(1) space', 'O(N²) time, O(N) space', 'O(N log N) time, O(1) space', 'O(1) time, O(N) space'], correctAnswer: 'O(N) time, O(1) space', explanation: 'Cyclic replacements visit every element exactly once using O(1) extra space.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Rotate Array (LeetCode 189)', description: 'Rotate array to right by k steps.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void rotate(int[] nums, int k) {\n  }\n}', cpp: 'void rotate(vector<int>& nums, int k) {\n}' }, testCases: [{ input: '[1,2,3,4,5,6,7], k=3', expectedOutput: '[5,6,7,1,2,3,4]' }], solution: 'Use 3-reversal algorithm.', externalLink: 'https://leetcode.com/problems/rotate-array/' },
      { title: 'Right Rotate by 1', description: 'Right rotate array by 1 position.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void rotateOne(int[] arr) {\n  }\n}', cpp: 'void rotateOne(vector<int>& arr) {\n}' }, testCases: [{ input: '[1,2,3]', expectedOutput: '[3,1,2]' }], solution: 'Save last item and shift right.', externalLink: 'https://leetcode.com/' },
      { title: 'Min Operations to Sort Rotated Array', description: 'Find minimum right rotations needed to sort a rotated sorted array.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int minRotations(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int minRotations(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[3,4,5,1,2]', expectedOutput: '2' }], solution: 'Find minimum element index.', externalLink: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
    ],
  },
];
