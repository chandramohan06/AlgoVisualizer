// ─────────────────────────────────────────────────────────────────────────────
// DSA Methods Explorer Registry
// Every category, group, and method is declared here.
// The MethodsExplorer sidebar reads this single source of truth.
// Adding a new method is a one-line metadata entry — zero logic changes needed.
// ─────────────────────────────────────────────────────────────────────────────

export interface OperationInputParam {
  name: string;
  label: string;
  type: 'number' | 'string' | 'select';
  defaultValue?: any;
  options?: string[];
  placeholder?: string;
}

export interface DSAOperationMeta {
  id: string;
  label: string;
  category: string;
  group: string; // e.g. "Basic", "Searching", "Sorting", "Advanced"
  description: string;
  inputs: OperationInputParam[];
  timeComplexity: string;
  spaceComplexity: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Full Methods Registry
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORY_OPERATIONS_REGISTRY: Record<string, DSAOperationMeta[]> = {

  // ── ARRAY ──────────────────────────────────────────────────────────────────
  array: [
    // 📂 Basic
    { id: 'traverse',         label: 'Traversal',            category: 'array', group: 'Basic',     description: 'Sequentially visit each element from index 0 to N-1.',                     inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'insert_index',     label: 'Insertion',            category: 'array', group: 'Basic',     description: 'Insert a new value at a specific index, shifting elements right.',          inputs: [{ name: 'index', label: 'Index', type: 'number', defaultValue: 2 }, { name: 'val', label: 'Value', type: 'number', defaultValue: 99 }], timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'delete_index',     label: 'Deletion',             category: 'array', group: 'Basic',     description: 'Remove element at a specific index, shifting remaining elements left.',     inputs: [{ name: 'index', label: 'Index', type: 'number', defaultValue: 2 }],                                                timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'update_index',     label: 'Update',               category: 'array', group: 'Basic',     description: 'Overwrite element value at a given index in O(1) time.',                   inputs: [{ name: 'index', label: 'Index', type: 'number', defaultValue: 0 }, { name: 'val', label: 'New Value', type: 'number', defaultValue: 88 }], timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    { id: 'find_max',         label: 'Maximum',              category: 'array', group: 'Basic',     description: 'Scan entire array to find the maximum value.',                              inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'find_min',         label: 'Minimum',              category: 'array', group: 'Basic',     description: 'Scan entire array to find the minimum value.',                              inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'second_largest',   label: 'Second Largest',       category: 'array', group: 'Basic',     description: 'Find the second largest element using a single pass.',                      inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'reverse',          label: 'Reverse',              category: 'array', group: 'Basic',     description: 'Reverse array elements in-place using two pointers.',                       inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'rotate_left',      label: 'Rotate Left',          category: 'array', group: 'Basic',     description: 'Shift all elements left by one position cyclically.',                       inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'rotate_right',     label: 'Rotate Right',         category: 'array', group: 'Basic',     description: 'Shift all elements right by one position cyclically.',                      inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'merge_arrays',     label: 'Merge Arrays',         category: 'array', group: 'Basic',     description: 'Merge two sorted arrays into one sorted array.',                            inputs: [],                                                                                                                  timeComplexity: 'O(N+M)',     spaceComplexity: 'O(N+M)' },
    { id: 'remove_duplicates',label: 'Remove Duplicates',    category: 'array', group: 'Basic',     description: 'Remove duplicate elements and return unique elements.',                     inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },

    // 📂 Searching
    { id: 'linear_search',    label: 'Linear Search',        category: 'array', group: 'Searching', description: 'Scan array from index 0 to find target value.',                            inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 7 }],                                               timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'binary_search',    label: 'Binary Search',        category: 'array', group: 'Searching', description: 'Search for target in sorted array by halving the range.',                  inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 7 }],                                               timeComplexity: 'O(log N)',   spaceComplexity: 'O(1)' },
    { id: 'lower_bound',      label: 'Lower Bound',          category: 'array', group: 'Searching', description: 'Find first position where element >= target using binary search.',          inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 5 }],                                               timeComplexity: 'O(log N)',   spaceComplexity: 'O(1)' },
    { id: 'upper_bound',      label: 'Upper Bound',          category: 'array', group: 'Searching', description: 'Find first position where element > target using binary search.',           inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 5 }],                                               timeComplexity: 'O(log N)',   spaceComplexity: 'O(1)' },
    { id: 'search_insert_pos',label: 'Search Insert Position',category: 'array',group: 'Searching', description: 'Find index to insert target keeping array sorted.',                        inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 6 }],                                               timeComplexity: 'O(log N)',   spaceComplexity: 'O(1)' },

    // 📂 Sorting
    { id: 'bubble_sort',      label: 'Bubble Sort',          category: 'array', group: 'Sorting',   description: 'Repeatedly swap adjacent elements if out of order. O(N²) average.',       inputs: [],                                                                                                                  timeComplexity: 'O(N²)',      spaceComplexity: 'O(1)' },
    { id: 'selection_sort',   label: 'Selection Sort',       category: 'array', group: 'Sorting',   description: 'Select minimum from unsorted portion and place at current index.',         inputs: [],                                                                                                                  timeComplexity: 'O(N²)',      spaceComplexity: 'O(1)' },
    { id: 'insertion_sort',   label: 'Insertion Sort',       category: 'array', group: 'Sorting',   description: 'Build sorted array one element at a time by inserting into position.',     inputs: [],                                                                                                                  timeComplexity: 'O(N²)',      spaceComplexity: 'O(1)' },
    { id: 'merge_sort',       label: 'Merge Sort',           category: 'array', group: 'Sorting',   description: 'Divide array in half, sort each half, then merge. Stable O(N log N).',    inputs: [],                                                                                                                  timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)' },
    { id: 'quick_sort',       label: 'Quick Sort',           category: 'array', group: 'Sorting',   description: 'Partition around a pivot and recursively sort subarrays.',                 inputs: [],                                                                                                                  timeComplexity: 'O(N log N)', spaceComplexity: 'O(log N)' },
    { id: 'heap_sort',        label: 'Heap Sort',            category: 'array', group: 'Sorting',   description: 'Build a max-heap, extract max repeatedly to sort in-place.',               inputs: [],                                                                                                                  timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)' },

    // 📂 Advanced
    { id: 'prefix_sum',       label: 'Prefix Sum',           category: 'array', group: 'Advanced',  description: 'Build prefix sum array to answer range sum queries in O(1).',              inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(N)' },
    { id: 'kadane',           label: "Kadane's Algorithm",   category: 'array', group: 'Advanced',  description: 'Find maximum subarray sum using dynamic local/global max tracking.',        inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'sliding_window',   label: 'Sliding Window',       category: 'array', group: 'Advanced',  description: 'Use a fixed or variable window to track subarray properties.',             inputs: [{ name: 'k', label: 'Window Size', type: 'number', defaultValue: 3 }],                                               timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'two_sum',          label: 'Two Sum',              category: 'array', group: 'Advanced',  description: 'Find two indices whose values sum to the target.',                         inputs: [{ name: 'target', label: 'Target Sum', type: 'number', defaultValue: 9 }],                                            timeComplexity: 'O(N)',       spaceComplexity: 'O(N)' },
    { id: 'three_sum',        label: 'Three Sum',            category: 'array', group: 'Advanced',  description: 'Find all unique triplets that sum to zero using two pointers.',            inputs: [],                                                                                                                  timeComplexity: 'O(N²)',      spaceComplexity: 'O(1)' },
    { id: 'move_zeroes',      label: 'Move Zeroes',          category: 'array', group: 'Advanced',  description: 'Move all zeroes to the end while maintaining relative order.',             inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
    { id: 'dutch_flag',       label: 'Dutch National Flag',  category: 'array', group: 'Advanced',  description: 'Sort an array of 0s, 1s, 2s using three-pointer partition.',               inputs: [],                                                                                                                  timeComplexity: 'O(N)',       spaceComplexity: 'O(1)' },
  ],

  // ── STRING ─────────────────────────────────────────────────────────────────
  string: [
    { id: 'char_traversal',   label: 'Character Traversal',  category: 'string', group: 'Basic',    description: 'Visit each character in string sequentially.',                             inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'string_reverse',   label: 'String Reverse',       category: 'string', group: 'Basic',    description: 'Reverse characters in string using two pointers.',                         inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'palindrome',       label: 'Palindrome Check',     category: 'string', group: 'Basic',    description: 'Check if string reads same forward and backward.',                         inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'anagram',          label: 'Anagram Check',        category: 'string', group: 'Basic',    description: 'Check if two strings are permutations of each other.',                     inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'kmp',              label: 'KMP Pattern Search',   category: 'string', group: 'Advanced', description: 'Knuth-Morris-Pratt pattern searching using Longest Prefix Suffix table.',   inputs: [{ name: 'pattern', label: 'Pattern', type: 'string', defaultValue: 'abc' }],       timeComplexity: 'O(N+M)',spaceComplexity: 'O(M)' },
  ],

  // ── LINKED LIST ────────────────────────────────────────────────────────────
  'linked-list': [
    // 📂 Basic
    { id: 'traverse',         label: 'Traverse',             category: 'linked-list', group: 'Basic',    description: 'Walk nodes from head to tail printing each value.',                      inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'insert_head',      label: 'Insert at Beginning',  category: 'linked-list', group: 'Basic',    description: 'Add new node before current head; update head pointer.',                 inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 99 }],               timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'insert_tail',      label: 'Insert at End',        category: 'linked-list', group: 'Basic',    description: 'Traverse to tail and append new node.',                                  inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 99 }],               timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'insert_position',  label: 'Insert at Position',   category: 'linked-list', group: 'Basic',    description: 'Traverse to given position and splice new node.',                        inputs: [{ name: 'pos', label: 'Position', type: 'number', defaultValue: 2 }, { name: 'val', label: 'Value', type: 'number', defaultValue: 99 }], timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    { id: 'delete_head',      label: 'Delete at Beginning',  category: 'linked-list', group: 'Basic',    description: 'Remove current head node and update head pointer.',                      inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'delete_tail',      label: 'Delete at End',        category: 'linked-list', group: 'Basic',    description: 'Traverse to second-last node and unlink tail.',                          inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'delete_position',  label: 'Delete at Position',   category: 'linked-list', group: 'Basic',    description: 'Traverse to position-1 and bypass target node.',                         inputs: [{ name: 'pos', label: 'Position', type: 'number', defaultValue: 1 }],             timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'update',           label: 'Update',               category: 'linked-list', group: 'Basic',    description: 'Traverse to a position and update node value.',                          inputs: [{ name: 'pos', label: 'Position', type: 'number', defaultValue: 1 }, { name: 'val', label: 'New Value', type: 'number', defaultValue: 55 }], timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    { id: 'search',           label: 'Search',               category: 'linked-list', group: 'Basic',    description: 'Walk nodes to find first occurrence of target value.',                    inputs: [{ name: 'target', label: 'Target', type: 'number', defaultValue: 20 }],           timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'reverse',          label: 'Reverse',              category: 'linked-list', group: 'Basic',    description: 'Reverse linked list in-place by re-wiring next pointers.',                inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },

    // 📂 Advanced
    { id: 'middle_node',      label: 'Middle Node',          category: 'linked-list', group: 'Advanced', description: 'Use slow/fast pointer technique to find middle node.',                    inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'detect_cycle',     label: 'Detect Cycle',         category: 'linked-list', group: 'Advanced', description: "Floyd's tortoise & hare algorithm to detect a cycle.",                   inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'merge_lists',      label: 'Merge Sorted Lists',   category: 'linked-list', group: 'Advanced', description: 'Merge two sorted linked lists into one sorted list.',                     inputs: [],                                                                                                  timeComplexity: 'O(N+M)',spaceComplexity: 'O(1)' },
    { id: 'sort_list',        label: 'Sort List',            category: 'linked-list', group: 'Advanced', description: 'Sort linked list using merge sort in O(N log N) time.',                  inputs: [],                                                                                                  timeComplexity: 'O(N log N)', spaceComplexity: 'O(log N)' },
    { id: 'palindrome',       label: 'Palindrome Check',     category: 'linked-list', group: 'Advanced', description: 'Check if linked list is palindrome using reverse second half.',           inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
    { id: 'intersection',     label: 'Intersection Node',    category: 'linked-list', group: 'Advanced', description: 'Find intersection node of two linked lists using length difference.',     inputs: [],                                                                                                  timeComplexity: 'O(N+M)',spaceComplexity: 'O(1)' },
  ],

  // ── STACK ──────────────────────────────────────────────────────────────────
  stack: [
    { id: 'push',             label: 'Push',                 category: 'stack', group: 'Operations', description: 'Push a value onto the top of the stack.',                                   inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 50 }],               timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'pop',              label: 'Pop',                  category: 'stack', group: 'Operations', description: 'Remove and return the top element from the stack.',                          inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'peek',             label: 'Peek / Top',           category: 'stack', group: 'Operations', description: 'Inspect the top element without removing it.',                               inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'size',             label: 'Size',                 category: 'stack', group: 'Operations', description: 'Return the number of elements currently in the stack.',                      inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'clear',            label: 'Clear',                category: 'stack', group: 'Operations', description: 'Remove all elements from the stack.',                                        inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'balanced_parens',  label: 'Balanced Parentheses', category: 'stack', group: 'Applications', description: 'Validate balanced brackets using stack-based matching.',                  inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(N)' },
    { id: 'expr_eval',        label: 'Expression Evaluation',category: 'stack', group: 'Applications', description: 'Evaluate arithmetic expression using operator and operand stacks.',       inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(N)' },
    { id: 'next_greater',     label: 'Next Greater Element', category: 'stack', group: 'Applications', description: 'Find next greater element for each index using monotonic stack.',         inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(N)' },
  ],

  // ── QUEUE ──────────────────────────────────────────────────────────────────
  queue: [
    { id: 'enqueue',          label: 'Enqueue',              category: 'queue', group: 'Operations', description: 'Add element to the rear of the queue.',                                     inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 50 }],               timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'dequeue',          label: 'Dequeue',              category: 'queue', group: 'Operations', description: 'Remove and return element from the front of the queue.',                    inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'peek',             label: 'Front Peek',           category: 'queue', group: 'Operations', description: 'Inspect the front element without removing it.',                             inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'rear',             label: 'Rear',                 category: 'queue', group: 'Operations', description: 'Inspect the rear element without removing it.',                              inputs: [],                                                                                                  timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'circular_queue',   label: 'Circular Queue',       category: 'queue', group: 'Variants',   description: 'Queue with circular buffer where rear wraps to front.',                      inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 30 }],               timeComplexity: 'O(1)',  spaceComplexity: 'O(N)' },
    { id: 'deque',            label: 'Deque (Double-Ended)', category: 'queue', group: 'Variants',   description: 'Queue allowing insertion and deletion at both ends.',                        inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 30 }],               timeComplexity: 'O(1)',  spaceComplexity: 'O(N)' },
    { id: 'priority_queue',   label: 'Priority Queue',       category: 'queue', group: 'Variants',   description: 'Queue where elements dequeue in priority order using a heap.',               inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 30 }],               timeComplexity: 'O(log N)', spaceComplexity: 'O(N)' },
  ],

  // ── BIT MANIPULATION ───────────────────────────────────────────────────────
  'bit-manipulation': [
    { id: 'set_bit',          label: 'Set Bit',              category: 'bit-manipulation', group: 'Operations', description: 'Set k-th bit of number using bitwise OR mask.',                   inputs: [{ name: 'pos', label: 'Bit Position', type: 'number', defaultValue: 2 }],         timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'clear_bit',        label: 'Clear Bit',            category: 'bit-manipulation', group: 'Operations', description: 'Clear k-th bit of number using bitwise AND NOT mask.',            inputs: [{ name: 'pos', label: 'Bit Position', type: 'number', defaultValue: 2 }],         timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'toggle_bit',       label: 'Toggle Bit',           category: 'bit-manipulation', group: 'Operations', description: 'Toggle k-th bit of number using bitwise XOR mask.',               inputs: [{ name: 'pos', label: 'Bit Position', type: 'number', defaultValue: 2 }],         timeComplexity: 'O(1)',  spaceComplexity: 'O(1)' },
    { id: 'count_bits',       label: 'Count Set Bits',       category: 'bit-manipulation', group: 'Operations', description: 'Count set bits using Brian Kernighan bitmask algorithm.',           inputs: [],                                                                                                  timeComplexity: 'O(K)',  spaceComplexity: 'O(1)' },
    { id: 'single_number',    label: 'Single Number',        category: 'bit-manipulation', group: 'Applications', description: 'Find non-repeating element using XOR properties.',            inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(1)' },
  ],

  // ── TREE ───────────────────────────────────────────────────────────────────
  tree: [
    { id: 'insert',           label: 'Insert Node',          category: 'tree', group: 'Modifications', description: 'Insert value into Binary Search Tree following BST invariant.',           inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 18 }],               timeComplexity: 'O(log N)', spaceComplexity: 'O(H)' },
    { id: 'delete',           label: 'Delete Node',          category: 'tree', group: 'Modifications', description: 'Delete a node handling three cases: leaf, one child, two children.',     inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 15 }],               timeComplexity: 'O(log N)', spaceComplexity: 'O(H)' },
    { id: 'search',           label: 'Search Node',          category: 'tree', group: 'Modifications', description: 'Search for a target value in BST navigating left/right.',                inputs: [{ name: 'val', label: 'Target', type: 'number', defaultValue: 15 }],              timeComplexity: 'O(log N)', spaceComplexity: 'O(H)' },
    { id: 'inorder',          label: 'Inorder Traversal',    category: 'tree', group: 'Traversals',    description: 'Visit Left → Node → Right. Produces sorted sequence for BST.',           inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(H)' },
    { id: 'preorder',         label: 'Preorder Traversal',   category: 'tree', group: 'Traversals',    description: 'Visit Node → Left → Right. Used for tree serialization.',                 inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(H)' },
    { id: 'postorder',        label: 'Postorder Traversal',  category: 'tree', group: 'Traversals',    description: 'Visit Left → Right → Node. Used to delete or evaluate expression trees.', inputs: [],                                                                                                  timeComplexity: 'O(N)', spaceComplexity: 'O(H)' },
    { id: 'levelorder',       label: 'Level Order (BFS)',    category: 'tree', group: 'Traversals',    description: 'Visit nodes level by level using a queue.',                               inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(W)' },
    { id: 'height',           label: 'Tree Height',          category: 'tree', group: 'Properties',    description: 'Compute the height of the tree using recursive DFS.',                     inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(H)' },
    { id: 'diameter',         label: 'Diameter',             category: 'tree', group: 'Properties',    description: 'Find the longest path between any two nodes in the tree.',                 inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(H)' },
    { id: 'mirror',           label: 'Mirror Tree',          category: 'tree', group: 'Properties',    description: 'Swap left and right subtrees recursively to mirror the tree.',             inputs: [],                                                                                                  timeComplexity: 'O(N)',  spaceComplexity: 'O(H)' },
    { id: 'lca',              label: 'LCA',                  category: 'tree', group: 'Properties',    description: 'Find Lowest Common Ancestor of two nodes using recursive descent.',        inputs: [{ name: 'n1', label: 'Node 1', type: 'number', defaultValue: 4 }, { name: 'n2', label: 'Node 2', type: 'number', defaultValue: 12 }], timeComplexity: 'O(N)', spaceComplexity: 'O(H)' },
  ],

  // ── HEAP ───────────────────────────────────────────────────────────────────
  heap: [
    { id: 'insert',           label: 'Insert Value',         category: 'heap', group: 'Operations', description: 'Insert into heap then sift-up to restore heap property.',                    inputs: [{ name: 'val', label: 'Value', type: 'number', defaultValue: 5 }],               timeComplexity: 'O(log N)', spaceComplexity: 'O(1)' },
    { id: 'extract_min',      label: 'Extract Min/Max',      category: 'heap', group: 'Operations', description: 'Remove root, place last element at root, sift-down.',                        inputs: [],                                                                                                  timeComplexity: 'O(log N)', spaceComplexity: 'O(1)' },
    { id: 'heapify',          label: 'Build Heap (Heapify)', category: 'heap', group: 'Operations', description: 'Build a valid heap from an arbitrary array in O(N) time.',                   inputs: [],                                                                                                  timeComplexity: 'O(N)',     spaceComplexity: 'O(1)' },
  ],

  // ── GRAPH ──────────────────────────────────────────────────────────────────
  graph: [
    // 📂 Traversal
    { id: 'bfs',              label: 'BFS',                  category: 'graph', group: 'Traversal',      description: 'Breadth-First Search: explore layer by layer from source.',              inputs: [{ name: 'source', label: 'Start Node', type: 'string', defaultValue: 'A' }],      timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },
    { id: 'dfs',              label: 'DFS',                  category: 'graph', group: 'Traversal',      description: 'Depth-First Search: explore as deep as possible along each branch.',    inputs: [{ name: 'source', label: 'Start Node', type: 'string', defaultValue: 'A' }],      timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },

    // 📂 Shortest Path
    { id: 'dijkstra',         label: 'Dijkstra',             category: 'graph', group: 'Shortest Path',  description: 'Find shortest paths from source using greedy priority queue.',            inputs: [{ name: 'source', label: 'Start Node', type: 'string', defaultValue: 'A' }],      timeComplexity: 'O((V+E) log V)', spaceComplexity: 'O(V)' },
    { id: 'bellman_ford',     label: 'Bellman-Ford',         category: 'graph', group: 'Shortest Path',  description: 'Handle negative weight edges; detect negative cycles.',                   inputs: [{ name: 'source', label: 'Start Node', type: 'string', defaultValue: 'A' }],      timeComplexity: 'O(VE)', spaceComplexity: 'O(V)' },
    { id: 'floyd_warshall',   label: 'Floyd-Warshall',       category: 'graph', group: 'Shortest Path',  description: 'All-pairs shortest paths using dynamic programming matrix.',              inputs: [],                                                                                                  timeComplexity: 'O(V³)', spaceComplexity: 'O(V²)' },

    // 📂 MST
    { id: 'prim',             label: "Prim's MST",           category: 'graph', group: 'MST',            description: "Build minimum spanning tree greedily from a source vertex.",              inputs: [],                                                                                                  timeComplexity: 'O((V+E) log V)', spaceComplexity: 'O(V)' },
    { id: 'kruskal',          label: "Kruskal's MST",        category: 'graph', group: 'MST',            description: 'Sort edges and add to MST if they do not form a cycle (Union-Find).',    inputs: [],                                                                                                  timeComplexity: 'O(E log E)', spaceComplexity: 'O(V)' },

    // 📂 Others
    { id: 'topo_sort',        label: 'Topological Sort',     category: 'graph', group: 'Others',         description: 'Order vertices such that every directed edge goes from earlier to later.', inputs: [],                                                                                                  timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },
    { id: 'cycle_detection',  label: 'Cycle Detection',      category: 'graph', group: 'Others',         description: 'Detect if a cycle exists in directed or undirected graph.',               inputs: [],                                                                                                  timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },
    { id: 'connected_comp',   label: 'Connected Components', category: 'graph', group: 'Others',         description: 'Count and label all connected components using DFS/BFS.',                 inputs: [],                                                                                                  timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },
    { id: 'scc',              label: "SCC (Kosaraju's)",     category: 'graph', group: 'Others',         description: "Find all strongly connected components using Kosaraju's algorithm.",     inputs: [],                                                                                                  timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)' },
    { id: 'add_edge',         label: 'Add Edge',             category: 'graph', group: 'Others',         description: 'Add an edge between two vertices with an optional weight.',               inputs: [{ name: 'source', label: 'From', type: 'string', defaultValue: 'A' }, { name: 'dest', label: 'To', type: 'string', defaultValue: 'D' }, { name: 'weight', label: 'Weight', type: 'number', defaultValue: 1 }], timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
  ],

  // ── RECURSION ──────────────────────────────────────────────────────────────
  recursion: [
    { id: 'execute',          label: 'Execute Recursion',    category: 'recursion',    group: 'Operations', description: 'Trace recursive calls and activation frames on the call stack.',     inputs: [{ name: 'val', label: 'N Value', type: 'number', defaultValue: 4 }],               timeComplexity: 'O(N)',  spaceComplexity: 'O(N)' },
  ],

  // ── BACKTRACKING ───────────────────────────────────────────────────────────
  backtracking: [
    { id: 'explore',          label: 'Run Backtracking',     category: 'backtracking', group: 'Operations', description: 'Explore decision choices and undo (backtrack) on dead ends.',         inputs: [{ name: 'val', label: 'Board N', type: 'number', defaultValue: 4 }],               timeComplexity: 'O(N!)', spaceComplexity: 'O(N)' },
  ],

  // ── GREEDY ─────────────────────────────────────────────────────────────────
  greedy: [
    { id: 'select',           label: 'Execute Greedy Choice', category: 'greedy',      group: 'Operations', description: 'Greedily pick the locally optimal choice at each step.',               inputs: [],                                                                                                  timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)' },
  ],

  // ── DYNAMIC PROGRAMMING ────────────────────────────────────────────────────
  'dynamic-programming': [
    { id: 'tabulate',         label: 'Build DP Table',       category: 'dynamic-programming', group: 'Operations', description: 'Fill DP matrix bottom-up using the state transition formula.', inputs: [{ name: 'val', label: 'Input N', type: 'number', defaultValue: 5 }],            timeComplexity: 'O(N)',  spaceComplexity: 'O(N)' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get all operations for a category
// ─────────────────────────────────────────────────────────────────────────────
export function getCategoryOperations(categorySlug?: string): DSAOperationMeta[] {
  const normCat = (categorySlug || 'array').toLowerCase();
  return CATEGORY_OPERATIONS_REGISTRY[normCat] || CATEGORY_OPERATIONS_REGISTRY['array'];
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get unique groups for a category (preserves insertion order)
// ─────────────────────────────────────────────────────────────────────────────
export function getCategoryGroups(categorySlug?: string): string[] {
  const ops = getCategoryOperations(categorySlug);
  return [...new Set(ops.map((op) => op.group))];
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get operations for a specific category + group
// ─────────────────────────────────────────────────────────────────────────────
export function getGroupOperations(categorySlug: string, group: string): DSAOperationMeta[] {
  return getCategoryOperations(categorySlug).filter((op) => op.group === group);
}
