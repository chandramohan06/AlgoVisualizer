export const EXPONENTIAL_SEARCH_JAVA_CODE = `int exponentialSearch(int[] arr, int target) {
  if (arr[0] == target) return 0;
  int i = 1;
  while (i < arr.length && arr[i] <= target)
    i *= 2;
  return binarySearch(arr,
    i / 2, Math.min(i, arr.length - 1), target);
}
int binarySearch(int[] arr, int low,
                 int high, int target) {
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`;

export const EXPONENTIAL_SEARCH_CPP_CODE = `int exponentialSearch(vector<int>& arr, int target) {
  if (arr[0] == target) return 0;
  int i = 1;
  while (i < arr.size() && arr[i] <= target)
    i *= 2;
  return binarySearch(arr,
    i / 2, min(i, (int)arr.size() - 1), target);
}
int binarySearch(vector<int>& arr, int low,
                 int high, int target) {
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`;

export const EXPONENTIAL_SEARCH_PSEUDO_CODE = `PROCEDURE exponentialSearch(array, target):
  IF array[0] == target: RETURN 0
  i ← 1
  WHILE i < n AND array[i] ≤ target:
    i ← i × 2
  END WHILE
  CALL binarySearch(array, i/2, min(i, n-1), target)
END PROCEDURE

PROCEDURE binarySearch(array, low, high, target):
  WHILE low ≤ high:
    mid ← low + floor((high - low) / 2)
    IF array[mid] == target: RETURN mid
    IF array[mid] < target: low ← mid + 1
    ELSE: high ← mid - 1
  END WHILE
  RETURN -1
END PROCEDURE`;

export const EXPONENTIAL_SEARCH_METADATA = {
  title: 'Exponential Search',
  category: 'Searching',
  difficulty: 'medium' as const,
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  description:
    'Exponential Search finds the range where the target exists by doubling the bound (1→2→4→8...), then applies Binary Search within that range. Particularly useful for unbounded or infinite arrays. Both phases are O(log n).',
};
