import React, { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { cn } from '@utils/index';
import { Sidebar } from '@components/layout/Sidebar';
import { Navbar } from '@components/layout/Navbar';
import { GlobalSearchModal } from '@components/common/GlobalSearchModal';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { DashboardSkeleton } from '@components/common/Skeleton';

export const StudentLayout: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();

  // Auth guard
  if (isLoading) return <DashboardSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64',
        )}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          <Suspense fallback={<DashboardSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <GlobalSearchModal />
    </div>
  );
};
