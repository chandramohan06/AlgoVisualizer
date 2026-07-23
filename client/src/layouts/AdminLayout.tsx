import React, { useState } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, BookOpen, Brain, Trophy, FileSpreadsheet, ShieldAlert,
  Users, BarChart3, Settings, UserCheck,
  LogOut, Sun, Moon, Bell, ChevronRight, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getInitials } from '@utils/index';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { DashboardSkeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { name: 'Dashboard', path: ROUTES.ADMIN, icon: LayoutDashboard },
  { name: 'Founder Profile Manager', path: '/admin/developer-manager', icon: UserCheck },
  { name: 'Students', path: '/admin/students', icon: Users },
  { name: 'Categories', path: '/admin/categories', icon: FolderOpen },
  { name: 'Algorithms', path: '/admin/algorithms', icon: BookOpen },
  { name: 'Quizzes', path: '/admin/quiz', icon: Brain },
  { name: 'Leaderboard', path: '/admin/leaderboard', icon: Trophy },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { name: 'Reports & Export', path: '/admin/reports', icon: FileSpreadsheet },
  { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Guard routing
  if (isLoading) return <DashboardSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="min-h-screen bg-[#06060a] text-gray-100 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#0b0b12] shrink-0">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
            A
          </div>
          <div>
            <span className="font-black text-sm text-white tracking-wide block">AlgoAdmin Console</span>
            <span className="text-[9px] text-amber-400 font-mono font-bold uppercase block">Production System</span>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0b0b12] flex flex-col lg:hidden"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                    A
                  </div>
                  <span className="font-bold text-sm text-white tracking-wide">AlgoAdmin</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-white/5">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {adminNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.name}
                      onClick={() => { navigate(item.path); setMobileOpen(false); }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
                      )}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Page Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-[#0b0b12] border-b border-white/5 sticky top-0 z-30 font-sans">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-500 font-mono">
              <span className="hover:text-gray-300 cursor-pointer" onClick={() => navigate(ROUTES.ADMIN)}>Admin</span>
              {pathnames.slice(1).map((name, i) => (
                <React.Fragment key={name}>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className={cn(
                    'capitalize',
                    i === pathnames.length - 2 ? 'text-white font-bold' : 'hover:text-gray-300 cursor-pointer'
                  )}>
                    {name}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md cursor-pointer"
              >
                {user ? getInitials(user.name) : 'A'}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-56 bg-[#11161d] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20 font-sans"
                    >
                      <div className="p-3.5 border-b border-white/10">
                        <p className="text-xs font-bold text-white">{user?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate font-mono">{user?.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold uppercase">
                          Administrator Role
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#06060a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
