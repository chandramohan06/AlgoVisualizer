import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, StickyNote, Code2, Play, User } from 'lucide-react';
import { cn } from '@utils/index';
import { ROUTES } from '@constants/routes';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'Notes', icon: StickyNote, path: ROUTES.NOTES },
  { label: 'Practice', icon: Code2, path: ROUTES.PRACTICE },
  { label: 'Visualizer', icon: Play, path: '/visualizations' },
  { label: 'Profile', icon: User, path: ROUTES.PROFILE },
];

export const MobileBottomNav: React.FC = () => {
  return (
    <div
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-40',
        'bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10',
        'flex items-center justify-around px-2 py-1.5 shadow-2xl',
        'pb-[max(0.5rem,env(safe-area-inset-bottom))]'
      )}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all text-[10px] font-semibold min-w-[56px] min-h-[44px] cursor-pointer',
              isActive
                ? 'text-indigo-400 bg-indigo-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className={cn('w-5 h-5 shrink-0 transition-transform', isActive && 'scale-110')} />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileBottomNav;
