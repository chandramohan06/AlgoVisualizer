import { ArrayAlgorithmData } from '../array.types';

export const SORTING_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'bubble-sort',
    title: 'Bubble Sort',
    topicGroup: 'Sorting',
    difficulty: 'easy',
    description: 'Repeatedly swap adjacent elements if they are in wrong order.',
    theory: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if out of order. Larger elements "bubble up" to the end.',
    javaCode: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
    cppCode: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    pseudoCode: `FUNCTION bubbleSort(arr):
    n = length(arr)
    FOR i FROM 0 TO n - 2:
        swapped = FALSE
        FOR j FROM 0 TO n - i - 2:
            IF arr[j] > arr[j + 1] THEN
                SWAP arr[j] AND arr[j + 1]
                swapped = TRUE
            END IF
        END FOR
        IF NOT swapped THEN BREAK
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    applications: ['Teaching sorting concepts', 'Detecting nearly sorted lists'],
    interviewTips: ['Optimized version with swapped flag achieves O(N) best-case for sorted input'],
    sampleInput: [5, 1, 4, 2, 8],
    sampleOutput: '1 2 4 5 8',
    quizzes: [
      { question: 'What is the worst-case time complexity of Bubble Sort?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(2^N)'], correctAnswer: 'O(N²)', explanation: 'Worst-case comparisons: N(N-1)/2 = O(N²).', difficulty: 'easy', points: 10 },
      { question: 'What is the best-case time complexity of optimized Bubble Sort on sorted array?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'With swapped flag, stops after 1 pass of N-1 comparisons.', difficulty: 'easy', points: 10 },
      { question: 'Is Bubble Sort a stable sorting algorithm?', type: 'mcq', options: ['Yes', 'No', 'Only for even sizes', 'Only for integers'], correctAnswer: 'Yes', explanation: 'Equal elements are never swapped, preserving relative order.', difficulty: 'easy', points: 10 },
      { question: 'Where is the largest element placed after the 1st pass of Bubble Sort?', type: 'mcq', options: ['Index 0', 'Middle index', 'Last index (N-1)', 'Random index'], correctAnswer: 'Last index (N-1)', explanation: 'First pass bubbles the largest element to the last position.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of Bubble Sort?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(1)', explanation: 'Performs in-place sorting requiring constant auxiliary space.', difficulty: 'medium', points: 15 },
      { question: 'Max number of swaps performed in worst case for size N?', type: 'mcq', options: ['N', 'N - 1', 'N(N - 1) / 2', 'N²'], correctAnswer: 'N(N - 1) / 2', explanation: 'Reverse sorted array requires maximum possible swaps.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Implement Bubble Sort', description: 'Sort array in ascending order using Bubble Sort.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void sort(int[] nums) {\n  }\n}', cpp: 'void sort(vector<int>& nums) {\n}' }, testCases: [{ input: '[5,1,4,2,8]', expectedOutput: '[1,2,4,5,8]' }], solution: 'Nested loop with adjacent swaps.', externalLink: 'https://leetcode.com/' },
      { title: 'Count Swaps in Bubble Sort', description: 'Count total swap operations needed to sort array.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int countSwaps(int[] nums) {\n    return 0;\n  }\n}', cpp: 'int countSwaps(vector<int>& nums) {\n  return 0;\n}' }, testCases: [{ input: '[3,2,1]', expectedOutput: '3' }], solution: 'Increment counter on swap.', externalLink: 'https://leetcode.com/' },
      { title: 'Sort Colors (LeetCode 75)', description: 'Sort array containing 0s, 1s, and 2s.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public void sortColors(int[] nums) {\n  }\n}', cpp: 'void sortColors(vector<int>& nums) {\n}' }, testCases: [{ input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]' }], solution: 'Dutch National Flag algorithm or counting sort.', externalLink: 'https://leetcode.com/problems/sort-colors/' },
    ],
  },
  {
    slug: 'selection-sort',
    title: 'Selection Sort',
    topicGroup: 'Sorting',
    difficulty: 'easy',
    description: 'Repeatedly find minimum element from unsorted portion and place at beginning.',
    theory: 'Selection Sort divides array into sorted and unsorted regions. In each pass, it finds the minimum element in unsorted region and swaps it with first unsorted element.',
    javaCode: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
    cppCode: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    pseudoCode: `FUNCTION selectionSort(arr):
    n = length(arr)
    FOR i FROM 0 TO n - 2:
        minIdx = i
        FOR j FROM i + 1 TO n - 1:
            IF arr[j] < arr[minIdx] THEN minIdx = j
        END FOR
        SWAP arr[i] AND arr[minIdx]
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    applications: ['Sorting small arrays where write memory operations are expensive'],
    interviewTips: ['Makes at most N swaps, making it useful when write operations are costlier than reads'],
    sampleInput: [64, 25, 12, 22, 11],
    sampleOutput: '11 12 22 25 64',
    quizzes: [
      { question: 'What is the maximum number of swap operations in Selection Sort for size N?', type: 'mcq', options: ['N', 'N - 1', 'N²', 'N log N'], correctAnswer: 'N - 1', explanation: 'Selection Sort performs exactly 1 swap per outer loop pass (N-1 total).', difficulty: 'easy', points: 10 },
      { question: 'Is standard Selection Sort stable?', type: 'mcq', options: ['Yes', 'No', 'Only for unique elements', 'Always'], correctAnswer: 'No', explanation: 'Swapping distant elements can alter relative order of equal keys.', difficulty: 'easy', points: 10 },
      { question: 'What is best-case time complexity of Selection Sort?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N²)', explanation: 'Always performs N(N-1)/2 comparisons regardless of initial order.', difficulty: 'easy', points: 10 },
      { question: 'What property makes Selection Sort useful in EEPROM / flash memory?', type: 'mcq', options: ['Minimizes memory writes (O(N) swaps)', 'Fastest speed', 'Uses recursion', 'Cache friendly'], correctAnswer: 'Minimizes memory writes (O(N) swaps)', explanation: 'Flash memory wears out with writes; O(N) swaps minimizes wear.', difficulty: 'medium', points: 15 },
      { question: 'Which index is filled correctly after 2 passes of Selection Sort?', type: 'mcq', options: ['Indices 0 and 1', 'Last two indices', 'Middle indices', 'Random'], correctAnswer: 'Indices 0 and 1', explanation: 'First 2 passes select 1st and 2nd minimum elements.', difficulty: 'medium', points: 15 },
      { question: 'Number of comparisons in Selection Sort on array of size 5?', type: 'mcq', options: ['4 + 3 + 2 + 1 = 10', '5', '25', '20'], correctAnswer: '4 + 3 + 2 + 1 = 10', explanation: 'Comparisons sum to N(N-1)/2 = 5*4/2 = 10.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Selection Sort', description: 'Sort array using Selection Sort algorithm.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void sort(int[] arr) {\n  }\n}', cpp: 'void sort(vector<int>& arr) {\n}' }, testCases: [{ input: '[64,25,12,22,11]', expectedOutput: '[11,12,22,25,64]' }], solution: 'Find min index in inner loop and swap.', externalLink: 'https://leetcode.com/' },
      { title: 'K-th Smallest Element', description: 'Find K-th smallest element using partial Selection Sort.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int kthSmallest(int[] arr, int k) {\n    return 0;\n  }\n}', cpp: 'int kthSmallest(vector<int>& arr, int k) {\n  return 0;\n}' }, testCases: [{ input: '[7,10,4,3,20,15], k=3', expectedOutput: '7' }], solution: 'Run K passes of selection sort.', externalLink: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { title: 'Stable Selection Sort', description: 'Implement stable variant of Selection Sort without swapping.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public void stableSelectionSort(int[] arr) {\n  }\n}', cpp: 'void stableSelectionSort(vector<int>& arr) {\n}' }, testCases: [{ input: '[4,5,3,2,4,1]', expectedOutput: '[1,2,3,4,4,5]' }], solution: 'Shift elements instead of swapping to maintain stability.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'insertion-sort',
    title: 'Insertion Sort',
    topicGroup: 'Sorting',
    difficulty: 'easy',
    description: 'Build sorted array one element at a time by inserting in correct position.',
    theory: 'Insertion Sort iterates through array, taking current element key and shifting larger elements in sorted left portion rightward to insert key at correct index.',
    javaCode: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
    cppCode: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    pseudoCode: `FUNCTION insertionSort(arr):
    n = length(arr)
    FOR i FROM 1 TO n - 1:
        key = arr[i]
        j = i - 1
        WHILE j >= 0 AND arr[j] > key DO:
            arr[j + 1] = arr[j]
            j = j - 1
        END WHILE
        arr[j + 1] = key
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    applications: ['Online stream sorting', 'Hybrid algorithms like Timsort & IntroSort for small partitions'],
    interviewTips: ['Best-case O(N) when array is already sorted; adaptive & stable algorithm'],
    sampleInput: [12, 11, 13, 5, 6],
    sampleOutput: '5 6 11 12 13',
    quizzes: [
      { question: 'What is the best-case time complexity of Insertion Sort?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'On sorted array, inner while loop condition fails immediately (N-1 checks).', difficulty: 'easy', points: 10 },
      { question: 'Is Insertion Sort an online sorting algorithm?', type: 'mcq', options: ['Yes, can sort list as items arrive', 'No', 'Only for integers', 'Only in C++'], correctAnswer: 'Yes, can sort list as items arrive', explanation: 'Can insert new incoming stream elements into already sorted prefix.', difficulty: 'easy', points: 10 },
      { question: 'Is Insertion Sort stable?', type: 'mcq', options: ['Yes', 'No', 'Only for even sizes', 'Depends on key'], correctAnswer: 'Yes', explanation: 'While loop uses strict arr[j] > key comparison, preserving duplicate order.', difficulty: 'easy', points: 10 },
      { question: 'Why is Insertion Sort used in Timsort for small subarrays (N <= 32)?', type: 'mcq', options: ['Low overhead, cache friendly, fast O(N) on nearly sorted data', 'Parallelizable', 'Uses no CPU', 'Has O(1) time'], correctAnswer: 'Low overhead, cache friendly, fast O(N) on nearly sorted data', explanation: 'Small constant factors make Insertion Sort faster than MergeSort for tiny N.', difficulty: 'medium', points: 15 },
      { question: 'Worst-case order of input array for Insertion Sort?', type: 'mcq', options: ['Reverse sorted array', 'Already sorted array', 'Random array', 'All equal elements'], correctAnswer: 'Reverse sorted array', explanation: 'Reverse order forces maximum shifts (1 + 2 + ... + N-1).', difficulty: 'medium', points: 15 },
      { question: 'Number of inversions in array equals total shifts in Insertion Sort. True or False?', type: 'mcq', options: ['True', 'False', 'Only for positive numbers', 'Only if N is odd'], correctAnswer: 'True', explanation: 'Each adjacent shift reduces inversion count by exactly 1.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Insertion Sort', description: 'Sort array using Insertion Sort.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void sort(int[] arr) {\n  }\n}', cpp: 'void sort(vector<int>& arr) {\n}' }, testCases: [{ input: '[12,11,13,5,6]', expectedOutput: '[5,6,11,12,13]' }], solution: 'Shift elements right and place key.', externalLink: 'https://leetcode.com/' },
      { title: 'Insertion Sort List', description: 'Sort a singly linked list using insertion sort.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public ListNode insertionSortList(ListNode head) {\n    return head;\n  }\n}', cpp: 'ListNode* insertionSortList(ListNode* head) {\n  return head;\n}' }, testCases: [{ input: '[4,2,1,3]', expectedOutput: '[1,2,3,4]' }], solution: 'Maintain sorted dummy head list and insert.', externalLink: 'https://leetcode.com/problems/insertion-sort-list/' },
      { title: 'Count Inversions', description: 'Count number of inversions in array using Insertion Sort concept.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public long countInversions(int[] arr) {\n    return 0;\n  }\n}', cpp: 'long long countInversions(vector<int>& arr) {\n  return 0;\n}' }, testCases: [{ input: '[2,4,1,3,5]', expectedOutput: '3' }], solution: 'Use Merge Sort or Fenwick Tree for O(N log N) inversion count.', externalLink: 'https://leetcode.com/' },
    ],
  },
  {
    slug: 'merge-sort',
    title: 'Merge Sort',
    topicGroup: 'Sorting',
    difficulty: 'medium',
    description: 'Divide and conquer sorting algorithm that recursively halves array and merges sorted halves.',
    theory: 'Merge Sort divides array into two halves, recursively sorts them, and merges the two sorted halves using two-pointer merge procedure.',
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
        for (int i = 0; i < n1; i++) L[i] = arr[l + i];
        for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    cppCode: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = 0; k < temp.size(); ++k) arr[l + k] = temp[k];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    pseudoCode: `FUNCTION mergeSort(arr, l, r):
    IF l < r THEN
        m = l + (r - l) / 2
        mergeSort(arr, l, m)
        mergeSort(arr, m + 1, r)
        merge(arr, l, m, r)
    END IF
END FUNCTION`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    applications: ['External sorting on large disk data', 'LinkedList sorting', 'Counting inversions'],
    interviewTips: ['Guaranteed O(N log N) worst-case time complexity; stable sorting algorithm'],
    sampleInput: [38, 27, 43, 3, 9, 82, 10],
    sampleOutput: '3 9 10 27 38 43 82',
    quizzes: [
      { question: 'What is time complexity of Merge Sort in all cases (worst, average, best)?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N log N)', explanation: 'Always performs log N splits and O(N) merge work per level.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of standard array Merge Sort?', type: 'mcq', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], correctAnswer: 'O(N)', explanation: 'Requires O(N) auxiliary space to hold temporary merged arrays.', difficulty: 'easy', points: 10 },
      { question: 'Is Merge Sort a stable algorithm?', type: 'mcq', options: ['Yes', 'No', 'Only for numbers', 'Depends on pivot'], correctAnswer: 'Yes', explanation: 'Left element is chosen when equal (L[i] <= R[j]), preserving stability.', difficulty: 'easy', points: 10 },
      { question: 'Recurrence relation for Merge Sort time complexity?', type: 'mcq', options: ['T(N) = 2T(N/2) + O(N)', 'T(N) = T(N-1) + O(N)', 'T(N) = T(N/2) + O(1)', 'T(N) = 2T(N/2) + O(1)'], correctAnswer: 'T(N) = 2T(N/2) + O(N)', explanation: 'Splits problem into 2 subproblems of size N/2 and merges in O(N).', difficulty: 'medium', points: 15 },
      { question: 'Why is Merge Sort preferred for Linked Lists over QuickSort?', type: 'mcq', options: ['Merge Sort accesses memory sequentially; LinkedList pointer relinking takes O(1) extra space', 'QuickSort does not work on lists', 'Merge Sort is O(1) time', 'Uses less CPU'], correctAnswer: 'Merge Sort accesses memory sequentially; LinkedList pointer relinking takes O(1) extra space', explanation: 'LinkedList nodes can be merged by re-pointing pointers without O(N) array allocation.', difficulty: 'medium', points: 15 },
      { question: 'Height of recursion tree for Merge Sort on size N?', type: 'mcq', options: ['N', 'log2(N)', 'N / 2', 'N²'], correctAnswer: 'log2(N)', explanation: 'Halving input size N repeatedly yields recursion tree depth ceil(log2 N).', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Sort an Array (LeetCode 912)', description: 'Sort integer array using Merge Sort.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[] sortArray(int[] nums) {\n    return nums;\n  }\n}', cpp: 'vector<int> sortArray(vector<int>& nums) {\n  return nums;\n}' }, testCases: [{ input: '[5,2,3,1]', expectedOutput: '[1,2,3,5]' }], solution: 'Apply divide-and-conquer merge sort.', externalLink: 'https://leetcode.com/problems/sort-an-array/' },
      { title: 'Merge Sorted Array (LeetCode 88)', description: 'Merge two sorted arrays in-place into first array.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n  }\n}', cpp: 'void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n}' }, testCases: [{ input: 'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3', expectedOutput: '[1,2,2,3,5,6]' }], solution: 'Three pointers filling from back.', externalLink: 'https://leetcode.com/problems/merge-sorted-array/' },
      { title: 'Count of Smaller Numbers After Self', description: 'Count number of smaller elements to the right of each element.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<int> countSmaller(vector<int>& nums) {\n  return {};\n}' }, testCases: [{ input: '[5,2,6,1]', expectedOutput: '[2,1,1,0]' }], solution: 'Enhanced Merge Sort with index tracking.', externalLink: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
    ],
  },
  {
    slug: 'quick-sort',
    title: 'Quick Sort',
    topicGroup: 'Sorting',
    difficulty: 'medium',
    description: 'In-place divide-and-conquer sorting by partitioning array around a pivot.',
    theory: 'Quick Sort chooses a pivot element, partitions elements into smaller and larger than pivot, then recursively sorts sub-arrays.',
    javaCode: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    cppCode: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    pseudoCode: `FUNCTION quickSort(arr, low, high):
    IF low < high THEN
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
    END IF
END FUNCTION`,
    timeComplexity: 'O(N log N) Average, O(N²) Worst',
    spaceComplexity: 'O(log N) Call stack space',
    applications: ['In-memory fast general sorting', 'C++ std::sort (Introsort internal)'],
    interviewTips: ['Randomized pivot choice avoids worst-case O(N²) on sorted arrays'],
    sampleInput: [10, 80, 30, 90, 40, 50, 70],
    sampleOutput: '10 30 40 50 70 80 90',
    quizzes: [
      { question: 'What is worst-case time complexity of Quick Sort?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'], correctAnswer: 'O(N²)', explanation: 'Occurs when pivot is worst choice (smallest/largest) every time.', difficulty: 'easy', points: 10 },
      { question: 'What is average time complexity of Quick Sort?', type: 'mcq', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], correctAnswer: 'O(N log N)', explanation: 'Randomized balanced partitions yield O(N log N) average execution.', difficulty: 'easy', points: 10 },
      { question: 'Is standard Quick Sort in-place?', type: 'mcq', options: ['Yes, requires O(1) auxiliary space (excluding recursion stack)', 'No', 'Requires O(N) array copy', 'Only for numbers'], correctAnswer: 'Yes, requires O(1) auxiliary space (excluding recursion stack)', explanation: 'Swaps items directly within array bounds.', difficulty: 'easy', points: 10 },
      { question: 'How can worst-case O(N²) time complexity be avoided in QuickSort?', type: 'mcq', options: ['Randomized pivot or Median-of-Three pivot choice', 'Use insertion sort', 'Sort input first', 'Reverse array'], correctAnswer: 'Randomized pivot or Median-of-Three pivot choice', explanation: 'Random pivot selection makes O(N²) worst-case probability negligible.', difficulty: 'medium', points: 15 },
      { question: 'Lomuto vs Hoare partition scheme difference?', type: 'mcq', options: ['Hoare does fewer swaps on average than Lomuto', 'Lomuto uses 3 pointers', 'Hoare is O(N²)', 'Lomuto is stable'], correctAnswer: 'Hoare does fewer swaps on average than Lomuto', explanation: 'Hoare scheme uses 2 pointers moving inward, taking ~3x fewer swaps.', difficulty: 'medium', points: 15 },
      { question: 'Is Quick Sort stable?', type: 'mcq', options: ['No', 'Yes', 'Always', 'Only if pivot is last element'], correctAnswer: 'No', explanation: 'Distant element swaps around pivot break relative equal key order.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Quick Sort Implementation', description: 'Implement Quick Sort algorithm.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public void sort(int[] arr) {\n  }\n}', cpp: 'void sort(vector<int>& arr) {\n}' }, testCases: [{ input: '[10,80,30,90,40]', expectedOutput: '[10,30,40,80,90]' }], solution: 'Partition around pivot and recurse.', externalLink: 'https://leetcode.com/' },
      { title: 'K-th Largest Element (Quick Select)', description: 'Find K-th largest element using QuickSelect in O(N) average time.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    return 0;\n  }\n}', cpp: 'int findKthLargest(vector<int>& nums, int k) {\n  return 0;\n}' }, testCases: [{ input: '[3,2,1,5,6,4], k=2', expectedOutput: '5' }], solution: 'QuickSelect algorithm recursing on target partition half.', externalLink: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { title: 'Sort Colors (Dutch National Flag)', description: '3-way partition QuickSort variant for duplicates.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public void sortColors(int[] nums) {\n  }\n}', cpp: 'void sortColors(vector<int>& nums) {\n}' }, testCases: [{ input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]' }], solution: 'Three pointers: low, mid, high.', externalLink: 'https://leetcode.com/problems/sort-colors/' },
    ],
  },
];
