'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Ad {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  sponsored: boolean;
  status?: string;
  user?: { username?: string };
}

const categoryOptions = ['Electronics', 'Fashion', 'Home', 'Vehicles'];
const cityOptions = ['Karachi', 'Lahore', 'Islamabad', 'Multan'];

export default function Explore() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState('recent');

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/ads');
      setAds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAds = ads
    .filter((ad) => ad.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((ad) => (category ? ad.category === category : true))
    .filter((ad) => (activeOnly ? ad.status === 'approved' : true));

  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortOrder === 'sponsored') return (b.sponsored ? 1 : 0) - (a.sponsored ? 1 : 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200 mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Explore Ads</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Find your next sponsored listing</h1>
          <p className="mt-3 text-slate-600">Search by keywords, category, and local market with active-only filtering for approved listings.</p>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.5fr_0.6fr]">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Search listings, keywords, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map((option) => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Cities</option>
                  {cityOptions.map((option) => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">Active only</p>
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={activeOnly} onChange={(e) => setActiveOnly(e.target.checked)} className="h-5 w-10 rounded-full border border-slate-300 bg-white" />
                </label>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mt-4 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="recent">Newest first</option>
                <option value="sponsored">Sponsored first</option>
              </select>
              <p className="mt-4 text-sm leading-6 text-slate-600">Showing {sortedAds.length} ads. Use filters to refine your discovery experience.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {sortedAds.length === 0 ? (
            <div className="col-span-full rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No ads meet the selected criteria. Try a broader search or remove filters.
            </div>
          ) : (
            sortedAds.map((ad) => (
              <div key={ad._id} className="rounded-[2rem] bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden">
                {ad.image ? (
                  <img src={`data:image/jpeg;base64,${ad.image}`} alt={ad.title} className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-slate-100 text-slate-500">No preview available</div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">{ad.title}</h2>
                    {ad.sponsored && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase text-amber-800">Sponsored</span>}
                  </div>
                  <p className="mt-3 text-slate-600 line-clamp-3">{ad.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{ad.category}</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{ad.status || 'Active'}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Seller: {ad.user?.username || 'Seller'}</p>
                    <Link href={`/ad/${ad._id}`} className="text-blue-600 font-semibold hover:text-blue-800">
                      View details
                    </Link>
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
