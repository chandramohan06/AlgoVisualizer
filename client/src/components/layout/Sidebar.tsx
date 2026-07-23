import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Code2, Brain, Compass, StickyNote,
  Trophy, Award, User, Settings, LogOut, Play,
  ChevronLeft, Sparkles, X
} from 'lucide-react';
import { cn } from '@utils/index';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { ROUTES } from '@constants/routes';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'DSA Roadmap', icon: Compass, path: ROUTES.ALGORITHMS, badge: 'A2Z' },
  { label: 'Practice Problems', icon: Code2, path: ROUTES.PRACTICE, badge: '100 Qs' },
  { label: 'Visualization', icon: Play, path: '/visualizations', badge: 'Interactive' },
  { label: 'Quiz', icon: Brain, path: ROUTES.QUIZ, badge: 'Test' },
  { label: 'Notes', icon: StickyNote, path: ROUTES.NOTES },
  { label: 'Leaderboard', icon: Trophy, path: ROUTES.LEADERBOARD },
  { label: 'Achievements', icon: Award, path: ROUTES.ACHIEVEMENTS },
];

const bottomNav: NavItem[] = [
  { label: 'Profile', icon: User, path: ROUTES.PROFILE },
  { label: 'Settings', icon: Settings, path: ROUTES.SETTINGS },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useUIStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Brand Header */}
      <div className={cn(
        'flex items-center gap-3 px-6 h-20 border-b border-white/5 shrink-0',
        sidebarCollapsed && 'justify-center px-3'
      )}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10 cursor-pointer"
        >
          <Sparkles className="w-4.5 h-4.5 text-white" />
        </motion.div>
        {!sidebarCollapsed && (
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent whitespace-nowrap">
              AlgoVisualizer
            </span>
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold">SaaS Platform</span>
          </div>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-thin font-sans">
        {mainNav.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 relative',
                sidebarCollapsed && 'justify-center px-2',
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-bold shadow-sm shadow-indigo-500/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('w-4.5 h-4.5 shrink-0 transition-colors', isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white')} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span className="ml-auto text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
                {/* Visual Active Left bar */}
                {isActive && !sidebarCollapsed && (
                  <span className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-500 rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-5 border-t border-white/5" />

      {/* Bottom Profile and Settings */}
      <div className="py-4 px-4 space-y-1.5">
        {bottomNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200',
                sidebarCollapsed && 'justify-center px-2',
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
              )
            }
          >
            <item.icon className="w-4.5 h-4.5 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/10 transition-all duration-200 cursor-pointer',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* User Quick Info Box */}
      {user && (
        <div className={cn(
          'mx-4 mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5',
          sidebarCollapsed && 'p-1 mx-2'
        )}>
          <div className={cn('flex items-center gap-3', sidebarCollapsed && 'justify-center')}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] font-mono text-indigo-400 truncate uppercase">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collapse Trigger Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex items-center justify-center h-12 border-t border-white/5 text-slate-500 hover:text-white transition-colors cursor-pointer"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft className={cn('w-4.5 h-4.5 transition-transform', sidebarCollapsed && 'rotate-180')} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left-anchored) */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-300',
          'bg-[#09090b] border-r border-white/5 shadow-2xl',
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Menu Slide-Over Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-screen w-64 z-50 bg-[#09090b] border-r border-white/5 lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                aria-label="Close menu"
              >
                <X className="w-4.5 h-4.5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Sidebar;
