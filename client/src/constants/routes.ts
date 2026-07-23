export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  STUDENT_LOGIN: '/student/login',
  STUDENT_SIGNUP: '/student/signup',
  ADMIN_LOGIN: '/admin/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',

  // Student Modules
  DASHBOARD: '/dashboard',
  ALGORITHMS: '/algorithms',       // Module 1: Algorithms (Learning & Visualization)
  PRACTICE: '/practice',           // Module 2: Practice (520 Interview Questions)
  QUIZ: '/quiz',                   // Module 3: Custom Quiz Builder & Assessment
  ROADMAPS: '/roadmaps',           // Module 4: Pattern Learning Roadmaps
  
  // Student Extras
  ALGORITHM_DETAIL: '/algorithms/:slug',
  ALGORITHM_QUIZ: '/algorithms/:slug/quiz',
  LEADERBOARD: '/leaderboard',
  ACHIEVEMENTS: '/achievements',
  NOTES: '/notes',
  NOTE_DETAIL: '/notes/:id',
  PROFILE: '/profile',
  PUBLIC_PROFILE: '/profile/:userId',
  DEVELOPER: '/developer',
  SETTINGS: '/settings',

  // Question Details Page
  QUESTION_DETAIL: '/practice/question/:slug',

  // Visualizer Engine
  VISUALIZER_DYNAMIC: '/visualizer/:category/:slug',
  VISUALIZER_DEMO: '/visualizer/demo',
  BUBBLE_SORT: '/visualizer/sorting/bubble-sort',
  SELECTION_SORT: '/visualizer/sorting/selection-sort',
  INSERTION_SORT: '/visualizer/sorting/insertion-sort',
  MERGE_SORT: '/visualizer/sorting/merge-sort',
  QUICK_SORT: '/visualizer/sorting/quick-sort',
  HEAP_SORT: '/visualizer/sorting/heap-sort',
  COUNTING_SORT: '/visualizer/sorting/counting-sort',
  RADIX_SORT: '/visualizer/sorting/radix-sort',

  // Searching Visualizers
  LINEAR_SEARCH: '/visualizer/searching/linear-search',
  BINARY_SEARCH: '/visualizer/searching/binary-search',
  JUMP_SEARCH: '/visualizer/searching/jump-search',
  INTERPOLATION_SEARCH: '/visualizer/searching/interpolation-search',
  EXPONENTIAL_SEARCH: '/visualizer/searching/exponential-search',

  // Graph Visualizers
  BFS: '/visualizer/graphs/bfs',
  DFS: '/visualizer/graphs/dfs',
  DIJKSTRA: '/visualizer/graphs/dijkstra',
  BELLMAN_FORD: '/visualizer/graphs/bellman-ford',
  FLOYD_WARSHALL: '/visualizer/graphs/floyd-warshall',
  PRIM_MST: '/visualizer/graphs/prim-mst',
  KRUSKAL_MST: '/visualizer/graphs/kruskal-mst',
  TOPOLOGICAL_SORT: '/visualizer/graphs/topological-sort',
  CYCLE_DETECTION: '/visualizer/graphs/cycle-detection',
  UNION_FIND: '/visualizer/graphs/union-find',

  // Linear Data Structures
  STACK: '/visualizer/linear/stack',
  QUEUE: '/visualizer/linear/queue',
  CIRCULAR_QUEUE: '/visualizer/linear/circular-queue',
  DEQUE: '/visualizer/linear/deque',
  PRIORITY_QUEUE: '/visualizer/linear/priority-queue',

  // Recursion
  RECURSION_FACTORIAL: '/visualizer/recursion/factorial',
  RECURSION_FIBONACCI: '/visualizer/recursion/fibonacci',
  RECURSION_TOWER_OF_HANOI: '/visualizer/recursion/tower-of-hanoi',
  RECURSION_MERGE_SORT_TREE: '/visualizer/recursion/merge-sort-tree',

  // Backtracking
  BACKTRACKING_N_QUEENS: '/visualizer/backtracking/n-queens',
  BACKTRACKING_SUDOKU: '/visualizer/backtracking/sudoku',
  BACKTRACKING_RAT_IN_A_MAZE: '/visualizer/backtracking/rat-in-a-maze',
  BACKTRACKING_GENERATE_PARENTHESES: '/visualizer/backtracking/generate-parentheses',

  // Dynamic Programming
  DP_FIBONACCI_MEMO: '/visualizer/dp/fibonacci-memo',
  DP_FIBONACCI_TAB: '/visualizer/dp/fibonacci-tab',
  DP_KNAPSACK: '/visualizer/dp/knapsack',
  DP_LCS: '/visualizer/dp/lcs',
  DP_LIS: '/visualizer/dp/lis',
  DP_COIN_CHANGE: '/visualizer/dp/coin-change',
  DP_EDIT_DISTANCE: '/visualizer/dp/edit-distance',

  // Greedy
  GREEDY_ACTIVITY_SELECTION: '/visualizer/greedy/activity-selection',
  GREEDY_FRACTIONAL_KNAPSACK: '/visualizer/greedy/fractional-knapsack',
  GREEDY_HUFFMAN_CODING: '/visualizer/greedy/huffman-coding',
  GREEDY_JOB_SCHEDULING: '/visualizer/greedy/job-scheduling',

  // Admin
  ADMIN: '/admin',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_STUDENT_DETAIL: '/admin/students/:id',
  ADMIN_DEVELOPER_MANAGER: '/admin/developer-manager',
  ADMIN_ALGORITHMS: '/admin/algorithms',
  ADMIN_ALGORITHMS_NEW: '/admin/algorithms/new',
  ADMIN_ALGORITHMS_EDIT: '/admin/algorithms/:id/edit',
  ADMIN_QUIZ: '/admin/quiz',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// Helper to build dynamic routes
export const buildRoute = (route: string, params: Record<string, string>): string => {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    route,
  );
};
