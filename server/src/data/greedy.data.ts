import { DSAAlgorithmEntry } from './dsa.types';

export const GREEDY_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'activity-selection',
    title: 'Activity Selection / Merge Intervals',
    categorySlug: 'greedy',
    categoryName: 'Greedy',
    topicGroup: 'Classic',
    difficulty: 'medium',
    description: 'Select maximum number of non-overlapping activities or merge overlapping intervals.',
    theory: 'Greedy choice property: Sorting activities by finish time guarantees optimal choice for non-overlapping activity selection.',
    working: 'Sort intervals by end time. Pick first interval. For each subsequent interval, if start >= current end time, select it and update end time.',
    javaCode: `import java.util.*;
public class Solution {
    public int maxActivities(int[] start, int[] end) {
        int n = start.length;
        int[][] acts = new int[n][2];
        for (int i = 0; i < n; i++) {
            acts[i][0] = start[i];
            acts[i][1] = end[i];
        }
        Arrays.sort(acts, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 1, lastEnd = acts[0][1];
        for (int i = 1; i < n; i++) {
            if (acts[i][0] >= lastEnd) {
                count++;
                lastEnd = acts[i][1];
            }
        }
        return count;
    }
}`,
    cppCode: `int maxActivities(vector<int>& start, vector<int>& end) {
    int n = start.size();
    vector<pair<int, int>> acts(n);
    for (int i = 0; i < n; ++i) acts[i] = {end[i], start[i]};
    sort(acts.begin(), acts.end());
    int count = 1, lastEnd = acts[0].first;
    for (int i = 1; i < n; ++i) {
        if (acts[i].second >= lastEnd) {
            count++;
            lastEnd = acts[i].first;
        }
    }
    return count;
}`,
    pythonCode: `def maxActivities(start, end):
    acts = sorted(zip(start, end), key=lambda x: x[1])
    count = 1
    last_end = acts[0][1]
    for s, e in acts[1:]:
        if s >= last_end:
            count += 1
            last_end = e
    return count`,
    pseudoCode: `FUNCTION maxActivities(start, end):
    COMBINE start and end into activities
    SORT activities BY end time ascending
    count = 1, lastEnd = activities[0].end
    FOR i FROM 1 TO n - 1 DO:
        IF activities[i].start >= lastEnd THEN
            count = count + 1
            lastEnd = activities[i].end
        END IF
    END FOR
    RETURN count
END FUNCTION`,
    timeComplexity: 'O(N log N) sorting + O(N) scan',
    spaceComplexity: 'O(N)',
    applications: ['Meeting room scheduling', 'CPU process dispatching', 'Bandwidth allocation'],
    interviewTips: ['Sort by end time for maximum activity count; sort by start time for merging intervals'],
    commonMistakes: ['Sorting by start time instead of end time when finding maximum non-overlapping activities'],
    leetCodeNumber: 435,
    leetCodeName: 'Non-overlapping Intervals',
    leetCodeDifficulty: 'Medium',
    leetCodePattern: 'Greedy Interval Sorting',
    leetCodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    sampleInput: 'start=[1,3,0,5,8,5], end=[2,4,6,7,9,9]',
    sampleOutput: '4 activities',
    quizzes: [
      { question: 'Primary sorting criterion for Activity Selection problem?', type: 'mcq', options: ['Finish / End time ascending', 'Start time ascending', 'Duration descending', 'Random'], correctAnswer: 'Finish / End time ascending', explanation: 'Selecting earliest finishing activity leaves maximum remaining time for future tasks.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of Activity Selection algorithm?', type: 'mcq', options: ['O(N log N)', 'O(N²)', 'O(N)', 'O(2^N)'], correctAnswer: 'O(N log N)', explanation: 'Sorting takes O(N log N) followed by O(N) linear scan.', difficulty: 'easy', points: 10 },
      { question: 'Does Greedy algorithm always guarantee global optimum?', type: 'mcq', options: ['Only if problem satisfies Greedy Choice Property and Optimal Substructure', 'Always', 'Never', 'Only for arrays'], correctAnswer: 'Only if problem satisfies Greedy Choice Property and Optimal Substructure', explanation: 'Greedy requires specific mathematical structure to guarantee optimality.', difficulty: 'easy', points: 10 },
      { question: 'Can 0/1 Knapsack be solved optimally using Greedy value/weight ratio sorting?', type: 'mcq', options: ['No, requires Dynamic Programming', 'Yes', 'Always', 'Only if weights are equal'], correctAnswer: 'No, requires Dynamic Programming', explanation: 'Fractional Knapsack works with Greedy ratio, but 0/1 Knapsack requires DP.', difficulty: 'medium', points: 15 },
      { question: 'Algorithm for optimal prefix coding data compression using Greedy strategy?', type: 'mcq', options: ['Huffman Coding', 'Dijkstra', 'Kruskal', 'Kadane'], correctAnswer: 'Huffman Coding', explanation: 'Huffman algorithm uses Min-Heap greedy merges for optimal prefix codes.', difficulty: 'medium', points: 15 },
      { question: 'Space complexity of sorting activities in-place?', type: 'mcq', options: ['O(1) to O(log N)', 'O(N²)', 'O(2^N)', 'O(N log N)'], correctAnswer: 'O(1) to O(log N)', explanation: 'In-place QuickSort or HeapSort takes O(log N) stack space.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'Merge Intervals (LeetCode 56)', description: 'Merge all overlapping intervals.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public int[][] merge(int[][] intervals) {\n    return new int[0][0];\n  }\n}', cpp: 'vector<vector<int>> merge(vector<vector<int>>& intervals) {\n  return {};\n}', python: 'def merge(intervals):\n    return []' }, testCases: [{ input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]' }], explanation: 'Sort by start time and extend current merged end.', externalLink: 'https://leetcode.com/problems/merge-intervals/' },
      { title: 'Jump Game (LeetCode 55)', description: 'Determine if you can reach last index.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public boolean canJump(int[] nums) {\n    return false;\n  }\n}', cpp: 'bool canJump(vector<int>& nums) {\n  return false;\n}', python: 'def canJump(nums):\n    return False' }, testCases: [{ input: '[2,3,1,1,4]', expectedOutput: 'true' }], explanation: 'Greedy track max reachable index.', externalLink: 'https://leetcode.com/problems/jump-game/' },
      { title: 'Gas Station (LeetCode 134)', description: 'Find starting gas station index to complete circuit.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    return -1;\n  }\n}', cpp: 'int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n  return -1;\n}', python: 'def canCompleteCircuit(gas, cost):\n    return -1' }, testCases: [{ input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', expectedOutput: '3' }], solution: 'Single pass tracking current tank and resetting start when tank < 0.', externalLink: 'https://leetcode.com/problems/gas-station/' },
    ],
  },
];
