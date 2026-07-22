/**
 * Insertion Sort Implementation Code
 */

export const INSERTION_SORT_JAVA_CODE = `void insertionSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`;

export const INSERTION_SORT_CPP_CODE = `void insertionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`;

export const INSERTION_SORT_PSEUDO_CODE = `PROCEDURE insertionSort(array):
  n ← length(array)
  FOR i FROM 1 TO n-1:
    key ← array[i]
    j ← i - 1
    WHILE j ≥ 0 AND array[j] > key:
      array[j + 1] ← array[j]
      j ← j - 1
    END WHILE
    array[j + 1] ← key
  END FOR
END PROCEDURE`;

export const INSERTION_SORT_METADATA = {
  title: 'Insertion Sort',
  category: 'Sorting',
  difficulty: 'easy' as const,
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  description: 'Insertion Sort is a simple comparison-based sorting algorithm. It builds the final sorted array one element at a time by inserting each element into its correct position in the already-sorted portion of the array.',
};
