import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiAcademicCap, HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid credentials. Try demo login instead.');
    } finally {
      setLoading(false);
    }
  }

  function handleDemoLogin(role) {
    demoLogin(role);
    toast.success(`Logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    navigate('/dashboard');
  }

  return (
    <div className="login-container items-center justify-center px-4">
      {/* Animated Background Shapes */}
      <div className="login-bg-shape1 animate-blob"></div>
      <div className="login-bg-shape2 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-[440px] animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <HiAcademicCap className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            EduManager
          </h1>
          <p className="text-slate-500 text-base mt-2 font-medium">
            Next-gen Student Management
          </p>
        </div>

        <div className="login-card">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 mb-8">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  className="form-input pl-11 py-3"
                  placeholder="admin@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  className="form-input pl-11 py-3"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3.5 text-base rounded-xl mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <HiArrowRight size={18} className="ml-1" />}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Or explore demo
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md transition-all group bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                👨‍💼
              </div>
              <div className="text-left flex-1">
                <p className="text-base font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  Admin Access
                </p>
                <p className="text-sm text-slate-500">
                  Full system control
                </p>
              </div>
              <HiArrowRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>

            <button
              onClick={() => handleDemoLogin('teacher')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md transition-all group bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>
              <div className="text-left flex-1">
                <p className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Teacher Portal
                </p>
                <p className="text-sm text-slate-500">
                  Manage classes & attendance
                </p>
              </div>
              <HiArrowRight className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>

            <button
              onClick={() => handleDemoLogin('student')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md transition-all group bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                👨‍🎓
              </div>
              <div className="text-left flex-1">
                <p className="text-base font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                  Student Hub
                </p>
                <p className="text-sm text-slate-500">
                  View results & notices
                </p>
              </div>
              <HiArrowRight className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8 font-medium">
          © 2026 EduManager. All rights reserved.
        </p>
      </div>
    </div>
  );
}
