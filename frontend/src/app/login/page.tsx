'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'seller' or 'buyer'

  const modeText = mode === 'seller' ? 'Seller' : mode === 'buyer' ? 'Buyer' : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials provided. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* Left Panel - Premium Abstract Graphic */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 border-r border-white/5 flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-color-dodge filter blur-[100px] opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-color-dodge filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">AdFlow Pro</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="glass px-6 py-2 rounded-full inline-block mb-6 ring-1 ring-white/10">
            <span className="text-blue-300 text-sm font-medium tracking-wide">Premium Authentication</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">Welcome back to the future of marketplaces.</h1>
          <p className="text-slate-400 text-lg leading-relaxed">Access your dashboard to manage listings, track analytics, and optimize your sales pipeline with our AI-driven tools.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="inline-flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg">
                A
              </div>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {modeText ? `Sign in as ${modeText}` : 'Sign in to your account'}
            </h2>
            <p className="text-slate-400">
              {mode === 'seller' ? 'Access your vendor dashboard to manage listings' : 
               mode === 'buyer' ? 'Login to chat and call sellers' : 
               'Enter your credentials to access the platform'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 backdrop-blur-sm">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 text-white pl-11 pr-4 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900 border border-slate-800 text-white pl-11 pr-4 py-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-slate-900 py-3.5 px-4 rounded-xl font-bold font-sans hover:bg-slate-200 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 transform active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Info Box */}
          <div className="mt-8 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Demo Access</span>
              <span className="text-blue-300 font-medium">demo@example.com</span> <span className="text-slate-600 mx-1">/</span> <span className="text-slate-400">Demo123!</span>
            </div>
            <button 
              onClick={() => setFormData({ email: 'demo@example.com', password: 'Demo123!' })}
              className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-colors"
            >
              Autofill
            </button>
          </div>

          <div className="mt-10 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-white hover:text-blue-300 transition-colors">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
