import { IComparatorStrategy } from '../judge.types';

export class PrimitiveComparator implements IComparatorStrategy {
  public compare(actual: string, expected: string): boolean {
    if (actual === undefined || actual === null) actual = '';
    if (expected === undefined || expected === null) expected = '';

    const normActual = actual.trim().toLowerCase();
    const normExpected = expected.trim().toLowerCase();

    // Boolean comparison
    if (normExpected === 'true' || normExpected === 'false') {
      return normActual === normExpected;
    }

    // Numbers & Strings comparison
    return normActual === normExpected;
  }
}
