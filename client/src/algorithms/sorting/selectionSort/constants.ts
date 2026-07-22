/**
 * Selection Sort Implementation Code
 */

export const SELECTION_SORT_JAVA_CODE = `void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
}`;

export const SELECTION_SORT_CPP_CODE = `void selectionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      swap(arr[i], arr[minIdx]);
    }
  }
}`;

export const SELECTION_SORT_PSEUDO_CODE = `PROCEDURE selectionSort(array):
  n ← length(array)
  FOR i FROM 0 TO n-2:
    minIdx ← i
    FOR j FROM i+1 TO n-1:
      IF array[j] < array[minIdx] THEN
        minIdx ← j
      END IF
    END FOR
    IF minIdx ≠ i THEN
      SWAP array[i] AND array[minIdx]
    END IF
  END FOR
END PROCEDURE`;

export const SELECTION_SORT_METADATA = {
  title: 'Selection Sort',
  category: 'Sorting',
  difficulty: 'easy' as const,
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  description: 'Selection Sort is a simple comparison-based sorting algorithm. It divides the input list into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.',
};
