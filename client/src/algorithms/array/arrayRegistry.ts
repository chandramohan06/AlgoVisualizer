import { ARRAY_ALGORITHMS_DATA, ArrayAlgorithmData } from '../../../../server/src/data/array.data';

export const ARRAY_ALGORITHMS_REGISTRY: Record<string, ArrayAlgorithmData> = ARRAY_ALGORITHMS_DATA.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, ArrayAlgorithmData>,
);
