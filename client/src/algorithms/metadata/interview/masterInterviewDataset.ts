import { InterviewQuestion } from '../interviewMetadata';
import { ARRAYS_INTERVIEW_QUESTIONS } from './arraysInterview';
import { STRINGS_INTERVIEW_QUESTIONS } from './stringsInterview';
import { ADVANCED_STRINGS_INTERVIEW_QUESTIONS } from './advancedStringsInterview';
import { LINKED_LIST_INTERVIEW_QUESTIONS } from './linkedListInterview';
import { STACK_INTERVIEW_QUESTIONS } from './stackInterview';
import { QUEUE_INTERVIEW_QUESTIONS } from './queueInterview';
import { TREES_INTERVIEW_QUESTIONS } from './treesInterview';
import { BST_INTERVIEW_QUESTIONS } from './bstInterview';
import { TRIE_INTERVIEW_QUESTIONS } from './trieInterview';
import { HEAP_INTERVIEW_QUESTIONS } from './heapInterview';
import { GRAPHS_INTERVIEW_QUESTIONS } from './graphsInterview';
import { RECURSION_INTERVIEW_QUESTIONS } from './recursionInterview';
import { BACKTRACKING_INTERVIEW_QUESTIONS } from './backtrackingInterview';
import { GREEDY_INTERVIEW_QUESTIONS } from './greedyInterview';
import { DP_INTERVIEW_QUESTIONS } from './dpInterview';

export const MASTER_500_INTERVIEW_DATASET: InterviewQuestion[] = [
  ...ARRAYS_INTERVIEW_QUESTIONS,
  ...STRINGS_INTERVIEW_QUESTIONS,
  ...ADVANCED_STRINGS_INTERVIEW_QUESTIONS,
  ...LINKED_LIST_INTERVIEW_QUESTIONS,
  ...STACK_INTERVIEW_QUESTIONS,
  ...QUEUE_INTERVIEW_QUESTIONS,
  ...TREES_INTERVIEW_QUESTIONS,
  ...BST_INTERVIEW_QUESTIONS,
  ...TRIE_INTERVIEW_QUESTIONS,
  ...HEAP_INTERVIEW_QUESTIONS,
  ...GRAPHS_INTERVIEW_QUESTIONS,
  ...RECURSION_INTERVIEW_QUESTIONS,
  ...BACKTRACKING_INTERVIEW_QUESTIONS,
  ...GREEDY_INTERVIEW_QUESTIONS,
  ...DP_INTERVIEW_QUESTIONS,
];
