import React from 'react';
import { AdminDashboard } from './Dashboard';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Extended metrics reports for student engagement and learning retention.</p>
      </div>
      <AdminDashboard />
    </div>
  );
};
export default Analytics;
