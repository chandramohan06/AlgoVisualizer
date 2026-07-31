import { IComparatorStrategy } from '../judge.types';

export class ArrayComparator implements IComparatorStrategy {
  public compare(actual: string, expected: string): boolean {
    if (!actual && !expected) return true;
    if (!actual || !expected) return false;

    const normActual = this.normalizeArrayString(actual);
    const normExpected = this.normalizeArrayString(expected);

    return normActual === normExpected;
  }

  private normalizeArrayString(str: string): string {
    let s = (str || '').replace(/\r/g, '').trim();
    try {
      const parsed = JSON.parse(s.replace(/'/g, '"'));
      return JSON.stringify(parsed);
    } catch {
      return s
        .replace(/\[\s+/g, '[')
        .replace(/\s+\]/g, ']')
        .replace(/,\s+/g, ',')
        .replace(/"/g, '')
        .replace(/'/g, '');
    }
  }
}
