import { IComparatorStrategy } from '../judge.types';

export class TreeComparator implements IComparatorStrategy {
  public compare(actual: string, expected: string): boolean {
    if (!actual && !expected) return true;

    let normActual = this.normalizeTreeString(actual);
    let normExpected = this.normalizeTreeString(expected);

    if (normActual === '[]' || normActual === 'null' || normActual === '') normActual = '[]';
    if (normExpected === '[]' || normExpected === 'null' || normExpected === '') normExpected = '[]';

    return normActual === normExpected;
  }

  private normalizeTreeString(str: string): string {
    if (!str) return '[]';
    let s = (str || '').replace(/\r/g, '').trim();
    try {
      const parsed = JSON.parse(s.replace(/'/g, '"'));
      return JSON.stringify(parsed);
    } catch {
      return s.replace(/\s+/g, '');
    }
  }
}
