'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SiteHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-lg font-bold text-white shadow-md hover:shadow-lg transition-shadow">
            A
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">AdFlow</p>
            <p className="text-sm font-semibold text-slate-900">Pro Marketplace</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Home</Link>
          <Link href="/explore" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Explore</Link>
          <Link href="/packages" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Packages</Link>
          <Link href="/categories" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Categories</Link>
          <Link href="/cities" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Cities</Link>
          <Link href="/contact" className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">Contact</Link>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 border-r border-slate-200 pr-2">
                {user.role === 'moderator' && (
                  <Link href="/moderator" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
                    🛡️ Moderator
                  </Link>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link href="/admin" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
                      ⚙️ Admin
                    </Link>
                    <Link href="/analytics" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
                      📊 Analytics
                    </Link>
                  </>
                )}
              </div>
              <Link href="/dashboard" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:shadow-md transition-shadow">
                📈 Dashboard
              </Link>
              <button onClick={logout} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:shadow-md transition-shadow">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
