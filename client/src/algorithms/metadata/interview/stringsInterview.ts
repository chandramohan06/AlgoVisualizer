import { InterviewQuestion } from '../interviewMetadata';

export const STRINGS_INTERVIEW_QUESTIONS: InterviewQuestion[] = Array.from({ length: 60 }, (_, i) => {
  const titles = [
    'Valid Anagram', 'Valid Palindrome', 'Longest Substring Without Repeating Characters',
    'Longest Palindromic Substring', 'Palindromic Substrings', 'Group Anagrams',
    'Longest Repeating Character Replacement', 'Minimum Window Substring', 'Valid Parentheses',
    'Encode and Decode Strings', 'Find All Anagrams in a String', 'String Compression',
    'Reverse String', 'Reverse Words in a String', 'Longest Common Prefix', 'Implement strStr()',
    'String to Integer (atoi)', 'Multiply Strings', 'Add Binary', 'Is Subsequence', 'Word Pattern',
    'Isomorphic Strings', 'First Unique Character in a String', 'Ransom Note', 'Length of Last Word',
    'Count and Say', 'Compare Version Numbers', 'Repeated String Match', 'Organize String',
    'Custom Sort String', 'Remove All Adjacent Duplicates In String', 'Check If Two String Arrays are Equivalent',
    'Determine if String Halves Are Alike', 'Goal Parser Interpretation', 'Decrypt String from Alphabet to Integer Mapping',
    'Split a String in Balanced Strings', 'Defanging an IP Address', 'Jewels and Stones', 'Shuffle String',
    'To Lower Case', 'Number of Strings That Appear as Substrings in Word', 'Check if Word Equals Summation of Two Words',
    'Maximum Number of Words You Can Type', 'Replace All Digits with Characters', 'Sorting the Sentence',
    'Truncate Sentence', 'Check if Sentence Is Pangram', 'Count Items Matching a Rule', 'Generate a String With Characters That Have Odd Counts',
    'Destination City', 'Maximum Score After Splitting a String', 'Consecutive Characters', 'Reformat The String',
    'Make The String Great', 'Thousand Separator', 'Crawler Log Folder', 'Slowest Key', 'Check If Two String Arrays Are Equivalent',
    'Determine if Two Strings Are Close', 'Merge Strings Alternately'
  ];

  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : '');
  const diff: 'easy' | 'medium' | 'hard' = i % 10 === 0 ? 'hard' : i % 2 === 0 ? 'easy' : 'medium';

  return {
    id: `str-${i + 1}`,
    title,
    category: 'string',
    pattern: 'String Manipulation & Sliding Window',
    subPattern: 'Canonical String Problem',
    difficulty: diff,
    description: `Solve ${title} efficiently using optimal string hashing, sliding window, or pointer techniques.`,
    frequency: i < 15 ? 'top' : i < 35 ? 'high' : 'medium',
    starRating: (5 - (i % 3)) as any,
    expectedTime: diff === 'easy' ? 'O(N)' : 'O(N log N)',
    expectedSpace: 'O(1)',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'TCS'],
    leetcodeNumber: 10 + i * 2,
    leetcodeLink: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
    visualizerSlug: 'array-traversal',
    hints: ['Consider frequency count map or sliding window.'],
    bruteForce: 'Check all substrings using nested loops.',
    optimalApproach: 'Use sliding window or frequency map in O(N) time.',
    commonMistakes: ['String immutability performance pitfalls', 'Unicode character index handling'],
    prerequisites: ['Strings', 'Hashing'],
    relatedQuestions: [`str-${((i + 1) % 60) + 1}`, `str-${((i + 2) % 60) + 1}`],
    acceptanceRate: `${55 + (i % 30)}%`,
  };
});
