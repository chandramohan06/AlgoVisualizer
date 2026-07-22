import React, { useState } from 'react';
import { adminService } from '@services/adminService';
import { FileSpreadsheet, Download, Check, FileText } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleExport = async (type: string, format: 'csv' | 'json') => {
    setDownloading(true);
    try {
      const blobData = await adminService.exportReport(type, format);
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      setMsg(`Successfully generated and downloaded ${type} report (${format.toUpperCase()})`);
      setTimeout(() => setMsg(''), 4000);
    } catch (err: any) {
      setMsg('Export failed. Please ensure backend server is operational.');
    } finally {
      setDownloading(false);
    }
  };

  const reports = [
    {
      id: 'students',
      title: 'Student Directory & Demographics',
      desc: 'Export registered student accounts, college, batch, country, target company, streak, and XP data.',
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard Rankings & Scores',
      desc: 'Export global leaderboard rankings, weighted scores, quiz accuracy %, total XP, and streaks.',
    },
    {
      id: 'quiz',
      title: 'Quiz Performance & Attempts',
      desc: 'Export student MCQ quiz attempts, time taken, score breakdown, and accuracy metrics.',
    },
    {
      id: 'coding',
      title: 'Coding Activity Logs',
      desc: 'Export problem solution attempts, algorithm visualizations, and activity history timeline.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans text-slate-200">
      
      {/* Header */}
      <div className="bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> Data Reports &amp; Export Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Export system datasets into production CSV or JSON format for offline analytics and reporting.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-[#11161d] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                {report.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {report.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5 font-mono text-xs">
              <button
                onClick={() => handleExport(report.id, 'csv')}
                disabled={downloading}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => handleExport(report.id, 'json')}
                disabled={downloading}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminReports;
