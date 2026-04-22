'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.username, formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden z-10">
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 lg:hidden text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg">
                A
              </div>
            </Link>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <div className="glass-dark px-4 py-1.5 rounded-full inline-block mb-4 border border-white/10">
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Member Onboarding</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create your account</h2>
            <p className="text-slate-400">Join the premier trading network today.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 backdrop-blur-sm">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                placeholder="Choose a username"
              />
            </div>

            <div className="space-y-1.5">
               <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                placeholder="name@company.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
               <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-slate-900 py-4 px-4 rounded-xl font-bold hover:bg-slate-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50 mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Node...</span>
                </div>
              ) : (
                'Initialize Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-white hover:text-blue-300 transition-colors">
              Access Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Abstract Graphic */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 border-l border-white/5 flex-col justify-end p-12">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-emerald-600 rounded-full mix-blend-color-dodge filter blur-[100px] opacity-20 animate-blob"></div>
          <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-color-dodge filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-md ml-auto text-right">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Your gateway to the global exchange.</h2>
          <p className="text-slate-400 text-lg">Instant access to verified buyers, premium sellers, and live tracking of your commercial assets.</p>
        </div>
      </div>
    </div>
  );
}