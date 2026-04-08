'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface AnalyticsData {
  totalAds: number;
  activeAds: number;
  pendingAds: number;
  expiredAds: number;
  totalViews: number;
  verifiedPayments: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Operations dashboard</h1>
          <p className="mt-3 text-slate-600">Monitor listings, moderation health, and revenue signals from a single analytics view.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total listings</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.totalAds ?? '—'}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Active ads</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.activeAds ?? '—'}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending review</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.pendingAds ?? '—'}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Expired ads</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.expiredAds ?? '—'}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Verified payments</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.verifiedPayments ?? '—'}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total views</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics?.totalViews ?? '—'}</p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Workflow health</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Publish schedule</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Hourly cron checks</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Expiry automation</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Daily sweep and status updates</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Review queue</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Fast moderation throughput</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
