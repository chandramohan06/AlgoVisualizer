import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, Sun, Moon, Menu, Flame, Star,
  ChevronDown, User, Settings, LogOut, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getInitials } from '@utils/index';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { useDashboardStats } from '@hooks/useDashboard';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme, setSidebarOpen, searchOpen, setSearchOpen } = useUIStore();
  const { data: stats } = useDashboardStats();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const level = stats?.level ?? 1;
  const xp = stats?.totalXP ?? 0;
  const streak = stats?.streak ?? 0;

  return (
    <header className="sticky top-0 z-20 h-20 flex items-center justify-between px-6 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
      {/* Left Pane: Sidebar Hamburger toggle & Search bar */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input Box */}
        <div className="relative">
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                initial={{ width: 60, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 60, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center relative"
              >
                <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-semibold"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="absolute right-3 p-1 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10 transition-all text-xs font-semibold cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Quick search...</span>
                <kbd className="hidden md:inline text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Pane: Stats, Badges, Theme, Notifications & User settings */}
      <div className="flex items-center gap-3">

        {/* Daily Streak Counter Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 shadow-sm shadow-orange-500/5">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-orange-400">{streak}d streak</span>
        </div>

        {/* Learning XP Level Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm shadow-blue-500/5">
          <Star className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-blue-400">{xp} XP</span>
        </div>

        {/* Level Counter Indicator */}
        <div className="hidden md:flex items-center px-3 py-2 rounded-xl bg-accent/10 border border-accent/20 shadow-sm shadow-accent/5">
          <span className="text-xs font-extrabold text-accent">Lv.{level}</span>
        </div>

        <div className="h-6 w-[1px] bg-white/5 mx-1 hidden sm:block" />

        {/* Light/Dark mode switcher */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
          aria-label={`Switch mode`}
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notification Bell Icon */}
        <button
          className="relative p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        {/* User profile actions dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8.5 h-8.5 rounded-lg object-cover border border-white/10 shadow-md shrink-0"
              />
            ) : (
              <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center text-xs font-extrabold text-white shadow-md shadow-blue-500/10 shrink-0">
                {user ? getInitials(user.name) : '?'}
              </div>
            )}
            <span className="hidden md:block text-xs font-bold text-slate-300 max-w-[100px] truncate group-hover:text-white">
              {user?.name}
            </span>
            <ChevronDown className={cn(
              'hidden md:block w-3.5 h-3.5 text-slate-500 transition-transform duration-200',
              profileOpen && 'rotate-180'
            )} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl overflow-hidden shadow-2xl z-50 border border-white/5 py-1"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                </div>
                <div className="p-1.5 space-y-1">
                  <button
                    onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    Profile Page
                  </button>
                  <button
                    onClick={() => { navigate('/settings'); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <div className="border-t border-white/5 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};
export default Navbar;
