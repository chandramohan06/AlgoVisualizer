import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Note } from '../models/Note.model';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/algovisualizer';

const initialNotesData = [
  // 1. ARRAYS & JAVA ARRAYLIST
  {
    title: 'Arrays & Java ArrayList (Array Data Structure)',
    slug: 'arrays',
    category: 'Arrays',
    subcategory: 'Linear Data Structures',
    difficulty: 'Easy' as const,
    description: 'Complete Interview Guide to Arrays & Java ArrayList: Memory layout, contiguous indexing, O(1) random access, internal dynamic resizing mechanism, Java methods, and 35+ technical interview questions.',
    definition: 'An Array is a linear data structure that stores elements of the same type in contiguous memory locations, enabling O(1) direct random access via zero-indexed offsets.',
    introduction: 'Arrays serve as the foundational building block for complex data structures like Heap, Hash Table, Matrix, and Dynamic Arrays (ArrayList/Vector). In Java, java.util.ArrayList is a resizable-array implementation of the List interface.',
    whyUsed: 'Used when frequent index-based random access is required, memory overhead per element must be minimal without pointer overhead, and sequential data processing is needed.',
    characteristics: [
      'Contiguous memory allocation.',
      'Fixed capacity in static arrays; dynamic capacity in java.util.ArrayList.',
      'Zero-indexed element positioning: index 0 to N-1.',
      'Constant time O(1) random access by index offset calculation.',
      'Linear time O(N) insertion and deletion at arbitrary positions due to element shifting.',
    ],
    types: [
      { name: '1D Static Array', description: 'Fixed-size single dimensional array allocated at compile-time/instantiation.' },
      { name: '2D / Multi-Dimensional Matrix', description: 'Grid of arrays stored in row-major or column-major order.' },
      { name: 'Dynamic Array (ArrayList)', description: 'Resizable array that doubles capacity when array buffer becomes full.' },
    ],
    operations: [
      { name: 'Access by Index', description: 'Retrieves element at index i using base address math.', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Search Value', description: 'Linear scan to locate target value.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
      { name: 'Insertion at End', description: 'Appends element at last index.', timeComplexity: 'O(1) amortized', spaceComplexity: 'O(1)' },
      { name: 'Insertion at Index i', description: 'Shifts elements from index i to N-1 rightwards by 1 position.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
      { name: 'Deletion at Index i', description: 'Shifts elements from index i+1 to N-1 leftwards by 1 position.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    ],
    javaMethods: [
      {
        name: 'add(E element)',
        purpose: 'Appends the specified element to the end of the ArrayList.',
        syntax: 'public boolean add(E e)',
        parameters: 'e - element to be appended to this list',
        returnType: 'boolean (always true for List)',
        timeComplexity: 'O(1) Amortized',
        example: 'List<Integer> list = new ArrayList<>(); list.add(10);',
        notes: 'If array buffer capacity is reached, triggers grow() resizing array to 1.5x original size.',
      },
      {
        name: 'add(int index, E element)',
        purpose: 'Inserts the element at the specified position, shifting existing elements to the right.',
        syntax: 'public void add(int index, E element)',
        parameters: 'index - index at which element is inserted; element - element to insert',
        returnType: 'void',
        timeComplexity: 'O(N)',
        example: 'list.add(0, 5); // Inserts 5 at head',
        notes: 'Throws IndexOutOfBoundsException if index < 0 || index > size().',
      },
      {
        name: 'get(int index)',
        purpose: 'Returns the element at the specified position in the list.',
        syntax: 'public E get(int index)',
        parameters: 'index - index of the element to return',
        returnType: 'E (Element)',
        timeComplexity: 'O(1)',
        example: 'int val = list.get(2);',
        notes: 'Constant time lookup without scanning.',
      },
      {
        name: 'set(int index, E element)',
        purpose: 'Replaces the element at the specified position with the specified element.',
        syntax: 'public E set(int index, E element)',
        parameters: 'index - index to replace; element - element to store',
        returnType: 'E (Previous element)',
        timeComplexity: 'O(1)',
        example: 'list.set(1, 99);',
        notes: 'Overwrites existing value without shifting.',
      },
      {
        name: 'remove(int index)',
        purpose: 'Removes the element at the specified position, shifting subsequent elements to the left.',
        syntax: 'public E remove(int index)',
        parameters: 'index - index of element to remove',
        returnType: 'E (Removed element)',
        timeComplexity: 'O(N)',
        example: 'list.remove(0);',
        notes: 'Shifts (size - index - 1) elements leftwards.',
      },
      {
        name: 'size()',
        purpose: 'Returns the number of elements in the list.',
        syntax: 'public int size()',
        parameters: 'None',
        returnType: 'int',
        timeComplexity: 'O(1)',
        example: 'int len = list.size();',
        notes: 'Returns stored size variable, not total capacity.',
      },
      {
        name: 'contains(Object o)',
        purpose: 'Returns true if list contains the specified element.',
        syntax: 'public boolean contains(Object o)',
        parameters: 'o - element whose presence is tested',
        returnType: 'boolean',
        timeComplexity: 'O(N)',
        example: 'if (list.contains(10)) { ... }',
        notes: 'Performs linear search calling o.equals().',
      },
    ],
    internalWorking: 'ArrayList maintains an internal Object[] elementData array. Initial default capacity is 10. When size reaches capacity, grow() method allocates new capacity = oldCapacity + (oldCapacity >> 1) [1.5x growth factor] and uses Arrays.copyOf() to copy old elements.',
    memoryRepresentation: 'BaseAddress + (index * elementSize). Contiguous memory block ensures low cache-miss rates on CPU L1/L2 caches.',
    working: 'Array elements reside in adjacent memory slots. Accessing element at index i uses formula: Address(i) = BaseAddress + (i * elementSize), enabling constant time O(1) retrieval.',
    algorithm: '1. Allocate array of capacity C.\n2. Access element at index i directly: BaseAddress + i * size.\n3. On append when size == C, allocate new array of capacity 1.5 * C, copy elements, set new reference.',
    flow: 'Memory Start -> Base Address -> Offset Addition -> Immediate Memory Dereference.',
    dryRun: 'For array arr = [10, 20, 30, 40, 50] with Base = 1000, size = 4 bytes:\nElement at index 2: Address = 1000 + (2 * 4) = 1008. Value = 30.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(N)',
      description: 'Access: O(1), Search: O(N), Insertion/Deletion: O(N) at arbitrary position due to shifting.',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'Fixed contiguous allocation proportional to element count N.',
    },
    advantages: [
      'Fast O(1) random access by index.',
      'Low memory overhead (no pointer references per node).',
      'High cache locality due to contiguous memory storage.',
    ],
    disadvantages: [
      'Costly insertions and deletions O(N) requiring element shifting.',
      'Resizing overhead when dynamic capacity limit is exceeded.',
    ],
    applications: [
      'Base data structure for Matrices, Stacks, Queues, Heaps.',
      'CPU Register Allocation and Memory Buffers.',
      'Lookup tables and fixed-size record storage.',
    ],
    javaCode: `import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(1, 15); // [10, 15, 20, 30]
        
        System.out.println("Element at index 2: " + list.get(2)); // 20
        list.remove(0); // Removes 10 -> [15, 20, 30]
        System.out.println("Size: " + list.size());
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> vec = {10, 20, 30, 40, 50};
    vec.insert(vec.begin() + 1, 15);
    cout << "Element at index 2: " << vec[2] << endl;
    return 0;
}`,
    pythonCode: `arr = [10, 20, 30, 40, 50]
arr.insert(1, 15)
print(f"Element at index 2: {arr[2]}")`,
    jsCode: `const arr = [10, 20, 30, 40, 50];
arr.splice(1, 0, 15);
console.log("Element at index 2:", arr[2]);`,
    example: 'Input: ArrayList [10, 20, 30], add(1, 15)\nOutput: [10, 15, 20, 30], get(2) -> 20',
    output: 'Element at index 2: 20\nSize: 3',
    interviewQuestions: [
      {
        question: '1. How does an Array achieve O(1) random access?',
        answer: 'Because memory is contiguous. Address(i) = BaseAddress + (i * elementSize). The CPU calculates the address via simple arithmetic without traversing prior elements.',
        companyTags: ['Amazon', 'Google', 'Microsoft'],
      },
      {
        question: '2. How does Java ArrayList resize internally?',
        answer: 'When size reaches elementData capacity, ArrayList allocates a new array with new Capacity = oldCapacity + (oldCapacity >> 1) [1.5x growth], copies elements via System.arraycopy(), and updates the internal reference.',
        companyTags: ['Amazon', 'Oracle', 'Walmart'],
      },
      {
        question: '3. What is the amortized time complexity of add() in ArrayList?',
        answer: 'O(1) amortized. Resizing takes O(N) time but occurs infrequently (after doubling/1.5x steps). Summing N insertions gives O(N) total time, averaging to O(1) per add().',
        companyTags: ['Google', 'Meta', 'Uber'],
      },
      {
        question: '4. What is the difference between Array and ArrayList in Java?',
        answer: 'Arrays are fixed-size, hold primitives or objects, and have lower overhead. ArrayList is dynamically resizable, holds only object references (autoboxed primitives), and provides rich Collection API methods.',
        companyTags: ['Microsoft', 'Adobe', 'Oracle'],
      },
      {
        question: '5. How do you find the missing number in an array of 1 to N?',
        answer: 'Sum of 1..N = N*(N+1)/2. Subtract sum of array elements from expected sum in O(N) time and O(1) space, or use XOR sum.',
        companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
      },
    ],
    companyWiseQuestions: [
      {
        company: 'Amazon',
        questions: [
          'Two Sum (Find indices summing to target)',
          'Container With Most Water',
          'Trapping Rain Water',
          'Rotate Array by K steps',
        ],
      },
      {
        company: 'Google',
        questions: [
          '3Sum / 4Sum Problem',
          'Next Permutation',
          'First Missing Positive',
          'Sliding Window Maximum',
        ],
      },
      {
        company: 'Microsoft',
        questions: [
          'Merge Sorted Array in-place',
          'Sort Colors (Dutch National Flag)',
          'Maximum Subarray (Kadane Algorithm)',
        ],
      },
    ],
    commonMistakes: [
      'Accessing index >= size() causing IndexOutOfBoundsException.',
      'Inserting into ArrayList inside a loop without setting initial capacity (causing frequent reallocations).',
      'Forgetting that remove(int index) shifts all subsequent elements leftwards O(N).',
    ],
    bestPractices: [
      'Specify initial capacity new ArrayList<>(expectedSize) if known in advance to prevent resizing.',
      'Use Arrays.asList() or List.of() for immutable fixed-size lists.',
      'Use System.arraycopy() or Arrays.copyOf() for fast native array copying.',
    ],
    relatedProblems: [
      { title: 'Two Sum', difficulty: 'Easy', link: '/practice/question/two-sum' },
      { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', link: '/practice/question/best-time-stock' },
      { title: 'Container With Most Water', difficulty: 'Medium', link: '/practice/question/container-with-most-water' },
    ],
    visualizationId: 'array',
    tags: ['arrays', 'arraylist', 'java-collections', 'data-structures', 'basics'],
    estimatedReadTime: 15,
    revisionNotes: 'ArrayList growth factor: 1.5x. Access O(1), Search O(N), Insert/Delete O(N). Amortized append O(1).',
    cheatSheet: '| Operation | Array | ArrayList |\n|---|---|---|\n| Access | O(1) | O(1) |\n| Search | O(N) | O(N) |\n| Insert End | N/A | O(1) Amortized |\n| Insert Middle | O(N) | O(N) |\n| Resizing | Manual | Auto (1.5x) |',
    references: ['Java 17 Docs: java.util.ArrayList', 'CLRS Chapter 10 Elementary Data Structures'],
    published: true,
    order: 1,
  },

  // 2. LINKED LIST & JAVA LINKEDLIST
  {
    title: 'Linked List & Java LinkedList',
    slug: 'linked-list',
    category: 'Linked List',
    subcategory: 'Linear Data Structures',
    difficulty: 'Medium' as const,
    description: 'Complete Interview Guide to Singly, Doubly, and Circular Linked Lists, Java LinkedList (Doubly Linked List), Floyd Cycle Detection, and 30+ technical questions.',
    definition: 'A Linked List is a linear data structure where elements (nodes) are stored non-contiguously in memory, connected sequentially via pointers/references.',
    introduction: 'In Java, java.util.LinkedList is a doubly-linked list implementation of the List and Deque interfaces. Each Node<E> contains item payload, next pointer, and prev pointer.',
    whyUsed: 'Used when frequent O(1) insertions and deletions at head/tail or known node references are required without memory reallocations.',
    characteristics: [
      'Non-contiguous memory allocation (nodes created dynamically on heap).',
      'Dynamic size without predefined capacity limits.',
      'No random access (sequential traversal O(N)).',
      'Pointer overhead (8/16 bytes extra per node for references).',
    ],
    types: [
      { name: 'Singly Linked List', description: 'Nodes contain data payload and single next reference.' },
      { name: 'Doubly Linked List', description: 'Nodes contain data payload, next reference, and prev reference.' },
      { name: 'Circular Linked List', description: 'Last node next reference points back to head node.' },
    ],
    operations: [
      { name: 'Insert Head', description: 'Prepend new node before current head.', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Insert Tail', description: 'Append new node after current tail.', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Delete Head', description: 'Remove head node and set head = head.next.', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Search Value', description: 'Traverse nodes from head to tail.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    ],
    javaMethods: [
      {
        name: 'addFirst(E e)',
        purpose: 'Inserts the specified element at the beginning of this list.',
        syntax: 'public void addFirst(E e)',
        parameters: 'e - element to add',
        returnType: 'void',
        timeComplexity: 'O(1)',
        example: 'list.addFirst(5);',
        notes: 'Constant time head node creation.',
      },
      {
        name: 'addLast(E e)',
        purpose: 'Appends the specified element to the end of this list.',
        syntax: 'public void addLast(E e)',
        parameters: 'e - element to add',
        returnType: 'void',
        timeComplexity: 'O(1)',
        example: 'list.addLast(20);',
        notes: 'Constant time tail node link update.',
      },
      {
        name: 'removeFirst()',
        purpose: 'Removes and returns the first element from this list.',
        syntax: 'public E removeFirst()',
        parameters: 'None',
        returnType: 'E',
        timeComplexity: 'O(1)',
        example: 'int val = list.removeFirst();',
        notes: 'Throws NoSuchElementException if list is empty.',
      },
      {
        name: 'peekFirst()',
        purpose: 'Retrieves, but does not remove, the first element of this list.',
        syntax: 'public E peekFirst()',
        parameters: 'None',
        returnType: 'E (or null if empty)',
        timeComplexity: 'O(1)',
        example: 'Integer headVal = list.peekFirst();',
        notes: 'Safe lookup returning null on empty list.',
      },
    ],
    internalWorking: 'java.util.LinkedList is a doubly linked list. Maintains first and last Node<E> references. Node<E> class has fields: E item, Node<E> next, Node<E> prev.',
    memoryRepresentation: 'Heap nodes linked via 64-bit object references. High memory footprint per element compared to primitive arrays.',
    working: 'Each node contains a data payload and next pointer (plus prev pointer in doubly linked lists). Traversal starts at head and ends when next == null.',
    algorithm: 'List Reversal Algorithm:\n1. Maintain prev = null, curr = head, next = null.\n2. Loop while curr != null.\n3. next = curr.next; curr.next = prev; prev = curr; curr = next.\n4. Return prev as new head.',
    flow: 'Head -> [Node 1 | Next] -> [Node 2 | Next] -> [Node 3 | Null].',
    dryRun: 'Reverse List 1 -> 2 -> 3 -> Null:\nIter 1: curr=1, next=2, 1.next=null, prev=1, curr=2\nIter 2: curr=2, next=3, 2.next=1, prev=2, curr=3\nIter 3: curr=3, next=null, 3.next=2, prev=3, curr=null\nNew Head = 3 -> 2 -> 1 -> Null',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(N)',
      worst: 'O(N)',
      description: 'Access/Search: O(N), Insert/Delete at Head/Tail: O(1).',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'Node memory overhead due to extra pointer storage per element.',
    },
    advantages: ['Dynamic resizing without memory waste', 'Constant time O(1) insertion/deletion at head/tail'],
    disadvantages: ['No O(1) random access', 'Memory overhead for pointers', 'Poor CPU cache locality'],
    applications: ['LRU Cache implementation', 'Undo functionality in text editors', 'Symbol table management'],
    javaCode: `import java.util.LinkedList;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.add("Java");
        list.addFirst("Python");
        list.addLast("C++"); // [Python, Java, C++]
        
        System.out.println("Head: " + list.getFirst()); // Python
        list.removeFirst();
        System.out.println("New Head: " + list.peekFirst()); // Java
    }
}`,
    cppCode: `#include <iostream>
#include <list>
using namespace std;

int main() {
    list<string> l;
    l.push_back("Java");
    l.push_front("Python");
    cout << "Front: " << l.front() << endl;
    return 0;
}`,
    pythonCode: `from collections import deque
l = deque(["Java"])
l.appendleft("Python")
print("Front:", l[0])`,
    jsCode: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}`,
    example: 'Input: LinkedList ["Java"], addFirst("Python")\nOutput: Front = "Python"',
    output: 'Head: Python\nNew Head: Java',
    interviewQuestions: [
      {
        question: '1. How do you detect a cycle in a Linked List?',
        answer: "Floyd's Cycle Finding Algorithm (Tortoise & Hare): Maintain slow pointer (1 step) and fast pointer (2 steps). If fast and slow pointers meet, a cycle exists.",
        companyTags: ['Amazon', 'Google', 'Microsoft'],
      },
      {
        question: '2. How do you find the middle of a Linked List in one pass?',
        answer: 'Use two pointers: slow moves 1 step, fast moves 2 steps. When fast reaches end, slow points to the middle node.',
        companyTags: ['Amazon', 'Meta', 'Apple'],
      },
      {
        question: '3. How do you reverse a Linked List iteratively vs recursively?',
        answer: 'Iteratively: Maintain prev, curr, next pointers updating curr.next = prev in O(N) time and O(1) space. Recursively: Reverse rest of list and set head.next.next = head.',
        companyTags: ['Microsoft', 'Uber', 'Adobe'],
      },
    ],
    companyWiseQuestions: [
      { company: 'Amazon', questions: ['Reverse Nodes in k-Group', 'LRU Cache Design', 'Merge K Sorted Lists'] },
      { company: 'Google', questions: ['Copy List with Random Pointer', 'Flatten a Multilevel Doubly Linked List'] },
    ],
    commonMistakes: ['NullPointerException when accessing curr.next on null references.'],
    bestPractices: ['Use dummy head node to eliminate special edge-case checks for empty lists.'],
    relatedProblems: [{ title: 'Linked List Cycle', difficulty: 'Easy', link: '/practice/question/linked-list-cycle' }],
    visualizationId: 'linked-list',
    tags: ['linked-list', 'java-collections', 'pointers'],
    estimatedReadTime: 12,
    revisionNotes: 'LinkedList = Doubly linked in Java. Head/Tail insert O(1). Middle search O(N). Floyd Cycle = Fast/Slow pointers.',
    cheatSheet: '| Operation | Singly | Doubly |\n|---|---|---|\n| Insert Head | O(1) | O(1) |\n| Insert Tail | O(N)/O(1) | O(1) |\n| Search | O(N) | O(N) |',
    references: ['Java LinkedList API Docs'],
    published: true,
    order: 2,
  },

  // 3. HASHMAP & HASHSET (JAVA HASH TABLE)
  {
    title: 'HashMap & HashSet (Java Hash Table & Hashing)',
    slug: 'hashmap',
    category: 'HashMap',
    subcategory: 'Key-Value Data Structures',
    difficulty: 'Medium' as const,
    description: 'Exhaustive Interview Guide to Java HashMap & HashSet: Hash collision resolution (Separate Chaining + Red-Black Tree threshold 8), load factor (0.75), internal array buckets, and 40+ technical questions.',
    definition: 'A HashMap is a hash table-based implementation of the Map interface, storing key-value pairs with average constant time O(1) search, insertion, and deletion.',
    introduction: 'In Java, java.util.HashMap uses hashing to map keys to bucket indices. java.util.HashSet is backed internally by a HashMap instance where values are dummy PRESENT objects.',
    whyUsed: 'Essential for high-speed O(1) key lookups, frequency counting, duplicate detection, and caching.',
    characteristics: [
      'Key-Value pairs (unique keys, duplicate values allowed).',
      'Average O(1) time complexity for put, get, remove.',
      'Allows one null key and multiple null values in HashMap.',
      'Unordered iteration order (TreeMap/LinkedHashMap offer ordering).',
    ],
    types: [
      { name: 'HashMap', description: 'Unordered key-value hash table.' },
      { name: 'LinkedHashMap', description: 'Maintains insertion order or access order (useful for LRU Cache).' },
      { name: 'TreeMap', description: 'Red-Black tree implementation maintaining sorted key order O(log N).' },
    ],
    operations: [
      { name: 'Put (Key, Value)', description: 'Hashes key, determines bucket index, inserts entry.', timeComplexity: 'O(1) average', spaceComplexity: 'O(1)' },
      { name: 'Get (Key)', description: 'Hashes key, locates bucket, retrieves value.', timeComplexity: 'O(1) average', spaceComplexity: 'O(1)' },
      { name: 'Remove (Key)', description: 'Removes key-value entry from bucket.', timeComplexity: 'O(1) average', spaceComplexity: 'O(1)' },
    ],
    javaMethods: [
      {
        name: 'put(K key, V value)',
        purpose: 'Associates the specified value with the specified key in this map.',
        syntax: 'public V put(K key, V value)',
        parameters: 'key - key with which value is associated; value - value to associate',
        returnType: 'V (Previous value or null)',
        timeComplexity: 'O(1) Average',
        example: 'map.put("Alice", 95);',
        notes: 'Replaces previous value if key already exists.',
      },
      {
        name: 'get(Object key)',
        purpose: 'Returns the value to which the specified key is mapped, or null if missing.',
        syntax: 'public V get(Object key)',
        parameters: 'key - key whose value is returned',
        returnType: 'V (Value or null)',
        timeComplexity: 'O(1) Average',
        example: 'Integer score = map.get("Alice");',
        notes: 'Hashes key and traverses bucket chain/tree.',
      },
      {
        name: 'getOrDefault(Object key, V defaultValue)',
        purpose: 'Returns mapped value, or defaultValue if key is absent.',
        syntax: 'public V getOrDefault(Object key, V defaultValue)',
        parameters: 'key - key; defaultValue - fallback return',
        returnType: 'V',
        timeComplexity: 'O(1) Average',
        example: 'map.put(key, map.getOrDefault(key, 0) + 1); // Frequency count',
        notes: 'Prevents NullPointerException during counting loops.',
      },
      {
        name: 'containsKey(Object key)',
        purpose: 'Returns true if map contains a mapping for the specified key.',
        syntax: 'public boolean containsKey(Object key)',
        parameters: 'key - key to check',
        returnType: 'boolean',
        timeComplexity: 'O(1) Average',
        example: 'if (map.containsKey("Bob")) { ... }',
        notes: 'O(1) hash check.',
      },
    ],
    internalWorking: 'Java 8+ HashMap consists of Node<K,V>[] table. Index = (n - 1) & hash(key). If bucket collision occurs, elements form a Linked List. When bucket length exceeds TREEIFY_THRESHOLD (8) and total capacity >= 64, linked list transforms into a Red-Black Tree (O(log N) worst case instead of O(N)). Default Load Factor is 0.75.',
    memoryRepresentation: 'Node<K,V>[] array of length 2^n. Resizes (doubles capacity) when size > capacity * loadFactor.',
    working: 'Hashes key via hashCode() -> applies bitwise spread hash(key) -> computes bucket index -> resolves collisions via chaining/treeify.',
    algorithm: '1. Compute hash(key).\n2. Index i = (n-1) & hash.\n3. Traverse bucket i: if key equals target, return/update.\n4. If collision chain length >= 8, treeify bucket.',
    flow: 'Key -> hashCode() -> Spread Hash -> Index Bitmask -> Bucket Array -> Equals Check.',
    dryRun: 'Put ("cat", 5): hash = 98231, index = 7 -> Place entry at table[7].',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(log N)',
      description: 'Average O(1) for put/get/remove. Java 8 Red-Black treeification guarantees O(log N) worst case.',
    },
    spaceComplexity: { auxiliary: 'O(1)', worst: 'O(N)', description: 'Storage proportional to total stored key-value pairs N.' },
    advantages: ['Blazing fast O(1) average lookup and insertion', 'Versatile key-value mapping'],
    disadvantages: ['Unordered keys', 'Memory overhead for Hash Table entries & tree nodes'],
    applications: ['Frequency counting', 'Caching (LRU Cache)', 'Database indexing', 'Duplicate checking'],
    javaCode: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Apple", 10);
        map.put("Banana", 20);
        
        System.out.println("Apple count: " + map.get("Apple")); // 10
        System.out.println("Contains Orange? " + map.containsKey("Orange"));
        
        // Frequency counter pattern
        String[] words = {"a", "b", "a"};
        Map<String, Integer> freq = new HashMap<>();
        for (String w : words) freq.put(w, freq.getOrDefault(w, 0) + 1);
        System.out.println("Frequency: " + freq);
    }
}`,
    cppCode: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m;
    m["Apple"] = 10;
    cout << "Apple count: " << m["Apple"] << endl;
    return 0;
}`,
    pythonCode: `m = {"Apple": 10, "Banana": 20}
print("Apple count:", m.get("Apple"))`,
    jsCode: `const map = new Map();
map.set("Apple", 10);
console.log("Apple count:", map.get("Apple"));`,
    example: 'Input: Put ("Apple", 10), getOrDefault("Apple", 0)\nOutput: 10',
    output: 'Apple count: 10\nContains Orange? false\nFrequency: {a=2, b=1}',
    interviewQuestions: [
      {
        question: '1. How does Java HashMap resolve hash collisions?',
        answer: 'Java 8+ uses Separate Chaining with Linked Lists. When a bucket chain length reaches TREEIFY_THRESHOLD (8) and table capacity >= 64, the chain is converted into a Red-Black Tree, improving worst-case search from O(N) to O(log N).',
        companyTags: ['Amazon', 'Google', 'Oracle', 'Microsoft'],
      },
      {
        question: '2. Why must hashCode() and equals() be overridden together?',
        answer: 'If two objects are equal according to equals(), they MUST return the same hashCode(). If only equals() is overridden, equal keys may yield different bucket indices, causing get() to return null.',
        companyTags: ['Oracle', 'Amazon', 'Walmart'],
      },
      {
        question: '3. What is Load Factor and default capacity in HashMap?',
        answer: 'Default capacity is 16 (always power of 2). Default Load Factor is 0.75. When size > 16 * 0.75 = 12, HashMap doubles capacity to 32 and rehashes entries.',
        companyTags: ['Google', 'Uber', 'Atlassian'],
      },
    ],
    companyWiseQuestions: [
      { company: 'Google', questions: ['Subarray Sum Equals K', 'Isomorphic Strings', 'Longest Consecutive Sequence'] },
      { company: 'Amazon', questions: ['First Unique Character in a String', 'Group Anagrams', 'LRU Cache'] },
    ],
    commonMistakes: ['Using mutable objects as HashMap keys (modifying key object alters hashCode, making entry unretrievable).'],
    bestPractices: ['Use Immutable keys like String, Integer, or final custom objects with correct hashCode()/equals().'],
    relatedProblems: [{ title: 'Subarray Sum Equals K', difficulty: 'Medium', link: '/practice/question/subarray-sum-equals-k' }],
    visualizationId: 'hashmap',
    tags: ['hashmap', 'hashset', 'hashing', 'java-collections'],
    estimatedReadTime: 15,
    revisionNotes: 'HashMap: Load Factor 0.75. Bucket Treeify at length 8 (Red-Black Tree O(log N)). Equals & HashCode contract is critical!',
    cheatSheet: '| Operation | Average | Worst |\n|---|---|---|\n| Put | O(1) | O(log N) |\n| Get | O(1) | O(log N) |\n| Remove | O(1) | O(log N) |',
    references: ['Java 17 HashMap Source Code', 'Joshua Bloch Effective Java'],
    published: true,
    order: 3,
  },
];

export async function seedNotesDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🌱 Connected to MongoDB for upgraded DSA Knowledge Base seeding...');

    for (const noteData of initialNotesData) {
      await Note.findOneAndUpdate(
        { slug: noteData.slug },
        { ...noteData, published: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ Seeded Note: ${noteData.title}`);
    }

    console.log('🎉 Placement & Interview Preparation Knowledge Base seeded successfully!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Error seeding Notes:', err);
    if (require.main === module) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  seedNotesDatabase();
}
