import { IComparatorStrategy, IProblemMetadata } from '../judge.types';
import { PrimitiveComparator } from './PrimitiveComparator';
import { ArrayComparator } from './ArrayComparator';
import { LinkedListComparator } from './LinkedListComparator';
import { TreeComparator } from './TreeComparator';
import { VoidInPlaceComparator } from './VoidInPlaceComparator';

export class ComparatorFactory {
  public static getComparator(metadata: IProblemMetadata): IComparatorStrategy {
    const returnType = metadata.returnType ? metadata.returnType.trim() : 'Any';

    if (returnType === 'void') {
      return new VoidInPlaceComparator();
    }

    if (returnType === 'ListNode' || returnType.includes('ListNode')) {
      return new LinkedListComparator();
    }

    if (returnType === 'TreeNode' || returnType.includes('TreeNode')) {
      return new TreeComparator();
    }

    if (
      returnType === 'Any' ||
      returnType.endsWith('[]') ||
      returnType.startsWith('List') ||
      returnType.toLowerCase().includes('list') ||
      returnType.includes('vector') ||
      returnType.includes('Array')
    ) {
      return new ArrayComparator();
    }

    return new PrimitiveComparator();
  }
}
