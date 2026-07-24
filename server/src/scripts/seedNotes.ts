import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Note } from '../models/Note.model';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/algovisualizer';

const initialNotesData = [
  {
    title: 'Arrays (Array Data Structure)',
    slug: 'arrays',
    category: 'Arrays',
    subcategory: 'Linear Data Structures',
    difficulty: 'Easy' as const,
    description: 'Master Arrays: fixed-size contiguous memory blocks, random access in O(1), dynamic arrays, and fundamental array manipulation techniques.',
    definition: 'An Array is a linear data structure that stores elements of the same data type in contiguous memory locations, allowing direct element retrieval using integer indexes.',
    introduction: 'Arrays serve as the foundational building block for complex data structures like Heap, Hash Table, Matrix, and Dynamic Array (ArrayList/Vector). Memory is allocated sequentially at initialization.',
    whyUsed: 'Arrays are used when random access is required frequently, memory footprint needs to be minimal without pointer overhead, and sequential data processing is needed.',
    working: 'Array elements reside in adjacent memory slots. Accessing element at index i uses formula: Address(i) = BaseAddress + (i * elementSize), enabling constant time O(1) retrieval.',
    algorithm: '1. Memory allocation of size N * element_byte_size.\n2. Calculate offset using index i.\n3. Access or modify memory location directly.\n4. Traversals visit index 0 through N-1 linearly.',
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
      'Low memory overhead (no pointers required).',
      'Excellent CPU cache locality due to contiguous memory allocation.',
    ],
    disadvantages: [
      'Fixed size in static arrays.',
      'Costly insertions and deletions O(N) requiring element shifting.',
      'Memory wastage if dynamic capacity is over-allocated.',
    ],
    applications: [
      'Base data structure for Matrices, Stacks, Queues, Heaps.',
      'CPU Register Allocation and Memory Buffers.',
      'Lookup tables and fixed-size record storage.',
    ],
    javaCode: `public class ArrayDemo {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        System.out.println("Access index 2: " + arr[2]);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr)/sizeof(arr[0]);
    cout << "Access index 2: " << arr[2] << endl;
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    pythonCode: `def array_demo():
    arr = [10, 20, 30, 40, 50]
    print(f"Access index 2: {arr[2]}")
    for val in arr:
        print(val, end=" ")

if __name__ == "__main__":
    array_demo()`,
    jsCode: `const arr = [10, 20, 30, 40, 50];
console.log("Access index 2:", arr[2]);
arr.forEach(val => process.stdout.write(val + " "));`,
    example: 'Input: [10, 20, 30, 40, 50], Index: 2\nOutput: 30',
    output: 'Access index 2: 30\n10 20 30 40 50 ',
    interviewQuestions: [
      {
        question: 'How does an Array achieve O(1) random access?',
        answer: 'By performing index offset math directly on contiguous memory addresses using: BaseAddress + (Index * SizeOfElement).',
        companyTags: ['Amazon', 'Google', 'Microsoft'],
      },
      {
        question: 'What is the difference between static and dynamic arrays?',
        answer: 'Static arrays have fixed sizes set at compile time, whereas dynamic arrays resize automatically by reallocating a larger contiguous block (usually doubling capacity) when full.',
        companyTags: ['Meta', 'Uber'],
      },
    ],
    commonMistakes: [
      'Accessing out-of-bound indices causing ArrayIndexOutOfBoundsException or Undefined Behavior.',
      'Forgetting that element insertions/deletions take O(N) linear time due to shifting.',
    ],
    relatedProblems: [
      { title: 'Two Sum', difficulty: 'Easy', link: '/practice/question/two-sum' },
      { title: 'Container With Most Water', difficulty: 'Medium', link: '/practice/question/container-with-most-water' },
    ],
    visualizationId: 'array',
    tags: ['arrays', 'data-structures', 'basics', 'contiguous-memory'],
    estimatedReadTime: 6,
    revisionNotes: 'Remember: Access O(1), Search O(N), Insertion/Deletion O(N). Contiguous memory block ensures cache friendliness.',
    cheatSheet: '| Operation | Time | Space |\n|---|---|---|\n| Access | O(1) | O(1) |\n| Search | O(N) | O(1) |\n| Insert | O(N) | O(1) |\n| Delete | O(N) | O(1) |',
    references: ['https://en.wikipedia.org/wiki/Array_(data_structure)', 'GeeksforGeeks Data Structures'],
    published: true,
    order: 1,
  },

  {
    title: 'Strings & String Manipulation',
    slug: 'strings',
    category: 'Strings',
    subcategory: 'Text Processing',
    difficulty: 'Easy' as const,
    description: 'Comprehensive guide to character sequences, immutability, pattern matching, substring searching, and string encoding.',
    definition: 'A String is a sequence of characters stored in contiguous memory, terminated by a null character in C/C++ or managed as an immutable object in Java/Python.',
    introduction: 'Strings are fundamental in software engineering, parsing, web development, and cryptography. Algorithms range from two-pointer manipulations to advanced pattern matchers like KMP and Rabin-Karp.',
    whyUsed: 'Used to store text, parse data formats (JSON, XML, HTML), perform regex validation, and construct human-readable output.',
    working: 'Characters are encoded into integers (ASCII / UTF-8 / UTF-16). Strings can be processed using sliding windows, two pointers, prefix hashes, or tries.',
    algorithm: '1. Represent characters as numeric byte codes.\n2. Iterate through string via pointers/indexes.\n3. Build new strings or manipulate mutably in char arrays to avoid allocation overhead.',
    flow: 'Input Text -> Encoding -> Character Array / Immutable String Object -> Traversal / Pattern Matching.',
    dryRun: 'Check Palindrome: "racecar"\nLeft = 0 (\'r\'), Right = 6 (\'r\') -> Match\nLeft = 1 (\'a\'), Right = 5 (\'a\') -> Match\nLeft = 2 (\'c\'), Right = 4 (\'c\') -> Match\nLeft = 3 (\'e\'), Right = 3 (\'e\') -> Cross -> Valid Palindrome!',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(N)',
      worst: 'O(N)',
      description: 'Length/Traversal: O(N). Pattern matching ranges from O(N+M) with KMP to O(N*M) naive.',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'O(1) in-place operations or O(N) for string copies/StringBuilder buffers.',
    },
    advantages: [
      'Standardized character representation across platforms.',
      'Immutability in modern languages ensures thread-safety and hash key stability.',
    ],
    disadvantages: [
      'Concatenation in loops without StringBuilder/join leads to O(N^2) time complexity.',
    ],
    applications: ['Search engines', 'Text editors', 'Parsers', 'NLP and Bio-informatics DNA analysis'],
    javaCode: `public class StringDemo {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
    public static void main(String[] args) {
        System.out.println("isPalindrome('racecar'): " + isPalindrome("racecar"));
    }
}`,
    cppCode: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return false;
    }
    return true;
}

int main() {
    cout << "isPalindrome('racecar'): " << (isPalindrome("racecar") ? "true" : "false") << endl;
    return 0;
}`,
    pythonCode: `def is_palindrome(s: str) -> bool:
    return s == s[::-1]

print("isPalindrome('racecar'):", is_palindrome("racecar"))`,
    jsCode: `function isPalindrome(s) {
  return s === s.split('').reverse().join('');
}
console.log("isPalindrome('racecar'):", isPalindrome("racecar"));`,
    example: 'Input: "racecar"\nOutput: true',
    output: "isPalindrome('racecar'): true",
    interviewQuestions: [
      {
        question: 'Why are Strings immutable in Java?',
        answer: 'For security, thread safety, string pooling (memory efficiency), and hash code caching.',
        companyTags: ['Oracle', 'Amazon', 'Google'],
      },
    ],
    commonMistakes: [
      'Using string concatenation inside a loop (+=) creating O(N^2) garbage objects.',
    ],
    relatedProblems: [
      { title: 'Valid Anagram', difficulty: 'Easy', link: '/practice/question/valid-anagram' },
      { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: '/practice/question/longest-substring' },
    ],
    visualizationId: 'string',
    tags: ['strings', 'two-pointers', 'text-processing'],
    estimatedReadTime: 7,
    revisionNotes: 'Watch string immutability! Use StringBuilder or char array for heavy modifications.',
    cheatSheet: 'Immutability -> Use StringBuilder/char[] for O(N) operations instead of O(N^2).',
    references: ['Unicode Standard Documentation', 'LeetCode Pattern Guide'],
    published: true,
    order: 2,
  },

  {
    title: 'Sorting Algorithms (Comparison & Non-Comparison)',
    slug: 'sorting',
    category: 'Sorting',
    subcategory: 'Algorithmic Paradigms',
    difficulty: 'Medium' as const,
    description: 'Deep dive into Bubble Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort, and Radix Sort with stability and complexity comparisons.',
    definition: 'Sorting is the algorithmic process of arranging elements of a collection into a specific order (numerical or lexicographical, ascending or descending).',
    introduction: 'Sorting is one of the most thoroughly studied areas in Computer Science. It optimizes searching (enabling Binary Search), deduplication, selection, and relational joins.',
    whyUsed: 'Essential for binary search, database index creation, order statistics, and optimizing Greedy algorithm inputs.',
    working: 'Comparison sorts compare pairs using operators (<, >) with lower bound O(N log N). Non-comparison sorts (Counting/Radix) exploit integer digit bounds to achieve O(N).',
    algorithm: 'Merge Sort Paradigm:\n1. Divide array into halves.\n2. Recursively sort both halves.\n3. Merge two sorted halves in O(N) auxiliary space.',
    flow: 'Unsorted Array -> Divide (Log N steps) -> Base Case (1 element) -> Merge Sorted Sub-arrays -> Sorted Output.',
    dryRun: 'Merge Sort [38, 27, 43, 3]\nSplit: [38, 27] & [43, 3]\nSplit: [38] [27] -> Merge [27, 38]\nSplit: [43] [3] -> Merge [3, 43]\nMerge [27, 38] & [3, 43] -> Final: [3, 27, 38, 43]',
    timeComplexity: {
      best: 'O(N log N)',
      average: 'O(N log N)',
      worst: 'O(N log N)',
      description: 'Merge Sort & Heap Sort guaranteed O(N log N). QuickSort average O(N log N), worst O(N^2). Counting Sort O(N+K).',
    },
    spaceComplexity: {
      auxiliary: 'O(N)',
      worst: 'O(N)',
      description: 'Merge Sort requires O(N) extra space; QuickSort O(log N) stack; HeapSort O(1) in-place.',
    },
    advantages: [
      'Merge Sort guarantees O(N log N) worst-case time stability.',
      'Quick Sort is highly cache efficient with low hidden constant factors.',
    ],
    disadvantages: [
      'Merge Sort requires auxiliary space.',
      'Comparison-based algorithms cannot break the O(N log N) theoretical lower bound.',
    ],
    applications: ['Database Indexing', 'Search Optimization', 'Topological Ordering', 'Closest Pair Problems'],
    javaCode: `public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1, n2 = r - m;
        int[] L = new int[n1], R = new int[n2];
        for (int i=0; i<n1; ++i) L[i] = arr[l + i];
        for (int j=0; j<n2; ++j) R[j] = arr[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = l; k <= r; k++) arr[k] = temp[k - l];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    jsCode: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return [...res, ...left.slice(i), ...right.slice(j)];
}`,
    example: 'Input: [38, 27, 43, 3, 9, 82, 10]\nOutput: [3, 9, 10, 27, 38, 43, 82]',
    output: 'Sorted Array: 3 9 10 27 38 43 82',
    interviewQuestions: [
      {
        question: 'What is a Stable Sorting algorithm?',
        answer: 'A sorting algorithm is stable if elements with identical keys appear in the same relative order in the sorted output as in the input (e.g. Merge Sort, Insertion Sort).',
        companyTags: ['Google', 'Microsoft', 'Goldman Sachs'],
      },
    ],
    commonMistakes: [
      'Choosing QuickSort without randomized pivot selection leading to worst-case O(N^2) on already sorted arrays.',
    ],
    relatedProblems: [
      { title: 'Sort Colors (Dutch National Flag)', difficulty: 'Medium', link: '/practice/question/sort-colors' },
      { title: 'Merge Intervals', difficulty: 'Medium', link: '/practice/question/merge-intervals' },
    ],
    visualizationId: 'merge-sort',
    tags: ['sorting', 'merge-sort', 'quicksort', 'algorithms'],
    estimatedReadTime: 10,
    revisionNotes: 'Merge Sort = Stable + Guaranteed O(N log N) + O(N) Space. Quick Sort = Unstable + In-place + Average O(N log N).',
    cheatSheet: '| Sort | Best | Average | Worst | Space | Stable |\n|---|---|---|---|---|---|\n| Merge Sort | O(N log N) | O(N log N) | O(N log N) | O(N) | Yes |\n| Quick Sort | O(N log N) | O(N log N) | O(N^2) | O(log N) | No |\n| Heap Sort | O(N log N) | O(N log N) | O(N log N) | O(1) | No |',
    references: ['Introduction to Algorithms (CLRS)', 'Visualgo Sorting'],
    published: true,
    order: 3,
  },

  {
    title: 'Binary Search & Search Paradigms',
    slug: 'searching',
    category: 'Searching',
    subcategory: 'Divide and Conquer',
    difficulty: 'Medium' as const,
    description: 'Master Binary Search, search space reduction, lower bound / upper bound calculations, and Binary Search on Answer space.',
    definition: 'Binary Search is a divide-and-conquer searching algorithm that efficiently locates a target value in a monotonic (sorted) sequence by repeatedly halving the search range.',
    introduction: 'Binary Search reduces logarithmic search time from O(N) to O(log N). Beyond simple array lookups, it is applied to continuous search spaces to solve optimization problems.',
    whyUsed: 'Reduces linear scan searches down to logarithmic scale (e.g. searching 1 billion items takes ~30 comparisons).',
    working: 'Maintain low and high pointers. Compute mid = low + (high - low) / 2. Compare target with arr[mid], discarding half the remaining elements per iteration.',
    algorithm: '1. Set low = 0, high = N - 1.\n2. Loop while low <= high.\n3. Compute mid = low + (high - low) / 2.\n4. If arr[mid] == target, return mid.\n5. If arr[mid] < target, set low = mid + 1; else high = mid - 1.',
    flow: 'Sorted Array -> Range [low, high] -> Compute Mid -> Compare -> Halve Space -> Found or Exit.',
    dryRun: 'Array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], Target = 23\nIter 1: low=0, high=9, mid=4 (val=16). 16 < 23 -> low = 5\nIter 2: low=5, high=9, mid=7 (val=56). 56 > 23 -> high = 6\nIter 3: low=5, high=6, mid=5 (val=23). 23 == 23 -> Found at Index 5!',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
      description: 'Halves the remaining elements at each step: N -> N/2 -> N/4 ... -> 1 in log2(N) steps.',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(1)',
      description: 'Iterative implementation takes O(1) space. Recursive calls take O(log N) stack space.',
    },
    advantages: ['Extremely fast lookup O(log N)', 'Minimal O(1) space requirements'],
    disadvantages: ['Requires data to be sorted beforehand (sorting takes O(N log N)).'],
    applications: ['Database Index Lookups', 'Standard Library std::lower_bound', 'Binary Search on Answer (Optimization problems)'],
    javaCode: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    pythonCode: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    jsCode: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    example: 'Input: [2, 5, 8, 12, 16, 23], Target: 23\nOutput: Index 5',
    output: 'Target found at index: 5',
    interviewQuestions: [
      {
        question: 'Why do we write mid = low + (high - low) / 2 instead of (low + high) / 2?',
        answer: 'To prevent integer overflow when (low + high) exceeds the maximum 32-bit signed integer value (2^31 - 1).',
        companyTags: ['Google', 'Meta', 'Amazon'],
      },
    ],
    commonMistakes: [
      'Using (low + high) / 2 leading to integer overflow.',
      'Incorrect loop termination conditions (using low < high when low <= high is needed).',
    ],
    relatedProblems: [
      { title: 'Search in Rotated Sorted Array', difficulty: 'Medium', link: '/practice/question/search-rotated' },
      { title: 'Koko Eating Bananas', difficulty: 'Medium', link: '/practice/question/koko-eating-bananas' },
    ],
    visualizationId: 'binary-search',
    tags: ['searching', 'binary-search', 'logarithmic'],
    estimatedReadTime: 8,
    revisionNotes: 'Mid calculation: mid = low + (high - low) / 2. Always check monotonicity before applying binary search!',
    cheatSheet: 'Monotonic Search Space -> Binary Search -> O(log N) Time, O(1) Space.',
    references: ['LeetCode Binary Search Study Plan'],
    published: true,
    order: 4,
  },

  {
    title: 'Linked List (Singly, Doubly, Circular)',
    slug: 'linked-list',
    category: 'Linked List',
    subcategory: 'Linear Data Structures',
    difficulty: 'Medium' as const,
    description: 'Complete guide to node pointers, Singly & Doubly Linked Lists, Fast & Slow Pointers (Floyd Cycle), and list reversal.',
    definition: 'A Linked List is a linear data structure where elements (nodes) are stored non-contiguously in memory, connected sequentially via pointers/references.',
    introduction: 'Unlike arrays, Linked Lists enable O(1) dynamic memory insertion and deletion at current node pointers without element shifting.',
    whyUsed: 'Ideal for dynamic memory allocation where element size fluctuates frequently, or for constructing Queues, Stacks, and Hash Table buckets.',
    working: 'Each node contains a data payload and next pointer (plus prev pointer in doubly linked lists). Traversal starts at head and ends when next == null.',
    algorithm: 'List Reversal Algorithm:\n1. Maintain prev = null, curr = head, next = null.\n2. Loop while curr != null.\n3. next = curr.next; curr.next = prev; prev = curr; curr = next.\n4. Return prev as new head.',
    flow: 'Head -> [Node 1 | Next] -> [Node 2 | Next] -> [Node 3 | Null].',
    dryRun: 'Reverse List 1 -> 2 -> 3 -> Null:\nIter 1: curr=1, next=2, 1.next=null, prev=1, curr=2\nIter 2: curr=2, next=3, 2.next=1, prev=2, curr=3\nIter 3: curr=3, next=null, 3.next=2, prev=3, curr=null\nNew Head = 3 -> 2 -> 1 -> Null',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(N)',
      worst: 'O(N)',
      description: 'Access/Search: O(N), Insert/Delete at Head: O(1), Insert/Delete at known pointer: O(1).',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'Node memory overhead due to extra pointer storage per element.',
    },
    advantages: ['Dynamic resizing without memory waste', 'Constant time O(1) insertion/deletion at known nodes'],
    disadvantages: ['No O(1) random access by index', 'Memory overhead for pointers', 'Poor CPU cache locality'],
    applications: ['LRU Cache implementation', 'Undo functionality in text editors', 'Symbol table management'],
    javaCode: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class LinkedListDemo {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
    cppCode: `#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    pythonCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    jsCode: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    example: 'Input: 1 -> 2 -> 3 -> 4 -> 5 -> NULL\nOutput: 5 -> 4 -> 3 -> 2 -> 1 -> NULL',
    output: 'Reversed List: 5 -> 4 -> 3 -> 2 -> 1',
    interviewQuestions: [
      {
        question: 'How do you detect a cycle in a Linked List?',
        answer: "Floyd's Cycle Finding Algorithm (Tortoise and Hare): Use slow pointer (1 step) and fast pointer (2 steps). If fast and slow meet, a cycle exists.",
        companyTags: ['Amazon', 'Microsoft', 'Apple'],
      },
    ],
    commonMistakes: [
      'Dereferencing null pointers (NullPointerException) on curr.next.',
      'Losing head references during pointer modifications.',
    ],
    relatedProblems: [
      { title: 'Linked List Cycle', difficulty: 'Easy', link: '/practice/question/linked-list-cycle' },
      { title: 'Merge K Sorted Lists', difficulty: 'Hard', link: '/practice/question/merge-k-lists' },
    ],
    visualizationId: 'linked-list',
    tags: ['linked-list', 'pointers', 'data-structures'],
    estimatedReadTime: 9,
    revisionNotes: 'Dummy heads simplify edge cases! Always draw pointer updates before coding linked list mutations.',
    cheatSheet: 'Floyd Cycle -> Fast (2x) & Slow (1x). Reversal -> prev, curr, next loop.',
    references: ['GeeksforGeeks Linked List Course'],
    published: true,
    order: 5,
  },

  {
    title: 'Stack & Monotonic Stack',
    slug: 'stack',
    category: 'Stack',
    subcategory: 'Linear Data Structures',
    difficulty: 'Easy' as const,
    description: 'LIFO (Last In First Out) principle, expression evaluation, call stack, and Monotonic Stack pattern for Next Greater Element.',
    definition: 'A Stack is a linear data structure operating under Last-In, First-Out (LIFO) discipline, where all insertions (push) and deletions (pop) occur at the top pointer.',
    introduction: 'Stacks manage function recursion call stacks, undo-redo features, syntax parenthetical parsing, and depth-first traversals.',
    whyUsed: 'Provides immediate reverse-order retrieval, tracks state history, and resolves nested structures.',
    working: 'Push increments top pointer and writes value. Pop reads top value and decrements top pointer. Peek inspects top element without removal.',
    algorithm: 'Valid Parentheses Algorithm:\n1. Traverse string characters.\n2. If opening bracket (\'(\', \'{\', \'[\'), push to stack.\n3. If closing bracket, check stack top match; pop if matching, else return false.\n4. Return true if stack empty at end.',
    flow: 'Elements -> Push to Top -> Peek Top -> Pop from Top (LIFO).',
    dryRun: 'Check "()[]{}":\nChar \'(\' -> Push \'(\'\nChar \')\' -> Match \'(\' -> Pop\nChar \'[\' -> Push \'[\'\nChar \']\' -> Match \'[\' -> Pop\nStack Empty -> Valid!',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      description: 'Push, Pop, Peek, isEmpty all execute in O(1) time complexity.',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'O(N) total space to store N elements.',
    },
    advantages: ['Strict O(1) time operations', 'Simple and intuitive memory state management'],
    disadvantages: ['No random element access', 'Potential stack overflow if capacity exceeded'],
    applications: ['Function Call Stack in Compilers', 'Browser History Back Button', 'Expression Parsing (Infix to Postfix)', 'Monotonic Stack Next Greater Element'],
    javaCode: `import java.util.Stack;

public class StackDemo {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    cppCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    pythonCode: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_elem = stack.pop() if stack else '#'
            if mapping[char] != top_elem:
                return False
        else:
            stack.append(char)
    return not stack`,
    jsCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let c of s) {
    if (c in map) {
      if (stack.pop() !== map[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`,
    example: 'Input: s = "()[]{}"\nOutput: true',
    output: 'Valid Parentheses: true',
    interviewQuestions: [
      {
        question: 'What is a Monotonic Stack and when is it used?',
        answer: 'A stack whose elements are strictly increasing or decreasing. Used for range queries like Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in O(N) time.',
        companyTags: ['Google', 'Meta', 'Amazon'],
      },
    ],
    commonMistakes: [
      'Calling pop() or top() on an empty stack causing Exception / Undefined Behavior.',
    ],
    relatedProblems: [
      { title: 'Valid Parentheses', difficulty: 'Easy', link: '/practice/question/valid-parentheses' },
      { title: 'Daily Temperatures', difficulty: 'Medium', link: '/practice/question/daily-temperatures' },
      { title: 'Largest Rectangle in Histogram', difficulty: 'Hard', link: '/practice/question/largest-rectangle' },
    ],
    visualizationId: 'stack',
    tags: ['stack', 'lifo', 'data-structures'],
    estimatedReadTime: 7,
    revisionNotes: 'Stack = LIFO. Monotonic Stack solves "next element greater/smaller than current" in linear O(N) amortized time.',
    cheatSheet: 'Push O(1), Pop O(1), Top O(1). Monotonic Stack -> O(N) Amortized range processing.',
    references: ['CLRS Chapter 10 Stacks & Queues'],
    published: true,
    order: 6,
  },

  {
    title: 'Queue & Deque (Double-Ended Queue)',
    slug: 'queue',
    category: 'Queue',
    subcategory: 'Linear Data Structures',
    difficulty: 'Easy' as const,
    description: 'FIFO (First In First Out) buffers, Circular Queue, Deque, BFS level-order traversal queue, and Monotonic Queue.',
    definition: 'A Queue is a linear data structure adhering to First-In, First-Out (FIFO) ordering. A Deque allows insertion and deletion at both front and rear ends in O(1) time.',
    introduction: 'Queues represent asynchronous task scheduling, BFS graph traversals, rate limiters, and sliding window maximum calculations.',
    whyUsed: 'Essential for sequential process execution, task queues (Kafka/RabbitMQ), and Breadth-First Search (BFS).',
    working: 'Enqueue adds items to the rear; Dequeue removes items from the front. A Deque supports pushFront, pushRear, popFront, popRear in O(1).',
    algorithm: 'Sliding Window Maximum using Deque:\n1. Maintain monotonic decreasing deque storing indices.\n2. Remove out-of-window indices from front.\n3. Pop smaller elements from rear before pushing current index.\n4. Front element is max of current window.',
    flow: 'Front -> Remove (Dequeue) | Elements | Add (Enqueue) -> Rear.',
    dryRun: 'Enqueue 10, Enqueue 20, Dequeue -> Front returns 10, Queue remaining = [20].',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      description: 'Enqueue, Dequeue, Peek operations perform in O(1) constant time.',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'O(N) memory allocation for queue elements.',
    },
    advantages: ['Strict order preservation (FIFO)', 'Constant O(1) enqueue and dequeue operations'],
    disadvantages: ['No direct indexing access to middle elements'],
    applications: ['Breadth-First Search (BFS)', 'CPU Task Scheduling', 'Printer Spooling', 'Sliding Window Max/Min'],
    javaCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class DequeDemo {
    public static void main(String[] args) {
        Deque<Integer> deque = new ArrayDeque<>();
        deque.addLast(10);
        deque.addLast(20);
        deque.addFirst(5); // [5, 10, 20]
        System.out.println("First: " + deque.peekFirst()); // 5
        System.out.println("Last: " + deque.peekLast());   // 20
    }
}`,
    cppCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(10);
    dq.push_back(20);
    dq.push_front(5);
    cout << "Front: " << dq.front() << ", Back: " << dq.back() << endl;
    return 0;
}`,
    pythonCode: `from collections import deque

dq = deque()
dq.append(10)
dq.append(20)
dq.appendleft(5)
print(f"Front: {dq[0]}, Back: {dq[-1]}")`,
    jsCode: `const dq = [];
dq.push(10);
dq.push(20);
dq.unshift(5); // [5, 10, 20]
console.log("Front:", dq[0], "Back:", dq[dq.length - 1]);`,
    example: 'Operations: Enqueue 10, Enqueue 20, PushFront 5\nOutput: Front = 5, Back = 20',
    output: 'Front: 5, Back: 20',
    interviewQuestions: [
      {
        question: 'How does Monotonic Queue optimize Sliding Window Maximum to O(N)?',
        answer: 'By keeping indices of useful elements in a decreasing deque. Elements smaller than current are popped from rear because they can never be the maximum in future windows.',
        companyTags: ['Google', 'Meta', 'Netflix'],
      },
    ],
    commonMistakes: [
      'Using Array.shift() in JavaScript loops without realizing it takes O(N) time (use true Deque / pointer based queue).',
    ],
    relatedProblems: [
      { title: 'Sliding Window Maximum', difficulty: 'Hard', link: '/practice/question/sliding-window-maximum' },
      { title: 'Implement Queue using Stacks', difficulty: 'Easy', link: '/practice/question/queue-using-stacks' },
    ],
    visualizationId: 'queue',
    tags: ['queue', 'deque', 'fifo', 'bfs'],
    estimatedReadTime: 7,
    revisionNotes: 'Queue = FIFO. Deque = Double-ended O(1) operations. Use for BFS and Sliding Window max/min.',
    cheatSheet: 'Enqueue/Dequeue O(1). Sliding Window Max -> Monotonic Deque O(N).',
    references: ['Visualgo Queue & Deque'],
    published: true,
    order: 7,
  },

  {
    title: 'Binary Tree & Tree Traversals',
    slug: 'tree',
    category: 'Tree',
    subcategory: 'Non-Linear Data Structures',
    difficulty: 'Medium' as const,
    description: 'Hierarchical tree structure, Binary Tree properties, Inorder, Preorder, Postorder, Level-order traversals, LCA, and Tree Height.',
    definition: 'A Binary Tree is a hierarchical non-linear data structure where each node has at most two children, referred to as the left child and right child.',
    introduction: 'Trees represent hierarchical relationships such as file systems, DOM trees, and decision trees. Traversals systematically visit all tree nodes once.',
    whyUsed: 'Provides hierarchical organization, efficient searching in balanced variants (AVL/Red-Black), and natural representation for recursive expressions.',
    working: 'Nodes contain value, left child pointer, right child pointer. Traversals:\n- Inorder: Left -> Root -> Right\n- Preorder: Root -> Left -> Right\n- Postorder: Left -> Right -> Root\n- Level-Order: BFS using Queue.',
    algorithm: 'Inorder Traversal Algorithm:\n1. Recursively traverse left subtree.\n2. Process root node.\n3. Recursively traverse right subtree.',
    flow: 'Root -> Recursively Visit Left Subtree -> Visit Root -> Recursively Visit Right Subtree.',
    dryRun: 'Tree: Root 1, Left 2, Right 3\nInorder: Visit Left (2) -> Root (1) -> Right (3) => Output: 2, 1, 3',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
      description: 'Every traversal visits all N nodes exactly once in O(N) time.',
    },
    spaceComplexity: {
      auxiliary: 'O(H)',
      worst: 'O(N)',
      description: 'Recursion stack space equals Tree Height H (O(log N) for balanced trees, O(N) for skewed trees).',
    },
    advantages: ['Reflects hierarchical data structures naturally', 'Subtree decomposition allows clean divide-and-conquer logic'],
    disadvantages: ['Skewed trees degrade performance to linear O(N) linked list behaviour'],
    applications: ['DOM Trees in Web Browsers', 'Abstract Syntax Trees (AST) in Compilers', 'File Systems (Directories and Files)'],
    javaCode: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class TreeTraversal {
    public static void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }
}`,
    cppCode: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}`,
    pythonCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root: TreeNode):
    if not root:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)`,
    jsCode: `function inorder(root) {
  if (!root) return;
  inorder(root.left);
  process.stdout.write(root.val + " ");
  inorder(root.right);
}`,
    example: 'Tree: 1 -> (left: 2, right: 3)\nInorder Output: 2 1 3',
    output: 'Inorder Traversal: 2 1 3',
    interviewQuestions: [
      {
        question: 'What is Lowest Common Ancestor (LCA) in a Binary Tree?',
        answer: 'The lowest node in a tree that has both p and q as descendants. Can be found recursively in O(N) time.',
        companyTags: ['Amazon', 'Google', 'Meta'],
      },
    ],
    commonMistakes: [
      'Forgetting base case (root == null) in recursive tree algorithms causing StackOverflowException.',
    ],
    relatedProblems: [
      { title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', link: '/practice/question/inorder-traversal' },
      { title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', link: '/practice/question/lowest-common-ancestor' },
    ],
    visualizationId: 'binary-tree',
    tags: ['tree', 'binary-tree', 'traversals', 'recursion'],
    estimatedReadTime: 9,
    revisionNotes: 'Inorder = Left Root Right (returns sorted order in BST!). Preorder = Root Left Right. Postorder = Left Right Root.',
    cheatSheet: 'All Traversals take O(N) time. Stack space O(H) where H = height of tree.',
    references: ['CLRS Tree Traversals'],
    published: true,
    order: 8,
  },

  {
    title: 'Binary Search Tree (BST) & Self-Balancing Trees',
    slug: 'bst',
    category: 'BST',
    subcategory: 'Trees',
    difficulty: 'Medium' as const,
    description: 'BST property (left < root < right), search, insertion, deletion (successor swap), AVL and Red-Black tree principles.',
    definition: 'A Binary Search Tree (BST) is a binary tree with the ordering property: for every node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater.',
    introduction: 'BST provides logarithmic search O(log N), dynamic insertions, and range queries. Inorder traversal of a BST yields elements in strictly ascending sorted order.',
    whyUsed: 'Used when dynamic insertions/deletions and sorted order lookups/range queries are required simultaneously.',
    working: 'Search: Compare key with root. If key < root.val go left, if key > root.val go right, else found. Deletion handles 3 cases: leaf node, single child, or two children (replace with inorder successor).',
    algorithm: 'BST Search Algorithm:\n1. If root is null or root.val == target, return root.\n2. If target < root.val, return search(root.left, target).\n3. Else return search(root.right, target).',
    flow: 'Compare Node -> Go Left if Smaller -> Go Right if Greater -> Found or Null.',
    dryRun: 'Search 7 in BST with Root 10, Left 5 (Right 8), Right 15:\n7 < 10 -> Go Left (5)\n7 > 5 -> Go Right (8)\n7 < 8 -> Go Left (Null) -> 7 Not Found!',
    timeComplexity: {
      best: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(N)',
      description: 'Search, Insert, Delete take O(H) time. H = log N for balanced trees (AVL/Red-Black), O(N) for skewed BSTs.',
    },
    spaceComplexity: {
      auxiliary: 'O(H)',
      worst: 'O(N)',
      description: 'O(H) recursion call stack depth.',
    },
    advantages: ['Sorted traversal via Inorder in O(N)', 'Dynamic insertion & fast lookup in balanced configurations'],
    disadvantages: ['Can degenerate into skewed linked list O(N) without self-balancing (AVL/Red-Black) rotations'],
    applications: ['Database Indexing (B-Trees / Red-Black Trees)', 'Java TreeMap / TreeSet', 'C++ std::map / std::set'],
    javaCode: `public class BSTDemo {
    public static TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
    }
}`,
    cppCode: `TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    return val < root->val ? searchBST(root->left, val) : searchBST(root->right, val);
}`,
    pythonCode: `def search_bst(root: TreeNode, val: int) -> TreeNode:
    if not root or root.val == val:
        return root
    return search_bst(root.left, val) if val < root.val else search_bst(root.right, val)`,
    jsCode: `function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}`,
    example: 'BST Root = 10, Target = 5\nOutput: Subtree rooted at 5',
    output: 'Found node with value: 5',
    interviewQuestions: [
      {
        question: 'How do you validate if a Binary Tree is a valid BST?',
        answer: 'Pass valid range [min, max] down recursively. For current node, verify min < node.val < max, then recurse left with [min, node.val] and right with [node.val, max].',
        companyTags: ['Amazon', 'Google', 'Microsoft'],
      },
    ],
    commonMistakes: [
      'Only checking immediate left and right child values without verifying full left/right subtrees satisfy BST property.',
    ],
    relatedProblems: [
      { title: 'Validate Binary Search Tree', difficulty: 'Medium', link: '/practice/question/validate-bst' },
      { title: 'Kth Smallest Element in a BST', difficulty: 'Medium', link: '/practice/question/kth-smallest-bst' },
    ],
    visualizationId: 'bst',
    tags: ['bst', 'tree', 'searching', 'binary-search-tree'],
    estimatedReadTime: 9,
    revisionNotes: 'BST Inorder = Ascending Sorted Order! Search & Insert take O(H) time.',
    cheatSheet: 'Balanced BST -> O(log N) Search/Insert/Delete. Inorder -> Sorted Array.',
    references: ['CLRS Chapter 12 Binary Search Trees'],
    published: true,
    order: 9,
  },

  {
    title: 'Heap & Priority Queue',
    slug: 'heap',
    category: 'Heap',
    subcategory: 'Tree-Based Structures',
    difficulty: 'Medium' as const,
    description: 'Binary Heap (Min-Heap & Max-Heap), Heapify algorithm, Priority Queue operations, HeapSort, and Top-K element extraction.',
    definition: 'A Heap is a complete binary tree stored in an array satisfying the Heap Property: in a Max-Heap, parent >= children; in a Min-Heap, parent <= children.',
    introduction: 'Heaps enable immediate constant-time O(1) access to minimum or maximum elements. Array index mapping: Parent(i) = (i-1)/2, Left(i) = 2i+1, Right(i) = 2i+2.',
    whyUsed: 'Essential for Priority Queues, Dijkstra Shortest Path algorithm, Prim MST, and finding Top K Frequent / Kth Largest elements.',
    working: 'Insert: Append element to end of array and bubble-up (sift-up) in O(log N). Extract-Min/Max: Swap root with last element, pop last, and sink-down (heapify) in O(log N).',
    algorithm: 'Build Heap (Heapify) Algorithm:\n1. Start from last non-leaf index (N/2 - 1) down to 0.\n2. Call heapifyDown on each index.\n3. Total time to build heap from array is linear O(N).',
    flow: 'Array -> Parent/Child Index Math -> Sift-Up on Insert -> Sift-Down on Extract -> Min/Max at Index 0.',
    dryRun: 'Min Heap Push 5 into [10, 20]:\nAppend 5 -> Array [10, 20, 5]\nCompare with parent 10: 5 < 10 -> Swap\nArray becomes [5, 20, 10] -> Min element at Index 0 is 5.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
      description: 'Get Min/Max: O(1). Insert: O(log N). Extract Min/Max: O(log N). Build Heap: O(N).',
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      worst: 'O(N)',
      description: 'Array storage representation requires O(N) space.',
    },
    advantages: ['Fast O(1) access to min/max element', 'O(N) linear time heap construction', 'No pointer overhead (array storage)'],
    disadvantages: ['No efficient arbitrary search O(N)', 'Not sorted (only root guarantee)'],
    applications: ['Priority Queue', 'Dijkstra & Prim Algorithms', 'Kth Largest / Smallest Element', 'Median in Data Stream'],
    javaCode: `import java.util.PriorityQueue;

public class HeapDemo {
    public static void main(String[] args) {
        // Min Heap by default
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(30);
        minHeap.add(10);
        minHeap.add(20);
        System.out.println("Min Element: " + minHeap.peek()); // 10
        System.out.println("Extracted: " + minHeap.poll());  // 10
    }
}`,
    cppCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    // Max Heap by default
    priority_queue<int> maxHeap;
    maxHeap.push(30);
    maxHeap.push(10);
    maxHeap.push(20);
    cout << "Max Element: " << maxHeap.top() << endl; // 30
    return 0;
}`,
    pythonCode: `import heapq

min_heap = []
heapq.heappush(min_heap, 30)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 20)
print(f"Min Element: {min_heap[0]}") # 10
print(f"Extracted: {heapq.heappop(min_heap)}") # 10`,
    jsCode: `// Max Heap array simulation
class MinHeap {
  constructor() { this.heap = []; }
  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  bubbleUp(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
}`,
    example: 'Input: Push 30, Push 10, Push 20\nOutput: Peek Min = 10',
    output: 'Min Element: 10',
    interviewQuestions: [
      {
        question: 'Why is Build Heap time complexity O(N) instead of O(N log N)?',
        answer: 'Summing node heights: N/4 nodes have height 1, N/8 nodes have height 2... Sum S = N * sum(h / 2^h) converges to 2, yielding O(N).',
        companyTags: ['Amazon', 'Google', 'Meta'],
      },
    ],
    commonMistakes: [
      'Assuming Heap is fully sorted (only root is guaranteed min/max).',
    ],
    relatedProblems: [
      { title: 'Kth Largest Element in an Array', difficulty: 'Medium', link: '/practice/question/kth-largest' },
      { title: 'Find Median from Data Stream', difficulty: 'Hard', link: '/practice/question/find-median' },
    ],
    visualizationId: 'heap-sort',
    tags: ['heap', 'priority-queue', 'min-heap', 'max-heap'],
    estimatedReadTime: 9,
    revisionNotes: 'Build Heap = O(N). Peek Min/Max = O(1). Push/Pop = O(log N). Min Heap parent <= child.',
    cheatSheet: 'Parent index: (i-1)/2, Left: 2i+1, Right: 2i+2. Build Heap O(N), Top K O(N log K).',
    references: ['CLRS Chapter 6 Heapsort'],
    published: true,
    order: 10,
  },

  {
    title: 'Trie (Prefix Tree)',
    slug: 'trie',
    category: 'Trie',
    subcategory: 'Tree-Based Structures',
    difficulty: 'Medium' as const,
    description: 'Prefix Tree data structure, insert, search, startsWith prefix matching, and autocomplete engine design.',
    definition: 'A Trie (Prefix Tree) is a specialized search tree used to store associative data structures, primarily string keys, where nodes represent character prefixes.',
    introduction: 'Tries enable prefix search and string lookup in O(L) time where L is word length, independent of total dictionary size N.',
    whyUsed: 'Power search engine autocomplete suggestions, spell checkers, IP routing tables, and word puzzle solvers.',
    working: 'Root node represents empty prefix. Each node contains array/map of child node references indexed by character (\'a\'-\'z\') and boolean isEndOfWord flag.',
    algorithm: 'Trie Insert Word Algorithm:\n1. Start at root.\n2. For each char in word: calculate index = char - \'a\'.\n3. If children[index] is null, instantiate new TrieNode.\n4. Move curr to child.\n5. Set curr.isEndOfWord = true at end.',
    flow: 'Root -> Match Char Path -> Create Node if Missing -> Set isEndOfWord Flag.',
    dryRun: 'Insert "cat":\nRoot -> Child[\'c\'] -> Child[\'a\'] -> Child[\'t\'] (isEndOfWord = true).\nSearch "car": Root -> \'c\' -> \'a\' -> \'r\' is Null -> Return False.',
    timeComplexity: {
      best: 'O(L)',
      average: 'O(L)',
      worst: 'O(L)',
      description: 'Insert, Search, and StartsWith operate in O(L) where L is the length of the string.',
    },
    spaceComplexity: {
      auxiliary: 'O(ALPHABET_SIZE * L * N)',
      worst: 'O(ALPHABET_SIZE * L * N)',
      description: 'Node memory storage for characters across stored dictionary keys.',
    },
    advantages: ['Blazing fast prefix lookup O(L)', 'No hash collision penalties'],
    disadvantages: ['High memory consumption for sparse pointer arrays'],
    applications: ['Autocomplete & Search Suggestions', 'Spell Checking', 'IP Routing (Longest Prefix Match)', 'Word Boggle Solvers'],
    javaCode: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord = false;
}

public class Trie {
    private TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEndOfWord;
    }
}`,
    cppCode: `#include <iostream>
#include <string>
using namespace std;

class TrieNode {
public:
    TrieNode* children[26];
    bool isEndOfWord;
    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; i++) children[i] = nullptr;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) curr->children[idx] = new TrieNode();
            curr = curr->children[idx];
        }
        curr->isEndOfWord = true;
    }
};`,
    pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end_of_word`,
    jsCode: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) curr.children[char] = new TrieNode();
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
}`,
    example: 'Insert "apple", Search "apple" -> true, Search "app" -> false (StartsWith "app" -> true)',
    output: 'Search "apple": true',
    interviewQuestions: [
      {
        question: 'How does Trie compare to Hash Table for string lookups?',
        answer: 'Hash Table requires computing full string hash O(L) and may suffer collisions. Trie handles prefix matching effortlessly and avoids hash collisions.',
        companyTags: ['Google', 'Microsoft', 'Uber'],
      },
    ],
    commonMistakes: [
      'Forgetting to set isEndOfWord = true causing search() to return false for valid stored words.',
    ],
    relatedProblems: [
      { title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', link: '/practice/question/implement-trie' },
      { title: 'Word Search II', difficulty: 'Hard', link: '/practice/question/word-search-ii' },
    ],
    visualizationId: 'trie',
    tags: ['trie', 'prefix-tree', 'string', 'autocomplete'],
    estimatedReadTime: 9,
    revisionNotes: 'Trie time complexity depends on word length L, NOT dictionary size N! Node children array size = 26.',
    cheatSheet: 'Insert O(L), Search O(L), StartsWith O(L). Perfect for Autocomplete.',
    references: ['LeetCode Trie Tag'],
    published: true,
    order: 11,
  },

  {
    title: 'Graph Algorithms (BFS & DFS)',
    slug: 'graph',
    category: 'Graph',
    subcategory: 'Non-Linear Data Structures',
    difficulty: 'Medium' as const,
    description: 'Graph representation (Adjacency Matrix & Adjacency List), Breadth-First Search (BFS), Depth-First Search (DFS), and Connected Components.',
    definition: 'A Graph is a non-linear data structure comprising a set of Vertices (V) connected by Edges (E). Graphs can be directed/undirected and weighted/unweighted.',
    introduction: 'Graphs model networks, social connections, road maps, web link indexing, and dependency graphs.',
    whyUsed: 'Used for shortest path routing, topological ordering, network flow, connected component discovery, and cycle detection.',
    working: 'BFS uses a Queue to explore neighbors level-by-level (unweighted shortest path). DFS uses a Stack/Recursion to explore paths as deep as possible before backtracking.',
    algorithm: 'BFS Algorithm:\n1. Create Queue and visited boolean array.\n2. Enqueue start vertex and mark visited.\n3. While queue not empty: dequeue u, iterate neighbors v of u. If v not visited: mark visited and enqueue v.',
    flow: 'Start Node -> Queue Level Order -> Visit Neighbors -> Track Visited -> Continue Level by Level.',
    dryRun: 'Graph: 0-1, 0-2, 1-2. BFS from 0:\nQueue [0], Visited {0}\nDequeue 0 -> Neighbors 1, 2 -> Queue [1, 2], Visited {0, 1, 2}\nDequeue 1 -> Neighbor 2 (visited)\nDequeue 2 -> Done!\nBFS Order: 0, 1, 2',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      description: 'Both BFS and DFS visit every vertex V and traverse every edge E in O(V + E) time.',
    },
    spaceComplexity: {
      auxiliary: 'O(V)',
      worst: 'O(V)',
      description: 'Visited array and Queue/Recursion stack proportional to Vertices count V.',
    },
    advantages: ['BFS finds shortest path in unweighted graphs', 'DFS explores deep branch paths and uses low stack space on deep graphs'],
    disadvantages: ['High memory overhead for dense graphs represented as adjacency matrices O(V^2)'],
    applications: ['Social Networks (Friends recommendation)', 'GPS Navigation Systems', 'Web Crawling', 'Garbage Collection (Mark & Sweep)'],
    javaCode: `import java.util.*;

public class GraphBFS {
    public static void bfs(int start, List<List<Integer>> adj, int V) {
        boolean[] visited = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        visited[start] = true;
        q.add(start);

        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.add(v);
                }
            }
        }
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int start, const vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    pythonCode: `from collections import deque

def bfs(start: int, adj: list, V: int):
    visited = [False] * V
    q = deque([start])
    visited[start] = True

    while q:
        u = q.popleft()
        print(u, end=" ")
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                q.append(v)`,
    jsCode: `function bfs(start, adj, V) {
  const visited = new Array(V).fill(false);
  const q = [start];
  visited[start] = true;

  while (q.length > 0) {
    const u = q.shift();
    process.stdout.write(u + " ");
    for (let v of adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
      }
    }
  }
}`,
    example: 'Graph Vertices: 4, Edges: (0,1), (0,2), (1,2), (2,3)\nBFS from 0 Output: 0 1 2 3',
    output: 'BFS Order: 0 1 2 3',
    interviewQuestions: [
      {
        question: 'When should you use BFS vs DFS?',
        answer: 'Use BFS when finding shortest path in unweighted graphs or level-by-level traversal. Use DFS for cycle detection, topological sort, backtracking, or path searching.',
        companyTags: ['Amazon', 'Google', 'Meta', 'Uber'],
      },
    ],
    commonMistakes: [
      'Forgetting to mark nodes as visited immediately upon pushing to queue, causing infinite loops in cyclic graphs.',
    ],
    relatedProblems: [
      { title: 'Number of Islands', difficulty: 'Medium', link: '/practice/question/number-of-islands' },
      { title: 'Word Ladder', difficulty: 'Hard', link: '/practice/question/word-ladder' },
    ],
    visualizationId: 'bfs',
    tags: ['graph', 'bfs', 'dfs', 'shortest-path'],
    estimatedReadTime: 10,
    revisionNotes: 'BFS = Queue + Level Order (Shortest path in unweighted graphs). DFS = Stack/Recursion + Deep branch traversal.',
    cheatSheet: 'Time: O(V + E). Space: O(V). Adjacency List is preferred over Adjacency Matrix.',
    references: ['CLRS Graph Algorithms Chapter 22'],
    published: true,
    order: 12,
  },

  {
    title: 'Dynamic Programming (DP)',
    slug: 'dynamic-programming',
    category: 'Dynamic Programming',
    subcategory: 'Optimization Paradigms',
    difficulty: 'Hard' as const,
    description: 'Overlapping subproblems, optimal substructure, Memoization (Top-Down) vs Tabulation (Bottom-Up), Knapsack, LCS, and LIS.',
    definition: 'Dynamic Programming (DP) is an algorithmic paradigm that breaks complex optimization problems into smaller overlapping subproblems, solving each subproblem once and storing solutions in a table.',
    introduction: 'DP transforms exponential time recursive algorithms O(2^N) into polynomial time O(N) or O(N*W) by eliminating duplicate subproblem recalculations.',
    whyUsed: 'Essential for optimization problems (max profit, min cost, shortest distance, distinct counts) with overlapping subproblems.',
    working: '1. Overlapping Subproblems: Recursion tree computes same states multiple times.\n2. Optimal Substructure: Optimal solution to problem contains optimal solutions to subproblems.',
    algorithm: '0/1 Knapsack DP State Formula:\nDP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w - wt[i-1]]) if wt[i-1] <= w else DP[i-1][w].',
    flow: 'Define DP State -> Write Base Case -> Determine State Transition -> Tabulate / Memoize -> Return Final State.',
    dryRun: 'Fibonacci N = 4:\nMemoized DP array [0, 1, 1, 2, 3]\nF(4) = F(3) + F(2) = 2 + 1 = 3 (computed in linear O(N) time).',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N * W)',
      worst: 'O(N * W)',
      description: 'Equal to Number of States * Transition Time per State.',
    },
    spaceComplexity: {
      auxiliary: 'O(N)',
      worst: 'O(N * W)',
      description: 'DP Table storage size (can often be space-optimized to O(W) using 1D rolling array).',
    },
    advantages: ['Dramatically optimizes exponential brute-force algorithms to polynomial time'],
    disadvantages: ['Requires significant memory for DP state matrices'],
    applications: ['Resource Allocation (0/1 Knapsack)', 'DNA Sequence Alignment (Edit Distance / LCS)', 'Shortest Path (Floyd-Warshall / Bellman-Ford)', 'Stock Trading Strategies'],
    javaCode: `public class KnapsackDP {
    public static int knapsack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (wt[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
    pythonCode: `def knapsack(W: int, wt: list, val: list, n: int) -> int:
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`,
    jsCode: `function knapsack(W, wt, val, n) {
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (wt[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][W];
}`,
    example: 'Weights = [1, 2, 3], Values = [10, 15, 40], Capacity W = 6\nMax Profit: 65',
    output: 'Max Knapsack Value: 65',
    interviewQuestions: [
      {
        question: 'What is the key difference between Memoization and Tabulation?',
        answer: 'Memoization is Top-Down (recursive + call stack + cache map). Tabulation is Bottom-Up (iterative + array table loop). Tabulation avoids recursion stack overflow.',
        companyTags: ['Google', 'Meta', 'Amazon', 'Apple'],
      },
    ],
    commonMistakes: [
      'Incorrect state representation or missing base case initializations.',
    ],
    relatedProblems: [
      { title: 'Climbing Stairs', difficulty: 'Easy', link: '/practice/question/climbing-stairs' },
      { title: 'Coin Change', difficulty: 'Medium', link: '/practice/question/coin-change' },
      { title: 'Longest Common Subsequence', difficulty: 'Medium', link: '/practice/question/lcs' },
    ],
    visualizationId: 'dp-knapsack',
    tags: ['dp', 'dynamic-programming', 'knapsack', 'memoization'],
    estimatedReadTime: 12,
    revisionNotes: '2 Requirements for DP: Overlapping Subproblems & Optimal Substructure. DP Time = States * Transitions.',
    cheatSheet: 'Memoization = Top-Down Recursion. Tabulation = Bottom-Up Iteration. Knapsack O(N*W).',
    references: ['CLRS Chapter 15 Dynamic Programming'],
    published: true,
    order: 13,
  },

  {
    title: 'Disjoint Set Union (DSU / Union-Find)',
    slug: 'disjoint-set-union',
    category: 'Disjoint Set Union',
    subcategory: 'Advanced Data Structures',
    difficulty: 'Hard' as const,
    description: 'Disjoint Set Union (DSU), Path Compression, Union by Rank / Size, Cycle Detection, and Kruskal MST.',
    definition: 'Disjoint Set Union (DSU / Union-Find) is a data structure tracking elements partitioned into non-overlapping (disjoint) sets, supporting Find and Union operations in near-constant O(alpha(N)) amortized time.',
    introduction: 'DSU enables efficient dynamic connectivity queries, cycle detection in undirected graphs, and Minimum Spanning Tree construction (Kruskal algorithm).',
    whyUsed: 'Provides nearly O(1) constant time set unification and representative component lookups.',
    working: 'Maintain parent array. Find(u) locates representative root with Path Compression (pointing nodes directly to root). Union(u, v) merges sets using Union by Rank/Size.',
    algorithm: 'Path Compression & Union by Rank Algorithm:\nFind(u):\n  If parent[u] != u: parent[u] = Find(parent[u]) // Path Compression\n  Return parent[u]\n\nUnion(u, v):\n  RootU = Find(u), RootV = Find(v)\n  If RootU != RootV: attach lower rank tree under higher rank tree.',
    flow: 'Element u -> Follow Parent Pointers -> Path Compression -> Set Representative Root.',
    dryRun: 'Elements 0, 1, 2, 3:\nUnion(0, 1) -> 1 parent is 0\nUnion(2, 3) -> 3 parent is 2\nUnion(1, 3) -> 2 parent is 0\nFind(3) compresses path: 3 directly points to Root 0!',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(α(N))',
      worst: 'O(α(N))',
      description: 'Amortized time per operation is O(α(N)) where α is Inverse Ackermann function (α(N) < 5 for all practical universe sizes).',
    },
    spaceComplexity: {
      auxiliary: 'O(N)',
      worst: 'O(N)',
      description: 'Parent and Rank arrays storage size N.',
    },
    advantages: ['Near-constant O(1) amortized Find and Union operations', 'Extremely low memory footprint'],
    disadvantages: ['Does not support set splitting or element removal'],
    applications: ['Kruskal Minimum Spanning Tree (MST)', 'Graph Cycle Detection', 'Connected Components Count', 'Image Grid Region Segmentation'],
    javaCode: `public class DSU {
    int[] parent, rank;
    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    public boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false; // Cycle detected
    }
}`,
    cppCode: `#include <vector>
using namespace std;

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unionSets(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false;
    }
};`,
    pythonCode: `class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            return True
        return False`,
    jsCode: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }
  union(i, j) {
    const rI = this.find(i), rJ = this.find(j);
    if (rI !== rJ) {
      if (this.rank[rI] < this.rank[rJ]) this.parent[rI] = rJ;
      else if (this.rank[rI] > this.rank[rJ]) this.parent[rJ] = rI;
      else {
        this.parent[rJ] = rI;
        this.rank[rI]++;
      }
      return true;
    }
    return false;
  }
}`,
    example: 'Union(0, 1), Union(1, 2), Find(2) == Find(0) -> Output: true',
    output: 'Connected component check: true',
    interviewQuestions: [
      {
        question: 'What is the time complexity of DSU with Path Compression and Union by Rank?',
        answer: 'O(α(N)) amortized per operation, where α is the Inverse Ackermann function. For all practical values of N, α(N) <= 4, making it effectively O(1).',
        companyTags: ['Google', 'Meta', 'Amazon'],
      },
    ],
    commonMistakes: [
      'Omitting path compression parent[i] = find(parent[i]), degrading Find operations to O(N).',
    ],
    relatedProblems: [
      { title: 'Redundant Connection', difficulty: 'Medium', link: '/practice/question/redundant-connection' },
      { title: 'Number of Operations to Make Network Connected', difficulty: 'Medium', link: '/practice/question/make-network-connected' },
    ],
    visualizationId: 'union-find',
    tags: ['dsu', 'union-find', 'graph', 'kruskal'],
    estimatedReadTime: 9,
    revisionNotes: 'Path Compression + Union by Rank = O(α(N)) amortized time. Essential for Kruskal MST & Cycle detection.',
    cheatSheet: 'Find O(α(N)), Union O(α(N)). Path Compression flattens parent tree.',
    references: ['CLRS Disjoint Sets'],
    published: true,
    order: 14,
  },
];

export async function seedNotesDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🌱 Connected to MongoDB for Notes seeding...');

    // Upsert each initial note
    for (const noteData of initialNotesData) {
      await Note.findOneAndUpdate(
        { slug: noteData.slug },
        { ...noteData, published: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ Seeded Note: ${noteData.title}`);
    }

    console.log('🎉 All DSA Knowledge Base Notes seeded successfully!');
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
