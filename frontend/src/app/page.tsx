'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

// Defining Ad Interface based on backend schema
interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: { name: string };
  city?: { name: string };
  status: string;
}

export default function Home() {
  const { user } = useAuth();
  const [featuredAds, setFeaturedAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from the local database
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ads?limit=6');
        setFeaturedAds(res.data.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <main>
        {/* HERO SECTION */}
        <section className="relative px-4 pt-32 pb-24 sm:px-6 lg:px-8 flex items-center min-h-[90vh]">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-64 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16 w-full">
            <div className="max-w-2xl text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-md mb-8 hover:bg-blue-500/20 transition-colors cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                Introducing Premium Listings
              </div>
              
              <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-indigo-300 leading-[1.1]">
                Empower Your <br/>Marketplace.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                AdFlow Pro combines AI-driven discovery, intelligent moderation, and stunning aesthetics to give your listings the visibility they deserve.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/explore" className="relative group overflow-hidden rounded-full p-[1px]">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <div className="relative bg-slate-950/80 backdrop-blur-md px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-slate-900/50">
                    <span className="font-semibold text-white">Explore Listings</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </Link>
                
                <Link href={user ? '/dashboard' : '/login'} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-white hover:bg-slate-800 transition-all duration-300 hover:border-slate-500 backdrop-blur-md">
                  {user ? 'View Dashboard' : 'Sign In Now'}
                </Link>
              </div>
            </div>

            {/* Aesthetic Floating Mockup (Hero Right) */}
            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-3"></div>
              <div className="absolute inset-0 glass-dark rounded-3xl border border-white/10 shadow-2xl transform lg:-rotate-2 transition-transform duration-700 hover:rotate-0 flex flex-col overflow-hidden">
                <div className="h-12 border-b border-white/10 flex items-center px-4 bg-slate-900/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4 relative">
                  <div className="w-3/4 h-8 bg-slate-800/50 rounded-lg animate-pulse"></div>
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60"></div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="w-1/2 h-24 glass rounded-xl border border-white/5"></div>
                    <div className="w-1/2 h-24 glass rounded-xl border border-white/5"></div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -right-6 top-1/2 glass px-6 py-4 rounded-xl shadow-2xl border border-white/10 transform rotate-12 animate-bounce">
                    <p className="text-emerald-400 font-bold">10k+ Sales</p>
                    <p className="text-xs text-slate-400">This week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT PRODUCTS (DATABASE INTEGRATION) */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Trending Listings</h2>
                <p className="mt-4 text-slate-400 text-lg">Fetched live from the backend database.</p>
              </div>
              <Link href="/explore" className="text-blue-400 hover:text-blue-300 font-medium group flex items-center gap-1">
                View all <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse"></div>
                ))}
              </div>
            ) : featuredAds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredAds.map((ad, idx) => (
                  <Link href={`/ad/${ad.id}`} key={ad.id} className={`group block rounded-2xl glass-dark border border-white/5 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="h-48 w-full relative overflow-hidden rounded-t-2xl bg-slate-800">
                      {ad.image ? (
                        <img src={`http://localhost:5000/${ad.image}`} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                          {ad.category?.name || 'Item'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{ad.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{ad.description}</p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                        <span className="text-2xl font-bold text-white">Rs. {ad.price?.toLocaleString() || 0}</span>
                        <div className="text-slate-500 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {ad.city?.name || 'Location'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-dark rounded-2xl border border-white/5">
                <p className="text-slate-400">No products found in the database. Add some to see them here.</p>
              </div>
            )}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 bg-slate-900 border-y border-white/5">
          <div className="mx-auto max-w-7xl">
             <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Platform Features</h2>
              <p className="mt-4 text-slate-400">Everything you need to succeed</p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { title: 'Flexible Packages', icon: '📦', color: 'from-blue-500 to-cyan-500', link: '/packages' },
                { title: 'Local Markets', icon: '🌍', color: 'from-purple-500 to-pink-500', link: '/cities' },
                { title: 'Help & Support', icon: '❓', color: 'from-amber-500 to-orange-500', link: '/faq' }
              ].map((feature, i) => (
                <div key={i} className="group rounded-3xl glass p-8 hover:bg-slate-800/50 transition-all duration-300 border border-white/5 hover:border-white/20">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6 transform group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">Experience a premium marketplace platform designed specifically for fast discovery, verified users, and smooth transactions.</p>
                  <Link href={feature.link} className="text-sm font-semibold text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    Explore More <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="px-4 py-32 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl"></div>
          
          <div className="mx-auto max-w-3xl text-center relative z-10 glass-dark p-12 sm:p-16 rounded-[3rem] border border-blue-500/20 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to scale your reach?</h2>
            <p className="text-xl text-blue-200/70 mb-10">Join thousands of verified sellers on the most aesthetic marketplace today.</p>
            <Link href="/register" className="inline-flex rounded-full bg-white px-8 py-4 font-bold text-slate-900 hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              Create an Account
            </Link>
          </div>
        </section>
      </main>
      
      {/* Required for the fade in animation of products */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
