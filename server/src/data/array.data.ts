import { ArrayAlgorithmData } from './array.types';
import { BASIC_ARRAY_DATA } from './array/basic.data';
import { SEARCHING_ARRAY_DATA } from './array/searching.data';
import { SORTING_ARRAY_DATA } from './array/sorting.data';
import { TWO_POINTER_ARRAY_DATA } from './array/twoPointer.data';
import { SLIDING_WINDOW_ARRAY_DATA } from './array/slidingWindow.data';
import { PREFIX_SUM_ARRAY_DATA } from './array/prefixSum.data';
import { KADANE_ARRAY_DATA } from './array/kadane.data';
import { MATRIX_ARRAY_DATA } from './array/matrix.data';
import { MISCELLANEOUS_ARRAY_DATA } from './array/miscellaneous.data';

export * from './array.types';

export const ARRAY_ALGORITHMS_DATA: ArrayAlgorithmData[] = [
  ...BASIC_ARRAY_DATA,
  ...SEARCHING_ARRAY_DATA,
  ...SORTING_ARRAY_DATA,
  ...TWO_POINTER_ARRAY_DATA,
  ...SLIDING_WINDOW_ARRAY_DATA,
  ...PREFIX_SUM_ARRAY_DATA,
  ...KADANE_ARRAY_DATA,
  ...MATRIX_ARRAY_DATA,
  ...MISCELLANEOUS_ARRAY_DATA,
];
