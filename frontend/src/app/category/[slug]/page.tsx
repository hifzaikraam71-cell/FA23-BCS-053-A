'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Ad {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  sponsored: boolean;
  user?: { username?: string };
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (slug) fetchCategoryAds();
  }, [slug]);

  const fetchCategoryAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/ads');
      const adsData = Array.isArray(res.data) ? res.data : res.data.data || [];
      const currentSlug = Array.isArray(slug) ? slug[0] : slug;
      setAds(adsData.filter((ad: Ad) => ad.category?.toString().toLowerCase() === currentSlug?.toLowerCase()));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Category</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">{(Array.isArray(slug) ? slug[0] : slug)?.replace('-', ' ')}</h1>
          <p className="mt-3 text-slate-600">Browse active ads within this category and filter by package, status, or seller.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ads.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No ads available for this category yet.
            </div>
          ) : (
            ads.map((ad) => (
              <div key={ad._id} className="overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-slate-200">
                {ad.image && <img src={`data:image/jpeg;base64,${ad.image}`} alt={ad.title} className="h-56 w-full object-cover" />}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900">{ad.title}</h2>
                    {ad.sponsored && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">Sponsored</span>}
                  </div>
                  <p className="mt-3 text-slate-600">{ad.description}</p>
                  <p className="mt-4 text-sm text-slate-500">Seller: {ad.user?.username || 'Anonymous'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
