'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-slate-900 to-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Advanced ads marketplace</p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight">Sponsored listings built for quality, trust, and visibility.</h1>
              <p className="mt-6 max-w-xl text-lg text-slate-200">AdFlow Pro combines fast discovery, moderation workflows, package control, and advanced analytics for premium marketplace listings.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/explore" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/10 hover:bg-slate-100">
                  Explore listings
                </Link>
                <Link href={user ? '/dashboard' : '/explore'} className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                  {user ? 'Go to dashboard' : 'Browse marketplace'}
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Fast discovery</p>
                <p className="mt-4 text-lg font-semibold">Search by category, city, or package.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Verified listings</p>
                <p className="mt-4 text-lg font-semibold">Only approved ads appear on the marketplace.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Packages</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Boost your listing</h2>
                <p className="mt-3 text-slate-600">Choose the right package to increase visibility and category placement.</p>
                <Link href="/packages" className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  View packages
                </Link>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Local markets</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Search by city</h2>
                <p className="mt-3 text-slate-600">Find active listings near your market and local buyers.</p>
                <Link href="/cities" className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  View cities
                </Link>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Support</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Help and policies</h2>
                <p className="mt-3 text-slate-600">Learn about platform rules, privacy, and how marketplace moderation works.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/faq" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                    FAQ
                  </Link>
                  <Link href="/terms" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
