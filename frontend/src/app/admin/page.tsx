'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

interface Ad {
  _id: string;
  title: string;
  status: string;
  user?: { username?: string };
}

interface Analytics {
  totalAds: number;
  approvedAds: number;
  sponsoredAds: number;
  totalViews: number;
}

export default function Admin() {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPendingAds();
      fetchAnalytics();
    }
  }, [user]);

  const fetchPendingAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/ads');
      setAds(res.data.filter((ad: Ad) => ad.status === 'pending'));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const moderateAd = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:5000/ads/${id}/moderate`, { status });
      fetchPendingAds();
    } catch (err) {
      alert('Error moderating ad');
    }
  };

  if (!user || user.role !== 'admin') return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700">Access denied. Admin role required.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200 mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Marketplace operations</h1>
          <p className="mt-3 text-slate-600">Verify payment proof, publish approved listings, and track system metrics.</p>
        </div>

        {analytics && (
          <div className="grid gap-6 xl:grid-cols-4 mb-10">
            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total listings</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics.totalAds}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Approved</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics.approvedAds}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Sponsored ads</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics.sponsoredAds}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total views</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{analytics.totalViews}</p>
            </div>
          </div>
        )}

        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Pending moderation queue</h2>
              <p className="mt-2 text-slate-600">Review and process listings that are awaiting payment verification or approval.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">{ads.length} pending</span>
          </div>

          <div className="mt-8 space-y-6">
            {ads.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">No pending ads at the moment.</div>
            ) : (
              ads.map((ad) => (
                <div key={ad._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{ad.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">Seller: {ad.user?.username || 'Anonymous'}</p>
                    <p className="mt-1 text-sm text-slate-500">Status: {ad.status}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
                    <button onClick={() => moderateAd(ad._id, 'approved')} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                      Approve
                    </button>
                    <button onClick={() => moderateAd(ad._id, 'rejected')} className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
