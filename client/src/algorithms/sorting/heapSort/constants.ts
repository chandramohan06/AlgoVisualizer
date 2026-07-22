/**
 * Heap Sort Implementation Code
 */

export const HEAP_SORT_JAVA_CODE = `void heapSort(int[] arr) {
  int n = arr.length;
  
  for (int i = n / 2 - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}

void heapify(int[] arr, int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest);
  }
}`;

export const HEAP_SORT_CPP_CODE = `void heapSort(vector<int>& arr) {
  int n = arr.size();
  
  for (int i = n / 2 - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  for (int i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}

void heapify(vector<int>& arr, int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest != i) {
    swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}`;

export const HEAP_SORT_PSEUDO_CODE = `PROCEDURE heapSort(array):
  n ← length(array)
  
  FOR i FROM n/2-1 DOWN TO 0:
    heapify(array, n, i)
  END FOR
  
  FOR i FROM n-1 DOWN TO 1:
    SWAP array[0] AND array[i]
    heapify(array, i, 0)
  END FOR
END PROCEDURE

PROCEDURE heapify(array, n, i):
  largest ← i
  left ← 2*i + 1
  right ← 2*i + 2
  
  IF left < n AND array[left] > array[largest] THEN
    largest ← left
  END IF
  
  IF right < n AND array[right] > array[largest] THEN
    largest ← right
  END IF
  
  IF largest ≠ i THEN
    SWAP array[i] AND array[largest]
    heapify(array, n, largest)
  END IF
END PROCEDURE`;

export const HEAP_SORT_METADATA = {
  title: 'Heap Sort',
  category: 'Sorting',
  difficulty: 'medium' as const,
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1)',
  description: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the input array, then repeatedly extracts the maximum element and rebuilds the heap.',
};
