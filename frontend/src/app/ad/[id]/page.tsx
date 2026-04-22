'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Define Interface
interface Ad {
  id: number;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  price?: number;
  status: string;
  sponsored: boolean;
  views: number;
  createdAt: string;
  user?: { id: number; username: string; email: string };
  category?: { id: number; name: string; slug: string };
  city?: { id: number; name: string; slug: string };
}

export default function AdDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [ad, setAd] = useState<Ad | null>(null);
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      fetchAd();
      fetchAllAds();
    }
  }, [id]);

  const fetchAd = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ads/${id}`);
      setAd(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/ads');
      // Filter out the current ad from the "all ads" list so it doesn't duplicate
      setAllAds(res.data.data.filter((a: Ad) => a.id.toString() !== id));
    } catch (err: any) {
      console.error('Failed to load other products', err);
    } finally {
      setAdsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <p className="text-slate-400 text-lg animate-pulse tracking-widest uppercase text-sm font-semibold">Loading Asset...</p>
      </div>
    );
  }

  if (error || !ad) {
    return (
       <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Asset Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md text-center">{error}</p>
        <Link href="/" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-all duration-200">
          Return to Market
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24">
      {/* Premium Header/Breadcrumbs */}
      <div className="sticky top-0 z-50 glass-dark border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-3 text-sm font-medium">
            <Link href="/" className="text-slate-500 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-700">/</span>
            <Link href="/explore" className="text-slate-500 hover:text-white transition-colors">Market</Link>
            <span className="text-slate-700">/</span>
            <span className="text-blue-400 truncate max-w-xs">{ad.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* TOP SECTION: MAIN PRODUCT DESCRITPION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-slate-900 border border-white/5 overflow-hidden relative group aspect-[4/3] sm:aspect-auto sm:h-[600px]">
              {ad.image ? (
                <img
                  src={`http://localhost:5000/${ad.image}`}
                  alt={ad.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Floating badges on image */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {ad.sponsored && (
                  <div className="glass px-4 py-2 rounded-full text-xs font-bold text-yellow-400 border border-yellow-400/20 shadow-lg backdrop-blur-md flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    PROMOTED
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Asset Details */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="glass-dark rounded-3xl border border-white/5 p-8 flex-1 flex flex-col relative overflow-hidden">
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              {/* Title & Category */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">{ad.category?.name || 'Category'}</span>
                <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase px-3 py-1 bg-slate-800 rounded-full border border-white/5">{ad.city?.name || 'City'}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">{ad.title}</h1>

              {/* Price Block */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/5 mb-8 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Current Price</p>
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    {ad.price ? `Rs. ${ad.price.toLocaleString()}` : 'Contact Seller'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-emerald-400 text-sm font-medium gap-1 justify-end mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available
                  </div>
                  <p className="text-slate-500 text-xs">{ad.views} views</p>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Asset Description</h3>
                <p className="text-slate-400 leading-relaxed font-light">{ad.description}</p>
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                      {ad.user?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium">Listed by {ad.user?.username}</p>
                      <p className="text-slate-500 text-xs">Verified Vendor • Post #{ad.id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="w-full bg-white text-slate-900 py-4 px-4 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    Contact Seller
                  </button>
                  <button className="w-full glass bg-slate-800 text-white py-4 px-4 rounded-xl font-bold hover:bg-slate-700 transition-all border border-white/10 group">
                    <span className="group-hover:text-pink-400 transition-colors">♥ Save Asset</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: ALL OTHER PRODUCTS (As specifically requested) */}
        <div className="mt-20 pt-16 border-t border-white/10 relative">
          {/* Aesthetic background glow for lower section */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Marketplace Inventory</h2>
            <p className="text-slate-400 text-lg">Browse all other active assets in the database.</p>
          </div>

          {adsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-slate-900/50 border border-white/5 animate-pulse"></div>
              ))}
            </div>
          ) : allAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allAds.map((product, idx) => (
                <Link href={`/ad/${product.id}`} key={product.id} className="group block rounded-2xl glass-dark border border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-2xl bg-slate-800">
                    {product.image ? (
                        <img src={`http://localhost:5000/${product.image}`} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700">
                           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      {product.category && (
                         <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-blue-300 text-[10px] font-bold uppercase px-2 py-1 rounded">
                           {product.category.name}
                         </div>
                      )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{product.title}</h3>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="font-bold text-white text-lg">Rs. {product.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-dark rounded-3xl border border-white/5">
              <p className="text-slate-500 text-lg">No other products available in the database at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}