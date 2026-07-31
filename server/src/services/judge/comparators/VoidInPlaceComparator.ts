import { IComparatorStrategy } from '../judge.types';

export class VoidInPlaceComparator implements IComparatorStrategy {
  public compare(actual: string, expected: string): boolean {
    if (!actual && !expected) return true;
    if (!actual || !expected) return false;

    const normActual = this.normalize(actual);
    const normExpected = this.normalize(expected);

    return normActual === normExpected;
  }

  private normalize(str: string): string {
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
