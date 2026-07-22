import { DSAAlgorithmEntry } from './dsa.types';

export const LINKEDLIST_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'linked-list-traversal',
    title: 'Linked List Traversal',
    categorySlug: 'linked-list',
    categoryName: 'Linked List',
    topicGroup: 'Basic',
    difficulty: 'easy',
    description: 'Sequentially traverse nodes from head to tail following next pointers.',
    theory: 'Traversal starts at head node and advances current pointer via `current = current.next` until current is null.',
    working: 'Initialize curr = head. While curr != null, process curr.val and advance curr = curr.next.',
    javaCode: `class ListNode { int val; ListNode next; ListNode(int v){ val = v; } }
public class Solution {
    public void traverse(ListNode head) {
        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val + " -> ");
            curr = curr.next;
        }
    }
}`,
    cppCode: `struct ListNode { int val; ListNode* next; ListNode(int v): val(v), next(nullptr){} };
void traverse(ListNode* head) {
    ListNode* curr = head;
    while (curr) {
        cout << curr->val << " -> ";
        curr = curr->next;
    }
}`,
    pythonCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def traverse(head):
    curr = head
    while curr:
        print(curr.val, end=" -> ")
        curr = curr.next`,
    pseudoCode: `FUNCTION traverse(head):
    curr = head
    WHILE curr != null DO:
        PRINT curr.val
        curr = curr.next
    END WHILE
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Sequential data access', 'Dynamic memory allocation'],
    interviewQuestions: ['Difference between Array and LinkedList memory access', 'Handling null head pointer'],
    commonMistakes: ['Dereferencing null pointer', 'Infinite loop when missing next update'],
    leetCodeNumber: 206,
    leetCodeName: 'Reverse Linked List',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: 'Two Pointers',
    leetCodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    sampleInput: [1, 2, 3, 4],
    sampleOutput: '1 -> 2 -> 3 -> 4 -> null',
    quizzes: [
      { question: 'What is time complexity of traversing a linked list of size N?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Visiting N nodes sequentially takes O(N) time.', difficulty: 'easy', points: 10 },
      { question: 'What signifies end of a singly linked list?', type: 'mcq', options: ['next == null', 'next == head', 'val == 0', 'val == -1'], correctAnswer: 'next == null', explanation: 'Tail node next pointer is null.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of iterative linked list traversal?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses a single pointer variable.', difficulty: 'easy', points: 10 },
      { question: 'Can you access linked list element at index i in O(1) time?', type: 'mcq', options: ['No, requires traversing i nodes taking O(i) time', 'Yes', 'Always', 'Only if sorted'], correctAnswer: 'No, requires traversing i nodes taking O(i) time', explanation: 'Linked lists do not support random index access.', difficulty: 'medium', points: 15 },
      { question: 'What exception occurs if accessing null.next in Java?', type: 'mcq', options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'StackOverflowError', 'Compiles fine'], correctAnswer: 'NullPointerException', explanation: 'Dereferencing null reference throws NullPointerException.', difficulty: 'medium', points: 15 },
      { question: 'What is condition to terminate loop when traversing circular linked list?', type: 'mcq', options: ['curr.next == head', 'curr == null', 'val == 0', 'count == N'], correctAnswer: 'curr.next == head', explanation: 'Circular list tail points back to head.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Traverse LinkedList', description: 'Print linked list values.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void traverse(ListNode head) {}\n}', cpp: 'void traverse(ListNode* head) {}', python: 'def traverse(head):\n    pass' }, testCases: [{ input: '[1,2,3]', expectedOutput: '"1 2 3"' }], explanation: 'Loop until curr is null.', externalLink: 'https://leetcode.com/' },
      { title: 'Count LinkedList Nodes', description: 'Count total nodes in linked list.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int count(ListNode head) { return 0; }\n}', cpp: 'int count(ListNode* head) { return 0; }', python: 'def count(head):\n    return 0' }, testCases: [{ input: '[1,2,3,4]', expectedOutput: '4' }], explanation: 'Increment counter on each node.', externalLink: 'https://leetcode.com/' },
      { title: 'Sum LinkedList Elements', description: 'Return total sum of values in linked list.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int sum(ListNode head) { return 0; }\n}', cpp: 'int sum(ListNode* head) { return 0; }', python: 'def sum(head):\n    return 0' }, testCases: [{ input: '[10,20,30]', expectedOutput: '60' }], explanation: 'Accumulate node values.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    categorySlug: 'linked-list',
    categoryName: 'Linked List',
    topicGroup: 'Classic',
    difficulty: 'easy',
    description: 'Reverse a singly linked list in-place by reversing next pointers.',
    theory: 'Maintain three pointers: prev=null, curr=head, nextNode=null. Re-point curr.next = prev, advance prev = curr, curr = nextNode.',
    working: 'Loop while curr != null: nextNode = curr.next, curr.next = prev, prev = curr, curr = nextNode. Return prev as new head.',
    javaCode: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
}`,
    cppCode: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
    pythonCode: `def reverseList(head):
    prev, curr = None, head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
    pseudoCode: `FUNCTION reverseList(head):
    prev = null, curr = head
    WHILE curr != null DO:
        nextNode = curr.next
        curr.next = prev
        prev = curr
        curr = nextNode
    END WHILE
    RETURN prev
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Reversing history stacks', 'Palindrome linked list check'],
    interviewQuestions: ['Iterative vs Recursive linked list reversal', 'Memory safety during pointer reassignment'],
    commonMistakes: ['Losing reference to remaining list by reassigning curr.next before saving nextNode'],
    leetCodeNumber: 206,
    leetCodeName: 'Reverse Linked List',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: 'Two Pointers',
    leetCodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    sampleInput: [1, 2, 3, 4, 5],
    sampleOutput: '[5, 4, 3, 2, 1]',
    quizzes: [
      { question: 'Time complexity of iterative Linked List reversal?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Each node next pointer is updated once.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of iterative reversal?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses constant extra pointers.', difficulty: 'easy', points: 10 },
      { question: 'What node becomes new head of reversed list?', type: 'mcq', options: ['Original tail node', 'Original head node', 'Middle node', 'Null'], correctAnswer: 'Original tail node', explanation: 'Original last node points to previous items and becomes new head.', difficulty: 'easy', points: 10 },
      { question: 'Why is `nextNode = curr.next` saved before `curr.next = prev`?', type: 'mcq', options: ['Prevents losing reference to rest of unreversed list', 'Calculates size', 'Sorts list', 'Frees memory'], correctAnswer: 'Prevents losing reference to rest of unreversed list', explanation: 'Re-pointing curr.next overwrites next link.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of recursive linked list reversal?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Recursion call stack reaches depth N.', difficulty: 'medium', points: 15 },
      { question: 'What is returned as new head after reversal loop ends?', type: 'mcq', options: ['prev', 'curr', 'head', 'null'], correctAnswer: 'prev', explanation: 'When curr becomes null, prev holds reference to new head node.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Reverse Linked List (LeetCode 206)', description: 'Reverse singly linked list in-place.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public ListNode reverseList(ListNode head) {\n    return null;\n  }\n}', cpp: 'ListNode* reverseList(ListNode* head) {\n  return nullptr;\n}', python: 'def reverseList(head):\n    return None' }, testCases: [{ input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }], explanation: 'Three pointer iterative reversal.', externalLink: 'https://leetcode.com/problems/reverse-linked-list/' },
      { title: 'Reverse Linked List II (LeetCode 92)', description: 'Reverse nodes from position left to right.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public ListNode reverseBetween(ListNode head, int left, int right) {\n    return null;\n  }\n}', cpp: 'ListNode* reverseBetween(ListNode* head, int left, int right) {\n  return nullptr;\n}', python: 'def reverseBetween(head, left, right):\n    return None' }, testCases: [{ input: '[1,2,3,4,5], left=2, right=4', expectedOutput: '[1,4,3,2,5]' }], explanation: 'Locate left boundary and reverse segment.', externalLink: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
      { title: 'Reverse Nodes in k-Group (LeetCode 25)', description: 'Reverse nodes of list k at a time.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    return null;\n  }\n}', cpp: 'ListNode* reverseKGroup(ListNode* head, int k) {\n  return nullptr;\n}', python: 'def reverseKGroup(head, k):\n    return None' }, testCases: [{ input: '[1,2,3,4,5], k=2', expectedOutput: '[2,1,4,3,5]' }], solution: 'Check if k nodes exist then reverse block recursively.', externalLink: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
    ],
  },
  {
    slug: 'linked-list-cycle',
    title: 'Cycle Detection (Floyd\'s Algorithm)',
    categorySlug: 'linked-list',
    categoryName: 'Linked List',
    topicGroup: 'Two Pointer',
    difficulty: 'easy',
    description: 'Detect if linked list contains a cycle using Tortoise and Hare algorithm.',
    theory: 'Fast pointer moves 2 steps, slow pointer moves 1 step. If cycle exists, fast pointer will meet slow pointer.',
    working: 'Initialize slow = head, fast = head. While fast != null && fast.next != null: slow = slow.next, fast = fast.next.next. If slow == fast, return true.',
    javaCode: `public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
    cppCode: `bool hasCycle(ListNode *head) {
    if (!head) return false;
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    pythonCode: `def hasCycle(head):
    if not head:
        return False
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    pseudoCode: `FUNCTION hasCycle(head):
    slow = head, fast = head
    WHILE fast != null AND fast.next != null DO:
        slow = slow.next
        fast = fast.next.next
        IF slow == fast THEN RETURN true
    END WHILE
    RETURN false
END FUNCTION`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    applications: ['Detecting memory circular references', 'Deadlock detection'],
    interviewTips: ['Floyd cycle finding algorithm uses O(1) space; HashSet takes O(N) space'],
    commonMistakes: ['Not checking fast.next != null before accessing fast.next.next'],
    leetCodeNumber: 141,
    leetCodeName: 'Linked List Cycle',
    leetCodeDifficulty: 'Easy',
    leetCodePattern: 'Fast & Slow Pointers',
    leetCodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    sampleInput: [3, 2, 0, -4],
    sampleOutput: 'true (cycle at index 1)',
    quizzes: [
      { question: 'What is space complexity of Floyd\'s Cycle Detection algorithm?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Uses two pointer variables slow and fast.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of detecting cycle of length C in list of length N?', type: 'mcq', options: ['O(N)', 'O(N²)', 'O(N log N)', 'O(1)'], correctAnswer: 'O(N)', explanation: 'Fast pointer catches slow pointer within linear time bounds.', difficulty: 'easy', points: 10 },
      { question: 'How many steps does fast pointer take per iteration?', type: 'mcq', options: ['2 steps', '1 step', '3 steps', 'N steps'], correctAnswer: '2 steps', explanation: 'Fast moves 2 nodes (fast = fast.next.next) while slow moves 1 node.', difficulty: 'easy', points: 10 },
      { question: 'How to find start node of cycle after detecting intersection?', type: 'mcq', options: ['Reset slow to head and advance slow & fast 1 step until they meet', 'Reset fast to tail', 'Reverse list', 'Sort list'], correctAnswer: 'Reset slow to head and advance slow & fast 1 step until they meet', explanation: 'Floyd\'s algorithm proof guarantees meeting at cycle entry node.', difficulty: 'medium', points: 15 },
      { question: 'HashSet approach space complexity for cycle detection?', type: 'mcq', options: ['O(N)', 'O(1)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N)', explanation: 'Storing visited node pointers in set requires O(N) space.', difficulty: 'medium', points: 15 },
      { question: 'If fast moves 3 steps and slow moves 1 step, does cycle detection still work?', type: 'mcq', options: ['Yes', 'No', 'Only if even length', 'Never'], correctAnswer: 'Yes', explanation: 'Relative speed difference ensures meeting inside cycle.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Linked List Cycle (LeetCode 141)', description: 'Determine if linked list has a cycle.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public boolean hasCycle(ListNode head) {\n    return false;\n  }\n}', cpp: 'bool hasCycle(ListNode *head) {\n  return false;\n}', python: 'def hasCycle(head):\n    return False' }, testCases: [{ input: '[3,2,0,-4], pos=1', expectedOutput: 'true' }], explanation: 'Floyd\'s slow and fast pointer check.', externalLink: 'https://leetcode.com/problems/linked-list-cycle/' },
      { title: 'Linked List Cycle II (LeetCode 142)', description: 'Find node where cycle begins.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public ListNode detectCycle(ListNode head) {\n    return null;\n  }\n}', cpp: 'ListNode *detectCycle(ListNode *head) {\n  return nullptr;\n}', python: 'def detectCycle(head):\n    return None' }, testCases: [{ input: '[3,2,0,-4], pos=1', expectedOutput: 'node at index 1' }], explanation: 'Reset slow to head and advance both pointers at speed 1.', externalLink: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
      { title: 'Find the Duplicate Number (LeetCode 287)', description: 'Find duplicate number in array of size n+1 containing 1..n.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int findDuplicate(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int findDuplicate(vector<int>& nums) {\n  return 0;\n}', python: 'def findDuplicate(nums):\n    return 0' }, testCases: [{ input: '[1,3,4,2,2]', expectedOutput: '2' }], solution: 'Treat array values as next pointers for Floyd cycle detection.', externalLink: 'https://leetcode.com/problems/find-the-duplicate-number/' },
    ],
  },
];
