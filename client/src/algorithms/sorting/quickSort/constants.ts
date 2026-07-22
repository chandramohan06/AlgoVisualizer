/**
 * Quick Sort Implementation Code
 */

export const QUICK_SORT_JAVA_CODE = `void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(int[] arr, int low, int high) {
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
}`;

export const QUICK_SORT_CPP_CODE = `void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}`;

export const QUICK_SORT_PSEUDO_CODE = `PROCEDURE quickSort(array, low, high):
  IF low < high THEN
    pi ← partition(array, low, high)
    quickSort(array, low, pi - 1)
    quickSort(array, pi + 1, high)
  END IF
END PROCEDURE

PROCEDURE partition(array, low, high):
  pivot ← array[high]
  i ← low - 1
  FOR j FROM low TO high - 1:
    IF array[j] < pivot THEN
      i ← i + 1
      SWAP array[i] AND array[j]
    END IF
  END FOR
  SWAP array[i + 1] AND array[high]
  RETURN i + 1
END PROCEDURE`;

export const QUICK_SORT_METADATA = {
  title: 'Quick Sort',
  category: 'Sorting',
  difficulty: 'medium' as const,
  timeComplexity: 'O(n log n) average, O(n²) worst',
  spaceComplexity: 'O(log n)',
  description: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot. It is efficient in practice and is one of the most widely used sorting algorithms.',
};
