/**
 * Bubble Sort Implementation Code
 *
 * Contains Java, C++, and Pseudocode implementations for Bubble Sort.
 * These are displayed in the CodeViewerPanel with synchronized line highlighting.
 */

export const BUBBLE_SORT_JAVA_CODE = `void bubbleSort(int[] arr) {
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
}`;

export const BUBBLE_SORT_CPP_CODE = `void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    bool swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`;

export const BUBBLE_SORT_PSEUDO_CODE = `PROCEDURE bubbleSort(array):
  n ← length(array)
  FOR i FROM 0 TO n-2:
    swapped ← false
    FOR j FROM 0 TO n-i-2:
      IF array[j] > array[j+1]:
        SWAP array[j] AND array[j+1]
        swapped ← true
      END IF
    END FOR
    IF NOT swapped THEN
      BREAK
    END IF
  END FOR
END PROCEDURE`;

export const BUBBLE_SORT_METADATA = {
  title: 'Bubble Sort',
  category: 'Sorting',
  difficulty: 'easy' as const,
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  description: 'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name because smaller elements "bubble" to the top of the list.',
};
