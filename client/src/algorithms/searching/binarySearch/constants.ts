export const BINARY_SEARCH_JAVA_CODE = `int binarySearch(int[] arr, int target) {
  int low = 0, high = arr.length - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`;

export const BINARY_SEARCH_CPP_CODE = `int binarySearch(vector<int>& arr, int target) {
  int low = 0, high = arr.size() - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`;

export const BINARY_SEARCH_PSEUDO_CODE = `PROCEDURE binarySearch(array, target):
  low ← 0, high ← length(array) - 1
  WHILE low ≤ high:
    mid ← low + floor((high - low) / 2)
    IF array[mid] == target: RETURN mid
    IF array[mid] < target: low ← mid + 1
    ELSE: high ← mid - 1
  END WHILE
  RETURN -1
END PROCEDURE`;

export const BINARY_SEARCH_METADATA = {
  title: 'Binary Search',
  category: 'Searching',
  difficulty: 'easy' as const,
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  description:
    'Binary Search eliminates half the search space each step by comparing the middle element to the target. Requires a sorted array. One of the most efficient searching algorithms with O(log n) time complexity.',
};
