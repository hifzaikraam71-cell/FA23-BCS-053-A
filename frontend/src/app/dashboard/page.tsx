'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Ad {
  id: number;
  title: string;
  description: string;
  status: string;
  sponsored: boolean;
  price?: number;
  views: number;
  createdAt: string;
  category?: { id: number; name: string };
  city?: { id: number; name: string };
  image?: string;
}

interface Category { id: number; name: string; slug: string }
interface City { id: number; name: string; slug: string }

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [ads, setAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ads' | 'create'>('ads');

  const [formData, setFormData] = useState({
    title: '', description: '', price: '', categoryId: '', cityId: '', packageId: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    try {
      const [adsRes, categoriesRes, citiesRes] = await Promise.all([
        axios.get('http://localhost:5000/ads'),
        axios.get('http://localhost:5000/categories'),
        axios.get('http://localhost:5000/cities'),
      ]);
      const userAds = adsRes.data.data.filter((ad: Ad) => ad.user?.id === user?.id);
      setAds(userAds);
      setCategories(categoriesRes.data);
      setCities(citiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('categoryId', formData.categoryId);
      submitData.append('cityId', formData.cityId);
      if (formData.packageId) submitData.append('packageId', formData.packageId);
      if (image) submitData.append('image', image);

      await axios.post('http://localhost:5000/ads', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });

      setFormData({ title: '', description: '', price: '', categoryId: '', cityId: '', packageId: '' });
      setImage(null);
      await fetchData();
      setActiveTab('ads');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create ad');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
        <p className="text-slate-400 text-lg animate-pulse tracking-widest uppercase text-sm font-semibold">Loading Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <div className="glass-dark border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Seller Dashboard
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Welcome, {user?.username}</h1>
              <p className="text-slate-400 mt-3 text-lg">Manage your commercial assets and active operations.</p>
            </div>
            
            <Link
              href="/explore"
              className="bg-slate-800 border border-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Back to Market
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Navigation Tabs */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-2 mb-10 inline-flex shadow-lg flex-wrap gap-2 sm:gap-0">
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'ads' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
             Your Assets <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full text-xs">{ads.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'create' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            + Create Listing
          </button>
        </div>

        {activeTab === 'ads' && (
          <div className="space-y-6 animate-[fadeIn_0.4s_ease-out_forwards]">
            {ads.length === 0 ? (
              <div className="text-center py-20 px-4 glass-dark rounded-3xl border border-white/5 border-dashed">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                  <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Active Assets</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">You have not posted any assets to the marketplace yet.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Create Your First Ad
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map((ad, idx) => (
                  <div key={ad.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-xl group hover:border-emerald-500/30 transition-all">
                     <div className="h-48 relative overflow-hidden bg-slate-800">
                      {ad.image ? (
                        <img src={`http://localhost:5000/${ad.image}`} alt={ad.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      
                      {/* Status Overlay Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border shadow-lg backdrop-blur-md ${
                          ad.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          ad.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-slate-500/20 text-slate-400 border-slate-500/30'
                        }`}>
                          {ad.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-white text-lg mb-2 line-clamp-1">{ad.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">{ad.description}</p>
                      
                      <div className="bg-slate-950 rounded-xl p-4 border border-white/5 mb-6 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Price</p>
                          <p className="text-white font-bold">Rs. {ad.price?.toLocaleString() || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Views</p>
                          <p className="text-white font-bold">{ad.views}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                         <Link href={`/ad/${ad.id}`} className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-colors text-center text-sm">
                            Manage
                         </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Ad Tab - Upgraded Form */}
        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto glass-dark rounded-3xl border border-white/5 p-8 sm:p-12 shadow-2xl animate-[fadeIn_0.4s_ease-out_forwards]">
            <div className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Publish Asset</h2>
              <p className="text-slate-400 font-medium">Inject a new listing into the global database.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner"
                    placeholder="Enter commercial title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Value (Rs.)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner"
                    placeholder="E.g. 5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner resize-none"
                  placeholder="Provide comprehensive details about the item..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Classification *</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Region *</label>
                  <select
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-900 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white outline-none shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Image</label>
                <div className="w-full px-5 py-8 bg-slate-900/50 rounded-xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 file:cursor-pointer pb-2 max-w-sm mx-auto"
                  />
                  <p className="text-xs text-slate-600 mt-2">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('ads')}
                  className="px-8 py-4 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50 disabled:-cursor-not-allowed flex items-center justify-center min-w-[180px]"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                       <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                       Injecting...
                    </div>
                  ) : (
                    'Submit to DB'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

       <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
