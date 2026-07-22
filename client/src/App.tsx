import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { ROUTES } from '@constants/routes';

// Layouts
import { StudentLayout } from '@layouts/StudentLayout';
import { AdminLayout } from '@layouts/AdminLayout';

// Public & Auth Pages
import LandingPage from '@pages/landing/LandingPage';
import Login from '@pages/auth/Login';
import Signup from '@pages/auth/Signup';

// Student Pages (4 Independent Modules)
import Dashboard from '@pages/student/Dashboard/Dashboard';
import Algorithms from '@pages/student/Algorithms';          // Module 1: Algorithms (Learn & Visualize)
import Visualization from '@pages/student/Visualization';      // Dedicated Algorithm Visualizations Library
import QuizPage from '@pages/student/QuizPage';               // Module 3: Custom Quiz Engine
import RoadmapsPage from '@pages/student/RoadmapsPage';       // Module 4: Pattern Roadmaps

// Student Extras
import Notes from '@pages/student/Notes';
import Leaderboard from '@pages/student/Leaderboard';
import Achievements from '@pages/student/Achievements';
import Profile from '@pages/student/Profile';
import Settings from '@pages/student/Settings';
import PracticeList from '@pages/student/PracticeList';
import ProblemIDE from '@pages/student/ProblemIDE';

// Visualizer Engine
import GenericVisualizer from '@pages/student/Visualizer/GenericVisualizer';
import VisualizerDemo from '@pages/student/Visualizer/VisualizerDemo';
import BubbleSort from '@pages/student/Visualizer/BubbleSort';
import SelectionSort from '@pages/student/Visualizer/SelectionSort';
import InsertionSort from '@pages/student/Visualizer/InsertionSort';
import MergeSort from '@pages/student/Visualizer/MergeSort';
import QuickSort from '@pages/student/Visualizer/QuickSort';
import HeapSort from '@pages/student/Visualizer/HeapSort';
import CountingSort from '@pages/student/Visualizer/CountingSort';
import RadixSort from '@pages/student/Visualizer/RadixSort';

// Searching Visualizers
import LinearSearch from '@pages/student/Visualizer/LinearSearch';
import BinarySearch from '@pages/student/Visualizer/BinarySearch';
import JumpSearch from '@pages/student/Visualizer/JumpSearch';
import InterpolationSearch from '@pages/student/Visualizer/InterpolationSearch';
import ExponentialSearch from '@pages/student/Visualizer/ExponentialSearch';

// Graph Visualizers
import BFS from '@pages/student/Visualizer/BFS';
import DFS from '@pages/student/Visualizer/DFS';
import Dijkstra from '@pages/student/Visualizer/Dijkstra';
import BellmanFord from '@pages/student/Visualizer/BellmanFord';
import FloydWarshall from '@pages/student/Visualizer/FloydWarshall';
import PrimMST from '@pages/student/Visualizer/PrimMST';
import KruskalMST from '@pages/student/Visualizer/KruskalMST';
import TopologicalSort from '@pages/student/Visualizer/TopologicalSort';
import CycleDetection from '@pages/student/Visualizer/CycleDetection';
import UnionFind from '@pages/student/Visualizer/UnionFind';

// Linear Visualizers
import Stack from '@pages/student/Visualizer/Stack';
import Queue from '@pages/student/Visualizer/Queue';
import CircularQueue from '@pages/student/Visualizer/CircularQueue';
import Deque from '@pages/student/Visualizer/Deque';
import PriorityQueue from '@pages/student/Visualizer/PriorityQueue';

// Recursion Visualizers
import Factorial from '@pages/student/Visualizer/Factorial';
import Fibonacci from '@pages/student/Visualizer/Fibonacci';
import TowerOfHanoi from '@pages/student/Visualizer/TowerOfHanoi';
import MergeSortTree from '@pages/student/Visualizer/MergeSortTree';

// Backtracking Visualizers
import NQueens from '@pages/student/Visualizer/NQueens';
import Sudoku from '@pages/student/Visualizer/Sudoku';
import RatInAMaze from '@pages/student/Visualizer/RatInAMaze';
import GenerateParentheses from '@pages/student/Visualizer/GenerateParentheses';

// DP Visualizers
import FibonacciMemo from '@pages/student/Visualizer/FibonacciMemo';
import FibonacciTab from '@pages/student/Visualizer/FibonacciTab';
import Knapsack from '@pages/student/Visualizer/Knapsack';
import LCS from '@pages/student/Visualizer/LCS';
import LIS from '@pages/student/Visualizer/LIS';
import CoinChange from '@pages/student/Visualizer/CoinChange';
import EditDistance from '@pages/student/Visualizer/EditDistance';

// Greedy Visualizers
import ActivitySelection from '@pages/student/Visualizer/ActivitySelection';
import FractionalKnapsack from '@pages/student/Visualizer/FractionalKnapsack';
import HuffmanCoding from '@pages/student/Visualizer/HuffmanCoding';
import JobScheduling from '@pages/student/Visualizer/JobScheduling';

// Admin Pages
import AdminDashboard from '@pages/admin/Dashboard';
import CategoryManager from '@pages/admin/CategoryManager';
import AlgorithmManager from '@pages/admin/AlgorithmManager';
import QuizManager from '@pages/admin/QuizManager';
import UserManager from '@pages/admin/UserManager';
import LeaderboardAdmin from '@pages/admin/LeaderboardAdmin';
import AdminAnalytics from '@pages/admin/Analytics';
import AdminReports from '@pages/admin/AdminReports';
import AdminAuditLogs from '@pages/admin/AdminAuditLogs';
import AdminSettings from '@pages/admin/Settings';

import NotFound from '@pages/common/NotFound';
import Forbidden from '@pages/common/Forbidden';
import ErrorBoundary from '@components/common/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const { checkAuth, isLoading } = useAuthStore();
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    checkAuth();
  }, [theme, checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-semibold text-gray-400">Loading AlgoVisualizer...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.STUDENT_LOGIN} element={<Login />} />
        <Route path={ROUTES.STUDENT_SIGNUP} element={<Signup />} />
        <Route path={ROUTES.ADMIN_LOGIN} element={<Login isAdminLogin={true} />} />

        {/* Student Routes — 4 Core Independent Learning Modules */}
        <Route element={<StudentLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.ALGORITHMS} element={<Algorithms />} />
          <Route path={ROUTES.PRACTICE} element={<PracticeList />} />
          <Route path="/visualizations" element={<Visualization />} />
          <Route path={ROUTES.QUIZ} element={<QuizPage />} />
          <Route path={ROUTES.ROADMAPS} element={<RoadmapsPage />} />
          
          {/* Extras */}
          <Route path={ROUTES.NOTES} element={<Notes />} />
          <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
          <Route path={ROUTES.ACHIEVEMENTS} element={<Achievements />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path="/practice/question/:slug" element={<ProblemIDE />} />
          <Route path="/question/:id" element={<ProblemIDE />} />
        </Route>

        {/* Dynamic Universal Visualizer Route */}
        <Route path={ROUTES.VISUALIZER_DYNAMIC} element={<GenericVisualizer />} />

        {/* Visualizer Engine Demo */}
        <Route path={ROUTES.VISUALIZER_DEMO} element={<VisualizerDemo />} />
        <Route path={ROUTES.BUBBLE_SORT} element={<BubbleSort />} />
        <Route path={ROUTES.SELECTION_SORT} element={<SelectionSort />} />
        <Route path={ROUTES.INSERTION_SORT} element={<InsertionSort />} />
        <Route path={ROUTES.MERGE_SORT} element={<MergeSort />} />
        <Route path={ROUTES.QUICK_SORT} element={<QuickSort />} />
        <Route path={ROUTES.HEAP_SORT} element={<HeapSort />} />
        <Route path={ROUTES.COUNTING_SORT} element={<CountingSort />} />
        <Route path={ROUTES.RADIX_SORT} element={<RadixSort />} />

        {/* Searching Visualizers */}
        <Route path={ROUTES.LINEAR_SEARCH} element={<LinearSearch />} />
        <Route path={ROUTES.BINARY_SEARCH} element={<BinarySearch />} />
        <Route path={ROUTES.JUMP_SEARCH} element={<JumpSearch />} />
        <Route path={ROUTES.INTERPOLATION_SEARCH} element={<InterpolationSearch />} />
        <Route path={ROUTES.EXPONENTIAL_SEARCH} element={<ExponentialSearch />} />

        {/* Graph Visualizers */}
        <Route path={ROUTES.BFS} element={<BFS />} />
        <Route path={ROUTES.DFS} element={<DFS />} />
        <Route path={ROUTES.DIJKSTRA} element={<Dijkstra />} />
        <Route path={ROUTES.BELLMAN_FORD} element={<BellmanFord />} />
        <Route path={ROUTES.FLOYD_WARSHALL} element={<FloydWarshall />} />
        <Route path={ROUTES.PRIM_MST} element={<PrimMST />} />
        <Route path={ROUTES.KRUSKAL_MST} element={<KruskalMST />} />
        <Route path={ROUTES.TOPOLOGICAL_SORT} element={<TopologicalSort />} />
        <Route path={ROUTES.CYCLE_DETECTION} element={<CycleDetection />} />
        <Route path={ROUTES.UNION_FIND} element={<UnionFind />} />

        {/* Linear Visualizers */}
        <Route path={ROUTES.STACK} element={<Stack />} />
        <Route path={ROUTES.QUEUE} element={<Queue />} />
        <Route path={ROUTES.CIRCULAR_QUEUE} element={<CircularQueue />} />
        <Route path={ROUTES.DEQUE} element={<Deque />} />
        <Route path={ROUTES.PRIORITY_QUEUE} element={<PriorityQueue />} />

        {/* Recursion Visualizers */}
        <Route path={ROUTES.RECURSION_FACTORIAL} element={<Factorial />} />
        <Route path={ROUTES.RECURSION_FIBONACCI} element={<Fibonacci />} />
        <Route path={ROUTES.RECURSION_TOWER_OF_HANOI} element={<TowerOfHanoi />} />
        <Route path={ROUTES.RECURSION_MERGE_SORT_TREE} element={<MergeSortTree />} />

        {/* Backtracking Visualizers */}
        <Route path={ROUTES.BACKTRACKING_N_QUEENS} element={<NQueens />} />
        <Route path={ROUTES.BACKTRACKING_SUDOKU} element={<Sudoku />} />
        <Route path={ROUTES.BACKTRACKING_RAT_IN_A_MAZE} element={<RatInAMaze />} />
        <Route path={ROUTES.BACKTRACKING_GENERATE_PARENTHESES} element={<GenerateParentheses />} />

        {/* Dynamic Programming Visualizers */}
        <Route path={ROUTES.DP_FIBONACCI_MEMO} element={<FibonacciMemo />} />
        <Route path={ROUTES.DP_FIBONACCI_TAB} element={<FibonacciTab />} />
        <Route path={ROUTES.DP_KNAPSACK} element={<Knapsack />} />
        <Route path={ROUTES.DP_LCS} element={<LCS />} />
        <Route path={ROUTES.DP_LIS} element={<LIS />} />
        <Route path={ROUTES.DP_COIN_CHANGE} element={<CoinChange />} />
        <Route path={ROUTES.DP_EDIT_DISTANCE} element={<EditDistance />} />

        {/* Greedy Visualizers */}
        <Route path={ROUTES.GREEDY_ACTIVITY_SELECTION} element={<ActivitySelection />} />
        <Route path={ROUTES.GREEDY_FRACTIONAL_KNAPSACK} element={<FractionalKnapsack />} />
        <Route path={ROUTES.GREEDY_HUFFMAN_CODING} element={<HuffmanCoding />} />
        <Route path={ROUTES.GREEDY_JOB_SCHEDULING} element={<JobScheduling />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<CategoryManager />} />
          <Route path="/admin/algorithms" element={<AlgorithmManager />} />
          <Route path="/admin/quiz" element={<QuizManager />} />
          <Route path="/admin/students" element={<UserManager />} />
          <Route path="/admin/leaderboard" element={<LeaderboardAdmin />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
