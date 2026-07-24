import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { ROUTES } from '@constants/routes';

// Layouts
import { StudentLayout } from '@layouts/StudentLayout';
import { AdminLayout } from '@layouts/AdminLayout';

// Core Public Pages
import LandingPage from '@pages/landing/LandingPage';
import Login from '@pages/auth/Login';
import Signup from '@pages/auth/Signup';

// Lazy Loaded Student Modules
const Dashboard = lazy(() => import('@pages/student/Dashboard/Dashboard'));
const Algorithms = lazy(() => import('@pages/student/Algorithms'));
const Visualization = lazy(() => import('@pages/student/Visualization'));
const QuizPage = lazy(() => import('@pages/student/QuizPage'));
const RoadmapsPage = lazy(() => import('@pages/student/RoadmapsPage'));

// Lazy Loaded Student Extras
const Notes = lazy(() => import('@pages/student/Notes'));
const Leaderboard = lazy(() => import('@pages/student/Leaderboard'));
const Achievements = lazy(() => import('@pages/student/Achievements'));
const Profile = lazy(() => import('@pages/student/Profile'));
const AboutDeveloper = lazy(() => import('@pages/student/AboutDeveloper'));
const Settings = lazy(() => import('@pages/student/Settings'));
const PracticeList = lazy(() => import('@pages/student/PracticeList'));
const ProblemIDE = lazy(() => import('@pages/student/ProblemIDE'));

// Lazy Loaded Visualizers
const GenericVisualizer = lazy(() => import('@pages/student/Visualizer/GenericVisualizer'));
const VisualizerDemo = lazy(() => import('@pages/student/Visualizer/VisualizerDemo'));
const BubbleSort = lazy(() => import('@pages/student/Visualizer/BubbleSort'));
const SelectionSort = lazy(() => import('@pages/student/Visualizer/SelectionSort'));
const InsertionSort = lazy(() => import('@pages/student/Visualizer/InsertionSort'));
const MergeSort = lazy(() => import('@pages/student/Visualizer/MergeSort'));
const QuickSort = lazy(() => import('@pages/student/Visualizer/QuickSort'));
const HeapSort = lazy(() => import('@pages/student/Visualizer/HeapSort'));
const CountingSort = lazy(() => import('@pages/student/Visualizer/CountingSort'));
const RadixSort = lazy(() => import('@pages/student/Visualizer/RadixSort'));

// Searching Visualizers
const LinearSearch = lazy(() => import('@pages/student/Visualizer/LinearSearch'));
const BinarySearch = lazy(() => import('@pages/student/Visualizer/BinarySearch'));
const JumpSearch = lazy(() => import('@pages/student/Visualizer/JumpSearch'));
const InterpolationSearch = lazy(() => import('@pages/student/Visualizer/InterpolationSearch'));
const ExponentialSearch = lazy(() => import('@pages/student/Visualizer/ExponentialSearch'));

// Graph Visualizers
const BFS = lazy(() => import('@pages/student/Visualizer/BFS'));
const DFS = lazy(() => import('@pages/student/Visualizer/DFS'));
const Dijkstra = lazy(() => import('@pages/student/Visualizer/Dijkstra'));
const BellmanFord = lazy(() => import('@pages/student/Visualizer/BellmanFord'));
const FloydWarshall = lazy(() => import('@pages/student/Visualizer/FloydWarshall'));
const PrimMST = lazy(() => import('@pages/student/Visualizer/PrimMST'));
const KruskalMST = lazy(() => import('@pages/student/Visualizer/KruskalMST'));
const TopologicalSort = lazy(() => import('@pages/student/Visualizer/TopologicalSort'));
const CycleDetection = lazy(() => import('@pages/student/Visualizer/CycleDetection'));
const UnionFind = lazy(() => import('@pages/student/Visualizer/UnionFind'));

// Linear Visualizers
const Stack = lazy(() => import('@pages/student/Visualizer/Stack'));
const Queue = lazy(() => import('@pages/student/Visualizer/Queue'));
const CircularQueue = lazy(() => import('@pages/student/Visualizer/CircularQueue'));
const Deque = lazy(() => import('@pages/student/Visualizer/Deque'));
const PriorityQueue = lazy(() => import('@pages/student/Visualizer/PriorityQueue'));

// Recursion Visualizers
const Factorial = lazy(() => import('@pages/student/Visualizer/Factorial'));
const Fibonacci = lazy(() => import('@pages/student/Visualizer/Fibonacci'));
const TowerOfHanoi = lazy(() => import('@pages/student/Visualizer/TowerOfHanoi'));
const MergeSortTree = lazy(() => import('@pages/student/Visualizer/MergeSortTree'));

// Backtracking Visualizers
const NQueens = lazy(() => import('@pages/student/Visualizer/NQueens'));
const Sudoku = lazy(() => import('@pages/student/Visualizer/Sudoku'));
const RatInAMaze = lazy(() => import('@pages/student/Visualizer/RatInAMaze'));
const GenerateParentheses = lazy(() => import('@pages/student/Visualizer/GenerateParentheses'));

// DP Visualizers
const FibonacciMemo = lazy(() => import('@pages/student/Visualizer/FibonacciMemo'));
const FibonacciTab = lazy(() => import('@pages/student/Visualizer/FibonacciTab'));
const Knapsack = lazy(() => import('@pages/student/Visualizer/Knapsack'));
const LCS = lazy(() => import('@pages/student/Visualizer/LCS'));
const LIS = lazy(() => import('@pages/student/Visualizer/LIS'));
const CoinChange = lazy(() => import('@pages/student/Visualizer/CoinChange'));
const EditDistance = lazy(() => import('@pages/student/Visualizer/EditDistance'));

// Greedy Visualizers
const ActivitySelection = lazy(() => import('@pages/student/Visualizer/ActivitySelection'));
const FractionalKnapsack = lazy(() => import('@pages/student/Visualizer/FractionalKnapsack'));
const HuffmanCoding = lazy(() => import('@pages/student/Visualizer/HuffmanCoding'));
const JobScheduling = lazy(() => import('@pages/student/Visualizer/JobScheduling'));

// Lazy Loaded Admin Pages
const AdminDashboard = lazy(() => import('@pages/admin/Dashboard'));
const NoteCMS = lazy(() => import('@pages/admin/NoteCMS'));
const CategoryManager = lazy(() => import('@pages/admin/CategoryManager'));
const AlgorithmManager = lazy(() => import('@pages/admin/AlgorithmManager'));
const QuizManager = lazy(() => import('@pages/admin/QuizManager'));
const UserManager = lazy(() => import('@pages/admin/UserManager'));
const LeaderboardAdmin = lazy(() => import('@pages/admin/LeaderboardAdmin'));
const AdminAnalytics = lazy(() => import('@pages/admin/Analytics'));
const AdminReports = lazy(() => import('@pages/admin/AdminReports'));
const AdminAuditLogs = lazy(() => import('@pages/admin/AdminAuditLogs'));
const AdminSettings = lazy(() => import('@pages/admin/Settings'));
const AdminDeveloperManager = lazy(() => import('@pages/admin/AdminDeveloperManager'));

import NotFound from '@pages/common/NotFound';
import Forbidden from '@pages/common/Forbidden';
import ErrorBoundary from '@components/common/ErrorBoundary';
import ScrollToTop from '@components/common/ScrollToTop';
import PWAInstallPrompt from '@components/common/PWAInstallPrompt';
import NetworkStatusIndicator from '@components/common/NetworkStatusIndicator';
import { DashboardSkeleton } from '@components/common/Skeleton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
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
    return <DashboardSkeleton />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NetworkStatusIndicator />
      <PWAInstallPrompt />
      <Suspense fallback={<DashboardSkeleton />}>
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
            <Route path={ROUTES.DEVELOPER} element={<AboutDeveloper />} />
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
            <Route path="/admin/notes" element={<NoteCMS />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/admin/algorithms" element={<AlgorithmManager />} />
            <Route path="/admin/quiz" element={<QuizManager />} />
            <Route path="/admin/students" element={<UserManager />} />
            <Route path="/admin/leaderboard" element={<LeaderboardAdmin />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path={ROUTES.ADMIN_DEVELOPER_MANAGER} element={<AdminDeveloperManager />} />
          </Route>

          {/* Fallback */}
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
