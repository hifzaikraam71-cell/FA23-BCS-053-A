'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

export default function SiteHeader() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
            A
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors">AdFlow</p>
            <p className="text-sm font-bold text-white tracking-tight">Pro</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all">Home</Link>
          <Link href="/explore" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all text-blue-300 font-semibold bg-blue-500/5">Explore</Link>
          <Link href="/packages" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all">Packages</Link>
          <Link href="/categories" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all">Categories</Link>
          <Link href="/cities" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all">Cities</Link>
          <Link href="/contact" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all">Contact</Link>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 border-r border-white/10 pr-3">
                {user.role === 'moderator' && (
                  <Link href="/moderator" className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-400 hover:bg-orange-500/20 transition-colors">
                    🛡️ Mod
                  </Link>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link href="/admin" className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                      ⚙️ Admin
                    </Link>
                  </>
                )}
              </div>
              <Link href="/dashboard" className="rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 hover:border-slate-500 transition-all shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Dashboard
              </Link>
              <button onClick={logout} className="rounded-full border border-red-500/30 bg-transparent px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all backdrop-blur-md">
                Sign In
              </Link>
              <Link href="/register" className="rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all hover:bg-slate-200">
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
