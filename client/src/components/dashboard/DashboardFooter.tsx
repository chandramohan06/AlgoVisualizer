import React from 'react';
import { Heart } from 'lucide-react';

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-white/5 text-center text-xs text-gray-600">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} AlgoVisualizer SaaS Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> for computer science learners worldwide.
        </p>
      </div>
    </footer>
  );
};
