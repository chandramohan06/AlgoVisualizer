import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, ShieldAlert, Eye, EyeOff, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@constants/routes';
import { authService } from '@services/authService';

export interface LoginProps {
  isAdminLogin?: boolean;
}

export const Login: React.FC<LoginProps> = ({ isAdminLogin = false }) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>(isAdminLogin ? 'admin' : 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });

      // Verify that user role matches selected tab if admin tab is chosen
      if (activeTab === 'admin' && response.user.role !== 'admin') {
        throw new Error('Access denied: You are not authorized as an Administrator.');
      }

      setSuccess(true);
      setTimeout(() => {
        setAuth(response);
        navigate(response.user.role === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD);
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  const handleDevLogin = async (role: 'student' | 'admin') => {
    setError('');
    setLoading(true);
    setActiveTab(role);

    const credentials = role === 'student'
      ? { email: 'student@algovisualizer.com', password: 'Student@123' }
      : { email: 'admin@algovisualizer.com', password: 'Admin@123' };

    try {
      const response = await authService.login(credentials);
      setSuccess(true);
      setTimeout(() => {
        setAuth(response);
        navigate(role === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD);
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  const treeNodes = [
    { id: 'A', x: 250, y: 80, val: '50' },
    { id: 'B', x: 150, y: 160, val: '25' },
    { id: 'C', x: 350, y: 160, val: '75' },
    { id: 'D', x: 100, y: 240, val: '12' },
    { id: 'E', x: 200, y: 240, val: '33' },
    { id: 'F', x: 300, y: 240, val: '60' },
    { id: 'G', x: 400, y: 240, val: '85' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#09090b] text-white overflow-hidden relative font-sans">
      {/* LEFT SIDE: Binary Tree Visualization */}
      <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 relative flex-col justify-between p-12 border-r border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Animated Binary Search Tree */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-[500px] h-[350px] relative opacity-60">
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} x1={250} y1={80} x2={150} y2={160} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} x1={250} y1={80} x2={350} y2={160} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} x1={150} y1={160} x2={100} y2={240} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} x1={150} y1={160} x2={200} y2={240} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} x1={350} y1={160} x2={300} y2={240} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} x1={350} y1={160} x2={400} y2={240} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />

            {treeNodes.map((node, index) => (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
              >
                <circle cx={node.x} cy={node.y} r={22} className="fill-blue-500/10 stroke-blue-500/30" strokeWidth={1.5} />
                <circle cx={node.x} cy={node.y} r={18} className="fill-[#111827] stroke-white/10" strokeWidth={1} />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-400 select-none">
                  {node.val}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            AlgoVisualizer
          </span>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
            Role-Based Interactive Learning &amp; Management Platform.
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed font-semibold">
            Seamlessly master Data Structures &amp; Algorithms with real-time visualizations, performance analytics, and placement readiness tracking.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} AlgoVisualizer Platform. Production Ready.
        </div>
      </div>

      {/* RIGHT SIDE: Login Card */}
      <div className="lg:col-span-6 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#11161d] rounded-2xl p-8 border border-white/10 relative z-10 shadow-2xl space-y-6"
        >
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center gap-3 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AlgoVisualizer
            </span>
          </div>

          {/* Role Selection Tabs */}
          <div className="space-y-4">
            <div className="flex rounded-xl bg-black/40 border border-white/10 p-1">
              <button
                type="button"
                onClick={() => { setActiveTab('student'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'student'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>👨‍🎓 Student</span>
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('admin'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>👨‍💼 Admin</span>
              </button>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                {activeTab === 'admin' ? 'Admin Authentication' : 'Student Portal'}
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {activeTab === 'admin'
                  ? 'Access administrative controls, analytics & student management'
                  : 'Enter your credentials to access your student learning workspace'}
              </p>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin@algovisualizer.com' : 'student@algo.com'}
                  className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 focus:border-blue-500 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Password</label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-black/40 border border-white/10 focus:border-blue-500 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white transition-all cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-400 select-none">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-[0.98] ${
                activeTab === 'admin'
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
              }`}
            >
              {success ? 'Success! Redirecting...' : loading ? 'Verifying Credentials...' : `Sign In as ${activeTab === 'admin' ? 'Admin' : 'Student'}`}
              {!loading && !success && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Student Signup Link */}
          {activeTab === 'student' ? (
            <div className="mt-4 text-center text-xs text-slate-400 font-mono">
              Don't have a student account?{' '}
              <Link to={ROUTES.SIGNUP} className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                Sign up as Student
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-center text-[11px] text-amber-300/80 font-mono bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
              🛡️ Public admin registration is disabled. Admin accounts are managed by System Administrator.
            </div>
          )}

          {/* Developer Bypass Shortcuts */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3 font-mono">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 text-center">1-Click Developer Login Bypass</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDevLogin('student')}
                className="py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-xs font-bold text-blue-300 border border-blue-500/30 transition-all text-center cursor-pointer"
              >
                👨‍🎓 Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleDevLogin('admin')}
                className="py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 border border-amber-500/30 transition-all text-center cursor-pointer"
              >
                👨‍💼 Demo Admin
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
