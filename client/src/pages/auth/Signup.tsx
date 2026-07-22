import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User, School, BookOpen, Calendar, ShieldAlert, Key, Check } from 'lucide-react';
import { ROUTES } from '@constants/routes';
import { authService } from '@services/authService';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('3rd Year');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [token, setToken] = useState('');

  // Password strength logic
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: 'No Password', color: 'bg-white/10' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-amber-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.register({
        name: name || email.split('@')[0],
        email,
        password,
        college,
        course,
        year,
      });
      setToken(data.emailVerifyToken);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verifyCode !== '123456') {
      setError('Invalid code. Enter 123456 to mock verification success.');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyEmail(token);
      navigate(ROUTES.STUDENT_LOGIN);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] p-4 relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-[30%] left-[25%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[25%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-card rounded-2xl p-8 border border-white/5 relative z-10 shadow-2xl space-y-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-2 mx-auto shadow-lg shadow-blue-500/10">
          <Sparkles className="w-7 h-7 text-white animate-pulse" />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Student Registration</h2>
          <p className="text-xs text-slate-400 font-semibold">
            {step === 1 ? 'Step 1 of 2: Full Profile Details' : 'Step 2 of 2: Verify Email Inbox'}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs mb-4"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleNextStep}
              className="space-y-4 text-left"
            >
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Grid: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm"
                      className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              {password && (
                <div className="space-y-1.5 pt-1 text-[10px] font-mono font-bold text-slate-400 uppercase">
                  <div>Password Strength: <span className="text-indigo-400">{strength.label}</span></div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4].map(b => (
                      <div key={b} className={`h-full flex-1 ${b <= strength.score ? strength.color : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              )}

              {/* Grid: College, Course, Year */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">College / University</label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="Stanford University / IIT"
                      className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Course / Major</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Computer Science B.Tech"
                        className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white focus:outline-none transition-all font-semibold cursor-pointer"
                      >
                        <option value="1st Year" className="bg-slate-900">1st Year</option>
                        <option value="2nd Year" className="bg-slate-900">2nd Year</option>
                        <option value="3rd Year" className="bg-slate-900">3rd Year</option>
                        <option value="4th Year" className="bg-slate-900">4th Year</option>
                        <option value="Postgraduate" className="bg-slate-900">Postgraduate</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/10 transition-all cursor-pointer active:scale-[0.98]"
              >
                {loading ? 'Creating Student Account...' : 'Continue'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerify}
              className="space-y-4"
            >
              <div className="flex gap-3.5 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-slate-300 leading-relaxed text-left items-start">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Simulation Active</span>
                  We simulated sending a 6-digit confirmation key to your email inbox. Type <span className="font-mono font-bold text-blue-400">123456</span> to complete sandbox registration.
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Key</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Enter 123456"
                    className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/5 focus:border-blue-500/50 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/10 transition-all cursor-pointer active:scale-[0.98]"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
                {!loading && <Check className="w-4 h-4" />}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center text-xs text-slate-400 border-t border-white/5 pt-4">
          Already have a student account?{' '}
          <Link to={ROUTES.STUDENT_LOGIN} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
