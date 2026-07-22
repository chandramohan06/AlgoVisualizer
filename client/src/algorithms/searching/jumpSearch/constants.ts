export const JUMP_SEARCH_JAVA_CODE = `int jumpSearch(int[] arr, int target) {
  int n = arr.length;
  int step = (int) Math.sqrt(n);
  int prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += (int) Math.sqrt(n);
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev == Math.min(step, n)) return -1;
  }
  if (arr[prev] == target) return prev;
  return -1;
}`;

export const JUMP_SEARCH_CPP_CODE = `int jumpSearch(vector<int>& arr, int target) {
  int n = arr.size();
  int step = sqrt(n);
  int prev = 0;
  while (arr[min(step, n) - 1] < target) {
    prev = step;
    step += sqrt(n);
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev == min(step, n)) return -1;
  }
  if (arr[prev] == target) return prev;
  return -1;
}`;

export const JUMP_SEARCH_PSEUDO_CODE = `PROCEDURE jumpSearch(array, target):
  n ← length(array), step ← floor(√n)
  prev ← 0
  WHILE array[min(step,n)-1] < target:
    prev ← step
    step ← step + floor(√n)
    IF prev ≥ n: RETURN -1
  END WHILE
  WHILE array[prev] < target:
    prev ← prev + 1
    IF prev == min(step,n): RETURN -1
  END WHILE
  IF array[prev] == target: RETURN prev
  RETURN -1
END PROCEDURE`;

export const JUMP_SEARCH_METADATA = {
  title: 'Jump Search',
  category: 'Searching',
  difficulty: 'medium' as const,
  timeComplexity: 'O(√n)',
  spaceComplexity: 'O(1)',
  description:
    'Jump Search uses a two-phase approach: jump ahead by √n steps to find a block where the target might exist, then scan backward linearly within that block. Requires a sorted array and is more efficient than linear search for large datasets.',
};
