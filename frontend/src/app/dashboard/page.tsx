'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

interface Ad {
  _id: string;
  title: string;
  description: string;
  status: string;
  sponsored: boolean;
  category: string;
  image?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [sponsored, setSponsored] = useState(false);
  const [price, setPrice] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (user) fetchMyAds();
  }, [user]);

  const fetchMyAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/myads');
      setAds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitAd = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('sponsored', sponsored.toString());
    formData.append('price', price);
    formData.append('schedule', schedule);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/ads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      setSponsored(false);
      setPrice('');
      setSchedule('');
      fetchMyAds();
    } catch (err) {
      alert('Error submitting ad');
    }
  };

  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-700 px-4">
      <p className="text-center text-lg font-semibold">Dashboard access is restricted to authorized users.</p>
      <p className="mt-3 text-center text-sm text-slate-600">If you already have an account, use the flow provided by your organization or admin login system.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200 mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-blue-600">Client dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Manage your sponsored listings</h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">Submit ads, track approval status, and review active or expired campaigns from one central place.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-700">
              Signed in as <span className="text-slate-900">{user.username}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Create New Ad</h2>
                <p className="mt-2 text-sm text-slate-600">Fill in your listing details and attach optional media or schedule publishing.</p>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">Client tools</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="col-span-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
              <div className="flex items-center gap-4 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={sponsored}
                  onChange={(e) => setSponsored(e.target.checked)}
                  className="h-5 w-5 rounded"
                />
                <span className="text-sm text-slate-700">Sponsored package</span>
              </div>
              {sponsored && (
                <>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="datetime-local"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </>
              )}
            </div>
            <button
              onClick={submitAd}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-700"
            >
              Submit Ad
            </button>
          </section>

          <section className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Your ads</h2>
                <p className="mt-2 text-sm text-slate-600">Track active, pending, and expired listings here.</p>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">{ads.length} ads</span>
            </div>

            <div className="space-y-4">
              {ads.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-slate-500">
                  No ads yet. Submit your first listing to get started.
                </div>
              ) : (
                ads.map((ad) => (
                  <div key={ad._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{ad.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{ad.description}</p>
                      </div>
                      <span className={`rounded-full px-4 py-2 text-sm font-semibold ${ad.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : ad.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {ad.status}
                      </span>
                    </div>
                    {ad.image && <img src={`data:image/jpeg;base64,${ad.image}`} alt={ad.title} className="mt-4 h-32 w-full rounded-3xl object-cover" />}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
