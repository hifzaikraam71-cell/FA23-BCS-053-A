'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Ad {
  id: number;
  title: string;
  status: string;
  price?: number;
  user?: { username?: string };
  category?: { name?: string };
  createdAt?: string;
}

interface Analytics {
  totalAds: number;
  approvedAds: number;
  sponsoredAds: number;
  totalViews: number;
}

export default function Admin() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [ads, setAds] = useState<Ad[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchPendingAds(), fetchAnalytics()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingAds = async () => {
    try {
      const res = await axios.get('/admin/ads');
      // The backend model uses 'id', not '_id'
      setAds(res.data.filter((ad: Ad) => ad.status === 'pending'));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const moderateAd = async (id: number, status: string) => {
    try {
      await axios.put(`/ads/${id}/moderate`, { status });
      fetchPendingAds();
      fetchAnalytics();
    } catch (err) {
      alert('Error moderating ad');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      if (login) {
        await login(email, password);
      }
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="glass-dark border border-white/10 rounded-[2rem] p-8 sm:p-12 w-full max-w-md relative z-10 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex flex-col items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Admin Terminal</h1>
            <p className="text-slate-400 mt-2 text-sm">Restricted access area. Authenticate to proceed.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/5 text-white px-5 py-3.5 rounded-xl focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all outline-none shadow-inner"
                placeholder="admin@system.local"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/5 text-white px-5 py-3.5 rounded-xl focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all outline-none shadow-inner tracking-widest font-mono"
                placeholder="••••••••"
              />
            </div>
            
            {authError && (
              <div className="p-3 mt-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold">
                [ ERROR: {authError} ]
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-red-600/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white py-4 px-4 rounded-xl font-bold transition-all mt-8 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-red-500 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : (
                'Grant Access'
              )}
            </button>
          </form>

          {user && user.role !== 'admin' && (
             <p className="mt-6 text-center text-xs text-slate-500">
               Note: Currently logged in user ({user.username}) lacks clearance.
             </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex gap-2 w-full">
            <button
               type="button"
               onClick={() => { setEmail('admin@adflow.com'); setPassword('admin123'); }}
               className="flex-1 text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors bg-white/5 py-2 rounded-lg"
            >
               Auto-fill Default Admin
            </button>
            <Link href="/" className="flex-1 text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors text-center bg-white/5 py-2 rounded-lg flex items-center justify-center">
               Abort
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <div className="glass-dark border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                System Override Active
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Admin Terminal</h1>
              <p className="text-slate-400 mt-3 text-lg">Manage global operations, moderate listings, and monitor metrics.</p>
            </div>
            <Link
              href="/dashboard"
              className="bg-slate-800 border border-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {loading ? (
             <div className="w-full flex justify-center py-20">
               <div className="w-16 h-16 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
             </div>
        ) : (
          <>
            {/* Analytics Grid */}
            {analytics && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                <div className="glass-dark rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Assets</p>
                  <p className="mt-4 text-5xl font-extrabold text-white">{analytics.totalAds}</p>
                </div>
                
                <div className="glass-dark rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verified Content</p>
                  <p className="mt-4 text-5xl font-extrabold text-white">{analytics.approvedAds}</p>
                </div>

                <div className="glass-dark rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Boosted (Pro)</p>
                  <p className="mt-4 text-5xl font-extrabold text-white">{analytics.sponsoredAds}</p>
                </div>

                <div className="glass-dark rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Views</p>
                  <p className="mt-4 text-5xl font-extrabold text-white">{analytics.totalViews}</p>
                </div>
              </div>
            )}

            {/* Moderation Queue */}
            <div className="glass-dark rounded-3xl border border-white/5 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Security & Clearance</h2>
                  <p className="text-slate-400">Review and authorize pending assets submitted by users.</p>
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-white/5 text-sm font-bold text-white shadow-inner">
                  <span className="text-red-400 mr-2">{ads.length}</span> Awaiting Action
                </div>
              </div>

              <div className="space-y-4">
                {ads.length === 0 ? (
                  <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-white/5 border-dashed">
                     <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-xl font-bold text-white">Queue is clear</p>
                    <p className="text-slate-400 mt-2">All network assets have been processed.</p>
                  </div>
                ) : (
                  ads.map((ad) => (
                    <div key={ad.id} className="rounded-2xl border border-white/5 bg-slate-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-800/80 transition-colors shadow-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{ad.title}</h3>
                          <span className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            ID: {ad.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5 font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {ad.user?.username || 'Unknown Vendor'}
                          </span>
                          {ad.price && (
                            <span className="font-bold text-emerald-400">Rs. {ad.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => moderateAd(ad.id, 'approved')}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 text-sm font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          Authorize
                        </button>

                        <button
                          onClick={() => moderateAd(ad.id, 'rejected')}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 border border-red-500/30 px-6 py-3 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          Purge
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
