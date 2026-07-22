import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely — prevents conflicts when composing classes.
 * Usage: cn('px-4 py-2', isActive && 'bg-primary-500', className)
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Format a number with commas.
 */
export const formatNumber = (n: number): string =>
  new Intl.NumberFormat('en-US').format(n);

/**
 * Format a date string to readable format.
 */
export const formatDate = (dateStr: string): string =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateStr));

/**
 * Get initials from a name.
 */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

/**
 * Debounce a function.
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Truncate text to max length.
 */
export const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

/**
 * Convert seconds to MM:SS display.
 */
export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * Sleep utility for animations/dev use.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
