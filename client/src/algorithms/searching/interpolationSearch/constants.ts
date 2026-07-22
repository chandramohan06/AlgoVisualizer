export const INTERPOLATION_SEARCH_JAVA_CODE = `int interpolationSearch(int[] arr, int target) {
  int low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low]
         && target <= arr[high]) {
    int pos = low + ((target - arr[low])
              * (high - low))
              / (arr[high] - arr[low]);
    if (arr[pos] == target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`;

export const INTERPOLATION_SEARCH_CPP_CODE = `int interpolationSearch(vector<int>& arr, int target) {
  int low = 0, high = arr.size() - 1;
  while (low <= high && target >= arr[low]
         && target <= arr[high]) {
    int pos = low + ((target - arr[low])
              * (high - low))
              / (arr[high] - arr[low]);
    if (arr[pos] == target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`;

export const INTERPOLATION_SEARCH_PSEUDO_CODE = `PROCEDURE interpolationSearch(array, target):
  low ← 0, high ← length(array) - 1
  WHILE low ≤ high AND target ∈ [array[low], array[high]]:
    pos ← low + floor(
      (target - array[low]) × (high - low)
      / (array[high] - array[low])
    )
    IF array[pos] == target: RETURN pos
    IF array[pos] < target: low ← pos + 1
    ELSE: high ← pos - 1
  END WHILE
  RETURN -1
END PROCEDURE`;

export const INTERPOLATION_SEARCH_METADATA = {
  title: 'Interpolation Search',
  category: 'Searching',
  difficulty: 'medium' as const,
  timeComplexity: 'O(log log n)',
  spaceComplexity: 'O(1)',
  description:
    'Interpolation Search improves on Binary Search for uniformly distributed sorted arrays by using a probe formula to estimate the likely position of the target, similar to how a human finds a word in a dictionary. Average case O(log log n), worst case O(n).',
};
