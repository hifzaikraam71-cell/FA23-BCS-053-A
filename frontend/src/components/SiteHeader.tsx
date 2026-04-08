'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SiteHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/10">
            A
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">AdFlow Pro</p>
            <p className="text-sm font-semibold text-slate-900">Sponsored Listing Marketplace</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/explore" className="hover:text-blue-600">Explore</Link>
          <Link href="/packages" className="hover:text-blue-600">Packages</Link>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <Link href="/cities" className="hover:text-blue-600">Cities</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              {user.role === 'moderator' && (
                <Link href="/moderator" className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
                  Moderator
                </Link>
              )}
              {user.role === 'admin' && (
                <>
                  <Link href="/admin" className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
                    Admin
                  </Link>
                  <Link href="/analytics" className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
                    Analytics
                  </Link>
                </>
              )}
              <Link href="/dashboard" className="rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Dashboard
              </Link>
              <button onClick={logout} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Logout
              </button>
            </>
          ) : (
            <Link href="/explore" className="rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Explore
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
