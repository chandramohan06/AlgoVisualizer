import { IComparatorStrategy } from '../judge.types';

export class LinkedListComparator implements IComparatorStrategy {
  public compare(actual: string, expected: string): boolean {
    if (!actual && !expected) return true;

    let normActual = this.normalizeLinkedList(actual);
    let normExpected = this.normalizeLinkedList(expected);

    if (normActual === '[]' || normActual === 'null' || normActual === '') normActual = '[]';
    if (normExpected === '[]' || normExpected === 'null' || normExpected === '') normExpected = '[]';

    return normActual === normExpected;
  }

  private normalizeLinkedList(str: string): string {
    if (!str) return '[]';
    let s = (str || '').replace(/\r/g, '').trim();
    if (s.includes('->')) {
      const parts = s.split('->').map((p) => p.trim()).filter(Boolean);
      return JSON.stringify(parts.map((p) => (isNaN(Number(p)) ? p : Number(p))));
    }

    try {
      const parsed = JSON.parse(s.replace(/'/g, '"'));
      return JSON.stringify(parsed);
    } catch {
      return s.replace(/\s+/g, '');
    }
  }
}
