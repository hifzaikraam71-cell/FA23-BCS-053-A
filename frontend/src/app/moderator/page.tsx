'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

interface Ad {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  user?: { username?: string };
}

export default function ModeratorPage() {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (user?.role === 'moderator') {
      fetchPendingAds();
    }
  }, [user]);

  const fetchPendingAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/ads');
      setAds(res.data.filter((ad: Ad) => ad.status === 'pending'));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewAd = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:5000/ads/${id}/moderate`, { status });
      fetchPendingAds();
    } catch (err) {
      alert('Unable to update status.');
    }
  };

  if (!user || user.role !== 'moderator') return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700">Access denied. Moderator access only.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Moderator dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Review queue</h1>
          <p className="mt-3 text-slate-600">Review submitted ads, validate media, and move requests to payment verification or rejection.</p>
        </div>

        <div className="space-y-6">
          {ads.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No pending ads found. Check back once new listings are submitted.
            </div>
          ) : (
            ads.map((ad) => (
              <div key={ad._id} className="rounded-[2rem] bg-white p-7 shadow-lg ring-1 ring-slate-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Pending review</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{ad.title}</h2>
                    <p className="mt-3 text-slate-600">{ad.description}</p>
                    <p className="mt-4 text-sm text-slate-500">Category: {ad.category}</p>
                    <p className="text-sm text-slate-500">Seller: {ad.user?.username || 'Anonymous'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => reviewAd(ad._id, 'approved')} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                      Approve
                    </button>
                    <button onClick={() => reviewAd(ad._id, 'rejected')} className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
