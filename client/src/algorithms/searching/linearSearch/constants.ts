export const LINEAR_SEARCH_JAVA_CODE = `int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1;
}`;

export const LINEAR_SEARCH_CPP_CODE = `int linearSearch(vector<int>& arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1;
}`;

export const LINEAR_SEARCH_PSEUDO_CODE = `PROCEDURE linearSearch(array, target):
  FOR i FROM 0 TO length(array) - 1:
    IF array[i] == target:
      RETURN i
    END IF
  END FOR
  RETURN -1
END PROCEDURE`;

export const LINEAR_SEARCH_METADATA = {
  title: 'Linear Search',
  category: 'Searching',
  difficulty: 'easy' as const,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  description:
    'Linear Search scans every element from left to right until the target is found or the array is exhausted. Works on both sorted and unsorted arrays. Simple but slow for large datasets.',
};
