'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

interface City {
  id: number;
  name: string;
  slug: string;
  country?: string;
}

interface Ad {
  id: number;
  title: string;
  description: string;
  image?: string;
  price?: number;
  status: string;
  sponsored: boolean;
  views: number;
  createdAt: string;
  user?: { id: number; username: string; email: string };
  category?: { id: number; name: string; slug: string };
  city?: { id: number; name: string; slug: string };
}

export default function Explore() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAds();
  }, [selectedCategory, selectedCity, sortBy]);

  const fetchData = async () => {
    try {
      const [adsRes, categoriesRes, citiesRes] = await Promise.all([
        axios.get('http://localhost:5000/ads'),
        axios.get('http://localhost:5000/categories'),
        axios.get('http://localhost:5000/cities'),
      ]);
      setAds(adsRes.data.data || []);
      setCategories(categoriesRes.data || []);
      setCities(citiesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('categoryId', selectedCategory.toString());
      if (selectedCity) params.append('cityId', selectedCity.toString());

      const res = await axios.get(`http://localhost:5000/ads?${params}`);
      let adsData = res.data.data || [];

      if (sortBy === 'price-low') {
        adsData = adsData.sort((a: Ad, b: Ad) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === 'price-high') {
        adsData = adsData.sort((a: Ad, b: Ad) => (b.price || 0) - (a.price || 0));
      } else if (sortBy === 'views') {
        adsData = adsData.sort((a: Ad, b: Ad) => b.views - a.views);
      } else {
        adsData = adsData.sort((a: Ad, b: Ad) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      setAds(adsData);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const filteredAds = ads.filter((ad) =>
    ad.title?.toLowerCase().includes(search.toLowerCase()) ||
    ad.description?.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Contact for Price';
    return `Rs. ${price.toLocaleString()}`;
  };

  if (loading) {
     return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <p className="text-slate-400 text-lg animate-pulse tracking-widest uppercase text-sm font-semibold">Loading Market...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden pb-24">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Banner */}
      <div className="glass-dark border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                Marketplace Hub
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Explore the network.</h1>
              <p className="text-slate-400 mt-3 text-lg max-w-xl">Discover premium listings from verified sellers across the global marketplace.</p>
            </div>
            {user && (
              <Link
                href="/dashboard"
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] self-start md:self-auto flex items-center gap-2"
              >
                <span>+ Post New Listing</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Filters Area */}
        <div className="glass-dark rounded-3xl border border-white/5 p-6 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Search Keywords</label>
              <div className="relative group">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, brand, or tag..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-500 outline-none shadow-inner"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-3.5 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner appearance-none cursor-pointer"
              >
                <option value="">All Regions</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">Sort Data</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner appearance-none cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="price-low">Price: Ascending</option>
                <option value="price-high">Price: Descending</option>
                <option value="views">Trending (Views)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-slate-400 font-medium">
            Indexing <span className="text-white font-bold">{filteredAds.length}</span> active assets
            {selectedCategory && ` in target sector`}
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAds.length === 0 ? (
          <div className="text-center py-20 px-4 glass-dark rounded-3xl border border-white/5">
             <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
              <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No matching assets</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Your filter parameters yielded zero results from the live database.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory(null); setSelectedCity(null); }}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad, idx) => (
              <Link
                href={`/ad/${ad.id}`}
                key={ad.id}
                className={`group block rounded-3xl glass-dark border border-white/5 shadow-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]`}
                style={{ animationDelay: `${(idx % 10) * 0.05}s` }}
              >
                {/* Image Handle */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl bg-slate-900">
                  {ad.image ? (
                    <img
                      src={`http://localhost:5000/${ad.image}`}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}

                  {/* Top floating badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    {ad.category && (
                      <div className="bg-slate-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-lg">
                        {ad.category.name}
                      </div>
                    )}
                  </div>
                  {ad.sponsored && (
                     <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Pro
                     </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg line-clamp-1 pr-4 group-hover:text-blue-400 transition-colors">
                      {ad.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {ad.description}
                  </p>

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Value</p>
                      <span className="text-xl font-extrabold text-white">
                        {formatPrice(ad.price)}
                      </span>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors text-white">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  
                  {/* Subtle footer line */}
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {ad.city?.name || 'Global'}
                    </span>
                    <span>{ad.views} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}